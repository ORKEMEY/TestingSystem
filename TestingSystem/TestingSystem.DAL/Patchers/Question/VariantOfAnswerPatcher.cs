using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class VariantOfAnswerPatcher
	{
		public static VariantOfAnswer Patch(VariantOfAnswer old, VariantOfAnswer patch)
		{
			if (patch?.Answer is not null)
				old.Answer = patch?.Answer;

			if (patch?.IsCorrect is not null)
				old.IsCorrect = patch?.IsCorrect;

			if (patch.QuestionId > 0)
				old.QuestionId = patch.QuestionId;

			return old;
		}
	}
}
