namespace CharityAuction.Api.DTOs
{
    public class ImageUploadRequest 
    {
        public string FileName { get; set; }
        public byte[] FileBytes { get; set; }
    }
}
