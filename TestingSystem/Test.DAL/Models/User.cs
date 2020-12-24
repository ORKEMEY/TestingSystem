using System;
using System.Collections.Generic;

namespace TestSystem.DAL.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public bool IsAdmin { get; set; }
		public IEnumerable<Archive> PassingRecords { get; set; }

		public User()
		{
			IsAdmin = false;
			PassingRecords = new List<Archive>();
		}
	}
}
