using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Alert
{
    public class AlertDto
    {
        public string UserId { get; set; }
        public string CoinId { get; set; }
        public decimal TargetPrice { get; set; }
        public string Email { get; set; }
    }
}