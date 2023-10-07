using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class PhotoController : BaseApiController
    {
        [HttpPost]  // api/photo
        public async Task<IActionResult> Add([FromForm] IFormFile file)
        {
            return HandleResult(await Mediator.Send(new Add.Command {File = file}));
        }


        [HttpDelete("{id}")] // api/photo/{id}
        public async Task<IActionResult> Delete(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }


        [HttpPost("upload")]  // api/photo/upload
        public async Task<IActionResult> SetMain([FromForm] IFormFile file)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command {File = file}));
        }
        
    }
}