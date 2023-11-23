using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.DTO
{

	/// <summary>
	/// Refresh token + Access token
	/// </summary>
	public class TokenDTO
	{
		public string AccessToken { get; set; }

		public string RefreshToken { get; set; }

		public string Login { get; set; }

	}
}
