using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.User
{
    public class NewUserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } = "User";
        public string Token { get; set; }
    }
}