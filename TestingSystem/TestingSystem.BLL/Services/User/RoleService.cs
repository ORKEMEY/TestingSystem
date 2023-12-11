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
	public class RoleService : IRoleService
	{
		protected IUnitOfWork uof { get; set; }

		public RoleService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(RoleDTO roleDTO)
		{
			if (roleDTO.Name == null)
				throw new ValidationException("Wrong or empty properties", "Name");


			var roleDAL = MapperBLL.Mapper.Map<Role>(roleDTO);
			uof.Roles.Create(roleDAL);
			uof.Save();
		}

		public void DeleteItem(RoleDTO roleDTO)
		{
			if (roleDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Roles.Delete(roleDTO.Id);
			uof.Save();
		}

		public void UpdateItem(RoleDTO roleDTO)
		{
			if (roleDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var roleDALold = uof.Roles.GetItem(roleDTO.Id);
			if (roleDALold == null) throw new ValidationException("Item not found");

			var roleDALnew = MapperBLL.Mapper.Map<Role>(roleDTO);

			roleDALnew.Id = roleDALold.Id;

			uof.Roles.Update(roleDALnew);
			uof.Save();
		}

		public IEnumerable<RoleDTO> GetItems()
		{
			IEnumerable<Role> items = uof.Roles.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<RoleDTO>>(items);
		}

		public IEnumerable<RoleDTO> GetItems(string name)
		{
			IEnumerable<Role> items = uof.Roles.GetItems(c => c.Name == name);
			return MapperBLL.Mapper.Map<IEnumerable<RoleDTO>>(items);
		}

		public RoleDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of role isn't set", "id");
			var answer = uof.Roles.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No role was found");
			return MapperBLL.Mapper.Map<RoleDTO>(answer);

		}
	}
}
