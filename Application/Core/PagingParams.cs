using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class PagingParams
    {
        private const int MaxPageSize = 50;
        public int CurrentPage { get; set; } = 1 ;
        public int PageSize { get; set; } = 10;
        
    }
}