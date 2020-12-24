using System;
using System.Collections.Generic;

namespace TestSystem.DAL.Models
{
	public class Question
	{
		public int Id { get; set; }
		public string Query { get; set; }
		public IEnumerable<Test> Tests { get; set; }
		public IEnumerable<VariantOfAnswer> VariantsOfAnswer { get; set; }

		public Question()
		{
			Tests = new List<Test>();
			VariantsOfAnswer = new List<VariantOfAnswer>();
		}

	}
}
