using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularOnePOC.Controllers
{
    public class UserCredential
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }

    public class HomeController : Controller
    {
        public JsonResult IsAuthenticated(UserCredential credential)
        {
            if (credential != null && credential.UserName == "admin" && credential.Password == "admin")
            {
                return Json(new { isSuccess = true }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { isSuccess = false }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}