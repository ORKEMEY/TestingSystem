﻿using TestingSystem.DAL.Models;

namespace TestingSystem.BLL.DTO
{
	public class UserDTO
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public string EMail { get; set; }
		public string Name { get; set; }
		public string Surname { get; set; }

		public RefreshTokenDTO RefreshToken { get; set; }
		public IEnumerable<Test> OwnedTests { get; set; }
		public IEnumerable<TestDTO> AccessibleTests { get; set; }
		public IEnumerable<QuestionsAssemblyDTO> QuestionsAssemblyies{ get; set; }

	}
}