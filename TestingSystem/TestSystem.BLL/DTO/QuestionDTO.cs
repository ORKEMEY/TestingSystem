using System;
using System.Collections.Generic;

namespace TestSystem.BLL.DTO
{
	public class QuestionDTO
	{
		public int Id { get; set; }
		public string Query { get; set; }
		public IEnumerable<TestDTO> Tests { get; set; }
		public IEnumerable<VariantOfAnswerDTO> VariantsOfAnswer { get; set; }

		public QuestionDTO()
		{
			Tests = new List<TestDTO>();
			VariantsOfAnswer = new List<VariantOfAnswerDTO>();
		}
	}
}
