using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.DTO
{
	public class QuestionDTO
	{

		public int Id { get; set; }

		public IEnumerable<VariantOfAnswerDTO> Answers { get; set; }
		public IEnumerable<TagDTO> Tags { get; set; }

		public int QuestionTypeId { get; set; }
		public QuestionTypeDTO QuestionType { get; set; }

		public int? QuestionsAssemblyId { get; set; }


		public IEnumerable<TestVariantDTO> TestVariants { get; set; }

		public string Query { get; set; }

		public double bParam { get; set; }
		public double aParam { get; set; }
		public double cParam { get; set; }


	}
}
