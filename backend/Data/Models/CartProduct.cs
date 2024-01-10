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
    }
}
