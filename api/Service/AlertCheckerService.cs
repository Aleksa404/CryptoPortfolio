using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Service
{
    public class AlertCheckerService : BackgroundService
    {
        private readonly IServiceProvider _services;
        private readonly ILogger<AlertCheckerService> _logger;
        private readonly EmailSenderService _emailService;
        private readonly HttpClient _httpClient = new();

        public AlertCheckerService(IServiceProvider services, EmailSenderService emailService, ILogger<AlertCheckerService> logger)
        {
            _services = services;
            _emailService = emailService;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _services.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                var alerts = await db.PriceAlerts.Where(a => !a.IsTriggered).ToListAsync();

                var coins = alerts.Select(a => a.CoinId).Distinct();
                foreach (var coin in coins)
                {
                    var response = await _httpClient.GetStringAsync($"https://api.coingecko.com/api/v3/simple/price?ids={coin}&vs_currencies=usd");
                    var json = JsonDocument.Parse(response);
                    var price = json.RootElement.GetProperty(coin).GetProperty("usd").GetDecimal();

                    var matches = alerts.Where(a => a.CoinId == coin && price >= a.TargetPrice).ToList();
                    foreach (var alert in matches)
                    {
                        await _emailService.SendAlertEmail(alert.Email, coin, price, alert.TargetPrice);
                        alert.IsTriggered = true;
                    }
                }

                await db.SaveChangesAsync();
                await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
            }
        }
    }
}