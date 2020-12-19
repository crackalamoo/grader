function getLocalItem(item, defaultVal) {
  try {
    if (localStorage.getItem(item) == null) {
      return defaultVal;
    } else {
      return localStorage.getItem(item);
    }
  } catch(err) {
    try {
      localStorage.setItem(item, defaultVal);
    } catch(err) {}
    return defaultVal;
  }
}

var language1 = getLocalItem("language1", "en");
var language2 = getLocalItem("language2", "ur");
var language3 = getLocalItem("language3", "hi");
var language4 = getLocalItem("language4", "fa");
var language5 = getLocalItem("language5", "he");
var language6 = getLocalItem("language6", "zh");
var dst = getLocalItem("dst", "none");
var theme = getLocalItem("theme", "");
// Change from Florida to Valle
var coordinates = [
  getLocalItem("lat", "26 30 43"),
  getLocalItem("NS", 0),
  getLocalItem("long", "80 10 34"),
  getLocalItem("EW", 1)
];
var hinduSettings = [
  getLocalItem("hindu_moontype", 0),
  getLocalItem("hindu_era", "vikram")
];
var persian_era = getLocalItem("persian_era", "hijri");
var islcalc = getLocalItem("islamic_calculation", "mwl");
var islasr = getLocalItem("islamic_asr", "1");

var PERSIAN_EPOCH = 1948320.5;

var NormLeap = new Array("Normal year", "Leap year");

var Weekdays = new Array( "Sunday", "Monday", "Tuesday", "Wednesday",
                         "Thursday", "Friday", "Saturday" );
var ISLAMIC_WEEKDAYS = new Array("اتوار",
                                 "سوموار",
                                 "منگل",
                                 "بدھ",
                                 "جمعرات",
                                 "جمعہ",
                                 "ہفتہ");
var PERSIAN_WEEKDAYS = new Array("یک شنبه",
                                "دوشنبه",
                                "سه شنبه",
                                "چهارشنبه",
                                "پنج شنبه",
                                "جمعه",
                                "شنبه");

function changeLanguage1(l=null, start=false) {
  if (l == null) {
    language1 = document.language.language1.value;
  } else {
    language1 = l;
  }
  if (language1 == "en")
    lang1_en();
  if (language1 == "es")
    lang1_es();
  if (language1 == "fr")
    lang1_fr();
  if (language1 == "de")
    lang1_de();
  if (language1 == "hi")
    lang1_hi();
  if (language1 == "ur")
    lang1_ur();
  document.getElementById("lWord1").innerHTML = lang1Data.language;
  document.getElementById("lWord1").style.fontFamily = lang1Data.font;
  document.getElementById("gregCalName").innerHTML = lang1Data.greg;
  document.getElementById("gregCalName").style.fontFamily = lang1Data.font;
  document.getElementById("gregorianDate").innerHTML = lang1Data.date;
  document.getElementById("gregorianDate").style.fontFamily = lang1Data.font;
  document.getElementById("gregorianWeekdays").innerHTML = lang1Data.weekday;
  document.getElementById("gregorianWeekdays").style.fontFamily = lang1Data.font;
  document.getElementById("julianDate").innerHTML = lang1Data.date;
  document.getElementById("julianDate").style.fontFamily = lang1Data.font;
  document.getElementById("julianWeekdays").innerHTML = lang1Data.weekday;
  document.getElementById("julianWeekdays").style.fontFamily = lang1Data.font;
  document.gregorian.calculate.innerHTML = lang1Data.calc;
  document.gregorian.calculate.style.fontFamily = lang1Data.font2;
  document.juliancalendar.calculate.innerHTML = lang1Data.calc;
  document.juliancalendar.calculate.style.fontFamily = lang1Data.font2;
  Weekdays = lang1Data.weekdays;
  document.gregorian.month.style.fontFamily = lang1Data.font2;
  document.juliancalendar.month.style.fontFamily = lang1Data.font2;
  for (i = 0; i < 12; ++i) {
    document.gregorian.month[i].innerHTML = lang1Data.months[i];
    document.juliancalendar.month[i].innerHTML = lang1Data.months[i];
  }
  document.language.language1.style.direction = lang1Data.dir;
  document.language.language1.style.fontFamily = lang1Data.font2;
  document.gregorian.month.style.direction = lang1Data.dir;
  document.juliancalendar.month.style.direction = lang1Data.dir;
  document.gregorian.leap.style.fontFamily = lang1Data.font2;
  document.gregorian.wday.style.fontFamily = lang1Data.font2;
  document.juliancalendar.leap.style.fontFamily = lang1Data.font2;
  document.juliancalendar.wday.style.fontFamily = lang1Data.font2;
  try {
    localStorage.setItem("language1", language1);
  } catch(err) {}
  if (!start) calcGregorian();
}

