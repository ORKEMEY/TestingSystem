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

			if (patch.bParam >= -10 && patch.bParam <= 10) 
				old.bParam = patch.bParam;

			if (patch.aParam > 0 && patch.aParam <= 20)
				old.aParam = patch.aParam;

			if (patch.cParam >= 0 && patch.cParam <= 1)
				old.cParam = patch.cParam;

			if (patch.ModelId > 0)
				old.ModelId = patch.ModelId;

			if (patch.QuestionTypeId > 0)
				old.QuestionTypeId = patch.QuestionTypeId;

			if (patch.QuestionsAssemblyId > 0)
				old.QuestionsAssemblyId = patch.QuestionsAssemblyId;

			return old;
		}
	}
}
