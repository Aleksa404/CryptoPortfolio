using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Service;

namespace api.Interfaces
{
    public interface ICoinService
    {
        Task<decimal> GetCryptoPriceAsync(string cryptoSymbol);
        Task<List<CoinMarketDto>> GetAllCoins(int page, string search);
        Task<CoinProfileDto> GetCoinByIdAsync(string id);
        Task<List<CoinPriceDto>> GetBatchPrices(List<string> coinIds);
    }

}