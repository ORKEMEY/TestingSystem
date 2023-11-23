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
	public class QuestionTypeRepository : IRepository<QuestionType>
	{
		protected TestContext db { get; set; }

		public QuestionTypeRepository(TestContext context)
		{
			db = context;
		}

		public QuestionType GetItem(int id)
		{
			return db.QuestionTypes
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(QuestionType item)
		{
			db.QuestionTypes.Add(item);
		}

		public void Update(QuestionType item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			QuestionType item = db.QuestionTypes.Find(id);
			if (item != null)
				db.QuestionTypes.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<QuestionType> GetItems(Expression<Func<QuestionType, bool>> predicate)
		{
			return db.QuestionTypes.Where(predicate);
		}
	}
}
