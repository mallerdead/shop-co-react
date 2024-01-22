using Microsoft.AspNetCore.Mvc;
using shopCO.Data;
using shopCO.Data.Models;

namespace shopCO.Controllers
{
    public class OrdersController : Controller
    {
        private readonly AppDbContext DBContext;
        public OrdersController(AppDbContext DBContext) => this.DBContext = DBContext;

        [HttpPost, Route("order/create")]
        public async Task<IActionResult> CreateOrder([FromHeader(Name = "Authorization")] string header, [FromBody] CreateOrderViewModel newOrder )
        {
            try
            {
                var user = await DBContext.FindUserByToken(header);
                await DBContext.CreateOrder(user, newOrder);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
