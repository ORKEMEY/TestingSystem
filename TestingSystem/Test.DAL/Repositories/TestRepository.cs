using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Models;
using System.Linq.Expressions;
using System.Linq;

namespace TestSystem.DAL.Repositories
{
	class TestRepository : IRepository<Test>
	{

		protected TestContext db { get; set; }

		public TestRepository(TestContext context)
		{
			db = context;
		}

		public Test GetItem(int id)
		{
			return db.Tests.Include(u => u.Questions)
				.ThenInclude(u => u.VariantsOfAnswer)
				.Include(u => u.PassingRecords)
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(Test item)
		{
			db.Tests.Add(item);
		}

		public void Update(Test item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			Test item = db.Tests.Find(id);
			if (item != null)
				db.Tests.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<Test> GetItems(Expression<Func<Test, bool>> predicate)
		{
			return db.Tests.Where(predicate).Include(u => u.Questions).Include(u => u.PassingRecords);
		}

	}
}
