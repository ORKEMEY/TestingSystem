using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Patchers
{
	public static class TestVariantPatcher
	{
		public static TestVariant Patch(TestVariant old, TestVariant patch)
		{

			if (patch.Number > 0)
				old.Number = patch.Number;

			if (patch.TestId > 0)
				old.TestId = patch.TestId;

			return old;
		}
	}
}
