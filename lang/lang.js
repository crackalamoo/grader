const SCRIPT_ID = ["javascript", "start", "auto", "finalAuto", "autoCategories", "manual", "category",
  "editCategory", "addClass", "semester", "gpaCalc", "seth_img", "langSelect", "examGrade", "semesterGrade"];
const LANGUAGES = ["English", "Español", "Português", "हिन्दी", "اردو"];
const LANG_CODES = ["en", "es", "pt", "hi", "ur"];
const RTL_LANG = ["ur"];
function changeLanguage(l) {
  lang = l;
  document.setLanguage.language.value = lang;
  document.getElementById("javascript").innerHTML = langData[l].jsSuccess;
  langHTML("langSelect", "setLang");
  langHTML("welcome");
  langHTML("autoCalculation", "quarterGrades");
  langHTML("help");
  document.getElementById("intro").innerHTML = langReplace("intro", ["$EMAIL"],
    ['<a href="mailto:bd542591@ahschool.com?subject=Grade calculator issue">bd542591@ahschool.com</a>']);
  langHTML("semGradesButton");
  langHTML("gpaCalcButton");
  langHTML("manualBack", "back");
  langHTML("categoryBack", "back");
  langHTML("autoBack", "back");
  langHTML("faqBack", "back");
  langHTML("semesterBack", "back");
  langHTML("gpaBack", "back");
  langHTML("mailBack", "back");
  langHTML("newCatButton");
  langHTML("catInstruct");
  langHTML("catName");
  langHTML("catPercent");
  langHTML("createCat");
  langHTML("doneEditCat", "done");
  langHTML("editInstruct");
  langHTML("editLetter", "letterGrade");
  langHTML("addAssignmentButton", "addAssignment");
  langHTML("delAssignmentButton", "deleteAssignment");
  langHTML("creditCathy");
  langHTML("whatNeed");
  langHTML("desiredGrade");
  langHTML("numPointsWorth");
  langHTML("calcRequiredButton");
  langHTML("changeWeightButton");
  document.editCategory.letter.options[0].innerHTML = "-- " + langData[l].selectLetter + " --";
  langHTML("copyGradesInstruct");
  langHTML("mobileCopyInstruct");
  langHTML("pasteGradesInstruct");
  langHTML("autoNext", "next");
  langHTML("superAlgorithm");
  langHTML("dontWorry");
  langHTML("shouldContinue");
  langHTML("rampalButton");
  langHTML("manualButton");
  langHTML("autoContinue", "continue");
  document.getElementById("selClass").innerHTML = langData[l].selClass + " <img id=\"seth_img\" src=\"SETH.JPG\">";
  document.classes.class.options[0].innerHTML = "-- " + langData[l].selClassOption + " --";
  document.classes.class.options[1].innerHTML = langData[l].addClassOption;
  langHTML("sethClassInstruct");
  langHTML("pointSystemInstruct");
  langHTML("pointSystemInstruct2");
  langHTML("nameOfClass");
  langHTML("enterCatNames");
  langHTML("sendMailButton", "submit");
  langHTML("minExam");
  langHTML("wantAtLeast");
  document.getElementById("semesterGrade").innerHTML = langReplace("minGrade", ["$MIN", "$LETTER", "$NUMBER"], [86.50, "B+", 88.50]);
  document.getElementById("semesterGrade").innerHTML += "<br>" + langData[l].selectAbove;
  langHTML("semWithExam");
  document.getElementById("examGrade").innerHTML = langReplace("semGrade", ["$LETTER", "$NUMBER"], ["A+", 98.50]);
  document.getElementById("examGrade").innerHTML += "<br>" + langData[l].selectAbove;
  document.modifyCredit.numCredits.options[0].innerHTML = langData[l].semester;
  document.modifyCredit.numCredits.options[1].innerHTML = langData[l].quarter;
  document.addCredit.numCredits.options[0].innerHTML = langData[l].semester;
  document.addCredit.numCredits.options[1].innerHTML = langData[l].quarter;
  langHTML("ahsWeighted");
  langHTML("5scale");
  langHTML("4scale");
  langHTML("ritvikCalc");
  langHTML("ritvikHonor");
  langHTML("editCreditButton", "apply");
  langHTML("deleteCreditButton", "delete");
  langHTML("clearDataExp");
  langHTML("clearDataButton");
  langHTML("getCreditButton");
  langHTML("addCreditButton", "add");
  langHTML("modifyCreditHeading");
  langHTML("q13sem", "quarter13");
  langHTML("q13exam", "quarter13");
  langHTML("q24sem", "quarter24");
  langHTML("q24exam", "quarter24");
  langHTML("semExam", "examGrade");
  langHTML("announcements");
  document.exam.exam.options[12].innerHTML = langData[l].noExam;
  document.getElementById("manualInput").innerHTML = langData[l].edit;
  for (var i = 0; i < SCRIPT_ID.length; i++) {
    if (l == "ur") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "rtl";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = 'nastaliq';
    } else if (l == "hi") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = 'devanagari';
    } else {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = "";
    }
  }
  for (var i = 0; i < LANGUAGES.length; i++) {
    if (document.setLanguage.language.options[i].value == l) {
      document.setLanguage.language.options[i].innerHTML = LANGUAGES[i];
      if (l == "en")
        document.title = "AHS Grade Calculator";
      else
        document.title = "AHS Grade Calculator " + langData[l].languages[i];
    } else {
      if (RTL_LANG.indexOf(document.setLanguage.language.options[i].value) != -1) {
        if (RTL_LANG.indexOf(lang) == -1) {
          document.setLanguage.language.options[i].innerHTML = "&#x2067;" + LANGUAGES[i] + "&#x2069; &mdash; " +
            langData[l].languages[i];
        } else {
          document.setLanguage.language.options[i].innerHTML = "&#x2067;" + LANGUAGES[i] + "&#x2069; &mdash; " +
            "&#x2067;" + langData[l].languages[i] + "&#x2069;";
        }
      } else {
        document.setLanguage.language.options[i].innerHTML = LANGUAGES[i] + " &mdash; " +
          langData[l].languages[i];
      }
    }
  }
  document.getElementsByTagName("html")[0].lang = l;
  updateGpa();
  updateCategories();
}
function languageSelect() {
  changeLanguage(document.setLanguage.language.value);
}
function langHTML(id, key=null) {
  if (key == null)
    key = id;
  if (typeof langData[lang][key] != "undefined") {
    document.getElementById(id).innerHTML = langData[lang][key];
    document.getElementById(id).lang = lang;
  } else {
    document.getElementById(id).innerHTML = langData["en"][key];
    document.getElementById(id).lang = "en";
  }
  if (document.getElementById(id).lang == "ur") {
    document.getElementById(id).style.direction = "rtl";
  } else {
    document.getElementById(id).style.direction = "ltr";
  }
}
function langReplace(key, codes, values) {
  var str = langData[lang][key];
  for (var i = 0; i < codes.length; i++) {
    str = str.replace(codes[i], "" + values[i]);
  }
  return str;
}
