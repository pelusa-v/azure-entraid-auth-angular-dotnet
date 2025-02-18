using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClientApp", builder =>
    {
        builder.WithOrigins("http://localhost:4200") // Specify the allowed origin (Angular app)
               .AllowAnyHeader() // Allow any headers like Authorization
               .AllowAnyMethod() // Allow any HTTP methods (GET, POST, etc.)
               .AllowCredentials(); // Allow credentials (cookies, authorization headers)
    });
});


builder.Services.AddOpenApi();
builder.Services.AddControllers();

// Add microsoft entra ID authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration, "AzureAd");

// Add microsoft entra ID authorization (policy based authorization)
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ItemsRead", policy =>
    {
        policy.RequireScope("Items.Read");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowClientApp");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();