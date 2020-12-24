using System;
using System.Collections.Generic;
using TestSystem.BLL.DTO;
using TestSystem.BLL.Infrastructure;

namespace TestSystem.BLL.Interfaces
{
	public interface ITestService : ICRUDService<TestDTO>
	{
		IEnumerable<TestDTO> GetItems(string name);
		void AddQuestion(TestDTO testDTO);
		TestResult CheckTest(int testId, string login, int[] answerid);
	}
}
