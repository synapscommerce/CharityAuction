using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class AuctionItem
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public ICollection<AuctionItemImage> Images { get; set; }

        public decimal StartPrice { get; set; }
        public decimal ReservePrice { get; set; }

        public ICollection<AuctionItemBid> Bids { get; set; }

    }
}
