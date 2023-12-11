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
	public class RoleRepository : IRepository<Role>
	{
		protected TestContext db { get; set; }

		public RoleRepository(TestContext context)
		{
			db = context;
		}

		public Role GetItem(int id)
		{
			return db.Roles
				.FirstOrDefault(x => x.Id == id);
		}

		public void Create(Role item)
		{
			db.Roles.Add(item);
		}

		public void Update(Role item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			Role item = db.Roles.Find(id);
			if (item != null)
				db.Roles.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<Role> GetItems(Expression<Func<Role, bool>> predicate)
		{
			return db.Roles.Where(predicate);
		}
	}
}
