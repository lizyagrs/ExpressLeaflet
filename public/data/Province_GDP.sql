/*
Navicat PGSQL Data Transfer

Source Server         : server
Source Server Version : 100500
Source Host           : 47.106.158.161:5432
Source Database       : lightweightGIS
Source Schema         : public

Target Server Type    : PGSQL
Target Server Version : 100500
File Encoding         : 65001

Date: 2018-10-19 21:17:05
*/


-- ----------------------------
-- Table structure for province_gdp
-- ----------------------------
DROP TABLE IF EXISTS "public"."province_gdp";
CREATE TABLE "public"."province_gdp" (
"pro_code" varchar(255) COLLATE "default",
"pro_name" varchar(255) COLLATE "default",
"GDP" varchar(255) COLLATE "default",
"datayear" varchar(255) COLLATE "default"
)
WITH (OIDS=FALSE)

;
COMMENT ON COLUMN "public"."province_gdp"."pro_code" IS '行政区代码';
COMMENT ON COLUMN "public"."province_gdp"."pro_name" IS '行政区名称';
COMMENT ON COLUMN "public"."province_gdp"."GDP" IS 'GDP';
COMMENT ON COLUMN "public"."province_gdp"."datayear" IS '年份';

-- ----------------------------
-- Records of province_gdp
-- ----------------------------
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '10062.82', '2009');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '12359.33', '2010');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '15300.65', '2011');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '17212.05', '2012');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '19229.34', '2013');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '20848.75', '2014');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '22005.63', '2015');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '24407.62', '2016');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '7360.92', '2007');
INSERT INTO "public"."province_gdp" VALUES ('340000', '安徽省', '8851.66', '2008');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '11702.82', '2011');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '12948.88', '2012');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '14410.19', '2013');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '15714.63', '2014');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '16723.78', '2015');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '18499', '2016');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '5800.25', '2007');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '6971.05', '2008');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '7655.18', '2009');
INSERT INTO "public"."province_gdp" VALUES ('360000', '江西省', '9451.26', '2010');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '11328.92', '2008');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '12961.1', '2009');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '15967.61', '2010');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '19632.26', '2011');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '22250.45', '2012');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '24791.83', '2013');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '27379.22', '2014');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '29550.19', '2015');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '32665.38', '2016');
INSERT INTO "public"."province_gdp" VALUES ('420000', '湖北省', '9333.4', '2007');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '11555', '2008');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '13059.69', '2009');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '16037.96', '2010');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '19669.56', '2011');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '22154.23', '2012');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '24621.67', '2013');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '27037.32', '2014');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '28902.21', '2015');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '31551.37', '2016');
INSERT INTO "public"."province_gdp" VALUES ('430000', '湖南省', '9439.6', '2007');

-- ----------------------------
-- Alter Sequences Owned By 
-- ----------------------------
