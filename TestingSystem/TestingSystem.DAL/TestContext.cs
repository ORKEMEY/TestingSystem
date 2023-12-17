using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestingSystem.DAL.Models;
using TestingSystem.DAL.Repositories;

namespace TestingSystem.DAL
{
	
	public class TestContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<RefreshToken> RefreshTokens { get; set; }
		public DbSet<Role> Roles { get; set; }

		public DbSet<Test> Tests { get; set; }
		public DbSet<TestVariant> TestVariants { get; set; }
		public DbSet<Log> Logs { get; set; }

		public DbSet<Tag> Tags { get; set; }

		public DbSet<Model> Models { get; set; }
		public DbSet<QuestionsAssembly> QuestionsAssemblies { get; set; }
		public DbSet<QuestionType> QuestionTypes { get; set; }
		public DbSet<Question> Questions { get; set; }
		public DbSet<VariantOfAnswer> VariantsOfAnswer { get; set; }

		public TestContext(DbContextOptions options) : base(options)
		{

				//Database.EnsureDeleted();
				//Database.EnsureCreated();
				//this.Seed();

		}

		public void Seed()
		{

			var firstRole = new Role() { Name = "Admin" };
			var secondRole = new Role() { Name = "Customer" };

			var firstU = new User { Login = "first", Password = "94C90AC0AC9BAD790BB6483D3CBB8C55373F846CE88795DC832BFEED595928B9", EMail = "email1@gmail.com", Name = "Name1", Surname = "Surname1", Role = firstRole }; // pas: 1234aa //65800af5a937d433c0febd5bd96c47edd5f24e5e0389900b216749612ebd223f
			var secondU = new User { Login = "second", Password = "96E11B06FE0745A5AEEF080E64E7A36174009EEE1554FA19F61DA1E366FFEB49", EMail = "email1@gmail.com", Name = "Name1", Surname = "Surname1", Role = secondRole }; // pas: 1234aa //34cf2bc17c49ee04bf4c859378167dc83b24bdc093ba23adb8061b1c473ca068

			this.Users.AddRange(firstU, secondU);

			//----------------------------------------------------------------

			var firstTg = new Tag() { Name = "first" };
			var secondTg = new Tag() { Name = "second" };

			this.Tags.AddRange(firstTg, secondTg);

			//----------------------------------------------------------------

			var firstQa = new QuestionsAssembly() { Name = "first", Owner = firstU };
			var secondQa = new QuestionsAssembly() { Name = "second", Owner = secondU };

			this.QuestionsAssemblies.AddRange(firstQa, secondQa);

			var firstM = new Model() { Name = "first" };
			var secondM = new Model() { Name = "second"};
			var thirdM = new Model() { Name = "third"};

			this.Models.AddRange(firstM, secondM, thirdM);

			var firstQt = new QuestionType() { Name = "Single Choise" };
			var secondQt = new QuestionType() { Name = "True / False" };
			var thirdQt = new QuestionType() { Name = "Short Answer" };

			this.QuestionTypes.AddRange(firstQt, secondQt, thirdQt);

			var firstQ = new Question() { Query = "first", Model = firstM, QuestionType = firstQt, QuestionsAssembly = firstQa, Tags = new[] { firstTg } };
			var secondQ = new Question() { Query = "second", Model = secondM, QuestionType = secondQt, QuestionsAssembly = firstQa, Tags = new[] { firstTg, secondTg } };
			var thirdQ = new Question() { Query = "third", Model = thirdM, QuestionType = secondQt, QuestionsAssembly = secondQa, Tags = new[] { secondTg } };
			var fourthQ = new Question() { Query = "fourth", Model = secondM, QuestionType = thirdQt, QuestionsAssembly = secondQa, Tags = new[] { secondTg } };

			this.Questions.AddRange(firstQ, secondQ, thirdQ, fourthQ);

			var firstVoa = new VariantOfAnswer() { Answer = "SC first", IsCorrect = false, Question = firstQ };
			var secondVoa = new VariantOfAnswer() { Answer = "SC second", IsCorrect = true, Question = firstQ };
			var thirdVoa = new VariantOfAnswer() { Answer = "True", IsCorrect = true, Question = secondQ };
			var fourthVoa = new VariantOfAnswer() { Answer = "False", IsCorrect = false, Question = secondQ };
			var fifthVoa = new VariantOfAnswer() { Answer = "True", IsCorrect = true, Question = thirdQ };
			var sixthVoa = new VariantOfAnswer() { Answer = "False", IsCorrect = false, Question = thirdQ };
			var seventhVoa = new VariantOfAnswer() { Answer = "Short Answer", IsCorrect = true, Question = fourthQ };
			

			this.VariantsOfAnswer.AddRange(firstVoa, secondVoa, thirdVoa);
			this.VariantsOfAnswer.AddRange(fourthVoa, fifthVoa, sixthVoa, seventhVoa);



			//----------------------------------------------------------------

			var firstTv = new TestVariant() { Number = 1, Questions = new List<Question>() { firstQ, secondQ } };
			var secondTv = new TestVariant() { Number = 1, Questions = new List<Question>() { thirdQ } };
			var thirdTv = new TestVariant() { Number = 2, Questions = new List<Question>() { fourthQ } };

			this.TestVariants.AddRange(firstTv, secondTv, thirdTv);


			var firstT = new Test() { Name = "first", Description = "Description1", Duration = new TimeSpan(0, 1, 0), ClosureTime = new DateTime(2024, 07, 01), IsAccessOpen = true,
				OpeningTime = new DateTime(2023, 01, 01) , Owner = firstU, NumberOfVariants = 1, TestVariants = new[] { firstTv }, Tags = new[] { firstTg, secondTg } };
			
			var secondT = new Test() { Name = "second", Description = "Description2", Duration = new TimeSpan(0, 2, 0), ClosureTime = new DateTime(2024, 07, 01),
				IsAccessOpen = false, AllowedUsers = new[] { firstU, secondU },
				OpeningTime = new DateTime(2023, 01, 01), Owner = secondU, NumberOfVariants = 2, TestVariants = new[] { secondTv, thirdTv }, Tags = new[] { secondTg } };

			this.Tests.AddRange(firstT, secondT);

			var firstLog = new Log() { User = firstU, Test = firstT, VariantNumer = 1, ExpiredTime = new TimeSpan(0, 1, 0), Mark = 12, DateTime = new DateTime(2024, 07, 01) };

			this.Logs.Add(firstLog);

			this.SaveChanges();
		}

			

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Test>()
				.HasMany(c => c.AllowedUsers)
				.WithMany(s => s.AccessibleTests)
				.UsingEntity<Dictionary<string, object>>(
					"AllowList",
					j => j.HasOne<User>().WithMany(),
					j => j.HasOne<Test>().WithMany().OnDelete(DeleteBehavior.ClientCascade));


			modelBuilder.Entity<Log>()
				.HasOne(c => c.Test)
				.WithMany(s => s.Logs)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<Log>()
				.HasOne(c => c.User)
				.WithMany(s => s.Logs)
				.OnDelete(DeleteBehavior.NoAction);

			modelBuilder.Entity<Question>()
				.HasMany(c => c.TestVariants)
				.WithMany(s => s.Questions)
				.UsingEntity<Dictionary<string, object>>(
					"QuestionTestVariant",
					j => j.HasOne<TestVariant>().WithMany(),
					j => j.HasOne<Question>().WithMany().OnDelete(DeleteBehavior.ClientCascade));

			modelBuilder.Entity<Test>()
				.HasOne(p => p.Owner)
				.WithMany(t => t.OwnedTests)
				.HasForeignKey(p => p.OwnerId);

			modelBuilder.Entity<QuestionsAssembly>()
				.HasOne(p => p.Owner)
				.WithMany(t => t.QuestionsAssemblyies)
				.HasForeignKey(p => p.OwnerId);

		}
	}
	
}
