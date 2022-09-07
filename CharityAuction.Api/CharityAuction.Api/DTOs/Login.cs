using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.DTOs
{
    public class LoginPreCheckRequest
    {
        [Required]
        public string BidderNumber { get; set; }
    }
    public class LoginPreCheckResponse
    {
        public bool BidderNumberExists { get; set; }
    }
    public class LoginRequest
    {
        [Required]
        public string BidderNumber { get; set; }
        [Required]
        public string PinCode { get; set; }
    }

    public class LoginResponse
    {
        public bool IsAdmin { get; set; }
        public string Token { get; set; }
    }
}
