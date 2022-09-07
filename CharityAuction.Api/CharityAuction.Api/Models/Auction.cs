using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class Auction
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }
        [MaxLength(2048)]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int LogoImageId { get; set; }
    }
}
