using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.PL.Models
{

	/// <summary>
	/// Refresh token + Access token
	/// </summary>
	public class TokenViewModel
	{
		public string AccessToken { get; set; }

		public string RefreshToken { get; set; }

		public string Login { get; set; }

		public string Role { get; set; }
	}
}
