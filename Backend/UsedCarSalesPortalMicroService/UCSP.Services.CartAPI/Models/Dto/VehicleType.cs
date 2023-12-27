using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UCSP.Services.CartAPI.Models.Dto
{
    public class VehicleType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? TypeName { get; set; }

        [Required]
        [StringLength(250)]
        public string? TypeDescription { get; set; }
    }
}
