const SCRIPT_ID = ["javascript", "start", "auto", "finalAuto", "autoCategories", "manual", "category",
  "editCategory", "addClass", "semester", "gpaCalc", "seth_img", "langSelect", "examGrade", "semesterGrade"];
function changeLanguage(l) {
  lang = l;
  document.getElementById("javascript").innerHTML = langData[lang].jsSuccess;
  langHTML("langSelect", "setLang");
  langHTML("welcome");
  langHTML("autoCalculation", "quarterGrades");
  langHTML("help");
  langHTML("intro");
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
  document.editCategory.letter.options[0].innerHTML = "-- " + langData[lang].selectLetter + " --";
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
  document.getElementById("selClass").innerHTML = langData[lang].selClass + " <img id=\"seth_img\" src=\"SETH.JPG\">";
  document.classes.class.options[0].innerHTML = "-- " + langData[lang].selClassOption + " --";
  document.classes.class.options[1].innerHTML = langData[lang].addClassOption;
  langHTML("sethClassInstruct");
  langHTML("pointSystemInstruct");
  langHTML("pointSystemInstruct2");
  langHTML("nameOfClass");
  langHTML("enterCatNames");
  langHTML("sendMailButton", "submit");
  langHTML("minExam");
  langHTML("wantAtLeast");
  document.getElementById("semesterGrade").innerHTML = langReplace("minGrade", ["$MIN", "$LETTER", "$NUMBER"], [86.50, "B+", 88.50]);
  document.getElementById("semesterGrade").innerHTML += "<br>" + langData[lang].selectAbove;
  langHTML("semWithExam");
  document.getElementById("examGrade").innerHTML = langReplace("semGrade", ["$LETTER", "$NUMBER"], ["A+", 98.50]);
  document.getElementById("examGrade").innerHTML += "<br>" + langData[lang].selectAbove;
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
  document.getElementById("manualInput").innerHTML = langData[lang].edit;
  for (var i = 0; i < SCRIPT_ID.length; i++) {
    if (lang == "ur") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "rtl";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = 'Nastaliq';
    } else if (lang == "hi") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = "DevanagariFont";
    } else {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = "";
    }
  }
  updateGpa();
  updateCategories();
}
function languageSelect() {
  changeLanguage(document.setLanguage.language.value);
}
function langHTML(id, key=null) {
  if (key == null)
    key = id;
  try {
    document.getElementById(id).innerHTML = langData[lang][key];
  } catch(err) {
    document.getElementById(id).innerHTML = langData["en"][key];
  }
  if (lang == "ur") {
    document.getElementById(id).style.direction = "rtl";
  } else {
    document.getElementById(id).style.direction = "";
  }
}
function langReplace(key, codes, values) {
  var str = langData[lang][key];
  for (var i = 0; i < codes.length; i++) {
    str = str.replace(codes[i], "" + values[i]);
  }
  return str;
}
