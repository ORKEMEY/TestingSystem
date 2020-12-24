using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TestSystem.PL
{
    public class AuthOptions
    {
        public const string ISSUER = "TestingServer";
        public const string AUDIENCE = "TestingClient";
        const string KEY = "secretsecretsecr"; 
        public const int LIFETIME = 10; 
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
