using Microsoft.EntityFrameworkCore;
using TaskManagementApplication.Contexts;
using TaskManagementApplication.Interfaces;
using TaskManagementApplication.Models;

namespace TaskManagementApplication.Repositories
{
    public class UserRepository : IRepository<string, User>
    {
        private readonly TaskContext _context;
        public UserRepository(TaskContext context)
        {
            _context = context;
        }
        public User Add(User entity)
        {
            _context.users.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public User Delete(string Key)
        {

            var user = GetById(Key);
            if (user != null)
            {
                _context.users.Remove(user);
                _context.SaveChanges();
                return user;
            }
            return null;
        }

        public IList<User> GetAll()
        {
            if (_context.users.Count() == 0)
                return null;
            return _context.users.ToList();
        }


        public User GetById(string Key)
        {
            var user = _context.users.SingleOrDefault(u => u.Username == Key);
            return user;
        }

        public User Update(User entity)
        {
            var user = GetById(entity.Username);
            if (user != null)
            {
                _context.Entry<User>(user).State = EntityState.Modified;
                _context.SaveChanges();
                return user;
            }
            return null;
        }
    }
}
