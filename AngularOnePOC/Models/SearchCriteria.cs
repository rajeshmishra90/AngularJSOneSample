using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularOnePOC.Models
{
    public class SearchCriteria
    {
        public string Term { get; set; }

        public bool OnlyAvailable { get; set; }
    }
}
