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
	public class TestVariantRepository : IRepository<TestVariant>
	{
		protected TestContext db { get; set; }

		public TestVariantRepository(TestContext context)
		{
			db = context;
		}

		public TestVariant GetItem(int id)
		{
			return db.TestVariants.Include(c => c.Questions)
				.FirstOrDefault(x => x.Id == id);
		}

		public void Create(TestVariant item)
		{
			db.TestVariants.Add(item);
		}

		public void Update(TestVariant item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			TestVariant item = db.TestVariants.Find(id);
			if (item != null)
				db.TestVariants.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<TestVariant> GetItems(Expression<Func<TestVariant, bool>> predicate)
		{
			return db.TestVariants.Where(predicate).Include(c => c.Questions);
		}

	}
}
