using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StickyEventsDomain.Entities
{
    public class Event
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Date { get; set; }

        public Address Address { get; set; }
    }
}
