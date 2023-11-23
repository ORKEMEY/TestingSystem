using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.PL.Models
{

	public class TestVariantViewModel
	{
		public int Id { get; set; }
		public int Number { get; set; }

		public int TestId { get; set; }
		
		public IEnumerable<QuestionViewModel> Questions { get; set; }
	}
}
