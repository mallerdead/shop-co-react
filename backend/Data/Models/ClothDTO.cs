using shopCO.Data.Models.Entities;

namespace shopCO.Data.Models
{
    public class ClothDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public float Rating { get; set; }
        public float Price { get; set; }
        public int Discount { get; set; }
        public ClothType ClothType { get; set; }
        public List<Color> Colors { get; set; }
        public List<Size> Sizes { get; set; }

        public ClothDTO(Cloth cloth)
        {
            Id = cloth.Id;
            Name = cloth.Name;
            Description = cloth.Description;
            ImageURL = cloth.ImageURL;
            Rating = cloth.Rating;
            Price = cloth.Price;
            Discount = cloth.Discount;
            ClothType = cloth.ClothType;
            Colors = cloth.ClothColors.ConvertAll(clothColor => clothColor.Color).ToList();
            Sizes = cloth.ClothSizes.ConvertAll(clothSize => clothSize.Size).ToList();
        }
    }
}