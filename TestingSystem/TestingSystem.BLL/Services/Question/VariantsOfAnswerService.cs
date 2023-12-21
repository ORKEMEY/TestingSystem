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
	public class VariantOfAnswerService : IVariantOfAnswerService
	{
		protected IUnitOfWork uof { get; set; }

		public VariantOfAnswerService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public VariantOfAnswerDTO AddItem(VariantOfAnswerDTO answerDTO)
		{
			if (answerDTO.Answer == null || answerDTO.QuestionId <= 0)
				throw new ValidationException("Wrong or empty properties", "Answer");

			var qDAL = uof.Questions.GetItem(answerDTO.QuestionId);
			if (qDAL == null) throw new ValidationException("Question not found");

			var answerDAL = MapperBLL.Mapper.Map<VariantOfAnswer>(answerDTO);
			uof.VariantsOfAnswer.Create(answerDAL);
			uof.Save();

			return MapperBLL.Mapper.Map<VariantOfAnswerDTO>(answerDAL);
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

			var answerDALold = uof.VariantsOfAnswer.GetItem(answerDTO.Id);
			if (answerDALold == null) throw new ValidationException("Item not found");

			var answerDALnew = MapperBLL.Mapper.Map<VariantOfAnswer>(answerDTO);

			VariantOfAnswerPatcher.Patch(answerDALold, answerDALnew);

			uof.VariantsOfAnswer.Update(answerDALold);
			uof.Save();
		}

		public IEnumerable<VariantOfAnswerDTO> GetItems()
		{
			IEnumerable<VariantOfAnswer> items = uof.VariantsOfAnswer.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<VariantOfAnswerDTO>>(items);

		}

		public IEnumerable<VariantOfAnswerDTO> GetAnswers(string answer)
		{
			IEnumerable<VariantOfAnswer> items = uof.VariantsOfAnswer.GetItems(c => c.Answer == answer);
			return MapperBLL.Mapper.Map<IEnumerable<VariantOfAnswerDTO>>(items);
		}

		public VariantOfAnswerDTO GetAnswer(string answer)
		{
			VariantOfAnswer items = uof.VariantsOfAnswer.GetItems(c => c.Answer == answer).FirstOrDefault();
			return MapperBLL.Mapper.Map<VariantOfAnswerDTO>(items);
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
