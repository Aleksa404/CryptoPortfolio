using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Coin;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICoinRepository
    {
        Task<List<Coin>> GetAllAsync(QueryObject query);
        Task<Coin?> GetByIdAsync(int id);
        Task<Coin?> GetBySymbolAsync(string symbol);
        Task<Coin?> GetByNameAsync(string name);
        Task<Coin> CreateAsync(Coin coinModel);
        Task<Coin?> UpdateAsync(int id, UpdateCoinDTO CoinDto);
        Task<Coin?> DeleteAsync(int id);
        Task<bool> CoinExists(string name);
    }
}