using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.BLL.Interfaces;
using TestingSystem.PL.Models;
using TestingSystem.PL;
using Microsoft.Extensions.Primitives;
using TestingSystem.BLL.Services;
using TestingSystem.DAL.Models;

namespace TestSystem.PL.Controllers
{
	[Route("api/Users")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private IUserService service { get; set; }
		private ITokenService ts { get; set; }

		public UserController(IUserService service, ITokenService ts)
		{
			this.service = service;
			this.ts = ts;
		}

		[HttpPost("refresh")]
		public IActionResult RefreshToken([FromBody] TokenViewModel token)
		{
			try
			{
				var newToken = ts.RefreshToken(MapperWEB.Mapper.Map<TokenDTO>(token));

				return new JsonResult(MapperWEB.Mapper.Map<TokenViewModel>(newToken));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new
				{
					errorText = e.Message
				});
			}

		}

		[HttpPost("token")]
		public IActionResult GetToken([FromBody] UserViewModel user)
		{
			try
			{
				var userDTO = service.Authentificate(user.Login, user.Password);

				var token = ts.GetToken(userDTO);

				return new JsonResult(MapperWEB.Mapper.Map<TokenViewModel>(token));

			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new
				{
					errorText = e.Message
				});
			}
			
		}

		// GET: api/<UserController>
		[HttpGet]
		[Authorize(Roles = "Admin")]
		public IActionResult Get()
		{
			var userDTO = service.GetItems();

			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<UserViewModel>>(userDTO));
		}

		// GET: api/<UserController>
		[HttpGet("current")]
		[Authorize]
		public IActionResult GetCurrentCustomer()
		{
			var userDTO = service.GetUserByAccessToken(new TokenDTO()
			{
				AccessToken = GetAccessToken()
			});

			return new JsonResult(MapperWEB.Mapper.Map<CustomerViewModel>(userDTO));
		}

		// GET api/<UserController>/5
		[HttpGet("{id}")]
		[Authorize(Roles = "Admin")]
		public IActionResult Get(int id)
		{
			try
			{
				var userDTO = service.GetItem(id);
				if (userDTO == null) return new NotFoundResult();
				return new JsonResult(MapperWEB.Mapper.Map<UserViewModel>(userDTO));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new
				{
					errorText = e.Message
				});
			}
		}

		// POST api/<UserController>
		[HttpPost]
		public IActionResult Post([FromBody] UserViewModel user)
		{
			try
			{
				service.AddItem(MapperWEB.Mapper.Map<UserDTO>(user));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return GetToken(user);
		}

		// PUT api/<UserController>
		[HttpPut]
		[Authorize(Roles = "Admin")]
		public IActionResult Put([FromBody] UserViewModel value)
		{
			try
			{
				service.UpdateItem(MapperWEB.Mapper.Map<UserDTO>(value));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return Ok();
		}

		public class ChangeLoginPostParams
		{

			public UserViewModel UserNew { get; set; }
			public UserViewModel UserOld { get; set; }
		}


		[HttpPut("current/login")]
		[Authorize]
		public IActionResult ChangeAccountLogin([FromBody] ChangeLoginPostParams parameters)
		{
			try
			{

				var userDTO = service.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});

				parameters.UserNew.Id = userDTO.Id;

				service.ChangeLogin(MapperWEB.Mapper.Map<UserDTO>(parameters.UserNew),
					MapperWEB.Mapper.Map<UserDTO>(parameters.UserOld));

				userDTO = service.GetItem(userDTO.Id);

				var token = ts.GetToken(userDTO);

				return new JsonResult(MapperWEB.Mapper.Map<TokenViewModel>(token));

			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}

		[HttpPut("current/password")]
		[Authorize]
		public IActionResult ChangeAccountPassword([FromBody] UserViewModel value)
		{
			try
			{

				var userDTO = service.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});

				value.Id = userDTO.Id;

				service.ChangePassword(MapperWEB.Mapper.Map<UserDTO>(value));

				userDTO = service.GetItem(userDTO.Id);

				var token = ts.GetToken(userDTO);

				return new JsonResult(MapperWEB.Mapper.Map<TokenViewModel>(token));

			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}

		// PUT api/<UserController>
		[HttpPut("current")]
		[Authorize]
		public IActionResult ChangeAccountData([FromBody] UserViewModel value)
		{
			try
			{
				var userDTO = service.GetUserByAccessToken(new TokenDTO()
				{
					AccessToken = GetAccessToken()
				});

				value.Id = userDTO.Id;

				service.UpdateAccount(MapperWEB.Mapper.Map<UserDTO>(value));

				userDTO = service.GetItem(userDTO.Id);

				var token = ts.GetToken(userDTO);

				return new JsonResult(MapperWEB.Mapper.Map<TokenViewModel>(token));

			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

		}

		// DELETE api/<UserController>/5
		[HttpDelete("{id}")]
		[Authorize(Roles = "Admin")]
		public IActionResult Delete(int id)
		{
			try
			{
				var userDTO = service.GetItem(id);
				service.DeleteItem(userDTO);
			}
			catch (ValidationException e)
			{
				return new NotFoundObjectResult(new { errorText = e.Message });
			}

			return Ok();
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