using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Cache.CacheManager;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json",optional:false, reloadOnChange: true);
builder.Services.AddOcelot(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3001", "http://localhost:8080", "http://localhost:3000", "http://localhost:3002","http://localhost:3003")
        .AllowAnyHeader()
        .AllowAnyMethod(); ;
    });
});

var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapControllers();
app.UseCors();
await app.UseOcelot();

app.Run();
