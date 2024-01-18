using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using shopCO.Data.Models;

namespace shopCO.JwtTokens
{
    public static class JwtTokensManager
    {
        public static void GenerateToken(User user, IConfiguration config)
        {
            var secretKey =  config["Jwt:Key"];
            var issuer = config["Jwt:Issuer"];
            var audience = config["Jwt:Audience"];

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[] { new Claim("userId", user.Id.ToString()) };
            var expires = DateTime.Now.AddDays(2);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: expires,
                signingCredentials: creds
                );

            user.TokenExpires = DateTime.Now.AddDays(2);
            user.Token = new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static bool TokenIsValid(string header)
        {
            return !header.IsNullOrEmpty() && header.StartsWith("Jwt");
        }
    }
}
