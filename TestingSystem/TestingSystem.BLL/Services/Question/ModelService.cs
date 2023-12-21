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
	public class ModelService : IModelService
	{

		protected IUnitOfWork uof { get; set; }

		public ModelService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public ModelDTO AddItem(ModelDTO modelDTO)
		{
			if (modelDTO.Name == null)
				throw new ValidationException("Wrong or empty properties", "Name");


			var modelDAL = MapperBLL.Mapper.Map<Model>(modelDTO);
			uof.Models.Create(modelDAL);
			uof.Save();

			return MapperBLL.Mapper.Map<ModelDTO>(modelDAL);
		}

		public void DeleteItem(ModelDTO modelDTO)
		{
			if (modelDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Models.Delete(modelDTO.Id);
			uof.Save();
		}

		public void UpdateItem(ModelDTO modelDTO)
		{
			if (modelDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var modelDALold = uof.Models.GetItem(modelDTO.Id);
			if (modelDALold == null) throw new ValidationException("Item not found");

			var modelDALnew = MapperBLL.Mapper.Map<Model>(modelDTO);

			modelDALold.Name = modelDALnew.Name;

			uof.Models.Update(modelDALold);
			uof.Save();
		}

		public IEnumerable<ModelDTO> GetItems()
		{
			IEnumerable<Model> items = uof.Models.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<ModelDTO>>(items);
		}

		public IEnumerable<ModelDTO> GetItems(string name)
		{
			IEnumerable<Model> items = uof.Models.GetItems(c => c.Name == name);
			return MapperBLL.Mapper.Map<IEnumerable<ModelDTO>>(items);
		}

		public ModelDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of model isn't set", "id");
			var answer = uof.Models.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No model was found");
			return MapperBLL.Mapper.Map<ModelDTO>(answer);

		}
	}

}

