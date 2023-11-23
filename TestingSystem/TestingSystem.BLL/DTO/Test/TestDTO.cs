﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.DTO
{
	public class TestDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public UserDTO Owner { get; set; }
		public IEnumerable<UserDTO> AllowedUsers { get; set; }

		public IEnumerable<TestVariantDTO> TestVariants { get; set; }

		public IEnumerable<TagDTO> Tags { get; set; }

		public TimeSpan Duration { get; set; }
		public DateTime? OpeningTime { get; set; }
		public DateTime? ClosureTime { get; set; }

		public bool IsAccessOpen { get; set; }
		public int NumberOfVariants { get; set; }
		public string Description { get; set; }


	}
}
