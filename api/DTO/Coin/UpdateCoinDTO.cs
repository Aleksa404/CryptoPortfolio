using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Coin
{
    public class UpdateCoinDTO
    {
        [Required]
        [MaxLength(20, ErrorMessage ="Coin name max lenght is 20 chars")]
        public string CoinName { get; set; }=string.Empty;
        [Required]
        [MaxLength(10, ErrorMessage ="Symbol max lenght is 10 chars")]
        public string Symbol { get; set; } =string.Empty;
        [Required]
        [Range(0.000001, 1000000000)]
        public decimal Price { get; set; }
        [Required]
        [Range(1, 1000000000)]
        public long MarketCap {get; set;}

    }
}