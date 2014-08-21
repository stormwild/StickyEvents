using StickyEventsDomain.Abstract;
using StickyEventsDomain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StickyEventsWeb.Controllers
{
    public class AppController : Controller
    {
        // GET: Events
        public ActionResult App()
        {
            return View();
        }
    }
}