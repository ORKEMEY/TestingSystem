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
	[Route("api/Logs")]
	[ApiController]
	[Authorize]
	public class LogController : Controller
	{
		private ILogService service { get; set; }

		public LogController(ILogService service)
		{
			this.service = service;
		}


		// GET: api/<TestsController>
		[HttpGet]
		public IActionResult Get()
		{
			var lDTO = service.GetItems();
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<LogViewModel>>(lDTO));
		}

		// GET api/<TestsController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var lDTO = service.GetItem(id);
				if (lDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<LogViewModel>(lDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("search")]
		[HttpGet]
		public IActionResult GetLogsByTestId([FromQuery] int testId)
		{

			try
			{
				var lDTO = service.GetLogsByTestId(testId);
				return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<LogViewModel>>(lDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		// POST api/<TestsController>
		[HttpPost]
		public IActionResult Post([FromBody] LogViewModel log)
		{
			try
			{
				var createdLog = service.AddItem(MapperWEB.Mapper.Map<LogDTO>(log));

				return Created(Url.RouteUrl(createdLog.Id), createdLog.Id);
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}

		// PUT api/<TestsController>/5
		[HttpPut]
		public IActionResult Put([FromBody] LogViewModel log)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<LogDTO>(log));
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
