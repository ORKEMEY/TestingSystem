using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class Log
	{
		public int Id { get; set; }

		public int? UserId { get; set; }
		public User User { get; set; }

		public int? TestId { get; set; }
		public Test Test { get; set; }

		public TimeSpan ExpiredTime { get; set; }
		public DateTime DateTime { get; set; }
		public double Mark { get; set; }
		public int NumberOfCorrectAnswers { get; set; }
		public int VariantNumer { get; set; }
	}
}
