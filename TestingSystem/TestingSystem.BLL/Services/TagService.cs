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
	public class TagService : ITagService
	{

		protected IUnitOfWork uof { get; set; }

		public TagService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(TagDTO tagDTO)
		{
			if (tagDTO.Name == null)
				throw new ValidationException("Wrong or empty properties", "Name");


			var tagDAL = MapperBLL.Mapper.Map<Tag>(tagDTO);
			uof.Tags.Create(tagDAL);
			uof.Save();
		}

		public void DeleteItem(TagDTO tagDTO)
		{
			if (tagDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Tags.Delete(tagDTO.Id);
			uof.Save();
		}

		public void UpdateItem(TagDTO tagDTO)
		{
			if (tagDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var tagDALold = uof.Tags.GetItem(tagDTO.Id);
			if (tagDALold == null) throw new ValidationException("Item not found");

			var tagDALnew = MapperBLL.Mapper.Map<Tag>(tagDTO);

			tagDALold.Name = tagDALnew.Name;

			uof.Tags.Update(tagDALold);
			uof.Save();
		}

		public IEnumerable<TagDTO> GetItems()
		{
			IEnumerable<Tag> items = uof.Tags.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<TagDTO>>(items);
		}

		public IEnumerable<TagDTO> GetItems(string name)
		{
			IEnumerable<Tag> items = uof.Tags.GetItems(c => c.Name == name);
			return MapperBLL.Mapper.Map<IEnumerable<TagDTO>>(items);
		}

		public TagDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of tag isn't set", "id");
			var answer = uof.Tags.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No tag was found");
			return MapperBLL.Mapper.Map<TagDTO>(answer);

		}
	}
}
