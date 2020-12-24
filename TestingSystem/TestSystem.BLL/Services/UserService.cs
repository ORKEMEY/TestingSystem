using System;
using System.Collections.Generic;
using TestSystem.BLL.Interfaces;
using TestSystem.BLL.Infrastructure;
using TestSystem.BLL.DTO;
using TestSystem.DAL.Models;
using TestSystem.DAL;
using System.Linq;

namespace TestSystem.BLL.Services
{
	public class UserService : IUserService
	{
		protected IUnitOfWork uof { get; set; }
		

		public UserService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(UserDTO userDTO)
		{
			if (String.IsNullOrEmpty(userDTO.Login))
				throw new ValidationException("Wrong or empty properties", "Login");
			if (String.IsNullOrEmpty(userDTO.Password))
				throw new ValidationException("Wrong or empty properties", "Password");

			var user = uof.Users.GetItems(u => u.Login == userDTO.Login).FirstOrDefault();
			if(user != null)
				throw new ValidationException("This Login is already taken", "Login");

			var userDAL = MapperBLL.Mapper.Map<User>(userDTO);

			uof.Users.Create(userDAL);
			uof.Save();
		}

		public void DeleteItem(UserDTO userDTO)
		{
			if (userDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Users.Delete(userDTO.Id);
			uof.Save();
		}

		public void UpdateItem(UserDTO userDTO)
		{
			if (userDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var userDAL = uof.Users.GetItem(userDTO.Id);
			if (userDAL == null) throw new ValidationException("Item not found");

			if(userDTO.Login != null)
				userDAL.Login = userDTO.Login;
			if (userDTO.Password != null)
				userDAL.Password = userDTO.Password;

			uof.Users.Update(userDAL);
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

		public UserDTO Authentificate(string login, string password)
		{
			User items = uof.Users.GetItems(u => u.Login == login & u.Password == password).FirstOrDefault();
			return MapperBLL.Mapper.Map<UserDTO>(items);
		}

		public UserDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of user isn't set", "id");
			var user = uof.Users.GetItem(id.Value);

			if (user == null) throw new ValidationException("No user was found");
			return MapperBLL.Mapper.Map<UserDTO>(user);
		}

	}
}
