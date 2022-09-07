using Microsoft.AspNetCore.Mvc;

namespace CharityAuction.Api.Controllers
{
    public class AuctionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
