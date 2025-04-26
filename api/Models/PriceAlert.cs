using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class PriceAlert
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string CoinId { get; set; }
        public decimal TargetPrice { get; set; }
        public string Email { get; set; }
        public bool IsTriggered { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}