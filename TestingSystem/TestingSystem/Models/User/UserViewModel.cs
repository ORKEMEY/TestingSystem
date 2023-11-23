using TestingSystem.DAL.Models;

namespace TestingSystem.PL.Models
{

	public class UserViewModel
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public string EMail { get; set; }
		public string Name { get; set; }
		public string Surname { get; set; }

		public RefreshTokenViewModel RefreshToken { get; set; }

	}
}