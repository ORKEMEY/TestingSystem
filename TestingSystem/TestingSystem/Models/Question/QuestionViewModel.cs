using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.PL.Models
{
	public class QuestionViewModel
	{

		public int Id { get; set; }

		public IEnumerable<VariantOfAnswerViewModel> Answers { get; set; }
		public IEnumerable<TagViewModel> Tags { get; set; }

		public int ModelId { get; set; }
		public ModelViewModel Model { get; set; }

		public int QuestionTypeId { get; set; }
		public QuestionTypeViewModel QuestionType { get; set; }

		public int QuestionsAssemblyId { get; set; }


		public string Query { get; set; }

		public double bParam { get; set; }
		public double aParam { get; set; }
		public double cParam { get; set; }


	}
}
