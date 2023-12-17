using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class TestPatcher
	{
		public static Test Patch(Test old, Test patch)
		{
			if(patch?.Name is not null)
				old.Name = patch?.Name;

			if (patch.OwnerId > 0)
				old.OwnerId = patch.OwnerId;

			if (patch?.Duration is not null)
				old.Duration = patch?.Duration;

			if (patch?.OpeningTime is not null)
				old.OpeningTime = patch?.OpeningTime;

			if (patch?.ClosureTime is not null)
				old.ClosureTime = patch?.ClosureTime;

			if (patch?.IsAccessOpen is not null)
				old.IsAccessOpen = patch?.IsAccessOpen;

			if (patch.NumberOfVariants > 0)
				old.NumberOfVariants = patch.NumberOfVariants;

			if (patch?.Description is not null)
				old.Description = patch?.Description;

			return old;
		}
	}
}
