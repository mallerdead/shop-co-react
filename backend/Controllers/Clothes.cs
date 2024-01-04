using shopCO.Models;
using shopCO.DB;
using Microsoft.AspNetCore.Mvc;

namespace shopCO.Controllers
{
    public class Clothes : Controller
    {
        DBContext dbContext = new DBContext();
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("clothes")]
        public IActionResult GetClothes()
        {
            return Ok(dbContext.GetClothList());
        }

        [HttpGet, Route("clothes/{id}")]
        public IActionResult GetClothesById(int id)
        {
            return Ok(dbContext.FindClothById(id));
        }
    }
}
