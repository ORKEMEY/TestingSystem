﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class Model
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public IEnumerable<Question> Questions { get; set; }

		public Model()
		{
			Questions = new List<Question>();
		}
	}
}
