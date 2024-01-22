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
            try
            {
                var user = await DBContext.FindUserByToken(header);

                return Ok(new UserInfoViewModel(user));
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
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

        [HttpPut, Route("user/change/name")]
        public async Task<IActionResult> ChangeUserName([FromHeader(Name = "Authorization")] string header, [FromBody] string newName)
        {
            try
            {
                var user = await DBContext.FindUserByToken(header);

                await DBContext.ChangeUserName(user, newName);

                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPut, Route("user/change/email")]
        public async Task<IActionResult> ChangeUserEmail([FromHeader(Name = "Authorization")] string header, [FromBody] string newEmail)
        {
            try
            {
                var user = await DBContext.FindUserByToken(header);

                await DBContext.ChangeUserEmail(user, newEmail);

                return Ok();
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
