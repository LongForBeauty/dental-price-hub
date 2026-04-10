-- ============================================================
-- Add price data for 30 new cities (Tier 2 expansion)
-- Run this in Supabase SQL Editor
-- 6 procedures × 30 cities = 180 rows
-- Cost-of-living multipliers applied per city
-- ============================================================

INSERT INTO prices (city, state, cdt_code, procedure_name, price_low, price_avg, price_high) VALUES

-- ── Charlotte, NC (multiplier: 0.92) ──────────────────────────
('Charlotte','NC','D6010','Dental Implant',1323,1886,2829),
('Charlotte','NC','D2740','Porcelain Crown',779,1173,1759),
('Charlotte','NC','D3330','Root Canal (Molar)',782,1182,1773),
('Charlotte','NC','D1110','Teeth Cleaning',63,90,135),
('Charlotte','NC','D7240','Wisdom Tooth Removal',254,363,545),
('Charlotte','NC','D8080','Adult Braces / Orthodontics',3762,5382,8073),

-- ── Jacksonville, FL (multiplier: 0.90) ───────────────────────
('Jacksonville','FL','D6010','Dental Implant',1294,1845,2768),
('Jacksonville','FL','D2740','Porcelain Crown',762,1148,1721),
('Jacksonville','FL','D3330','Root Canal (Molar)',765,1157,1735),
('Jacksonville','FL','D1110','Teeth Cleaning',62,88,132),
('Jacksonville','FL','D7240','Wisdom Tooth Removal',249,356,533),
('Jacksonville','FL','D8080','Adult Braces / Orthodontics',3677,5265,7898),

-- ── Columbus, OH (multiplier: 0.88) ───────────────────────────
('Columbus','OH','D6010','Dental Implant',1265,1804,2706),
('Columbus','OH','D2740','Porcelain Crown',745,1122,1683),
('Columbus','OH','D3330','Root Canal (Molar)',748,1131,1696),
('Columbus','OH','D1110','Teeth Cleaning',60,86,129),
('Columbus','OH','D7240','Wisdom Tooth Removal',243,348,521),
('Columbus','OH','D8080','Adult Braces / Orthodontics',3591,5148,7721),

-- ── Indianapolis, IN (multiplier: 0.87) ───────────────────────
('Indianapolis','IN','D6010','Dental Implant',1251,1784,2675),
('Indianapolis','IN','D2740','Porcelain Crown',736,1109,1663),
('Indianapolis','IN','D3330','Root Canal (Molar)',739,1118,1676),
('Indianapolis','IN','D1110','Teeth Cleaning',59,85,128),
('Indianapolis','IN','D7240','Wisdom Tooth Removal',240,344,515),
('Indianapolis','IN','D8080','Adult Braces / Orthodontics',3549,5090,7634),

-- ── San Jose, CA (multiplier: 1.35) ───────────────────────────
('San Jose','CA','D6010','Dental Implant',1940,2768,4151),
('San Jose','CA','D2740','Porcelain Crown',1141,1721,2581),
('San Jose','CA','D3330','Root Canal (Molar)',1146,1735,2602),
('San Jose','CA','D1110','Teeth Cleaning',92,132,198),
('San Jose','CA','D7240','Wisdom Tooth Removal',373,533,800),
('San Jose','CA','D8080','Adult Braces / Orthodontics',5511,7898,11846),

-- ── Fort Worth, TX (multiplier: 0.91) ─────────────────────────
('Fort Worth','TX','D6010','Dental Implant',1308,1866,2798),
('Fort Worth','TX','D2740','Porcelain Crown',770,1160,1740),
('Fort Worth','TX','D3330','Root Canal (Molar)',773,1169,1754),
('Fort Worth','TX','D1110','Teeth Cleaning',63,89,134),
('Fort Worth','TX','D7240','Wisdom Tooth Removal',251,359,539),
('Fort Worth','TX','D8080','Adult Braces / Orthodontics',3720,5324,7986),

-- ── Memphis, TN (multiplier: 0.85) ────────────────────────────
('Memphis','TN','D6010','Dental Implant',1222,1743,2613),
('Memphis','TN','D2740','Porcelain Crown',720,1084,1625),
('Memphis','TN','D3330','Root Canal (Molar)',722,1092,1638),
('Memphis','TN','D1110','Teeth Cleaning',58,83,125),
('Memphis','TN','D7240','Wisdom Tooth Removal',235,336,503),
('Memphis','TN','D8080','Adult Braces / Orthodontics',3464,4973,7459),

