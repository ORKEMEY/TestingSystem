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
	public class ModelRepository : IRepository<Model>
	{
		protected TestContext db { get; set; }

		public ModelRepository(TestContext context)
		{
			db = context;
		}

		public Model GetItem(int id)
		{
			return db.Models
				.FirstOrDefault(x => x.Id == id);

		}

		public void Create(Model item)
		{
			db.Models.Add(item);
		}

		public void Update(Model item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			Model item = db.Models.Find(id);
			if (item != null)
				db.Models.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<Model> GetItems(Expression<Func<Model, bool>> predicate)
		{
			return db.Models.Where(predicate);
		}
	}
}
