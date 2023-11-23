using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.DAL.Repositories
{
	public interface IRepository<T> where T : class
	{
		T GetItem(int id);
		void Create(T item);
		void Update(T item);
		void Delete(int id);
		void Save();
		public IEnumerable<T> GetItems(Expression<Func<T, bool>> predicate);
	}
}
