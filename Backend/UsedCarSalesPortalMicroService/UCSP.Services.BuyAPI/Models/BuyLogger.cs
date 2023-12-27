namespace UCSP.Services.BuyAPI.Models
{
    public class BuyLogger
    {
        public int Id {  get; set; }
        public string Message {  get; set; }
        public DateTime? OrderSent { get; set; }
    }
}
