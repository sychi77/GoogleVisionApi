using gcVisionApi.Web.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gcVisionApi.Web.Services
{
    public interface IVisionService
    {
        ApiKey SelectApiKey();
    }
}