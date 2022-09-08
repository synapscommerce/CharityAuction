using Mapster;
using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class User
    {
        [AdaptIgnore]
        [Key]
        public virtual int Id { get; set; }
        [MaxLength(255)]
        public virtual string FirstName { get; set; }
        [MaxLength(255)]
        public virtual string LastName { get; set; }

        [MaxLength(6)]
        public virtual string BidderNumber { get; set; }

        [MaxLength(6)]
        internal virtual string? PinCode { get; set; }

        public virtual bool IsAdmin { get; set; }

        internal virtual ICollection<UserToken> Tokens { get; set; }
  }
}
