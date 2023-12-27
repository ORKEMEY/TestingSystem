using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;

namespace TestingSystem.BLL.Interfaces
{
	public interface ITestVariantService : ICRUDService<TestVariantDTO>
	{
		IEnumerable<TestVariantDTO> GetTestVarsByNumber(int number);
		IEnumerable<TestVariantDTO> GetTestVarsByTestId(int testId);
		void DeleteQuestion(int testVariantId, int questionId);
		void AddQuestion(int testVariantId, int questionId);
	}
}
