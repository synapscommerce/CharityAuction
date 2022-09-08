using CharityAuction.Api.DTOs;
using CharityAuction.Api.Models;
using CharityAuction.Api.Providers;
using Mapster;
using Microsoft.AspNetCore.Mvc;

namespace CharityAuction.Api.Controllers
{
    [ApiController]
    [Route("auctions")]
    public class AuctionsController : Controller
    {
        private CharityAuctionContext db;
        private AdminUserProvider adminUserProvider;
        public AuctionsController(CharityAuctionContext db, AdminUserProvider adminUser)
        {
            this.db = db;
            adminUserProvider = adminUser;
        }


        [HttpGet]
        [Route("")]
        public ActionResult<Auction[]> GetAuctions()
        {
            return db.Auctions.ToArray();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Auction> GetAuction(int id)
        {
            var auction = db.Auctions.Find(id);
            if (auction == null)
                return new NotFoundResult();
            return auction;
        }

        [HttpPost]
        [Route("")]
        public ActionResult<Auction> AddAuction(EditAuctionRequest request)
        {
            Auction auction = request.Adapt<Auction>();
            db.Auctions.Add(auction);
            db.SaveChanges();
            return auction;
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<Auction> UpdateAuction(int id, EditAuctionRequest request)
        {
            var existing = db.Auctions.Find(id);
            if (existing == null)
                return new NotFoundResult();
            request.Adapt(existing);
            db.SaveChanges();
            return existing;
        }

        [HttpGet]
        [Route("{id}/items")]
        public ActionResult<AuctionItem[]> GetAuctionItems(int id)
        {
            var auction = db.Auctions.Find(id);
            if (auction == null)
                return new NotFoundResult();
            return auction.Items.ToArray();
        }

        [HttpGet]
        [Route("{auctionId}/items/{id}")]
        public ActionResult<AuctionItem> GetAuctionItem(int auctionId, int id)
        {
            var auctionItem = db.AuctionItems.Find(id);
            if (auctionItem == null)
                return new NotFoundResult();
            return auctionItem;
        }

        [HttpPost]
        [Route("{auctionId}/items")]
        public ActionResult<AuctionItem> AddAuctionItem(int auctionId, EditAuctionItemRequest auctionItem)
        {
            AuctionItem item = auctionItem.Adapt<AuctionItem>();
            item.AuctionId = auctionId;
            db.AuctionItems.Add(item);
            db.SaveChanges();
            return item;
        }

        [HttpPut]
        [Route("{auctionId}/items/{id}")]
        public ActionResult<AuctionItem> UpdateAuctionItem(int auctionId, int id, EditAuctionItemRequest auctionItem)
        {
            var existing = db.AuctionItems.Find(id);
            if (existing == null)
                return new NotFoundResult();
            if (existing.AuctionId != auctionId)
                return new NotFoundResult();
            auctionItem.Adapt(existing);
            db.SaveChanges();
            return existing;
        }

        [HttpGet]
        [Route("{auctionId}/items/{id}/bids")]
        public ActionResult<AuctionItemBid[]> GetAuctionItemBids(int auctionId, int id)
        {
            var auctionItem = db.AuctionItems.Find(id);
            if (auctionItem == null)
                return new NotFoundResult();
            if (auctionItem.Bids == null)
                return new AuctionItemBid[0];

            return auctionItem.Bids.ToArray();
        }

        [HttpDelete]
        [Route("{auctionId}/items/{id}/bids/")]
        public ActionResult<AuctionItemBid[]> RemoveAuctionItemBid(int auctionId, int auctionItemId, int id)
        {
            var auctionItem = db.AuctionItems.Find(auctionItemId);
            if (auctionItem == null)
                return new NotFoundResult();

            var bid = db.AuctionItemBids.Find(id);
            if (bid == null)
                return new NotFoundResult();

            db.AuctionItemBids.Remove(bid);
            db.SaveChanges();

            return db.AuctionItemBids.Where(x => x.AuctionItemId == auctionItemId).OrderByDescending(x => x.BidAmount).ToArray();
        }


        [HttpPost]
        [Route("{auctionId}/items/{id}/paid")]
        public ActionResult<AuctionItem> SetAuctionItemPaid(int auctionId, int id)
        {
            var existing = db.AuctionItems.Find(id);
            if (existing == null)
                return new NotFoundResult();
            if (existing.AuctionId != auctionId)
                return new NotFoundResult();
            existing.Paid = true;
            db.SaveChanges();
            return existing;
        }

        [HttpDelete]
        [Route("{auctionId}/items/{id}/paid")]
        public ActionResult<AuctionItem> SetAuctionItemUnpaid(int auctionId, int id)
        {
            var existing = db.AuctionItems.Find(id);
            if (existing == null)
                return new NotFoundResult();
            if (existing.AuctionId != auctionId)
                return new NotFoundResult();
            existing.Paid = false;
            db.SaveChanges();
            return existing;
        }
    }
}
