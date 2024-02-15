using Microsoft.VisualBasic;
using System.Net.NetworkInformation;
using TaskManagementApplication.Interfaces;
using TaskManagementApplication.Models;
using TaskManagementApplication.Models.DTOs;
using TaskManagementApplication.Repositories;

namespace TaskManagementApplication.Services
{
    public class TaskService : ITasksService
    {
        private readonly IRepository<int, Tasks> _tasksRepository;
        public TaskService(IRepository<int, Tasks> tasksRepository)
        {
            _tasksRepository = tasksRepository;
        }

        public bool Add(TasksDTO tasksDTO)
        {

            try
            {
                var tasking = new Tasks
                {
                    Title = tasksDTO.Title,
                    Description = tasksDTO.Description,
                    CreatedDate = tasksDTO.CreatedDate,
                    DueDate = tasksDTO.DueDate,
                    Status = tasksDTO.Status,
                    CompletedDate = tasksDTO.CompletedDate,
                    Username = tasksDTO.Username
                };
                _tasksRepository.Add(tasking);
                return true;
            }
            catch (Exception ex)
            { }
                return false;
            }

        public IEnumerable<TasksDTO> GetAllTasks()
        {
            try
            {
                var tasks = _tasksRepository.GetAll();
                return tasks.Select(t => new TasksDTO
                {
                    TaskId=t.TaskId,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedDate = t.CreatedDate,
                    DueDate = t.DueDate,
                    Status = t.Status,
                    CompletedDate = t.CompletedDate,
                    Username = t.Username
                });;
            }
            catch (Exception ex) {
                return null;
            }
        }

        public TasksDTO GetTaskById(int TaskId)
        {
            try
            {
                var taskEntity = _tasksRepository.GetById(TaskId);
                if (taskEntity == null)
                    return null;
                return new TasksDTO
                {
                    TaskId = taskEntity.TaskId,
                    Title = taskEntity.Title,
                    Description = taskEntity.Description,
                    CreatedDate = taskEntity.CreatedDate,
                    DueDate = taskEntity.DueDate,
                    Status = taskEntity.Status,
                    CompletedDate = taskEntity.CompletedDate,
                    Username = taskEntity.Username
                };
            }
            catch (Exception ex)
            {
                return null;

            }
        }

        public bool Remove(int TaskId)
        {
            try
            {
                var removedTask = _tasksRepository.Delete(TaskId);
                return removedTask != null;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public TasksDTO Update(TasksDTO tasksDTO)
        {
            try
            {
                var updatedTask = new Tasks
                {
                    TaskId = tasksDTO.TaskId,
                    Title = tasksDTO.Title,
                    Description = tasksDTO.Description,
                    CreatedDate = tasksDTO.CreatedDate,
                    DueDate = tasksDTO.DueDate,
                    Status = tasksDTO.Status,
                    CompletedDate = tasksDTO.CompletedDate,
                    Username = tasksDTO.Username
                };
                var result = _tasksRepository.Update(updatedTask);
                return new TasksDTO
                {
                    TaskId = tasksDTO.TaskId,
                    Title = updatedTask.Title,
                    Description = updatedTask.Description,
                    CreatedDate = updatedTask.CreatedDate,
                    DueDate = updatedTask.DueDate,
                    Status = updatedTask.Status,
                    CompletedDate = updatedTask.CompletedDate,
                    Username = updatedTask.Username
                };
            }
            catch (Exception ex)
            {
                return null;
            }
                  
        }
    }
 }
