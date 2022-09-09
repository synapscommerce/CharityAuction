using CharityAuction.Api.Models;

namespace CharityAuction.Api.DTOs
{
    public class AuctionItemResponse
    {
        public virtual int Id { get; set; }

        public virtual string LotNumber { get; set; }

        public virtual int AuctionId { get; set; }
        public virtual Auction Auction { get; set; }

        public virtual string Title { get; set; }

        public virtual string Description { get; set; }

        public virtual int[] ImageIds { get; set; }

        public virtual decimal StartPrice { get; set; }
        public virtual decimal ReservePrice { get; set; }
        public virtual bool Paid { get; set; }

        public bool BiddingActive { get; set; }

        public AuctionItemBid? TopBid { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal NextBidAmount { get; set; }
    }
}
