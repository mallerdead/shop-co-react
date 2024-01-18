namespace shopCO.Data.Models.Entities
{
    public class OrderProduct
    {
        public int Id { get; set; }
        public int ClothId { get; set; }
        public int SizeId { get; set; }
        public int ColorId { get; set; }
        public int OrderId { get; set; }
        public int Count { get; set; }
        public Cloth Cloth { get; set; }
        public Size Size { get; set; }
        public Color Color { get; set; }
    }
}
