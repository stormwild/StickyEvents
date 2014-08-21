using StickyEventsDomain.Abstract;
using StickyEventsDomain.Entities;
using StickyEventsDomain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace StickyEventsWeb.Controllers
{
    public class EventsController : ApiController
    {
        private IEventsService _eventsService;

        public EventsController()
        {
            // Refactor to use dependency injection
            string path = HostingEnvironment.MapPath("~/App_Data/Developer Evaluation Events.xml");
            _eventsService = new EventsService(path);
        }

        // GET: api/Events
        public IEnumerable<Event> Get()
        {
            return _eventsService.Get();
        }

        // GET: api/Events/5
        public Event Get(int id)
        {
            return _eventsService.Get().Where(e => e.Id == id).FirstOrDefault();
        }

        // POST: api/Events
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Events/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Events/5
        public void Delete(int id)
        {
        }
    }
}
