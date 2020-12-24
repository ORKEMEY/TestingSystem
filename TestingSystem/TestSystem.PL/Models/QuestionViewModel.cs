using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSystem.PL.Models
{
	public class QuestionViewModel
	{
		public int Id { get; set; }
		public string Query { get; set; }
		public IEnumerable<VariantOfAnswerViewModel> VariantsOfAnswer { get; set; }

		public QuestionViewModel()
		{
			VariantsOfAnswer = new List<VariantOfAnswerViewModel>();
		}
	}
}
