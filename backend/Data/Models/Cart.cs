﻿namespace shopCO.Data.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<CartProduct> Products { get; set; }

        public Cart(int userId)
        {
            UserId = userId;
        }
    }
}
