using System;
using System.Collections.Generic;
using TestSystem.BLL.DTO;

namespace TestSystem.BLL.Interfaces
{
	public interface IQuestionService : ICRUDService<QuestionDTO>
	{
		IEnumerable<QuestionDTO> GetItems(string query);
	}
}
