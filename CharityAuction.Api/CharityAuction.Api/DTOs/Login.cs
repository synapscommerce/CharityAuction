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
        public bool HasPin { get; set; }
    }
    public class LoginRequest
    {
        [Required]
        public string BidderNumber { get; set; }
        [Required]
        [MinLength(4)]
        [MaxLength(6)]
        public string PinCode { get; set; }
    }

    public class LoginResponse
    {
        public bool IsAdmin { get; set; }
        public string Token { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
