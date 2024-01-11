using shopCO.Data;
using Microsoft.AspNetCore.Mvc;
using shopCO.Data.Models;

namespace shopCO.Controllers
{
    public class UsersController : Controller
    {
        private readonly AppDbContext DBContext;
        private readonly IConfiguration Config;

        public UsersController(AppDbContext DBContext, IConfiguration Config)
        {
            this.DBContext = DBContext;
            this.Config = Config;
        }

        [HttpGet, Route("user")]
        public async Task<IActionResult> GetUser([FromHeader(Name = "Authorization")] string header)
        {
            if (!string.IsNullOrEmpty(header) && header.StartsWith("Jwt "))
            {
                var user = await DBContext.FindUserByToken(header[4..]);

                if (user != null)
                {
                    return Ok(new UserInfoViewModel(user));
                }
            }

            return Unauthorized("There is no user with this token");
        }

        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerModel)
        {
            if (!await DBContext.CheckUserByEMail(registerModel.Email))
            {
                var token = await DBContext.CreateUser(registerModel, Config);
                return Ok(token);
            }

            return Conflict("User already exist");
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            string token = await DBContext.UserLogin(loginViewModel, Config);
            return token != null ? Ok(token) : NotFound("User does not exist");
        }
    }
}
