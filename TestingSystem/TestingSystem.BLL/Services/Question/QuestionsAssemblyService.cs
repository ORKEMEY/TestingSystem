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
	public class QuestionsAssemblyService  : IQuestionsAssemblyService
	{

		protected IUnitOfWork uof { get; set; }

		public QuestionsAssemblyService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public QuestionsAssemblyDTO AddItem(QuestionsAssemblyDTO  questionsAssemblyDTO)
		{
			if ( questionsAssemblyDTO.Name == null)
				throw new ValidationException("Wrong or empty properties", "Name");
			if (questionsAssemblyDTO.OwnerId <= 0)
				throw new ValidationException("Wrong or empty properties", "OwnerId");


			var  questionsAssemblyDAL = MapperBLL.Mapper.Map<QuestionsAssembly>( questionsAssemblyDTO);
			uof.QuestionsAssemblies.Create(questionsAssemblyDAL);
			uof.Save();

			return MapperBLL.Mapper.Map<QuestionsAssemblyDTO>(questionsAssemblyDAL);
		}

		public void DeleteItem(QuestionsAssemblyDTO  questionsAssemblyDTO)
		{
			if ( questionsAssemblyDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.QuestionsAssemblies.Delete( questionsAssemblyDTO.Id);
			uof.Save();
		}

		public void UpdateItem(QuestionsAssemblyDTO  questionsAssemblyDTO)
		{
			if (questionsAssemblyDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var questionsAssemblyDALold = uof.QuestionsAssemblies.GetItem(questionsAssemblyDTO.Id);
			if (questionsAssemblyDALold == null) throw new ValidationException("Item not found");

			var questionsAssemblyDALnew = MapperBLL.Mapper.Map<QuestionsAssembly>(questionsAssemblyDTO);

			QuestionsAssemblyPatcher.Patch(questionsAssemblyDALold, questionsAssemblyDALnew);

			uof.QuestionsAssemblies.Update(questionsAssemblyDALold);
			uof.Save();
		}

		public IEnumerable<QuestionsAssemblyDTO> GetItems()
		{
			IEnumerable<QuestionsAssembly> items = uof.QuestionsAssemblies.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionsAssemblyDTO>>(items);
		}

		public IEnumerable<QuestionsAssemblyDTO> GetItems(string name)
		{
			IEnumerable<QuestionsAssembly> items = uof.QuestionsAssemblies.GetItems(c => c.Name == name);
			return MapperBLL.Mapper.Map<IEnumerable<QuestionsAssemblyDTO>>(items);
		}

		public QuestionsAssemblyDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of  questions assembly isn't set", "id");
			var answer = uof.QuestionsAssemblies.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No  questions assembly was found");
			return MapperBLL.Mapper.Map<QuestionsAssemblyDTO>(answer);

		}


	}
}
