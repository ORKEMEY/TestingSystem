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
	[Route("api/Questions")]
	[ApiController]
	public class QuestionController : Controller
	{
		private IQuestionService service { get; set; }

		public QuestionController(IQuestionService service)
		{
			this.service = service;
		}


		// GET: api/<TestsController>
		[HttpGet]
		public IActionResult Get()
		{
			var qDTO = service.GetItems();
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<QuestionViewModel>>(qDTO));
		}

		// GET api/<TestsController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var qDTO = service.GetItem(id);
				if (qDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<QuestionViewModel>(qDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("search")]
		[HttpGet]
		public IActionResult GetQuestionsByTestVar([FromQuery] int testVariantId)
		{

			try
			{
				var qDTO = service.GetQuestionsByTestVar(testVariantId);
				return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<QuestionViewModel>>(qDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		// POST api/<TestsController>
		[HttpPost]
		public IActionResult Post([FromBody] QuestionViewModel question)
		{
			try
			{
				var createdQuestion = service.AddItem(MapperWEB.Mapper.Map<QuestionDTO>(question));

				return Created(Url.RouteUrl(createdQuestion.Id), createdQuestion.Id);
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}

		// PUT api/<TestsController>/5
		[HttpPut]
		public IActionResult Put([FromBody] QuestionViewModel question)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<QuestionDTO>(question));
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
				var qDTO = service.GetItem(id);
				service.DeleteItem(qDTO);
			}
			catch (ValidationException e)
			{
				return new NotFoundObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}
	}
}
