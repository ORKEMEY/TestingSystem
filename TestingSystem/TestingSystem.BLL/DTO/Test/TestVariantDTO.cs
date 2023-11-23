using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.DTO
{
	public class TestVariantDTO
	{
		public int Id { get; set; }
		public int Number { get; set; }

		public int TestId { get; set; }
		public TestDTO Test { get; set; }

		public IEnumerable<QuestionDTO> Questions { get; set; }
	}
}
