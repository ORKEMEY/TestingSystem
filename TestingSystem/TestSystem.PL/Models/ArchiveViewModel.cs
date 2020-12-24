using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSystem.PL.Models
{
	public class ArchiveViewModel
	{
		public int Id { get; set; }
		public int TestId { get; set; }
		public int UserId { get; set; }
		public IEnumerable<VariantOfAnswerViewModel> Answers { get; set; }

		public ArchiveViewModel()
		{
			TestId = 0;
			UserId = 0;
			Answers = new List<VariantOfAnswerViewModel>();
		}

	}
}
