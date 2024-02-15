using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementApplication.Models.DTOs
{
    public class TasksDTO
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string Username { get; set; }

    }
}
