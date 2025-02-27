using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Comment;


namespace api.DTO.Coin
{
    public class CoinDTO
    {
        public int Id { get; set; }
        public string CoinName { get; set;} = string.Empty;
        public string Symbol { get; set; } =string.Empty;
        public decimal Price { get; set; }

        public long MarketCap {get; set;}
        public List<CommentDTO>? Comments { get; set;}
    }
}