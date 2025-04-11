using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Coin;
using api.DTO.Portfolio;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly AppDbContext _context;
        private readonly ICoinService _coinService;
        public PortfolioRepository(AppDbContext context, ICoinService coinService)
        {

            {

                _context = context;
                _coinService = coinService;
            }
        }
        public async Task<Portfolio> CreatePortfolio(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }
        public async Task<Portfolio> DeletePortfolio(AppUser appUser, string name)
        {
            var portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id && x.Coin.CoinName.ToLower() == name.ToLower());
            if (portfolioModel == null)
                return null;

            _context.Portfolios.Remove(portfolioModel);
            await _context.SaveChangesAsync();
            return portfolioModel;
        }

        public async Task<Portfolio> DeletePortfolio(AppUser appUser, string name, decimal amount)
        {
            var portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id && x.Coin.CoinName.ToLower() == name.ToLower());
            if (portfolioModel == null)
                return null;


            if (portfolioModel.NumOfCoins == amount)
            {
                _context.Portfolios.Remove(portfolioModel);
                await _context.SaveChangesAsync();
                return portfolioModel;
            }
            if (portfolioModel.NumOfCoins > amount)
            {
                portfolioModel.NumOfCoins -= amount;
                // var currentPrice = await _coinService.GetCryptoPriceAsync(portfolioModel.Coin.CoinName);
                // portfolioModel.Balance = portfolioModel.NumOfCoins * currentPrice;
                await _context.SaveChangesAsync();
                return portfolioModel;
            }
            return null;
        }

        public async Task<PortfolioDto> GetUserPortfolio(AppUser user)
        {
            decimal totalValue = 0;

            var coins = await _context.Portfolios.Where(u => u.AppUserId == user.Id)
            .Select(portf => new CoinAndBalanceDto
            {
                Id = portf.CoinId,
                Symbol = portf.Coin.Symbol,
                CoinName = portf.Coin.CoinName,
                Price = 0,
                MarketCap = portf.Coin.MarketCap,
                NumOfCoins = portf.NumOfCoins,
                Balance = 0
            }).ToListAsync();

            var coinNames = coins.Select(c => c.CoinName).ToList();
            var currentPrices = await _coinService.GetBatchPrices(coinNames);

            coins.ForEach(coin =>
            {

                var price = currentPrices.FirstOrDefault(p => p.Id.ToLower() == coin.CoinName.ToLower())?.Price;
                if (price.HasValue)
                {
                    coin.Price = price.Value;
                    totalValue += coin.NumOfCoins * price.Value;
                    coin.Balance = coin.NumOfCoins * price.Value;
                }
            });


            return new PortfolioDto
            {
                Coins = coins,
                TotalValue = totalValue,

            };


        }
        public async Task<Portfolio> UpdatePortfolio(AppUser appUser, Coin coin, decimal numOfCoins)
        {
            var portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id && x.CoinId == coin.Id);
            if (portfolioModel == null)
                return null;

            //var currentPrice = await _coinService.GetCryptoPriceAsync(coin.CoinName);
            portfolioModel.NumOfCoins += numOfCoins;
            //portfolioModel.Balance = portfolioModel.NumOfCoins * currentPrice;
            await _context.SaveChangesAsync();
            return portfolioModel;
        }


    }
}