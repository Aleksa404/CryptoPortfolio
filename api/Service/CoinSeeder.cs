using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class CoinSeeder
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public CoinSeeder(AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        public async Task SeedCoinsAsync()
        {
            if (_context.Coins.Any()) return;

            var client = _httpClientFactory.CreateClient();
            var res = await client.GetStringAsync("https://api.coingecko.com/api/v3/coins/list");
            var coins = JsonConvert.DeserializeObject<List<CoinDto>>(res);

            var entities = coins.Select(c => new Coin
            {
                CoinName = c.name,
                Symbol = c.symbol,

            });

            _context.Coins.AddRange(entities);
            await _context.SaveChangesAsync();
        }

        private class CoinDto
        {
            public string id { get; set; }
            public string symbol { get; set; }
            public string name { get; set; }
        }

    }
}