using Microsoft.EntityFrameworkCore;
using UsedCarSalesPortal.Model;

namespace UsedCarSalesPortal.DatabaseContext
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }

        public ApplicationDBContext() { }

        public virtual DbSet<Vehicles> Vehicles { get; set; }
        public virtual DbSet<VehicleStatus> VehicleStatuses { get; set; }
        public virtual DbSet<VehicleModel> VehicleModel { get; set; }
        public virtual DbSet<VehicleType> VehicleTypes { get; set; }

    }
}
