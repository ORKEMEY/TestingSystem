using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.DAL.Models;

namespace TestingSystem.DAL.Repositories
{
	public class QuestionsAssemblyRepository : IRepository<QuestionsAssembly>
	{

		protected TestContext db { get; set; }

		public QuestionsAssemblyRepository(TestContext context)
		{
			db = context;
		}

		public QuestionsAssembly GetItem(int id)
		{
			return db.QuestionsAssemblies.Include(c => c.Questions)
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(QuestionsAssembly item)
		{
			db.QuestionsAssemblies.Add(item);
		}

		public void Update(QuestionsAssembly item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			QuestionsAssembly item = db.QuestionsAssemblies.Find(id);
			if (item != null)
				db.QuestionsAssemblies.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<QuestionsAssembly> GetItems(Expression<Func<QuestionsAssembly, bool>> predicate)
		{
			return db.QuestionsAssemblies.Where(predicate).Include(c => c.Questions);
		}
	}
}
