using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TestSystem.BLL.DTO;
using TestSystem.BLL.Infrastructure;
using TestSystem.BLL.Interfaces;
using TestSystem.PL.Models;

namespace TestSystem.PL.Controllers
{
	[Route("api/Answers")]
	[Authorize]
	[ApiController]
	public class AnswerController : ControllerBase
	{
		private IVariantOfAnswerService service { get; set; }

		public AnswerController(IVariantOfAnswerService service)
		{
			this.service = service;
		}

		// GET: api/<AnswerController>
		[HttpGet]
		public IActionResult Get()
		{
			var voaDTO = service.GetItems();

			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<VariantOfAnswerViewModel>>(voaDTO));
		}

		// GET api/<AnswerController>/5
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
				return new BadRequestObjectResult(new
				{
					errorText = e.Message
				});
			}
		}

		// POST api/<AnswerController>
		[HttpPost]
		[Authorize(Roles = "true")]
		public IActionResult Post([FromQuery] int questionId, string answer, bool isCorrect)
		{
			try
			{
				service.AddItem(MapperWEB.Mapper.Map<VariantOfAnswerDTO>(new VariantOfAnswerViewModel()
				{
					QuestionId = questionId,
					Answer = answer,
					IsCorrect = isCorrect

				}));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}

		// PUT api/<AnswerController>/5
		[HttpPut("{id}")]
		[Authorize(Roles = "true")]
		public IActionResult Put(int id, [FromQuery] string answer, bool isCorrect)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<VariantOfAnswerDTO>(new VariantOfAnswerViewModel()
				{
					Id = id,
					Answer = answer,
					IsCorrect = isCorrect

				}));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}

		// DELETE api/<AnswerController>/5
		[HttpDelete("{id}")]
		[Authorize(Roles = "true")]
		public IActionResult Delete(int id)
		{
			try
			{
				var ansDTO = service.GetItem(id);
				service.DeleteItem(ansDTO);
			}
			catch (ValidationException e)
			{
				return new NotFoundObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}
	}
}
