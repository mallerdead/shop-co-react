using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace shopCO.JwtTokensManager
{
    public static class JwtTokensManager
    {
        public static string GenerateToken(int userId, IConfiguration config)
        {
            var secretKey =  config["Jwt:Key"];
            var issuer = config["Jwt:Issuer"];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[] { new Claim("userId", userId.ToString()) };
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: issuer,
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
