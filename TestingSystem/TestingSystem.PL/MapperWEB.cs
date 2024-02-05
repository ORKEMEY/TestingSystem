using TestingSystem.BLL.DTO;
using TestingSystem.DAL.Models;
using AutoMapper;
using TestingSystem.PL.Models;

namespace TestingSystem.PL
{
	public class MapperWEB
	{
		public static MapperConfiguration MapperConf { get; private set; }
		public static Mapper Mapper { get; private set; }

		static MapperWEB()
		{
			MapperConf = new MapperConfiguration(cfg =>
			{

				cfg.CreateMap<CustomerViewModel, UserDTO>();
				cfg.CreateMap<UserDTO, CustomerViewModel>();

				cfg.CreateMap<UserViewModel, UserDTO>();
				cfg.CreateMap<UserDTO, UserViewModel>();

				cfg.CreateMap<LogViewModel, LogDTO>();
				cfg.CreateMap<LogDTO, LogViewModel>();

				cfg.CreateMap<RoleViewModel, RoleDTO>();
				cfg.CreateMap<RoleDTO, RoleViewModel>();

				cfg.CreateMap<RefreshTokenViewModel, RefreshTokenDTO>();
				cfg.CreateMap<RefreshTokenDTO, RefreshTokenViewModel>();


				cfg.CreateMap<TestViewModel, TestDTO>();
				cfg.CreateMap<TestDTO, TestViewModel>();

				cfg.CreateMap<TestVariantViewModel, TestVariantDTO>();
				cfg.CreateMap<TestVariantDTO, TestVariantViewModel>();


				cfg.CreateMap<TagViewModel, TagDTO>();
				cfg.CreateMap<TagDTO, TagViewModel>();


				cfg.CreateMap<ModelViewModel, ModelDTO>();
				cfg.CreateMap<ModelDTO, ModelViewModel>();

				cfg.CreateMap<QuestionsAssemblyViewModel, QuestionsAssemblyDTO>();
				cfg.CreateMap<QuestionsAssemblyDTO, QuestionsAssemblyViewModel>();

				cfg.CreateMap<QuestionTypeViewModel, QuestionTypeDTO>();
				cfg.CreateMap<QuestionTypeDTO, QuestionTypeViewModel>();

				cfg.CreateMap<QuestionViewModel, QuestionDTO>();
				cfg.CreateMap<QuestionDTO, QuestionViewModel>();

				cfg.CreateMap<VariantOfAnswerViewModel, VariantOfAnswerDTO>();
				cfg.CreateMap<VariantOfAnswerDTO, VariantOfAnswerViewModel>();


				cfg.CreateMap<TokenViewModel, TokenDTO>();
				cfg.CreateMap<TokenDTO, TokenViewModel>();

			}
			);
			Mapper = new Mapper(MapperConf);
		}
	}
}
