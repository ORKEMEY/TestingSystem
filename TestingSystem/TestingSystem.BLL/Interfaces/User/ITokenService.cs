using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;


namespace TestingSystem.BLL.Interfaces
{
	public interface ITokenService
	{
		TokenDTO RefreshToken(TokenDTO token);
		void AssignRefreshToken(UserDTO user);
		public TokenDTO GetToken(UserDTO userDTO);
	}
}
