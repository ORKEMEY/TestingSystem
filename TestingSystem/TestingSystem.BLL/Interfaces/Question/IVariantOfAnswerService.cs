using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;

namespace TestingSystem.BLL.Interfaces
{
	public interface IVariantOfAnswerService : ICRUDService<VariantOfAnswerDTO>
	{
		IEnumerable<VariantOfAnswerDTO> GetAnswers(string answer);
		VariantOfAnswerDTO GetAnswer(string answer);
		IEnumerable<VariantOfAnswerDTO> GetAnswersByQuestionId(int questionId);
	}
}
