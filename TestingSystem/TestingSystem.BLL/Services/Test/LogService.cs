﻿using System;
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
	public class LogService : ILogService
	{
		protected IUnitOfWork uof { get; set; }

		public LogService(IUnitOfWork uof)
		{
			this.uof = uof;
		}

		public void AddItem(LogDTO logDTO)
		{
			if (logDTO.UserId <= 0)
				throw new ValidationException("Wrong or empty properties", "UserId");
			if (logDTO.TestId <= 0)
				throw new ValidationException("Wrong or empty properties", "TestId");
			if (logDTO.ExpiredTime == TimeSpan.Zero)
				throw new ValidationException("Wrong or empty properties", "ExpiredTime");
			if (logDTO.DateTime >= DateTime.Now)
				throw new ValidationException("Wrong or empty properties", "DateTime");
			if (logDTO.Mark < 0)
				throw new ValidationException("Wrong or empty properties", "Mark");
			if (logDTO.VariantNumer <= 0)
				throw new ValidationException("Wrong or empty properties", "VariantNumer");

			var logDAL = MapperBLL.Mapper.Map<Log>(logDTO);
			uof.Logs.Create(logDAL);
			uof.Save();
		}

		public void DeleteItem(LogDTO logDTO)
		{
			if (logDTO.Id <= 0)
				throw new ValidationException("Wrong or empty property Id");
			uof.Logs.Delete(logDTO.Id);
			uof.Save();
		}

		public void UpdateItem(LogDTO logDTO)
		{
			if (logDTO.Id <= 0)
				throw new ValidationException("Wrong or empty properties");

			var logDALold = uof.Logs.GetItem(logDTO.Id);
			if (logDALold == null) throw new ValidationException("Item not found");

			var logDALnew = MapperBLL.Mapper.Map<Log>(logDTO);

			logDALnew.Id = logDALold.Id;

			uof.Logs.Update(logDALnew);
			uof.Save();
		}

		public IEnumerable<LogDTO> GetItems()
		{
			IEnumerable<Log> items = uof.Logs.GetItems(c => true);
			return MapperBLL.Mapper.Map<IEnumerable<LogDTO>>(items);
		}

		public IEnumerable<LogDTO> GetItems(DateTime date)
		{
			IEnumerable<Log> items = uof.Logs.GetItems(c => c.DateTime.Date == date.Date);
			return MapperBLL.Mapper.Map<IEnumerable<LogDTO>>(items);
		}

		public LogDTO GetItem(int? id)
		{
			if (id == null) throw new ValidationException("Id of log isn't set", "id");
			var answer = uof.Logs.GetItem(id.Value);

			if (answer == null) throw new ValidationException("No log was found");
			return MapperBLL.Mapper.Map<LogDTO>(answer);

		}
	}
}
