using CharityAuction.Api.DTOs;
using CharityAuction.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CharityAuction.Api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private CharityAuctionContext db;
        public AuthController(CharityAuctionContext db)
        {
            this.db = db;   
        }

        [HttpPost]
        [Route("check")]
        public LoginPreCheckResponse Check(LoginPreCheckRequest request)
        {
            var user = db.Users.Where(x => x.BidderNumber == request.BidderNumber).FirstOrDefault();
            return new LoginPreCheckResponse() { BidderNumberExists = user != null };
        }

        [HttpPost]
        [Route("login")]
        public LoginResponse Login(LoginRequest request)
        {
            var user = db.Users.Where(x => x.BidderNumber == request.BidderNumber).FirstOrDefault();
            if (user == null)
                throw new Exception("User Not Found");
            if (user.PinCode != request.PinCode)
                throw new Exception("Incorrect PIN");

            return new LoginResponse();

        }
    }
}
