using shopCO.Data.Models.Entities;

namespace shopCO.Data.Models
{
    public class UserInfoViewModel
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public List<OrderDTO> Orders { get; set;}

        public UserInfoViewModel(User user)
        {
            Login = user.Login;
            Email = user.Email;
            Orders = user.Orders.Select(order => new OrderDTO(order)).ToList();
        }
    }
}
