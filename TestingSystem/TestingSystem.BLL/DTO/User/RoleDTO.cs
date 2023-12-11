using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.BLL.DTO
{
	public class RoleDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public IEnumerable<UserDTO> Users { get; set; }
	}
}
