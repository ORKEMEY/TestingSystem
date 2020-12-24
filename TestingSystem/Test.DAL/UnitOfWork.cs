using System;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Repositories;
using TestSystem.DAL.Models;

namespace TestSystem.DAL
{
	public class UnitOfWork : IUnitOfWork
	{
		private TestContext db { get; set; }

		private TestRepository _testRepository { get; set; }
		private QuestionRepository _questionRepository { get; set; }
		private UserRepository _userRepository { get; set; }
		private VariantOfAnswerRepository _variantOfAnswerRepository { get; set; }
		private ArchiveRepository _archiveRepository { get; set; }

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

		public IRepository<Test> Tests
		{
			get
			{
				if (_testRepository == null)
					_testRepository = new TestRepository(db);
				return _testRepository;
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

		public IRepository<User> Users
		{
			get
			{
				if (_userRepository == null)
					_userRepository = new UserRepository(db);
				return _userRepository;
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

		public IRepository<Archive> PassingRecords
		{
			get
			{
				if (_archiveRepository == null)
					_archiveRepository = new ArchiveRepository(db);
				return _archiveRepository;
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
