using System;
using System.Collections.Generic;
using System.Text;

namespace TestSystem.BLL.Infrastructure
{
	public class TestResult
	{
		public int summuryPoints = 0;
		public int numberOfCorrectAnswers = 0;
		public int numberOfWrongAnswers = 0;
		public int numberOfTestCorrectAnswers = 0;

		public double GetPercentOfCorrectAnswers()
		{
			if ((numberOfWrongAnswers + numberOfCorrectAnswers) == 0) return 0;
			return Math.Round(((double)numberOfCorrectAnswers / (numberOfWrongAnswers + numberOfCorrectAnswers)) * 100, 2);
		}

		public double GetPercentOfWrongAnswers()
		{
			if ((numberOfWrongAnswers + numberOfCorrectAnswers) == 0) return 0;
			return Math.Round(((double)numberOfWrongAnswers / (numberOfWrongAnswers + numberOfCorrectAnswers)) * 100, 2);
			
		}

		public double GetPercentOfCorrAnswFromAllCorrAns()
		{
			if (numberOfTestCorrectAnswers == 0) return 0;
			return Math.Round(((double)numberOfCorrectAnswers / numberOfTestCorrectAnswers) * 100, 2);
		}
	}
}
