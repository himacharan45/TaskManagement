using TaskManagementApplication.Contexts;
using TaskManagementApplication.Interfaces;
using TaskManagementApplication.Models;

namespace TaskManagementApplication.Repositories
{
    public class TasksRepository : IRepository<int, Tasks>
    {
        private readonly TaskContext _context;
        public TasksRepository(TaskContext context)
        {
            _context = context;
        }
        public Tasks Add(Tasks entity)
        {
            _context.tasks.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public Tasks Delete(int Key)
        {
           var taskk=GetById(Key);
            if (taskk != null)
            {
                _context.tasks.Remove(taskk);
                _context.SaveChanges();
                return taskk;
            }
            return null;
        }

        public IList<Tasks> GetAll()
        {
            if (_context.tasks.Count() == 0)
                return null;
            return _context.tasks.ToList();
        }

        public Tasks GetById(int Key)
        {
           var taskk=_context.tasks.SingleOrDefault(u=> u.TaskId == Key);
            return taskk;
        }

        public Tasks Update(Tasks taskk)
        {
            _context.tasks.Update(taskk);
            _context.SaveChanges();
            return taskk;
        }
    }
}
