using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Coin;
using api.Models;

namespace api.Mappers
{
    public static class CoinMapper
    {
        public static CoinDTO ToCoinDTO(this Coin CoinModel)
        {
            return new CoinDTO
            {
                Id=CoinModel.Id,
                CoinName=CoinModel.CoinName,
                Symbol=CoinModel.Symbol,
                Price=CoinModel.Price,

                MarketCap=CoinModel.MarketCap,
                Comments= CoinModel.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }
        public static Coin ToCoinFromCreateDto(this CreateCoinDTO coinDto )
        {
            return new Coin{
                Symbol= coinDto.Symbol,
                CoinName=coinDto.CoinName,
                Price=coinDto.Price,
                MarketCap=coinDto.MarketCap
                
            };
        }
    }
}