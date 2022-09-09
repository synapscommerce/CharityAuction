using CharityAuction.Api.DTOs;
using CharityAuction.Api.Models;
using CharityAuction.Api.Providers;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace CharityAuction.Api.Controllers
{
    [ApiController]
    [Route("images")]

    public class ImageController : Controller
    {
        private CharityAuctionContext db;
        private UserProvider userProvider;
        public ImageController(CharityAuctionContext db, UserProvider user)
        {
            this.db = db;
            userProvider = user;
        }

        [HttpPost]
        [Route("")]
        [DisableRequestSizeLimit]
        public ActionResult<ImageInfo> AddImage([FromBody]ImageUploadRequest request)
        {
            Image i = new Image() { FileBytes = request.FileBytes.Select(x => (byte)x).ToArray(), FileName = request.FileName, FileLength = request.FileBytes.Length };
            db.Images.Add(i);
            db.SaveChanges();

            return new ImageInfo() {  FileName = i.FileName, Id = i.Id };
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult GetImageBytes(int id)
        {
            Image i = db.Images.Find(id);
            if (i == null)
                return new NotFoundResult();

            return File(i.FileBytes, "image/jpeg"); 
        }


    }
}
