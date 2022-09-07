using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class AuctionItemBid
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        public int AuctionItemId { get; set; }
        public decimal BidAmount { get; set; }

        public DateTime BidDate { get; set; }
    }
}
