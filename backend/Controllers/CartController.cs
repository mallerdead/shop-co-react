using Microsoft.AspNetCore.Mvc;
using shopCO.Data;
using shopCO.Data.Models;

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

        [HttpPost, Route("cart/products/add")]
        public async Task<IActionResult> AddProduct([FromHeader(Name = "Authorization")] string header, [FromBody] ProductViewModel product)
        {
            if (product != null)
            {
                var user = await DBContext.FindUserByToken(header[4..]);

                if (user != null)
                {
                    var isContains = await DBContext.AddCartProductToCart(user, product);

                    return isContains ? Ok() : CreatedAtAction(nameof(AddProduct), new { id = product.ClothId }, null);
                }
            }

            return BadRequest("Something went wrong");
        }
        [HttpPost, Route("cart/products/remove")]
        public async Task<IActionResult> RemoveProduct([FromHeader(Name = "Authorization")] string header, [FromBody] ProductViewModel product)
        {
            if (product != null)
            {
                var user = await DBContext.FindUserByToken(header[4..]);

                if (user != null)
                {
                    await DBContext.RemoveProductFromCart(user, product);

                    return Ok();
                }
            }
            return BadRequest();
        }
        [HttpPost, Route("cart/products/change-count")]
        public async Task<IActionResult> ChangeCount([FromHeader(Name = "Authorization")] string header, [FromBody] ProductViewModel product)
        {
            if (product != null)
            {
                var user = await DBContext.FindUserByToken(header[4..]);

                if (user != null)
                {
                    try
                    {
                        await DBContext.ChangeCountProduct(user, product);
                        return Ok();
                    }
                    catch (Exception ex)
                    {
                        return NotFound(ex.Message);
                    }
                }
            }

            return BadRequest("Something went wrong");
        }
    }
}
