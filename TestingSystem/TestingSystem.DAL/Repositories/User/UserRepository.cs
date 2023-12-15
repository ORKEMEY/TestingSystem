using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Repositories
{
    public class UserRepository : IRepository<User>
	{

		protected TestContext db { get; set; }

		public UserRepository(TestContext context)
		{
			db = context;
		}

		public User GetItem(int id)
		{
			return db.Users.Include(u => u.RefreshToken).Include(u => u.Role)
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
			return db.Users.Where(predicate).Include(u => u.Role).Include(u => u.RefreshToken);
		}


	}
}
