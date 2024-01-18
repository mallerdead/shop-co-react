using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using shopCO.Data.Models;
using shopCO.Data.Models.Entities;
using shopCO.JwtTokens;
using shopCO.PasswordHashing;

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
        public virtual DbSet<ClothType> ClothTypes { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderProduct> OrderProducts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClothType>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("clothtypes");
            });

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
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("orders");
            });

            modelBuilder.Entity<OrderProduct>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("orderproducts");
            });
            OnModelCreatingPartial(modelBuilder);
        }

        public async Task<ClothDTO> FindClothById(int id)
        {
            var cloth = await Clothes
                .Include(cloth => cloth.ClothType)
                .Include(cloth => cloth.ClothColors).ThenInclude(clothColor => clothColor.Color)
                .Include(cloth => cloth.ClothSizes).ThenInclude(clothSize => clothSize.Size)
                .FirstOrDefaultAsync(cloth => cloth.Id == id);

            ClothDTO? clothDTO = null;

            if (cloth != null)
            {
                clothDTO = new ClothDTO(cloth);
            }

            return clothDTO;
        }
        public async Task<List<ClothDTO>> GetClothList()
        {
            var clothesList = await Clothes
                .Include(cloth => cloth.ClothType)
                .Include(cloth => cloth.ClothColors).ThenInclude(clothColor => clothColor.Color)
                .Include(cloth => cloth.ClothSizes).ThenInclude(clothSize => clothSize.Size)
                .Select(cloth => new ClothDTO(cloth)).ToListAsync();

            return clothesList;
        }

        public async Task<string> CreateUser(RegisterViewModel registerViewModel, IConfiguration config)
        {
            var newUser = new User(registerViewModel);

            Users.Add(newUser);
            await SaveChangesAsync();

            Carts.Add(new Cart(newUser.Id));

            JwtTokensManager.GenerateToken(newUser, config);
            await SaveChangesAsync();

            return newUser.Token;
        }

        public async Task<User> FindUserByToken(string header)
        {
            if (JwtTokensManager.TokenIsValid(header))
            {
                var token = header[4..];

                var user = await Users
                .Include(user => user.Cart.Products).ThenInclude(product => product.Cloth)
                .Include(user => user.Cart.Products).ThenInclude(product => product.Color)
                .Include(user => user.Cart.Products).ThenInclude(product => product.Size)
                .Include(user => user.Orders).ThenInclude(product => product.Products)
                .FirstOrDefaultAsync(user => user.Token != null && user.Token == token);

                if (user != null)
                {
                    if (user.TokenExpires.Value < DateTime.Now)
                    {
                        throw new Exception("Token has expired");
                    }
                    return user;
                }
                throw new Exception("There is no user with this token");
            }
            throw new Exception("Token is not valid");
        }

        public  List<CartProductDTO> FindCartProducts(User user)
        {
            var products = user.Cart.Products.ConvertAll(product => new CartProductDTO(product));

            return products;
        }

        public async Task<bool> AddCartProductToCart(User user, ProductViewModel newProduct)
        {
            var product = user.Cart.Products.Find(product => product.ClothId == newProduct.ClothId && product.SizeId == newProduct.SizeId && product.ColorId == newProduct.ColorId);
            var isContains = product != null;

            if (!isContains)
            {
                user.Cart.Products.Add(new CartProduct(newProduct));
            }
            else
            {
                product.Count += newProduct.Count;
            }
            await SaveChangesAsync();

            return isContains;
        }

        public async Task RemoveProductFromCart(User user, ProductViewModel productViewModel)
        {
            var product = user.Cart.Products.Find(product => product.ClothId == productViewModel.ClothId && product.SizeId == productViewModel.SizeId && product.ColorId == productViewModel.ColorId);

            if (product != null)
            {
                user.Cart.Products.Remove(product);

                await SaveChangesAsync();
            }
        }

        public async Task ChangeUserName(User user, string newName)
        {
            user.Login = newName;
            await SaveChangesAsync();
        }

        public async Task ChangeUserEmail(User user, string newEmail)
        {
            user.Email = newEmail ;
            await SaveChangesAsync();
        }


        public async Task ChangeCountProduct(User user, ProductViewModel productViewModel)
        {
            var product = user.Cart.Products.Find(product => product.ClothId == productViewModel.ClothId && product.SizeId == productViewModel.SizeId && product.ColorId == productViewModel.ColorId);

            if (product != null)
            {
                product.Count = productViewModel.Count;

                await SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Product not found");
            }
        }


        public async Task<string> UserLogin(LoginViewModel loginViewModel, IConfiguration config)
        {
            var user = await Users.FirstOrDefaultAsync(user => user.Email == loginViewModel.Login || user.Login == loginViewModel.Login);

            if (user != null && PasswordHasher.CheckHashedPassword(loginViewModel.Password, user.PasswordHash))
            {
                JwtTokensManager.GenerateToken(user, config);
                await SaveChangesAsync();

                return user.Token;
            }

            return null;
        }
        public async Task<List<ClothDTO>> GetTopSellingClothes(int count)
        {
            var result = new List<ClothDTO>();
            var topSellingClothes = await Clothes
                .Include(cloth => cloth.ClothType)
                .Include(cloth => cloth.ClothColors).ThenInclude(clothColor => clothColor.Color)
                .Include(cloth => cloth.ClothSizes).ThenInclude(clothSize => clothSize.Size)
                .OrderByDescending(cloth => cloth.QuantitySold)
                .Select(cloth => new ClothDTO(cloth))
                .ToListAsync();

            for (int i = 0; i < count && i < topSellingClothes.Count; i++)
            {
                result.Add(topSellingClothes[i]);
            }

            return result;
        }

        public async Task<List<ClothDTO>> GetNewArrivalsClothes(int count)
        {
            var result = new List<ClothDTO>();
            var topSellingClothes = await Clothes
                .Include(cloth => cloth.ClothType)
                .Include(cloth => cloth.ClothColors).ThenInclude(clothColor => clothColor.Color)
                .Include(cloth => cloth.ClothSizes).ThenInclude(clothSize => clothSize.Size)
                .OrderByDescending(cloth => cloth.DateAdded)
                .Select(cloth => new ClothDTO(cloth))
                .ToListAsync();

            for (int i = 0; i < count && i < topSellingClothes.Count; i++)
            {
                result.Add(topSellingClothes[i]);
            }

            return result;
        }

        public async Task<bool> CheckUserByEMail(string Email)
        {
            var user = await Users.FirstOrDefaultAsync(user => user.Email == Email);

            return user != null;
        }
    }
}
