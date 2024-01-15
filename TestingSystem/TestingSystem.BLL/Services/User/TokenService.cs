using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.Interfaces;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.BLL.DTO;
using TestingSystem.DAL.Models;
using TestingSystem.DAL;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;

namespace TestingSystem.BLL.Services
{
	public class TokenService : ITokenService
	{

		protected IUnitOfWork uof { get; set; }


		public TokenService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		/// <exception cref="Infrastructure.ValidationException"></exception>
		public TokenDTO RefreshToken(TokenDTO token)
		{

			try
			{
				var principal = AuthOptions.GetPrincipalFromExpiredToken(token.AccessToken);

				var user = uof.Users.GetItems(u => u.Login == principal.Identity.Name).FirstOrDefault();
				if (user == null) throw new Infrastructure.ValidationException("No user was found");

				if (user.RefreshToken == null || user.RefreshToken.Token != token.RefreshToken || user.RefreshToken.ExpiryTime <= DateTime.Now)
					throw new Infrastructure.ValidationException("Refresh token isn't valid, reauthentificate");

				token.AccessToken = AuthOptions.GenerateAccessToken(principal.Claims);
				token.Login = user.Login;

			}
			catch (SecurityTokenException)
			{
				throw new Infrastructure.ValidationException("Access token isn't valid, reauthentificate");
			}
			catch (Exception)
			{
				throw new Infrastructure.ValidationException("Wrong or empty properties");
			}

			return token;
		}


		/// <param name="user"></param>
		/// <exception cref="ArgumentNullException"></exception>
		public void AssignRefreshToken(UserDTO user)
		{
			if (user == null || user?.Password == null)
			{
				throw new ArgumentNullException();
			}

			using (var sha = new SHA256Managed())
			{
				byte[] textBytes = Encoding.UTF8.GetBytes(user?.Password + DateTime.Now.ToString());
				byte[] hashBytes = sha.ComputeHash(textBytes);

				string hash = BitConverter
					.ToString(hashBytes)
					.Replace("-", String.Empty);


				if (user.RefreshToken == null)
				{
					user.RefreshToken = new RefreshTokenDTO();
				}
				user.RefreshToken.Token = hash;
				user.RefreshToken.ExpiryTime = DateTime.Now.AddDays(10);
			}

		}

		public TokenDTO GetToken(UserDTO userDTO)
		{
			var identity = AuthOptions.GetIdentity(userDTO);

			if (identity == null)
			{
				throw new Infrastructure.ValidationException("Invalid login or password.");
			}

			var encodedJwt = AuthOptions.GenerateAccessToken(identity.Claims);

			return new TokenDTO
			{
				AccessToken = encodedJwt,
				Login = identity.Name,
				Role = userDTO.Role.Name,
				RefreshToken = userDTO.RefreshToken.Token
			};
		}
	}
}
