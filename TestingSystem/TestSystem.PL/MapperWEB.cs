using TestSystem.BLL.DTO;
using TestSystem.DAL.Models;
using AutoMapper;
using TestSystem.PL.Models;

namespace TestSystem.PL
{
	public class MapperWEB
	{
		public static MapperConfiguration MapperConf { get; private set; }
		public static Mapper Mapper { get; private set; }

		static MapperWEB()
		{
			MapperConf = new MapperConfiguration(cfg =>
			{

				cfg.CreateMap<TestDTO, TestViewModel>();
				cfg.CreateMap<TestViewModel, TestDTO>();

				cfg.CreateMap<QuestionViewModel, QuestionDTO>();
				cfg.CreateMap<QuestionDTO, QuestionViewModel>();

				cfg.CreateMap<ArchiveViewModel, ArchiveDTO>();
				cfg.CreateMap<ArchiveDTO, ArchiveViewModel>();

				cfg.CreateMap<UserViewModel, UserDTO>();
				cfg.CreateMap<UserDTO, UserViewModel>();

				cfg.CreateMap<VariantOfAnswerViewModel, VariantOfAnswerDTO>();
				cfg.CreateMap<VariantOfAnswerDTO, VariantOfAnswerViewModel>();

			}
			);
			Mapper = new Mapper(MapperConf);
		}
	}
}
