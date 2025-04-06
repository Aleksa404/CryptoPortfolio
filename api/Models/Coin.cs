using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Coins")]
    public class Coin
    {
        public int Id { get; set; }
        public string CoinName { get; set; } = string.Empty;
        public string Symbol { get; set; } = string.Empty;
        public decimal Price { get; set; }

        public decimal MarketCap { get; set; }


        public List<Comment> Comments { get; set; } = new List<Comment>();

        public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    }
}