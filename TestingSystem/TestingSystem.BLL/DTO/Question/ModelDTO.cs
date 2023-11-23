using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.DTO
{
	public class ModelDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public IEnumerable<QuestionDTO> Questions { get; set; }
	}
}
