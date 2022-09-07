using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class UserToken
    {
        [Key]
        public Guid Key { get; set; }

        public DateTime DateCreated { get; set; }

    }
}
