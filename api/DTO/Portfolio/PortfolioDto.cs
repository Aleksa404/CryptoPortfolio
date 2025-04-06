using api.DTO.Coin;
namespace api.DTO.Portfolio
{
    public class PortfolioDto
    {
        public List<CoinAndBalanceDto> Coins { get; set; }
        public decimal TotalValue { get; set; }
    }
}