-- ── Baltimore, MD (multiplier: 1.05) ──────────────────────────
('Baltimore','MD','D6010','Dental Implant',1509,2153,3229),
('Baltimore','MD','D2740','Porcelain Crown',889,1339,2008),
('Baltimore','MD','D3330','Root Canal (Molar)',893,1349,2024),
('Baltimore','MD','D1110','Teeth Cleaning',72,103,154),
('Baltimore','MD','D7240','Wisdom Tooth Removal',291,415,622),
('Baltimore','MD','D8080','Adult Braces / Orthodontics',4291,6143,9214),

-- ── Louisville, KY (multiplier: 0.85) ─────────────────────────
('Louisville','KY','D6010','Dental Implant',1222,1743,2613),
('Louisville','KY','D2740','Porcelain Crown',720,1084,1625),
('Louisville','KY','D3330','Root Canal (Molar)',722,1092,1638),
('Louisville','KY','D1110','Teeth Cleaning',58,83,125),
('Louisville','KY','D7240','Wisdom Tooth Removal',235,336,503),
('Louisville','KY','D8080','Adult Braces / Orthodontics',3464,4973,7459),

-- ── Milwaukee, WI (multiplier: 0.90) ──────────────────────────
('Milwaukee','WI','D6010','Dental Implant',1294,1845,2768),
('Milwaukee','WI','D2740','Porcelain Crown',762,1148,1721),
('Milwaukee','WI','D3330','Root Canal (Molar)',765,1157,1735),
('Milwaukee','WI','D1110','Teeth Cleaning',62,88,132),
('Milwaukee','WI','D7240','Wisdom Tooth Removal',249,356,533),
('Milwaukee','WI','D8080','Adult Braces / Orthodontics',3677,5265,7898),

-- ── Albuquerque, NM (multiplier: 0.88) ────────────────────────
('Albuquerque','NM','D6010','Dental Implant',1265,1804,2706),
('Albuquerque','NM','D2740','Porcelain Crown',745,1122,1683),
('Albuquerque','NM','D3330','Root Canal (Molar)',748,1131,1696),
('Albuquerque','NM','D1110','Teeth Cleaning',60,86,129),
('Albuquerque','NM','D7240','Wisdom Tooth Removal',243,348,521),
('Albuquerque','NM','D8080','Adult Braces / Orthodontics',3591,5148,7721),

-- ── Tucson, AZ (multiplier: 0.87) ─────────────────────────────
('Tucson','AZ','D6010','Dental Implant',1251,1784,2675),
('Tucson','AZ','D2740','Porcelain Crown',736,1109,1663),
('Tucson','AZ','D3330','Root Canal (Molar)',739,1118,1676),
('Tucson','AZ','D1110','Teeth Cleaning',59,85,128),
('Tucson','AZ','D7240','Wisdom Tooth Removal',240,344,515),
('Tucson','AZ','D8080','Adult Braces / Orthodontics',3549,5090,7634),

-- ── Sacramento, CA (multiplier: 1.10) ─────────────────────────
('Sacramento','CA','D6010','Dental Implant',1581,2255,3383),
('Sacramento','CA','D2740','Porcelain Crown',931,1403,2104),
('Sacramento','CA','D3330','Root Canal (Molar)',935,1414,2120),
('Sacramento','CA','D1110','Teeth Cleaning',75,108,162),
('Sacramento','CA','D7240','Wisdom Tooth Removal',305,435,652),
('Sacramento','CA','D8080','Adult Braces / Orthodontics',4506,6435,9652),

-- ── Kansas City, MO (multiplier: 0.88) ────────────────────────
('Kansas City','MO','D6010','Dental Implant',1265,1804,2706),
('Kansas City','MO','D2740','Porcelain Crown',745,1122,1683),
('Kansas City','MO','D3330','Root Canal (Molar)',748,1131,1696),
('Kansas City','MO','D1110','Teeth Cleaning',60,86,129),
('Kansas City','MO','D7240','Wisdom Tooth Removal',243,348,521),
('Kansas City','MO','D8080','Adult Braces / Orthodontics',3591,5148,7721),

-- ── Omaha, NE (multiplier: 0.85) ──────────────────────────────
('Omaha','NE','D6010','Dental Implant',1222,1743,2613),
('Omaha','NE','D2740','Porcelain Crown',720,1084,1625),
('Omaha','NE','D3330','Root Canal (Molar)',722,1092,1638),
('Omaha','NE','D1110','Teeth Cleaning',58,83,125),
('Omaha','NE','D7240','Wisdom Tooth Removal',235,336,503),
('Omaha','NE','D8080','Adult Braces / Orthodontics',3464,4973,7459),

