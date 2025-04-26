using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;

public class EmailSenderService
{
    private readonly IAmazonSimpleEmailService _sesClient;
    private readonly string SenderEmail;

    public EmailSenderService(IAmazonSimpleEmailService sesClient, IConfiguration config)
    {
        _sesClient = sesClient;
        SenderEmail = config["Email:Sender"] ?? throw new ArgumentNullException("Sender email is not configured.");
    }


    public async Task SendAlertEmail(string recipient, string coinId, decimal price, decimal target)
    {
        var request = new SendEmailRequest
        {
            Source = SenderEmail,
            Destination = new Destination { ToAddresses = new List<string> { recipient } },
            Message = new Message
            {
                Subject = new Content($"{coinId.ToUpper()} hit your target price!"),
                Body = new Body
                {
                    Text = new Content($"{coinId} is now at ${price} (your target was ${target})")
                }
            }
        };

        try
        {
            await _sesClient.SendEmailAsync(request);

        }
        catch (AmazonSimpleEmailServiceException ex)
        {
            Console.WriteLine($"Amazon SES error: {ex.Message}");
            Console.WriteLine($"Status code: {ex.StatusCode}");
            Console.WriteLine($"Error code: {ex.ErrorCode}");
            Console.WriteLine($"Request ID: {ex.RequestId}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General error: {ex.Message}");
        }
    }



}