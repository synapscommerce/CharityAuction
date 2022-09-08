using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharityAuction.Api.Models
{
    public class AuctionItemBid
    {
        [Key]
        public virtual int Id { get; set; }

        public virtual int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }
        public virtual int AuctionItemId { get; set; }
        public virtual decimal BidAmount { get; set; }

        public virtual DateTime BidDate { get; set; }
    }
}
