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
            var token = _httpContextAccessor.HttpContext.Request.Cookies["token"];
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbWVlckBnbWFpbC5jb20iLCJzdWIiOiI5NGFjMmU0Yy01MzBmLTRlMDgtODk3Yy05Yjk5NDY2Y2I4MjUiLCJuYW1lIjoiU2FtZWVyIiwicm9sZSI6IlVTRVIiLCJuYmYiOjE3MDU0MDAzNzcsImV4cCI6MTcwNjAwNTE3NywiaWF0IjoxNzA1NDAwMzc3LCJpc3MiOiJ1Y3NwLWF1dGgtYXBpIiwiYXVkIjoidWNzcC1jbGllbnQifQ.unimyRSNkfrwhGcNAQktGUJUQOjODDY_HoNs2AdNv-Q";


            if (!string.IsNullOrEmpty(token))
            {
                var authenticationHeaderValue = new AuthenticationHeaderValue("Bearer", token);
                request.Headers.Authorization = authenticationHeaderValue;
            }

            return await base.SendAsync(request, cancellationToken);
        }
    }
}