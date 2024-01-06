namespace shopCO.Data.Models
{
    public class ClothColor
    {
        public int Id { get; set; }
        public int ClothId { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
    }
}
