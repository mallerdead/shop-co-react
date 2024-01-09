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

        [HttpPost, Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registerModel)
        {
            if (!await DBContext.CheckUserByEMail(registerModel.Email))
            {
                var test = await DBContext.CreateUser(registerModel, Config);
                return Ok(test);
            }
            return Conflict("User already exist");
        }
    }
}
