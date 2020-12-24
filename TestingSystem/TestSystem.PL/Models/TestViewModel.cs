using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSystem.PL.Models
{
	public class TestViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public TimeSpan Time { get; set; }
		public IEnumerable<QuestionViewModel> Questions { get; set; }
		public IEnumerable<ArchiveViewModel> PassingRecords { get; set; }

		public TestViewModel()
		{
			Time = TimeSpan.Zero;
			Questions = new List<QuestionViewModel>();
			PassingRecords = new List<ArchiveViewModel>();
		}
	}
}
