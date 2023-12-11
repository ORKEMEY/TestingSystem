using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;

namespace TestingSystem.BLL.Interfaces
{
	public interface IRoleService : ICRUDService<RoleDTO>
	{
		IEnumerable<RoleDTO> GetItems(string name);
	}
}
