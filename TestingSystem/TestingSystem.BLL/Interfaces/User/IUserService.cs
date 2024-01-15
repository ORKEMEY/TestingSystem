using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;

namespace TestingSystem.BLL.Interfaces
{
	public interface IUserService : ICRUDService<UserDTO>
	{
		IEnumerable<UserDTO> GetItems(string login);
		public UserDTO Authentificate(string login, string password, bool hashPassword = true);
		public UserDTO GetUserByAccessToken(TokenDTO token);
	}
}
