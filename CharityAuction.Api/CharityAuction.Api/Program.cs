using CharityAuction.Api.Models;
using CharityAuction.Api.Providers;
using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
LogManager.Configuration = new NLogLoggingConfiguration(builder.Configuration.GetSection("NLog"));
var logger = LogManager.GetCurrentClassLogger();
logger.Info("Application Starting");

logger.Info("Adding Controllers");
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

logger.Info("Adding Swagger");
builder.Services.AddSwaggerGen();

logger.Info("Adding DbContext Provider");
builder.Services.AddDbContext<CharityAuctionContext>(options =>
        options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("default")));
logger.Info("Adding CORS");
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });
});
builder.Services.AddHttpContextAccessor();
logger.Info("Adding User Providers");
builder.Services.AddScoped<AdminUserProvider>();
builder.Services.AddScoped<UserProvider>();

var app = builder.Build();

// Configure the HTTP request pipeline.
    app.UseSwagger();
    app.UseSwaggerUI();

//app.UseHttpsRedirection();

app.UseAuthorization();
logger.Info("Mapping Controllers");
app.MapControllers();
app.UseCors();

logger.Info("Running App");
app.Run();
