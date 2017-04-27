using AngularOnePOC.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Data;

namespace AngularOnePOC.Controllers
{
    public class ProductController : Controller
    {
        private static List<Product> productList = GetInitialProduct();

        // GET: Product/Details/5
        [HttpGet]
        public JsonResult Details(int id)
        {
            var productInfo = productList.Where(p => p.Id == id).FirstOrDefault();
            return Json(new { Data = productInfo }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult List()
        {
            productList = productList.OrderBy(p => p.Id).ToList();
            return Json(new { Data = productList }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Search(SearchCriteria searchCriteria)
        {
            var searchData = new List<Product>();
            var searchterms = searchCriteria.Term.Split(' ');
            foreach (var item in searchterms)
            {
                var products = productList.Where(p => (p.Name.ToLower().Contains(item.ToLower()) || p.Description.ToLower().Contains(item.ToLower()))).ToList();
                if (products.Count > 0)
                {
                    searchData = searchData.Union(products).ToList();
                }
            }

            if (searchCriteria.OnlyAvailable)
            {
                searchData = searchData.Where(p => p.IsAvailable == true).ToList();
            }

            searchData = searchData.Distinct().OrderBy(p => p.Name).ToList();
            return Json(new { Data = searchData }, JsonRequestBehavior.AllowGet);
        }

        // POST: Product/Create
        [HttpPost]
        public JsonResult Create(Product product)
        {
            try
            {
                int id = productList.Count + 1;
                product.Id = id;
                product.IsAvailable = true;
                productList.Add(product);
                return Json(new { IsSuccess = true }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { IsSuccess = false }, JsonRequestBehavior.AllowGet);
            }
        }

        // POST: Product/Edit/5
        [HttpPost]
        public JsonResult Edit(int id, Product product)
        {
            try
            {
                var productInfo = productList.Where(p => p.Id == id).FirstOrDefault();
                int index = productList.IndexOf(productInfo);
                if (index != -1)
                {
                    productList[index] = product;
                    return Json(new { IsSuccess = true }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { IsSuccess = false }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { IsSuccess = false }, JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Product/Delete/5
        public ActionResult Delete(int id)
        {
            try
            {
                var productInfo = productList.Where(p => p.Id == id).FirstOrDefault();
                productList.Remove(productInfo);
                return Json(new { IsSuccess = true }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { IsSuccess = false }, JsonRequestBehavior.AllowGet);
            }
        }

        private static List<Product> GetInitialProduct()
        {
            productList = new List<Product>();
            var product1 = new Product()
            {
                Id = 1,
                Name = "AirBag Backpack( 10Litres)",
                Description = "laptop bag, 10 litre capacity, office, comfortable, cheap, shoulder bag",
                DiscountPercent = 10,
                IsAvailable = true,
                Price = 499,
                Rating = 4,
                ImagePath = "https://rukminim1.flixcart.com/image/312/312/backpack/f/u/d/bkpecobp4-gear-backpack-eco-backpack-4-navy-blue-green-original-imaehzgzhwahn36x.jpeg?q=70"
            };
            productList.Add(product1);
            var product2 = new Product()
            {
                Id = 2,
                Name = "IPhone 6S 64 GB",
                Description = "apple iphone mobile",
                DiscountPercent = 23,
                IsAvailable = true,
                Price = 3990,
                Rating = 3,
                ImagePath = "https://images.apple.com/au/pr/products/images/iPhone6_34FR_SpGry_iPhone6plus_34FL_SpGry_Homescreen_HERO.jpg*"
            };
            productList.Add(product2);
            var product3 = new Product()
            {
                Id = 3,
                Name = "Men Formal Shoes",
                Description = "Bata, liberty mochi Men Formal Shoes",
                DiscountPercent = 5,
                IsAvailable = true,
                Price = 699,
                Rating = 2,
                ImagePath = "https://rukminim1.flixcart.com/image/312/312/shoe/h/q/q/black-wvf00002-vulcan-knight-8-original-imaemzsyu9rvghjy.jpeg?q=70"
            };
            productList.Add(product3);
            return productList;
        }
    }
}