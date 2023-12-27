using AutoMapper;
using UCSP.Services.CartAPI.Models;
using UCSP.Services.CartAPI.Models.Dto;

namespace UCSP.Services.CartAPI
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<CartHeader, CartHeaderDto>()
                    .ForMember(dest => dest.Discount, opt => opt.Ignore()) 
                    .ForMember(dest => dest.CartTotal, opt => opt.Ignore());

                config.CreateMap<CartHeaderDto, CartHeader>()
                    .ForMember(dest => dest.Discount, opt => opt.Ignore())
                    .ForMember(dest => dest.CartTotal, opt => opt.Ignore());

                config.CreateMap<CartDetails, CartDetailsDto>().ReverseMap();
            });

            return mappingConfig;
        }
    }
}
