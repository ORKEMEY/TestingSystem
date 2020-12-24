using System;
using System.Collections.Generic;

namespace TestSystem.DAL.Models
{
	public class Test
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public TimeSpan Time { get; set; }
		public IEnumerable<Question> Questions { get; set; }
		public IEnumerable<Archive> PassingRecords { get; set; }

		public Test()
		{
			Time = TimeSpan.Zero;
			Questions = new List<Question>();
			PassingRecords = new List<Archive>();
		}
	}
}
