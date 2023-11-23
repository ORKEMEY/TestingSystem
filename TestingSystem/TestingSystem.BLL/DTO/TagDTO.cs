using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.DTO
{
	public class TagDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public IEnumerable<QuestionDTO> Questions { get; set; }
		public IEnumerable<TestDTO> Tests { get; set; }
	}
}
