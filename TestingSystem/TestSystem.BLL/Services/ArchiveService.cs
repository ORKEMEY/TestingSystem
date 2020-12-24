using System.Collections.Generic;
using TestSystem.BLL.DTO;
using TestSystem.BLL.Infrastructure;
using TestSystem.BLL.Interfaces;
using TestSystem.DAL;
using TestSystem.DAL.Models;


namespace TestSystem.BLL.Services
{
	public class ArchiveService : IArchiveService
	{

		protected IUnitOfWork uof { get; set; }

		public ArchiveService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(ArchiveDTO archiveDTO)
		{
			if (archiveDTO.TestId <= 0 || archiveDTO.UserId <= 0)
				throw new ValidationException("Wrong or empty properties");

			var testDAL = uof.Tests.GetItem(archiveDTO.TestId);
			if (testDAL == null) throw new ValidationException("Test not found");

			var userDAL = uof.Users.GetItem(archiveDTO.UserId);
			if (userDAL == null) throw new ValidationException("User not found");

			var archiveDAL = MapperBLL.Mapper.Map<Archive>(archiveDTO);
			uof.PassingRecords.Create(archiveDAL);
			uof.Save();
		}

		public void DeleteItem(ArchiveDTO archiveDTO)
		{
			/*if (userDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Users.Delete(userDTO.Id);
			uof.Save();*/
		}

		public void UpdateItem(ArchiveDTO archiveDTO)
		{
			if (archiveDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var archiveDAL = uof.PassingRecords.GetItem(archiveDTO.Id);
			if (archiveDAL == null) throw new ValidationException("Item not found");
			if (archiveDTO.TestId > 0)
			{
				var testDAL = uof.Tests.GetItem(archiveDTO.TestId);
				if (testDAL == null) throw new ValidationException("Test not found");
				archiveDAL.TestId = archiveDTO.TestId;
			}
			if (archiveDTO.UserId > 0)
			{
				var UserDAL = uof.Users.GetItem(archiveDTO.UserId);
				if (UserDAL == null) throw new ValidationException("User not found");
				archiveDAL.UserId = archiveDTO.UserId;
			}

			uof.PassingRecords.Update(archiveDAL);
			uof.Save();
		}

		public IEnumerable<ArchiveDTO> GetItems()
		{
			IEnumerable<Archive> items = uof.PassingRecords.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<ArchiveDTO>>(items);

		}

		public IEnumerable<ArchiveDTO> GetItems(string login)
		{
			/*IEnumerable<User> items = uof.Users.GetItems(c => c.Login == login);
			return MapperBLL.Mapper.Map<IEnumerable<UserDTO>>(items);*/
			return null;
		}

		public ArchiveDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of passing record isn't set", "id");
			var arch = uof.PassingRecords.GetItem(id.Value);

			if (arch == null) throw new ValidationException("No passing record was found");
			return MapperBLL.Mapper.Map<ArchiveDTO>(arch);
		}
	}
}
