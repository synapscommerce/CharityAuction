using Microsoft.EntityFrameworkCore;

namespace CharityAuction.Api.Models
{
    public class CharityAuctionContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public CharityAuctionContext(DbContextOptions<CharityAuctionContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<AuctionItem> AuctionItems { get; set; }
        public DbSet<AuctionItemBid> AuctionItemBids { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
