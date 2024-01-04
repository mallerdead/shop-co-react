namespace shopCO.Models
{
    public class Cloth
    {
        public int Id { get; set; }
        public string Name { get;set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public float Rating { get; set; }
        public float Price { get; set; }
        public int Discount { get; set; }
        public List<Size> Sizes { get; set; }
        public List<Color> Colors { get; set; }


        public Cloth(int id, string name, string description, string imageURL, double rating, double price, int discount )
        {
            Id = id;
            Name = name;
            Description = description;
            ImageURL = imageURL;
            Rating = (float)rating;
            Price = (float)price;
            Discount = discount;
            Colors = new List<Color>()
            {
                new Color() { Id = 1, Name = "black"},
                new Color() { Id = 2, Name = "white"},
                new Color() { Id = 3, Name = "green"},
            };
            Sizes = new List<Size>()
            {
                new Size() { Id = 1, Name = "Medium"},
                new Size() { Id = 2, Name = "Large"},
                new Size() { Id = 3, Name = "X-Large"}
            };
        }
    }
}
