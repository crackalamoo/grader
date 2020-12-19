/*
       JavaScript functions for the Fourmilab Calendar Converter

                  by John Walker  --  September, MIM
              http://www.fourmilab.ch/documents/calendar/

                This program is in the public domain.
*/

/*  You may notice that a variety of array variables logically local
    to functions are declared globally here.  In JavaScript, construction
    of an array variable from source code occurs as the code is
    interpreted.  Making these variables pseudo-globals permits us
    to avoid overhead constructing and disposing of them in each
    call on the function in which whey are used.  */

const J0000 = 1721424.5;                // Julian date of Gregorian epoch: 0000-01-01
const J1970 = 2440587.5;                // Julian date at Unix epoch: 1970-01-01
const JMJD  = 2400000.5;                // Epoch of Modified Julian Date system
const J1900 = 2415020.5;                // Epoch (day 1) of Excel 1900 date system (PC)
const J1904 = 2416480.5;                // Epoch (day 0) of Excel 1904 date system (Mac)
var SUNRISE = 0.25;                     // Time of day when sunrise occurs (0.25 is 6:00)
var SUNSET = 0.75;                      // Time of day when sunset occurs (0.75 is 18:00)
var FORCE_INDIA = false;                // Force location of India (23.18 N, 82.50 E) throughout program
var FORCE_MECCA = false;                // Force location of Mecca throughout program
var FORCE_BEIJING = false;              // Force location of Beijing throughout program
const ISLAMIC_CALCULATIONS = {"karachi": [18, 18], "mwl": [18, 17], "plainfield": [15, 15],
  "singapore": [20, 18]};
const HOLIDAYS_GREGORIAN = {"0,1": [["Gregorian New Year", "Haitian Independence Day"], [1583, 1804]],
  "1,14": [["Valentine's Day"], [1583]], "7,17": [["Indonesian Independence Day"], [1945]],
  "9,31": [["Halloween"], [835]], "6,4": [["American Independence Day"], [1776]], "7,14": [["Pakistani Independence Day"], [1947]],
  "7,15": [["Indian Independence Day", "Assumption of Mary"], [1947, 600]],
  "11,25": [["Christmas"], [379]], "11,31": [["New Year's Eve"], [1583]],
  "7,19": [["Afghan Independence Day"], [1919]], "6,5": [["Algerian Independence Day"], [1962]],
  "10,11": [["Angolan Independence Day", "Veterans Day (USA)", "Remembrance Day"], [1975, 1919, 1919]], "4,25": [["Argentinian Independence Day"], [1816]],
  "0,26": [["Australia Day"], [1788]], "2,26": [["Bangladeshi Independence Day"], [1971]],
  "7,6": [["Bolivian Independence Day"], [1825]], "8,7": [["Brazilian Independence Day"], [1822]],
  "6,1": [["Canada Day"], [1867]], "6,14": [["Bastille Day"], [1789]], "9,3": [["German Unity Day"], [1990]],
  "2,17": [["Saint Patrick's Day"], [1583]], "1,11": [["Japanese National Foundation Day"], [1873]],
  "5,26": [["Malagasy Independence Day"], [1960]], "7,31": [["Malaysian Independence Day"], [1957]],
  "8,16": [["Mexican Independence Day"], [1810]], "2,1": [["Saint David's Day"], [1753]],
  "1,21": [["International Mother Language Day"], [2000]], "10,2": [["Day of the Dead", "All Saints' Day"], [1990, 835]],
  "2,23": [["Pakistan Day"], [1940]], "10,9": [["Iqbal Day"], [1877]], "11,24": [["Christmas Eve"], [379]],
  "1,19": [["Shivaji Jayanti (Gregorian calendar)"], [1870]], "9,2": [["Birthday of Mahatma Gandhi"], [1869]],
  "4,1": [["May Day", "Labour Day"], [1583, 1891]], "1,6": [["Waitangi Day"], [1934]], "6,18": [["Nelson Mandela Day"], [2009]],
  "3,22": [["Earth Day"], [1970]], "4,5": [["Cinco de Mayo"], [1862]], "5,19": [["Juneteenth"], [1865]],
  "2,14": [["Pi Day", "Birthday of Albert Einstein"], [1988, 1879]], "9,12": [["Columbus Day"], [1792]],
  "11,26": [["Boxing Day", "Saint Stephen's Day"], [1871, 415]], "4,7": [["Birthday of Rabindranath Tagore"], [1861]],
  "10,1": [["All Souls' Day"], [835]], "5,11": [["Kamehameha Day"], [1871]], "0,6": [["Epiphany"], [361]],
  "1,2": [["Groundhog Day"], [1887]], "4,4": [["Star Wars Day"], [1979]], "4,9": [["Victory Day"], [1965]],
  "5,12": [["Russia Day"], [1992]], "11,6": [["Saint Nicholas Day"], [344]]
};
const HOLIDAYS_ISLAMIC = {"10,1": [["Eid al-Fitr", "Chaand Raat"], [1, 600]], "1,10": [["Ashura"], [61]],
  "12,10": [["Eid al-Adha"], [1]], "9,1": [["Start of Ramadan"], [-12]],
  "12,8": [["Start of Hajj"], [10]]};
const HOLIDAYS_HINDU = {"12,16": [["Holi"], [1867205]],
  "6,4": [["Ganesh Chaturthi"], [2344893]], "5,23": [["Krishna Janmashtami"], [1173245]], "11,28": [["Maha Shivaratri"], [1994991]],
  "2,15": [["Buddha Purnima"], [1515428]], "5,15": [["Raksha Bandhan"], [1867156]], "7,10": [["Dussehra"], [1447493]],
  "11,5": [["Basant Panchami"]], "10,15": [["Thaipoosam"], [1976806]], "12,20": [["Rang Panchami"], [1867205]],
  "1,1": [["Gudi Padwa", "Cheti Chand", "Ugadi"], [1484017, 2088935, 1173245]], "3,15": [["Vat Purnima"], [1173245]], "4,2": [["Ratha Jatra"], [2250738]],
  "7,1": [["Start of Navratri"], [2122900]], "5,5": [["Naga Panchami"], [1447493]], "1,9": [["Rama Navami"], [1484017]],
  "7,15": [["Valmiki Jayanti"], [1484017]], "12,17": [["Hola Mohalla"], [2342402]], "11,15": [["Magha Puja", "Guru Ravidas Jayanti"], [2415020, 2280232]],
  "8,15": [["Guru Nanak Gurpurab"], [2257942]], "12,18": [["Shivaji Jayanti (Hindu calendar)"], [2316454]],
  "12,15": [["Holika Dahan", "Chhoti Holi"], [1867205, 1867205]], "1,13": [["Mahavir Jayanti"], [1502693]], "7,19": [["Karva Chauth"]],
  "8,6": [["Chhath"]], "4,15": [["Asalha Puja", "Guru Purnima"], [1575359]], "9,11": [["Gita Jayanti"]],
  "10,7": [["Guru Gobind Singh Jayanti"], [2329462]], "2,3": [["Akha Teej"]], "1,6": [["Yamuna Chhath"]],
  "1,15": [["Hanuman Jayanti"], [1484017]], "9,15": [["Datta Jayanti"], [2232672]],
  };
const HOLIDAYS_HEBREW = {"7,1": ["Rosh Hashanah"], "7,10": ["Yom Kippur"],
  "9,25": ["Start of Hanukkah"], "1,15": ["Start of Passover"],
  "7,15": ["Start of Sukkot"], "3,6": ["Shavuot"], "1,27": ["Yom HaShoah"],
  "5,9": ["Tisha B'Av"], "3,7": ["Shavuot"]};
const HOLIDAYS_JULIAN = {"12,25": [["Orthodox Christmas"], [1582]], "1,1": [["Julian New Year"], [1]],
  "12,27": [["Saint Stephen's Day (Orthodox)"], [1582]], "1,6": [["Epiphany (Orthodox)"], [1583]],
  "8,15": [["Assumption of Mary (Orthodox)"], [1583]], "12,6": [["Saint Nicholas Day (Orthodox)"], [1582]]};
function gregorianHolidays(year, mon, mday, j=null, longPeriods=true) {
  let holidays = [];
  if (j == null) j = gregorian_to_jd(year, mon+1, mday);
  if (j < 2299160.5) {
    // Use Julian calendar before Gregorian adoption in 1582
    let julcal = jd_to_julian(j);
    year = julcal[0];
    mon = julcal[1]-1;
    mday = julcal[2];
  }
  if (HOLIDAYS_GREGORIAN[mon + "," + mday] != undefined) {
    for (var i = 0; i < HOLIDAYS_GREGORIAN[mon + "," + mday][0].length; i++)
      if (HOLIDAYS_GREGORIAN[mon + "," + mday][1] == undefined ||
            HOLIDAYS_GREGORIAN[mon + "," + mday][1][i] == undefined ||
            year >= HOLIDAYS_GREGORIAN[mon + "," + mday][1][i])
        holidays.push(HOLIDAYS_GREGORIAN[mon + "," + mday][0][i]);
  }
  if (longPeriods && year >= 1966 && ((mon == 11 && mday >= 26) || (mon == 0 && mday == 1))) holidays.push("Kwanzaa");
  if (j == weekday_in_month(year, 11, 4, 4) && year >= 1800) holidays.push("Thanksgiving");
  if (j == weekday_in_month(year, 10, 1, 2) && year >= 1957) holidays.push("Thanksgiving (Canada)");
  if (j == weekday_in_month(year, 1, 1, 3) && year >= 1986) holidays.push("Martin Luther King Jr. Day");
  if (j == weekday_in_month(year, 2, 1, 3) && year >= 1968) holidays.push("Presidents' Day");
  if (j == weekday_in_month(year, 9, 1, 1) && year >= 1887) holidays.push("Labor Day (USA/Canada)");
  if (j == weekday_in_month(year, 10, 1, 2) && year >= 1937) holidays.push("Columbus Day (USA)");
  if (j == weekday_in_month(year, 10, 1, 2) && year >= 1992) holidays.push("Indigenous Peoples' Day (USA)");
  if (j == weekday_in_month(year, 6, 1, 1)-7 && year >= 1970) holidays.push("Memorial Day (USA)");
  let easter = computus(year);
  if (j == easter && year >= 325) holidays.push("Easter Sunday");
  if (j == easter-2 && year >= 325) holidays.push("Good Friday");
  if (j == easter+49 && year >= 325) holidays.push("Pentecost");
  if (j == easter-47 && year >= 1699) holidays.push("Mardi Gras");
  return holidays;
}
function hebrewHolidays(hebcal, longPeriods=true) {
  let holidays = [];
  if (hebcal[0] >= 2250) {
    if (HOLIDAYS_HEBREW[hebcal[1] + "," + hebcal[2]] != undefined) {
      for (var i = 0; i < HOLIDAYS_HEBREW[hebcal[1] + "," + hebcal[2]].length; i++)
        holidays.push(HOLIDAYS_HEBREW[hebcal[1] + "," + hebcal[2]][i]);
    }
    let hanukkah_end = 2;
    if ([353, 383].indexOf(hebrew_year_days(hebcal[0])) != -1)
      hanukkah_end = 3;
    if ((hebcal[1] == 9 && hebcal[2] >= 25 && longPeriods)
          || (hebcal[1] == 10 && hebcal[2] <= hanukkah_end && longPeriods)) {
      holidays.push("Hanukkah");
    }
    if (hebcal[1] == 1 && 15 <= hebcal[2] && hebcal[2] <= 21 && longPeriods) holidays.push("Passover");
    if (hebcal[1] == 7 && 15 <= hebcal[2] && hebcal[2] <= 21 && longPeriods) holidays.push("Sukkot");
    if (hebcal[1] == 7 && hebcal[2] <= 10 && longPeriods) holidays.push("Ten Days of Repentance");
    if ((hebrew_year_days(hebcal[0]) < 370 && hebcal[1] == 12 && hebcal[2] == 14)
          || (hebcal[1] == 13 && hebcal[2] == 14)) holidays.push("Purim");
  }
  return holidays;
}
function julianHolidays(julcal) {
  let holidays = [];
  if (HOLIDAYS_JULIAN[julcal[1] + "," + julcal[2]] != undefined) {
    for (var i = 0; i < HOLIDAYS_JULIAN[julcal[1] + "," + julcal[2]][0].length; i++)
      if (HOLIDAYS_JULIAN[julcal[1] + "," + julcal[2]][1] == undefined ||
            HOLIDAYS_JULIAN[julcal[1] + "," + julcal[2]][1][i] == undefined ||
            julcal[0] >= HOLIDAYS_JULIAN[julcal[1] + "," + julcal[2]][1][i])
        holidays.push(HOLIDAYS_JULIAN[julcal[1] + "," + julcal[2]][0][i]);
  }
  return holidays;
}
function islamicHolidays(islcal, longPeriods=true) {
  let holidays = [];
  if (HOLIDAYS_ISLAMIC[islcal[1] + "," + islcal[2]] != undefined) {
    for (var i = 0; i < HOLIDAYS_ISLAMIC[islcal[1] + "," + islcal[2]][0].length; i++)
      if (HOLIDAYS_ISLAMIC[islcal[1] + "," + islcal[2]][1] == undefined ||
            HOLIDAYS_ISLAMIC[islcal[1] + "," + islcal[2]][1][i] == undefined ||
            islcal[0] >= HOLIDAYS_ISLAMIC[islcal[1] + "," + islcal[2]][1][i])
        holidays.push(HOLIDAYS_ISLAMIC[islcal[1] + "," + islcal[2]][0][i]);
  }
  if (islcal[1] == 9 && islcal[0] >= -12) {
    if (longPeriods) holidays.push("Ramadan");
    if (islcal[2] == 27)
      holidays.push("Laylat al-Qadr (Traditional date)");
  }
  if (islcal[1] == 12 && 8 <= islcal[2] && islcal[2] <= 12 && longPeriods && islcal[0] >= 10) holidays.push("Hajj");
  if (islamic_to_jd(islcal[0], islcal[1], islcal[2]) ==
        weekday_before(5, islamic_to_jd(islcal[0], 9, 30)) && islcal[0] >= -12)
    holidays.push("Jum'at ul-Wida'");
  return holidays;
}

var hinduDiwali = {};

