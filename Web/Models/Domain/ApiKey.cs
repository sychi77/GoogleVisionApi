using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace gcVisionApi.Web.Models.Domain
{
    public class ApiKey
    {
        public int Id { get; set; }
        public string Setting { get; set; }
        public string Value { get; set; }
    }
}