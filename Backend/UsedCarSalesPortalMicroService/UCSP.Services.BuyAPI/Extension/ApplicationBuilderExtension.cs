using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Reflection.Metadata;
using UCSP.Services.BuyAPI.Messaging;

namespace UCSP.Services.BuyAPI.Extension
{
    public static class ApplicationBuilderExtension
    {
        private static IAzureServiceBusConsumer ServiceBusConsumer { get; set; }
        public static IApplicationBuilder UseAzureServiceBusConsumer(this IApplicationBuilder app)
        {
            ServiceBusConsumer = app.ApplicationServices.GetService<IAzureServiceBusConsumer>();
            var hostApplicationLife = app.ApplicationServices.GetService<IHostApplicationLifetime>();
            hostApplicationLife.ApplicationStarted.Register(OnStart);
            hostApplicationLife.ApplicationStopping.Register(OnStop);
            return app;
        }

        private static void OnStop()
        {
            ServiceBusConsumer.stop();
        }

        private static void OnStart()
        {
            ServiceBusConsumer.start();
        }
    }
}
