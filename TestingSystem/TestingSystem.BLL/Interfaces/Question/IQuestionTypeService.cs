using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;

namespace TestingSystem.BLL.Interfaces
{
	public interface IQuestionTypeService : ICRUDService<QuestionTypeDTO>
	{
		IEnumerable<QuestionTypeDTO> GetItems(string name);
	}
}
