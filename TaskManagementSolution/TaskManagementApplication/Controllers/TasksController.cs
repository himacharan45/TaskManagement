using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApplication.Interfaces;
using TaskManagementApplication.Models.DTOs;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace TaskManagementApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("reactApp")]
    public class TasksController : ControllerBase
    {
        private readonly ITasksService _tasksService;

        public TasksController(ITasksService tasksService)
        {
            _tasksService = tasksService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        [Route("AddTask")]
        public ActionResult AddTask(TasksDTO tasksDTO)
        {
            try
            {
                var result = _tasksService.Add(tasksDTO);
                if (result)
                {
                    return Ok("Task added successfully");
                }
                return BadRequest("Failed to add task");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet]
        [Route("GetAllTasks")]
        public ActionResult<IEnumerable<TasksDTO>> GetAllTasks()
        {
            try
            {
                var tasks = _tasksService.GetAllTasks();
                if (tasks != null)
                {
                    return Ok(tasks);
                }
                return NotFound("No tasks found");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [HttpGet]
        [Route("GetTaskById/{taskId}")]
        public ActionResult<TasksDTO> GetTaskById(int taskId)
        {
            try
            {
                var task = _tasksService.GetTaskById(taskId);
                if (task != null)
                {
                    return Ok(task);
                }
                return NotFound($"Task with ID {taskId} not found");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("RemoveTask/{taskId}")]
        public ActionResult RemoveTask(int taskId)
        {
            try
            {
                var result = _tasksService.Remove(taskId);
                if (result)
                {
                    return Ok($"Task with ID {taskId} removed successfully");
                }
                return NotFound($"Task with ID {taskId} not found");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }

        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TasksDTO tasksDTO)
        {
            try
            {
                if (id != tasksDTO.TaskId)
                    return BadRequest("Task ID mismatch.");

                var updatedTask = _tasksService.Update(tasksDTO);
                if (updatedTask != null)
                    return Ok(updatedTask);
                return NotFound("Task with given ID is not found");
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

    }
}