function hinduHolidays(hinducal, j, longPeriods=true) {
  var shiftBack = false;
  var shiftDate = -1;
  var holidays = [];
  FORCE_INDIA = document.hinducalendar.india.checked;
  if (j >= 2086302 && (hinducal[1] == 7 || hinducal[1] == 8) && hinducal[3] != 1) {
    let diwaliDays = [];
    let diwaliDates = [[7,28], [7,29], [7,30], [8,1], [8,2]];
    let wrongDiwali = [[7,29], [7,30], [8,1], [8,2], [8,3]];
    if (POONAM) {
      diwaliDates = [[8,13], [8,14], [8,15], [8,16], [8,17]];
      wrongDiwali = [[8,14], [8,15], [8,16], [8,17], [8,18]];
    }
    let diwali = hinduDiwali[hinducal[0]-HINDU_OFFSET];
    if (diwali == undefined) {
      hinduDiwali[hinducal[0]-HINDU_OFFSET] = Math.floor(divasa_to_jd(hinducal[0], diwaliDates[2][0], diwaliDates[2][1], false)-0.5)+0.5;
      diwali = hinduDiwali[hinducal[0]-HINDU_OFFSET];
    }
    for (var i = 0; i < 5; i++) {
      let dayJd = diwali+i-2
      diwaliDays.push(jd_to_hindu(dayJd+sunTimes_jd(dayJd, 0, true)));
    }
    for (var i = 0; i < 5; i++) {
      if (diwaliDays[i][2] == wrongDiwali[i][1]) {
        shiftDate = i;
      }
    }
    if (diwaliDays[2][2] == wrongDiwali[0][1]) {
      diwaliDates[0][1]--;
      diwaliDates[1][1]--;
    }
    if (shiftDate != -1) {
      for (var i = 0; i < shiftDate; i++) {
        diwaliDates[i][1]--;
        if (diwaliDates[i][1] == 0) {
          diwaliDates[i][0]--;
          diwaliDates[i][1] = 30;
        }
      }
      for (var i = shiftDate+1; i < 5; i++) {
        diwaliDates[i][1]++;
        if (diwaliDates[i][1] == 31) {
          diwaliDates[i][0]++;
          diwaliDates[i][1] = 1;
        }
      }
    }
    if (hinducal[1] == diwaliDates[0][0] && hinducal[2] == diwaliDates[0][1])
      holidays.push("Dhanteras");
    if (hinducal[1] == diwaliDates[1][0] && hinducal[2] == diwaliDates[1][1]) {
      holidays.push("Choti Diwali");
      holidays.push("Naraka Chaturdashi");
    }
    if (hinducal[1] == diwaliDates[2][0] && hinducal[2] == diwaliDates[2][1]) {
      holidays.push("Diwali");
      holidays.push("Lakshmi Puja");
      if (j >= 2378496) holidays.push("Kali Puja");
    }
    if (hinducal[1] == diwaliDates[3][0] && hinducal[2] == diwaliDates[3][1])
      holidays.push("Govardhan Puja");
    if (hinducal[1] == diwaliDates[4][0] && hinducal[2] == diwaliDates[4][1])
      holidays.push("Bhai Dooj");
  }
  holidays = holidays.concat(hinduHolidays2(hinducal, j, longPeriods))
  FORCE_INDIA = false;
  return holidays;
}
function hinduHolidayShift(hinducal, j) {
  var expectedTomorrow = hinducal;
  if (hinducal[2] == 15) expectedTomorrow[2] = 16;
  else expectedTomorrow[2] = 1;
  var dateTomorrow = jd_to_hindu(j+1+sunTimes_jd(j+1, 0, true));
  if (dateTomorrow[2] != expectedTomorrow[2])
    return true;
  return false;
}
function hinduHolidays2(hinducal, j, longPeriods=true) {
  let holidays = [];
  let hinduMon = hinducal[1];
  let hinduDay = hinducal[2];
  let gregYear = jd_to_gregorian(j)[0];
  if (hinducal[3] != 1 && j > 1100512) {
    if (hinduMon == 1 && hinduDay == 1)
      holidays.push("Hindu New Year");
    if (POONAM) {
      hinduDay -= 15;
      if (hinduDay < 1) {
        hinduDay += 30;
        hinduMon--;
      }
      if (hinduMon < 1) hinduMon += 12;
    }
    if (HOLIDAYS_HINDU[hinduMon + "," + hinduDay] != undefined) {
      for (var i = 0; i < HOLIDAYS_HINDU[hinduMon + "," + hinduDay][0].length; i++)
        if (HOLIDAYS_HINDU[hinduMon + "," + hinduDay][1] == undefined ||
              HOLIDAYS_HINDU[hinduMon + "," + hinduDay][1][i] == undefined ||
              j >= HOLIDAYS_HINDU[hinduMon + "," + hinduDay][1][i])
        holidays.push(HOLIDAYS_HINDU[hinduMon + "," + hinduDay][0][i]);
    }
    if (hinduMon == 6 && hinduDay >= 16 && longPeriods && j > 1173245) holidays.push("Pitri Paksha");
    if (hinduMon == 7 && hinduDay <= 9 && longPeriods && j > 2122900) holidays.push("Navratri");
    if (longPeriods && j > 1648453 && ((hinduMon == 6 && hinduDay >= 8) && (hinduMon == 6 && hinduDay <= 22)))
      holidays.push("Mahalakshmi Vrat")
  }
  if (j > 1100512) {
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 0)) {
      holidays.push("Mesha Sankranti");
      if (gregYear > 1699) holidays.push("Vaisakhi");
    }
    let makaraS = sankranti(gregYear, 270);
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 30)) holidays.push("Vrishabha Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 60)) holidays.push("Mithuna Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 90)) holidays.push("Karka Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 120)) holidays.push("Singha Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 150)) holidays.push("Kanya Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 180)) holidays.push("Tula Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 210)) holidays.push("Vrishchika Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 240)) holidays.push("Dhanu Sankranti");
    if (Math.floor(j+0.5)-0.5 == makaraS) {
      holidays.push("Makara Sankranti");
      holidays.push("Maghi");
      holidays.push("Thaipongal");
    }
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 300)) holidays.push("Kumbha Sankranti");
    if (Math.floor(j+0.5)-0.5 == sankranti(gregYear, 330)) holidays.push("Meena Sankranti");
    if (Math.floor(j+0.5)-0.5 == makaraS-1) holidays.push("Lohri");
    else if (Math.floor(j+0.5)-0.5 == sankranti(gregYear+1, 330)-1) holidays.push("Lohri");
  }
  return holidays;
}
function chineseHolidays(chlcal) {
  var month = chlcal[1];
  var day = chlcal[2];
  var holidays = [];
  if (month == chlcal[4]+1 && chlcal[4] != 0) month = 0;
  else if (month > chlcal[4]+1 && chlcal[4] != 0) month--;
  if (chlcal[0] > 10) {
    if (month == 1 && day == 1) holidays.push("Chinese New Year");
    if (month == 1 && day == 15) holidays.push("Lantern Festival");
    if (month == 5 && day == 5) holidays.push("Dragon Boat Festival");
    if (month == 9 && day == 9) holidays.push("Double Ninth Festival");
    if (month == 7 && day == 7) holidays.push("Qixi Festival");
    if (month == 7 && day == 15) holidays.push("Ghost Festival");
    if (month == 8 && day == 15) holidays.push("Mid-Autumn Festival");
  }
  return holidays;
}
var savedJulianDay = NaN;
function saveJulian(update=false) {
  if (update)
    savedJulianDay = document.julianday.day.value;
  if (!isNaN(savedJulianDay))
    document.getElementById("savedDay").innerHTML = "Days relative to saved day: " +
      (Math.round((document.julianday.day.value - savedJulianDay)*100)/100)
}

/*  WEEKDAY_BEFORE  --  Return Julian date of given weekday (0 = Sunday)
                        in the seven days ending on jd.  */

function weekday_before(weekday, jd)
{
    return jd - jwday(jd - weekday);
}

/*  SEARCH_WEEKDAY  --  Determine the Julian date for:

            weekday      Day of week desired, 0 = Sunday
            jd           Julian date to begin search
            direction    1 = next weekday, -1 = last weekday
            offset       Offset from jd to begin search
*/

function search_weekday(weekday, jd, direction, offset)
{
    return weekday_before(weekday, jd + (direction * offset));
}

//  Utility weekday functions, just wrappers for search_weekday

function nearest_weekday(weekday, jd)
{
    return search_weekday(weekday, jd, 1, 3);
}

function next_weekday(weekday, jd)
{
    return search_weekday(weekday, jd, 1, 7);
}

function next_or_current_weekday(weekday, jd)
{
    return search_weekday(weekday, jd, 1, 6);
}

function previous_weekday(weekday, jd)
{
    return search_weekday(weekday, jd, -1, 1);
}

function previous_or_current_weekday(weekday, jd)
{
    return search_weekday(weekday, jd, 1, 0);
}

//  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?

function leap_gregorian(year)
{
    return ((year % 4) == 0) &&
            (!(((year % 100) == 0) && ((year % 400) != 0)));
}

//  GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date

const GREGORIAN_EPOCH = 1721425.5;

function gregorian_to_jd(year, month, day)
{
    return (GREGORIAN_EPOCH - 1) +
           (365 * (year - 1)) +
           Math.floor((year - 1) / 4) +
           (-Math.floor((year - 1) / 100)) +
           Math.floor((year - 1) / 400) +
           Math.floor((((367 * month) - 362) / 12) +
           ((month <= 2) ? 0 :
                               (leap_gregorian(year) ? -1 : -2)
           ) +
           day);
}

//  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day

function jd_to_gregorian(jd) {
    var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
        yindex, dyindex, year, yearday, leapadj;

    wjd = Math.floor(jd - 0.5) + 0.5;
    depoch = wjd - GREGORIAN_EPOCH;
    quadricent = Math.floor(depoch / 146097);
    dqc = mod(depoch, 146097);
    cent = Math.floor(dqc / 36524);
    dcent = mod(dqc, 36524);
    quad = Math.floor(dcent / 1461);
    dquad = mod(dcent, 1461);
    yindex = Math.floor(dquad / 365);
    year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
    if (!((cent == 4) || (yindex == 4))) {
        year++;
    }
    yearday = wjd - gregorian_to_jd(year, 1, 1);
    leapadj = ((wjd < gregorian_to_jd(year, 3, 1)) ? 0
                                                  :
                  (leap_gregorian(year) ? 1 : 2)
              );
    month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
    day = (wjd - gregorian_to_jd(year, month, 1)) + 1;

    return new Array(year, month, day);
}

//  ISO_TO_JULIAN  --  Return Julian day of given ISO year, week, and day

function n_weeks(weekday, jd, nthweek)
{
    var j = 7 * nthweek;

    if (nthweek > 0) {
        j += previous_weekday(weekday, jd);
    } else {
        j += next_weekday(weekday, jd);
    }
    return j;
}

function iso_to_julian(year, week, day)
{
    return day + n_weeks(0, gregorian_to_jd(year - 1, 12, 28), week);
}

//  JD_TO_ISO  --  Return array of ISO (year, week, day) for Julian day

function jd_to_iso(jd)
{
    var year, week, day;

    year = jd_to_gregorian(jd - 3)[0];
    if (jd >= iso_to_julian(year + 1, 1, 1)) {
        year++;
    }
    week = Math.floor((jd - iso_to_julian(year, 1, 1)) / 7) + 1;
    day = jwday(jd);
    if (day == 0) {
        day = 7;
    }
    return new Array(year, week, day);
}

//  ISO_DAY_TO_JULIAN  --  Return Julian day of given ISO year, and day of year

function iso_day_to_julian(year, day)
{
    return (day - 1) + gregorian_to_jd(year, 1, 1);
}

//  JD_TO_ISO_DAY  --  Return array of ISO (year, day_of_year) for Julian day

function jd_to_iso_day(jd)
{
    var year, day;

    year = jd_to_gregorian(jd)[0];
    day = Math.floor(jd - gregorian_to_jd(year, 1, 1)) + 1;
    return new Array(year, day);
}

/*  PAD  --  Pad a string to a given length with a given fill character.  */

function pad(str, howlong, padwith) {
    var s = str.toString();

    while (s.length < howlong) {
        s = padwith + s;
    }
    return s;
}

//  JULIAN_TO_JD  --  Determine Julian day number from Julian calendar date

var JULIAN_EPOCH = 1721423.5;

function leap_julian(year)
{
    return mod(year, 4) == ((year > 0) ? 0 : 3);
}

function julian_to_jd(year, month, day)
{

    /* Adjust negative common era years to the zero-based notation we use.  */

    if (year < 1) {
        year++;
    }

    /* Algorithm as given in Meeus, Astronomical Algorithms, Chapter 7, page 61 */

    if (month <= 2) {
        year--;
        month += 12;
    }

    return ((Math.floor((365.25 * (year + 4716))) +
            Math.floor((30.6001 * (month + 1))) +
            day) - 1524.5);
}

//  JD_TO_JULIAN  --  Calculate Julian calendar date from Julian day

function jd_to_julian(td) {
    var z, a, alpha, b, c, d, e, year, month, day;

    td += 0.5;
    z = Math.floor(td);

    a = z;
    b = a + 1524;
    c = Math.floor((b - 122.1) / 365.25);
    d = Math.floor(365.25 * c);
    e = Math.floor((b - d) / 30.6001);

    month = Math.floor((e < 14) ? (e - 1) : (e - 13));
    year = Math.floor((month > 2) ? (c - 4716) : (c - 4715));
    day = b - d - Math.floor(30.6001 * e);

    /*  If year is less than 1, subtract one to convert from
        a zero based date system to the common era system in
        which the year -1 (1 B.C.E) is followed by year 1 (1 C.E.).  */

    if (year < 1) {
        year--;
    }

    return new Array(year, month, day);
}

function set_hebrew_start() {
  var month1 = new Number(document.hebrew.firstmonth.value);
  var length = document.hebrew.month.options.length;
  var value = document.hebrew.month.value;
  if (month1 == 0) {
    for (var i = 0; i < 12; i++) {
      document.hebrew.month.options[i].text = lang5Data.months[mod(i+month1, length)];
      document.hebrew.month.options[i].value = mod(i+month1, length) + 1;
    }
    if (length == 13) {
      document.hebrew.month.options[11].text = lang5Data.months[12];
      document.hebrew.month.options[11].value = 12;
      document.hebrew.month.options[12].text = lang5Data.months[13];
      document.hebrew.month.options[12].value = 13;
    }
  } else if (month1 == 6) {
    var adar;
    for (var i = 0; i < 5; i++) {
      document.hebrew.month.options[i].text = lang5Data.months[i+6];
      document.hebrew.month.options[i].value = i+7;
    }
    if (length == 13) {
      document.hebrew.month.options[5].text = lang5Data.months[12];
      document.hebrew.month.options[5].value = 12;
      document.hebrew.month.options[6].text = lang5Data.months[13];
      document.hebrew.month.options[6].value = 13;
      adar = 6;
    } else {
      document.hebrew.month.options[5].text = lang5Data.months[11];
      document.hebrew.month.options[5].value = 12;
      adar = 5;
    }
    for (var i = 0; i < 6; i++) {
      document.hebrew.month.options[adar+i+1].text = lang5Data.months[i];
      document.hebrew.month.options[adar+i+1].value = i+1;
    }
  }
  document.hebrew.month.value = value;
  localStorage.setItem("hindu_era", document.hinducalendar.era.value);
}

//  HEBREW_TO_JD  --  Determine Julian day from Hebrew date

var HEBREW_EPOCH = 347995.5;

//  Is a given Hebrew year a leap year ?

function hebrew_leap(year)
{
    return mod(((year * 7) + 1), 19) < 7;
}

//  How many months are there in a Hebrew year (12 = normal, 13 = leap)

