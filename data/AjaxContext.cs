using CrudAjax.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudAjax.data
{
    public class AjaxContext:DbContext

    {
        public AjaxContext(DbContextOptions<AjaxContext>options):base(options)
        {
            
        }

        public DbSet<Employee>Employees { get; set; }
    }
}
