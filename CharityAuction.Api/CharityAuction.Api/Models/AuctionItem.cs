using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Mapster;

namespace CharityAuction.Api.Models
{
    public class AuctionItem
    {
        [AdaptIgnore(MemberSide.Destination)]
        [Key]
        public virtual int Id { get; set; }

        [MaxLength(32)]
        public virtual string LotNumber { get; set; }

        [AdaptIgnore(MemberSide.Destination)]
        public virtual int AuctionId { get; set; }
        [ForeignKey(nameof(AuctionId))]
        [AdaptIgnore(MemberSide.Destination)]
        public virtual Auction Auction { get; set; }

        [MaxLength(255)]
        public virtual string Title { get; set; }

        [MaxLength(2048)]
        public virtual string Description { get; set; }

        public virtual ICollection<AuctionItemImage>? Images { get; set; }
        [NotMapped]
        public virtual int[] ImageIds => Images != null ? Images.Select(x => x.ImageId).ToArray() : new int[0];

        public virtual decimal StartPrice { get; set; }
        public virtual decimal ReservePrice { get; set; }
        public virtual bool Paid { get; set; }

        [AdaptIgnore]
        public virtual ICollection<AuctionItemBid>? Bids { get; set; }

        [NotMapped]
        public bool BiddingActive =>  Auction != null ? Auction.BiddingActive : false;

        [NotMapped]
        public AuctionItemBid? TopBid => Bids == null ? null : Bids.OrderByDescending(x => x.BidAmount).FirstOrDefault();

        [NotMapped]
        public DateTime? StartDate => Auction?.StartDate;
        [NotMapped]
        public DateTime? EndDate => Auction?.EndDate;
        [NotMapped]
        public decimal NextBidAmount
        {
            get
            {
                var top = this.TopBid;
                if (top == null)
                    return StartPrice;
                else
                    return top.BidAmount + 1M;

            }
        }

        public bool UserIsLeading(User user)
        {
            return this.TopBid?.UserId == user.Id;
        }
        public bool UserHasBid(User user)
        {
            if (Bids == null) return false;
            return this.Bids.Any(x => x.UserId == user.Id);
        }

       

    }
}
