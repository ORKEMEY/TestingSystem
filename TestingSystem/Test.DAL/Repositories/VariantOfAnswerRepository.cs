using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Models;
using System.Linq.Expressions;
using System.Linq;

namespace TestSystem.DAL.Repositories
{
	class VariantOfAnswerRepository : IRepository<VariantOfAnswer>
	{
		protected TestContext db { get; set; }

		public VariantOfAnswerRepository(TestContext context)
		{
			db = context;
		}

		public VariantOfAnswer GetItem(int id)
		{
			return db.VariantsOfAnswer.Include(u => u.PassingRecords)
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(VariantOfAnswer item)
		{
			db.VariantsOfAnswer.Add(item);
		}

		public void Update(VariantOfAnswer item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			VariantOfAnswer item = db.VariantsOfAnswer.Find(id);
			if (item != null)
				db.VariantsOfAnswer.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<VariantOfAnswer> GetItems(Expression<Func<VariantOfAnswer, bool>> predicate)
		{
			return db.VariantsOfAnswer.Where(predicate).Include(u => u.PassingRecords);
		}
	}
}
