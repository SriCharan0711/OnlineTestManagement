/*using Microsoft.Azure.Cosmos;
using ServiceLayer.ServiceLayer;
using OnlineTestRepo.OnlineTestRepo;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IOnlineTestService, OnlineTestService>();
builder.Services.AddScoped<IOnlineTestRepo, OnlineTestRepository>();
var configuration1 = builder.Configuration;

// Add services to the container.
builder.Services.AddSingleton<CosmosClient>((provider) =>
{
    var endpointUri = configuration1["CosmosDbSettings:EndpointUri"];
    var primaryKey = configuration1["CosmosDbSettings:PrimaryKey"];
    var databaseName = configuration1["CosmosDbSettings:DatabaseName"];
    var cosmosClientOptions = new CosmosClientOptions
    {
        ApplicationName = databaseName
    };
    var loggerFactory = LoggerFactory.Create(builder =>
    {
        builder.AddConsole();
    });
    var cosmosClient = new CosmosClient(endpointUri, primaryKey, cosmosClientOptions);
    cosmosClient.ClientOptions.ConnectionMode = ConnectionMode.Direct;
    return cosmosClient;
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();





*/


using Microsoft.Azure.Cosmos;
using ServiceLayer.ServiceLayer;
using OnlineTestRepo.OnlineTestRepo;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IOnlineTestService, OnlineTestService>();
builder.Services.AddScoped<IOnlineTestRepo, OnlineTestRepository>();
builder.Services.AddScoped<IToDoRepository, ToDoRepository>();
builder.Services.AddScoped<IQuizService, QuizService>();
builder.Services.AddScoped<IQuizRepository, QuizRepository>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var configuration1 = builder.Configuration;

// Add services to the container.
builder.Services.AddSingleton<CosmosClient>((provider) =>
{
    var endpointUri = configuration1["CosmosDbSettings:EndpointUri"];
    var primaryKey = configuration1["CosmosDbSettings:PrimaryKey"];
    var databaseName = configuration1["CosmosDbSettings:DatabaseName"];
    var cosmosClientOptions = new CosmosClientOptions
    {
        ApplicationName = databaseName
    };
    var loggerFactory = LoggerFactory.Create(builder =>
    {
        builder.AddConsole();
    });
    var cosmosClient = new CosmosClient(endpointUri, primaryKey, cosmosClientOptions);
    cosmosClient.ClientOptions.ConnectionMode = ConnectionMode.Direct;
    return cosmosClient;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
// Remove the duplicate CORS policy usage
// app.UseCors("AllowSpecificOrigins"); 

app.UseAuthorization();
app.MapControllers();
app.Run();
