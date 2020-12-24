using System;
using System.Collections.Generic;
using System.Text;

namespace TestSystem.BLL.DTO
{
	public class TestDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public TimeSpan Time { get; set; }
		public IEnumerable<QuestionDTO> Questions { get; set; }
		public IEnumerable<ArchiveDTO> PassingRecords { get; set; }

		public TestDTO()
		{
			Time = TimeSpan.Zero;
			Questions = new List<QuestionDTO>();
			PassingRecords = new List<ArchiveDTO>();
		}
	}
}
