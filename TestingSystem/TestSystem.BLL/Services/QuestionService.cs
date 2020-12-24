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
	public class QuestionService : IQuestionService
	{

		protected IUnitOfWork uof { get; set; }
		protected IVariantOfAnswerService voaService { get; set; }

		public QuestionService(IUnitOfWork uof, IVariantOfAnswerService voaService)
		{
			this.uof = uof;
			this.voaService = voaService;
		}

		public void AddItem(QuestionDTO questionDTO)
		{
			if (String.IsNullOrEmpty( questionDTO.Query))
				throw new ValidationException("Wrong or empty properties", "Query");

			var questionDAL = MapperBLL.Mapper.Map<Question>(questionDTO);
			uof.Questions.Create(questionDAL);
			uof.Save();
		}

		public void DeleteItem(QuestionDTO questionDTO)
		{
			if (questionDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Questions.Delete(questionDTO.Id);
			uof.Save();
		}

		public void UpdateItem(QuestionDTO questionDTO)
		{
			if (questionDTO.Id <= 0 | questionDTO.Query == null)
				throw new ValidationException("Wrong or empty properties");

			var questionDAL = uof.Questions.GetItem(questionDTO.Id);
			if (questionDAL == null) throw new ValidationException("Item not found");

			questionDAL.Query = questionDTO.Query;

			foreach(var voa in questionDTO.VariantsOfAnswer)
			{
				voaService.UpdateItem(voa);
			}

			uof.Questions.Update(questionDAL);
			uof.Save();
		}

		public IEnumerable<QuestionDTO> GetItems()
		{
			IEnumerable<Question> items = uof.Questions.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionDTO>>(items);

		}

		public IEnumerable<QuestionDTO> GetItems(string query)
		{
			IEnumerable<Question> items = uof.Questions.GetItems(c => c.Query == query);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionDTO>>(items);
		}

		public QuestionDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of question isn't set", "id");
			var question = uof.Questions.GetItem(id.Value);

			if (question == null) throw new ValidationException("No question was found");
			return MapperBLL.Mapper.Map<QuestionDTO>(question);

		}
	}
}
