using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly AppDbContext _context;
        public PortfolioRepository(AppDbContext context)
        {
            _context=context;
        }

        public async Task<Portfolio> CreatePortfolio(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio> DeletePortfolio(AppUser appUser, string symbol)
        {
            var portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id && x.Coin.Symbol.ToLower() == symbol.ToLower());
            if(portfolioModel == null)
                return null;

            _context.Portfolios.Remove(portfolioModel);
            await _context.SaveChangesAsync();
            return portfolioModel;
        }

        public async Task<List<Coin>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolios.Where(u=> u.AppUserId == user.Id)
            .Select(coin => new Coin
            {
                Id=coin.CoinId,
                Symbol=coin.Coin.Symbol,
                CoinName=coin.Coin.CoinName,
                Price=coin.Coin.Price,
                MarketCap=coin.Coin.MarketCap
            }).ToListAsync();
        }
    
        
    }
}