function hebrew_year_months(year)
{
    return hebrew_leap(year) ? 13 : 12;
}

//  Test for delay of start of new year and to avoid
//  Sunday, Wednesday, and Friday as start of the new year.

function hebrew_delay_1(year)
{
    var months, days, parts;

    months = Math.floor(((235 * year) - 234) / 19);
    parts = 12084 + (13753 * months);
    day = (months * 29) + Math.floor(parts / 25920);

    if (mod((3 * (day + 1)), 7) < 3) {
        day++;
    }
    return day;
}

//  Check for delay in start of new year due to length of adjacent years

function hebrew_delay_2(year)
{
    var last, present, next;

    last = hebrew_delay_1(year - 1);
    present = hebrew_delay_1(year);
    next = hebrew_delay_1(year + 1);

    return ((next - present) == 356) ? 2 :
                                     (((present - last) == 382) ? 1 : 0);
}

//  How many days are in a Hebrew year?
function hebrew_year_days(year)
{
    return hebrew_to_jd(year + 1, 7, 1) - hebrew_to_jd(year, 7, 1);
}

//  How many days are in a given month of a given year
function hebrew_month_days(year, month)
{
    //  First of all, dispose of fixed-length 29 day months
    if (month == 2 || month == 4 || month == 6 ||
        month == 10 || month == 13) {
        return 29;
    }

    //  If it's not a leap year, Adar has 29 days
    if (month == 12 && !hebrew_leap(year)) {
        return 29;
    }

    //  If it's Heshvan, days depend on length of year
    if (month == 8 && !(mod(hebrew_year_days(year), 10) == 5)) {
        return 29;
    }

    //  Similarly, Kislev varies with the length of year
    if (month == 9 && (mod(hebrew_year_days(year), 10) == 3)) {
        return 29;
    }

    //  Nope, it's a 30 day month
    return 30;
}

//  Finally, wrap it all up into...

function hebrew_to_jd(year, month, day)
{
    var jd, mon, months;

    months = hebrew_year_months(year);
    jd = HEBREW_EPOCH + hebrew_delay_1(year) +
         hebrew_delay_2(year) + day + 1;

    if (month < 7) {
        for (mon = 7; mon <= months; mon++) {
            jd += hebrew_month_days(year, mon);
        }
        for (mon = 1; mon < month; mon++) {
            jd += hebrew_month_days(year, mon);
        }
    } else {
        for (mon = 7; mon < month; mon++) {
            jd += hebrew_month_days(year, mon);
        }
    }

    return jd;
}

/*  JD_TO_HEBREW  --  Convert Julian date to Hebrew date
                      This works by making multiple calls to
                      the inverse function, and is this very
                      slow.  */

