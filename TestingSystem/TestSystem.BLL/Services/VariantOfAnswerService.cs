﻿using System;
using System.Collections.Generic;
using TestSystem.BLL.Interfaces;
using TestSystem.BLL.Infrastructure;
using TestSystem.BLL.DTO;
using TestSystem.DAL.Models;
using TestSystem.DAL;

namespace TestSystem.BLL.Services
{
	public class VariantOfAnswerService : IVariantOfAnswerService
	{

		protected IUnitOfWork uof { get; set; }

		public VariantOfAnswerService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(VariantOfAnswerDTO answerDTO)
		{
			if (answerDTO.Answer == null || answerDTO.QuestionId <= 0)
				throw new ValidationException("Wrong or empty properties", "Answer");

			var qDAL = uof.Questions.GetItem(answerDTO.QuestionId);
			if (qDAL == null) throw new ValidationException("Question not found");

			var answerDAL = MapperBLL.Mapper.Map<VariantOfAnswer>(answerDTO);
			uof.VariantsOfAnswer.Create(answerDAL);
			uof.Save();
		}

		public void DeleteItem(VariantOfAnswerDTO answerDTO)
		{
			if (answerDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.VariantsOfAnswer.Delete(answerDTO.Id);
			uof.Save();
		}

		public void UpdateItem(VariantOfAnswerDTO answerDTO)
		{
			if (answerDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var answerDAL = uof.VariantsOfAnswer.GetItem(answerDTO.Id);
			if (answerDAL == null) throw new ValidationException("Item not found");

			if(!String.IsNullOrEmpty(answerDTO.Answer))
				answerDAL.Answer = answerDTO.Answer;
			answerDAL.IsCorrect = answerDTO.IsCorrect;

			uof.VariantsOfAnswer.Update(answerDAL);
			uof.Save();
		}

		public IEnumerable<VariantOfAnswerDTO> GetItems()
		{
			IEnumerable<VariantOfAnswer> items = uof.VariantsOfAnswer.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<VariantOfAnswerDTO>>(items);

		}

		public IEnumerable<VariantOfAnswerDTO> GetItems(string answer)
		{
			IEnumerable<VariantOfAnswer> items = uof.VariantsOfAnswer.GetItems(c => c.Answer == answer);
			return MapperBLL.Mapper.Map<IEnumerable<VariantOfAnswerDTO>>(items);
		}

		public VariantOfAnswerDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of answer isn't set", "id");
			var answer = uof.VariantsOfAnswer.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No answer was found");
			return MapperBLL.Mapper.Map<VariantOfAnswerDTO>(answer);

		}
	}
}
