using shopCO.Data.Models.Entities;

namespace shopCO.Data.Models
{
    public class CartProduct
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int ClothId { get; set; }
        public int Count { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public Cloth Cloth { get; set; }
        public Size Size { get; set; }
        public Color Color { get; set; }

        public CartProduct() { }

        public CartProduct(ProductViewModel newProduct)
        {
            ClothId = newProduct.ClothId;
            Count = newProduct.Count;
            SizeId = newProduct.SizeId;
            ColorId = newProduct.ColorId;
        }
    }
}
