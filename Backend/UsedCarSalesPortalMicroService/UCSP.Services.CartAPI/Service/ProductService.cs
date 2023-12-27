using Newtonsoft.Json;
using UCSP.Services.CartAPI.Models.Dto;
using UCSP.Services.CartAPI.Service.Iservice;

namespace UCSP.Services.CartAPI.Service
{
    public class ProductService : IProductService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ProductService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public async Task<IEnumerable<VehicleDto>> GetProducts()
        {
            var client = _httpClientFactory.CreateClient("Product");
            var response = await client.GetAsync($"/api/Vehicles");
            if (response.IsSuccessStatusCode)
            {
                var apiContent = await response.Content.ReadAsStringAsync();
                var vehicles = JsonConvert.DeserializeObject<List<VehicleDto>>(apiContent);
                return vehicles;
            }
            else
            {
                return Enumerable.Empty<VehicleDto>();
            }
        }
    }
}
