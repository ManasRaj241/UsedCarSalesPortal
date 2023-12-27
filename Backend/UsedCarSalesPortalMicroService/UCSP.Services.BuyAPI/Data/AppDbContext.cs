using Microsoft.EntityFrameworkCore;
using UCSP.Services.BuyAPI.Models;

namespace UCSP.Services.BuyAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<BuyLogger> BuyLoggers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
