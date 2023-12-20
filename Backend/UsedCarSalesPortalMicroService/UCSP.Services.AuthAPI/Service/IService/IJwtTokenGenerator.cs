using Microsoft.AspNetCore.Identity;

namespace UCSP.Services.AuthAPI.Service.IService
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(IdentityUser identityUser, IEnumerable<string> roles);
    }
}
