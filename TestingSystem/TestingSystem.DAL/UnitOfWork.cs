using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;
using TestingSystem.DAL.Repositories;
using TestingSystem.DAL;

namespace TestingSystem.DAL
{
	public class UnitOfWork : IUnitOfWork
	{

		private TestContext db { get; set; }

		private UserRepository _userRepository { get; set; }
		private RefreshTokenRepository _refreshTokenRepository { get; set; }
		private RoleRepository _roleRepository { get; set; }

		private TestRepository _testRepository { get; set; }
		private TestVariantRepository _testVariantRepository { get; set; }
		private LogRepository _logRepository { get; set; }

		private TagRepository _tagRepository { get; set; }

		private QuestionTypeRepository _questionTypeRepository { get; set; }
		private QuestionRepository _questionRepository { get; set; }
		private VariantOfAnswerRepository _variantOfAnswerRepository { get; set; }


		public UnitOfWork(string connectionString)
		{

			var optionsBuilder = new DbContextOptionsBuilder<TestContext>();

			var options = optionsBuilder.UseSqlServer(connectionString).Options;

			db = new TestContext(options);
		}

		public UnitOfWork(DbContextOptions options)
		{
			db = new TestContext(options);
		}

		public IRepository<User> Users
		{
			get
			{
				if (_userRepository == null)
					_userRepository = new UserRepository(db);
				return _userRepository;
			}
		}
		public IRepository<RefreshToken> RefreshTokens
		{
			get
			{
				if (_refreshTokenRepository == null)
					_refreshTokenRepository = new RefreshTokenRepository(db);
				return _refreshTokenRepository;
			}
		}
		public IRepository<Role> Roles
		{
			get
			{
				if (_roleRepository == null)
					_roleRepository = new RoleRepository(db);
				return _roleRepository;
			}
		}

		public IRepository<Test> Tests
		{
			get
			{
				if (_testRepository == null)
					_testRepository = new TestRepository(db);
				return _testRepository;
			}
		}
		public IRepository<TestVariant> TestVariants
		{
			get
			{
				if (_testVariantRepository == null)
					_testVariantRepository = new TestVariantRepository(db);
				return _testVariantRepository;
			}
		}
		public IRepository<Log> Logs
		{
			get
			{
				if (_logRepository == null)
					_logRepository = new LogRepository(db);
				return _logRepository;
			}
		}

		public IRepository<Tag> Tags
		{
			get
			{
				if (_tagRepository == null)
					_tagRepository = new TagRepository(db);
				return _tagRepository;
			}
		}
		public IRepository<QuestionType> QuestionTypes
		{
			get
			{
				if (_questionTypeRepository == null)
					_questionTypeRepository = new QuestionTypeRepository(db);
				return _questionTypeRepository;
			}
		}
		public IRepository<Question> Questions
		{
			get
			{
				if (_questionRepository == null)
					_questionRepository = new QuestionRepository(db);
				return _questionRepository;
			}
		}

		public IRepository<VariantOfAnswer> VariantsOfAnswer
		{
			get
			{
				if (_variantOfAnswerRepository == null)
					_variantOfAnswerRepository = new VariantOfAnswerRepository(db);
				return _variantOfAnswerRepository;
			}
		}

		public void Save() => db.SaveChanges();


		private bool disposed = false;

		public virtual void Dispose(bool disposing)
		{
			if (!this.disposed)
			{
				if (disposing)
				{
					db.Dispose();


				}
				this.disposed = true;
			}

		}

		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

	}
}
