using CharityAuction.Api.Models;

namespace CharityAuction.Api.Providers
{
    public class UserProvider
    {
        public User User { get; set; }
        public UserToken UserToken { get; set; }

        public UserProvider(CharityAuctionContext db, IHttpContextAccessor httpContextAccessor)
        {
            string? providedToken = httpContextAccessor.HttpContext?.Request?.Headers["authorization"];
            if (string.IsNullOrEmpty(providedToken))
                throw new UnauthorizedAccessException();

            var storedToken = db.UserTokens.Find(Guid.Parse(providedToken.Replace("Bearer ", "")));
            if(storedToken == null)
                throw new UnauthorizedAccessException();

            User = storedToken.User;
            UserToken = storedToken;

        }
    }
}
