using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class QuestionPatcher
	{
		public static Question Patch(Question old, Question patch)
		{
			if (patch?.Query is not null)
				old.Query = patch?.Query;

			if (patch.Difficulty >= -10 && patch.Difficulty <= 10)
				old.Difficulty = patch.Difficulty;
						
			if (patch.QuestionTypeId > 0)
				old.QuestionTypeId = patch.QuestionTypeId;


			return old;
		}
	}
}
