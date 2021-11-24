using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace myapp.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUser",
                columns: table => new
                {
                    ApplicationUserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUser", x => x.ApplicationUserId);
                });

            migrationBuilder.CreateTable(
                name: "BasicInfo",
                columns: table => new
                {
                    BasicInfoId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApplicationUserId = table.Column<int>(type: "integer", nullable: false),
                    Company = table.Column<string>(type: "text", nullable: false),
                    StuffNum = table.Column<string>(type: "text", nullable: false),
                    CompanyAddress = table.Column<string>(type: "text", nullable: false),
                    TaxOffice = table.Column<string>(type: "text", nullable: false),
                    StuffName = table.Column<string>(type: "text", nullable: false),
                    StuffRuby = table.Column<string>(type: "text", nullable: false),
                    StuffAddress = table.Column<string>(type: "text", nullable: false),
                    PartnerNum = table.Column<string>(type: "text", nullable: true),
                    PartnerName = table.Column<string>(type: "text", nullable: true),
                    PartnerRuby = table.Column<string>(type: "text", nullable: true),
                    PartnerAddress = table.Column<string>(type: "text", nullable: true),
                    PartnerBD = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasicInfo", x => x.BasicInfoId);
                });

            migrationBuilder.CreateTable(
                name: "IncomeAdjust",
                columns: table => new
                {
                    IncomeAdjustId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApplicationUserId = table.Column<int>(type: "integer", nullable: false),
                    RadioGroup = table.Column<string>(type: "text", nullable: false),
                    DependentsNum = table.Column<string>(type: "text", nullable: true),
                    DependentsDB = table.Column<string>(type: "text", nullable: true),
                    DependentsName = table.Column<string>(type: "text", nullable: true),
                    DependentsRuby = table.Column<string>(type: "text", nullable: true),
                    DependentsAdr = table.Column<string>(type: "text", nullable: true),
                    DependentsRel = table.Column<string>(type: "text", nullable: true),
                    DependentsInc = table.Column<string>(type: "text", nullable: true),
                    DependentsPrsEvid = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncomeAdjust", x => x.IncomeAdjustId);
                });

            migrationBuilder.CreateTable(
                name: "IncomeCal",
                columns: table => new
                {
                    IncomeCalId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApplicationUserId = table.Column<int>(type: "integer", nullable: false),
                    Income1 = table.Column<int>(type: "integer", nullable: false),
                    BussinessInc1 = table.Column<int>(type: "integer", nullable: false),
                    BussinessExp1 = table.Column<int>(type: "integer", nullable: false),
                    MiscellaneousInc1 = table.Column<int>(type: "integer", nullable: false),
                    MiscellaneousExp1 = table.Column<int>(type: "integer", nullable: false),
                    DividendInc1 = table.Column<int>(type: "integer", nullable: false),
                    DividendExp1 = table.Column<int>(type: "integer", nullable: false),
                    PropertyInc1 = table.Column<int>(type: "integer", nullable: false),
                    PropertyExp1 = table.Column<int>(type: "integer", nullable: false),
                    RetirementInc1 = table.Column<int>(type: "integer", nullable: false),
                    RetirementExp1 = table.Column<int>(type: "integer", nullable: false),
                    ExceptInc1 = table.Column<int>(type: "integer", nullable: false),
                    ExceptExp1 = table.Column<int>(type: "integer", nullable: false),
                    Income2 = table.Column<int>(type: "integer", nullable: false),
                    BussinessInc2 = table.Column<int>(type: "integer", nullable: false),
                    BussinessExp2 = table.Column<int>(type: "integer", nullable: false),
                    MiscellaneousInc2 = table.Column<int>(type: "integer", nullable: false),
                    MiscellaneousExp2 = table.Column<int>(type: "integer", nullable: false),
                    DividendInc2 = table.Column<int>(type: "integer", nullable: false),
                    DividendExp2 = table.Column<int>(type: "integer", nullable: false),
                    PropertyInc2 = table.Column<int>(type: "integer", nullable: false),
                    PropertyExp2 = table.Column<int>(type: "integer", nullable: false),
                    RetirementInc2 = table.Column<int>(type: "integer", nullable: false),
                    RetirementExp2 = table.Column<int>(type: "integer", nullable: false),
                    ExceptInc2 = table.Column<int>(type: "integer", nullable: false),
                    ExceptExp2 = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncomeCal", x => x.IncomeCalId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUser");

            migrationBuilder.DropTable(
                name: "BasicInfo");

            migrationBuilder.DropTable(
                name: "IncomeAdjust");

            migrationBuilder.DropTable(
                name: "IncomeCal");
        }
    }
}
