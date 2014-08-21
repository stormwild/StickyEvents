using StickyEventsDomain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StickyEventsDomain.Abstract
{
    public interface IEventsService
    {
        IQueryable<Event> Get();
    }
}
