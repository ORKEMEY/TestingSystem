using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestSystem.PL.Models
{
	public class VariantOfAnswerViewModel
	{
		public int Id { get; set; }
		public string Answer { get; set; }
		public int QuestionId { get; set; }
		public bool IsCorrect { get; set; }
	}
}
