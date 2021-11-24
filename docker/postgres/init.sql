-- CREATE DATABASE "end_year_tax_adjustment";

CREATE TABLE "ApplicationUser" (
    "ApplicationUserId" integer GENERATED BY DEFAULT AS IDENTITY,
    "Email" text NOT NULL,
    "Password" text NOT NULL,
    CONSTRAINT "PK_ApplicationUser" PRIMARY KEY ("ApplicationUserId")
);

CREATE TABLE "BasicInfo" (
    "BasicInfoId" integer GENERATED BY DEFAULT AS IDENTITY,
    "ApplicationUserId" integer NOT NULL,
    "Company" text NULL,
    "StuffNum" text NULL,
    "CompanyAddress" text NULL,
    "TaxOffice" text NULL,
    "StuffName" text NULL,
    "StuffRuby" text NULL,
    "StuffAddress" text NULL,
    "PartnerNum" text NULL,
    "PartnerName" text NULL,
    "PartnerRuby" text NULL,
    "PartnerAddress" text NULL,
    "PartnerBD" text NULL,
    CONSTRAINT "PK_BasicInfo" PRIMARY KEY ("BasicInfoId")
);

CREATE TABLE "IncomeCal" (
    "IncomeCalId" integer GENERATED BY DEFAULT AS IDENTITY,
    "ApplicationUserId" integer NOT NULL,
    "Income1" integer NOT NULL,
    "BussinessInc1" integer NOT NULL,
    "BussinessExp1" integer NOT NULL,
    "MiscellaneousInc1" integer NOT NULL,
    "MiscellaneousExp1" integer NOT NULL,
    "DividendInc1" integer NOT NULL,
    "DividendExp1" integer NOT NULL,
    "PropertyInc1" integer NOT NULL,
    "PropertyExp1" integer NOT NULL,
    "RetirementInc1" integer NOT NULL,
    "RetirementExp1" integer NOT NULL,
    "ExceptInc1" integer NOT NULL,
    "ExceptExp1" integer NOT NULL,
    "Income2" integer NOT NULL,
    "BussinessInc2" integer NOT NULL,
    "BussinessExp2" integer NOT NULL,
    "MiscellaneousInc2" integer NOT NULL,
    "MiscellaneousExp2" integer NOT NULL,
    "DividendInc2" integer NOT NULL,
    "DividendExp2" integer NOT NULL,
    "PropertyInc2" integer NOT NULL,
    "PropertyExp2" integer NOT NULL,
    "RetirementInc2" integer NOT NULL,
    "RetirementExp2" integer NOT NULL,
    "ExceptInc2" integer NOT NULL,
    "ExceptExp2" integer NOT NULL,
    CONSTRAINT "PK_IncomeCal" PRIMARY KEY ("IncomeCalId")
);

CREATE TABLE "IncomeAdjust" (
    "IncomeAdjustId" integer GENERATED BY DEFAULT AS IDENTITY,
    "ApplicationUserId" integer NOT NULL,
    "RadioGroup" text NOT NULL,
    "DependentsNum" text NULL,
    "DependentsDB" text NULL,
    "DependentsName" text NULL,
    "DependentsRuby" text NULL,
    "DependentsAdr" text NULL,
    "DependentsRel" text NULL,
    "DependentsInc" text NULL,
    "DependentsPrsEvid" text NULL,
    CONSTRAINT "PK_IncomeAdjust" PRIMARY KEY ("IncomeAdjustId")
);