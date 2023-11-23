using TestingSystem.DAL.Models;
using TestingSystem.BLL.DTO;
using AutoMapper;

namespace TestingSystem.BLL
{
	public class MapperBLL
	{
		public static MapperConfiguration MapperConf { get; private set; }
		public static Mapper Mapper { get; private set; }

		static MapperBLL()
		{
			MapperConf = new MapperConfiguration(cfg =>
			{

				cfg.CreateMap<User, UserDTO>();
				cfg.CreateMap<UserDTO, User>();

				cfg.CreateMap<RefreshToken, RefreshTokenDTO>();
				cfg.CreateMap<RefreshTokenDTO, RefreshToken>();


				cfg.CreateMap<Test, TestDTO>();
				cfg.CreateMap<TestDTO, Test>();

				cfg.CreateMap<TestVariant, TestVariantDTO>();
				cfg.CreateMap<TestVariantDTO, TestVariant>();


				cfg.CreateMap<Tag, TagDTO>();
				cfg.CreateMap<TagDTO, Tag>();


				cfg.CreateMap<Model, ModelDTO>();
				cfg.CreateMap<ModelDTO, Model>();

				cfg.CreateMap<QuestionsAssembly, QuestionsAssemblyDTO>();
				cfg.CreateMap<QuestionsAssemblyDTO, QuestionsAssembly>();

				cfg.CreateMap<QuestionType, QuestionTypeDTO>();
				cfg.CreateMap<QuestionTypeDTO, QuestionType>();

				cfg.CreateMap<Question, QuestionDTO>();
				cfg.CreateMap<QuestionDTO, Question>();

				cfg.CreateMap<VariantOfAnswer, VariantOfAnswerDTO>();
				cfg.CreateMap<VariantOfAnswerDTO, VariantOfAnswer>();

			}
			);
			Mapper = new Mapper(MapperConf);
		}
	}
}