function jd_to_hebrew(jd)
{
    var year, month, day, i, count, first;

    let daySunset = sunTimes_jd(jd, 1);
    if (modPos(jd + 0.5, 1.0) >= daySunset) jd++;
    if (daySunset <= 0.4) jd--;
    jd = Math.floor(jd-0.5) + 0.5;
    count = Math.floor(((jd - HEBREW_EPOCH) * 98496.0) / 35975351.0);
    year = count - 1;
    for (i = count; jd >= hebrew_to_jd(i, 7, 1); i++) {
        year++;
    }
    first = (jd < hebrew_to_jd(year, 1, 1)) ? 7 : 1;
    month = first;
    for (i = first; jd > hebrew_to_jd(year, i, hebrew_month_days(year, i)); i++) {
        month++;
    }
    day = (jd - hebrew_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

/*  EQUINOXE_A_PARIS  --  Determine Julian day and fraction of the
                          September equinox at the Paris meridian in
                          a given Gregorian year.  */

function equinoxe_a_paris(year)
{
    var equJED, equJD, equAPP, equParis, dtParis;

    //  September equinox in dynamical time
    equJED = equinox(year, 2);

    //  Correct for delta T to obtain Universal time
    equJD = equJED - (deltat(year) / (24 * 60 * 60));

    //  Apply the equation of time to yield the apparent time at Greenwich
    equAPP = equJD + equationOfTime(equJED);

    /*  Finally, we must correct for the constant difference between
        the Greenwich meridian and that of Paris, 2�20'15" to the
        East.  */

    dtParis = (2 + (20 / 60.0) + (15 / (60 * 60.0))) / 360;
    equParis = equAPP + dtParis;

    return equParis;
}

/*  PARIS_EQUINOXE_JD  --  Calculate Julian day during which the
                           September equinox, reckoned from the Paris
                           meridian, occurred for a given Gregorian
                           year.  */

function paris_equinoxe_jd(year)
{
    var ep, epg;

    ep = equinoxe_a_paris(year);
    epg = Math.floor(ep - 0.5) + 0.5;

    return epg;
}

/*  ANNEE_DE_LA_REVOLUTION  --  Determine the year in the French
                                revolutionary calendar in which a
                                given Julian day falls.  Returns an
                                array of two elements:

                                    [0]  Année de la Révolution
                                    [1]  Julian day number containing
                                         equinox for this year.
*/

var FRENCH_REVOLUTIONARY_EPOCH = 2375839.5;

function annee_da_la_revolution(jd)
{
    var guess = jd_to_gregorian(jd)[0] - 2,
        lasteq, nexteq, adr;

    lasteq = paris_equinoxe_jd(guess);
    while (lasteq > jd) {
        guess--;
        lasteq = paris_equinoxe_jd(guess);
    }
    nexteq = lasteq - 1;
    while (!((lasteq <= jd) && (jd < nexteq))) {
        lasteq = nexteq;
        guess++;
        nexteq = paris_equinoxe_jd(guess);
    }
    adr = Math.round((lasteq - FRENCH_REVOLUTIONARY_EPOCH) / TropicalYear) + 1;

    return new Array(adr, lasteq);
}

/*  JD_TO_FRENCH_REVOLUTIONARY  --  Calculate date in the French Revolutionary
                                    calendar from Julian day.  The five or six
                                    "sansculottides" are considered a thirteenth
                                    month in the results of this function.  */

function jd_to_french_revolutionary(jd)
{
    var an, mois, decade, jour,
        adr, equinoxe;

    jd = Math.floor(jd) + 0.5;
    adr = annee_da_la_revolution(jd);
    an = adr[0];
    equinoxe = adr[1];
    mois = Math.floor((jd - equinoxe) / 30) + 1;
    jour = (jd - equinoxe) % 30;
    decade = Math.floor(jour / 10) + 1;
    jour = (jour % 10) + 1;

    return new Array(an, mois, decade, jour);
}

/*  FRENCH_REVOLUTIONARY_TO_JD  --  Obtain Julian day from a given French
                                    Revolutionary calendar date.  */

function french_revolutionary_to_jd(an, mois, decade, jour)
{
    var adr, equinoxe, guess, jd;

    guess = FRENCH_REVOLUTIONARY_EPOCH + (TropicalYear * ((an - 1) - 1));
    adr = new Array(an - 1, 0);

    while (adr[0] < an) {
        adr = annee_da_la_revolution(guess);
        guess = adr[1] + (TropicalYear + 2);
    }
    equinoxe = adr[1];

    jd = equinoxe + (30 * (mois - 1)) + (10 * (decade - 1)) + (jour - 1);
    return jd;
}

//  LEAP_ISLAMIC  --  Is a given year a leap year in the Islamic calendar ?

function leap_islamic(year)
{
    return (((year * 11) + 14) % 30) < 11;
}
function isHinduGuessCorrect(originalDate, jd) {
  let hinduDate = jd_to_hindu(jd);
  return (originalDate[0] == hinduDate[0] && originalDate[1] == hinduDate[1]
    && originalDate[2] == hinduDate[2]);
}

// HINDU_TO_JD -- Determine Julian day from Hindu date

function hindu_to_jd(year, month, day, adhik) {
  let gregorianYear = year + HINDU_OFFSET;
  if (month < HINDU_MONTH1+1) year++ // Convert to Vikram
  while (day > 30) {
    day -= 30;
    month++;
    if (month > 12) {
      month -= 12;
      year++;
    }
  }
  while (day < 1) {
    day += 30;
    month--;
    if (month < 1) {
      month += 12;
      year--;
    }
  }
  var originalDate = new Array(year, month, day, adhik);
  jd = gregorian_to_jd(gregorianYear, 3 + month, 21 + day);
  let monthShift = 25.0;
  while (jd_to_hindu(jd, true)[0] != year || jd_to_hindu(jd, true)[1] != month) {
    if (jd_to_hindu(jd, true)[0] < year) jd += 5*SynodicMonth;
    if (jd_to_hindu(jd, true)[0] > year) jd -= 5*SynodicMonth;
    if (jd_to_hindu(jd, true)[0] == year) {
      if (jd_to_hindu(jd, true)[1] < month) {
        jd += monthShift;
        monthShift -= 0.5;
      }
      if (jd_to_hindu(jd, true)[1] > month ||
          (jd_to_hindu(jd, true)[1] == month && adhik && jd_to_hindu(jd, true)[3] == 2)) {
        jd -= monthShift
        monthShift -= 0.5;
      }
      if (monthShift < 0.9) {
        monthShift = 20;
        month++;
        originalDate[1]++;
        originalDate[3] = true;
        adhik = true;
      }
    }
  }
  while (jd_to_hindu(jd, true)[2] < originalDate[2]) jd += (SynodicMonth/60.0);
  while (jd_to_hindu(jd, true)[2] > originalDate[2]) jd -= (SynodicMonth/60.0);
  if (adhik && jd_to_hindu(jd, true)[3] == 2) jd -= SynodicMonth;
  else if (!adhik && jd_to_hindu(jd, true)[3] == 1) jd += SynodicMonth;
  if (originalDate[1] == 1 && jd_to_hindu(jd, true)[1] == 12) {
    jd += 20;
    while (jd_to_hindu(jd, true)[2] < originalDate[2]) jd += (SynodicMonth/60.0);
    while (jd_to_hindu(jd, true)[2] > originalDate[2]) jd -= (SynodicMonth/60.0);
  }
  jd = Math.round(jd * 24)/24;
  if (originalDate[1] < 1) originalDate[1] += 12;
  while (jd_to_hindu(jd, true)[2] != originalDate[2] || jd_to_hindu(jd, true)[1] != originalDate[1]) {
    let currentDate = jd_to_hindu(jd, true);
    let currentTithi = currentDate[2];
    let currentMonth = currentDate[1];
    if (currentMonth < 1) currentMonth += 12;
    if (currentTithi < originalDate[2]) jd += (1/24.0);
    if (currentTithi > originalDate[2]) jd -= (1/24.0);
    if (currentMonth < originalDate[1]) jd += 24;
    else if (currentMonth > originalDate[1]) jd -= 24;
  }
  while (jd_to_hindu(jd)[2] == originalDate[2])
    jd -= (1/24.0);
  return jd + (1/24.0);
}

function divasa_to_jd(year, month, day, adhik)
{
  var jd = hindu_to_jd(year, month, day, adhik);
  FORCE_INDIA = false;
  var sunrise = sunTimes_jd(jd, 0, false);
  if (isNaN(sunrise))
    sunrise = 1.1;
  if (mod(jd+0.5,1.0) > sunrise) {
    jd++;
    sunrise = sunTimes_jd(jd, 0, false);
  }
  var indiaJd = Math.floor(jd+0.5)-0.5+sunTimes_jd(jd, 0, true);
  if (jd_to_hindu(indiaJd)[2] == day+1 || (day == 30 && jd_to_hindu(indiaJd)[2] == 1)) {
    jd--;
    sunrise = sunTimes_jd(jd, 0, false);
  }
  if (isNaN(sunrise))
    sunrise = 0.0;
  return Math.floor(jd-0.5)+0.5+(1/100000.0)+sunrise; // extra second so it will be after sunrise
}

var HINDU_OFFSET = -57;
var HINDU_MONTH1 = 0;
var POONAM = false;

// TITHI -- Determines Tithi (lunar day) for Hindu calendar from Julian day (also used for calculating moon phases)

function tithi(jd, earlier=false) {
  let tithi = (moonpos(jd)[0] - sunpos(jd)[7])/12.0;
  tithi = mod(tithi, 30.0);
  return tithi;
}

// JD_TO_HINDU -- Determines Hindu date from Julian day
function jd_to_hindu(jd, forceChaitra=false) {
  FORCE_INDIA = document.hinducalendar.india.checked;
  let zodiacMonths = new Array(2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1);
  let day1 = moonPhaseBefore(jd, 0, false, true);
  let zodiac = getZodiac(day1, true);
  let monthType = 0; // Normal
  var previousMoon = moonPhaseBefore(day1, 0, true, true);
  var nextMoon = moonPhaseAfter(day1, 0, true, true);
  if (getZodiac(nextMoon, true) == zodiac)
    monthType = 1; // Adhik (Next month is the same zodiac)
  if (getZodiac(previousMoon, true) == zodiac)
    monthType = 2; // Shuddh (Previous month is the same zodiac)
  let month = zodiacMonths[zodiac - 1];
  let day = Math.floor(tithi(jd, true)) + 1; // Tithi, not true day (divasa)

  let year = jd_to_gregorian(jd)[0] - HINDU_OFFSET;
  if (month >= 8 && jd_to_gregorian(jd)[1] <= 6) // from 1 January to 1 Chaitra
    year -= 1; // The Hindu calendar goes back one year
  if (month == 1 && jd_to_gregorian(jd)[1] >= 11) // If Chaitra has come but January has not
    year += 1; // The Hindu calendar goes ahead one year
  if (month <= HINDU_MONTH1 && !forceChaitra)
    year -= 1; // Fall behind if Chaitra is not the first month
  if (POONAM) {
    day += 15;
    if (day > 30) {
      day -= 30;
      month++;
      if (month > 12) {
        month -= 12;
        year++;
      }
    }
  }
  FORCE_INDIA = false;
  return new Array(year, month, day, monthType);
}

// SANKRANTI -- Determines Julian day of a sidereal zodiac angle in a particular year
function sankranti(year, angle) {
  FORCE_INDIA = document.hinducalendar.india.checked;
  var jd = local_equinox_jd(year) + angle/360.0*TropicalYear;
  jd += sunpos(jd)[13]/360.0*TropicalYear;
  while (jd_to_gregorian(jd)[0] > year) jd -= SiderealYear;
  while (jd_to_gregorian(jd)[0] < year) jd += SiderealYear;
  if (angle != 0) {
    while (sunpos(jd)[12] < angle) jd++;
    while (sunpos(jd)[12] > angle) jd--;
    while (sunpos(jd)[12] < angle) jd += 0.1;
    while (sunpos(jd)[12] > angle) jd -= 0.1;
    while (jd_to_gregorian(jd)[0] > year) jd -= SiderealYear;
    while (jd_to_gregorian(jd)[0] < year) jd += SiderealYear;
  }
  FORCE_INDIA = false;
  return Math.floor(jd+0.5)-0.5;
}

var ISLAMIC_EPOCH = 1948439.5;

function set_hindu_era() {
  if (document.hinducalendar.era.value == "vikram")
    HINDU_OFFSET = -57;
  else if (document.hinducalendar.era.value == "shaka")
    HINDU_OFFSET = 78;
  else if (document.hinducalendar.era.value == "kaliyuga")
    HINDU_OFFSET = -3101;
  else if (document.hinducalendar.era.value == "bengali")
    HINDU_OFFSET = 593;
  else if (document.hinducalendar.era.value == "nanakshahi")
    HINDU_OFFSET = 1468;
  else if (document.hinducalendar.era.value == "gujarati")
    HINDU_OFFSET = -57;
  HINDU_MONTH1 = {"vikram": 0, "shaka": 0, "kaliyuga": 0,
    "bengali": 1, "nanakshahi": 0, "gujarati": 7}[document.hinducalendar.era.value];
  for (var i = 0; i < 12; i++) {
    document.hinducalendar.month.options[i].text = lang3Data.months[mod(i+HINDU_MONTH1, 12)];
    document.hinducalendar.month.options[i].value = mod(i+HINDU_MONTH1, 12) + 1;
  }
  localStorage.setItem("hindu_era", document.hinducalendar.era.value);
}
function set_hindu_moontype() {
  if (document.hinducalendar.moonType.value == "amavas") {
    POONAM = false;
  } else if (document.hinducalendar.moonType.value == "poonam") {
    POONAM = true;
  }
  localStorage.setItem("hindu_moontype", {false: 0, true: 1}[POONAM]);
}

function set_persian_era() {
  if (document.persiana.era.value == "hijri") {
    PERSIAN_EPOCH = 1948320.5;
  } else if (document.persiana.era.value == "kurdish") {
    PERSIAN_EPOCH = 1497976.5;
  }
  localStorage.setItem("persian_era", document.persiana.era.value);
}

function set_islamic_calculation() {
  islcalc = document.islamic.calculation.value;
  islasr = document.islamic.asr.value;
  localStorage.setItem("islamic_calculation", islcalc);
  localStorage.setItem("islamic_asr", islasr);
  updateSun();
}

//  ISLAMIC_TO_JD  --  Determine Julian day from Islamic date

function islamic_to_jd(year, month, day)
{
    let jd = (day +
            Math.ceil(29.5 * (month - 1)) +
            (year - 1) * 354 +
            Math.floor((3 + (11 * year)) / 30) +
            ISLAMIC_EPOCH) - 1;
    return jd;
}

//  JD_TO_ISLAMIC  --  Calculate Islamic date from Julian day

function jd_to_islamic(jd)
{
    var year, month, day;

    FORCE_MECCA = document.islamic.mecca.checked;
    let daySunset = sunTimes_jd(jd, 1);
    if (modPos(jd + 0.5, 1.0) >= daySunset) jd++;
    if (daySunset <= 0.4) jd--;
    jd = Math.floor(jd-0.5) + 0.5;
    year = Math.floor(((30 * (jd - ISLAMIC_EPOCH)) + 10646) / 10631);
    month = Math.min(12,
                Math.ceil((jd - (29 + islamic_to_jd(year, 1, 1))) / 29.5) + 1);
    day = (jd - islamic_to_jd(year, month, 1)) + 1;

    FORCE_MECCA = false;
    return new Array(year, month, day);
}

/* WEEKDAY_IN_MONTH -- Determine the first, second etc. of a given
                      weekday in a given Gregorian year and month */

function weekday_in_month(year, month, weekday, num) {
  let jd = gregorian_to_jd(year, month, 1);
  jd += modPos(weekday - jwday(jd), 7);
  jd += 7*(num-1);
  return jd;
}

/*  LOCAL_EQUINOX  --  Determine Julian day and fraction of the
                        March equinox in a given Gregorian year.  */

function local_equinox(year, which=0, forceTimeZone=null)
{
    var equJED, equJD, equAPP, equLocal, dtLocal;

    //  March equinox in dynamical time
    equJED = equinox(year, which);

    //  Correct for delta T to obtain Universal time
    equJD = equJED - (deltat(year) / (24 * 60 * 60));

    //  Apply the equation of time to yield the apparent time at Greenwich
    equAPP = equJD + equationOfTime(equJED, 3.5);

    /*  Finally, we must correct for the constant difference between
        the Greenwich meridian and the time zone chosen */

    if ((forceTimeZone) == null)
      dtLocal = timeZone(1);
    else
      dtLocal = forceTimeZone/24.0;
    equLocal = equAPP + dtLocal;

    return equLocal;
}


/*  LOCAL_EQUINOX_JD  --  Calculate Julian day during which an
                           equinox or solstice occurred for a given
                           Gregorian year.  */

function local_equinox_jd(year, startMidnight=false, which=0, forceTimeZone=null)
{
    var ep, epg;

    ep = local_equinox(year, which, forceTimeZone);
    if (startMidnight) epg = Math.floor(ep-0.5)+0.5;
    else epg = Math.floor(ep);

    return epg;
}

/*  PERSIANA_YEAR  --  Determine the year in the Persian
                       astronomical calendar in which a
                       given Julian day falls.  Returns an
             	       array of two elements:

                            [0]  Persian year
                            [1]  Julian day number containing
                                 equinox for this year.
*/


var PERSIAN_EPOCH = 1948320.5;

function persiana_year(jd)
{
    var guess = jd_to_gregorian(jd)[0] - 2,
        lasteq, nexteq, adr;

    lasteq = local_equinox_jd(guess, false, 0, 3.5);
    while (lasteq > jd) {
        guess--;
        lasteq = local_equinox_jd(guess, false, 0, 3.5);
    }
    nexteq = lasteq - 1;
    while (!((lasteq <= jd) && (jd < nexteq))) {
        lasteq = nexteq;
        guess++;
        nexteq = local_equinox_jd(guess, false, 0, 3.5);
    }
    adr = Math.round((lasteq - PERSIAN_EPOCH) / TropicalYear) + 1;

    return new Array(adr, lasteq);
}

/*  JD_TO_PERSIANA  --  Calculate date in the Persian astronomical
                        calendar from Julian day.  */

function jd_to_persiana(jd)
{
    var year, month, day,
        adr, equinox, yday;

    jd = Math.floor(jd) + 0.5;
    adr = persiana_year(jd);
    year = adr[0];
    equinox = adr[1];
    day = Math.floor((jd - equinox) / 30) + 1;

    yday = (Math.floor(jd) - persiana_to_jd(year, 1, 1)) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    day = (Math.floor(jd) - persiana_to_jd(year, month, 1)) + 1;

    return new Array(year, month, day);
}

/*  PERSIANA_TO_JD  --  Obtain Julian day from a given Persian
                    	astronomical calendar date.  */

function persiana_to_jd(year, month, day)
{
    var adr, equinox, guess, jd;

    guess = (PERSIAN_EPOCH - 1) + (TropicalYear * ((year - 1) - 1));
    adr = new Array(year - 1, 0);

    while (adr[0] < year) {
        adr = persiana_year(guess);
        guess = adr[1] + (TropicalYear + 2);
    }
    equinox = adr[1];

    jd = equinox +
            ((month <= 7) ?
                ((month - 1) * 31) :
                (((month - 1) * 30) + 6)
            ) +
    	    (day - 1);
    return jd;
}

/*  LEAP_PERSIANA  --  Is a given year a leap year in the Persian
    	    	       astronomical calendar ?  */

function leap_persiana(year)
{
    return (persiana_to_jd(year + 1, 1, 1) -
    	    persiana_to_jd(year, 1, 1)) > 365;
}

//  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?

function leap_persian(year)
{
    return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
}

//  PERSIAN_TO_JD  --  Determine Julian day from Persian date

function persian_to_jd(year, month, day)
{
    var epbase, epyear;

    epbase = year - ((year >= 0) ? 474 : 473);
    epyear = 474 + mod(epbase, 2820);

    return day +
            ((month <= 7) ?
                ((month - 1) * 31) :
                (((month - 1) * 30) + 6)
            ) +
            Math.floor(((epyear * 682) - 110) / 2816) +
            (epyear - 1) * 365 +
            Math.floor(epbase / 2820) * 1029983 +
            (PERSIAN_EPOCH - 1);
}

//  JD_TO_PERSIAN  --  Calculate Persian date from Julian day

function jd_to_persian(jd)
{
    var year, month, day, depoch, cycle, cyear, ycycle,
        aux1, aux2, yday;


    jd = Math.floor(jd) + 0.5;

    depoch = jd - persian_to_jd(475, 1, 1);
    cycle = Math.floor(depoch / 1029983);
    cyear = mod(depoch, 1029983);
    if (cyear == 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor(cyear / 366);
        aux2 = mod(cyear, 366);
        ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
                    aux1 + 1;
    }
    year = ycycle + (2820 * cycle) + 474;
    if (year <= 0) {
        year--;
    }
    yday = (jd - persian_to_jd(year, 1, 1)) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    day = (jd - persian_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

//  MAYAN_COUNT_TO_JD  --  Determine Julian day from Mayan long count

var MAYAN_COUNT_EPOCH = 584282.5;

function mayan_count_to_jd(baktun, katun, tun, uinal, kin)
{
    return MAYAN_COUNT_EPOCH +
           (baktun * 144000) +
           (katun  *   7200) +
           (tun    *    360) +
           (uinal  *     20) +
           kin;
}

//  JD_TO_MAYAN_COUNT  --  Calculate Mayan long count from Julian day

function jd_to_mayan_count(jd)
{
    var d, baktun, katun, tun, uinal, kin;

    jd = Math.floor(jd) + 0.5;
    d = jd - MAYAN_COUNT_EPOCH;
    baktun = Math.floor(d / 144000);
    d = mod(d, 144000);
    katun = Math.floor(d / 7200);
    d = mod(d, 7200);
    tun = Math.floor(d / 360);
    d = mod(d, 360);
    uinal = Math.floor(d / 20);
    kin = mod(d, 20);

    return new Array(baktun, katun, tun, uinal, kin);
}

function updateMayanDesc() {
  let type = document.mayancount.type.value;
  document.getElementById("mayanMonths").innerHTML = "The " + HAAB_NAME[type] + " months are:<br>";
  for (var i = 0; i < 18; i++) {
    document.getElementById("mayanMonths").innerHTML += "<i>" + HAAB_MONTHS[type][i] + "</i>, ";
  }
  document.getElementById("mayanMonths").innerHTML += "and the extra 5 <i>" + HAAB_MONTHS[type][18] + "</i> days";
  document.getElementById("mayanMonths").innerHTML += "<br>The twenty " + TZOLKIN_NAME[type] + " named periods are:<br>";
  for (var i = 0; i < 19; i++) {
    document.getElementById("mayanMonths").innerHTML += "<i>" + TZOLKIN_MONTHS[type][i] + "</i>, ";
  }
  document.getElementById("mayanMonths").innerHTML += "and <i>" + TZOLKIN_MONTHS[type][19] + "</i>";
  document.getElementById("mesoamericanSolar").innerHTML = HAAB_NAME[type] + ":";
  document.getElementById("mesoamericanReligious").innerHTML = TZOLKIN_NAME[type] + ":";
}

//  JD_TO_HAAB  --  Determine Mayan Haab month and day from Julian day

var HAAB_MONTHS = {"mayan": new Array("Pop", "Wo", "Sip", "Sotz", "Sek", "Xul",
                                  "Yaxkin", "Mol", "Chen", "Yax", "Sak", "Keh",
                                  "Mak", "Kankin", "Muwan", "Pax", "Kayab", "Kumku",
                                  "Wayeb"),
                    "aztec": new Array("Cuauhitlehua", "Tlacaxipehualiztli", "Tozoztontli",
                                  "Huey Tozoztli", "Toxcatl", "Etzcualiztli", "Tecuilhuitontli",
                                  "Huey Tecuilhuitl", "Tlaxochimaco", "Xocotl huetzi",
                                  "Ochpaniztli", "Teotleco", "Tepeilhuitl", "Quecholli",
                                  "Panquetzaliztli", "Atemoztli", "Tititl", "Izcalli",
                                  "Nemontemi")};
const HAAB_NAME = {"mayan": "Haab", "aztec": "Xiuhpohualli"};

function jd_to_haab(jd)
{
    var lcount, day, shift;

    jd = Math.floor(jd) + 0.5;
    lcount = jd - MAYAN_COUNT_EPOCH;
    shift = {"mayan": 8, "aztec": 166}[document.mayancount.type.value];
    day = mod(lcount + shift + ((18 - 1) * 20), 365);

    return new Array (Math.floor(day / 20) + 1, mod(day, 20));
}

//  JD_TO_TZOLKIN  --  Determine Tzolkin "month" and day from Julian day

var TZOLKIN_MONTHS = {"mayan": new Array("Imix", "Ik", "Akbal", "Kan", "Chikchan",
                                     "Kimi", "Manik", "Lamat", "Muluk", "Oc",
                                     "Chuwen", "Eb", "Ben", "Ix", "Men",
                                     "Kib", "Kaban", "Etznab", "Kawak", "Ahau"),
                      "aztec": new Array("Cipactli", "Ehecatl", "Calli", "Cuetzpalin",
                                    "Coatl", "Miquiztli", "Mazatl", "Tochtli", "Atl",
                                    "Itzcuintli", "Ozomahtli", "Malinalli", "Acatl",
                                    "Ocelotl", "Cuauhtli", "Cozcacuautli", "Ollin",
                                    "Tecpatl", "Quiyahuitl", "Xochitl")};
const TZOLKIN_NAME = {"mayan": "Tzolkin", "aztec": "Tonalpohualli"};

function jd_to_tzolkin(jd)
{
    var lcount;

    jd = Math.floor(jd) + 0.5;
    lcount = jd - MAYAN_COUNT_EPOCH;
    return new Array (amod(lcount + 20, 20), amod(lcount + 4, 13));
}

//  INDIAN_CIVIL_TO_JD  --  Obtain Julian day for Indian Civil date

function indian_civil_to_jd(year, month, day)
{
    var Chaitra, gyear, leap, start, jd, m;

    gyear = year + 78;
    leap = leap_gregorian(gyear);     // Is this a leap year ?
    start = gregorian_to_jd(gyear, 3, leap ? 21 : 22);
    Chaitra = leap ? 31 : 30;

    if (month == 1) {
        jd = start + (day - 1);
    } else {
        jd = start + Chaitra;
        m = month - 2;
        m = Math.min(m, 5);
        jd += m * 31;
        if (month >= 8) {
            m = month - 7;
            jd += m * 30;
        }
        jd += day - 1;
    }

    return jd;
}

//  JD_TO_INDIAN_CIVIL  --  Calculate Indian Civil date from Julian day

function jd_to_indian_civil(jd)
{
    var Chaitra, Shaka, greg, greg0, leap, start, year, yday, mday;

    Shaka = 79 - 1;                    // Offset in years from Shaka era to Gregorian epoch
    start = 80;                       // Day offset between Shaka and Gregorian

    jd = Math.floor(jd) + 0.5;
    greg = jd_to_gregorian(jd);       // Gregorian date for Julian day
    leap = leap_gregorian(greg[0]);   // Is this a leap year?
    year = greg[0] - Shaka;            // Tentative year in Shaka era
    greg0 = gregorian_to_jd(greg[0], 1, 1); // JD at start of Gregorian year
    yday = jd - greg0;                // Day number (0 based) in Gregorian year
    Chaitra = leap ? 31 : 30;          // Days in Chaitra this year

    if (yday < start) {
        //  Day is at the end of the preceding Shaka year
        year--;
        yday += Chaitra + (31 * 5) + (30 * 3) + 10 + start;
    }

    yday -= start;
    if (yday < Chaitra) {
        month = 1;
        day = yday + 1;
    } else {
        mday = yday - Chaitra;
        if (mday < (31 * 5)) {
            month = Math.floor(mday / 31) + 2;
            day = (mday % 31) + 1;
        } else {
            mday -= 31 * 5;
            month = Math.floor(mday / 30) + 7;
            day = (mday % 30) + 1;
        }
    }

    return new Array(year, month, day);
}

// JD_TO_MANGLI -- Calculate Mangli date from Julian day

const MANGLI_EPOCH = 2435208.5;
const MANGLI_YEAR_LENGTH = 668.0 + (1/2.0) + (1/10.0) - (1/1111.0);
const MANGLI_MONTH_LENGTH = 27.833333333;
const SOL = 1.0274912517;
const MARS_ORBIT = 668.5991*SOL;

function daysInMangliMonth(year, month) {
  let months = [27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28];
  if ((year % 2) == 0)
    months[3] = 28;
  if ((year % 10) == 0)
    months[2] = 28;
  if ((year % 1111) == 0)
    months[23] = 27;
  return months[month - 1]*1.0;
}
function jd_to_md(jd) {
  jd -= timeZone(1, jd);
  return (jd - MANGLI_EPOCH)/SOL - 0.785682222222 // Martian day like Julian day
}
function md_to_jd(md) {
  var jd = (md + 0.785682222222)*SOL + MANGLI_EPOCH;
  return jd + timeZone(1, jd);
}
function jd_to_mangli(jd) {
  var year, month, sol, ls;
  let md = jd_to_md(jd);
  year = Math.floor(md/MANGLI_YEAR_LENGTH) + 1;
  let yearStart = jd_to_md(mangli_to_jd(year, 1, 1));
  month = Math.floor((md-yearStart)/MANGLI_MONTH_LENGTH) + 1;
  while (month > 24) {
    year ++;
    month -= 24;
  }
  sol = Math.floor(md - jd_to_md(mangli_to_jd(year, month, 1)) ) + 1;
  while (daysInMangliMonth(year, month) < sol) {
    sol -= daysInMangliMonth(year, month);
    month++;
  }
  if (sol <= 0) {
    month--;
    if (month < 1) {
      year--;
      month += 24;
    }
    sol += daysInMangliMonth(year, month);
  }
  let time = md % 1.0;
  if (time < 0) time += 1;
  let hour = time*24.0;
  let min = (hour%1.0)*60.0;
  let sec = (min%1.0)*60.0;

  let t = (((jd-MANGLI_EPOCH) % MARS_ORBIT)/MARS_ORBIT)*2*Math.PI;
  if (t < 0) t += 2*Math.PI;
  let c = 0.0934;
  let b = Math.sqrt(1 - c*c);
  ls = rtd( Math.atan( (b*Math.sin(t))/(Math.cos(t) + c) ) );
  if (Math.sin(t) > 0) {
    if (Math.cos(t) + c < 0) ls += 180;
  } else {
    if (Math.cos(t) + c < 0) ls += 180;
    else ls += 360;
  }
  ls = (ls%360).toFixed(2);

  return new Array(year, month, sol,
    Math.floor(hour), Math.floor(min), Math.floor(sec),
    ls, md + 28893.0);
}

// MANGLI_TO_JD -- Calculate Julian day from Mangli date

function mangli_to_jd(year, month, sol, hour=0, minute=0, second=0) {
  let md = (sol - 1 +
    MANGLI_YEAR_LENGTH*(year - 1));
  for (let i = 1; i < month; i++)
    md += daysInMangliMonth(year, i);
  let currentTime = mod(md,1.0);
  let actualTime = (hour/24.0)+(minute/1440.0)+(second/86400.0);
  md += (actualTime-currentTime);
  let jd = md_to_jd(md);
  return jd + 1/172800.0;
}

// JD_TO_CHINESE -- Calculate Chinese lunar calendar date from Julian day

function principalTerm(jd) {
  return modPos((sunpos(jd, 8)[4])/30.0 + 1, 12.0) + 1;
}
function termChange(jd1, jd2) {
  return (Math.floor(principalTerm(jd1)) != Math.floor(principalTerm(jd2)));
}
function chineseLeapMonth(year) {
  var monthCount = local_equinox_jd(year, true, 3, 8);
  monthCount = moonPhaseBefore(monthCount, 0, true); // Start of month 11 this year
  var solsticeMonth = monthCount, months = 12, leapMonth = 0;
  monthCount = moonPhaseAfter(monthCount+15, 0);
  if (!termChange(monthCount, moonPhaseAfter(monthCount+15, 0))) {
    leapMonth = 12;
  }
  var monthStarts = {11: solsticeMonth, 12: monthCount};
  monthCount = solsticeMonth; // Start of month 11
  for (var i = 11; i >= 1; i--) {
    monthStarts[i] = monthCount;
    var nextMonthStart = monthStarts[i+1];
    if (!termChange(nextMonthStart, monthCount)) {
      leapMonth = i; // Takes first leap month going backwards in the year
      i++;
    }
    if (i > 1) monthCount = moonPhaseBefore(monthCount-15, 0);
  }
  return new Array(leapMonth, monthCount, monthStarts); // Also returns beginning of the year
}
function jd_year_chinese_date(jd, year, leap=null) {
  if (leap == null) leap = chineseLeapMonth(year);
  var start = leap[1]; var end = start;
  var leapMonth = leap[0];
  var months = 12, month=null, day=null;
  if (leapMonth != 0) months = 13;
  for (var i = 1; i <= months; i++) {
    if (i >= 12)
      end = moonPhaseAfter(start+15, 0);
    else
      end = leap[2][i+1];
    if (Math.floor(start+0.5)-0.5 <= jd && jd < Math.floor(end+0.5)-0.5) {
      month = i;
      day = (Math.floor(jd+0.5)-Math.floor(start+0.5))+1;
    }
    start = end;
  }
  return new Array(day, month, leapMonth, year+2698, leap[1]);
}
function jd_to_chinese(jd, existingLeap=null) {
  var year = jd_to_gregorian(jd)[0];
  var month, leapMonth, calc;
  FORCE_BEIJING = true;
  calc = jd_year_chinese_date(jd, year, existingLeap);
  if (calc[0] == null)
    calc = jd_year_chinese_date(jd, year - 1, existingLeap);
  if (calc[0] == null)
    calc = jd_year_chinese_date(jd, year + 1, existingLeap);
  FORCE_BEIJING = false;
  /* Leap month is 0 if there is no leap month, or is the number month that is
    a leap month if there is a leap month in the year */
  // Returns year, month, day, leapYear (true or false), leapMonth
  return new Array(calc[3], calc[1], calc[0], (calc[2] != 0), calc[2], calc[4]);
}

// CHINESE_TO_JD -- Calculate Julian day from Chinese lunar date

function chinese_to_jd(year, month, day) {
  year -= 2698;
  FORCE_BEIJING = true;
  var leap = chineseLeapMonth(year)[0];
  if (month > leap && leap != 0) month++;
  if (month > 13) month = 13;
  if (leap == 0 && month == 13) month = 12;
  var monthsAfterSolsticeMonth = month + 1;
  var solstice = local_equinox_jd(year-1, true, 3, 8);
  var jd = solstice;
  jd = moonPhaseBefore(jd, 0, true); // Beginning of month 11
  for (var i = 0; i < monthsAfterSolsticeMonth; i++) {
    jd = moonPhaseAfter(jd, 0, true) + 3;
  }
  jd = moonPhaseBefore(jd, 0) + (day - 1);
  FORCE_BEIJING = false;
  return Math.floor(jd+0.5)-0.5;
}

/*  updateFromGregorian  --  Update all calendars from Gregorian.
                             "Why not Julian date?" you ask.  Because
                             starting from Gregorian guarantees we're
                             already snapped to an integral second, so
                             we don't get roundoff errors in other
                             calendars.  */

function updateFromGregorian()
{
    var j_real, j, j2, year, mon, mday, hour, min, sec, moonTime,
        weekday, islamicWeekday, julcal, hebcal, islcal, hmindex, utime,
        isoweek, may_countcal, haabcal, tzolkincal, frrcal, zodiac,
        indcal, isoday, xgregcal, moonPhase, mangli, mapIndex, chlcal;

    let holidays = [], dayHolidays = [];
    year = new Number(document.gregorian.year.value);
    mon = document.gregorian.month.selectedIndex;
    mday = new Number(document.gregorian.day.value);
    hour = min = sec = 0;
    hour = new Number(document.basic.hour.value);
    min = new Number(document.basic.min.value);
    sec = new Number(document.basic.sec.value);
    document.basic.hour.value = formatTime(hour, 24);
    document.basic.min.value = formatTime(min, 60);
    document.basic.sec.value = formatTime(sec, 60);
    updateSun();
    document.calendarMaker.year.value = year;
    if (document.calendarMaker.month.selectedIndex != 12)
      document.calendarMaker.month.selectedIndex = mon;
    SUNRISE = (document.basic.hourS2.value/24.0) + (document.basic.minS2.value/1440.0);
    SUNSET = (document.basic.hourS.value/24.0) + (document.basic.minS.value/1440.0);
    mapImage = "maps/map_" + ["january", "april", "july", "october"][
      [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 0][mon]] + ".jpg";
    drawClock();
    drawQibla();
    drawMap();

    //  Update Julian day
    j = gregorian_to_jd(year, mon + 1, mday);
    j_real = j + hour/24.0 + min/1440.0 + sec/86400.0;
    j2 = j_real;

    document.julianday.day.value = j_real;
    document.modifiedjulianday.day.value = j_real - JMJD;
    saveJulian();

    //  Update day of week in Gregorian box
    weekday = jwday(j);
    document.gregorian.wday.value = Weekdays[weekday];

    // Update DST and time zone
    if (document.basic.dst.value != "none") {
      if (is_dst(j)) document.getElementById("dstActive").innerHTML = "(Yes: " + formatTimeZone() + ")";
      else document.getElementById("dstActive").innerHTML = "(No: " + formatTimeZone() + ")";
    } else {
      document.getElementById("dstActive").innerHTML = "(" + formatTimeZone() + ")";
    }

    //  Update leap year status in Gregorian box

    document.gregorian.leap.value = lang1Data.normLeap[leap_gregorian(year) ? 1 : 0];

    holidays = holidays.concat(gregorianHolidays(year, mon, mday, j));
    weekday = jwday(j);

    //  Update Julian Calendar

    julcal = jd_to_julian(j);
    document.juliancalendar.year.value = julcal[0];
    document.juliancalendar.month.selectedIndex = julcal[1] - 1;
    document.juliancalendar.day.value = julcal[2];
    document.juliancalendar.leap.value = lang1Data.normLeap[leap_julian(julcal[0]) ? 1 : 0];
    document.juliancalendar.wday.value = Weekdays[weekday];
    holidays = holidays.concat(julianHolidays(julcal));

    //  Update Hebrew Calendar

    islamicWeekday = jwday(j);
    if (modPos(j_real+0.5, 1.0) >= SUNSET && SUNSET > 0.4) {
      islamicWeekday++;
      islamicWeekday = mod(islamicWeekday, 7);
    } else if (modPos(j_real+0.5, 1.0) < SUNSET && SUNSET <= 0.4) {
      islamicWeekday--;
      islamicWeekday = mod(islamicWeekday, 7);
    }

    hebcal = jd_to_hebrew(j_real);
    if (hebrew_leap(hebcal[0])) {
        document.hebrew.month.options.length = 13;
        set_hebrew_start();
    } else {
        document.hebrew.month.options.length = 12;
        set_hebrew_start();
    }
    document.hebrew.year.value = hebcal[0];
    document.hebrew.month.value = hebcal[1];
    document.hebrew.day.value = hebcal[2];
    hmindex = hebcal[1];
    if (hmindex == 12 && !hebrew_leap(hebcal[0])) {
        hmindex = 14;
    }
    switch (hebrew_year_days(hebcal[0])) {
        case 353:
            document.hebrew.leap.value = lang5Data.yearTypes[0];
            break;
        case 354:
            document.hebrew.leap.value = lang5Data.yearTypes[1];
            break;
        case 355:
            document.hebrew.leap.value = lang5Data.yearTypes[2];
            break;
        case 383:
            document.hebrew.leap.value = lang5Data.yearTypes[3];
            break;
        case 384:
            document.hebrew.leap.value = lang5Data.yearTypes[4];
            break;
        case 385:
            document.hebrew.leap.value = lang5Data.yearTypes[5];
            break;
        default:
            document.hebrew.leap.value = "Invalid year length: " +
                hebrew_year_days(hebcal[0]) + " days.";
            break;
    }
    holidays = holidays.concat(hebrewHolidays(hebcal));
    dayHolidays = dayHolidays.concat(hebrewHolidays(jd_to_hebrew(j)));
    if (modPos(j_real+0.5,1) < SUNSET && SUNSET != 1)
      dayHolidays = dayHolidays.concat(hebrewHolidays(jd_to_hebrew(j+1)));

    let waning = false;
    moonPhase = modPos(180.0 + tithi(j_real)*12.0);
    if (moonPhase < 180.0) waning = true;
    moonPhase = 0.5*(1 + dcos(moonPhase));
    drawMoon(moonPhase, j_real);
    moonPhase = Math.round(moonPhase*1000.0)/10.0 + "%";
    if (moonPhase != "0%" && moonPhase != "100%")
      moonPhase += " " + {true: "waning", false: "waxing"}[waning];
    document.basic.moon.value = moonPhase;
    moonTime = moonTimes_jd(j_real, 0);
    document.getElementById("M0").innerHTML = [" Yesterday", "", " Tomorrow"][moonTime[1] + 1];
    moonTime = jd_to_timeOfDay(moonTime[0]);
    document.basic.hourM0.value = formatTime(moonTime[0], 24, true);
    document.basic.minM0.value = formatTime(moonTime[1], 60);
    moonTime = moonTimes_jd(j_real, 2);
    document.getElementById("M1").innerHTML = [" Yesterday", "", " Tomorrow"][moonTime[1] + 1];
    moonTime = jd_to_timeOfDay(moonTime[0]);
    document.basic.hourM1.value = formatTime(moonTime[0], 24, true);
    document.basic.minM1.value = formatTime(moonTime[1], 60);
    moonTime = moonTimes_jd(j_real, 1);
    document.getElementById("M2").innerHTML = [" Yesterday", "", " Tomorrow"][moonTime[1] + 1];
    moonTime = jd_to_timeOfDay(moonTime[0]);
    document.basic.hourM2.value = formatTime(moonTime[0], 24, true);
    document.basic.minM2.value = formatTime(moonTime[1], 60);
    values = moonpos(j_real);
    document.basic.moonDistance.value = Math.round(values[14]/1000)*1000 + " km";
    values = moonpos2(j_real);
    document.basic.moonAzimuth.value = Math.round(values[0]) + "° " +
      ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][degreeDir(values[0])];
    document.basic.moonElevation.value = Math.round(values[1]) + "°";
    document.basic.nextFull.value = Math.ceil(Math.floor(moonPhaseAfter(j_real, 1)-0.5)+0.5 - j) + " days";
    if (document.basic.nextFull.value == "1 days") document.basic.nextFull.value = "Tomorrow";
    if (document.basic.nextFull.value == "0 days") document.basic.nextFull.value = "Today";
    document.basic.nextNew.value = Math.ceil(Math.floor(moonPhaseAfter(j_real, 0)-0.5)+0.5 - j) + " days";
    if (document.basic.nextNew.value == "1 days") document.basic.nextNew.value = "Tomorrow";
    if (document.basic.nextNew.value == "0 days") document.basic.nextNew.value = "Today";
    if (document.basic.hourM0.value == "24" && values[1]<0)
      document.basic.hourM0.value = "00";
    if (document.basic.hourM2.value == "24" && values[1]<0)
      document.basic.hourM2.value = "00";

    //  Update Islamic Calendar

    islcal = jd_to_islamic(j_real);
    document.islamic.year.value = islcal[0];
    document.islamic.month.selectedIndex = islcal[1] - 1;
    document.islamic.day.value = islcal[2];
    document.islamic.wday.value = ISLAMIC_WEEKDAYS[islamicWeekday];
    document.islamic.leap.value = lang2Data.yearTypes[leap_islamic(islcal[0]) ? 1 : 0];
    holidays = holidays.concat(islamicHolidays(islcal));
    dayHolidays = dayHolidays.concat(islamicHolidays(jd_to_islamic(j)));
    if (modPos(j_real+0.5,1) < SUNSET && SUNSET != 1)
      dayHolidays = dayHolidays.concat(islamicHolidays(jd_to_islamic(j+1)));


    //  Update Persian Astronomical Calendar

    perscal = jd_to_persiana(j);
    document.persiana.year.value = perscal[0];
    document.persiana.month.selectedIndex = perscal[1] - 1;
    document.persiana.day.value = perscal[2];
    document.persiana.wday.value = PERSIAN_WEEKDAYS[weekday];
    document.persiana.leap.value = lang4Data.normLeap[leap_persiana(perscal[0]) ? 1 : 0];

    // Update Hindu Calendar

    hinducal = jd_to_hindu(j_real);
    document.hinducalendar.year.value = hinducal[0];
    document.hinducalendar.month.value = hinducal[1];
    document.hinducalendar.day.value = hinducal[2];
    document.hinducalendar.monthType.selectedIndex = 0;
    if (hinducal[3] == 1) {
      document.hinducalendar.monthType.style.display = "inline-block";
      document.hinducalendar.monthType.selectedIndex = 0;
    } else if (hinducal[3] == 2) {
      document.hinducalendar.monthType.style.display = "inline-block";
      document.hinducalendar.monthType.selectedIndex = 1;
    } else {
      document.hinducalendar.monthType.selectedIndex = 0;
      document.hinducalendar.monthType.style.display = "none";
    }
    j2 = j_real;
    if (!isNaN(sunTimes_jd(j, 0, false))) {
      if (mod(j2+0.5,1.0) < sunTimes_jd(j, 0, false)) j2--;
    }
    j2 = Math.floor(j2-0.5)+0.5+sunTimes_jd(j2, 0, true);
    hinducal = jd_to_hindu(j2);
    document.hinducalendar.weekday.value = lang3Data.weekdays[jwday(j2)];
    document.hinducalendar.solarDay.value = lang3Data.months[hinducal[1] - 1] + " " +
      hinduDayName(hinducal[2], POONAM ? true : false);
    zodiac = getZodiac(j_real, false);
    document.hinducalendar.zodiac.value = lang3Data.zodiac[zodiac - 1] + " (" + Math.floor(sunpos(j_real)[12]) + "°)";
    document.hinducalendar.ayanamsha.value = Math.round(sunpos(j_real)[15]*1000.0)/1000.0 + "°";
    holidays = holidays.concat(hinduHolidays(hinducal, j2));
    dayHolidays = dayHolidays.concat(hinduHolidays(hinducal, j2));
    dayHolidays = dayHolidays.concat(hinduHolidays(jd_to_hindu(j2-1.0), j2-1.0));
    if (HINDU_OFFSET == 593) {
      if (hinducal[1] == 12)
        document.hinducalendar.ritu.value = lang3Data.seasons[0];
      else
        document.hinducalendar.ritu.value = lang3Data.seasons[Math.floor(hinducal[1]/2.0)];
    } else
      document.hinducalendar.ritu.value = lang3Data.seasons[Math.floor((hinducal[1]-1)/2.0)];
    //  Update Indian Civil Calendar

    indcal = jd_to_indian_civil(j);
    document.indiancivilcalendar.year.value = indcal[0];
    document.indiancivilcalendar.month.selectedIndex = indcal[1] - 1;
    document.indiancivilcalendar.day.value = indcal[2];
    document.indiancivilcalendar.weekday.value = lang3Data.weekdays[weekday];
    document.indiancivilcalendar.leap.value = lang3Data.yearTypes[leap_gregorian(indcal[0] + 78) ? 1 : 0];


    /*
    // Update Chinese Lunar Calendar

    chlcal = jd_to_chinese(j);
    document.chinese.year.value = chlcal[0];
    document.chinese.month.selectedIndex = chlcal[1] - 1;
    document.chinese.day.value = chlcal[2];
    document.chinese.yearType.value = lang6Data.normLeap[chlcal[3] ? 1 : 0] + lang6Data.stems[modPos(chlcal[0] - 2, 10)] +
      lang6Data.zodiac[modPos(chlcal[0]-2, 12)];
    if (chlcal[3]) {
      document.chinese.month.options.length = 13;
      for (i = 0; i < chlcal[4]; ++i)
        document.chinese.month[i].innerHTML = lang6Data.months[i];
      document.chinese.month[chlcal[4]].innerHTML = lang6Data.months[12] + lang6Data.months[chlcal[4]-1];
      for (i = chlcal[4] + 1; i < 13; i++)
        document.chinese.month[i].innerHTML = lang6Data.months[i-1];
      if (chlcal[4] == 12) {
        document.chinese.month[11].innerHTML = lang6Data.month12;
        document.chinese.month[12].innerHTML = lang6Data.months[11];
      }
    } else {
      document.chinese.month.options.length = 12;
      for (i = 0; i < 12; ++i)
        document.chinese.month[i].innerHTML = lang6Data.months[i];
    }
    holidays = holidays.concat(chineseHolidays(chlcal));
    */

    //  Update Gregorian serial number

    if (document.gregserial != null) {
        document.gregserial.day.value = j - J0000;
    }

    // Update Mayan Calendars

    may_countcal = jd_to_mayan_count(j);
    document.mayancount.baktun.value = may_countcal[0];
    document.mayancount.katun.value = may_countcal[1];
    document.mayancount.tun.value = may_countcal[2];
    document.mayancount.uinal.value = may_countcal[3];
    document.mayancount.kin.value = may_countcal[4];
    haabcal = jd_to_haab(j);
    document.mayancount.haab.value = "" + haabcal[1] + " " +
      HAAB_MONTHS[document.mayancount.type.value][haabcal[0] - 1]
    if (haabcal[0] != 19)
      document.mayancount.haab.value += " (" + haabcal[0] + ")";
    tzolkincal = jd_to_tzolkin(j);
    document.mayancount.tzolkin.value = "" + tzolkincal[1] + " " + TZOLKIN_MONTHS[document.mayancount.type.value][tzolkincal[0] - 1];

    //  Update ISO Week

    isoweek = jd_to_iso(j);
    document.isoweek.year.value = isoweek[0];
    document.isoweek.week.value = isoweek[1];
    document.isoweek.day.value = isoweek[2];

    //  Update ISO Day

    isoday = jd_to_iso_day(j);
    document.isoday.year.value = isoday[0];
    document.isoday.day.value = isoday[1];

    // Update Mangli calendar

    mangli = jd_to_mangli(j_real);
    document.manglicalendar.year.value = mangli[0];
    document.manglicalendar.month.selectedIndex = mangli[1] - 1;
    document.manglicalendar.sol.value = mangli[2];
    document.manglicalendar.hour.value = formatTime(mangli[3], 24);
    document.manglicalendar.min.value = formatTime(mangli[4], 60);
    document.manglicalendar.Ls.value = mangli[6] + "°";
    document.manglicalendar.msd.value = Math.round(mangli[7]*100.0)/100.0;

    // Add equinoxes and solstices to events list
    equinoxes = ["Spring equinox", "Summer solstice", "Autumn equinox", "Winter solstice"];
    for (var i = 0; i < 4; i++) {
      if (local_equinox_jd(year, true, i) == j) {
        holidays.push(equinoxes[modPos(i + document.basic.NS.selectedIndex*2, 4)]);
        if (i == 0) holidays.push("Nowruz");
      }
    }

    // Make events list
    holidays.sort();
    document.getElementById("holidays").innerHTML =
      "<tr><th>&emsp;&emsp;Events at this time&emsp;&emsp;</th></tr>";
    if (holidays.length == 0) holidays.push("No events");
    for (var i = 0; i < holidays.length; i++) {
      document.getElementById("holidays").innerHTML += "<tr><td>" +
        holidays[i] + "</td></tr>";
    }
    dayHolidays.sort();
    dayHolidays = new Set(dayHolidays);
    for (var i = 0; i < holidays.length; i++) dayHolidays.delete(holidays[i]);
    if (dayHolidays.size == 0) dayHolidays.add("None");
    document.getElementById("holidays").innerHTML += "<th>Other events on this day</th>";
    dayHolidays.forEach(function(holiday) {
      if (holidays.indexOf(holiday) == -1)
        document.getElementById("holidays").innerHTML += "<tr><td>" +
          holiday + "</td></tr>";
    });
}

//  calcGregorian  --  Perform calculation starting with a Gregorian date

function calcGregorian()
{
    updateFromGregorian();
}

// changeJulian -- Add or subtract days using Julian calendar

function changeJulian() {
  let j = new Number(document.julianday.day.value);
  let change = new Number(document.julianday.change.value);
  setJulian(j + change);
}
function subtractJulian() {
  let j = new Number(document.julianday.day.value);
  let change = new Number(document.julianday.change.value);
  setJulian(j - change);
}
var playPauseInterval;
function playPauseJulian() {
  var button = document.julianday.playPause;
  if (button.innerHTML == "Play") {
    button.innerHTML = "Pause";
    playPauseInterval = setInterval(changeJulian, 100);
  } else {
    button.innerHTML = "Play";
    clearInterval(playPauseInterval);
  }
}

//  calcJulian  --  Perform calculation starting with a Julian date

function calcJulian()
{
    var j, date, time;

    j = new Number(document.julianday.day.value);
    date = jd_to_gregorian(j);
    time = jhms(j);
    document.gregorian.year.value = date[0];
    document.gregorian.month.selectedIndex = date[1] - 1;
    document.gregorian.day.value = date[2];
    document.basic.hour.value = pad(time[0], 2, " ");
    document.basic.min.value = pad(time[1], 2, "0");
    document.basic.sec.value = pad(time[2], 2, "0");
    updateFromGregorian();
}

//  setJulian  --  Set Julian date and update all calendars

function setJulian(j)
{
    document.julianday.day.value = new Number(j);
    calcJulian();
}

//  calcModifiedJulian  --  Update from Modified Julian day

function calcModifiedJulian()
{
    setJulian((new Number(document.modifiedjulianday.day.value)) + JMJD);
}

//  calcJulianCalendar  --  Update from Julian calendar

function calcJulianCalendar()
{
    setJulian(julian_to_jd((new Number(document.juliancalendar.year.value)),
                           document.juliancalendar.month.selectedIndex + 1,
                           (new Number(document.juliancalendar.day.value))));
}

//  calcHebrew  --  Update from Hebrew calendar

function calcHebrew()
{
    setJulian(hebrew_to_jd((new Number(document.hebrew.year.value)),
                          new Number(document.hebrew.month.value),
                          (new Number(document.hebrew.day.value))));
}

//  calcIslamic  --  Update from Islamic calendar

function calcIslamic()
{
    setJulian(islamic_to_jd((new Number(document.islamic.year.value)),
                           document.islamic.month.selectedIndex + 1,
                           (new Number(document.islamic.day.value))));
}

function calcHindu()
{
    let monthType = document.hinducalendar.monthType;
    setJulian(hindu_to_jd(new Number(document.hinducalendar.year.value),
                    new Number(document.hinducalendar.month.value),
                    new Number(document.hinducalendar.day.value),
                    (monthType.selectedIndex == 0 && monthType.style.display != "none") ));
}
function calcHinduDivasa()
{
    let monthType = document.hinducalendar.monthType;
    setJulian(divasa_to_jd(new Number(document.hinducalendar.year.value),
                    new Number(document.hinducalendar.month.value),
                    new Number(document.hinducalendar.day.value),
                    (monthType.selectedIndex == 0 && monthType.style.display != "none") ));
}

//  calcPersian  --  Update from Persian calendar

function calcPersian()
{
    setJulian(persian_to_jd((new Number(document.persian.year.value)),
                           document.persian.month.selectedIndex + 1,
                           (new Number(document.persian.day.value))));
}

//  calcPersiana  --  Update from Persian astronomical calendar

function calcPersiana()
{
    setJulian(persiana_to_jd((new Number(document.persiana.year.value)),
                           document.persiana.month.selectedIndex + 1,
                           (new Number(document.persiana.day.value))) + 0.5);
}

//  calcMayanCount  --  Update from the Mayan Long Count

function calcMayanCount()
{
    updateMayanDesc();
    setJulian(mayan_count_to_jd((new Number(document.mayancount.baktun.value)),
                                (new Number(document.mayancount.katun.value)),
                                (new Number(document.mayancount.tun.value)),
                                (new Number(document.mayancount.uinal.value)),
                                (new Number(document.mayancount.kin.value))));
}

//  calcIndianCivilCalendar  --  Update from Indian Civil Calendar

function calcIndianCivilCalendar()
{
    setJulian(indian_civil_to_jd(
                           (new Number(document.indiancivilcalendar.year.value)),
                           document.indiancivilcalendar.month.selectedIndex + 1,
                           (new Number(document.indiancivilcalendar.day.value))));
}

//  calcFrench  -- Update from French Republican calendar

function calcFrench()
{
    var decade, j, mois;

    j = document.french.jour.selectedIndex;
    decade = document.french.decade.selectedIndex;
    mois = document.french.mois.selectedIndex;

    /*  If the currently selected day is one of the sansculottides,
        adjust the index to be within that period and force the
        decade to zero and the month to 12, designating the
        intercalary interval.  */

    if (j > 9) {
        j -= 11;
        decade = 0;
        mois = 12;
    }

    /*  If the selected month is the pseudo-month of the five or
        six sansculottides, ensure that the decade is 0 and the day
        number doesn't exceed six.  To avoid additional overhead, we
        don't test whether a day number of 6 is valid for this year,
        but rather simply permit it to wrap into the first day of
        the following year if this is a 365 day year.  */

    if (mois == 12) {
        decade = 0;
        if (j > 5) {
            j = 0;
        }
    }

    setJulian(french_revolutionary_to_jd((new Number(document.french.an.value)),
                                         mois + 1,
                                         decade + 1,
                                         j + 1));
}

// calcMangli -- Update from Mangli calendar

function calcMangli()
{
  setJulian(mangli_to_jd(new Number(document.manglicalendar.year.value),
    new Number(document.manglicalendar.month.value),
    new Number(document.manglicalendar.sol.value),
    new Number(document.manglicalendar.hour.value),
    new Number(document.manglicalendar.min.value), 0));
}

// calcChinese -- Update from Chinese lunar calendar

function calcChinese()
{
  setJulian(chinese_to_jd(new Number(document.chinese.year.value),
    new Number(document.chinese.month.selectedIndex+1),
    new Number(document.chinese.day.value)));
}

//  calcGregSerial  --  Update from Gregorian serial day number

function calcGregSerial()
{
    setJulian((new Number(document.gregserial.day.value)) + J0000);
}

//  calcExcelSerial1900  --  Perform calculation starting with an Excel 1900 serial date

function calcExcelSerial1900()
{
    var d = new Number(document.excelserial1900.day.value);

    /* Idiot Kode Kiddies didn't twig to the fact
       (proclaimed in 1582) that 1900 wasn't a leap year,
       so every Excel day number in every database on Earth
       which represents a date subsequent to February 28,
       1900 is off by one.  Note that there is no
       acknowledgement of this betrayal or warning of its
       potential consequences in the Excel help file.  Thank
       you so much Mister Talking Paper Clip.  Some day
       we're going to celebrate your extinction like it was
       February 29 ... 1900.  */

    if (d > 60) {
        d--;
    }

    setJulian((d - 1) + J1900);
}

//  calcExcelSerial1904  --  Perform calculation starting with an Excel 1904 serial date

function calcExcelSerial1904()
{
    setJulian((new Number(document.excelserial1904.day.value)) + J1904);
}

//  calcUnixTime  --  Update from specified Unix time() value

function calcUnixTime()
{
    var t = new Number(document.unixtime.time.value);

    setJulian(J1970 + (t / (60 * 60 * 24)));
}

//  calcIsoWeek  --  Update from specified ISO year, week, and day

function calcIsoWeek()
{
    var year = new Number(document.isoweek.year.value),
        week = new Number(document.isoweek.week.value),
        day = new Number(document.isoweek.day.value);

    setJulian(iso_to_julian(year, week, day));
}

//  calcIsoDay  --  Update from specified ISO year and day of year

function calcIsoDay()
{
    var year = new Number(document.isoday.year.value),
        day = new Number(document.isoday.day.value);

    setJulian(iso_day_to_julian(year, day));
}

// COMPUTUS -- Find Julian day of Easter for a given Gregorian year

function computus(year) {
  var a, b, c, e, f, g, m, d;
  a = Math.floor(year/100);
  b = a - Math.floor(a/4);
  c = modPos(year, 19);
  e = modPos(15 + 19*c + b - (a - (a-17)/25)/3, 30);
  f = e - (c + 11*e)/319;
  g = 22 + f + modPos(14004 - year - Math.floor(year/4) + b - f, 7);
  m = 3 + Math.floor(g/32);
  d = 1 + modPos(g-1, 31);
  return gregorian_to_jd(year, m, d);
}

function drawClock() {
  const SCALE = 2.0;
  var canvas = document.getElementById("clock");
  var ctx = canvas.getContext("2d");
  canvas.width = 100.0*SCALE; canvas.height = 100.0*SCALE;
  canvas.style.width = "100px"; canvas.style.height = "100px";
  ctx.scale(SCALE, SCALE);
  ctx.clearRect(0, 0, 100, 100);
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(50, 50, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  let realHours = new Number(document.basic.hour.value);
  let realMins = new Number(document.basic.min.value);
  realMins += document.basic.sec.value/60.0;
  realHours += realMins/60.0;
  let hours = ((realHours % 12.0)* 30.0 - 90.0) * Math.PI / 180.0;
  let minutes = (realMins * 6.0 - 90.0) * Math.PI / 180.0;
  ctx.strokeStyle = "#777777";
  ctx.lineWidth = 1;
  for (var i = 0; i < 360; i+=6) {
    ctx.beginPath();
    ctx.moveTo(42 * dcos(i) + 50, 42 * dsin(i) + 50);
    ctx.lineTo(43 * dcos(i) + 50, 44 * dsin(i) + 50);
    ctx.stroke();
  }
  ctx.strokeStyle = "#555555";
  for (var i = 0; i < 360; i+=30) {
    ctx.beginPath();
    ctx.moveTo(40 * dcos(i) + 50, 40 * dsin(i) + 50);
    ctx.lineTo(44 * dcos(i) + 50, 44 * dsin(i) + 50);
    ctx.stroke();
  }
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(30 * Math.cos(hours) + 50, 30 * Math.sin(hours) + 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(40 * Math.cos(minutes) + 50, 40 * Math.sin(minutes) + 50);
  ctx.stroke();
}
function drawQibla() {
  const SCALE = 4.0;
  var dirs = {
    "ur": ["اُ", "دَ", "پُ", "پَ"],
    "ar": ["شَ", "جَ", "شَ", "غَ"],
    "en": ["N", "S", "E", "W"],
    "hi": ["उ", "द", "पू", "प"],
    "id": ["U", "S", "T", "B"],
    "fa": ["شَ", "جَ", "شَ", "غَ"]
  }[document.language.language2.value];
  var color1 = {"": "#F2B826", "ocean": "#097EC6",
    "night": "#11105B", "silver": "#565656"}[theme];
  var color2 = {"": "#C6AA09", "ocean": "#07B9D8",
    "night": "#002D82", "silver": "#969696"}[theme];
  var color3 = {"": "#097EC6", "ocean": "#FFFB0B",
    "night": "#097EC6", "silver": "#3F3F3F"}[theme];
  var canvas = document.getElementById("drawQibla");
  var ctx = canvas.getContext("2d");
  canvas.width = 100.0*SCALE; canvas.height = 100.0*SCALE;
  canvas.style.width = "100px"; canvas.style.height = "100px";
  ctx.scale(SCALE, SCALE);
  ctx.clearRect(0, 0, 100, 100);
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(50, 50, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.font = "15px Times New Roman";
  ctx.textAlign = "center";
  ctx.fillStyle = color3;
  ctx.lineWidth = 1;
  ctx.fillText(dirs[0], 50, 30);
  ctx.fillText(dirs[1], 50, 80);
  ctx.fillText(dirs[2], 80, 50);
  ctx.fillText(dirs[3], 20, 50);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#009933";
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(35 * Math.cos(qibla()) + 50, 50 - 35 * Math.sin(qibla()));
  var qiblaDir = modPos(90 - rtd(qibla()), 360);
  qiblaDir = Math.round(qiblaDir).toString(10);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.fillStyle = {"": "#000000", "ocean": "#000000",
    "night": "#FFFFFF", "silver": "#000000"}[theme];
  ctx.font = "24px Times New Roman";
  var l2 = lang2Data.numberMap;
  if (l2 != null) {
    qiblaDir = mapNumberStr(qiblaDir, l2);
  }
  ctx.fillText(qiblaDir, 50, 58);
}
function mapNumberStr(num, lang) {
  if (lang == "he") {
    num = parseInt(num);
    return hebrew_numeral(num);
  }
  var numberMap = [{"ar": "٠", "ur": "۰", "hi": "०"}[lang], {"ar": "١", "ur": "۱", "hi": "१"}[lang],
    {"ar": "٢", "ur": "۲", "hi": "२"}[lang], {"ar": "٣", "ur": "۳", "hi": "३"}[lang],
    {"ar": "٤", "ur": "۴", "hi": "४"}[lang], {"ar": "٥", "ur": "۵", "hi": "५"}[lang],
    {"ar": "٦", "ur": "۶", "hi": "६"}[lang], {"ar": "٧", "ur": "۷", "hi": "७"}[lang],
    {"ar": "٨", "ur": "۸", "hi": "८"}[lang], {"ar": "٩", "ur": "۹", "hi": "९"}[lang]];
  for (var i = 0; i <= 9; i++)
    num = num.split(i.toString(10)).join(numberMap[i]);
  return num;
}
function drawMoon(phase, jd) {
  var radius = 42;
  var theta = 31/60.0;
  var pos = moonpos(jd);
  theta = rtd(Math.atan( (384400*dtan(theta))/pos[14] ));
  radius *= theta*60/31.0;

  const SCALE = 2.0;
  var canvas = document.getElementById("moon");
  var ctx = canvas.getContext("2d");
  canvas.width = 100.0*SCALE; canvas.height = 100.0*SCALE;
  canvas.style.width = "100px"; canvas.style.height = "100px";
  ctx.scale(SCALE, SCALE);
  ctx.clearRect(0, 0, 100, 100);
  ctx.strokeStyle = "#C6C6C6";
  ctx.fillStyle = "#C6C6C6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(50, 50, radius, 0, Math.PI*2);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  var angle = dtr(180.0 - pos[11]);
  angle = modPos(angle + Math.PI/2, Math.PI*2);
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(50, 50, radius, angle-Math.PI/2, angle+Math.PI/2, true);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  phase = 1 - phase;
  if (phase < 0.5) {
    ctx.strokeStyle = "#C6C6C6";
    ctx.fillStyle = "#C6C6C6";
    phase = 0.5 - phase;
  } else phase -= 0.5;
  var height = 2*phase*radius;
  ctx.beginPath();
  ctx.ellipse(50, 50, radius, height, angle+Math.PI/2, 0, 2*Math.PI);
  ctx.closePath(); ctx.fill(); ctx.stroke();
}
var mapImage = "maps/map_april.jpg";
function drawMap() {
  var latitude = 90 - getLatitude();
  var longitude = 180 + getLongitude();
  const SCALE = 4.0;
  let width = window.innerWidth * 0.5;
  let height = width/2.0;
  longitude *= (width/360.0);
  latitude *= (height/180.0);
  var canvas = document.getElementById("map");
  var ctx = canvas.getContext("2d");
  canvas.width = width*SCALE; canvas.height = height*SCALE;
  canvas.style.width = width + "px"; canvas.style.height = height + "px";
  ctx.scale(SCALE, SCALE);
  ctx.clearRect(0, 0, width, height);
  var img = new Image();
  img.setAttribute("src", mapImage);
  img.onerror = function() {
    document.getElementById("showMap").style.display = "none";
  };
  img.onload = function() {
    ctx.drawImage(img, 0, 0, width, height);
    ctx.fillStyle = "#FF0000"; ctx.strokeStyle = "#FF0000";
    ctx.fillRect(longitude-1, latitude-1, 2, 2);
    ctx.beginPath();
    ctx.arc(longitude, latitude, 5, 0, 2*Math.PI);
    ctx.stroke();
  };
}
function drawSundial(jd) {
  var radius = 84;
  const SCALE = 2.0;
  var canvas = document.getElementById("sundial");
  var ctx = canvas.getContext("2d");
  canvas.width = 200.0*SCALE; canvas.height = 200.0*SCALE;
  canvas.style.width = "200px"; canvas.style.height = "200px";
  ctx.scale(SCALE, SCALE);
  ctx.clearRect(0, 0, 200, 200);
  ctx.fillStyle = "#012C3D";
  ctx.beginPath();
  ctx.arc(100, 100, radius, 0, Math.PI*2);
  ctx.closePath(); ctx.fill();
  ctx.lineWidth = 2;
  var failColors = [];
  function sundialArc(startAngle, endAngle) {
    if (isNaN(startAngle) || isNaN(endAngle)) {
      if (failColors.indexOf(ctx.fillStyle) == -1) failColors.push(ctx.fillStyle);
      return false;
    }
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(100 + radius*dcos(startAngle), 100 - radius*dsin(startAngle));
    ctx.arc(100, 100, radius, dtr(0 - startAngle), dtr(0 - endAngle), true);
    ctx.lineTo(100 + radius*dcos(endAngle), 100 - radius*dsin(endAngle));
    ctx.lineTo(100, 100);
    ctx.closePath(); ctx.fill();
    return true;
  }
  ctx.fillStyle = "#055373";
  if (!sundialArc(270 - sunTimes_jd(jd, 1.3)*360, 270 - sunTimes_jd(jd, -0.3)*360)) {
    sundialArc(270 - sunTimes_jd(jd, -0.2)*360, 270 - sunTimes_jd(jd, 1.2)*360);
  }
  ctx.fillStyle = "#0D7AA6";
  if (!sundialArc(270 - sunTimes_jd(jd, 1.2)*360, 270 - sunTimes_jd(jd, -0.2)*360)) {
    sundialArc(270 - sunTimes_jd(jd, -0.1)*360, 270 - sunTimes_jd(jd, 1.1)*360);
  }
  ctx.fillStyle = "#2C9AC7";
  if (!sundialArc(270 - sunTimes_jd(jd, 1.1)*360, 270 - sunTimes_jd(jd, -0.1)*360)) {
    sundialArc(270 - sunTimes_jd(jd, 0)*360, 270 - sunTimes_jd(jd, 1)*360);
  }
  ctx.fillStyle = "#87CEEB";
  sundialArc(270 - sunTimes_jd(jd, 1)*360, 270 - sunTimes_jd(jd, 0)*360);
  if (failColors.length == 4) {
    if (sunpos2(jd)[1] > 0)
      ctx.fillStyle = "#87CEEB";
    else if (sunpos2(jd)[1] >= -6)
      ctx.fillStyle = "#2C9AC7";
    else if (sunpos2(jd)[1] >= -12)
      ctx.fillStyle = "#0D7AA6";
    else if (sunpos2(jd)[1] >= -18)
      ctx.fillStyle = "#055373";
    else
      ctx.fillStyle = "#012C3D";
    ctx.beginPath();
    ctx.arc(100, 100, radius, 0, 2*Math.PI);
    ctx.closePath(); ctx.fill();
  }
  ctx.strokeStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(100, 100, radius, 0, Math.PI*2);
  ctx.closePath(); ctx.stroke();
  ctx.beginPath();
  for (var i = 0; i < 360; i+=15) {
    ctx.beginPath();
    ctx.moveTo(80 * dcos(i) + 100, 80 * dsin(i) + 100);
    ctx.lineTo(84 * dcos(i) + 100, 84 * dsin(i) + 100);
    ctx.stroke();
  }
  var angle = 270 - sunTimes_jd(jd, 2)*360;
  ctx.fillStyle = "#000000";
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.arc(100 + 60*dcos(angle), 100 - 60*dsin(angle), 5, 0, Math.PI*2);
  ctx.closePath(); ctx.fill();
  angle += 180;
  ctx.beginPath();
  ctx.arc(100 + 60*dcos(angle), 100 - 60*dsin(angle), 5, 0, Math.PI*2);
  ctx.closePath(); ctx.fill();
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = "#FFFF00";
  var angle = 90 - (jd%1.0)*360;
  ctx.beginPath();
  ctx.arc(100 + 60*dcos(angle), 100 - 60*dsin(angle), 5, 0, Math.PI*2);
  ctx.closePath(); ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.font = "14px Times New Roman";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = {"": "#0000FF", "ocean": "#FFFFFF",
    "night": "#FFFFFF", "silver": "#000000"}[theme];
  ctx.fillText("18", 192, 100);
  ctx.fillText("06", 8, 100);
  ctx.fillText("12", 100, 8);
  ctx.fillText("00", 100, 192);
  ctx.fillText("03", 33, 165);
  ctx.fillText("09", 33, 33);
  ctx.fillText("15", 165, 33);
  ctx.fillText("21", 165, 165);
}

// IS_DST -- Determine if a Julian day is daylight savings
function is_dst(jd=null, startend=0) {
  if (jd == null) jd = document.julian.day.value;
  var greg = jd_to_gregorian(jd);
  var gregYear = greg[0];
  var dstType = document.basic.dst.value;
  if (dstType == "uscanada") {
    var start = next_or_current_weekday(0, gregorian_to_jd(gregYear, 3, 1)) + 7;
    var end = next_or_current_weekday(0, gregorian_to_jd(gregYear, 11, 1));
    if (jd >= start && jd <= end) return true;
  } if (dstType == "europe") {
    var start = previous_weekday(0, gregorian_to_jd(gregYear, 4, 1));
    var end = previous_weekday(0, gregorian_to_jd(gregYear, 11, 1));
    if (jd >= start && jd <= end) return true;
  } if (dstType == "mexico") {
    var start = next_or_current_weekday(0, gregorian_to_jd(gregYear, 4, 1));
    var end = previous_weekday(0, gregorian_to_jd(gregYear, 11, 1));
    if (jd >= start && jd <= end) return true;
  } if (dstType == "iran") {
    var persian = jd_to_persiana(jd);
    if (1 <= persian[1] && persian[1] <= 5) return true;
    if (persian[1] == 6 && persian[2] <= 30) return true;
  } if (dstType == "syriajordan") {
    var start = previous_weekday(5, gregorian_to_jd(gregYear, 4, 1));
    var end = previous_weekday(5, gregorian_to_jd(gregYear, 11, 1));
    if (jd >= start && jd <= end) return true;
  } if (dstType == "australia") {
    var start = next_or_current_weekday(0, gregorian_to_jd(gregYear, 10, 1));
    var end = next_or_current_weekday(0, gregorian_to_jd(gregYear, 4, 1));
    if (jd >= start || jd <= end) return true;
  }
  if (dstType == "permanent") return true;
  return false;
}


/*  setDateToToday  --  Preset the fields in
    the request form to today's date.  */

function setDateToToday()
{
    var today = new Date();

    document.gregorian.year.value = today.getFullYear();
    document.gregorian.month.selectedIndex = today.getMonth();
    document.gregorian.day.value = today.getDate();
    document.basic.hour.value = formatTime(today.getHours(), 24);
    document.basic.min.value = formatTime(today.getMinutes(), 60);
    document.basic.sec.value = formatTime(today.getSeconds(), 60);
    updateSun();

}
function jd_to_timeOfDay(jd) {
  jd = mod(jd,1.0);
  jd *= 24.0;
  var hour = Math.floor(jd);
  jd %= 1.0;
  jd *= 60.0;
  var minute = Math.floor(jd);
  return new Array(hour, minute);
}
function formatTime(number, base, bigNaN=false) {
  if (isNaN(number)) {
    if (bigNaN) number = base;
    else number = 0;
  } else number = modPos(number, base);
  if (number < 10) {
    return "0" + number;
  } else {
    return number.toString();
  }
}
function formatHour(number) {
  var hour;
  if (number >= 0)
    hour = Math.floor(number);
  else hour = Math.ceil(number);
  var minute = Math.floor(Math.abs(number%1.0)*60.0);
  return new Array(hour, minute);
}
function formatTimeZone() {
  var zone = formatHour(timeZone(0));
  if (zone[0] < 0)
    return "UTC-" + Math.abs(zone[0]) + ":" + formatTime(zone[1], 60);
  else if (zone[0] > 0)
    return "UTC+" + zone[0] + ":" + formatTime(zone[1], 60);
  else {
    if (zone[1] == 0)
      return "UTC±0:00";
    else
      return "UTC+" + zone[0] + ":" + formatTime(zone[1], 60);
  }
}
function updateSun() {
  var date = new Array(
      new Number(document.gregorian.year.value),
      document.gregorian.month.selectedIndex,
      new Number(document.gregorian.day.value));
  var time = sunTimes(date, 1);
  var hour, min, sec;
  hour = new Number(document.basic.hour.value);
  min = new Number(document.basic.min.value);
  sec = new Number(document.basic.sec.value);
  document.basic.hourS.value = formatTime(time[0], 24, true);
  document.basic.minS.value = formatTime(time[1], 60);
  time = sunTimes(date, 0);
  document.basic.hourS2.value = formatTime(time[0], 24, true);
  document.basic.minS2.value = formatTime(time[1], 60);
  time = sunTimes(date, 2);
  document.basic.hourS3.value = formatTime(time[0], 24, true);
  document.basic.minS3.value = formatTime(time[1], 60);
  time = sunTimes(date, -0.1);
  document.basic.hourS4.value = formatTime(time[0], 24, true);
  document.basic.minS4.value = formatTime(time[1], 60);
  time = sunTimes(date, 1.1);
  document.basic.hourS5.value = formatTime(time[0], 24, true);
  document.basic.minS5.value = formatTime(time[1], 60);
  var h = sunTimes(date, 1)[0] - sunTimes(date, 0)[0];
  var m = sunTimes(date, 1)[1] - sunTimes(date, 0)[1];
  while (m < 0) {
    m += 60;
    h--;
  }
  while (h < 0) {
    m -= 60;
    h++;
  }
  document.basic.hourS6.value = formatTime(h, 24, true);
  document.basic.minS6.value = formatTime(m, 60);
  date[1]++;
  date = gregorian_to_jd(date[0], date[1], date[2]);
  date += hour/24.0 + min/1440.0 + sec/86400.0;
  var values = sunpos2(date);
  document.basic.hourAngle.value = Math.round(values[0]*100)/100.0 + "°";
  document.basic.elevationAngle.value = Math.round(values[1]*100)/100.0 + "°";
  document.basic.azimuthAngle.value = Math.round(values[2]*100)/100.0 + "° " +
    ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][degreeDir(values[2])];
  document.basic.shadow.value = Math.round(values[3]*100)/100.0 + "° " +
    ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][degreeDir(values[3])];
  document.basic.shadowL.value = "Object × " + Math.round(values[4]*100)/100.0;
  if (values[3] == null) {
    document.basic.shadow.value = "None";
    document.basic.shadowL.value = "None";
  }
  if (document.basic.hourS6.value == "24" && values[1]<0)
    document.basic.hourS6.value = "00";
  document.basic.declination.value = Math.round(sunpos(date)[11]*100)/100.0 + "° ";
  drawSundial(date);

  FORCE_MECCA = document.islamic.mecca.checked;
  date = new Array(
      new Number(document.gregorian.year.value),
      document.gregorian.month.selectedIndex,
      new Number(document.gregorian.day.value));
  time = sunTimes(date, [-0.5, 2, 2.1, 1, 2.5][document.islamic.prayer.selectedIndex]);
  document.islamic.salahHour.value = formatTime(time[0], 24, true);
  document.islamic.salahMinute.value = formatTime(time[1], 60);
  FORCE_MECCA = false;
}

// degreeDir -- get cardinal direction from degree measure
function degreeDir(degree) {
  degree = modPos(degree);
  for (var dir = 0; dir < 8; dir++) {
    if (Math.abs(dir*45 - degree) <= 22.5) return dir;
  }
  return 0;
  // 0: N, 1: NE, 2: E, 3: SE, 4: S, 5: SW, 6: W, 7: NW
}

// setLocation -- set the coordinates based on the current location

function setLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      if (lat < 0) document.basic.NS.selectedIndex = 1;
      else document.basic.NS.selectedIndex = 0;
      if (long < 0) document.basic.EW.selectedIndex = 1;
      else document.basic.EW.selectedIndex = 0;
      document.basic.latitude.value = Math.abs(lat);
      document.basic.longitude.value = Math.abs(long);
      changeCoords();
    });
  } else {
    document.basic.getLocation.innerHTML = "Failed to set location";
  }
}

