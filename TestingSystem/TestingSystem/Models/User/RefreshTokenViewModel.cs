using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingSystem.PL.Models
{
	public class RefreshTokenViewModel
	{
		public int Id { get; set; }

		public int UserId { get; set; }

		public string Token { get; set; }
		public DateTime? ExpiryTime { get; set; }
	}
}
