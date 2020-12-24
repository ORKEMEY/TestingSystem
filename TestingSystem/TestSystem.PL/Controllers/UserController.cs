using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TestSystem.BLL.DTO;
using TestSystem.BLL.Infrastructure;
using TestSystem.BLL.Interfaces;
using TestSystem.PL.Models;

namespace TestSystem.PL.Controllers
{
	[Route("api/Users")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private IUserService service { get; set; }

		public UserController(IUserService service)
		{
			this.service = service;
		}

		[HttpPost("token")]
		public IActionResult GetToken([FromQuery] string login, string password)
		{

			bool isAdmin;
			var identity = GetIdentity(login, password, out isAdmin);
			if (identity == null)
			{
				return new BadRequestObjectResult(new { errorText = "Invalid login or password." });
			}

			var now = DateTime.UtcNow;

			var jwt = new JwtSecurityToken(
					issuer: AuthOptions.ISSUER,
					audience: AuthOptions.AUDIENCE,
					notBefore: now,
					claims: identity.Claims,
					expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
					signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			var response = new
			{
				access_token = encodedJwt,
				login = identity.Name,
				isAdmin = isAdmin
			};

			return new JsonResult(response);
		}

		private ClaimsIdentity GetIdentity(string login, string password, out bool isAdmin)
		{
			isAdmin = false;
			var userDTO = service.Authentificate(login, password);
			if (userDTO != null)
			{
				isAdmin = userDTO.IsAdmin;
				var claims = new List<Claim>
				{
					new Claim(ClaimsIdentity.DefaultNameClaimType, userDTO.Login),
					new Claim(ClaimsIdentity.DefaultRoleClaimType, userDTO.IsAdmin == true ? "true" : "false")
				};
				ClaimsIdentity claimsIdentity =
				new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
					ClaimsIdentity.DefaultRoleClaimType);
				return claimsIdentity;
			}
			return null;
		}

		// GET: api/<UserController>
		[HttpGet]
		[Authorize(Roles = "true")]
		public IActionResult Get()
		{
			var userDTO = service.GetItems();

			return new JsonResult(MapperWEB.Mapper.Map<IEnumerable<UserViewModel>>(userDTO));
		}

		// GET api/<UserController>/5
		[HttpGet("{id}")]
		[Authorize(Roles = "true")]
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
		public IActionResult Post([FromQuery] string login, string password)
		{
			try
			{
				service.AddItem(MapperWEB.Mapper.Map<UserDTO>(new UserViewModel()
				{
					Login = login,
					Password = password
				}));
			}
			catch (ValidationException e)
			{
				return new BadRequestObjectResult(new { errorText = e.Message });
			}

			return GetToken(login, password);
		}

		// PUT api/<UserController>/5
		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromQuery] UserViewModel value)
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
		[Authorize(Roles = "true")]
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
