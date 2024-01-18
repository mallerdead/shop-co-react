using Microsoft.AspNetCore.Mvc;
using shopCO.Data.Models;
using shopCO.Data;
using shopCO.Data.Models.Entities;

namespace shopCO.Controllers
{
    public class OrdersController : Controller
    {
        private readonly AppDbContext DBContext;
        public OrdersController(AppDbContext DBContext) => this.DBContext = DBContext;

        [HttpGet, Route("order")]
        public async Task<IActionResult> Order()
        {
            var user = await DBContext.FindUserByToken("Jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2IiwiZXhwIjoxNzA1Njg4NzczLCJpc3MiOiJzaG9wQ09TZXJ2ZXIiLCJhdWQiOiJzaG9wQ09DbGllbnQifQ.1pYRCNbRD-_NYXfX_rXKfuP755e7Ub2gdYpKxLYPHsM");
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromHeader(Name = "Authorization")] string header, [FromBody] )
        {
            return Ok();
        }
    }
}
