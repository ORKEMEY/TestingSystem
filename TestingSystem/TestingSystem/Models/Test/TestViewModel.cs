using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.PL.Models
{

	public class TestViewModel
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public int OwnerId { get; set; }

		public IEnumerable<TestVariantViewModel> TestVariants { get; set; }

		public IEnumerable<TagViewModel> Tags { get; set; }

		public TimeSpan Duration { get; set; }
		public DateTime? OpeningTime { get; set; }
		public DateTime? ClosureTime { get; set; }

		public bool IsAccessOpen { get; set; }
		public int NumberOfVariants { get; set; }
		public string Description { get; set; }


	}
}
