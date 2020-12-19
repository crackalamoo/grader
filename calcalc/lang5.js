lang5Data = {};

function lang5_en() {
  lang5Data.language = "Hebrew Calendar";
  lang5Data.dir = "ltr";
  lang5Data.hebrew = "Hebrew Calendar";
  lang5Data.date = "Date";
  lang5Data.months = new Array(
    "Nisan",
    "Iyyar",
    "Sivan",
    "Tammuz",
    "Av",
    "Elul",
    "Tishri",
    "Heshvan",
    "Kislev",
    "Tevet",
    "Shevat",
    "Adar",
    "Adar Aleph",
    "Adar Bet"
  );
  lang5Data.yearTypes = ["Common deficient (353 days)", "Common regular (354 days)",
    "Common complete (355 days)", "Embolismic deficient (383 days)", "Embolismic regular (384 days)",
    "Embolismic complete (385 days)"];
  lang5Data.start = "Start";
  lang5Data.yearMark = " A.M.";
  lang5Data.numberMap = null;
}

function lang5_he() {
  lang5Data.language = "הלוח העברי";
  lang5Data.dir = "rtl";
  lang5Data.hebrew = "הַלּוּחַ הָעִבְרִי";
  lang5Data.date = "תאריך";
  lang5Data.months = new Array(
    "ניסן",
    "אייר",
    "סיוון",
    "תמוז",
    "אב",
    "אלול",
    "תשרי",
    "חשוון",
    "כסלו",
    "טבת",
    "שבט",
    "אדר",
    "אדר א'",
    "אדר ב'"
  );
  lang5Data.yearTypes = ["פשוטה חסרה (353 יום)", "פשוטה כסדרה (354 יום)",
    "פשוטה שלמה (355 יום)", "מעוברת חסרה (383 יום)", "מעוברת כסדרה (384 יום)",
    "מעוברת שלמה (385 יום)"];
  lang5Data.start = "התחלה";
  lang5Data.yearMark = "";
  lang5Data.numberMap = "he";
}

function lang5_fr() {
  lang5Data.language = "Calendrier hébraïque";
  lang5Data.dir = "ltr";
  lang5Data.hebrew = "Calendrier hébraïque";
  lang5Data.date = "Date";
  lang5Data.months = new Array(
    "nisan",
    "iyar",
    "sivan",
    "tammouz",
    "av",
    "éloul",
    "tishri",
    "heshvan",
    "kislev",
    "tévet",
    "chevat",
    "adar",
    "adar alef",
    "adar bet"
  );
  lang5Data.yearTypes = ["Commune déficiente (353 days)", "Commune régulière (354 days)",
    "Commune abondante (355 days)", "Embolismique déficiente (383 days)", "Embolismique régulière (384 days)",
    "Embolismique abondante (385 days)"];
  lang5Data.start = "Début";
  lang5Data.yearMark = " AM";
  lang5Data.numberMap = null;
}

function hebrew_numeral(num) {
  var numStr = "";
  if (num % 1000 == 0) {
    num %= 10000;
    numStr += ["", "א",
      "ב",
      "ג",
      "ד",
      "ה",
      "ו",
      "ז",
      "ח",
      "ט"][Math.floor(num/1000)];
    numStr += "׳";
    return numStr;
  }
  num %= 1000;
  numStr += ["", "ק",
    "ר",
    "ש",
    "ת",
    "תק",
    "תר",
    "תש",
    "תת",
    "תתק"][Math.floor(num/100)];
  num %= 100;
  numStr += ["", "י",
    "כ",
    "ל",
    "מ",
    "נ",
    "ס",
    "ע",
    "פ",
    "צ"][Math.floor(num/10)];
  num %= 10;
  numStr += ["", "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט"][Math.round(num)];
  return numStr;
}
