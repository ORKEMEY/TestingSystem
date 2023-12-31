using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.BLL.Interfaces;
using TestingSystem.DAL;
using TestingSystem.DAL.Models;

namespace TestingSystem.BLL.Services
{
	public class CheckTestService : ICheckTestInterface
	{

		protected IUnitOfWork uof { get; set; }
		protected ILogService log { get; set; }


		public CheckTestService(IUnitOfWork uof, ILogService logService)
		{
			this.uof = uof;
			this.log = logService;
		}

		public TestResult CheckTest(int userId, TestDTO testDTO, LogDTO logDTO)
		{

			if (testDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties", "Id");

			if (testDTO.TestVariants == null || testDTO.TestVariants.Count() == 0)
				throw new ValidationException("Wrong or empty properties", "TestVariants");


			var testDAL = uof.Tests.GetItem(testDTO.Id);
			if (testDAL == null) throw new ValidationException("Test not found");

			var testVarDAL = uof.TestVariants.GetItem(testDTO.TestVariants.First().Id);
			if (testDAL == null) throw new ValidationException("Test Variant not found");

			var qustionsDAL = uof.Questions.GetItems(q => testDTO.TestVariants.First().Questions.Any(c => c.Id == q.Id));

			var testRes = new TestResult(-10);

			testRes.MaxNumberOfCorrectAnswers = testVarDAL.Questions.Count();
			foreach (var q in testVarDAL.Questions)
				testRes.MaxPoints += q.bParam;


			foreach (var questionAns in testDTO.TestVariants.First().Questions)
			{
				var questionModel = MapperBLL.Mapper.Map<QuestionDTO>(qustionsDAL.Where(q => q.Id == questionAns.Id).First());
				bool res = false;

				if (questionAns.QuestionType.Name == "Short Answer")
				{
					res = CheckShAQuestion(questionAns, MapperBLL.Mapper.Map<QuestionDTO>(questionModel));
				}
				else
				{
					res = CheckSChQuestion(questionAns, MapperBLL.Mapper.Map<QuestionDTO>(questionModel));
				}

				if (res)
				{
					testRes.Points += questionModel.bParam;
					testRes.NumberOfCorrectAnswers++;
				}
			}

			Log(logDTO, userId, testDTO, testRes);

			return testRes;
		}

		private void Log(LogDTO logDTO, int userId, TestDTO testDTO, TestResult testRes)
		{
			logDTO.Mark = testRes.Points;
			logDTO.NumberOfCorrectAnswers = testRes.NumberOfCorrectAnswers;
			logDTO.UserId = userId;
			logDTO.TestId = testDTO.Id;
			logDTO.VariantNumer = testDTO.TestVariants.First().Number;

			log.AddItem(logDTO);
		}

		private bool CheckShAQuestion(QuestionDTO questionAns, QuestionDTO questionModel)
		{

			string prepStr(string str) => Regex.Replace(str, @"\s+", " ", RegexOptions.Multiline).Trim().ToLower();

			var answer = questionAns.Answers.First();

			var answerStr = prepStr(answer.Answer);

			foreach (var answerModel in questionModel.Answers.Where(a => a.IsCorrect.Value))
			{
				var answerModStr = prepStr(answerModel.Answer);

				if (answerModStr == answerStr)
				{
					return true;
				}
			}

			return false;
		}

		private bool CheckSChQuestion(QuestionDTO questionAns, QuestionDTO questionModel)
		{
			var answer = questionAns.Answers.First();

			foreach (var answerModel in questionModel.Answers.Where(a => a.IsCorrect.Value))
			{
				if (answerModel.Id == answer.Id)
				{
					return true;
				}
			}

			return false;
		}
	}
}
