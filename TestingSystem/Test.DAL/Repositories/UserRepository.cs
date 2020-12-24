using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Models;
using System.Linq.Expressions;
using System.Linq;

namespace TestSystem.DAL.Repositories
{
	class UserRepository : IRepository<User>
	{

		protected TestContext db { get; set; }

		public UserRepository(TestContext context)
		{
			db = context;
		}

		public User GetItem(int id)
		{
			return db.Users.Include(u => u.PassingRecords)
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(User item)
		{
			db.Users.Add(item);
		}

		public void Update(User item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			User item = db.Users.Find(id);
			if (item != null)
				db.Users.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<User> GetItems(Expression<Func<User, bool>> predicate)
		{
			return db.Users.Where(predicate).Include(u => u.PassingRecords);
		}

	}
}
