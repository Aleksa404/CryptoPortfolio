using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Portfolios")]
    public class Portfolio
    {
        public string AppUserId { get; set; }
        public int CoinId { get; set; }
        public AppUser AppUser { get; set; }
        public Coin Coin { get; set; }
        public decimal NumOfCoins { get; set; }

    }
}