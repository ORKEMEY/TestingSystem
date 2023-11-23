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
	public class TagRepository : IRepository<Tag>
	{

		protected TestContext db { get; set; }

		public TagRepository(TestContext context)
		{
			db = context;
		}

		public Tag GetItem(int id)
		{
			return db.Tags
				.FirstOrDefault(x => x.Id == id);
		}

		public void Create(Tag item)
		{
			db.Tags.Add(item);
		}

		public void Update(Tag item)
		{
			db.Entry(item).State = EntityState.Modified;
		}

		public void Delete(int id)
		{
			Tag item = db.Tags.Find(id);
			if (item != null)
				db.Tags.Remove(item);
		}

		public void Save() => db.SaveChanges();

		public IEnumerable<Tag> GetItems(Expression<Func<Tag, bool>> predicate)
		{
			return db.Tags.Where(predicate);
		}
	}
}
