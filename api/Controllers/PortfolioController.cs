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
        private readonly ICoinService _coinService;
        public PortfolioController(UserManager<AppUser> userManager, ICoinRepository coinRepo, IPortfolioRepository portfolioRepo, ICoinService coinService)
        {

            {
                _userManager = userManager;
                _coinRepo = coinRepo;
                _portfolioRepo = portfolioRepo;
                _coinService = coinService;
            }
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
            if (userPortfolio.Coins.Any(e => e.CoinName.ToLower() == name.ToLower()))
            {
                await _portfolioRepo.UpdatePortfolio(appUser, coin, numOfCoins);

                return Ok("Coin amount updated");
            }
            var currentPrice = await _coinService.GetCryptoPriceAsync(name);
            var portfolioModel = new Portfolio
            {
                CoinId = coin.Id,
                AppUserId = appUser.Id,
                NumOfCoins = numOfCoins,

            };
            await _portfolioRepo.CreatePortfolio(portfolioModel);
            if (portfolioModel == null)
                return StatusCode(500, "Failed");
            else
                return Ok("Created");
        }
        [HttpDelete("DeleteAmountPortfolio")]
        [Authorize]
        public async Task<IActionResult> DeleteAmountPortfolio(string name, decimal amount)
        {
            var username = User.GetUsernameFromClaim();
            var appUser = await _userManager.FindByNameAsync(username);

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            var filterdedCoins = userPortfolio.Coins.Where(s => s.CoinName.ToLower() == name.ToLower()).ToList();

            if (filterdedCoins.Count == 1)
            {
                await _portfolioRepo.DeletePortfolio(appUser, name, amount);
            }
            else
            {
                return BadRequest("Coin not found");
            }
            return Ok("Deleted");
        }
        [HttpDelete("DeleteCoin")]
        [Authorize]
        public async Task<IActionResult> DeleteCoin(string name)
        {
            var username = User.GetUsernameFromClaim();
            var appUser = await _userManager.FindByNameAsync(username);

            var userPortfolio = await _portfolioRepo.GetUserPortfolio(appUser);

            var filterdedCoins = userPortfolio.Coins.Where(s => s.CoinName.ToLower() == name.ToLower()).ToList();

            if (filterdedCoins.Count == 1)
            {
                await _portfolioRepo.DeletePortfolio(appUser, name);
            }
            else
            {
                return BadRequest("Coin not found");
            }
            return Ok("Deleted");
        }

    }


}