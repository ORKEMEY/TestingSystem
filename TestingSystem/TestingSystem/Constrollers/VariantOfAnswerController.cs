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
	[Route("api/Answers")]
	[ApiController]
	public class VariantOfAnswerController : Controller
{
		private IVariantOfAnswerService service { get; set; }

		public VariantOfAnswerController(IVariantOfAnswerService service)
		{
			this.service = service;
		}


		// GET: api/<TestsController>
		[HttpGet]
		public IActionResult Get()
		{
			var voaDTO = service.GetItems();
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<VariantOfAnswerViewModel>>(voaDTO));
		}

		// GET api/<TestsController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var voaDTO = service.GetItem(id);
				if (voaDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<VariantOfAnswerViewModel>(voaDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("search")]
		[HttpGet]
		public IActionResult GetAnswerByName([FromQuery] string name)
		{

			try
			{
				var ansDTO = service.GetAnswer(name);
				return new JsonResult(MapperWEB.Mapper.Map<VariantOfAnswerViewModel>(ansDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		// POST api/<TestsController>
		[HttpPost]
		public IActionResult Post([FromBody] VariantOfAnswerViewModel answer)
		{
			try
			{
				var createdAnswer = service.AddItem(MapperWEB.Mapper.Map<VariantOfAnswerDTO>(answer));

				return Created(Url.RouteUrl(createdAnswer.Id), createdAnswer.Id);
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// PUT api/<TestsController>/5
		[HttpPut]
		public IActionResult Put([FromBody] VariantOfAnswerViewModel answer)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<VariantOfAnswerDTO>(answer));
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
				var aDTO = service.GetItem(id);
				service.DeleteItem(aDTO);
			}
			catch (ValidationException e)
			{
				return new NotFoundObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}
	}
}
