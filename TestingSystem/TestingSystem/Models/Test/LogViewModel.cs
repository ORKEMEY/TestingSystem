using TestingSystem.BLL.DTO;

namespace TestingSystem.PL.Models
{
	public class LogViewModel
	{
		public int Id { get; set; }

		public int? UserId { get; set; }
		
		public int? TestId { get; set; }
		
		public TimeSpan ExpiredTime { get; set; }
		public DateTime DateTime { get; set; }
		public int VariantNumer { get; set; }

		public double Zero { get; set; }

		public double MaxPoints { get; set; }
		public double Mark { get; set; }

		public int NumberOfCorrectAnswers { get; set; }
		public int MaxNumberOfCorrectAnswers { get; set; }
	}
}
