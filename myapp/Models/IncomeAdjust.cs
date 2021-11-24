using System.ComponentModel.DataAnnotations;

namespace myapp.Models
{
    public class IncomeAdjust
    {
         public int IncomeAdjustId { get; set; }
         [Required]
         public int ApplicationUserId { get; set; }
         [Required]
         public string RadioGroup { get; set; }
         public string DependentsNum { get; set; }
         public string DependentsDB { get; set; }
                       
         public string DependentsName { get; set; }
         public string DependentsRuby { get; set; }
         public string DependentsAdr { get; set; }
         public string DependentsRel { get; set; }
         public string DependentsInc { get; set; }
         public string DependentsPrsEvid { get; set; }
    }
}