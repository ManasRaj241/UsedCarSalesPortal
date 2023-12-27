using UCSP.Services.CartAPI.Models.Dto;

namespace UCSP.Services.CartAPI.Service.Iservice
{
    public interface IProductService
    {
        Task<IEnumerable<VehicleDto>> GetProducts();
    }
}
