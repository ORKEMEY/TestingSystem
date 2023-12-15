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

namespace TestSystem.PL.Controllers
{
	[Route("api/Users")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private IUserService service { get; set; }
		private IRefreshTokenService rts { get; set; }

		public UserController(IUserService service, IRefreshTokenService rts)
		{
			this.service = service;
			this.rts = rts;
		}

		[HttpPost("refresh")]
		public IActionResult RefreshToken([FromBody] TokenViewModel token)
		{
			try
			{
				var newToken = rts.RefreshToken(MapperWEB.Mapper.Map<TokenDTO>(token));

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
				var identity = AuthOptions.GetIdentity(userDTO);

				if (userDTO == null || identity == null)
				{
					return new BadRequestObjectResult(new { errorText = "Invalid login or password." });
				}

				var encodedJwt = AuthOptions.GenerateAccessToken(identity.Claims);


				return new JsonResult(new TokenViewModel
				{
					AccessToken = encodedJwt,
					Login = identity.Name,
					Role = userDTO.Role.Name,
					RefreshToken = userDTO.RefreshToken.Token
				});
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
	}
}