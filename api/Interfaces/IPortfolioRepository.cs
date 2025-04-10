using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Coin;
using api.DTO.Portfolio;
using api.Models;

namespace api.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<PortfolioDto> GetUserPortfolio(AppUser user);
        Task<Portfolio> CreatePortfolio(Portfolio portfolio);
        Task<Portfolio> DeletePortfolio(AppUser appUser, string symbol, decimal amount);
        Task<Portfolio> UpdatePortfolio(AppUser appUser, Coin coin, decimal numOfCoins);
    }
}