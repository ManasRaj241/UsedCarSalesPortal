using Microsoft.EntityFrameworkCore;
using Serilog;
using UsedCarSalesPortal.DatabaseContext;
using UsedCarSalesPortal.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer
    (builder.Configuration.GetConnectionString("Default"));
}, ServiceLifetime.Scoped);

builder.Services.AddScoped<VehicleService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000", "http://localhost:8080")
        .AllowAnyHeader()
        .AllowAnyMethod(); ;
    });
});


builder.Host.UseSerilog((HostBuilderContext context, IServiceProvider services, LoggerConfiguration loggerConfiguration) =>
{
    loggerConfiguration.ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services);
});

var app = builder.Build();

app.UseCors();

//app.UseHttpsRedirection();

//app.UseAuthorization();

app.MapControllers();

app.Run();
