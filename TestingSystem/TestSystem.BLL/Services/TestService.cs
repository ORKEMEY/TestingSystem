using System;
using System.Collections.Generic;
using TestSystem.BLL.Interfaces;
using TestSystem.BLL.Infrastructure;
using TestSystem.BLL.DTO;
using TestSystem.DAL.Models;
using TestSystem.DAL;
using System.Linq;


namespace TestSystem.BLL.Services
{
	
	public class TestService : ITestService
	{
		protected IUnitOfWork uof { get; set; }
		protected IQuestionService questionService { get; set; }
		protected IArchiveService archiveService { get; set; }

		public TestService(IUnitOfWork uof, IQuestionService qs, IArchiveService archiveService)
		{
			this.uof = uof;
			this.questionService = qs;
			this.archiveService = archiveService;
		}

		public void AddItem(TestDTO testDTO)
		{
			if (String.IsNullOrEmpty(testDTO.Name) || testDTO.Time == TimeSpan.Zero)
				throw new ValidationException("Wrong or empty properties", "Name");
			if (testDTO.Time >= TimeSpan.FromHours(24))
				throw new ValidationException("Duration cann't be more than 24 hour", "Duration");

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

			var testDAL = uof.Tests.GetItem(testDTO.Id);
			if (testDAL == null) throw new ValidationException("Item not found");

			if(testDTO.Name != null)
				testDAL.Name = testDTO.Name;
			if (testDTO.Time != TimeSpan.Zero)
				testDAL.Time = testDTO.Time;

			foreach (var q in testDTO.Questions)
			{
				questionService.UpdateItem(q);
			}

			uof.Tests.Update(testDAL);
			uof.Save();
		}

		public void AddQuestion(TestDTO testDTO)
		{
			if (testDTO?.Id <= 0 | testDTO?.Questions?.First().Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var qDAL = uof.Questions.GetItem(testDTO.Questions.First().Id);
			if (qDAL == null)
				throw new ValidationException("Question not found");
			var testDAL = uof.Tests.GetItem(testDTO.Id);
			if (testDAL == null)
				throw new ValidationException("Test not found");

			var tests = qDAL.Tests as List<Test>;
			tests.Add(testDAL);

			uof.Save();

		}

		public IEnumerable<TestDTO> GetItems()
		{
			IEnumerable<Test> items = uof.Tests.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<TestDTO>>(items);
		}

		public IEnumerable<TestDTO> GetItems(string name)
		{
			if (String.IsNullOrEmpty( name))
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

		private Archive WriteArchive(int testId, string login, int[] answerid)
		{
			if (testId <= 0)
				throw new ValidationException("No test was found");

			if (String.IsNullOrEmpty(login))
				throw new ValidationException("Wrong or empty property login");

			var user = uof.Users.GetItems(u => u.Login == login).FirstOrDefault();
			if (user == null)
				throw new ValidationException("No user with such login was found", "Login");

			if (answerid.Length == 0) return null;

			var answers = new List<VariantOfAnswer>() ;

			foreach (var id in answerid)
			{
				answers.Add(uof.VariantsOfAnswer.GetItem(id));
			}

			var archiveDAL = new Archive()
			{
				TestId = testId,
				UserId = user.Id,
				Answers = answers
			};

			uof.PassingRecords.Create(archiveDAL);
			uof.Save();
			return archiveDAL;
		}


		public TestResult CheckTest(int testId, string login, int[] answerid)
		{
			var archiveDAL = WriteArchive(testId, login, answerid);

			var TestRes = new TestResult();
			if (archiveDAL == null) return TestRes;

			var test = uof.Tests.GetItem(archiveDAL.TestId);
			

			foreach(var query in test.Questions)
			{
				TestRes.numberOfTestCorrectAnswers += query.VariantsOfAnswer.Where(u => u.IsCorrect).Select(u => u).Count();

				var voa = query.VariantsOfAnswer.Select(u => u.Id);
				var answers = voa.Intersect(answerid);

				int points = 0;

				foreach(var answer in answers)
				{
					if (query.VariantsOfAnswer.Where(u => u.Id == answer).First().IsCorrect)
					{
						points++;
						TestRes.numberOfCorrectAnswers++;
					}
					else
					{
						points--;
						TestRes.numberOfWrongAnswers++;
					}	
				}
				TestRes.summuryPoints += points;
			}

			return TestRes;

		}
	}

	
}
