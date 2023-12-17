using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class QuestionsAssemblyPatcher
	{
		public static QuestionsAssembly Patch(QuestionsAssembly old, QuestionsAssembly patch)
		{
			if (patch?.Name is not null)
				old.Name = patch?.Name;

			if (patch.OwnerId > 0)
				old.OwnerId = patch.OwnerId;

			return old;
		}
	}
}
