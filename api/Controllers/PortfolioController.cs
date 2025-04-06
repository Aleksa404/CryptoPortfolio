using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ICoinRepository _coinRepo;
        private readonly IPortfolioRepository _portfolioRepo;
        public PortfolioController(UserManager<AppUser> userManager, ICoinRepository coinRepo, IPortfolioRepository portfolioRepo)
        {
            _userManager = userManager;
            _coinRepo = coinRepo;
            _portfolioRepo = portfolioRepo;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> getUserPortfolio()
        {
            var username = User.GetUsernameFromClaim();
            var appUser = await _userManager.FindByNameAsync(username);
            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            return Ok(userPortfolio);
        }
        [HttpPost("addPortfolio")]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string name, decimal numOfCoins)
        {
            var username = User.GetUsernameFromClaim();
            var appUser = await _userManager.FindByNameAsync(username);
            var coin = await _coinRepo.GetByNameAsync(name);

            if (coin == null) return BadRequest("coin not found");

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);
            if (userPortfolio.Coins.Any(e => e.Symbol.ToLower() == name.ToLower()))
            {
                return BadRequest("Coin already added");
            }
            var portfolioModel = new Portfolio
            {
                CoinId = coin.Id,
                AppUserId = appUser.Id,
                NumOfCoins = numOfCoins,
                Balance = coin.Price * numOfCoins
            };
            await _portfolioRepo.CreatePortfolio(portfolioModel);
            if (portfolioModel == null)
                return StatusCode(500, "Failed");
            else
                return Ok("Created");
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            var username = User.GetUsernameFromClaim();
            var appUser = await _userManager.FindByNameAsync(username);

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            var filterdedCoins = userPortfolio.Coins.Where(s => s.Symbol.ToLower() == symbol.ToLower()).ToList();

            if (filterdedCoins.Count == 1)
            {
                await _portfolioRepo.DeletePortfolio(appUser, symbol);
            }
            else
            {
                return BadRequest("Coin not found");
            }
            return Ok("Deleted");
        }

    }


}