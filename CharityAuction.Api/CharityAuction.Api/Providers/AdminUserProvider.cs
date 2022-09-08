using CharityAuction.Api.Models;

namespace CharityAuction.Api.Providers
{
    public class AdminUserProvider
    {
        public User User { get; set; }
        public UserToken UserToken { get; set; }

        public AdminUserProvider(CharityAuctionContext db, IHttpContextAccessor httpContextAccessor)
        {
            string? providedToken = httpContextAccessor.HttpContext?.Request?.Headers["authorization"];
            if (string.IsNullOrEmpty(providedToken))
                throw new UnauthorizedAccessException();

            var storedToken = db.UserTokens.Find(Guid.Parse(providedToken.Replace("Bearer ", "")));
            if(storedToken == null)
                throw new UnauthorizedAccessException();

            if(storedToken.User.IsAdmin != true)
                throw new UnauthorizedAccessException();

            User = storedToken.User;
            UserToken = storedToken;

        }
    }
}
