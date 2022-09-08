using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class Image
    {
        [Key]
        public virtual int Id { get; set; }
        [MaxLength(255)]
        public virtual string FileName { get; set; }
        public virtual byte[] FileBytes { get; set; }
        public virtual int FileLength { get; set; }
    }
}
