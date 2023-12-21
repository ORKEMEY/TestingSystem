using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Interfaces;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.DAL.Models;
using TestingSystem.DAL;
using TestingSystem.DAL.Patchers;

namespace TestingSystem.BLL.Services
{


	public class TestService : ITestService
	{
		
		protected IUnitOfWork uof { get; set; }
		

		public TestService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		#region Admin

		public IEnumerable<TestDTO> GetItems()
		{
			IEnumerable<Test> items = uof.Tests.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<TestDTO>>(items);
		}

		public IEnumerable<TestDTO> GetItems(string name)
		{
			if (String.IsNullOrEmpty(name))
				throw new ValidationException("Wrong or empty property Id");

			IEnumerable<Test> items = uof.Tests.GetItems(c => c.Name == name);
			return MapperBLL.Mapper.Map<IEnumerable<TestDTO>>(items);
		}

		public TestDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of test isn't set", "id");
			var test = uof.Tests.GetItem(id.Value);

			if (test == null) throw new ValidationException("No test was found");
			return MapperBLL.Mapper.Map<TestDTO>(test);

		}

		public void UpdateItem(TestDTO testDTO)
		{
			if (testDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var testDALold = uof.Tests.GetItem(testDTO.Id);
			if (testDALold == null) throw new ValidationException("Item not found");

			var testDALnew = MapperBLL.Mapper.Map<Test>(testDTO);

			TestPatcher.Patch(testDALold, testDALnew);

			uof.Tests.Update(testDALold);
			uof.Save();
		}

		public TestDTO AddItem(TestDTO testDTO)
		{
			if (String.IsNullOrEmpty(testDTO.Name))
				throw new ValidationException("Wrong or empty properties", "Name");
			if (testDTO.Duration == TimeSpan.Zero)
				throw new ValidationException("Wrong or empty properties", "Duration");
			if (testDTO.Duration >= TimeSpan.FromHours(24))
				throw new ValidationException("Duration cann't be more than 24 hour", "Duration");
			if (testDTO.OwnerId <= 0)
				throw new ValidationException("Wrong or empty properties", "OwnerId");
			if (testDTO.NumberOfVariants <= 0)
				throw new ValidationException("Wrong or empty properties", "NumberOfVariants");


			var testDAL = MapperBLL.Mapper.Map<Test>(testDTO);
			uof.Tests.Create(testDAL);
			uof.Save();

			return MapperBLL.Mapper.Map<TestDTO>(testDAL);
		}

		public void DeleteItem(TestDTO testDTO)
		{
			if (testDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Tests.Delete(testDTO.Id);
			uof.Save();
		}

		#endregion

		#region Customer

		public IEnumerable<TestDTO> GetOwnedItems(int ownerId)
		{
			if (ownerId <= 0)
				throw new ValidationException("Wrong or empty property ownerId");

			IEnumerable<Test> items = uof.Tests.GetItems(c => c.OwnerId == ownerId);
			return MapperBLL.Mapper.Map<IEnumerable<TestDTO>>(items);
		}

		public IEnumerable<TestDTO> SearchOwnedItems(int ownerId, string name)
		{
			if (String.IsNullOrEmpty(name))
				throw new ValidationException("Wrong or empty property Id");

			IEnumerable<Test> items = uof.Tests.GetItems(c => c.OwnerId == ownerId && c.Name == name);
			return MapperBLL.Mapper.Map<IEnumerable<TestDTO>>(items);
		}

		public TestDTO GetOwnedItem(int ownerId, int? id)
		{
			if (id == null) throw new ValidationException("Id of test isn't set", "id");
			var test = GetOwnedItems(ownerId).Where(c => c.Id == id.Value).FirstOrDefault();

			if (test == null) throw new ValidationException("No test was found");
			return MapperBLL.Mapper.Map<TestDTO>(test);

		}

		public TestDTO AddOwnedItem(int ownerId, TestDTO testDTO)
		{
			testDTO.OwnerId = ownerId;
			return this.AddItem(testDTO);
		}

		public void UpdateOwnedItem(int ownerId, TestDTO testDTO)
		{
			var testDALold = uof.Tests.GetItems(c => c.OwnerId == ownerId && c.Id == testDTO.Id).FirstOrDefault();
			if (testDALold == null) throw new ValidationException("Item is not found in you collection");

			this.UpdateItem(testDTO);
		}

		public void DeleteOwendItem(int ownerId, TestDTO testDTO)
		{
			if (testDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			try
			{
				var test = uof.Tests.GetItems(c => c.OwnerId == ownerId && c.Id == testDTO.Id).Single();
				if (test == null) throw new ValidationException("Item is not found in you collection");
				uof.Tests.Delete(test.Id);
				uof.Save();
			}
			catch (ValidationException e)
			{
				throw new ValidationException(e.Message);
			}
			catch (Exception e)
			{
				throw new ValidationException("Couldn't delete test");
			}
		}

		#endregion


	}
	
}
