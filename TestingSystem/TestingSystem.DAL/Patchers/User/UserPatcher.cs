using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class UserPatcher
	{
		public static User Patch(User old, User patch)
		{
			if (patch?.Login is not null)
				old.Login = patch?.Login;

			if (patch?.Password is not null)
				old.Password = patch?.Password;

			if (patch?.EMail is not null)
				old.EMail = patch?.EMail;

			if (patch?.Name is not null)
				old.Name = patch?.Name;

			if (patch?.Surname is not null)
				old.Surname = patch?.Surname;

			if(patch.RoleId > 0)
				old.RoleId = patch.RoleId;

			if(patch.RefreshToken != null)
			{
				old.RefreshToken = RefreshTokenPatcher.Patch(old.RefreshToken, patch.RefreshToken);
			}

			return old;
		} 

	}
}
