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

namespace TestingSystem.PL.Controllers
{
	[Route("api/Tests")]
	[Authorize]
	[ApiController]
	public class TestsController : ControllerBase
	{

		private ITestService service { get; set; }
		private IUserService userService { get; set; }
		private ICheckTestInterface checkTestService { get; set; }

		public TestsController(ITestService service, IUserService userService, ICheckTestInterface checkTestService)
		{
			this.service = service;
			this.userService = userService;
			this.checkTestService = checkTestService;
		}

		#region Admin

		// GET: api/<TestsController>
		[HttpGet]
		[Authorize(Roles = "Admin")]
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
		[Authorize(Roles = "Admin")]
		public IActionResult GetTestsByName([FromQuery] string name)
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

		// POST api/<TestsController>
		[HttpPost]
		[Authorize(Roles = "Admin")]
		public IActionResult Post([FromBody] TestViewModel test)
		{

			try
			{
				var createdTest =  service.AddItem(MapperWEB.Mapper.Map<TestDTO>(test));

				return Created(Url.RouteUrl(createdTest.Id), createdTest.Id);
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}

		// PUT api/<TestsController>/5
		[HttpPut]
		[Authorize(Roles = "Admin")]
		public IActionResult Put([FromBody] TestViewModel test)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<TestDTO>(test));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}

		// DELETE api/<TestsController>/5
		[HttpDelete("{id}")]
		[Authorize(Roles = "Admin")]
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
		#endregion
		#region Customer

		//[Route("owned/{id}")]
		[HttpGet("owned/{id}")]
		public IActionResult GetOwned(int Id)
		{

			try
			{

				var userDTO = userService.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				}); ;

				var testDTO = service.GetOwnedItem(userDTO.Id, Id);
				return new JsonResult(MapperWEB.Mapper.Map<TestViewModel>(testDTO));
			}
			catch (ArgumentNullException)
			{
				return new BadRequestResult();
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("owned")]
		[HttpGet]
		public IActionResult GetOwned()
		{
		
			try
			{
				
				var userDTO = userService.GetUserByAccessToken(new TokenDTO() {
					AccessToken = GetAccessToken()
				});;

				var testDTO = service.GetOwnedItems(userDTO.Id);
				return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<TestViewModel>>(testDTO));
			}
			catch (ArgumentNullException)
			{
				return new BadRequestResult();
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		[Route("owned/search")]
		[HttpGet]
		public IActionResult SearchOwned([FromQuery] string name)
		{
			try
			{
				var userDTO = userService.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});

				var testDTO = service.SearchOwnedItems(userDTO.Id, name);
				return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<TestViewModel>>(testDTO));
			}
			catch (ArgumentNullException)
			{
				return new BadRequestResult();
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}
		}

		// POST api/<TestsController>/owned
		[Route("owned")]
		[HttpPost]
		public IActionResult PostOwned([FromBody] TestViewModel test)
		{
			try
			{
				var userDTO = userService.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});

				var createdTest = service.AddOwnedItem(userDTO.Id, MapperWEB.Mapper.Map<TestDTO>(test));

				return Created(Url.RouteUrl(createdTest.Id), createdTest.Id);
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}

		// PUT api/<TestsController>/owned
		[HttpPut("owned")]
		public IActionResult UpdateOwned([FromBody] TestViewModel test)
		{
			try
			{
				var userDTO = userService.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});
				service.UpdateOwnedItem(userDTO.Id, MapperWEB.Mapper.Map<TestDTO>(test));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();

		}
			
		// DELETE api/<TestsController>/owned/5
		[HttpDelete("owned/{id}")]
		public IActionResult DeleteOwned(int id)
		{
			try
			{
				var userDTO = userService.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});
				var tDTO = service.GetOwnedItem(userDTO.Id, id);
				service.DeleteOwendItem(userDTO.Id, tDTO);
			}
			catch (ValidationException e)
			{
				return new NotFoundObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}

		#endregion

		public class CheckTestPost {

			public TestViewModel test { get; set; }
			public LogViewModel log { get; set; }
		}


		[HttpPost("checktest")]
		public IActionResult CheckTest([FromBody] CheckTestPost parameters)
		{
			try
			{
				var userDTO = userService.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});

				var log = checkTestService.CheckTest(userDTO.Id,
					MapperWEB.Mapper.Map<TestDTO>(parameters.test),
					MapperWEB.Mapper.Map<LogDTO>(parameters.log));

				return new OkObjectResult(log);
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}


		/// <exception cref="ArgumentNullException"></exception>
		private string GetAccessToken()
		{
			HttpContext.Request.Headers.TryGetValue("Authorization", out StringValues token);
			var tokenStr = token.First();
			var removeStr = "Bearer ";
			return tokenStr.Remove(tokenStr.IndexOf(removeStr), removeStr.Length);
		}
	}
}
