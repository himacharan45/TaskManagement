using TaskManagementApplication.Models.DTOs;

namespace TaskManagementApplication.Interfaces
{
    public interface ITokenService
    {
        string GetToken(UserDTO user);
    }
}
