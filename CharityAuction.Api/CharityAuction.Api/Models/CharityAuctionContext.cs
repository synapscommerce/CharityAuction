using Microsoft.EntityFrameworkCore;
using NLog;

namespace CharityAuction.Api.Models
{
    public class CharityAuctionContext : Microsoft.EntityFrameworkCore.DbContext
    {
        private static Logger logger = LogManager.GetCurrentClassLogger();
        public CharityAuctionContext(DbContextOptions<CharityAuctionContext> options) : base(options)
        {
            logger.Info("Ensuring DB tables are created");
            try
            {
                Database.EnsureCreated();
            }
            catch (Exception ex)
            {
                logger.Error(ex, "Error ensuring DB tables are created");
            }
        }
        public DbSet<User> Users { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<AuctionItem> AuctionItems { get; set; }
        public DbSet<AuctionItemBid> AuctionItemBids { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
