using TaskManagementApplication.Models.DTOs;

namespace TaskManagementApplication.Interfaces
{
    public interface ITasksService
    {
        bool Add(TasksDTO tasksDTO);
        bool Remove(int id);
        TasksDTO Update(TasksDTO tasksDTO);
        TasksDTO GetTaskById(int id);
        IEnumerable<TasksDTO> GetAllTasks();
    }
}
