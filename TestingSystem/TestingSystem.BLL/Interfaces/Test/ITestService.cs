using System;
using System.Collections.Generic;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Infrastructure;

namespace TestingSystem.BLL.Interfaces
{
	public interface ITestService : ICRUDService<TestDTO>
	{
		IEnumerable<TestDTO> GetItems(string name);
	}
}
