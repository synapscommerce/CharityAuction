using System.ComponentModel.DataAnnotations;

namespace CharityAuction.Api.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(255)]
        public string FileName { get; set; }
        public byte[] FileBytes { get; set; }
        public int FileLength { get; set; }
    }
}
