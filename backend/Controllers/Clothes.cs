using Microsoft.AspNetCore.Mvc;

namespace shopCO.Controllers
{
    public class Clothes : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("clothes")]
        public string Get() 
        {
            return "test";
        }
    }
}
