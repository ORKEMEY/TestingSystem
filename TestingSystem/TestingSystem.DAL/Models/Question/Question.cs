﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Models
{
	public class Question
	{
		public int Id { get; set; }

		public IEnumerable<VariantOfAnswer> Answers { get; set; }
		public IEnumerable<Tag> Tags { get; set; }

		public int QuestionTypeId { get; set; }
		public QuestionType QuestionType { get; set; }

		public IEnumerable<TestVariant> TestVariants { get; set; }

		public string Query { get; set; }

		public double Difficulty { get; set; }
	

		public Question()
		{
			TestVariants = new List<TestVariant>();
			Tags = new List<Tag>();
			Answers = new List<VariantOfAnswer>();
		}

	}
}
