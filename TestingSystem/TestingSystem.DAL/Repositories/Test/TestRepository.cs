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
	public class TestRepository : IRepository<Test>
	{

		protected TestContext db { get; set; }

		public TestRepository(TestContext context)
		{
			db = context;
		}

		public Test GetItem(int id)
		{
			return db.Tests
				.Include(u => u.AllowedUsers)
				.Include(u => u.Owner)

				.Include(u => u.TestVariants)
				.ThenInclude(tv => tv.Questions)
				.ThenInclude(q => q.Answers)

				.Include(u => u.TestVariants)
				.ThenInclude(tv => tv.Questions)


				.Include(u => u.TestVariants)
				.ThenInclude(tv => tv.Questions)
				.ThenInclude(q => q.QuestionType)

				.Include(u => u.Tags)
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
			return db.Tests.Where(predicate)
				.Include(u => u.AllowedUsers)
				.Include(u => u.Owner)

				.Include(u => u.TestVariants)
				.ThenInclude(tv => tv.Questions)
				.ThenInclude(q => q.Answers)

				.Include(u => u.TestVariants)
				.ThenInclude(tv => tv.Questions)


				.Include(u => u.TestVariants)
				.ThenInclude(tv => tv.Questions)
				.ThenInclude(q => q.QuestionType)

				.Include(u => u.Tags);
		}

	}
}
