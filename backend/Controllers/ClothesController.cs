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

        [HttpGet, Route("clothes/top-selling")]
        public async Task<IActionResult> GetTopSelling()
        {
            const int countClothes = 4;

            var topSellingClothes = await DBContext.GetTopSellingClothes(countClothes);

            if (topSellingClothes != null)
            {
                return Ok(topSellingClothes);
            }

            return BadRequest();
        }
        [HttpGet, Route("clothes/new-arrivals")]
        public async Task<IActionResult> GetNewArrivals()
        {
            const int countClothes = 4;

            var topSellingClothes = await DBContext.GetNewArrivalsClothes(countClothes);

            if (topSellingClothes != null)
            {
                return Ok(topSellingClothes);
            }

            return BadRequest();
        }

        [HttpGet, Route("clothes/image/{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            string imagePath = Path.Combine(@"images\clothes\", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);
                string contentType = "image/png";
                return File(imageBytes, contentType);
            }
            return NotFound();
        }
    }
}
