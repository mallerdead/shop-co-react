namespace shopCO.PasswordHashing
{
    public static class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt(), true, BCrypt.Net.HashType.SHA256);
        }
        public static bool CheckHashedPassword(string password, string hashedPassword )
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword, true, BCrypt.Net.HashType.SHA256);
        }
    }
}
