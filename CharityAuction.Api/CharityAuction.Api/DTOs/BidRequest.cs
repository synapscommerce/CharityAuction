using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.DTOs
{
    public class BidRequest
    {
        [Required]
        public decimal Amount { get; set; }
    }
}
