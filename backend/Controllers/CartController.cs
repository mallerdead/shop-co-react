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
            try
            {
                var user = await DBContext.FindUserByToken(header);
                var cart = DBContext.FindCartProducts(user);
                return cart.Count != 0 ? Ok(cart) : NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route("cart/products/add")]
        public async Task<IActionResult> AddProduct([FromHeader(Name = "Authorization")] string header, [FromBody] ProductViewModel product)
        {
            try
            {
                var user = await DBContext.FindUserByToken(header);

                var isContains = await DBContext.AddCartProductToCart(user, product);

                return isContains ? Ok() : CreatedAtAction(nameof(AddProduct), new { id = product.ClothId }, null);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
        [HttpPost, Route("cart/products/remove")]
        public async Task<IActionResult> RemoveProduct([FromHeader(Name = "Authorization")] string header, [FromBody] ProductViewModel product)
        {
            if (product != null)
            {
                try
                {
                    var user = await DBContext.FindUserByToken(header);

                    await DBContext.RemoveProductFromCart(user, product);

                    return Ok();
                }
                catch (Exception ex)
                {
                    return Unauthorized(ex.Message);
                }
            }
            return BadRequest();
        }
        [HttpPost, Route("cart/products/change-count")]
        public async Task<IActionResult> ChangeCount([FromHeader(Name = "Authorization")] string header, [FromBody] ProductViewModel product)
        {
            if (product != null)
            {
                var user = await DBContext.FindUserByToken(header);

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

            return BadRequest("There is no such product in the cart");
        }
    }
}
