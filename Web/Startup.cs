using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(gcVisionApi.Web.Startup))]
namespace gcVisionApi.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
