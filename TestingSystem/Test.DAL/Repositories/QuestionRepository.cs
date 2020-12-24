using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Models;
using System.Linq.Expressions;
using System.Linq;

namespace TestSystem.DAL.Repositories
{
	class QuestionRepository : IRepository<Question>
	{
		protected TestContext db { get; set; }

		public QuestionRepository(TestContext context)
		{
			db = context;
		}

		public Question GetItem(int id)
		{
			return db.Questions.Include(u => u.Tests)
				.Include(u => u.VariantsOfAnswer)
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(Question item)
		{
			db.Questions.Add(item);
		}

		public void Update(Question item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			Question item = db.Questions.Find(id);
			if (item != null)
				db.Questions.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<Question> GetItems(Expression<Func<Question, bool>> predicate)
		{
			return db.Questions.Where(predicate).Include(u => u.Tests).Include(u => u.VariantsOfAnswer);
		}
	}
}
