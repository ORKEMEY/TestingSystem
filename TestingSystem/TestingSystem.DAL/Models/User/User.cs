namespace TestingSystem.DAL.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public string EMail { get; set; }
		public string Name { get; set; }
		public string Surname { get; set; }

		public int RoleId { get; set; }
		public Role Role { get; set; }

		public RefreshToken RefreshToken { get; set; }
		public IEnumerable<Log> Logs { get; set; }
		public IEnumerable<Test> OwnedTests { get; set; }
		public IEnumerable<Test> AccessibleTests { get; set; }
		public IEnumerable<QuestionsAssembly> QuestionsAssemblyies{ get; set; }

		public User()
		{
			Logs = new List<Log>();
			OwnedTests = new List<Test>();
			AccessibleTests = new List<Test>();
			QuestionsAssemblyies = new List<QuestionsAssembly>();
		}

	}
}