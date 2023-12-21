using System;
using System.Collections.Generic;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Infrastructure;

namespace TestingSystem.BLL.Interfaces
{
	public interface ITestService : ICRUDService<TestDTO>
	{
		IEnumerable<TestDTO> GetItems(string name);
		IEnumerable<TestDTO> GetOwnedItems(int ownerId);
		IEnumerable<TestDTO> SearchOwnedItems(int ownerId, string name);
		TestDTO GetOwnedItem(int ownerId, int? id);
		TestDTO AddOwnedItem(int ownerId, TestDTO testDTO);
		void UpdateOwnedItem(int ownerId, TestDTO testDTO);
		void DeleteOwendItem(int ownerId, TestDTO testDTO);
	}
}
