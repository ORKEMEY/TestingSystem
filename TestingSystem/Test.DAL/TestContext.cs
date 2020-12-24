using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TestSystem.DAL.Models;

namespace TestSystem.DAL
{
	public class TestContext : DbContext
	{
		public DbSet<Test> Tests { get; set; }
		public DbSet<Question> Questions { get; set; }
		public DbSet<VariantOfAnswer> VariantsOfAnswer { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Archive> PassingRecords { get; set; }


		public TestContext(DbContextOptions options) : base(options)
		{
			//Database.EnsureDeleted();
			Database.EnsureCreated();
			//this.Seed();

		}

		public void Seed()
		{

			var firstQ = new Question() { Query = "first" };
			var secondQ = new Question() { Query = "second" };
			var thirdQ = new Question() { Query = "third" };

			

			var firstVoa = new VariantOfAnswer() { Answer = "first", IsCorrect = false, Question = firstQ };
			var sescondVoa = new VariantOfAnswer() { Answer = "second", IsCorrect = true, Question = firstQ };
			var thirdVoa = new VariantOfAnswer() { Answer = "third", IsCorrect = true, Question = secondQ };
			var fourthVoa = new VariantOfAnswer() { Answer = "fourth", IsCorrect = false, Question = secondQ };
			var fifthVoa = new VariantOfAnswer() { Answer = "fifth", IsCorrect = true, Question = thirdQ };
			var sixthVoa = new VariantOfAnswer() { Answer = "sixth", IsCorrect = false, Question = thirdQ };

			this.VariantsOfAnswer.AddRange(firstVoa, sescondVoa, thirdVoa);
			this.VariantsOfAnswer.AddRange(fourthVoa, fifthVoa, sixthVoa);
			this.Questions.AddRange(firstQ, secondQ, thirdQ);

			var firstT = new Test() { Name = "first", Time = new TimeSpan(0, 1, 0), Questions = new List<Question>(){ firstQ, secondQ } };
			var secondT = new Test() { Name = "second", Time = new TimeSpan(0, 2, 0), Questions = new List<Question>(){ firstQ, thirdQ } };
			var thirdT = new Test() { Name = "third", Time = new TimeSpan(0, 3, 0), Questions = new List<Question>(){ secondQ, thirdQ } };

			this.Tests.AddRange(firstT, secondT, thirdT);

			var firstU = new User { Login = "first", Password = "1", IsAdmin = true };
			var secondU = new User { Login = "second", Password = "1", IsAdmin = false };

			this.Users.AddRange(firstU, secondU);

			var firstA = new Archive() {User = firstU, Test = firstT, Answers  = new List<VariantOfAnswer>() { sescondVoa, fourthVoa } };
			var secondA = new Archive() {User = secondU, Test = secondT, Answers  = new List<VariantOfAnswer>() { firstVoa, fifthVoa } };
			var thirdA = new Archive() {User = secondU, Test = thirdT, Answers  = new List<VariantOfAnswer>() { thirdVoa, sixthVoa } };

			this.PassingRecords.AddRange(firstA, secondA, thirdA);

			this.SaveChanges();
		}


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Test>()
				.HasMany(d => d.Questions).WithMany(i => i.Tests);

			modelBuilder.Entity<VariantOfAnswer>()
				.HasMany(d => d.PassingRecords).WithMany(i => i.Answers);
		}
	}
}
