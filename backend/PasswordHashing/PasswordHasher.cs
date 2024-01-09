using BCrypt.Net;

namespace shopCO.PasswordHashing
{
    public static class PasswordHasher
    {
        private static HashType Algorithm = HashType.SHA256;
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(), true, Algorithm);
        }
        public static bool CheckHashedPassword(string password, string hashedPassword )
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword, true, Algorithm);
        }
    }
}
