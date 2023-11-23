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

		public int ModelId { get; set; }
		public ModelDTO Model { get; set; }

		public int QuestionTypeId { get; set; }
		public QuestionTypeDTO QuestionType { get; set; }

		public int QuestionsAssemblyId { get; set; }
		public QuestionsAssemblyDTO QuestionsAssembly { get; set; }

		public IEnumerable<TestVariantDTO> TestVariants { get; set; }

		public string Query { get; set; }

		public int bParam { get; set; }
		public int aParam { get; set; }
		public int cParam { get; set; }


	}
}
