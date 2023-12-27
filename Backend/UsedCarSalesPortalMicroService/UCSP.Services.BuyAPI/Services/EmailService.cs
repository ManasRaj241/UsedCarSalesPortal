using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using System.Text;
using UCSP.Services.BuyAPI.Data;
using UCSP.Services.BuyAPI.Models;
using UCSP.Services.BuyAPI.Models.Dto;

namespace UCSP.Services.BuyAPI.Services
{
    public class EmailService : IEmailService
    {
        private DbContextOptions<AppDbContext> _dbOptions;

        public EmailService(DbContextOptions<AppDbContext> dbOptions)
        {
            this._dbOptions = dbOptions;
        }

        public async Task EmailCartAndLog(CartDto cartDto)
        {
            StringBuilder message = new StringBuilder();

            message.AppendLine("<br/> Buy Vehicle Requested");
            message.AppendLine("<br/>Total "+cartDto.CartHeader.CartTotal);
            message.AppendLine("<br/>");
            message.AppendLine("<ul>");
            foreach(var item in cartDto.CartDetails)
            {
                message.Append("<li>");
                message.Append(item.Vehicle.VehicleName + " x "+ item.Count);
                message.Append("</li>");
            }
            message.AppendLine("</ul>");

            await LogAndEmail(message.ToString());
        }

        private async Task<bool> LogAndEmail(string message)
        {
            try
            {
                BuyLogger buyLog = new()
                {
                    OrderSent = DateTime.Now,
                    Message = message
                };

                await using var _db = new AppDbContext(_dbOptions);
                await _db.BuyLoggers.AddAsync(buyLog);
                await _db.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
