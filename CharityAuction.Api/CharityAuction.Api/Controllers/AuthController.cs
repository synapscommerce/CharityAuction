using CharityAuction.Api.DTOs;
using CharityAuction.Api.Errors;
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
            return new LoginPreCheckResponse() { BidderNumberExists = user != null, HasPin = !string.IsNullOrEmpty(user?.PinCode) };
        }

        [HttpPost]
        [Route("login")]
        public ActionResult<LoginResponse> Login(LoginRequest request)
        {
            var user = db.Users.Where(x => x.BidderNumber == request.BidderNumber).FirstOrDefault();
            if (user == null)
                return new BadRequestWithMessageResult("User not found");
            if(string.IsNullOrEmpty(user.PinCode))
            {//first time setup - if pin is not set then set it to what the user submitted 
                user.PinCode = request.PinCode.Trim();
            }
            else
            {
                if (user.PinCode != request.PinCode)
                    return new BadRequestWithMessageResult("Incorrect PIN");
            }
            

            UserToken newToken = new UserToken() { DateCreated = DateTime.UtcNow, Key = Guid.NewGuid(), User = user };
            db.UserTokens.Add(newToken);
            db.SaveChanges();   

            return new LoginResponse() {  IsAdmin = user.IsAdmin, Token = newToken.Key.ToString(), FirstName = user.FirstName, LastName = user.LastName };

        }
    }
}
