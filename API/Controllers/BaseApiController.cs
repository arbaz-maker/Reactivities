using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:ControllerBase
    {
        private IMediator mediator;
        // public ActivitiesController(IMediator mediator)
        // {
        //     this.mediator = mediator;
        // }
        protected IMediator Mediator=> this.mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        
    }
}