-- ── Raleigh, NC (multiplier: 0.95) ────────────────────────────
('Raleigh','NC','D6010','Dental Implant',1366,1948,2921),
('Raleigh','NC','D2740','Porcelain Crown',804,1211,1817),
('Raleigh','NC','D3330','Root Canal (Molar)',808,1221,1831),
('Raleigh','NC','D1110','Teeth Cleaning',65,93,140),
('Raleigh','NC','D7240','Wisdom Tooth Removal',261,375,563),
('Raleigh','NC','D8080','Adult Braces / Orthodontics',3891,5558,8336),

-- ── Colorado Springs, CO (multiplier: 0.92) ───────────────────
('Colorado Springs','CO','D6010','Dental Implant',1323,1886,2829),
('Colorado Springs','CO','D2740','Porcelain Crown',779,1173,1759),
('Colorado Springs','CO','D3330','Root Canal (Molar)',782,1182,1773),
('Colorado Springs','CO','D1110','Teeth Cleaning',63,90,135),
('Colorado Springs','CO','D7240','Wisdom Tooth Removal',254,363,545),
('Colorado Springs','CO','D8080','Adult Braces / Orthodontics',3762,5382,8073),

-- ── Virginia Beach, VA (multiplier: 0.95) ─────────────────────
('Virginia Beach','VA','D6010','Dental Implant',1366,1948,2921),
('Virginia Beach','VA','D2740','Porcelain Crown',804,1211,1817),
('Virginia Beach','VA','D3330','Root Canal (Molar)',808,1221,1831),
('Virginia Beach','VA','D1110','Teeth Cleaning',65,93,140),
('Virginia Beach','VA','D7240','Wisdom Tooth Removal',261,375,563),
('Virginia Beach','VA','D8080','Adult Braces / Orthodontics',3891,5558,8336),

-- ── Oakland, CA (multiplier: 1.30) ────────────────────────────
('Oakland','CA','D6010','Dental Implant',1869,2665,3998),
('Oakland','CA','D2740','Porcelain Crown',1100,1658,2486),
('Oakland','CA','D3330','Root Canal (Molar)',1105,1671,2506),
('Oakland','CA','D1110','Teeth Cleaning',89,127,191),
('Oakland','CA','D7240','Wisdom Tooth Removal',360,514,770),
('Oakland','CA','D8080','Adult Braces / Orthodontics',5312,7605,11408),

-- ── Tampa, FL (multiplier: 0.95) ──────────────────────────────
('Tampa','FL','D6010','Dental Implant',1366,1948,2921),
('Tampa','FL','D2740','Porcelain Crown',804,1211,1817),
('Tampa','FL','D3330','Root Canal (Molar)',808,1221,1831),
('Tampa','FL','D1110','Teeth Cleaning',65,93,140),
('Tampa','FL','D7240','Wisdom Tooth Removal',261,375,563),
('Tampa','FL','D8080','Adult Braces / Orthodontics',3891,5558,8336),

-- ── Arlington, TX (multiplier: 0.93) ──────────────────────────
('Arlington','TX','D6010','Dental Implant',1337,1907,2860),
('Arlington','TX','D2740','Porcelain Crown',787,1186,1778),
('Arlington','TX','D3330','Root Canal (Molar)',790,1195,1792),
('Arlington','TX','D1110','Teeth Cleaning',64,91,136),
('Arlington','TX','D7240','Wisdom Tooth Removal',257,367,550),
('Arlington','TX','D8080','Adult Braces / Orthodontics',3805,5441,8161),

-- ── New Orleans, LA (multiplier: 0.93) ────────────────────────
('New Orleans','LA','D6010','Dental Implant',1337,1907,2860),
('New Orleans','LA','D2740','Porcelain Crown',787,1186,1778),
('New Orleans','LA','D3330','Root Canal (Molar)',790,1195,1792),
('New Orleans','LA','D1110','Teeth Cleaning',64,91,136),
('New Orleans','LA','D7240','Wisdom Tooth Removal',257,367,550),
('New Orleans','LA','D8080','Adult Braces / Orthodontics',3805,5441,8161),

-- ── Cleveland, OH (multiplier: 0.87) ──────────────────────────
('Cleveland','OH','D6010','Dental Implant',1251,1784,2675),
('Cleveland','OH','D2740','Porcelain Crown',736,1109,1663),
('Cleveland','OH','D3330','Root Canal (Molar)',739,1118,1676),
('Cleveland','OH','D1110','Teeth Cleaning',59,85,128),
('Cleveland','OH','D7240','Wisdom Tooth Removal',240,344,515),
('Cleveland','OH','D8080','Adult Braces / Orthodontics',3549,5090,7634),

