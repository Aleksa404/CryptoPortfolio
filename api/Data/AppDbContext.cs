using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Coin> Coins { get; set;}
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios {get; set;}

      protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Portfolio>(x => x.HasKey(p=> new {p.AppUserId, p.CoinId}));
            builder.Entity<Portfolio>()
            .HasOne(u => u.AppUser)
            .WithMany(u => u.Portfolios)
            .HasForeignKey(p => p.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Portfolio>()
            .HasOne(u => u.Coin)
            .WithMany(u => u.Portfolios)
            .HasForeignKey(p => p.CoinId)
            .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<Comment>()
            .HasOne(c => c.Coin)
            .WithMany()
            .HasForeignKey(c => c.CoinId)
            .OnDelete(DeleteBehavior.Cascade);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },

            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}