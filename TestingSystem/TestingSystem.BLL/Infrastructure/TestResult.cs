using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.Infrastructure
{
	public class TestResult
	{

		public double Zero = 0;
		public double Points = 0;
		public double MaxPoints = 0;

		public double AbsPoints => Points - Zero;
		public double AbsMaxPoints => MaxPoints - (Zero * MaxNumberOfCorrectAnswers);

		public int NumberOfCorrectAnswers = 0;
		public int MaxNumberOfCorrectAnswers = 0;

		public TestResult(int zero)
		{
			Zero = zero;
		}

		public double GetPercentOfCorrectAnswers()
		{
			if (NumberOfCorrectAnswers == 0) return 0;
			return Math.Round(((double)NumberOfCorrectAnswers / MaxNumberOfCorrectAnswers) * 100, 2);
		}

		public double GetPercentOfWrongAnswers()
		{
			if (NumberOfCorrectAnswers == 0) return 0;
			return Math.Round(((double)(MaxNumberOfCorrectAnswers - NumberOfCorrectAnswers) / MaxNumberOfCorrectAnswers) * 100, 2);

		}

	}
}
