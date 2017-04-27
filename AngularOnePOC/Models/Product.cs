﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularOnePOC.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal MRP { get; set; }

        public decimal Price { get; set; }

        public int? DiscountPercent { get; set; }

        public string Category { get; set; }

        public string ImagePath { get; set; }

        public int Rating { get; set; }

        public bool IsAvailable { get; set; }
    }
}
