using System;
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

		public int ModelId { get; set; }
		public Model Model { get; set; }

		public int QuestionTypeId { get; set; }
		public QuestionType QuestionType { get; set; }

		public int QuestionsAssemblyId { get; set; }
		public QuestionsAssembly QuestionsAssembly { get; set; }

		public IEnumerable<TestVariant> TestVariants { get; set; }

		public string Query { get; set; }

		public double bParam { get; set; }
		public double aParam { get; set; }
		public double cParam { get; set; }


	}
}
