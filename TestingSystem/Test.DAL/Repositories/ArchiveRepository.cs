using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Models;
using System.Linq.Expressions;
using System.Linq;

namespace TestSystem.DAL.Repositories
{
	class ArchiveRepository : IRepository<Archive>
	{
		protected TestContext db { get; set; }

		public ArchiveRepository(TestContext context)
		{
			db = context;
		}

		public Archive GetItem(int id)
		{
			return db.PassingRecords.Include(u => u.Answers)
				.Include(u => u.User)
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(Archive item)
		{
			db.PassingRecords.Add(item);
		}

		public void Update(Archive item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			Archive item = db.PassingRecords.Find(id);
			if (item != null)
				db.PassingRecords.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<Archive> GetItems(Expression<Func<Archive, bool>> predicate)
		{
			return db.PassingRecords.Where(predicate).Include(u => u.User).Include(u => u.Answers);
		}
	}
}
