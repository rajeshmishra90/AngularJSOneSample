using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularOnePOC.Startup))]
namespace AngularOnePOC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
