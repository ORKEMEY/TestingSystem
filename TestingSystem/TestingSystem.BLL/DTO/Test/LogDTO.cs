using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.BLL.DTO
{
	public class LogDTO
	{
		public int Id { get; set; }

		public int UserId { get; set; }
		public UserDTO User { get; set; }

		public int TestId { get; set; }
		public TestDTO Test { get; set; }

		public TimeSpan ExpiredTime { get; set; }
		public DateTime DateTime { get; set; }
		public double Mark { get; set; }
		public int VariantNumer { get; set; }
	}
}
