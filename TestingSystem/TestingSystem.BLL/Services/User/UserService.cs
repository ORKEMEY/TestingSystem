﻿using System;
using System.Collections.Generic;
using TestingSystem.BLL.Interfaces;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.BLL.DTO;
using TestingSystem.DAL.Models;
using TestingSystem.DAL;
using System.Linq;
using TestingSystem.DAL.Patchers;

namespace TestingSystem.BLL.Services
{
	public class UserService : IUserService
	{
		protected IUnitOfWork uof { get; set; }
		protected ITokenService ts { get; set; }
		protected IPasswordService ps { get; set; }

		public UserService(IUnitOfWork uof, ITokenService ts, IPasswordService ps)
		{
			this.uof = uof;
			this.ts = ts;
			this.ps = ps;
		}

		public UserDTO AddItem(UserDTO userDTO)
		{
			if(userDTO == null)		
				throw new Infrastructure.ValidationException("Empty object");
			if (String.IsNullOrEmpty(userDTO.Login))
				throw new Infrastructure.ValidationException("Wrong or empty properties", "Login");
			if (String.IsNullOrEmpty(userDTO.Password))
				throw new Infrastructure.ValidationException("Wrong or empty properties", "Password");

			var user = uof.Users.GetItems(u => u.Login == userDTO.Login).FirstOrDefault();
			if (user != null)
				throw new Infrastructure.ValidationException("This Login is already taken", "Login");

			ps.HashPassword(userDTO);
			ts.AssignRefreshToken(userDTO);
			AssignCustomerRole(userDTO);
			

			var userDAL = MapperBLL.Mapper.Map<User>(userDTO);

			uof.Users.Create(userDAL);
			uof.Save();

			return MapperBLL.Mapper.Map<UserDTO>(userDAL);
		}

		public void DeleteItem(UserDTO userDTO)
		{
			if (userDTO.Id <= 0)
				throw new Infrastructure.ValidationException("Wrong or empty property Id");
			uof.Users.Delete(userDTO.Id);
			uof.Save();
		}

		public void UpdateItem(UserDTO userDTO)
		{
			if (userDTO.Id <= 0)
				throw new Infrastructure.ValidationException("Wrong or empty properties");

			var userDALold = uof.Users.GetItem(userDTO.Id);
			if (userDALold == null) throw new Infrastructure.ValidationException("Item not found");

			if (userDTO.Password != null)
				ps.HashPassword(userDTO);

			var userDALnew = MapperBLL.Mapper.Map<User>(userDTO);

			UserPatcher.Patch(userDALold, userDALnew);

			uof.Users.Update(userDALold);
			uof.Save();
		}

		public void ChangeLogin(UserDTO userDTOnew, UserDTO userDTOold)
		{
			if (userDTOnew.Id <= 0 || userDTOnew.Password == null || userDTOnew.Login == null)
				throw new Infrastructure.ValidationException("Wrong or empty properties");

			var userDALold = uof.Users.GetItem(userDTOnew.Id);
			if (userDALold == null) throw new Infrastructure.ValidationException("Account not found");

			var loginCheck = uof.Users.GetItems(u => u.Login == userDTOnew.Login && u.Id != userDTOnew.Id).FirstOrDefault();
			if (loginCheck != null)
				throw new Infrastructure.ValidationException("This Login is already taken", "Login");

			ps.HashPassword(userDTOold);

			if (userDALold.Password != userDTOold.Password)
				throw new Infrastructure.ValidationException("Wrong password", "Password");

			ps.HashPassword(userDTOnew);

			var userDALnew = MapperBLL.Mapper.Map<User>(userDTOnew);
			
			UserPatcher.Patch(userDALold, userDALnew);

			uof.Users.Update(userDALold);
			uof.Save();

		}

