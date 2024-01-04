using shopCO.Models;

namespace shopCO.DB
{
    public class DBContext
    {
        private List<Cloth> ClothList = new List<Cloth>()
        {
            new Cloth(1, "Gradient Graphic T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 3.5, 145, 0),
            new Cloth(2, "Polo with Tipping Details", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "poloTipping.png", 4.5, 180, 0),
            new Cloth(3, "Black Striped T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "blackStrippedShirt.png", 5.0, 120, 30),
            new Cloth(4, "Skinny Fit Jeans", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 2, 240, 20),
            new Cloth(5, "Gradient Graphic T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 3.5, 145, 0),
            new Cloth(6, "Polo with Tipping Details", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "poloTipping.png", 4.5, 180, 0),
            new Cloth(7, "Black Striped T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "blackStrippedShirt.png", 5.0, 120, 30),
            new Cloth(8, "Skinny Fit Jeans", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 2, 240, 20),
            new Cloth(9, "Gradient Graphic T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 3.5, 145, 0),
            new Cloth(10, "Polo with Tipping Details", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "poloTipping.png", 4.5, 180, 0),
            new Cloth(11, "Black Striped T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "blackStrippedShirt.png", 5.0, 120, 30),
            new Cloth(12, "Skinny Fit Jeans", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 2, 240, 20),
            new Cloth(13, "Gradient Graphic T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 3.5, 145, 0),
            new Cloth(14, "Polo with Tipping Details", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "poloTipping.png", 4.5, 180, 0),
            new Cloth(15, "Black Striped T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "blackStrippedShirt.png", 5.0, 120, 30),
            new Cloth(16, "Skinny Fit Jeans", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 2, 240, 20),
            new Cloth(17, "Gradient Graphic T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 3.5, 145, 0),
            new Cloth(18, "Polo with Tipping Details", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "poloTipping.png", 4.5, 180, 0),
            new Cloth(19, "Black Striped T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "blackStrippedShirt.png", 5.0, 120, 30),
            new Cloth(20, "Skinny Fit Jeans", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 2, 240, 20),
            new Cloth(21, "Gradient Graphic T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 3.5, 145, 0),
            new Cloth(22, "Polo with Tipping Details", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "poloTipping.png", 4.5, 180, 0),
            new Cloth(23, "Black Striped T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "blackStrippedShirt.png", 5.0, 120, 30),
            new Cloth(24, "Skinny Fit Jeans", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 2, 240, 20),
            new Cloth(25, "Gradient Graphic T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 3.5, 145, 0),
            new Cloth(26, "Polo with Tipping Details", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "poloTipping.png", 4.5, 180, 0),
            new Cloth(27, "Black Striped T-shirt", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "blackStrippedShirt.png", 5.0, 120, 30),
            new Cloth(28, "Skinny Fit Jeans", "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.", "gradientTShirt.png", 2, 240, 20),
        };

        public Cloth FindClothById(int id)
        {
            var result = ClothList.Find(cloth => cloth.Id == id);
            return result;
        }

        public List<Cloth> GetClothList()
        {
            return ClothList;
        }
    }
}
