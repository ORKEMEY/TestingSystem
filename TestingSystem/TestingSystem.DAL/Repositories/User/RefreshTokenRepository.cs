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
	public class RefreshTokenRepository : IRepository<RefreshToken>
	{
		protected TestContext db { get; set; }

		public RefreshTokenRepository(TestContext context)
		{
			db = context;
		}

		public RefreshToken GetItem(int id)
		{
			return db.RefreshTokens
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(RefreshToken item)
		{
			db.RefreshTokens.Add(item);
		}

		public void Update(RefreshToken item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			RefreshToken item = db.RefreshTokens.Find(id);
			if (item != null)
				db.RefreshTokens.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<RefreshToken> GetItems(Expression<Func<RefreshToken, bool>> predicate)
		{
			return db.RefreshTokens.Where(predicate);
		}
	}
}
