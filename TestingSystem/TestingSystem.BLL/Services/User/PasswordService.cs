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

namespace TestingSystem.BLL.Services
{
	public class PasswordService : IPasswordService
	{

		/// <param name="user"></param>
		/// <exception cref="ArgumentNullException"></exception>
		public void HashPassword(UserDTO user)
		{
			if (user == null || user?.Password == null)
			{
				throw new ArgumentNullException();
			}

			using (var sha = new SHA256Managed())
			{
				byte[] textBytes = Encoding.UTF8.GetBytes(user?.Password);
				byte[] hashBytes = sha.ComputeHash(textBytes);

				string hash = BitConverter
					.ToString(hashBytes)
					.Replace("-", String.Empty);

				user.Password = hash;
			}

		}
	}
}
