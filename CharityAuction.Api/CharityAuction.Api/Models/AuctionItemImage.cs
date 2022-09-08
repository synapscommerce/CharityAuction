using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharityAuction.Api.Models
{
    public class AuctionItemImage
    {
        [Key]
        public virtual int Id { get; set; }

        public virtual int AuctionId { get; set; }
        [ForeignKey(nameof(AuctionId))]
        public virtual AuctionItem AuctionItem { get; set; }

        public virtual int ImageId { get; set; }
        [ForeignKey(nameof(ImageId))]
        public virtual Image Image { get; set; }
        public virtual int Index { get; set; }
    }
}
