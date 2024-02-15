using Microsoft.EntityFrameworkCore;
using TaskManagementApplication.Models;

namespace TaskManagementApplication.Contexts
{
    public class TaskContext :DbContext
    {
        public TaskContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> users { get; set; }
        public DbSet<Tasks> tasks { get; set; }
    }
}
