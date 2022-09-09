namespace CharityAuction.Api.DTOs
{
    public class AuctionResponse
    {
        public virtual int Id { get; set; }

        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime StartDate { get; set; }
        public virtual DateTime EndDate { get; set; }
        public virtual int? LogoImageId { get; set; }

        public bool BiddingActive { get; set; }

        public virtual int ItemCount { get; set; }
    }
}
