using CharityAuction.Api.DTOs;
using CharityAuction.Api.Errors;
using CharityAuction.Api.Models;
using CharityAuction.Api.Providers;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace CharityAuction.Api.Controllers
{
  [ApiController]
    [Route("bidding")]
  public class BiddingController : Controller
  {

        private CharityAuctionContext db;
        private UserProvider userProvider;
        public BiddingController(CharityAuctionContext db, UserProvider user)
        {
            this.db = db;
            userProvider = user;
        }

        [HttpGet]
        [Route("available")]
        public ActionResult<BiddableItemResponse[]> GetBiddableItems()
        {
            BiddableItemResponse[] items = db.AuctionItems.Where(x => x.Auction.StartDate <= DateTime.UtcNow && x.Auction.EndDate >= DateTime.UtcNow).ToArray().Select(x => new BiddableItemResponse(x, userProvider.User)).ToArray();

            items = items.OrderByDescending(x => x.YouAreLeading).ThenByDescending(x => x.YouAreOutbid).ThenBy(x => x.LotNumber).ToArray();

            return items;
            
        }

        [HttpGet]
        [Route("items/{id}")]
        public ActionResult<BiddableItemResponse> GetItem(int id)
        {
            AuctionItem item = db.AuctionItems.Find(id);
            if (item == null)
                return new NotFoundResult();

            return new BiddableItemResponse(item, userProvider.User);
        }


        [HttpPost]
        [Route("items/{id}/bids")]
        public ActionResult<BiddableItemResponse> AddBid(int id, BidRequest request)
        {

            AuctionItem item = db.AuctionItems.Find(id);
            if (item == null)
                return new NotFoundResult();

            if(item.Auction.BiddingActive)
            {
                if(request.Amount < item.NextBidAmount)
                    return new BadRequestWithMessageResult("The minimum bid is currently " + item.NextBidAmount.ToString("C"));

                if(item.TopBid?.UserId == userProvider.User.Id)
                    return new BadRequestWithMessageResult("You already lead the bidding");

                var bid = new AuctionItemBid()
                {
                    BidAmount = request.Amount,
                    BidDate = DateTime.UtcNow,
                    UserId = userProvider.User.Id
                };
                if (item.Bids == null) item.Bids = new List<AuctionItemBid>();
                item.Bids.Add(bid);
                db.SaveChanges();
                return new BiddableItemResponse(item, userProvider.User);
            }
            else
            {
                return new BadRequestWithMessageResult("Sorry, Bidding has closed");
            }


        }
    }
}
