using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.DTO
{
	public class QuestionsAssemblyDTO
	{

		public int Id { get; set; }
		public string Name { get; set; }

		public int OwnerId { get; set; }
		public UserDTO Owner { get; set; }

		public IEnumerable<QuestionDTO> Questions { get; set; }
	}
}
