using System.Text.Json.Serialization;

namespace shopCO.Data.Models
{
    public class Cloth
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public float Rating { get; set; }
        public float Price { get; set; }
        public int Discount { get; set; }
        public List<ClothColor> ClothColors { get; set; }
        public List<ClothSize> ClothSizes { get; set; }
    }
}
