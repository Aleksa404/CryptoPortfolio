using api.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace api.Service
{
    public class CoinService : ICoinService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _memoryCache;

        private readonly string _apiKey;
        public CoinService(HttpClient httpClient, IMemoryCache memoryCache, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _memoryCache = memoryCache;
            _apiKey = configuration["CoinGecko:ApiKey"];
            _httpClient.DefaultRequestHeaders.Add("x-cg-demo-api-key", _apiKey);
        }
        public async Task<List<CoinPriceDto>> GetBatchPrices(List<string> coinIds)
        {
            var url = $"https://api.coingecko.com/api/v3/simple/price?ids={string.Join(",", coinIds)}&vs_currencies=usd";
            var response = await _httpClient.GetStringAsync(url);
            var prices = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, decimal>>>(response);
            if (prices == null || prices.Count == 0)
            {
                return new List<CoinPriceDto>();
            }
            return prices.Select(p => new CoinPriceDto
            {
                Id = p.Key,
                Price = p.Value["usd"]
            }).ToList();
        }


        public async Task<decimal> GetCryptoPriceAsync(string cryptoName)
        {

            if (_memoryCache.TryGetValue(cryptoName, out decimal cachedPrice))
            {
                return cachedPrice;
            }
            try
            {
                // _httpClient.DefaultRequestHeaders.Add("x-cg-pro-api-key", _apiKey);
                var response = await _httpClient.GetStringAsync($"https://api.coingecko.com/api/v3/simple/price?ids={cryptoName}&vs_currencies=usd");
                var priceData = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, decimal>>>(response);
                if (priceData is null || !priceData.ContainsKey(cryptoName) || !priceData[cryptoName].ContainsKey("usd"))
                {
                    return -1;
                }
                _memoryCache.Set(cryptoName, priceData[cryptoName]["usd"], TimeSpan.FromMinutes(5));

                return priceData[cryptoName]["usd"];

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

                var res = await _httpClient.GetStringAsync(url);
                var coins = JsonConvert.DeserializeObject<List<CoinMarketDto>>(res);

                _memoryCache.Set($"AllCoins_page_{page}_search_{search}", coins, TimeSpan.FromMinutes(5));

                return coins;
            }



            catch (Exception ex)
            {
                Console.WriteLine("Error fetching all coins: " + ex.Message);
                return new List<CoinMarketDto>();
            }



        }

        public async Task<CoinProfileDto> GetCoinByIdAsync(string id)
        {
            var response = await _httpClient.GetAsync($"https://api.coingecko.com/api/v3/coins/{id.ToLower()}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false");

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var json = await response.Content.ReadAsStringAsync();
            dynamic coinData = Newtonsoft.Json.JsonConvert.DeserializeObject(json);

            return new CoinProfileDto
            {
                Id = coinData.id,
                Name = coinData.name,
                Symbol = coinData.symbol,
                Description = coinData.description.en,
                Current_price = coinData.market_data.current_price.usd,
                Market_cap = coinData.market_data.market_cap.usd,
                Volume24h = coinData.market_data.total_volume.usd,
                High_24h = coinData.market_data.high_24h.usd,
                Low_24h = coinData.market_data.low_24h.usd,
                Image_url = coinData.image.large,
                Total_volume = coinData.market_data.total_volume.usd,
                Price_change_percentage_24h = coinData.market_data.price_change_percentage_24h,

            };
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
    public class CoinProfileDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
        public string Description { get; set; }
        public decimal Current_price { get; set; }
        public decimal Market_cap { get; set; }
        public decimal Volume24h { get; set; }
        public decimal High_24h { get; set; }
        public decimal Low_24h { get; set; }
        public string Image_url { get; set; }
        public string Total_volume { get; set; }
        public string Price_change_percentage_24h { get; set; }
    }
    public class CoinPriceDto
    {
        public string Id { get; set; }
        public decimal Price { get; set; }
    }

}
