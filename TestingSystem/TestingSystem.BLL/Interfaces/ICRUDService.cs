using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.BLL.Interfaces
{
	public interface ICRUDService<T> where T : class
	{
		void AddItem(T item);
		void DeleteItem(T item);
		void UpdateItem(T item);
		IEnumerable<T> GetItems();
		T GetItem(int? id);
	}
}
