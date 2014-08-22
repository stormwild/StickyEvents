using StickyEventsDomain.Abstract;
using StickyEventsDomain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace StickyEventsDomain.Services
{
    public class EventsService : IEventsService
    {
        private string _path;

        public EventsService(string path)
        {
            _path = path;
        }

        public IQueryable<Event> Get()
        {   
            var eventsXml = XDocument.Load(_path);
            return eventsXml.Root.Elements().Select(e => new Event { 
                Id = (int)e.Attribute("id"), 
                Name = (string)e.Attribute("name"), 
                Date = (string)e.Attribute("date"), 
                Address = new Address {
                    Address1 = (string) e.Descendants("address").FirstOrDefault().Attribute("address1"),
                    Address2 = (string) e.Descendants("address").FirstOrDefault().Attribute("address2"),
                    Suburb = (string) e.Descendants("address").FirstOrDefault().Attribute("suburb"),
                    State = (string) e.Descendants("address").FirstOrDefault().Attribute("state"),
                    Country = (string) e.Descendants("address").FirstOrDefault().Attribute("country")
                } 
            }).AsQueryable();
        }
    }
}
