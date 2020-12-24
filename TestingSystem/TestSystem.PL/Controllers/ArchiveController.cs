using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TestSystem.BLL.Interfaces;
using TestSystem.BLL.DTO;
using TestSystem.BLL.Infrastructure;
using TestSystem.PL.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestSystem.PL.Controllers
{
	[Route("api/Archive")]
	[ApiController]
	public class ArchiveController : ControllerBase
	{
		private IArchiveService service { get; set; }

		public ArchiveController(IArchiveService service)
		{
			this.service = service;
		}


		// GET: api/<ArchiveController>
		[HttpGet]
		public IActionResult Get()
		{
			var aDTO = service.GetItems();

			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<ArchiveViewModel>>(aDTO));
		}

		// GET api/<ArchiveController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			var aDTO = service.GetItem(id);
			if (aDTO == null) return new NotFoundResult();
			return new JsonResult(MapperWEB.Mapper.Map<ArchiveViewModel>(aDTO));
		}

	}
}
