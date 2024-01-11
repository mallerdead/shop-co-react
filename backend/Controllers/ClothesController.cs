using shopCO.Data;
using Microsoft.AspNetCore.Mvc;

namespace shopCO.Controllers
{
    public class ClothesController : Controller
    {
        private readonly AppDbContext DBContext;

        public ClothesController(AppDbContext DBContext) => this.DBContext = DBContext;

        [HttpGet, Route("clothes")]
        public async Task<IActionResult> GetClothes()
        {
            var clothesList = await DBContext.GetClothList();
            if (clothesList != null)
            {
                return Ok(clothesList);
            }
            return NotFound();
        }

        [HttpGet, Route("clothes/{id}")]
        public async Task<IActionResult> GetClothesById(int id)
        {
            var cloth = await DBContext.FindClothById(id);

            if (cloth != null)
            {
                return Ok(cloth);
            }

            return NotFound();
        }
    }
}
