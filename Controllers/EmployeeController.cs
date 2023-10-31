using CrudAjax.data;
using CrudAjax.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CrudAjax.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly AjaxContext _db;

        public EmployeeController(AjaxContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {

            return View();
        }
        public JsonResult GetEmployee()
        {
            var data = _db.Employees.ToList();

            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {

                Name = employee.Name,
                Email = employee.Email,
                Mobile = employee.Mobile,
                Dep = employee.Dep

            };

            _db.Employees.Add(emp);
            _db.SaveChanges();

            return new JsonResult("data is inserted");

        }

        public JsonResult Delete(int id)
        {
            var data = _db.Employees.Where(Model => Model.Id == id).SingleOrDefault();

            _db.Employees.Remove(data);
            _db.SaveChanges();

            return new JsonResult("data deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = _db.Employees.Where(Model => Model.Id == id).SingleOrDefault();

            return new JsonResult(data);

        }
        [HttpPost]
        public JsonResult Update(Employee employee)
        {

            _db.Employees.Update(employee);
            _db.SaveChanges();
            return new JsonResult("Record updated");
        }



    }
}

