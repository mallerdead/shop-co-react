using shopCO.Data.Models.Entities;

namespace shopCO.Data.Models
{
    public class ClothSize
    {
        public int Id { get; set; }
        public int ClothId { get; set; }
        public int SizeId { get; set; }
        public Size Size { get; set; }
    }
}
