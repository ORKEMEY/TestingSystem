using TestSystem.BLL.DTO;
using TestSystem.DAL.Models;
using AutoMapper;

namespace TestSystem.BLL
{
	class MapperBLL
	{
		public static MapperConfiguration MapperConf { get; private set; }
		public static Mapper Mapper { get; private set; }

		static MapperBLL()
		{
			MapperConf = new MapperConfiguration(cfg =>
			{

				cfg.CreateMap<Test, TestDTO>();
				cfg.CreateMap<TestDTO, Test>();

				cfg.CreateMap<Question, QuestionDTO>();
				cfg.CreateMap<QuestionDTO, Question>();

				cfg.CreateMap<Archive, ArchiveDTO>();
				cfg.CreateMap<ArchiveDTO, Archive>();

				cfg.CreateMap<User, UserDTO>();
				cfg.CreateMap<UserDTO, User>();

				cfg.CreateMap<VariantOfAnswer, VariantOfAnswerDTO>();
				cfg.CreateMap<VariantOfAnswerDTO, VariantOfAnswer>();

			}
			);
			Mapper = new Mapper(MapperConf);
		}
	}
}
