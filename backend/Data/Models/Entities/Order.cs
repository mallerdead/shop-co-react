namespace shopCO.Data.Models.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public DateTime CreateDate { get; set; }
        public List<OrderProduct> Products { get; set; }
    }
}
