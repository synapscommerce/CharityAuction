namespace CharityAuction.Api.DTOs
{
    public class EditAuctionRequest
    {
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime StartDate { get; set; }
        public virtual DateTime EndDate { get; set; }
        public virtual int? LogoImageId { get; set; }
    }
}
