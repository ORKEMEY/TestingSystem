using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;
using TestingSystem.DAL.Repositories;


namespace TestingSystem.DAL
{
	public interface IUnitOfWork : IDisposable
	{

		IRepository<User> Users { get; }
		IRepository<RefreshToken> RefreshTokens { get; }

		IRepository<Test> Tests { get; }
		IRepository<TestVariant> TestVariants { get; }

		IRepository<Tag> Tags { get; }

		IRepository<Model> Models { get; }
		IRepository<QuestionsAssembly> QuestionsAssemblies { get; }
		IRepository<QuestionType> QuestionTypes { get; }
		IRepository<Question> Questions { get; }
		IRepository<VariantOfAnswer> VariantsOfAnswer { get; }

		void Save();
		
	}
}
