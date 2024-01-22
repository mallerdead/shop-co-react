using shopCO.Data.Models.Entities;

namespace shopCO.Data.Models
{
    public class CartProductDTO
    {
        public int Id { get; set; }
        public int ClothId { get; set; }
        public string Name { get; set; }
        public string ImageURL { get; set; }
        public float Price { get; set; }
        public int Discount { get; set; }
        public int Count { get; set; }
        public Color Color { get; set; }
        public Size Size { get; set; }

        public CartProductDTO(CartProduct product)
        {
            Id = product.Id;
            ClothId = product.ClothId;
            Name = product.Cloth.Name;
            ImageURL = product.Cloth.ImageURL;
            Price = product.Cloth.Price;
            Discount = product.Cloth.Discount;
            Count = product.Count;
            Color = product.Color;
            Size = product.Size;
        }
    }
}
