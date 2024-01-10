using Microsoft.EntityFrameworkCore;
using shopCO.JwtTokens;
using shopCO.PasswordHashing;
using shopCO.Data.Models;

namespace shopCO.Data
{
    public partial class AppDbContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Cloth> Clothes { get; set; }
        public virtual DbSet<Size> Sizes { get; set; }
        public virtual DbSet<ClothSize> ClothSize { get; set; }
        public virtual DbSet<Color> Colors { get; set; }
        public virtual DbSet<ClothColor> ClothColors { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartProduct> CartProducts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cloth>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("clothes");
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("colors");
            });
            modelBuilder.Entity<ClothColor>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("clothcolors");
            });

            modelBuilder.Entity<Size>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("sizes");
            });
            modelBuilder.Entity<ClothSize>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("clothsizes");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("users");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        public async Task<ClothDTO> FindClothById(int id)
        {
            var cloth = await Clothes.Include(cloth => cloth.ClothColors).ThenInclude(clothColor => clothColor.Color).Include(cloth => cloth.ClothSizes).ThenInclude(clothSize => clothSize.Size).FirstOrDefaultAsync(cloth => cloth.Id == id);
            ClothDTO? clothDTO = null;

            if (cloth != null)
            {
                clothDTO = new ClothDTO(cloth);
            }

            return clothDTO;
        }
        public async Task<List<ClothDTO>> GetClothList()
        {
            var clothesList = await Clothes.Include(cloth => cloth.ClothColors).ThenInclude(clothColor => clothColor.Color).Include(cloth => cloth.ClothSizes).ThenInclude(clothSize => clothSize.Size).Select(cloth => new ClothDTO(cloth)).ToListAsync();
            return clothesList;
        }

        public async Task<string> CreateUser(RegisterViewModel registerViewModel, IConfiguration config)
        {
            var newUser = new User(registerViewModel);

            Users.Add(newUser);
            await SaveChangesAsync();

            Carts.Add(new Cart(newUser.Id));

            var token = JwtTokensManager.GenerateToken(newUser.Id, config);
            newUser.Token = token;
            await SaveChangesAsync();

            return token;
        }

        public async Task<UserInfoViewModel> FindUserByToken(string token)
        {
            var user = await Users.FirstOrDefaultAsync(user => user.Token != null && user.Token == token);
            return user != null ? new UserInfoViewModel(user) : null;
        }

        public async Task<List<CartProductDTO>> FindCartProducts(string token)
        {
            var user = await Users
                .Include(user => user.Cart.Products).ThenInclude(product => product.Cloth)
                .Include(user => user.Cart.Products).ThenInclude(product => product.Color)
                .Include(user => user.Cart.Products).ThenInclude(product => product.Size)
                .FirstOrDefaultAsync(user => user.Token == token);

            if (user != null)
            {
                var products = user.Cart.Products.ConvertAll(product => new CartProductDTO(product));
                return products;
            }

            return null;
        }

        public async Task<string> UserLogin(LoginViewModel loginViewModel, IConfiguration config)
        {
            var user = await Users.FirstOrDefaultAsync(user => user.Email == loginViewModel.Login || user.Login == loginViewModel.Login);

            if (user != null && PasswordHasher.CheckHashedPassword(loginViewModel.Password, user.PasswordHash))
            {
                user.Token = JwtTokensManager.GenerateToken(user.Id, config);
                await SaveChangesAsync();
                return user.Token;
            }

            return null;
        }

        public async Task<bool> CheckUserByEMail(string Email)
        {
            var user = await Users.FirstOrDefaultAsync(user => user.Email == Email);
            return user != null;
        }
    }
}
