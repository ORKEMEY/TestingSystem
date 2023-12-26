using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class QuestionsAssembly
	{

		public int Id { get; set; }
		public string Name { get; set; }

		public int OwnerId { get; set; }
		public User Owner { get; set; }

		public IEnumerable<Question> Questions { get; set; }

		public QuestionsAssembly()
		{
			Questions = new List<Question>();
		}
	}
}
