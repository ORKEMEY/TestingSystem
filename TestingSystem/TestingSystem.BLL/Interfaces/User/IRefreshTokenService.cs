﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestingSystem.BLL.DTO;


namespace TestingSystem.BLL.Interfaces
{
	public interface IRefreshTokenService
	{
		TokenDTO RefreshToken(TokenDTO token);
		void AssignRefreshToken(UserDTO user);
	}
}