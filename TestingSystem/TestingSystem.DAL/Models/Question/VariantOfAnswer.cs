﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class VariantOfAnswer
	{
		public int Id { get; set; }
		public string Answer { get; set; }
		public bool? IsCorrect { get; set; }

		public int QuestionId { get; set; }
		public Question Question { get; set; }
	}
}
