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

namespace TestingSystem.BLL.Services
{


	public class TestService : ITestService
	{
		
		protected IUnitOfWork uof { get; set; }
		

		public TestService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(TestDTO testDTO)
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
		}

		public void DeleteItem(TestDTO testDTO)
		{
			if (testDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Tests.Delete(testDTO.Id);
			uof.Save();
		}

		public void UpdateItem(TestDTO testDTO)
		{
			if (testDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var testDALold = uof.Tests.GetItem(testDTO.Id);
			if (testDALold == null) throw new ValidationException("Item not found");

			var testDALnew = MapperBLL.Mapper.Map<Test>(testDTO);

			testDALnew.Id = testDALold.Id;

			uof.Tests.Update(testDALnew);
			uof.Save();
		}

		public void UpdateItem(QuestionsAssemblyDTO questionsAssemblyDTO)
		{
			if (questionsAssemblyDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var questionsAssemblyDALold = uof.QuestionsAssemblies.GetItem(questionsAssemblyDTO.Id);
			if (questionsAssemblyDALold == null) throw new ValidationException("Item not found");

			var questionsAssemblyDALnew = MapperBLL.Mapper.Map<QuestionsAssembly>(questionsAssemblyDTO);

			questionsAssemblyDALnew.Id = questionsAssemblyDALold.Id;

			uof.QuestionsAssemblies.Update(questionsAssemblyDALnew);
			uof.Save();
		}

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
		
	}
	
}
