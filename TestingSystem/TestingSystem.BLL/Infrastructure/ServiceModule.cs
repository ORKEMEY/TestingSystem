using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TestingSystem.DAL;

namespace TestingSystem.BLL.Infrastructure
{
	public class ServiceModule
	{

		private IConfiguration _configuration;

		public ServiceModule(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public string GetConnectionStringFromConfig(string connectionName = "DefaultConnection")
		{
			var builder = new ConfigurationBuilder();
			builder.SetBasePath(Directory.GetCurrentDirectory());

			return _configuration.GetConnectionString(connectionName);
		}

		public DbContextOptions GetDbContextOptions(string connectionName = "DefaultConnection")
		{

			var optionsBuilder = new DbContextOptionsBuilder<TestContext>();

			var connectionString = GetConnectionStringFromConfig(connectionName);

			return optionsBuilder.UseSqlServer(connectionString).Options;
		}
	}
}
