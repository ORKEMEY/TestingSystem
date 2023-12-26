using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class TestVariant
	{
		public int Id { get; set; }
		public int Number { get; set; }

		public int TestId { get; set; }
		public Test Test { get; set; }

		public IEnumerable<Question> Questions { get; set; }

		public TestVariant()
		{
			Questions = new List<Question>();
		}
	}
}
