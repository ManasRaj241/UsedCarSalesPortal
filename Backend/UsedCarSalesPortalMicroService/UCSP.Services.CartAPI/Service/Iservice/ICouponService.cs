using UCSP.Services.CartAPI.Models.Dto;

namespace UCSP.Services.CartAPI.Service.Iservice
{
    public interface ICouponService
    {
        Task<CouponDto>GetCoupon(string couponCode);
    }
}
