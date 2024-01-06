using shopCO.Data;
using Microsoft.AspNetCore.Mvc;
using shopCO.Data.Models;

namespace shopCO.Controllers
{
    public class UsersController : Controller
    {
        AppDbContext dbContext = new AppDbContext();

        [HttpPost, Route("register")]
        public IActionResult Register([FromBody] RegisterViewModel registerModel)
        {
            if (!dbContext.CheckUserByEMail(registerModel.Email))
            {
                var token = dbContext.CreateUser(registerModel);
                return Ok(token);
            }

            return Conflict("User already exist");
        }
    }
}
