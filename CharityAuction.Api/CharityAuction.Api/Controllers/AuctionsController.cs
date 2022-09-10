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
        public ActionResult<AuctionResponse[]> GetAuctions()
        {
            return db.Auctions.Adapt<AuctionResponse[]>();
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<AuctionResponse> GetAuction(int id)
        {
            var auction = db.Auctions.Find(id);
            if (auction == null)
                return new NotFoundResult();
            return auction.Adapt<AuctionResponse>();
        }

        [HttpPost]
        [Route("")]
        public ActionResult<AuctionResponse> AddAuction(EditAuctionRequest request)
        {
            //request.StartDate = DateTime.SpecifyKind(request.StartDate, DateTimeKind.Local).ToUniversalTime();
            //request.EndDate = DateTime.SpecifyKind(request.EndDate, DateTimeKind.Local).ToUniversalTime();
            Auction auction = request.Adapt<Auction>();
            db.Auctions.Add(auction);
            db.SaveChanges();
            return auction.Adapt<AuctionResponse>();
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<AuctionResponse> UpdateAuction(int id, EditAuctionRequest request)
        {
            var existing = db.Auctions.Find(id);
            if (existing == null)
                return new NotFoundResult();
            //request.StartDate = DateTime.SpecifyKind(request.StartDate, DateTimeKind.Local).ToUniversalTime();
            //request.EndDate = DateTime.SpecifyKind(request.EndDate, DateTimeKind.Local).ToUniversalTime();
            request.Adapt(existing);
            db.SaveChanges();
            return existing.Adapt<AuctionResponse>();
        }

        [HttpGet]
        [Route("{id}/items")]
        public ActionResult<AuctionItemResponse[]> GetAuctionItems(int id)
        {
            var auction = db.Auctions.Find(id);
            if (auction == null)
                return new NotFoundResult();
            return auction.Items.Adapt<AuctionItemResponse[]>();
        }

        [HttpGet]
        [Route("{auctionId}/items/{id}")]
        public ActionResult<AuctionItemResponse> GetAuctionItem(int auctionId, int id)
        {
            var auctionItem = db.AuctionItems.Find(id);
            if (auctionItem == null)
                return new NotFoundResult();
            return auctionItem.Adapt<AuctionItemResponse>();
        }

        [HttpPost]
        [Route("{auctionId}/items")]
        public ActionResult<AuctionItemResponse> AddAuctionItem(int auctionId, EditAuctionItemRequest auctionItem)
        {
            AuctionItem item = auctionItem.Adapt<AuctionItem>();
            item.AuctionId = auctionId;
            db.AuctionItems.Add(item);
            db.SaveChanges();
            return item.Adapt<AuctionItemResponse>();
        }

        [HttpPut]
        [Route("{auctionId}/items/{id}")]
        public ActionResult<AuctionItemResponse> UpdateAuctionItem(int auctionId, int id, EditAuctionItemRequest auctionItem)
        {
            var existing = db.AuctionItems.Find(id);
            if (existing == null)
                return new NotFoundResult();
            if (existing.AuctionId != auctionId)
                return new NotFoundResult();
            auctionItem.Adapt(existing);
            db.SaveChanges();
            return existing.Adapt<AuctionItemResponse>();
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
