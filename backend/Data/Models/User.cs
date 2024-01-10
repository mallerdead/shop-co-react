using shopCO.PasswordHashing;

namespace shopCO.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? Token { get; set; }
        public Cart Cart { get; set; }

        public User() { }

        public User(RegisterViewModel registerViewModel)
        {
            Login = registerViewModel.Login;
            Email = registerViewModel.Email;
            PasswordHash = PasswordHasher.HashPassword(registerViewModel.Password);
        }
    }
}