function changeLanguage2(l=null, start=false) {
  if (l == null) {
    language2 = document.language.language2.value;
  } else {
    language2 = l;
  }
  if (language2 == "ur")
    lang2_ur();
  if (language2 == "ar")
    lang2_ar();
  if (language2 == "en")
    lang2_en();
  if (language2 == "hi")
    lang2_hi();
  if (language2 == "id")
    lang2_id();
  if (language2 == "fa")
    lang2_fa();
  document.getElementById("lWord2").innerHTML = lang2Data.language;
  document.getElementById("lWord2").style.fontFamily = lang2Data.font;
  ISLAMIC_WEEKDAYS = lang2Data.weekdays;
  document.islamic.wday.style.fontFamily = lang2Data.font2;
  document.islamic.leap.style.fontFamily = lang2Data.font2;
  document.getElementById("islamicCalName").innerHTML = lang2Data.islamic;
  document.getElementById("islamicCalName").style.fontFamily = lang2Data.font;
  document.getElementById("islamicDate").innerHTML = lang2Data.date;
  document.getElementById("islamicDate").style.fontFamily = lang2Data.font;
  document.getElementById("islamicWeekdays").innerHTML = lang2Data.weekday;
  document.getElementById("islamicWeekdays").style.fontFamily = lang2Data.font;
  document.getElementById("qibla").innerHTML = lang2Data.qibla;
  document.getElementById("qibla").style.fontFamily = lang2Data.font;
  document.getElementById("meccaLabel").innerHTML = lang2Data.mecca;
  document.getElementById("meccaLabel").style.fontFamily = lang2Data.font;
  document.getElementById("salah").innerHTML = lang2Data.salah;
  document.getElementById("salah").style.fontFamily = lang2Data.font;
  document.getElementById("calculation").innerHTML = lang2Data.calculation + ":&ensp;";
  document.getElementById("calculation").style.fontFamily = lang2Data.font;
  document.getElementById("asr").innerHTML = lang2Data.prayers[2] + ":&ensp;";
  document.getElementById("asr").style.fontFamily = lang2Data.font;
  for (i = 0; i < 12; i++) {
    document.islamic.month[i].innerHTML = lang2Data.months[i];
  }
  for (i = 0; i < 5; i++) {
    document.islamic.prayer[i].innerHTML = lang2Data.prayers[i];
  }
  for (i = 0; i < 4; i++) {
    let option = document.islamic.calculation[i]
    option.innerHTML = lang2Data.prayers[0] + " " + ISLAMIC_CALCULATIONS[option.value][0] + " " + lang2Data.degrees + lang2Data.comma +
      " " + lang2Data.prayers[4] + " " + ISLAMIC_CALCULATIONS[option.value][1] + " " + lang2Data.degrees;
  }
  document.islamic.asr[0].innerHTML = lang2Data.schools[0];
  document.islamic.asr[1].innerHTML = lang2Data.schools[1];
  document.language.language2.style.direction = lang2Data.dir;
  document.language.language2.style.fontFamily = lang2Data.font2;
  document.islamic.month.style.direction = lang2Data.dir;
  document.islamic.month.style.fontFamily = lang2Data.font2;
  document.islamic.prayer.style.direction = lang2Data.dir;
  document.islamic.prayer.style.fontFamily = lang2Data.font2;
  document.islamic.style.direction = lang2Data.dir;
  document.islamic.calculation.style.fontFamily = lang2Data.font2;
  try {
    localStorage.setItem("language2", language2);
  } catch(err) {}
  if (!start) calcGregorian();
}

