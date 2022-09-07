using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharityAuction.Api.Models
{
    public class AuctionItemImage
    {
        [Key]
        public int Id { get; set; }

        public int AuctionId { get; set; }
        [ForeignKey(nameof(AuctionId))]
        public AuctionItem AuctionItem { get; set; }

        public int ImageId { get; set; }
        [ForeignKey(nameof(ImageId))]
        public Image Image { get; set; }
        public int Index { get; set; }
    }
}
