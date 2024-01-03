using shopCO.Models;
using Microsoft.AspNetCore.Mvc;

namespace shopCO.Controllers
{
    public class Clothes : Controller
    {
        List<Cloth> _clothes = new List<Cloth>()
        {
            new Cloth {},
            new Cloth {},
            new Cloth {},
            new Cloth {},
            new Cloth {},
        };

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("clothes")]
        public string GetClothes()
        {
            return "test";
        }

    }
}
