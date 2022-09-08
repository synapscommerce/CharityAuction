using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharityAuction.Api.Models
{
    public class UserToken
    {
        [Key]
        public virtual Guid Key { get; set; }

        [Required]
        public virtual int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual User User { get; set; }

        public virtual DateTime DateCreated { get; set; }

    }
}
