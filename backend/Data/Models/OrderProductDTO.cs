using shopCO.Data.Models.Entities;

namespace shopCO.Data.Models
{
    public class OrderProductDTO
    {
        public int Id { get; set; }
        public int Count { get; set; }
        public Cloth Cloth { get; set; }
        public Color Color { get; set; }
        public Size Size { get; set; }
        public OrderProductDTO(OrderProduct product)
        {
            Count = product.Count;
            Cloth = product.Cloth;
            Color = product.Color;
            Size = product.Size;
        }
    }
}
