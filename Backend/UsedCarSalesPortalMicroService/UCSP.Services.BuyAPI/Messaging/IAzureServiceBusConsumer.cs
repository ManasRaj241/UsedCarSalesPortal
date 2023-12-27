namespace UCSP.Services.BuyAPI.Messaging
{
    public interface IAzureServiceBusConsumer
    {
        Task start();
        Task stop();
    }
}
