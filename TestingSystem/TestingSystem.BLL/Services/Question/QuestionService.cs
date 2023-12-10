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
	public class QuestionService : IQuestionService
	{

		protected IUnitOfWork uof { get; set; }

		public QuestionService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(QuestionDTO questionDTO)
		{
			if (questionDTO.Query == null)
				throw new ValidationException("Wrong or empty properties", "Query");
			if (questionDTO.bParam < 0)
				throw new ValidationException("Wrong or empty properties", "bParam");
			if (questionDTO.aParam < 0)
				throw new ValidationException("Wrong or empty properties", "aParam");
			if (questionDTO.cParam < 0)
				throw new ValidationException("Wrong or empty properties", "cParam");

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
			if (questionDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var questionDALold = uof.Questions.GetItem(questionDTO.Id);
			if (questionDALold == null) throw new ValidationException("Item not found");

			var questionDALnew = MapperBLL.Mapper.Map<Question>(questionDTO);

			questionDALnew.Id = questionDALold.Id;

			uof.Questions.Update(questionDALnew);
			uof.Save();
		}

		public IEnumerable<QuestionDTO> GetItems()
		{
			IEnumerable<Question> items = uof.Questions.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionDTO>>(items);
		}

		public IEnumerable<QuestionDTO> GetItems(string quey)
		{
			IEnumerable<Question> items = uof.Questions.GetItems(c => c.Query == quey);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionDTO>>(items);
		}

		public QuestionDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of question isn't set", "id");
			var answer = uof.Questions.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No question was found");
			return MapperBLL.Mapper.Map<QuestionDTO>(answer);

		}
	}
}
