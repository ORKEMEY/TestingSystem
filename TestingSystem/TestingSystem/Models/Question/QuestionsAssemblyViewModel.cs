using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.PL.Models
{
	public class QuestionsAssemblyViewModel
	{

		public int Id { get; set; }
		public string Name { get; set; }

		public int OwnerId { get; set; }

		public IEnumerable<QuestionViewModel> Questions { get; set; }
	}
}
