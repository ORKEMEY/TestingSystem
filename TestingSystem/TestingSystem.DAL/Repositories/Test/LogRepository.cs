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
	public class LogRepository : IRepository<Log>
	{
		protected TestContext db { get; set; }

		public LogRepository(TestContext context)
		{
			db = context;
		}

		public Log GetItem(int id)
		{
			return db.Logs
				.Include(l => l.User)
				.FirstOrDefault(x => x.Id == id);
		}

		public void Create(Log item)
		{
			db.Logs.Add(item);
		}

		public void Update(Log item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			Log item = db.Logs.Find(id);
			if (item != null)
				db.Logs.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<Log> GetItems(Expression<Func<Log, bool>> predicate)
		{
			return db.Logs.Where(predicate).Include(l => l.User);
		}
	}
}
