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
	[Route("api/TestVariants")]
	[ApiController]
	public class TestVariantController : Controller
	{
		private ITestVariantService service { get; set; }

		public TestVariantController(ITestVariantService service)
		{
			this.service = service;
		}


		// GET: api/<TestsController>
		[HttpGet]
		public IActionResult Get()
		{
			var testvDTO = service.GetItems();
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<TestVariantViewModel>>(testvDTO));
		}

		// GET api/<TestsController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var tvDTO = service.GetItem(id);
				if (tvDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<TestVariantViewModel>(tvDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("search")]
		[HttpGet]
		public IActionResult GetTestVarsByTestId([FromQuery] int testId)
		{

			try
			{
				var testvDTO = service.GetTestVarsByTestId(testId);
				return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<TestVariantViewModel>>(testvDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		// POST api/<TestsController>
		[HttpPost]
		public IActionResult Post([FromBody] TestVariantViewModel testv)
		{
			try
			{
				var createdtestv = service.AddItem(MapperWEB.Mapper.Map<TestVariantDTO>(testv));

				return Created(Url.RouteUrl(createdtestv.Id), createdtestv.Id);
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// PUT api/<TestsController>
		[HttpPut]
		public IActionResult Put([FromBody] TestVariantViewModel testv)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<TestVariantDTO>(testv));
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
				var tDTO = service.GetItem(id);
				service.DeleteItem(tDTO);
			}
			catch (ValidationException e)
			{
				return new NotFoundObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}
	}
}
