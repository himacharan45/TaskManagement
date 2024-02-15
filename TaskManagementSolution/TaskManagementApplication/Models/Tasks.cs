using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementApplication.Models
{
    public class Tasks
    {
        [Key]
        public int TaskId {  get; set; }
        public string Title {  get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set;}
        public DateTime DueDate { get; set;}
        public string Status {  get; set; }
        public DateTime? CompletedDate { get; set;}
        public string Username {  get; set; }
        public User? user; 
    }
}
