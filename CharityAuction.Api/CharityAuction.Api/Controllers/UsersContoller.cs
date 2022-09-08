using CharityAuction.Api.DTOs;
using CharityAuction.Api.Errors;
using CharityAuction.Api.Models;
using CharityAuction.Api.Providers;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace CharityAuction.Api.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : Controller
    {
        private CharityAuctionContext db;
        private AdminUserProvider adminUserProvider;
        public UsersController(CharityAuctionContext db, AdminUserProvider adminUser)
        {
            this.db = db;
            adminUserProvider = adminUser;
        }


        [HttpGet]
        [Route("users")]
        public ActionResult<User[]> GetUsers()
        {
            return db.Users.ToArray();
        }

        [HttpGet]
        [Route("users/{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = db.Users.Find(id);
            if (user == null)
                return new NotFoundResult();
            return user;
        }

        [HttpPost]
        [Route("users")]
        public ActionResult<User> AddUser(User user)
        {
            if (db.Users.Where(x => x.BidderNumber == user.BidderNumber).FirstOrDefault() != null)
                return new BadRequestWithMessageResult("Bidder Number already in use");

            db.Users.Add(user);
            db.SaveChanges();
            return user;
        }

        [HttpPut]
        [Route("users/{id}")]
        public ActionResult<User> UpdateUser(int id, User user)
        {
            var existing = db.Users.Find(id);
            if (existing == null)
                return new NotFoundResult();
            user.Adapt(existing);
            db.SaveChanges();
            return existing;
        }

        [HttpGet]
        [Route("users/{id}/wonitems")]
        public ActionResult<BiddableItemResponse[]> GetUserWonItems(int id)
        {
            var user = db.Users.Find(id);
            if (user == null)
                return new NotFoundResult();


            var wonItems = db.AuctionItems.Where(x => x.Auction.EndDate < DateTime.Now && x.Bids.OrderByDescending(x => x.BidAmount).FirstOrDefault().UserId == user.Id).ToArray();


            return wonItems.Select(x => new BiddableItemResponse(x, user)).ToArray();
        }
    }
}
