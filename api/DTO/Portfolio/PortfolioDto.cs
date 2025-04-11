using api.DTO.Coin;
using api.Service;
namespace api.DTO.Portfolio
{
    public class PortfolioDto
    {
        public List<CoinAndBalanceDto> Coins { get; set; }
        public decimal TotalValue { get; set; }

    }
}