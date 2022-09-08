using CharityAuction.Api.Models;
using Mapster;

namespace CharityAuction.Api.DTOs
{
    public class BiddableItemResponse
    {
        public BiddableItemResponse(AuctionItem auctionItem, User currentUser)
        {
            auctionItem.Adapt(this);
            this.YouAreLeading = auctionItem.UserIsLeading(currentUser);
            this.YouAreOutbid = auctionItem.UserHasBid(currentUser) && !this.YouAreLeading;

        }


        public virtual int Id { get; set; }

        public virtual string LotNumber { get; set; }

        public virtual int AuctionId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public virtual string Title { get; set; }

        public virtual string Description { get; set; }

        public virtual int[] ImageIds { get; set; }

        public virtual decimal StartPrice { get; set; }
        public virtual decimal ReservePrice { get; set; }

        public bool BiddingActive { get; set; }

        public  decimal? TopBidBidAmount { get; set; }
        public string TopBidUserBidderNumber { get; set; }

        public bool YouAreLeading { get; set; }
        public bool YouAreOutbid { get; set; }

    }
}
