using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;
using TestingSystem.BLL.Infrastructure;

namespace TestingSystem.BLL.Interfaces
{
	public interface ICheckTestInterface
	{
		LogDTO CheckTest(int userId, TestDTO testDTO, LogDTO logDTO);
	}
}
