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
	public class VariantOfAnswerRepository : IRepository<VariantOfAnswer>
	{
		protected TestContext db { get; set; }

		public VariantOfAnswerRepository(TestContext context)
		{
			db = context;
		}

		public VariantOfAnswer GetItem(int id)
		{
			return db.VariantsOfAnswer
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
			return db.VariantsOfAnswer.Where(predicate);
		}

	}
}
