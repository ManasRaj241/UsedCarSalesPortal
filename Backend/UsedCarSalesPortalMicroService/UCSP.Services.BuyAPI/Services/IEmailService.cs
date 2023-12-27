using UCSP.Services.BuyAPI.Models.Dto;

namespace UCSP.Services.BuyAPI.Services
{
    public interface IEmailService
    {
        Task EmailCartAndLog(CartDto cartDto);
    }
}
