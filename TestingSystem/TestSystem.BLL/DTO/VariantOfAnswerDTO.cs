using System.Collections.Generic;

namespace TestSystem.BLL.DTO
{
	public class VariantOfAnswerDTO
	{
		public int Id { get; set; }
		public string Answer { get; set; }
		public bool IsCorrect { get; set; }
		public int QuestionId { get; set; }
		public QuestionDTO Question { get; set; }
		public IEnumerable<ArchiveDTO> PassingRecords { get; set; }

		public VariantOfAnswerDTO()
		{
			IsCorrect = false;
			PassingRecords = new List<ArchiveDTO>();
		}
	}
}
