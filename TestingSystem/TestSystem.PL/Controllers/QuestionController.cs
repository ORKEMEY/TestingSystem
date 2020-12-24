using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TestSystem.BLL.DTO;
using TestSystem.BLL.Infrastructure;
using TestSystem.BLL.Interfaces;
using TestSystem.PL.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestSystem.PL.Controllers
{
	[Route("api/Questions")]
	[Authorize]
	[ApiController]
	public class QuestionController : ControllerBase
	{
		private IQuestionService service { get; set; }

		public QuestionController(IQuestionService service)
		{
			this.service = service;
		}

		// GET: api/<QuestionController>
		[HttpGet]
		public IActionResult Get()
		{

			var qDTO = service.GetItems();

			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<QuestionViewModel>>(qDTO));

		}

		// GET api/<QuestionController>/5
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
				return new BadRequestObjectResult(new
				{
					errorText = e.Message
				});
			}
		}

		[Route("search")]
		[HttpGet]
		public IActionResult Get([FromQuery] string name)
		{
			try
			{
				var qDTO = service.GetItems(name);
				return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<QuestionViewModel>>(qDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new
				{
					errorText = e.Message
				});
			}
		}

		// POST api/<QuestionController>
		[HttpPost]
		[Authorize(Roles = "true")]
		public IActionResult Post([FromQuery] string query)
		{
			try
			{
				service.AddItem(MapperWEB.Mapper.Map<QuestionDTO>(new QuestionViewModel()
				{
					Query = query
				}));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}

		// PUT api/<QuestionController>/5
		[HttpPut("{id}")]
		[Authorize(Roles = "true")]
		public IActionResult Put(int id, [FromQuery] string query)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<QuestionDTO>(new QuestionViewModel()
				{
					Id = id,
					Query = query
				}
				));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}

		// DELETE api/<QuestionController>/5
		[HttpDelete("{id}")]
		[Authorize(Roles = "true")]
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
