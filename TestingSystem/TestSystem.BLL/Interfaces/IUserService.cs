using System;
using System.Collections.Generic;
using TestSystem.BLL.DTO;

namespace TestSystem.BLL.Interfaces
{
	public interface IUserService : ICRUDService<UserDTO>
	{
		IEnumerable<UserDTO> GetItems(string login);
		public UserDTO Authentificate(string login, string password);
	}
}