function changeLanguage3(l=null, start=false) {
  if (l == null) {
    language3 = document.language.language3.value;
  } else {
    language3 = l;
  }
  let calendars = [document.hinducalendar, document.indiancivilcalendar];
  if (language3 == "hi")
    lang3_hi();
  if (language3 == "sa")
    lang3_sa();
  if (language3 == "ta")
    lang3_ta();
  if (language3 == "mr")
    lang3_mr();
  if (language3 == "bn")
    lang3_bn();
  if (language3 == "ur")
    lang3_ur();
  if (language3 == "en")
    lang3_en();
  if (language3 == "pa-IN")
    lang3_pa_in();
  if (language3 == "pa-PK")
    lang3_pa_pk();
  if (language3 == "gu")
    lang3_gu();
  document.language.language3.style.direction = lang3Data.dir;
  document.language.language3.style.fontFamily = lang3Data.font2;
  document.getElementById("hinduCalName").innerHTML = lang3Data.hindu;
  document.getElementById("hinduCalName").style.fontFamily = lang3Data.font;
  document.getElementById("indianCalName").innerHTML = lang3Data.indian;
  document.getElementById("hinduDate").innerHTML = lang3Data.date;
  document.getElementById("hinduDate").style.fontFamily = lang3Data.font;
  document.getElementById("hinduWeekdays").innerHTML = lang3Data.weekday;
  document.getElementById("hinduWeekdays").style.fontFamily = lang3Data.font;
  document.getElementById("indianDate").innerHTML = lang3Data.date;
  document.getElementById("indianDate").style.fontFamily = lang3Data.font;
  document.getElementById("indianWeekdays").innerHTML = lang3Data.weekday;
  document.getElementById("indianWeekdays").style.fontFamily = lang3Data.font;
  document.getElementById("hinduCalEra").innerHTML = lang3Data.beginning;
  document.getElementById("hinduCalEra").style.fontFamily = lang3Data.font;
  for (i = 0; i < calendars.length; ++i) {
    calendars[i].month.style.fontFamily = lang3Data.font2;
    for (j = 0; j < 12; ++j) {
      calendars[i].month[j].innerHTML = lang3Data.months[mod(j+HINDU_MONTH1, 12)];
    }
  }
  document.getElementById("lWord3").innerHTML = lang3Data.language;
  document.getElementById("lWord3").style.fontFamily = lang3Data.font;
  document.hinducalendar.monthType.style.fontFamily = lang3Data.font2;
  document.hinducalendar.monthType[1].innerHTML = lang3Data.shuddh;
  document.hinducalendar.monthType[0].innerHTML = lang3Data.adhik;
  document.hinducalendar.moonType.style.fontFamily = lang3Data.font2;
  document.hinducalendar.moonType[0].innerHTML = lang3Data.amavas;
  document.hinducalendar.moonType[1].innerHTML = lang3Data.poonam;
  document.getElementById("hinduCalMoon").innerHTML = lang3Data.moon;
  document.getElementById("hinduCalMoon").style.fontFamily = lang3Data.font;
  document.hinducalendar.era.style.fontFamily = lang3Data.font2;
  for (i = 0; i < 6; ++i) {
    document.hinducalendar.era[i].innerHTML = lang3Data.eras[i];
  }
  document.hinducalendar.era.style.direction = lang3Data.dir;
  document.hinducalendar.moonType.style.direction = lang3Data.dir;
  document.hinducalendar.month.style.direction = lang3Data.dir;
  document.getElementById("zodiacSign").innerHTML = lang3Data.zodiacSign;
  document.getElementById("zodiacSign").style.fontFamily = lang3Data.font;
  document.hinducalendar.zodiac.style.fontFamily = lang3Data.font2;
  document.hinducalendar.zodiac.style.direction = lang3Data.dir;
  document.hinducalendar.solarDay.style.fontFamily = lang3Data.font2;
  document.hinducalendar.weekday.style.fontFamily = lang3Data.font2;
  document.hinducalendar.ritu.style.fontFamily = lang3Data.font2;
  document.indiancivilcalendar.leap.style.fontFamily = lang3Data.font2;
  document.indiancivilcalendar.weekday.style.fontFamily = lang3Data.font2;
  document.getElementById("indiaLabel").innerHTML = lang3Data.india;
  document.getElementById("indiaLabel").style.fontFamily = lang3Data.font;
  document.getElementById("ayanamsha").innerHTML = lang3Data.ayanamsha;
  document.getElementById("ayanamsha").style.fontFamily = lang3Data.font;
  document.getElementById("ritu").innerHTML = lang3Data.ritu;
  document.getElementById("ritu").style.fontFamily = lang3Data.font;
  document.hinducalendar.style.direction = lang3Data.dir;
  document.indiancivilcalendar.style.direction = lang3Data.dir;
  try {
    localStorage.setItem("language3", language3);
  } catch(err) {}
  if (!start) calcGregorian();
}

