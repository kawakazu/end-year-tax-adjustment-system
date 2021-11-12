using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using myapp.Models;

    public class SampleAPIContext : DbContext
    {
        public SampleAPIContext (DbContextOptions<SampleAPIContext> options)
            : base(options)
        {
        }

        public DbSet<myapp.Models.ApplicationUser> ApplicationUser { get; set; }
        public DbSet<myapp.Models.BasicInfo> BasicInfo { get; set; }
        public DbSet<myapp.Models.IncomeCal> IncomeCal { get; set; }
        public DbSet<myapp.Models.IncomeAdjust> IncomeAdjust { get; set; }
    }
