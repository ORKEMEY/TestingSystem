using System;
using System.Collections.Generic;
using TestSystem.BLL.DTO;

namespace TestSystem.BLL.Interfaces
{
	public interface IVariantOfAnswerService : ICRUDService<VariantOfAnswerDTO>
	{
		IEnumerable<VariantOfAnswerDTO> GetItems(string answer);
	}
}
