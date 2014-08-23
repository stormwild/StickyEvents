using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StickyEventsWeb.Controllers;
using StickyEventsDomain.Entities;
using StickyEventsDomain.Abstract;
using System.Collections.Generic;
using System.Configuration;
using System.Web.Hosting;
using System.Linq;
using Moq;

namespace StickyEventsWeb.Tests
{
    [TestClass]
    public class TestEventsController
    {
        [TestMethod]
        public void Get_Should_Return_Three_Events()
        {
            // arrange
            Mock<IEventsService> mock = new Mock<IEventsService>();

            List<Event> events = new List<Event> { 
                new Event{ 
                    Id = 1, 
                    Name = "Event1", 
                    Date = "date", 
                    Address = new Address { 
                        Address1 = "Address1", 
                        Address2 = "", 
                        Suburb = "Redcliffe", 
                        State = "QLD", 
                        Country = "Australia"
                    }
                },
                new Event{ 
                    Id = 2, 
                    Name = "Event2", 
                    Date = "date", 
                    Address = new Address { 
                        Address1 = "Address1", 
                        Address2 = "", 
                        Suburb = "Redcliffe", 
                        State = "QLD", 
                        Country = "Australia"
                    }
                },
                new Event{ 
                    Id = 3, 
                    Name = "Event3", 
                    Date = "date", 
                    Address = new Address { 
                        Address1 = "Address1", 
                        Address2 = "", 
                        Suburb = "Redcliffe", 
                        State = "QLD", 
                        Country = "Australia"
                    }
                }
            };
            mock.Setup(m => m.Get()).Returns<IQueryable<Event>>(e => events.AsQueryable()); // Parameter count error, still trying to fix
            EventsController target = new EventsController(mock.Object);

            // act
            var result = target.Get() as List<Event>;

            // assert
            Assert.AreEqual(3, result.Count());
        }
    }
}