function changeLanguage4(l = null, start=false) {
  if (l == null) {
    language4 = document.language.language4.value;
  } else {
    language4 = l;
  }
  if (language4 == "fa")
    lang4_fa();
  if (language4 == "ku_kmr")
    lang4_ku_kmr();
  if (language4 == "ku_ckb")
    lang4_ku_cbk();
  if (language4 == "ps")
    lang4_ps();
  if (language4 == "en")
    lang4_en();
  document.getElementById("lWord4").innerHTML = lang4Data.language;
  document.getElementById("lWord4").style.fontFamily = lang4Data.font;
  PERSIAN_WEEKDAYS = lang4Data.weekdays;
  document.language.language4.style.direction = lang4Data.dir;
  document.language.language4.style.fontFamily = lang4Data.font2;
  document.persiana.leap.style.fontFamily = lang4Data.font2;
  document.persiana.wday.style.fontFamily = lang4Data.font2;
  document.persiana.era.style.fontFamily = lang4Data.font2;
  document.getElementById("persianCalName").innerHTML = lang4Data.persian;
  document.getElementById("persianCalName").style.fontFamily = lang4Data.font;
  document.getElementById("persianCalEra").innerHTML = lang4Data.beginning;
  document.getElementById("persianCalEra").style.fontFamily = lang4Data.font;
  document.getElementById("persianDate").innerHTML = lang4Data.date;
  document.getElementById("persianDate").style.fontFamily = lang4Data.font;
  document.getElementById("persianWeekdays").innerHTML = lang4Data.weekday;
  document.getElementById("persianWeekdays").style.fontFamily = lang4Data.font;
  document.persiana.month.style.direction = lang4Data.dir;
  document.persiana.month.style.fontFamily = lang4Data.font2;
  for (i = 0; i < 12; ++i) {
    document.persiana.month[i].innerHTML = lang4Data.months[i];
  }
  document.persiana.era[0].innerHTML = lang4Data.hijri;
  document.persiana.era[1].innerHTML = lang4Data.kurdish;
  document.persiana.style.direction = lang4Data.dir;
  try {
    localStorage.setItem("language4", language4);
  } catch(err) {}
  if (!start) calcGregorian();
}

function changeLanguage5(l = null, start=false) {
  if (l == null) {
    language5 = document.language.language5.value;
  } else {
    language5 = l;
  }
  if (language5 == "he")
    lang5_he();
  if (language5 == "en")
    lang5_en();
  if (language5 == "fr")
    lang5_fr();
  document.getElementById("lWord5").innerHTML = lang5Data.language;
  document.getElementById("hebCalName").innerHTML = lang5Data.hebrew;
  document.getElementById("hebrewDate").innerHTML = lang5Data.date;
  document.getElementById("hebrewStart").innerHTML = lang5Data.start;
  document.language.language5.style.direction = lang5Data.dir;
  document.hebrew.month.style.direction = lang5Data.dir;
  document.hebrew.leap.style.direction = lang5Data.dir;
  for (i = 0; i < 12; ++i) {
    document.hebrew.month[i].innerHTML = lang5Data.months[i];
  }
  document.hebrew.firstmonth[1].innerHTML = lang5Data.months[0];
  document.hebrew.firstmonth[0].innerHTML = lang5Data.months[6];
  document.hebrew.style.direction = lang5Data.dir;
  try {
    localStorage.setItem("language5", language5);
  } catch(err) {}
  if (!start) calcGregorian();
}

function changeLanguage6(l = null, start=false) {
  if (l == null) {
    language6 = document.language.language6.value;
  } else {
    language6 = l;
  }
  if (language6 == "zh")
    lang6_zh();
  if (language6 == "en")
    lang6_en();
  document.getElementById("lWord6").innerHTML = lang6Data.language;
  document.getElementById("chineseCalName").innerHTML = lang6Data.chinese;
  document.getElementById("chineseDate").innerHTML = lang6Data.date;
  for (i = 0; i < 12; ++i) {
    document.chinese.month[i].innerHTML = lang6Data.months[i];
  }
  try {
    localStorage.setItem("language6", language6);
  } catch(err) {}
  if (!start) calcGregorian();
}

function changeTheme() {
  theme = document.basic.theme.value;
  document.getElementsByTagName("BODY")[0].className = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch(err) {}
  drawQibla();
}