		public void ChangePassword(UserDTO userDTO)
		{
			if (userDTO.Id <= 0 || userDTO.Password == null)
				throw new Infrastructure.ValidationException("Wrong or empty properties");

			var userDALold = uof.Users.GetItem(userDTO.Id);
			if (userDALold == null) throw new Infrastructure.ValidationException("Account not found");

			ps.HashPassword(userDTO);

			var userDALnew = MapperBLL.Mapper.Map<User>(userDTO);

			UserPatcher.Patch(userDALold, userDALnew);

			uof.Users.Update(userDALold);
			uof.Save();

		}

		public void UpdateAccount(UserDTO userDTO)
		{
			if (userDTO.Id <= 0)
				throw new Infrastructure.ValidationException("Wrong or empty properties");

			var userDALold = uof.Users.GetItem(userDTO.Id);
			if (userDALold == null) throw new Infrastructure.ValidationException("Account not found");

			if (userDTO.Password == null)
				throw new Infrastructure.ValidationException("You must confirm password to change account", "Password");
			
			ps.HashPassword(userDTO);

			if(userDALold.Password != userDTO.Password)
				throw new Infrastructure.ValidationException("Wrong password", "Password");

			userDTO.Login = null;
			
			var userDALnew = MapperBLL.Mapper.Map<User>(userDTO);

			UserPatcher.Patch(userDALold, userDALnew);

			uof.Users.Update(userDALold);
			uof.Save();
		}

		public IEnumerable<UserDTO> GetItems()
		{
			IEnumerable<User> items = uof.Users.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<UserDTO>>(items);

		}


		public IEnumerable<UserDTO> GetItems(string login)
		{
			IEnumerable<User> items = uof.Users.GetItems(c => c.Login == login);
			return MapperBLL.Mapper.Map<IEnumerable<UserDTO>>(items);
		}


		public UserDTO Authentificate(string login, string password, bool hashPassword = true)
		{

			if (String.IsNullOrEmpty(login))
				throw new Infrastructure.ValidationException("Wrong or empty Login", "Login");
			if (String.IsNullOrEmpty(password))
				throw new Infrastructure.ValidationException("Wrong or empty Password", "Password");

			var searchedUser = new UserDTO()
			{
				Login = login,
				Password = password
			};
			UserDTO userDTO = null;

			try
			{
				if(hashPassword)
					ps.HashPassword(searchedUser);

				User item = uof.Users.GetItems(u => u.Login == searchedUser.Login & u.Password == searchedUser.Password).FirstOrDefault();

				userDTO = MapperBLL.Mapper.Map<UserDTO>(item);
				ts.AssignRefreshToken(userDTO);

				item.RefreshToken = MapperBLL.Mapper.Map<RefreshToken>(userDTO.RefreshToken) ;

				uof.Users.Update(item);
				uof.Save();
			}
			catch (ArgumentNullException)
			{
				throw new Infrastructure.ValidationException("Wrong or empty properties");
			}

			return userDTO;
		}

		public UserDTO GetItem(int? id)
		{
			if (id == null) throw new Infrastructure.ValidationException("Id of user isn't set", "id");
			var user = uof.Users.GetItem(id.Value);

			if (user == null) throw new Infrastructure.ValidationException("No user was found");
			return MapperBLL.Mapper.Map<UserDTO>(user);
		}

		public UserDTO GetUserByAccessToken(TokenDTO token)
		{
			var principal = AuthOptions.GetPrincipalFromExpiredToken(token.AccessToken);

			var user = uof.Users.GetItems(u => u.Login == principal.Identity.Name).FirstOrDefault();
			if (user == null) throw new Infrastructure.ValidationException("No user was found");

			return MapperBLL.Mapper.Map<UserDTO>(user);
		}

		public void AssignCustomerRole(UserDTO user)
		{
			if (user == null)
			{
				throw new ArgumentNullException();
			}

			if (user.Role == null)
			{
				var role = uof.Roles.GetItems(r => r.Name == "Customer").First();
				if(role != null)
				{
					user.RoleId = role.Id;
				}
			}
		}

	}
}
