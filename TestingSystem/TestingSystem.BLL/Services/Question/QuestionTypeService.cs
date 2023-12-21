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
	public class QuestionTypeService : IQuestionTypeService
	{
		protected IUnitOfWork uof { get; set; }

		public QuestionTypeService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public QuestionTypeDTO AddItem(QuestionTypeDTO questionTypeDTO)
		{
			if (questionTypeDTO.Name == null)
				throw new ValidationException("Wrong or empty properties", "Name");


			var questionTypeDAL = MapperBLL.Mapper.Map<QuestionType>(questionTypeDTO);
			uof. QuestionTypes.Create(questionTypeDAL);
			uof.Save();

			return MapperBLL.Mapper.Map<QuestionTypeDTO>(questionTypeDAL);
		}

		public void DeleteItem(QuestionTypeDTO questionTypeDTO)
		{
			if (questionTypeDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof. QuestionTypes.Delete(questionTypeDTO.Id);
			uof.Save();
		}

		public void UpdateItem(QuestionTypeDTO questionTypeDTO)
		{
			if (questionTypeDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var questionTypeDALold = uof. QuestionTypes.GetItem(questionTypeDTO.Id);
			if (questionTypeDALold == null) throw new ValidationException("Item not found");

			var questionTypeDALnew = MapperBLL.Mapper.Map<QuestionType>(questionTypeDTO);

			questionTypeDALold.Name = questionTypeDALnew.Name;

			uof.QuestionTypes.Update(questionTypeDALold);
			uof.Save();
		}

		public IEnumerable<QuestionTypeDTO> GetItems()
		{
			IEnumerable<QuestionType> items = uof.QuestionTypes.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionTypeDTO>>(items);
		}

		public IEnumerable<QuestionTypeDTO> GetItems(string name)
		{
			IEnumerable<QuestionType> items = uof.QuestionTypes.GetItems(c => c.Name == name);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionTypeDTO>>(items);
		}

		public QuestionTypeDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of question type isn't set", "id");
			var answer = uof.QuestionTypes.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No question type was found");
			return MapperBLL.Mapper.Map<QuestionTypeDTO>(answer);

		}
	}
}