-- ── Anaheim, CA (multiplier: 1.20) ────────────────────────────
('Anaheim','CA','D6010','Dental Implant',1724,2460,3690),
('Anaheim','CA','D2740','Porcelain Crown',1015,1530,2295),
('Anaheim','CA','D3330','Root Canal (Molar)',1019,1542,2313),
('Anaheim','CA','D1110','Teeth Cleaning',82,118,176),
('Anaheim','CA','D7240','Wisdom Tooth Removal',332,474,711),
('Anaheim','CA','D8080','Adult Braces / Orthodontics',4906,7020,10530),

-- ── Long Beach, CA (multiplier: 1.20) ─────────────────────────
('Long Beach','CA','D6010','Dental Implant',1724,2460,3690),
('Long Beach','CA','D2740','Porcelain Crown',1015,1530,2295),
('Long Beach','CA','D3330','Root Canal (Molar)',1019,1542,2313),
('Long Beach','CA','D1110','Teeth Cleaning',82,118,176),
('Long Beach','CA','D7240','Wisdom Tooth Removal',332,474,711),
('Long Beach','CA','D8080','Adult Braces / Orthodontics',4906,7020,10530),

-- ── Wichita, KS (multiplier: 0.82) ────────────────────────────
('Wichita','KS','D6010','Dental Implant',1179,1681,2521),
('Wichita','KS','D2740','Porcelain Crown',694,1046,1568),
('Wichita','KS','D3330','Root Canal (Molar)',697,1054,1581),
('Wichita','KS','D1110','Teeth Cleaning',56,80,120),
('Wichita','KS','D7240','Wisdom Tooth Removal',227,324,485),
('Wichita','KS','D8080','Adult Braces / Orthodontics',3338,4797,7195),

-- ── Fresno, CA (multiplier: 0.92) ─────────────────────────────
('Fresno','CA','D6010','Dental Implant',1323,1886,2829),
('Fresno','CA','D2740','Porcelain Crown',779,1173,1759),
('Fresno','CA','D3330','Root Canal (Molar)',782,1182,1773),
('Fresno','CA','D1110','Teeth Cleaning',63,90,135),
('Fresno','CA','D7240','Wisdom Tooth Removal',254,363,545),
('Fresno','CA','D8080','Adult Braces / Orthodontics',3762,5382,8073),

-- ── Richmond, VA (multiplier: 0.95) ───────────────────────────
('Richmond','VA','D6010','Dental Implant',1366,1948,2921),
('Richmond','VA','D2740','Porcelain Crown',804,1211,1817),
('Richmond','VA','D3330','Root Canal (Molar)',808,1221,1831),
('Richmond','VA','D1110','Teeth Cleaning',65,93,140),
('Richmond','VA','D7240','Wisdom Tooth Removal',261,375,563),
('Richmond','VA','D8080','Adult Braces / Orthodontics',3891,5558,8336),

-- ── Bakersfield, CA (multiplier: 0.90) ────────────────────────
('Bakersfield','CA','D6010','Dental Implant',1294,1845,2768),
('Bakersfield','CA','D2740','Porcelain Crown',762,1148,1721),
('Bakersfield','CA','D3330','Root Canal (Molar)',765,1157,1735),
('Bakersfield','CA','D1110','Teeth Cleaning',62,88,132),
('Bakersfield','CA','D7240','Wisdom Tooth Removal',249,356,533),
('Bakersfield','CA','D8080','Adult Braces / Orthodontics',3677,5265,7898),

-- ── Orlando, FL (multiplier: 0.95) ────────────────────────────
('Orlando','FL','D6010','Dental Implant',1366,1948,2921),
('Orlando','FL','D2740','Porcelain Crown',804,1211,1817),
('Orlando','FL','D3330','Root Canal (Molar)',808,1221,1831),
('Orlando','FL','D1110','Teeth Cleaning',65,93,140),
('Orlando','FL','D7240','Wisdom Tooth Removal',261,375,563),
('Orlando','FL','D8080','Adult Braces / Orthodontics',3891,5558,8336)

ON CONFLICT (city, state, cdt_code) DO UPDATE SET
  price_low  = EXCLUDED.price_low,
  price_avg  = EXCLUDED.price_avg,
  price_high = EXCLUDED.price_high;
