using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class Test
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public int OwnerId { get; set; }
		public User Owner { get; set; }
		public IEnumerable<User> AllowedUsers { get; set; }

		public IEnumerable<TestVariant> TestVariants { get; set; }

		public IEnumerable<Tag> Tags { get; set; }

		public TimeSpan Duration { get; set; }
		public DateTime? OpeningTime { get; set; }
		public DateTime? ClosureTime { get; set; }

		public bool IsAccessOpen { get; set; }
		public int NumberOfVariants { get; set; }
		public string Description { get; set; }


	}
}
