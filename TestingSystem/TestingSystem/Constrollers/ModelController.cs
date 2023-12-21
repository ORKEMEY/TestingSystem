using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TestingSystem.BLL.Interfaces;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.PL.Models;
using Microsoft.Extensions.Primitives;
using TestingSystem.BLL.Services;
using TestingSystem.DAL.Models;

namespace TestingSystem.PL.Controllers
{
	[Route("api/Models")]
	[ApiController]
	public class ModelController : Controller
{
		private IModelService service { get; set; }

		public ModelController(IModelService service)
		{
			this.service = service;
		}


		// GET: api/<TestsController>
		[HttpGet]
		public IActionResult Get()
		{
			var mDTO = service.GetItems();
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<ModelViewModel>>(mDTO));
		}

		// GET api/<TestsController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var mDTO = service.GetItem(id);
				if (mDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<ModelViewModel>(mDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("search")]
		[HttpGet]
		public IActionResult GetModelByName([FromQuery] string name)
		{

			try
			{
				var mDTO = service.GetModelByName(name);
				return new JsonResult(MapperWEB.Mapper.Map<ModelViewModel>(mDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		// POST api/<TestsController>
		[HttpPost]
		public IActionResult Post([FromBody] ModelViewModel model)
		{
			try
			{
				service.AddItem(MapperWEB.Mapper.Map<ModelDTO>(model));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// PUT api/<TestsController>/5
		[HttpPut]
		public IActionResult Put([FromBody] ModelViewModel model)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<ModelDTO>(model));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// DELETE api/<TestsController>/5
		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			try
			{
				var model = service.GetItem(id);
				service.DeleteItem(model);
			}
			catch (ValidationException e)
			{
				return new NotFoundObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}
	}
}
