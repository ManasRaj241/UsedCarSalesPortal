using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UCSP.Services.BuyAPI.Models.Dto
{
    public class VehicleStatus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? StatusName { get; set; }

        [Required]
        [StringLength(250)]
        public string? StatusDescription { get; set; }
    }
}
