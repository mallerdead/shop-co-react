namespace shopCO.Data.Models
{
    public class UserInfoViewModel
    {
        public string Login { get; set; }
        public string Email { get; set; }

        public UserInfoViewModel(User user)
        {
            Login = user.Login;
            Email = user.Email;
        }
    }
}
