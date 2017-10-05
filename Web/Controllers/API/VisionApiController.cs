using gcVisionApi.Web.Models.Domain;
using gcVisionApi.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace gcVisionApi.Web.Controllers.API
{
    [RoutePrefix("api/vision")]
    public class VisionApiController : ApiController
    {
        VisionService visionService = new VisionService();

        [Route("gckey"), HttpGet]
        public HttpResponseMessage GetApiKey()
        {
            try
            {
                ApiKey response = new ApiKey();
                response = visionService.SelectApiKey();
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
    }
}