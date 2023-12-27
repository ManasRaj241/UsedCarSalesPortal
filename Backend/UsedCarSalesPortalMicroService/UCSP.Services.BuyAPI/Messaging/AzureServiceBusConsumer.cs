using Azure.Messaging.ServiceBus;
using Newtonsoft.Json;
using System.Text;
using UCSP.Services.BuyAPI.Models.Dto;
using UCSP.Services.BuyAPI.Services;

namespace UCSP.Services.BuyAPI.Messaging
{
    public class AzureServiceBusConsumer : IAzureServiceBusConsumer
    {
        private readonly string serviceBusConnectionString;
        private readonly string emailCartQueue;
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;

        private ServiceBusProcessor _processor;

        public AzureServiceBusConsumer(IConfiguration configuration, EmailService emailService)
        {
            _emailService = emailService;
            _configuration = configuration;


            serviceBusConnectionString = _configuration.GetValue<string>("ServiceBusConnectionString");

            emailCartQueue = _configuration.GetValue<string>("TopicAndQueueName:BuyVehicleCartQueue");

            var client = new ServiceBusClient(serviceBusConnectionString);

            _processor = client.CreateProcessor(emailCartQueue);
        }

        public async Task start()
        {
            _processor.ProcessMessageAsync += OnBuyVehicleRequestReceived;

            _processor.ProcessErrorAsync += ErrorHandler;

            await _processor.StartProcessingAsync();
        }

        public async Task stop()
        {
            await _processor.StopProcessingAsync();
            await _processor.DisposeAsync();
        }

        private async Task OnBuyVehicleRequestReceived(ProcessMessageEventArgs args)
        {
            var message = args.Message;
            var body = Encoding.UTF8.GetString(message.Body);
            CartDto objMessage = JsonConvert.DeserializeObject<CartDto>(body);
            try
            {
                await _emailService.EmailCartAndLog(objMessage);
                await args.CompleteMessageAsync(args.Message);
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        private Task ErrorHandler(ProcessErrorEventArgs args)
        {
            Console.WriteLine(args.Exception.ToString());
            return Task.CompletedTask;
        }
    }
}
