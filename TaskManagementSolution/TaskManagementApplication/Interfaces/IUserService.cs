using TaskManagementApplication.Models.DTOs;

namespace TaskManagementApplication.Interfaces
{
    public interface IUserService
    {
        UserDTO Login(UserDTO userDTO);
        UserDTO Register(UserDTO userDTO);
    }
}
