using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class RefreshTokenPatcher
	{
		public static RefreshToken Patch(RefreshToken old, RefreshToken patch)
		{
			if (patch?.Token is not null)
				old.Token = patch?.Token;

			if (patch?.ExpiryTime is not null)
				old.ExpiryTime = patch?.ExpiryTime;

			if (patch.UserId > 0)
				old.UserId = patch.UserId;

			return old;
			
		}
	}
}
