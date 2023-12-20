using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UCSP.Services.AuthAPI.Data;
using UCSP.Services.AuthAPI.Models;
using UCSP.Services.AuthAPI.Service;
using UCSP.Services.AuthAPI.Service.IService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer
    (builder.Configuration.GetConnectionString("Default"));
});
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("ApiSettings:JwtOptions"));
builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
