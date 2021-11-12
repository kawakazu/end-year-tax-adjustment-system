using System.ComponentModel.DataAnnotations;

namespace myapp.Models
{
    public class IncomeCal
    {
        public int IncomeCalId { get; set; }
        [Required]
        public int ApplicationUserId { get; set; }
        [Required]
        public int Income1 { get; set; }
        [Required]
        public int BussinessInc1 { get; set; }
        [Required]
        public int BussinessExp1 { get; set; }
        [Required]
        public int MiscellaneousInc1 { get; set; }
        [Required]
        public int MiscellaneousExp1 { get; set; }
        [Required]
        public int DividendInc1 { get; set; }
        [Required]
        public int DividendExp1 { get; set; }
        [Required]
        public int PropertyInc1 { get; set; }
        [Required]
        public int PropertyExp1 { get; set; }
        [Required]
        public int RetirementInc1 { get; set; }
        [Required]
        public int RetirementExp1 { get; set; }
        [Required]
        public int ExceptInc1 { get; set; }
        [Required]
        public int ExceptExp1 { get; set; }
        [Required]
        public int Income2 { get; set; }
        [Required]
        public int BussinessInc2 { get; set; }
        [Required]
        public int BussinessExp2 { get; set; }
        [Required]
        public int MiscellaneousInc2 { get; set; }
        [Required]
        public int MiscellaneousExp2 { get; set; }
        [Required]
        public int DividendInc2 { get; set; }
        [Required]
        public int DividendExp2 { get; set; }
        [Required]
        public int PropertyInc2 { get; set; }
        [Required]
        public int PropertyExp2 { get; set; }
        [Required]
        public int RetirementInc2 { get; set; }
        [Required]
        public int RetirementExp2 { get; set; }
        [Required]
        public int ExceptInc2 { get; set; }
        [Required]
        public int ExceptExp2 { get; set; } 
    }
}