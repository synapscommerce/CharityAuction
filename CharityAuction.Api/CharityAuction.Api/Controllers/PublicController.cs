using CharityAuction.Api.DTOs;
using CharityAuction.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CharityAuction.Api.Controllers
{
    [ApiController]
    [Route("public")]
    public class PublicController : Controller
    {
        private CharityAuctionContext db;
        public PublicController(CharityAuctionContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [Route("images/{id}")]
        public ActionResult GetImageBytes(int id)
        {
            Image i = db.Images.Find(id);
            if (i == null)
                return new NotFoundResult();

            return File(i.FileBytes, "image/jpeg");
        }

        [HttpGet]
        [Route("images/currentauction")]
        public ActionResult GetCurrentAuctionImageBytes(int id)
        {
            var auction = db.Auctions.Where(x => x.StartDate <= DateTime.UtcNow).OrderByDescending(x => x.StartDate).FirstOrDefault();
            if (auction == null || auction.LogoImageId == null) return new NotFoundResult();
            Image i = db.Images.Find(auction.LogoImageId.Value);
            if (i == null)
                return new NotFoundResult();

            return File(i.FileBytes, "image/jpeg");
        }


        [HttpGet]
        [Route("currentitems")]
        public ActionResult<BiddableItemResponse[]> GetCurrentAuctionItems()
        {
            User dummyUser = new User();
            BiddableItemResponse[] items = db.AuctionItems.Where(x => x.Auction.StartDate <= DateTime.UtcNow && x.Auction.EndDate >= DateTime.UtcNow).ToArray().Select(x => new BiddableItemResponse(x, dummyUser)).ToArray();

            items = items.OrderByDescending(x => x.YouAreLeading).ThenByDescending(x => x.YouAreOutbid).ThenBy(x => x.LotNumber).ToArray();
            return items;
        }
    }
}
