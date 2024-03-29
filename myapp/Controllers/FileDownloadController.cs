using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using ClosedXML.Excel;

namespace myapp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FileDownloadController : ControllerBase
    {
        private readonly SampleAPIContext _context;

        public FileDownloadController(SampleAPIContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<FileContentResult> Download(int id, string japaneseEra, string year)
        {
            // DB取得
            var basicInof = await _context.BasicInfo.Where(m => m.ApplicationUserId  == id).FirstAsync();
            var incomeCal = await _context.IncomeCal.Where(m => m.ApplicationUserId  == id).FirstAsync();
            var incomeAdjust = await _context.IncomeAdjust.Where(m => m.ApplicationUserId  == id).FirstAsync();
            using (var stream = new System.IO.MemoryStream())
            {
                //ブック読み込み
                var book = new XLWorkbook(@"./template/template.xlsx");
                //シート名からシート取得
                var sheet = book.Worksheet("申告書");
                DateTime ce;
                IDictionary<string, string> je = new Dictionary<string, string>();

                // セルに設定

                sheet.Cell(1,1).Value = japaneseEra + year + sheet.Cell(1,1).GetString();
                // BasicInfo
                sheet.Cell(7,4).Value = basicInof.TaxOffice;
                sheet.Cell(6,18).Value = basicInof.Company;
                sheet.Cell(8,18).Value = basicInof.StuffNum.ToString();
                sheet.Cell(10,18).Value = basicInof.CompanyAddress;
                sheet.Cell(6,42).Value = basicInof.StuffRuby;
                sheet.Cell(7,42).Value = basicInof.StuffName;
                sheet.Cell(10,42).Value = basicInof.StuffAddress;
                sheet.Cell(27,35).Value = basicInof.PartnerRuby;
                sheet.Cell(29,35).Value = basicInof.PartnerName;
                sheet.Cell(24,50).Value = basicInof.PartnerNum;
                sheet.Cell(29,50).Value = basicInof.PartnerAddress;
                // 配偶者の生年月日を追加する

                // IncomeCal
                sheet.Cell(38,12).Value = incomeCal.Income1;
                sheet.Cell(38,22).Value = PayrollIncomeDeduction(incomeCal.Income1);
                sheet.Cell(43,22).Value = incomeCal.BussinessExp1 + incomeCal.DividendExp1 + 
                                          incomeCal.ExceptExp1 + incomeCal.MiscellaneousExp1 +
                                          incomeCal.PropertyExp1 + incomeCal.RetirementExp1;
                sheet.Cell(48,22).FormulaA1 = "V38 + V43";
                int incomeQuote1 = sheet.Cell(48,22).GetValue<int>();
                // string[] classification1 = Classification1(incomeSum1);
                sheet.Cell(56,25).Value = Classification1(incomeQuote1);
                sheet.Cell(63,25).Value = BasicDeduction(incomeQuote1);

                sheet.Cell(38,43).Value = incomeCal.Income2;
                sheet.Cell(38,53).Value = PayrollIncomeDeduction(incomeCal.Income2);
                sheet.Cell(43,53).Value = incomeCal.BussinessExp2 + incomeCal.DividendExp2 + 
                                          incomeCal.ExceptExp2 + incomeCal.MiscellaneousExp2 +
                                          incomeCal.PropertyExp2 + incomeCal.RetirementExp2;
                sheet.Cell(48,53).FormulaA1 = "BA38 + BA43";
                int incomeQuote2 = sheet.Cell(48,53).GetValue<int>();

                if (basicInof.PartnerBD != "")
                {
                    ce = GetBirthDay(basicInof.PartnerBD);
                    je = CEtoJE(ce);
                    int age = GetAge(ce, DateTime.Today);
                    // 配偶者の生年月日
                    sheet.Cell(24,65).Value = je["JE"];
                    sheet.Cell(24,72).Value = je["Year"];
                    sheet.Cell(24,75).Value = je["Month"];
                    sheet.Cell(24,78).Value = je["Day"];
                    // 区分Ⅱ、配偶者控除の額、配偶者特別控除の額
                    sheet.Cell(49,71).Value = Classification2(incomeQuote2, age);
                    sheet.Cell(56,73).Value = SpousalDeduction(sheet.Cell(56,25).GetValue<string>(), sheet.Cell(49,71).GetValue<string>());
                    sheet.Cell(63,73).Value = SpousalSpecialDeduction(sheet.Cell(56,25).GetValue<string>(), sheet.Cell(49,71).GetValue<string>(), incomeQuote2);
                }

                sheet.Cell(83,43).Value = incomeAdjust.DependentsNum;
                sheet.Cell(86,31).Value = incomeAdjust.DependentsRuby;
                sheet.Cell(88,31).Value = incomeAdjust.DependentsName;
                sheet.Cell(88,43).Value = incomeAdjust.DependentsAdr;
                sheet.Cell(88,55).Value = incomeAdjust.DependentsRel;
                sheet.Cell(88,60).Value = incomeAdjust.DependentsInc;
                sheet.Cell(84,70).Value = incomeAdjust.DependentsPrsEvid;
                if (incomeAdjust.DependentsDB != "")
                {
                    ce = GetBirthDay(incomeAdjust.DependentsDB);
                    je = CEtoJE(ce);
                    sheet.Cell(83,55).Value = je["JE"];
                    sheet.Cell(83,58).Value = je["Year"];
                    sheet.Cell(83,61).Value = je["Month"];
                    sheet.Cell(83,64).Value = je["Day"];
                }
                switch (incomeAdjust.RadioGroup) {
                    case "1":
                        sheet.Cell(82,6).Value = sheet.Cell(82,6).GetString().Replace("□", "✓");
                        break;
                    case "2":
                        sheet.Cell(84,6).Value = sheet.Cell(82,6).GetString().Replace("□", "✓");
                        break;
                    case "3":
                        sheet.Cell(86,6).Value = sheet.Cell(82,6).GetString().Replace("□", "✓");
                        break;
                    case "4":
                        sheet.Cell(88,6).Value = sheet.Cell(82,6).GetString().Replace("□", "✓");
                        break;
                    default:
                        break;
                }

                book.SaveAs(@"./template/output.xlsx");
            }
            
            byte[] bytes = System.IO.File.ReadAllBytes("./template/output.xlsx");
            return File(bytes, System.Net.Mime.MediaTypeNames.Application.Octet, "sample.xlsx");
        }

        private DateTime GetBirthDay(string dob)
        {
            // DateTime birthDay = new Dictionary<string, int>();
            string[] split =  dob.Split('/');
            DateTime birthDay = new DateTime(int.Parse(split[0]), int.Parse(split[1]), int.Parse(split[2]));

            return birthDay;
        }
        // 西暦→和暦変換
        private IDictionary<string, string> CEtoJE(DateTime sDate)
        {
            CultureInfo Japanese = new CultureInfo("ja-JP");
            Japanese.DateTimeFormat.Calendar = new JapaneseCalendar();
            string wDate = sDate.ToString("gg/y/M/d", Japanese);

            IDictionary<string, string> map = new Dictionary<string, string>();
            string[] split =  wDate.Split('/');

            map.Add("JE", split[0]);
            map.Add("Year", split[1]);
            map.Add("Month", split[2]);
            map.Add("Day", split[3]);

            return map;
        }

        /// <summary>
        /// 生年月日から年齢を計算する
        /// </summary>
        /// <param name="birthDate">生年月日</param>
        /// <param name="today">現在の日付</param>
        /// <returns>年齢</returns>
        private int GetAge(DateTime birthDate, DateTime today)
        {
            int age = today.Year - birthDate.Year;
            //現在の日付から年齢を引いた日付が誕生日より前ならば、1引く
            if (today.AddYears(-age) < birthDate)
            {
                age--;
            }

            return age;
        }

        private int PayrollIncomeDeduction(int income) {
            int salaryIncomeDeduction = 0;
            if (income >= 8500001)
            {
                salaryIncomeDeduction = 1950000;
            }
            else if (income >= 6600000)
            {
                salaryIncomeDeduction = (int)(income * 0.1) + 1100000;
            }
            else if (income >= 3600000)
            {
                salaryIncomeDeduction = (int)(income * 0.2) + 440000;
            }
            else if (income >= 1800000)
            {
                salaryIncomeDeduction = (int)(income * 0.3) + 80000;
            }
            else if (income >= 1625000)
            {
                salaryIncomeDeduction = (int)(income * 0.4) - 100000;
            }
            else if (income >= 551000) 
            {
                salaryIncomeDeduction = 550000; 
            }

            if (salaryIncomeDeduction > 0)
            {
                return income - salaryIncomeDeduction;
            }
            return salaryIncomeDeduction;
        }

        private string Classification1(int incomeQuote)
        {
            string classfication = "";
            if (incomeQuote <= 10000000) classfication = "C";
            if (incomeQuote <= 9500000) classfication = "B";
            if (incomeQuote <= 9000000) classfication = "A";
            return classfication;
        }
        private string BasicDeduction(int incomeQuote)
        {
            string basicDeduction = "";
            if (incomeQuote <= 25000000) basicDeduction = "16 万円";
            if (incomeQuote <= 24500000) basicDeduction = "32 万円";
            if (incomeQuote <= 24000000) basicDeduction = "48 万円";
            return basicDeduction;
        }

        private string Classification2(int incomeQuote, int age) {
            string classfication = "";
            if (incomeQuote <= 1330000) classfication = "④";
            if (incomeQuote <= 950000)  classfication = "③";
            if (incomeQuote <= 480000) classfication = age < 70 ?  "②" : "①";
            return classfication;
        }
        private string SpousalDeduction(string c1, string c2)
        {
            string spousalDeduction = "";
            if (c1 == "A")
            {
                if (c2 == "①") spousalDeduction = "48 万円";
                if (c2 == "②") spousalDeduction = "38 万円";
            }
            if (c1 == "B")
            {
                if (c2 == "①") spousalDeduction = "32 万円";
                if (c2 == "②") spousalDeduction = "26 万円";
            }
            if (c1 == "C")
            {
                if (c2 == "①") spousalDeduction = "16 万円";
                if (c2 == "②") spousalDeduction = "13 万円";
            }
            return spousalDeduction;
        }

        private string SpousalSpecialDeduction(string c1, string c2, int incomeQuote)
        {
            string spousalSpecialDeduction = "";
            if (c1 == "A")
            {
                if (c2 == "③") spousalSpecialDeduction = "38 万円";
                if (c2 == "④" && incomeQuote > 950000) spousalSpecialDeduction = "36 万円";
                else if (c2 == "④" && incomeQuote > 1000000) spousalSpecialDeduction = "31 万円";
                else if (c2 == "④" && incomeQuote > 1050000) spousalSpecialDeduction = "26 万円";
                else if (c2 == "④" && incomeQuote > 1100000) spousalSpecialDeduction = "21 万円";
                else if (c2 == "④" && incomeQuote > 1150000) spousalSpecialDeduction = "16 万円";
                else if (c2 == "④" && incomeQuote > 1200000) spousalSpecialDeduction = "11 万円";
                else if (c2 == "④" && incomeQuote > 1250000) spousalSpecialDeduction = "6 万円";
                else if (c2 == "④" && incomeQuote > 1300000 && incomeQuote <= 1330000) spousalSpecialDeduction = "3 万円";
            }
            if (c1 == "B")
            {
                if (c2 == "③") spousalSpecialDeduction = "26 万円";
                if (c2 == "④" && incomeQuote > 950000) spousalSpecialDeduction = "24 万円";
                else if (c2 == "④" && incomeQuote > 1000000) spousalSpecialDeduction = "21 万円";
                else if (c2 == "④" && incomeQuote > 1050000) spousalSpecialDeduction = "18 万円";
                else if (c2 == "④" && incomeQuote > 1100000) spousalSpecialDeduction = "14 万円";
                else if (c2 == "④" && incomeQuote > 1150000) spousalSpecialDeduction = "11 万円";
                else if (c2 == "④" && incomeQuote > 1200000) spousalSpecialDeduction = "8 万円";
                else if (c2 == "④" && incomeQuote > 1250000) spousalSpecialDeduction = "4 万円";
                else if (c2 == "④" && incomeQuote > 1300000 && incomeQuote <= 1330000) spousalSpecialDeduction = "2 万円";
            }
            if (c1 == "C")
            {
                if (c2 == "③") spousalSpecialDeduction = "13 万円";
                if (c2 == "④" && incomeQuote > 950000) spousalSpecialDeduction = "12 万円";
                else if (c2 == "④" && incomeQuote > 1000000) spousalSpecialDeduction = "11 万円";
                else if (c2 == "④" && incomeQuote > 1050000) spousalSpecialDeduction = "9 万円";
                else if (c2 == "④" && incomeQuote > 1100000) spousalSpecialDeduction = "7 万円";
                else if (c2 == "④" && incomeQuote > 1150000) spousalSpecialDeduction = "6 万円";
                else if (c2 == "④" && incomeQuote > 1200000) spousalSpecialDeduction = "4 万円";
                else if (c2 == "④" && incomeQuote > 1250000) spousalSpecialDeduction = "2 万円";
                else if (c2 == "④" && incomeQuote > 1300000 && incomeQuote <= 1330000) spousalSpecialDeduction = "1 万円";
            }
            return spousalSpecialDeduction;
        }
    }
}
