using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IHostEnvironment env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.env = env;
            this.logger = logger;
            this.next = next;

        }
        public async Task InvokeAsync(HttpContext context){
            
            try{
                await this.next(context);

            }
            catch(Exception e){
                
                this.logger.LogError(e,e.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode=(int) HttpStatusCode.InternalServerError;
                var response=this.env.IsDevelopment()
                ? new AppException(context.Response.StatusCode,e.Message,e.StackTrace?.ToString())
                : new AppException(context.Response.StatusCode,"Server Error");

                var option=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
            
                var json=JsonSerializer.Serialize(response,option);

                await context.Response.WriteAsync(json);


            }
        }
    }
}