using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Coin;
using api.Helpers;
using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CoinRepository : ICoinRepository
    {
        private readonly AppDbContext _context;
        private readonly CryptoPriceService _cryptoPriceService;
        public CoinRepository(AppDbContext context, CryptoPriceService cryptoPriceService)
        {
            _cryptoPriceService = cryptoPriceService;
            _context = context;
        }
        public async Task<Coin> CreateAsync(Coin coinModel)
        {
            await _context.Coins.AddAsync(coinModel);
            await _context.SaveChangesAsync();
            return coinModel;
        }
        public async Task<Coin?> DeleteAsync(int id)
        {
            var coinModel = await _context.Coins.FirstOrDefaultAsync(x => x.Id == id);
            if (coinModel == null)
            {
                return null;
            }
            _context.Coins.Remove(coinModel);
            await _context.SaveChangesAsync();
            return coinModel;
        }
        public async Task<List<Coin>> GetAllAsync(QueryObject query)
        {
            var coins = _context.Coins.Include(c => c.Comments).ThenInclude(a => a.AppUser).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.CoinName))
            {
                coins = coins.Where(s => s.CoinName.Equals(query.CoinName));
            }
            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                coins = coins.Where(s => s.Symbol.Equals(query.Symbol));
            }
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    coins = query.IsDecsending ? coins.OrderByDescending(s => s.Symbol) : coins.OrderBy(s => s.Symbol);
                }
                if (query.SortBy.Equals("Price", StringComparison.OrdinalIgnoreCase))
                {
                    coins = query.IsDecsending ? coins.OrderByDescending(p => p.Price) : coins.OrderBy(s => s.Price);
                }
            }
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            return await coins.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }
        public async Task<Coin?> GetByIdAsync(int id)
        {
            return await _context.Coins.Include(c => c.Comments).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Coin> GetBySymbolAsync(string symbol)
        {
            return await _context.Coins.FirstOrDefaultAsync(s => s.Symbol.ToLower() == symbol.ToLower());
        }
        public async Task<Coin> GetByNameAsync(string name)
        {
            return await _context.Coins.FirstOrDefaultAsync(s => s.CoinName.ToLower() == name.ToLower());
        }


        public Task<bool> CoinExists(int id)
        {
            return _context.Coins.AnyAsync(s => s.Id == id);
        }
        public async Task<Coin?> UpdateAsync(int id, UpdateCoinDTO coinDto)
        {
            var existingCoin = await _context.Coins.FirstOrDefaultAsync(x => x.Id == id);

            if (existingCoin == null)
            {
                return null;
            }

            existingCoin.Symbol = coinDto.Symbol;
            existingCoin.CoinName = coinDto.CoinName;
            existingCoin.Price = coinDto.Price;
            existingCoin.MarketCap = coinDto.MarketCap;


            await _context.SaveChangesAsync();
            return existingCoin;
        }


        public async void PopulateDatabase()
        {
            var coinList = await _cryptoPriceService.GetAllCoins(1, null);
            foreach (var coin in coinList)
            {
                var existingCoin = await _context.Coins.FirstOrDefaultAsync(c => c.Symbol == coin.Symbol);
                if (existingCoin == null)
                {
                    var newCoin = new Coin
                    {
                        Symbol = coin.Symbol,
                        CoinName = coin.Name,
                        Price = coin.Current_price,
                        MarketCap = coin.Market_cap
                    };
                    await _context.Coins.AddAsync(newCoin);
                    await _context.SaveChangesAsync();
                }
            }
        }

    }
}