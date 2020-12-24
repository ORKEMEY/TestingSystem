using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Models;
using TestSystem.DAL.Repositories;
using System.Linq.Expressions;
using System.Linq;


namespace TestSystem.DAL
{
	public interface IUnitOfWork : IDisposable
	{
		IRepository<Test> Tests { get; }
		IRepository<User> Users { get; }
		IRepository<Question> Questions { get; }
		IRepository<Archive> PassingRecords { get; }
		IRepository<VariantOfAnswer> VariantsOfAnswer { get; }
		void Save();
	}
}
