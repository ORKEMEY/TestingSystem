﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Interfaces;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.DAL.Models;
using TestingSystem.DAL;
using AutoMapper.Execution;
using TestingSystem.DAL.Patchers;

namespace TestingSystem.BLL.Services
{
	public class TestVariantService : ITestVariantService
	{
		protected IUnitOfWork uof { get; set; }

		public TestVariantService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public TestVariantDTO AddItem(TestVariantDTO testVariantDTO)
		{
			if (testVariantDTO.Number <= 0)
				throw new ValidationException("Wrong or empty properties", "Number");
			if (testVariantDTO.TestId <= 0)
				throw new ValidationException("Wrong or empty properties", "TestId");


			var testVariantDAL = MapperBLL.Mapper.Map<TestVariant>(testVariantDTO);
			uof.TestVariants.Create(testVariantDAL);
			uof.Save();

			return MapperBLL.Mapper.Map<TestVariantDTO>(testVariantDAL);
		}

		public void DeleteItem(TestVariantDTO testVariantDTO)
		{
			if (testVariantDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.TestVariants.Delete(testVariantDTO.Id);
			uof.Save();
		}

		public void AddQuestion(int testVariantId, int questionId)
		{
			if (testVariantId <= 0 || questionId <= 0)
				throw new ValidationException("Wrong or empty property Id");


			var testVarDAL = uof.TestVariants.GetItem(testVariantId);
			if (testVarDAL == null) throw new ValidationException("No test variant was found");

			var questionDAL = uof.Questions.GetItems(c => c.Id == questionId).FirstOrDefault();
			if (questionDAL == null) throw new ValidationException("No question was found");

			(testVarDAL.Questions as List<Question>).Add(questionDAL); ;
			
			uof.Save();
		}

		public void DeleteQuestion(int testVariantId, int questionId)
		{
			if (testVariantId <= 0 || questionId <= 0)
				throw new ValidationException("Wrong or empty property Id");


			var testVarDAL = uof.TestVariants.GetItem(testVariantId);
			if (testVarDAL == null) throw new ValidationException("No test variant was found");

			var questionDAL = testVarDAL.Questions.Where(c => c.Id == questionId).FirstOrDefault();
			if (questionDAL == null) throw new ValidationException("No question was found");
			
			(testVarDAL.Questions as List<Question>).Remove(questionDAL);
			uof.Save();
		}

		public void UpdateItem(TestVariantDTO testVariantDTO)
		{
			if (testVariantDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var testVariantDALold = uof.TestVariants.GetItem(testVariantDTO.Id);
			if (testVariantDALold == null) throw new ValidationException("Item not found");

			var testVariantDALnew = MapperBLL.Mapper.Map<TestVariant>(testVariantDTO);

			TestVariantPatcher.Patch(testVariantDALold, testVariantDALnew);

			uof.TestVariants.Update(testVariantDALold);
			uof.Save();
		}

		public IEnumerable<TestVariantDTO> GetItems()
		{
			IEnumerable<TestVariant> items = uof.TestVariants.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<TestVariantDTO>>(items);
		}

		public IEnumerable<TestVariantDTO> GetTestVarsByNumber(int number)
		{
			IEnumerable<TestVariant> items = uof.TestVariants.GetItems(c => c.Number == number);
			return MapperBLL.Mapper.Map<IEnumerable<TestVariantDTO>>(items);
		}

		public IEnumerable<TestVariantDTO> GetTestVarsByTestId(int testId)
		{
			IEnumerable<TestVariant> items = uof.TestVariants.GetItems(c => c.TestId == testId);
			return MapperBLL.Mapper.Map<IEnumerable<TestVariantDTO>>(items);
		}

		public TestVariantDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of test variant isn't set", "id");
			var answer = uof.TestVariants.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No test variant was found");
			return MapperBLL.Mapper.Map<TestVariantDTO>(answer);

		}
	}
}
