using System.ComponentModel.DataAnnotations;

namespace myapp.Models
{
    public class BasicInfo
    {
        public int BasicInfoId { get; set; }
        [Required]
        public int ApplicationUserId { get; set; }
        [Required]
        public string Company { get; set; }
        [Required]
        public string StuffNum { get; set; }
        [Required]
        public string CompanyAddress { get; set; }
        [Required]
        public string TaxOffice { get; set; }
        [Required]
        public string StuffName { get; set; }
        [Required]
        public string StuffRuby { get; set; }
        [Required]
        public string StuffAddress { get; set; }
        public string PartnerNum { get; set; }
        public string PartnerName { get; set; }
        public string PartnerRuby { get; set; }
        public string PartnerAddress { get; set; }
        public string PartnerBD { get; set; }

    }
}