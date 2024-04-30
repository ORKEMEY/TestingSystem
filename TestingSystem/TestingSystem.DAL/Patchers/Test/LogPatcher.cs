using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class LogPatcher
	{

		public static Log Patch(Log old, Log patch)
		{


			if (patch.UserId > 0)
				old.UserId = patch.UserId;

			if (patch.TestId > 0)
				old.TestId = patch.TestId;
			
			if (patch?.ExpiredTime is not null)
				old.ExpiredTime = patch.ExpiredTime;

			if (patch?.DateTime is not null)
				old.DateTime = patch.DateTime;

			if (patch?.VariantNumer > 0)
				old.VariantNumer = patch.VariantNumer;
									
	
				old.MaxPoints = patch.MaxPoints;

				old.Mark = patch.Mark;

			if(patch?.NumberOfCorrectAnswers > 0)
				old.NumberOfCorrectAnswers = patch.NumberOfCorrectAnswers;

			if (patch?.MaxNumberOfCorrectAnswers > 0)
				old.MaxNumberOfCorrectAnswers = patch.MaxNumberOfCorrectAnswers;

			return old;
		}
	}
}
