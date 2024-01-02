using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using TestingSystem.BLL.Infrastructure;
using TestingSystem.BLL.Interfaces;
using TestingSystem.BLL.Services;
using TestingSystem.DAL;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Swashbuckle.AspNetCore;


namespace TestingSystem.PL
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();
			
			services.AddTransient<IUserService, UserService>();
			services.AddTransient<IRefreshTokenService, RefreshTokenService>();
			services.AddTransient<IPasswordService, PasswordService>();
			services.AddTransient<ITestService, TestService>();
			services.AddTransient<ITestVariantService, TestVariantService>();
			services.AddTransient<IQuestionService, QuestionService>();
			services.AddTransient<IModelService, ModelService>();
			services.AddTransient<IQuestionTypeService, QuestionTypeService>();
			services.AddTransient<IVariantOfAnswerService, VariantOfAnswerService>();
			services.AddTransient<ILogService, LogService>();
			services.AddTransient<ICheckTestInterface, CheckTestService>();

			services.AddDbContext<TestContext>(optionsBuilder =>
			{
				optionsBuilder.UseSqlServer(
					new ServiceModule(Configuration).GetConnectionStringFromConfig()
					);	
			});
			services.AddTransient<IUnitOfWork, UnitOfWork>();

			//new ServiceModule(Configuration).GetDbContextOptions()
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				   .AddJwtBearer(options =>
				   {
					   options.RequireHttpsMetadata = false;
					   options.TokenValidationParameters = new TokenValidationParameters
					   {
						   ValidateIssuer = true,
						   ValidIssuer = AuthOptions.ISSUER,

						   ValidateAudience = true,
						   ValidAudience = AuthOptions.AUDIENCE,
						   ValidateLifetime = true,

						   IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
						   ValidateIssuerSigningKey = true,
					   };
				   });
			services.AddControllersWithViews();
			services.AddSwaggerGen(config =>
			{
				config.SwaggerDoc("v1", new OpenApiInfo
				{
					Version = "v1",
					Title = "Testing system API",
					Description = "ASP.NET Core Web API"
				});
				config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
				{
					In = ParameterLocation.Header,
					Description = "JWT token",
					Name = "Authorization",
					Type = SecuritySchemeType.ApiKey,
					BearerFormat = "JWT",
					Scheme = "Bearer"
				});
				config.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type = ReferenceType.SecurityScheme,
								Id = "Bearer"
							}
						},
						new string[] { }
					}

				});
			});

		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();

				app.UseSwagger();
				app.UseSwaggerUI(c =>
				{
					c.SwaggerEndpoint("/swagger/v1/swagger.json", "Testing system API V1");
				});
			}

			app.UseStaticFiles();

			app.UseHttpsRedirection();

			app.UseRouting();

			if (!env.IsDevelopment())
			{
				app.UseSpaStaticFiles();
			}

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			app.UseSpa(spa =>
			{
				// To learn more about options for serving an Angular SPA from ASP.NET Core,
				// see https://go.microsoft.com/fwlink/?linkid=864501

				spa.Options.SourcePath = Configuration["SpaRoot"];



				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});

		}
	}
}
 