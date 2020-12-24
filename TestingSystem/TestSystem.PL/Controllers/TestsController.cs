using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TestSystem.BLL.Interfaces;
using TestSystem.BLL.DTO;
using TestSystem.BLL.Infrastructure;
using TestSystem.PL.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestSystem.PL.Controllers
{
	[Route("api/Tests")]
	[Authorize]
	[ApiController]
	public class TestsController : ControllerBase
	{

		private ITestService service { get; set; }

		public TestsController(ITestService service)
		{
			this.service = service;
		}

		// GET: api/<TestsController>
		[HttpGet]
		public IActionResult Get()
		{
			var testDTO = service.GetItems();
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<TestViewModel>>(testDTO));
		}

		// GET api/<TestsController>/5
		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			try
			{
				var tDTO = service.GetItem(id);
				if (tDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<TestViewModel>(tDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}	
		}

		[Route("search")]
		[HttpGet]
		public IActionResult Get([FromQuery] string name)
		{
			try
			{
				var testDTO = service.GetItems(name);
			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<TestViewModel>>(testDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[HttpPost("{id}")]
		public IActionResult Post(int id, [FromQuery] string login, [FromQuery] int[] answerid)
		{
			try
			{
				var res = service.CheckTest(id, login, answerid);

				return new OkObjectResult(new 
				{
					points = res?.summuryPoints,  
					percentOfCorrectAnswers = res?.GetPercentOfCorrectAnswers(),
					percentOfWrongAnswers = res?.GetPercentOfWrongAnswers(),
					percentOfCorrAnswFromAllCorrAns = res?.GetPercentOfCorrAnswFromAllCorrAns(),
				});
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// POST api/<TestsController>
		[HttpPost]
		[Authorize(Roles = "true")]
		public IActionResult Post([FromQuery] string name, int hours, int minutes)
		{
			try
			{
				service.AddItem(MapperWEB.Mapper.Map<TestDTO>(new TestViewModel()
				{
					Name = name,
					Time = TimeSpan.FromHours(hours) + TimeSpan.FromMinutes(minutes)
				}
				));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message } );
			}

			return Ok();

		}
	

		[HttpPost("{id}/{questionId}")]
		[Authorize(Roles = "true")]
		public IActionResult Post(int id, int questionId)
		{
			try
			{
				service.AddQuestion(MapperWEB.Mapper.Map<TestDTO>(new TestViewModel()
				{
					Id= id,
					Questions = new List<QuestionViewModel>()
					{
						new QuestionViewModel(){Id = questionId}
					}
				}
				));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}

		// PUT api/<TestsController>/5
		[HttpPut("{id}")]
		[Authorize(Roles = "true")]
		public IActionResult Put(int id, [FromQuery] string name, int hours, int minutes)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<TestDTO>(new TestViewModel()
				{
					Id = id,
					Name = name,
					Time = TimeSpan.FromHours(hours) + TimeSpan.FromMinutes(minutes)
				}
				));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// DELETE api/<TestsController>/5
		[HttpDelete("{id}")]
		[Authorize(Roles = "true")]
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
