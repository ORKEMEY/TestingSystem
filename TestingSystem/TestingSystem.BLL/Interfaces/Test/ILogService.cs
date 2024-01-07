using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;

namespace TestingSystem.BLL.Interfaces
{
	public interface ILogService : ICRUDService<LogDTO>
	{
		IEnumerable<LogDTO> GetLogsByDate(DateTime date);
		public IEnumerable<LogDTO> GetLogsByTestId(int testId);
	}
}
