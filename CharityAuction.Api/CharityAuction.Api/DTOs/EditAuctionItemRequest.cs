namespace CharityAuction.Api.DTOs
{
    public class EditAuctionItemRequest
    {
        public virtual string LotNumber { get; set; }

        public virtual int AuctionId { get; set; }

        public virtual string Title { get; set; }

        public virtual string Description { get; set; }

        public virtual int[] ImageIds { get; set; }

        public virtual decimal StartPrice { get; set; }
        public virtual decimal ReservePrice { get; set; }
    }
}
