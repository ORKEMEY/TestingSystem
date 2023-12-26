using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class Tag
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public IEnumerable<Question> Questions { get; set; }
		public IEnumerable<Test> Tests { get; set; }

		public Tag()
		{
			Questions = new List<Question>();
			Tests = new List<Test>();
		}
	}
}
