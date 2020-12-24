using System;
using System.Collections.Generic;

namespace TestSystem.DAL.Models
{
	public class VariantOfAnswer
	{
		public int Id { get; set; }
		public string Answer { get; set; }
		public bool IsCorrect { get; set; }
		public int QuestionId { get; set; }
		public Question Question { get; set; }
		public IEnumerable<Archive> PassingRecords { get; set; }

		public VariantOfAnswer()
		{
			IsCorrect = false;
			PassingRecords = new List<Archive>();
		}
	}
}
