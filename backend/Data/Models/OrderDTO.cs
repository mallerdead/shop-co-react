using shopCO.Data.Models.Entities;

namespace shopCO.Data.Models
{
    public class OrderDTO
    {
        public string Name { get; set; }
        public DateTime CreateDate { get; set; }
        public List<OrderProductDTO> Products { get; set; }

        public OrderDTO(Order order)
        {
            Name = order.Name;
            CreateDate = order.CreateDate;
            Products = order.Products.Select(product => new OrderProductDTO(product)).ToList();
        }
    }
}
