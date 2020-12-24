using System;
using System.Collections.Generic;

namespace TestSystem.BLL.DTO
{
	public class UserDTO
	{
		public int Id { get; set; }
		public string Login { get; set; }
		public string Password { get; set; }
		public bool IsAdmin { get; set; }
		public IEnumerable<ArchiveDTO> PassingRecords { get; set; }

		public UserDTO()
		{
			PassingRecords = new List<ArchiveDTO>();
		}
	}
}
