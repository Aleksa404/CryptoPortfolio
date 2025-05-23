using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Coin;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/Coin")]
    [ApiController]
    public class CoinController : ControllerBase
    {

        private readonly ICoinRepository _coinRepo;

        private readonly ICoinService _coinService;
        public CoinController(AppDbContext context, ICoinRepository coinRepo, ICoinService coinService)
        {
            _coinService = coinService;
            _coinRepo = coinRepo;

        }

        //testing endpoint
        [HttpGet("price/{coinId}")]
        [Authorize]
        public async Task<IActionResult> GetPriceFromApi(string coinId)
        {
            try
            {
                var price = await _coinService.GetCryptoPriceAsync(coinId);
                if (price == -1)
                {
                    return NotFound(new { Error = "Coin not found" });
                }
                return Ok(new { Coin = coinId, Price = price });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }
        [HttpGet("coinProfile/{id}")]
        public async Task<IActionResult> GetCoinById(string id)
        {
            var coin = await _coinService.GetCoinByIdAsync(id);
            if (coin == null)
                return NotFound(new { message = "Coin not found" });

            return Ok(coin);
        }
        [HttpGet("all")]
        [Authorize]
        public async Task<IActionResult> GetAllCoinsFromApi([FromQuery] int page = 1, [FromQuery] string search = "")
        {
            var coins = await _coinService.GetAllCoins(page, search);
            return Ok(new { coins = coins, totalPages = 10 });

        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coins = await _coinRepo.GetAllAsync(query);
            var coinDto = coins.Select(s => s.ToCoinDTO()).ToList();

            return Ok(coinDto);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetbyId([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coin = await _coinRepo.GetByIdAsync(id);
            if (coin == null)
            {
                return NotFound();
            }
            return Ok(coin.ToCoinDTO());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCoinDTO coinDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coinModel = coinDto.ToCoinFromCreateDto();

            await _coinRepo.CreateAsync(coinModel);
            return CreatedAtAction(nameof(GetbyId), new { id = coinModel.Id }, coinModel.ToCoinDTO());
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCoinDTO updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coinModel = await _coinRepo.UpdateAsync(id, updateDto);
            if (coinModel == null)
            {
                return NotFound();
            }


            return Ok(coinModel.ToCoinDTO());
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coinModel = await _coinRepo.DeleteAsync(id);
            if (coinModel == null)
            {
                return NotFound();
            }

            return Ok($"{coinModel.CoinName} deleted");
        }
        [HttpGet("symbol/{symbol}")]
        public async Task<IActionResult> GetBySymbol([FromRoute] string symbol)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coin = await _coinRepo.GetBySymbolAsync(symbol);
            if (coin == null)
            {
                return NotFound();
            }
            return Ok(coin.ToCoinDTO());


        }



    }
}