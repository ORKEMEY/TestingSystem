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
	[Route("api/QuestionTypes")]
	[ApiController]
	public class QuestionTypeController : Controller
{
		private IQuestionTypeService service { get; set; }

		public QuestionTypeController(IQuestionTypeService service)
		{
			this.service = service;
		}


		// GET: api/<TestsController>
		[HttpGet]
		public IActionResult Get()
		{
			var qtDTO = service.GetItems();
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<QuestionTypeViewModel>>(qtDTO));
		}

		// GET api/<TestsController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var qtDTO = service.GetItem(id);
				if (qtDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<QuestionTypeViewModel>(qtDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("search")]
		[HttpGet]
		public IActionResult GetQuestionTypeByName([FromQuery] string name)
		{

			try
			{
				var mDTO = service.GetQuestionTypeByName(name);
				return new JsonResult(MapperWEB.Mapper.Map<QuestionTypeViewModel>(mDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		// POST api/<TestsController>
		[HttpPost]
		public IActionResult Post([FromBody] QuestionTypeViewModel questionType)
		{
			try
			{
				service.AddItem(MapperWEB.Mapper.Map<QuestionTypeDTO>(questionType));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// PUT api/<TestsController>/5
		[HttpPut]
		public IActionResult Put([FromBody] QuestionTypeViewModel questionType)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<QuestionTypeDTO>(questionType));
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
