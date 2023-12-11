using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;

namespace TestingSystem.BLL.Infrastructure
{
	public class AuthOptions
	{
		public const string ISSUER = "TestingServer";
		public const string AUDIENCE = "TestingClient";
		const string KEY = "secretsecretsecr";
		public const int LIFETIME = 1;
		public static SymmetricSecurityKey GetSymmetricSecurityKey()
		{
			return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
		}

		/// <exception cref="SecurityTokenException"></exception>
		public static ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
		{
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateAudience = false,
				ValidateIssuer = false,
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = GetSymmetricSecurityKey(),
				ValidateLifetime = false
			};


			var principal = new JwtSecurityTokenHandler()
				.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

			var jwtSecurityToken = securityToken as JwtSecurityToken;

			if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
				throw new SecurityTokenException("Invalid token");

			return principal;
		}

		public static string GenerateAccessToken(IEnumerable<Claim> claims)
		{
			var now = DateTime.UtcNow;

			var jwt = new JwtSecurityToken(
					issuer: ISSUER,
					audience: AUDIENCE,
					notBefore: now,
					claims: claims,
					expires: now.Add(TimeSpan.FromMinutes(LIFETIME)),
					signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

			return new JwtSecurityTokenHandler().WriteToken(jwt);
		}

		public static ClaimsIdentity GetIdentity(UserDTO userDTO)
		{

			if (userDTO != null)
			{
				var claims = new List<Claim>
				{
					new Claim(ClaimsIdentity.DefaultNameClaimType, userDTO.Login),
					new Claim(ClaimsIdentity.DefaultRoleClaimType, userDTO.Role.Name)
				};
				
				return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
					ClaimsIdentity.DefaultRoleClaimType);
			}
			return null;
		}
	}
}
