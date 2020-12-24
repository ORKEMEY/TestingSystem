using System;
using System.Collections.Generic;
using System.Text;

namespace TestSystem.BLL.DTO
{
	public class ArchiveDTO
	{
		public int Id { get; set; }
		public int TestId { get; set; }
		public TestDTO Test { get; set; }
		public int UserId { get; set; }
		public UserDTO User { get; set; }
		public IEnumerable<VariantOfAnswerDTO> Answers { get; set; }

		public ArchiveDTO()
		{
			TestId = 0;
			UserId = 0;
			Answers = new List<VariantOfAnswerDTO>();
		}

	}
}