function changeCoords() {
  if (document.basic.latitude.value > 90) document.basic.latitude.value = 90;
  if (document.basic.longitude.value > 180) document.basic.longitude.value = 180;
  updateSun();
  drawQibla();
  drawMap();
  try {
    localStorage.setItem("lat", document.basic.latitude.value);
    localStorage.setItem("NS", document.basic.NS.selectedIndex);
    localStorage.setItem("long", document.basic.longitude.value);
    localStorage.setItem("EW", document.basic.EW.selectedIndex);
  } catch(err) {}
}
function updateDst() {
  localStorage.setItem("dst", document.basic.dst.value);
  updateFromGregorian();
}
function changeCity() {
  var city = document.basic.city.value;
  var lat = document.basic.latitude.value;
  var ns = document.basic.NS.selectedIndex;
  var long = document.basic.longitude.value;
  var ew = document.basic.EW.selectedIndex;
  var data;
  if (city != "other") {
    data = {"valle": ["35 39 13", 0, "112 08 19", 1, 1, 7, "none"],
      "phoenix": ["33 26 54", 0, "112 04 27", 1, 1, 7, "none"],
      "boynton": ["26 30 51", 0, "80 10 31", 1, 1, 5, "uscanada"],
      "mumbai": [19.08, 0, 72.88, 0, 0, 5.5, "none"],
      "lahore": [31.52, 0, 74.36, 0, 0, 5, "none"],
      "chicago": [41.88, 0, 87.63, 1, 1, 6, "uscanada"],
      "nyc": [40.71, 0, 74.01, 1, 1, 5, "uscanada"],
      "karachi": [24.86, 0, 67.01, 0, 0, 5, "none"],
      "islamabad": [33.68, 0, 73.05, 0, 0, 5, "none"],
      "ratnagiri": [16.99, 0, 73.31, 0, 0, 5.5, "none"],
      "murud": [17.78, 0, 73.12, 0, 0, 5.5, "none"],
      "tokyo": [35.68, 0, 139.65, 0, 0, 9, "none"],
      "jakarta": [6.21, 1, 106.85, 0, 0, 7, "none"],
      "delhi": [28.71, 0, 77.11, 0, 0, 5.5, "none"],
      "manila": [14.59, 0, 120.99, 0, 0, 8, "none"],
      "seoul": [37.57, 0, 126.98, 0, 0, 9, "none"],
      "shanghai": [31.23, 0, 121.47, 0, 0, 8, "none"],
      "beijing": [39.91, 0, 116.41, 0, 0, 8, "none"],
      "sao paulo": [23.55, 1, 46.63, 1, 1, 3, "none"],
      "mexico city": [19.43, 0, 99.13, 1, 1, 6, "mexico"],
      "guangzhou": [23.13, 0, 113.26, 0, 0, 8, "none"],
      "dhaka": [23.81, 0, 90.41, 0, 0, 6, "none"],
      "osaka": [34.69, 0, 135.51, 0, 0, 9, "none"],
      "moscow": [55.76, 0, 37.62, 0, 0, 3, "none"],
      "cairo": [30.04, 0, 31.24, 0, 0, 2, "none"],
      "bangkok": [13.76, 0, 100.51, 0, 0, 7, "none"],
      "la": [34.05, 0, 118.24, 1, 1, 8, "uscanada"],
      "mecca": [21.39, 0, 39.86, 0, 0, 3, "none"],
      "tehran": [35.69, 0, 51.39, 0, 0, 3.5, "iran"],
      "san francisco": [37.78, 0, 122.42, 1, 1, 8, "uscanada"],
      "rome": [41.91, 0, 12.49, 0, 0, 1, "europe"],
      "london": [51.51, 0, 0.13, 1, 0, 0, "europe"],
      "sydney": [33.87, 1, 151.21, 0, 0, 10, "australia"],
      "lagos": [6.52, 0, 3.38, 0, 0, 2, "none"],
      "ujjain": [23.18, 0, 75.79, 0, 0, 5.5, "none"],
      "dubai": [25.21, 0, 55.27, 0, 0, 4, "none"],
      "istanbul": [41.01, 0, 28.98, 0, 0, 3, "none"],
      "chennai": [13.08, 0, 80.27, 0, 0, 5.5, "none"],
      "paris": [48.86, 0, 2.35, 0, 0, 1, "europe"],
      "lima": [12.05, 1, 77.04, 1, 1, 5, "none"],
      "washington": [38.91, 0, 77.04, 1, 1, 5, "uscanada"],
      "delray": ["26 26 13", 0, "80 08 25", 1, 1, 5, "uscanada"],
      "johannesburg": [26.21, 1, 28.05, 0, 0, 2, "none"],
      "accra": [5.61, 0, 0.18, 1, 0, 0, "none"],
      "window rock": [35.68, 0, 109.05, 1, 1, 7, "uscanada"],
      "walpi": [35.83, 0, 110.39, 1, 1, 7, "none"]
    }[city];
  }
  document.basic.latitude.value = data[0];
  document.basic.NS.selectedIndex = data[1];
  document.basic.longitude.value = data[2];
  document.basic.EW.selectedIndex = data[3];
  document.basic.timezone1.selectedIndex = data[4];
  document.basic.timezone2.value = data[5];
  document.basic.dst.value = data[6];
  changeCoords();
  updateDst();
  document.basic.city.selectedIndex = 0;
}
