using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CharityAuction.Api.Errors
{
    public class BadRequestWithMessageResult : ActionResult 
    {
        public string Message { get; set; }
        public BadRequestWithMessageResult(string message)
        {
            Message = message;
        }
        public override Task ExecuteResultAsync(ActionContext context)
        {
            context.HttpContext.Response.StatusCode = 400;
            context.HttpContext.Response.BodyWriter.WriteAsync(System.Text.ASCIIEncoding.UTF8.GetBytes(JsonConvert.SerializeObject(this)));
            return Task.CompletedTask;
        }
        

    }
}
