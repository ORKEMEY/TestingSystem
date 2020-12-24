using System;
using System.Collections.Generic;

namespace TestSystem.DAL.Models
{
	public class Archive
	{
		public int Id { get; set; }
		public int TestId { get; set; }
		public Test Test { get; set; }
		public int UserId { get; set; }
		public User User { get; set; }
		public IEnumerable<VariantOfAnswer> Answers { get; set; }

		public Archive()
		{
			TestId = 0;
			UserId = 0;
			Answers = new List<VariantOfAnswer>();
		}

	}
}
