using Microsoft.AspNetCore.Mvc;
using shopCO.Data;

namespace shopCO.Controllers
{
    public class CartController : Controller
    {
        private readonly AppDbContext DBContext;
        public CartController(AppDbContext DBContext) => this.DBContext = DBContext;

        [HttpGet, Route("cart")]
        public async Task<IActionResult> GetCart([FromHeader(Name = "Authorization")] string header)
        {
            var cart = await DBContext.FindCartProducts(header[4..]);
            return cart != null ? Ok(cart) : NotFound("Cart not found");
        }
    }
}
