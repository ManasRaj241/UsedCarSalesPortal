using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UCSP.Services.BuyAPI.Models.Dto
{
    public class VehicleDto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VehicleId { get; set; }

        public Guid VehicleUniqueId { get; set; }

        [Required]
        [StringLength(50)]
        public string? VehicleName { get; set; }

        [Required]
        public int? VehicleModelId { get; set; }

        [ForeignKey(nameof(VehicleModelId))]
        public virtual VehicleModel? VehicleModel { get; set; }

        [Required]
        public int? VehicleStatusId { get; set; }

        [ForeignKey(nameof(VehicleStatusId))]
        public virtual VehicleStatus? VehicleStatus { get; set; }

        [Required]
        public int? VehicleTypeId { get; set; }

        [ForeignKey(nameof(VehicleTypeId))]
        public virtual VehicleType? VehicleType { get; set; }

        [Required]
        public int? Price { get; set; }

        [Required]
        [StringLength(50)]
        public string? VehicleImage { get; set; }

        [Required]
        [StringLength(50)]
        public String? SellerName;

        [Required]
        public int? DistanceTravelled { get; set; }
    }
}
