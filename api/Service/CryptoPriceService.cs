using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace api.Service
{
    public class CryptoPriceService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _memoryCache;

        private readonly string _apiKey;
        public CryptoPriceService(HttpClient httpClient, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _memoryCache = memoryCache;
            _apiKey = configuration["CoinGecko:ApiKey"];
            _httpClient.DefaultRequestHeaders.Add("x-cg-demo-api-key", _apiKey);
        }


        public async Task<decimal> GetCryptoPriceAsync(string cryptoSymbol)
        {

            if (_memoryCache.TryGetValue(cryptoSymbol, out decimal cachedPrice))
            {
                return cachedPrice;
            }
            try
            {
                // _httpClient.DefaultRequestHeaders.Add("x-cg-pro-api-key", _apiKey);
                var response = await _httpClient.GetStringAsync($"https://api.coingecko.com/api/v3/simple/price?ids={cryptoSymbol}&vs_currencies=usd");
                var priceData = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, decimal>>>(response);
                if (priceData is null || !priceData.ContainsKey(cryptoSymbol) || !priceData[cryptoSymbol].ContainsKey("usd"))
                {
                    return -1;
                }
                _memoryCache.Set(cryptoSymbol, priceData[cryptoSymbol]["usd"], TimeSpan.FromMinutes(5));

                return priceData[cryptoSymbol]["usd"];

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error fetching crypto price: " + ex.Message);
                return -1;
            }


            // return priceData != null && priceData.ContainsKey(cryptoSymbol) && priceData[cryptoSymbol].ContainsKey("usd")
            //     ? priceData[cryptoSymbol]["usd"]
            //     : 0;
        }

        public async Task<List<CoinMarketDto>> GetAllCoins(int page, string search)
        {
            if (string.IsNullOrWhiteSpace(search))
            {
                if (_memoryCache.TryGetValue($"AllCoins_page_{page}_search_{search}", out List<CoinMarketDto> allCoins))
                {
                    return allCoins;
                }
            }

            try
            {
                var url = $"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page={page}";

                if (!string.IsNullOrWhiteSpace(search))
                    url += $"&ids={search.ToLower()}";
                // else
                //     url = $"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page={page}";

                var res = await _httpClient.GetStringAsync(url);
                var coins = JsonConvert.DeserializeObject<List<CoinMarketDto>>(res);

                _memoryCache.Set($"AllCoins_page_{page}_search_{search}", coins, TimeSpan.FromMinutes(5));

                return coins;
            }

            // var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=2";
            // var response = await _httpClient.GetStringAsync(url);

            // if (response == null)
            // {
            //     return new List<CoinMarketDto>();
            // }

            // var coins = JsonConvert.DeserializeObject<List<CoinMarketDto>>(response);

            // return coins;

            catch (Exception ex)
            {
                Console.WriteLine("Error fetching all coins: " + ex.Message);
                return new List<CoinMarketDto>();
            }



        }


    }

    public class CoinMarketDto
    {
        public string Id { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public decimal Current_price { get; set; }
        public decimal Market_cap { get; set; }
    }

}
