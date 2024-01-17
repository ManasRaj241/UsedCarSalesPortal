using System.Net.Http.Headers;

namespace UCSP.Services.CartAPI
{
    public class PassingToken : DelegatingHandler
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PassingToken(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            string token = _httpContextAccessor.HttpContext.Request.Headers["token"];
            var repToken = token.Split(" ");

            if (!string.IsNullOrEmpty(token))
            {
                var authenticationHeaderValue = new AuthenticationHeaderValue("Bearer", repToken[1]);
                request.Headers.Authorization = authenticationHeaderValue;
            }

            return await base.SendAsync(request, cancellationToken);
        }
    }
}