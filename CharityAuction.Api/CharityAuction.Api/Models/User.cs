using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string BidderNumber { get; set; }

        public string PinCode { get; set; }

        public bool IsAdmin { get; set; }
    }
}