/*  presetDataToRequest  --  Preset the Gregorian date to the
    	    	    	     date requested by the URL
			     search field.  */

function presetDataToRequest(s)
{
    var eq = s.indexOf("=");
    var set = false;
    if (eq != -1) {
    	var calendar = s.substring(0, eq),
	    date = decodeURIComponent(s.substring(eq + 1));
	if (calendar.toLowerCase() == "gregorian") {
	    var d = date.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/);
	    if (d != null) {
	    	// Sanity check date and time components
	    	if ((d[2] >= 1) && (d[2] <= 12) &&
		    (d[3] >= 1) && (d[3] <= 31) &&
		    ((d[4] == undefined) ||
		    	((d[4].substring(1) >= 0) && (d[4].substring(1) <= 23))) &&
		    ((d[5] == undefined) ||
		    	((d[5].substring(1) >= 0) && (d[5].substring(1) <= 59))) &&
		    ((d[6] == undefined) ||
		    	((d[6].substring(1) >= 0) && (d[6].substring(1) <= 59)))) {
		    document.gregorian.year.value = d[1];
		    document.gregorian.month.selectedIndex = d[2] - 1;
		    document.gregorian.day.value = Number(d[3]);
		    document.basic.hour.value = d[4] == undefined ? "00" :
			d[4].substring(1);
		    document.basic.min.value = d[5] == undefined ? "00" :
			d[5].substring(1);
    	    	    document.basic.sec.value = d[6] == undefined ? "00" :
			d[6].substring(1);
		    calcGregorian();
		    set = true;
		} else {
	    	    alert("Invalid Gregorian date \"" + date +
			"\" in search request");
		}
	    } else {
	    	alert("Invalid Gregorian date \"" + date +
		    "\" in search request");
	    }

	} else if (calendar.toLowerCase() == "julian") {
	    var d = date.match(/^(\d+)\D(\d+)\D(\d+)(\D\d+)?(\D\d+)?(\D\d+)?/);
	    if (d != null) {
	    	// Sanity check date and time components
	    	if ((d[2] >= 1) && (d[2] <= 12) &&
		    (d[3] >= 1) && (d[3] <= 31) &&
		    ((d[4] == undefined) ||
		    	((d[4].substring(1) >= 0) && (d[4].substring(1) <= 23))) &&
		    ((d[5] == undefined) ||
		    	((d[5].substring(1) >= 0) && (d[5].substring(1) <= 59))) &&
		    ((d[6] == undefined) ||
		    	((d[6].substring(1) >= 0) && (d[6].substring(1) <= 59)))) {
		    document.juliancalendar.year.value = d[1];
		    document.juliancalendar.month.selectedIndex = d[2] - 1;
		    document.juliancalendar.day.value = Number(d[3]);
		    calcJulianCalendar();
		    document.basic.hour.value = d[4] == undefined ? "00" :
			d[4].substring(1);
		    document.basic.min.value = d[5] == undefined ? "00" :
			d[5].substring(1);
    	    	    document.basic.sec.value = d[6] == undefined ? "00" :
			d[6].substring(1);
		    set = true;
		} else {
	    	    alert("Invalid Julian calendar date \"" + date +
			"\" in search request");
		}
	    } else {
	    	alert("Invalid Julian calendar date \"" + date +
		    "\" in search request");
	    }

	} else if (calendar.toLowerCase() == "jd") {
	    var d = date.match(/^(\-?\d+\.?\d*)/);
	    if (d != null) {
	    	setJulian(d[1]);
		set = 1;
	    } else {
	    	alert("Invalid Julian day \"" + date +
		    "\" in search request");
	    }

	} else if (calendar.toLowerCase() == "mjd") {
	    var d = date.match(/^(\-?\d+\.?\d*)/);
	    if (d != null) {
	    	document.modifiedjulianday.day.value = d[1];
	    	calcModifiedJulian();
		set = 1;
	    } else {
	    	alert("Invalid Modified Julian day \"" + date +
		    "\" in search request");
	    }

	} else if (calendar.toLowerCase() == "unixtime") {
	    var d = date.match(/^(\-?\d+\.?\d*)/);
	    if (d != null) {
	    	document.unixtime.time.value = d[1];
	    	calcUnixTime();
		set = 1;
	    } else {
	    	alert("Invalid Modified Julian day \"" + date +
		    "\" in search request");
	    }

	} else if (calendar.toLowerCase() == "iso") {
	    var d;
	    if ((d = date.match(/^(\-?\d+)\-(\d\d\d)/)) != null) {
	    	document.isoday.year.value = d[1];
		document.isoday.day.value= d[2];
	    	calcIsoDay();
		set = 1;
	    } else if ((d = date.match(/^(\-?\d+)\-?W(\d\d)\-?(\d)/i)) != null) {
    	    	document.isoweek.year.value = d[1];
    	    	document.isoweek.week.value = d[2];
    	    	document.isoweek.day.value = d[3];
	    	calcIsoWeek();
		set = 1;
	    } else {
	    	alert("Invalid ISO-8601 date \"" + date +
		    "\" in search request");
	    }

	} else if (calendar.toLowerCase() == "excel") {
	    var d = date.match(/^(\-?\d+\.?\d*)/);
	    if (d != null) {
	    	document.excelserial1900.day.value = d[1];
	    	calcExcelSerial1900();
		set = 1;
	    } else {
	    	alert("Invalid Excel serial day (1900/PC) \"" + date +
		    "\" in search request");
	    }

	} else if (calendar.toLowerCase() == "excel1904") {
	    var d = date.match(/^(\-?\d+\.?\d*)/);
	    if (d != null) {
	    	document.excelserial1904.day.value = d[1];
	    	calcExcelSerial1904();
		set = 1;
	    } else {
	    	alert("Invalid Excel serial day (1904/Mac) \"" + date +
		    "\" in search request");
	    }

	} else {
	    alert("Invalid calendar \"" + calendar +
	    	"\" in search request");
	}
    } else {
    	alert("Invalid search request: " + s);
    }

    if (!set) {
    	setDateToToday();
	    calcGregorian();
    }
}
