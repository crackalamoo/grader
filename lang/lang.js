const SCRIPT_ID = ["javascript", "start", "auto", "finalAuto", "autoCategories", "manual", "category",
  "editCategory", "addClass", "semester", "gpaCalc", "seth_img", "langSelect", "examGrade", "semesterGrade",
  "setLangForm", "intro", "footer"];
const LANGUAGES = ["English", "Español", "Português", "हिन्दी", "اردو", "فارسی", "Latinum", "संस्कृतम्"];
const LANG_CODES = ["en", "es", "pt", "hi", "ur", "fa", "la", "sa"];
const RTL_LANG = ["ur", "fa"];
var currentLangData;
function changeLanguage(l) {
  lang = l;
  currentLangData = langData[l];
  setReference();
  setDialect();
  var d = currentLangData;
  document.setLanguage.language.value = lang;
  document.getElementById("javascript").innerHTML = d.jsSuccess;
  langHTML("langSelect", "setLang");
  langHTML("welcome");
  if (document.getElementById("manualInput").style.display == "block")
    langHTML("autoCalculation", "newClass");
  else
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
  langHTML("editLetter2", "letterGrade");
  langHTML("addAssignmentButton", "addAssignment");
  langHTML("delAssignmentButton", "deleteAssignment");
  langHTML("creditCathy");
  langHTML("whatNeed");
  langHTML("desiredGrade");
  langHTML("numPointsWorth");
  langHTML("calcRequiredButton");
  langHTML("changeWeightButton");
  document.editCategory.letter.options[0].innerHTML = "-- " + d.selectLetter + " --";
  document.editCategory.letter2.options[0].innerHTML = "-- " + d.selectLetter + " --";
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
  document.getElementById("selClass").innerHTML = d.selClass + " <img id=\"seth_img\" src=\"SETH.JPG\">";
  document.classes.class.options[0].innerHTML = "-- " + d.selClassOption + " --";
  document.classes.class.options[1].innerHTML = d.addClassOption;
  langHTML("sethClassInstruct");
  langHTML("pointSystemInstruct");
  langHTML("pointSystemInstruct2");
  langHTML("nameOfClass");
  langHTML("enterCatNames");
  langHTML("enterWeights");
  langHTML("enterNotes")
  langHTML("sendMailButton", "submit");
  langHTML("minExam");
  langHTML("wantAtLeast");
  calculateSemester();
  document.getElementById("semesterGrade").innerHTML += "<br>" + d.selectAbove;
  langHTML("semWithExam");
  calculateExam();
  document.getElementById("examGrade").innerHTML += "<br>" + d.selectAbove;
  document.modifyCredit.numCredits.options[0].innerHTML = d.semester;
  document.modifyCredit.numCredits.options[1].innerHTML = d.quarter;
  document.addCredit.numCredits.options[0].innerHTML = d.semester;
  document.addCredit.numCredits.options[1].innerHTML = d.quarter;
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
  langHTML("creditNum");
  langHTML("q13sem", "quarter13");
  langHTML("q13exam", "quarter13");
  langHTML("q24sem", "quarter24");
  langHTML("q24exam", "quarter24");
  langHTML("semExam", "examGrade");
  langHTML("announcements");
  langHTML("footer");
  langHTML("pronunciation");
  document.exam.exam.options[12].innerHTML = d.noExam;
  document.getElementById("manualInput").innerHTML = d.edit;
  document.classes.search.placeholder = d.search;
  for (var i = 0; i < SCRIPT_ID.length; i++) {
    if (l == "ur") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "rtl";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = 'nastaliq';
    } else if (["hi"].indexOf(l) != -1) {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = 'devanagari';
    }
    else if (l == "sa") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = '"Times New Roman", "Devanagari MT", devanagari, tibetan, balinese';
    } else if (l == "fa") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "rtl";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = '';
    } else if (l == "en" && document.dialect_en.d_en.value == "ASCII") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = '"Courier", monospace';
    } else {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = "";
    }
  }
  for (var i = 0; i < LANGUAGES.length; i++) {
    if (document.setLanguage.language.options[i].value == l) {
      document.setLanguage.language.options[i].innerHTML = LANGUAGES[i];
      document.getElementsByClassName("button")[i].classList.add("selected");
      if (l == "en")
        document.title = "AHS Grade Calculator";
      else if (l == "la")
        document.title = "AHS Grade Calculator Latinus"
      else if (l == "sa")
        document.title = "AHS Grade Calculator " + d["sanskrit"];
      else
        document.title = "AHS Grade Calculator " + d.languages[i];
    } else {
      document.getElementsByClassName("button")[i].classList.remove("selected");
      if (RTL_LANG.indexOf(document.setLanguage.language.options[i].value) != -1) {
        if (RTL_LANG.indexOf(lang) == -1) {
          document.setLanguage.language.options[i].innerHTML = "&#x2067;" + LANGUAGES[i] + "&#x2069; &mdash; " +
            d.languages[i];
        } else {
          document.setLanguage.language.options[i].innerHTML = "&#x2067;" + LANGUAGES[i] + "&#x2069; &mdash; " +
            "&#x2067;" + d.languages[i] + "&#x2069;";
        }
      } else {
        document.setLanguage.language.options[i].innerHTML = LANGUAGES[i] + " &mdash; " +
          d.languages[i];
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
  if (typeof currentLangData[key] != "undefined") {
    document.getElementById(id).innerHTML = currentLangData[key];
    document.getElementById(id).lang = lang;
  } else {
    document.getElementById(id).innerHTML = langData["en"][key];
    document.getElementById(id).lang = "en";
  }
  if (RTL_LANG.indexOf(document.getElementById(id).lang) != -1) {
    document.getElementById(id).style.direction = "rtl";
  } else {
    document.getElementById(id).style.direction = "ltr";
  }
}
function langReplace(key, codes, values) {
  var str = currentLangData[key];
  for (var i = 0; i < codes.length; i++) {
    str = str.replace(codes[i], "" + values[i]);
  }
  return str;
}

function setReference() {
  var refer, rForm;
  currentLangData = JSON.parse(JSON.stringify(langData[lang]));
  if (["hi", "ur"].indexOf(lang) == -1) {
    document["refer_hi-ur"].style.display = "none";
  } else {
    document["refer_hi-ur"].style.display = "";
    rForm = document["refer_hi-ur"]["r_hi-ur"];
    refer = rForm.value;
    var pronoun;
    switch(lang) {
      case "ur": switch(refer) {
        case "mf0":
        case "ff0":
          pronoun = "تم";
          break;
        default:
          pronoun = "آپ";
      }
      document.getElementById("refer_hi-ur_friend").innerHTML = {"آپ": "آپ کو", "تم": "تمہیں"}[pronoun] + " کیسے بولوں؟";
      buttonVals = [
        "تم میرے دوست ہو",
        "تم میری دوست ہو",
        "آپ میرے دوست ہو",
        "آپ میری دوست ہو",
        "آپ میرے دوست ہیں",
        "آپ میری دوست ہیں"
      ];
      rForm.style.direction = "rtl";
      break;
        
      default: switch(refer) {
        case "mf0":
        case "ff0":
          pronoun = "तुम";
          break;
        default:
          pronoun = "आप";
      }
      document.getElementById("refer_hi-ur_friend").innerHTML = {"आप": "आपको", "तुम": "तुम्हें"}[pronoun] + " कैसे बोलूँ?";
      buttonVals = [
        "तुम मेरे दोस्त हो",
        "तुम मेरी दोस्त हो",
        "आप मेरे दोस्त हो",
        "आप मेरी दोस्त हो",
        "आप मेरे दोस्त हैं",
        "आप मेरी दोस्त हैं"
      ];
      rForm.style.direction = "ltr";
    }
    for (var i = 0; i < rForm.options.length; i++)
      rForm.options[i].innerHTML = buttonVals[i];
    
    if (lang == "hi") {
      if (["mf2", "ff2"].indexOf(refer) != -1) {
        currentLangData["begin"] = currentLangData["begin"].replaceAll("बनाओ", "बनाएँ").replaceAll("मानो", "मानें");
        currentLangData["catInstruct"] = currentLangData["catInstruct"].replaceAll("बनाओ", "बनाएँ").replaceAll("मानो", "मानें");
        currentLangData["rampalInstruct"] = currentLangData["rampalInstruct"].replace("करो", "कीजिए").replaceAll("करो", "करें").replaceAll("दो", "दें");
        ["catList", "scoreNaN", "submit", "apply", "add", "delete", "edit", "mailSent", "editInstruct",
        "copyGradesInstruct", "dontWorry", "intro", "selectAbove", "addClassOption", "search"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("करो", "करें"));
        currentLangData["continue"] = currentLangData["continue"].replace("बढ़ो", "बढ़ें");
        currentLangData["intro"] = currentLangData["intro"].replaceAll("चुन लो", "चुन लें").replace("करें", "कीजिए");;
        currentLangData["notPossibleGrade"] = currentLangData["notPossibleGrade"].replace("रहो", "रहें");
        currentLangData["fritzExam"] = currentLangData["fritzExam"].replace("करोगे", "करेंगे");
        ["mailSent", "manualButton", "addClassOption", "sethClassInstruct", "add", "addAssignment",
        "editInstruct"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("डालो", "डालें"));
        currentLangData["jsSuccess"] = currentLangData["jsSuccess"].replaceAll("हो", "हैं");
        currentLangData["createCat"] = currentLangData["createCat"].replaceAll("बनाओ", "बनाएँ");
        currentLangData["editInstruct"] = currentLangData["editInstruct"].replaceAll("दबाओ", "दबाएँ");
        currentLangData["calcRequiredButton"] = currentLangData["calcRequiredButton"].replaceAll("लगाओ", "लगाएँ");
        currentLangData["changeWeightButton"] = currentLangData["changeWeightButton"].replaceAll("दो", "दें");
        currentLangData["mobileCopyInstruct"] = currentLangData["mobileCopyInstruct"].replaceAll("हो", "हैं");
        currentLangData["pasteGradesInstruct"] = currentLangData["pasteGradesInstruct"].replaceAll("दबाओ", "दबाएँ");
        currentLangData["dontWorry"] = currentLangData["dontWorry"].replaceAll("सकते हो", "सकते हैं");
        currentLangData["selClass"] = currentLangData["selClass"].replaceAll("चुनो", "चुनें");
        currentLangData["selClassOption"] = currentLangData["selClassOption"].replaceAll("चुनो", "चुनें");
        currentLangData["sethClassInstruct"] = currentLangData["sethClassInstruct"].replaceAll("दबाओ", "दबाएँ");
        currentLangData["pointSystemInstruct"] = currentLangData["pointSystemInstruct"].replaceAll("देखो", "देखें");
        currentLangData["pointSystemInstruct2"] = currentLangData["pointSystemInstruct2"].replaceAll("सकते हो", "सकते हैं");
        currentLangData["enterNotes"] = currentLangData["enterNotes"].replaceAll("चाहो", "चाहें");
        currentLangData["clearDataButton"] = currentLangData["clearDataButton"].replaceAll("हटाओ", "हटाएँ");
        currentLangData["clearDataExp"] = currentLangData["clearDataExp"].replaceAll("आओगे", "आएँगे").replaceAll("रहने दो", "रहने दें").replaceAll("हटाओ", "हटाएँ").replaceAll("ना हो", "ना हों");
        currentLangData["getCreditButton"] = currentLangData["getCreditButton"].replaceAll("देखो", "देखें");
        currentLangData["modifyCreditHeading"] = currentLangData["modifyCreditHeading"].replaceAll("बदलो", "बदलें").replaceAll("हटाओ", "हटाएँ");
        referenceKey("pronunciation", "कह दो", "कह दीजिए");
        referenceKey("deleteAssignment", "निकालो", "निकालें");
        referenceKey("editInstruct", "निकालो", "निकालें");
        referenceKey("delete", "निकालो", "निकालें");
        referenceKey("selectLetter", "लो", "लें");
      }
      if (["mf0", "ff0"].indexOf(refer) != -1) {
        ["reqScore_0", "reqScore", "welcome", "intro", "copyGradesInstruct", "superAlgorithm",
        "clearDataExp"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("आपको", "तुम्हें"));
        ["begin", "confirm"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("आपको", "तुमको"));
        ["begin", "scoreNaN", "notPossibleGrade", "mailSent", "welcome", "jsSuccess"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("आपक", "तुम्हार"));
        ["fritzExam", "welcome", "jsSuccess", "clearDataExp"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("आप", "तुम"));
        ["mobileCopyInstruct", "dontWorry"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("आप ", ""));
      }
      if (["ff0", "ff1", "ff2"].indexOf(refer) != -1) {
        ["notPossibleGrade", "jsSuccess", "mobileCopyInstruct", "dontWorry", "pointSystemInstruct2"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("ते", "ती").replaceAll("इस्तीमाल", "इस्तेमाल"));
        currentLangData["fritzExam"] = currentLangData["fritzExam"].replaceAll("गे)", "गी)");
        currentLangData["clearDataExp"] = currentLangData["clearDataExp"].replaceAll("आओगे", "आओगी").replaceAll("आएँगे", "आएँगी");
        currentLangData["jsSuccess"] = currentLangData["jsSuccess"].replaceAll("रहे", "रही");
      }
    } else if (lang == "ur") {
      if (["mf2", "ff2"].indexOf(refer) != -1) {
        currentLangData["begin"] = currentLangData["begin"].replaceAll("بناؤ", "بنائیں").replaceAll("مانو", "مانیں");
        currentLangData["catInstruct"] = currentLangData["catInstruct"].replaceAll("بناؤ", "بنائیں").replaceAll("مانو", "مانیں");
        currentLangData["rampalInstruct"] = currentLangData["rampalInstruct"].replace("کرو", "کیجئے").replaceAll("کرو", "کریں").replaceAll("دو", "دیں");
        ["catList", "scoreNaN", "submit", "apply", "add", "delete", "edit", "mailSent", "editInstruct",
        "copyGradesInstruct", "dontWorry", "intro", "selectAbove", "addClassOption", "search"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("کرو", "کریں"));
        currentLangData["continue"] = currentLangData["continue"].replace("بڑھو", "بڑھیں");
        currentLangData["intro"] = currentLangData["intro"].replaceAll("چن لو", "چن لیں").replace("کریں", "کیجئے");
        currentLangData["notPossibleGrade"] = currentLangData["notPossibleGrade"].replace("رہو", "رہیں");
        currentLangData["fritzExam"] = currentLangData["fritzExam"].replace("کرو گے", "کریں گے");
        ["mailSent", "manualButton", "addClassOption", "sethClassInstruct", "add", "addAssignment",
        "editInstruct"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("ڈالو", "ڈالیں"));
        currentLangData["jsSuccess"] = currentLangData["jsSuccess"].replaceAll("ہو", "ہیں");
        currentLangData["createCat"] = currentLangData["createCat"].replaceAll("بناؤ", "بنائیں");
        currentLangData["editInstruct"] = currentLangData["editInstruct"].replaceAll("دباؤ", "دبائیں");
        currentLangData["calcRequiredButton"] = currentLangData["calcRequiredButton"].replaceAll("لگاؤ", "لگائیں");
        currentLangData["changeWeightButton"] = currentLangData["changeWeightButton"].replaceAll("دو", "دیں");
        currentLangData["mobileCopyInstruct"] = currentLangData["mobileCopyInstruct"].replaceAll("ہو", "ہیں");
        currentLangData["pasteGradesInstruct"] = currentLangData["pasteGradesInstruct"].replaceAll("دباؤ", "دبائیں");
        currentLangData["dontWorry"] = currentLangData["dontWorry"].replaceAll("سکتے ہو", "سکتے ہیں");
        currentLangData["selClass"] = currentLangData["selClass"].replaceAll("چنو", "چنیں");
        currentLangData["selClassOption"] = currentLangData["selClassOption"].replaceAll("چنو", "چنیں");
        currentLangData["sethClassInstruct"] = currentLangData["sethClassInstruct"].replaceAll("دباؤ", "دبائیں");
        currentLangData["pointSystemInstruct"] = currentLangData["pointSystemInstruct"].replaceAll("دیکھو", "دیکھیں");
        currentLangData["pointSystemInstruct2"] = currentLangData["pointSystemInstruct2"].replaceAll("سکتے ہو", "سکتے ہیں");
        currentLangData["enterNotes"] = currentLangData["enterNotes"].replaceAll("چاہو", "چاہیں");
        currentLangData["clearDataButton"] = currentLangData["clearDataButton"].replaceAll("ہٹاؤ", "ہٹائیں");
        currentLangData["clearDataExp"] = currentLangData["clearDataExp"].replaceAll("آؤ گے", "آئیں گے").replaceAll("رہنے دو", "رہنے دیں").replaceAll("ہٹاؤ", "ہٹائیں").replaceAll("نہ ہو", "نہ ہوں");
        currentLangData["getCreditButton"] = currentLangData["getCreditButton"].replaceAll("دیکھو", "دیکھیں");
        currentLangData["modifyCreditHeading"] = currentLangData["modifyCreditHeading"].replaceAll("بدلو", "بدلیں").replaceAll("ہٹاؤ", "ہٹائیں");
        referenceKey("pronunciation", "کہہ دو", "کہہ دیجئے");
        referenceKey("deleteAssignment", "نکالو", "نکالیں");
        referenceKey("delete", "نکالو", "نکالیں");
        referenceKey("editInstruct", "نکالو", "نکالیں");
        referenceKey("selectLetter", "لو", "لیں");
      }
      if (["mf0", "ff0"].indexOf(refer) != -1) {
        ["reqScore_0", "reqScore", "welcome", "intro", "copyGradesInstruct", "superAlgorithm",
        "clearDataExp"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("آپ کو", "تمہیں"));
        ["begin", "confirm"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("آپ کو", "تم کو"));
        ["begin", "scoreNaN", "notPossibleGrade", "mailSent", "welcome", "jsSuccess"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("آپ کا", "تمہارا").replaceAll("آپ کی", "تمہاری").replaceAll("آپ کے", "تمہارے"));
        ["fritzExam", "welcome", "jsSuccess", "clearDataExp"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("آپ", "تم"));
        ["mobileCopyInstruct", "dontWorry"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("آپ ", ""));
      }
      if (["ff0", "ff1", "ff2"].indexOf(refer) != -1) {
        ["notPossibleGrade", "jsSuccess", "mobileCopyInstruct", "dontWorry", "pointSystemInstruct2"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("تے", "تی"));
        currentLangData["fritzExam"] = currentLangData["fritzExam"].replaceAll("گے)", "گی)");
        currentLangData["clearDataExp"] = currentLangData["clearDataExp"].replaceAll("آؤ گے", "آؤ گی").replaceAll("آئیں گے", "آئیں گی");
        currentLangData["jsSuccess"] = currentLangData["jsSuccess"].replaceAll("رہے", "رہی");
      }
    }
  }
  if (["es"].indexOf(lang) == -1) {
    document["refer_es"].style.display = "none";
  } else {
    document["refer_es"].style.display = "";
    rForm = document["refer_es"]["r_es"];
    refer = rForm.value;
    var pronoun;
    switch(refer) {
      case "mf1":
      case "ff1":
        pronoun = "usted";
        break;
      default:
        pronoun = "tú";
    }
    document.getElementById("refer_es_friend").innerHTML = "¿Cómo debo llamar"+{"nf0": "te", "mf0": "te", "ff0": "te", "nf1": "lo/la", "mf1": "lo", "ff1": "la"}[refer] + "?";
    
    if (["mf1", "ff1", "nf1"].indexOf(refer) != -1) {
      referenceKeys("begin", ["crea", "haz", "considéra", "tu nota"], ["cree", "haga", "considére", "su nota"]);
      referenceKeys("catInstruct", ["haz", "hagas", "considéra", "tu nota"], ["haga", "haga", "considére", "su nota"]);
      referenceKey("catList", "Haz", "Haga");
      referenceKeys("scoreNaN", ["tienes", "trata"], ["tiene", "trate"]);
      referenceKeys("rampalInstruct", ["Haz", "Mira", "introdúce"], ["Haga", "Mire", "introdúzca"]);
      referenceKey("notPossibleGrade", "para ti", "para usted");
      referenceKey("fritzExam", "hagas", "haga");
      referenceKey("validData", "introduce", "introduzca");
      referenceKeys("mailSent", ["Tu res", "vuelve", "ponte", "tu sol"], ["Su res", "vuelva", "póngase", "su sol"]);
      referenceKey("reqScore_0", "Debes", "Debe");
      referenceKey("reqScore", "Debes", "Debe");
      referenceKeys("welcome", ["tienes", "tengas", "sabes", "te preocupes", "por ti"], ["tiene", "tenga", "sabe", "se preocupe", "por usted"]);
      referenceKeys("jsSuccess", ["estás", "tienes", "puedes"], ["usted está", "tiene", "puede"]);
      referenceKeys("intro", ["ponte en", "encuentras", "Añade", "puedas", "selecciona"], ["póngase en", "encuentra", "Añada", "pueda", "seleccione"]);
      referenceKeys("editInstruct", ["introduce tu", "haz", "añade", "borra"], ["introduzca su", "haga", "añada", "borre"]);
      referenceKey("selectLetter", "Selecciona", "Seleccione");
      referenceKey("copyGradesInstruct", "copia tus", "copie sus");
      referenceKeys("mobileCopyInstruct", ["estás", "puedes"], ["está", "puede"]);
      referenceKeys("pasteGradesInstruct", ["péga", "haz"], ["pégue", "haga"]);
      referenceKey("superAlgorithm", "tus ", "sus ");
      referenceKey("dontWorry", "te preocupes", "se preocupe");
      referenceKey("selClass", "Selecciona", "Seleccione");
      referenceKeys("sethClassInstruct", ["introduce", "marca"], ["introduzca", "marque"]);
      referenceKey("pointSystemInstruct", "mira", "mire");
      referenceKey("pointSystemInstruct2", "teclea", "teclee");
      referenceKey("selectAbove", "Selecciona", "Seleccione");
      referenceKeys("clearDataExp", ["te oblig", "visites", "dejas", "estás", "tu GPA"], ["lo/la oblig", "visite", "deja", "está", "su GPA"]);
      referenceKeys("confirm", ["Estás", "quieres"], ["Está", "quiere"]);
      referenceKey("pronunciation", "Di:", "Diga:");
    }
    if (["mf0", "mf1"].indexOf(refer) != -1) {
      referenceKey("welcome", "Bienvenidos", "Bienvenido");
      referenceKey("confirm", "seguro/a", "seguro");
      referenceKey("clearDataExp", "lo/la oblig", "lo oblig");
    }
    if (["ff0", "ff1"].indexOf(refer) != -1) {
      referenceKey("welcome", "Bienvenidos", "Bienvenida");
      referenceKey("confirm", "seguro/a", "segura");
      referenceKey("clearDataExp", "lo/la oblig", "la oblig");
    }
  }
  if (["fa"].indexOf(lang) == -1) {
    document["refer_fa"].style.display = "none";
  } else {
    document["refer_fa"].style.display = "";
    rForm = document["refer_fa"]["r_fa"];
    refer = rForm.value;
    var pronoun = {"f0": "تو", "f1": "شما"}[refer];
    document.getElementById("refer_fa_friend").innerHTML = "چگونه باید با " + pronoun + " صحبت کنم؟";
    
    if (refer == "f0") {
      referenceKeys("begin", ["کنید", "&zwnj;تان"], ["کن", "&zwnj;ت"]);
      referenceKeys("catInstruct", ["کنید", "&zwnj;تان"], ["کن", "&zwnj;ت"]);
      referenceKey("catList", "بکنید", "بکن");
      referenceKeys("scoreNaN", ["رجتان", "کنید"], ["رجت", "کن"]);
      referenceKeys("rampalInstruct", ["کنید", "بنویسین"], ["کن", "بنویس"]);
      referenceKeys("notPossibleGrade", ["برای شما", "بدهید"], ["برای تو", "بده"]);
      referenceKey("fritzExam", "نکنید", "نکن");
      referenceKey("validData", "بکنید", "بکن");
      referenceKeys("mailSent", ["سختان", "تشکر", "بگردید", "کنید", "بگیرید", "ستتان"], ["سخت", "مرسی", "بگرد", "کن", "بگیر", "ستت"]);
      referenceKeys("reqScore_0", ["شما ", "بگیرید"], ["", "بگیر"]);
      referenceKeys("reqScore", ["شما ", "بگیرید"], ["", "بگیر"]);
      referenceKeys("welcome", ["ببینید", "شما", "دارید", "بدانید", "نباشید"], ["ببین", "تو", "داری", "بدان", "نباش"]);
      referenceKeys("jsSuccess", ["شما ", "دارید", "توانید", "خوانید", "کنید"], ["", "داری", "توانی", "خوانی", "کن"]);
      referenceKeys("intro", ["کنید", "شما ", "بگیرید", "توانید"], ["کن", "", "بگیر", "توانی"]);
      referenceKeys("editInstruct", ["کنید", "نویسید"], ["کن", "نویس"]);
      referenceKey("selectLetter", "کنید", "کن");
      referenceKeys("copyGradesInstruct", ["کنید", "تتان"], ["کن", "تت"]);
      referenceKeys("mobileCopyInstruct", ["شما ", "هستید", "توانید", "کنید"], ["", "هستی", "توانی", "کن"]);
      referenceKeys("pasteGradesInstruct", ["بچسبونید", "کنید"], ["بچسبون", "کن"]);
      referenceKey("superAlgorithm", "تتان", "تت");
      referenceKey("dontWorry", ["نباشید", "توانید", "کنید"], ["نباش", "توانی", "کن"]);
      referenceKeys("selClass", ["کنید", "توانید"], ["کن", "توانی"]);
      referenceKey("sethClassInstruct", "کنید", "کن");
      referenceKey("pointSystemInstruct", "ببینید", "ببین");
      referenceKey("pointSystemInstruct2", ["توانید", "نویسید"], ["توانی", "نویش"]);
      referenceKey("selectAbove", "کنید", "کن");
      referenceKeys("clearDataExp", ["شما را", "آیید", "GPAتان", "کنید", "گذارید"], ["تو را", "آیی", "GPAات", "کن", "گذار"]);
      referenceKeys("confirm", ["خوانید", "کنید"], ["خوانی", "کن"]);
      referenceKey("pronunciation", "بگویید", "بگو");
    }
  }
}
function referenceKey(key, o, n) {
  currentLangData[key] = currentLangData[key].replaceAll(o, n);
}
function referenceKeys(key, o, n) {
  for (var i = 0; i < o.length; i++)
    currentLangData[key] = currentLangData[key].replaceAll(o[i], n[i]);
}
function setDialect() {
  var dialect;
  if (lang == "en") {
    document["dialect_en"].style.display = "";
    dialect = document["dialect_en"]["d_en"].value;
    document.getElementById("d_en_dialect").innerHTML = "Dialect: ";
    if (dialect == "UK") {
      ["begin", "catInstruct", "edit", "notPossibleGrade", "minGrade", "fritzExam", "quarterGrades",
      "semGradesButton", "mobileCopyInstruct", "manualButton", "selectAbove", "semWithExam",
      "quarter13", "quarter24", "copyGradesInstruct"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("grade", "mark"));
      referenceKey("welcome", "you need to make", "you've got to make");
      referenceKey("semGrade", "Grade", "Mark");
      referenceKey("examGrade", "grade", "score");
      referenceKey("setPoint", "Grading", "Scoring");
      referenceKey("shouldContinue", "Should", "Shall");
    } else if (dialect == "ASCII") {
      var keys = Object.keys(currentLangData);
      currentLangData["pronunciation"] = "Say: HAH-riss DAHL-vee";
      for (var k = 0; k < keys.length; k++) {
        if (["languages", "numbers"].indexOf(keys[k]) == -1) {
          var tag = 0;
          var inVar = false;
          referenceKeys(keys[k], ["&nbsp;", "&ldquo;", "&rdquo;"], [" ", '"', '"']);
          for (var i = currentLangData[keys[k]].length; i >= 1; i--) {
            var char = currentLangData[keys[k]].substring(i-1,i);
            if (char == ">") {
              tag++;
            } else if (char == "<") {
              tag--;
            } else if (char == "$") {
              inVar = true;
            } else {
              inVar = false;
              for (var j = i-1; j >= 1; j--) {
                var char2 = currentLangData[keys[k]].substring(j-1,j);
                if (char2 == "$") {
                  inVar = true;
                  break;
                } else if (char2 === char2.toLowerCase()) {
                  break;
                }
              }
              if (tag == 0 && !inVar) {
                var bin = currentLangData[keys[k]].charCodeAt(i-1).toString(2);
                while (bin.length < 8)
                  bin = "0"+bin;
                currentLangData[keys[k]] = currentLangData[keys[k]].substring(0, i-1) + 
                bin + " " + currentLangData[keys[k]].substring(i);
              }
            }
          }
        }
      }
      currentLangData["numbers"] = ["0001", "0010", "0011", "0100", "0101", "0110", "0111", "1000", "1001", "1010"];
      document.getElementById("d_en_dialect").innerHTML = "01000100 01101001 01100001 01101100 01100101 01100011 01110100 00111010";
    } else if (dialect == "1600") {
      referenceKeys("begin", ["creating categories", "scores", "if the class is based", "point system", "category", "called something like", "your"],
      ["fashioning Categories", "Scores", "should the Class be based", "the Point System", "Category", "whose name is like", "thy"]);
      referenceKeys("catInstruct",
      ["scores", "if the class is based", "point system", "category", "called something like", "your", "lazy", "you don't do so", ", as", "Please don't make"],
      ["Scores", "should the Class be based", "the Point System", "Category", "whose name is like", "thy", "idle", "thou doest not so", ", for", "Prithee make not"]);
      referenceKey("catList", "that category's score", "the Score of that category");
      referenceKeys("avg", ["class", "categories", "grade"], ["Class", "Categories", "Score"]);
      referenceKeys("noCat", ["category", "currently", "selected"], ["Category", "now", "chosen"]);
      referenceKeys("scoreNaN", ["zero", "at least one category", "Try adding", "assignments", "You have"],
      ["Zero", "one or more Categories", "Do attempt it to add", "Assignments", "Thou hast"]);
      referenceKey("catsFound", "categories found", "Categories were found");
      referenceKey("delete", "Delete", "Remove");
      currentLangData["notPossibleGrade"] = "'Tis a grievous calamity that this Score is not possible for thee this Semester. I do bid thee well for the next Semester!";
      referenceKeys("minGrade", ["goes in", "exam", "you don't"], ["goeth", "Exam", "thou dost not"]);
      referenceKeys("minGrade", ["goes in", "exam", "you don't"], ["goeth", "Exam", "thou dost not"]);
      currentLangData["validData"] = "Prithee, do entre valid information.";
      referenceKeys("mailSent", ["Your response", "Thank you!", "manually", "If the class isn't", "please contact", "your request"],
      ["Thy Response", "I humbly thank thee.", "by hand", "Should the Class be not", "prithee contact", "thy request"]);
      referenceKey("reqScore_0", "You", "Thou");
      referenceKey("reqScore", "You", "Thou");
      referenceKeys("welcome", ["you need to make sure you have", "grade calculator", "you don't know", "don't worry",
      "I'll do it for you"],
      ["thou must be sure thou hast", "Grade Calculator", "thou knowest not", "do not despair", "I shall do't for thee"]);
      referenceKeys("jsSuccess", ["you're reading", "you have", "can use"],
      ["thou art reading", "thou hast", "mayst use"]);
      referenceKeys("intro", ["I am also human", "Please c", "if you catch a mistake", "so you can"],
      ["I, too, am but a person", "Prithee do c", "should thou find a fault", "so thou canst"]);
      referenceKey("whatNeed", "an upcoming", "a forthcoming");
      referenceKey("copyGradesInstruct", "your", "thy");
      referenceKeys("mobileCopyInstruct", ["you are", "you can", "mobile device"], ["thou art", "thou canst", "Mobile Device"]);
      referenceKeys("superAlgorithm", ["My super cool algorithm simplified your"], ["Mine exceedingly fine algorithm did simplify thy"]);
      referenceKey("shouldContinue", "Should", "Shall");
      currentLangData["manualButton"] = "Entre Scores by Hand";
      referenceKeys("sethClassInstruct", ["Please", "check that"], ["Prithee", "mark that"]);
      referenceKeys("pointSystemInstruct", ["check h", "it is", "categories", "Otherwise,"], ["see h", "'tis", "Categories", "Else"]);
      referenceKeys("clearDataExp", ["force you", "re-enter your", "you visit", "data", "If you leave", "you aren't"],
      ["force thee", "again entre thy", "thou visitest", "information", "Should thou leave", "thou be not"]);
      referenceKey("modifyCreditHeading", "Modify/delete credit", "Change/remove Credit");
      referenceKey("deleteAssignment", "Delete", "Remove");
      referenceKeys("editInstruct", ["Delete", "delete", "the same way"], ["Remove", "remove", "this very manner"]);
      referenceKey("clearDataButton", "Data", "Information");
      currentLangData["confirm"] = "Art thou certain thou dost wish to do this?";
      var keys = Object.keys(currentLangData);
      for (var k = 0; k < keys.length; k++) {
        if (["languages", "numbers"].indexOf(keys[k]) == -1) {
          var tag = 0;
          var inVar = false;
          for (var i = currentLangData[keys[k]].length; i >= 1; i--) {
            var char = currentLangData[keys[k]].substring(i-1,i);
            if (char == ">") {
              tag++;
            } else if (char == "<") {
              tag--;
            } else {
              if (tag == 0) {
                var char2 = " ";
                var newC = char;
                if (i < currentLangData[keys[k]].length)
                  char2 = currentLangData[keys[k]].substring(i,i+1);
                if ([" ", ".", ",", ";", "?", ";", "\"", ")", "f", "'", "b", "k", "-", ":", "/", "!"].indexOf(char2) == -1
                && ["s", "v"].indexOf(char) != -1)
                  newC = {"s": "ſ", "v": "u"}[char];
                if (i == 1 && char == "U")
                  newC = "V";
                currentLangData[keys[k]] = currentLangData[keys[k]].substring(0, i-1) + 
                newC + currentLangData[keys[k]].substring(i);
              }
            }
          }
          referenceKey(keys[k], "fſ", "fs");
          referenceKey(keys[k], "ſſ", "ſs");
          referenceKey(keys[k], " u", " v");
          referenceKey(keys[k], " U", " V");
          referenceKey(keys[k], "JauaScript", "JavaScript");
          referenceKey(keys[k], "ahſchool", "ahschool");
          referenceKey(keys[k], "point ſyſtem", "Point Syſtem");
          referenceKey(keys[k], "grade", "Score");
          referenceKey(keys[k], "Grade", "Score");
          referenceKey(keys[k], "<i>Aſsignment</i>", "<i>Assignment</i>");
          referenceKey(keys[k], "&nbſp;", "&nbsp;");
          referenceKey(keys[k], "&ndaſh;", "&ndash;");
          referenceKey(keys[k], "&mdaſh;", "&mdash;");
          referenceKeys(keys[k], ["enter", "Enter"], ["entre", "Entre"]);
          referenceKeys(keys[k], ["required", "Required"], ["necessary", "Necessary"]);
          currentLangData["pronunciation"] = "Say: HAH-riss DAHL-vee";
        }
      }
      referenceKeys("dontWorry", ["been entreed yet", "Don't worry", "don't worry", "you can manually", "category after"],
      ["yet been entered", "Grieve not", "grieve not", "thou canst", "category by hand after"]);
    }
  } else {
    document["dialect_en"].style.display = "none";
  }
  if (lang == "es") {
    document["dialect_es"].style.display = "";
    dialect = document["dialect_es"]["d_es"].value;
    if (dialect == "ES") {
      referenceKey("intro", "computadoras", "ordenadores");
      referenceKeys("superAlgorithm", ["simplificó", "genial"], ["ha simplificado", "guay"]);
    }
  } else {
    document["dialect_es"].style.display = "none";
  }
  if (lang == "fa") {
    document["dialect_fa"].style.display = "";
    dialect = document["dialect_fa"]["d_fa"].value;
    if (dialect == "AF") {
      referenceKey("mailSent", "مرسی!", "تشکر!");
      // Solar Hijri Persian vs Zodiac and Gregorian French- vs English-derived months
      referenceKeys("footer", ["مهر", "خرداد", "اکتبر", "ژوئن"], ["میزان", "جوزا", "اکتوبر", "جون"]);
      referenceKeys("jsSuccess", ["استفاده", "دارید می"], ["استعمال", "می"]);
      referenceKey("begin", "استفاده", "استعمال");
      referenceKey("catInstruct", "استفاده", "استعمال");
      referenceKey("dontWorry", "استفاده", "استعمال");
      referenceKey("creditCathy", "ایده", "فکر");
      referenceKey("selClass", "ایده", "فکر");
      referenceKeys("pronunciation", ["هاریس دالْوی", "hɒːɾiːs dɒːlviː"], ["هَرِیس دَلْوِی", "haɾiːs dalwiː"]);
      referenceKey("ritvikCalc", "ریتویک تیگاواراپو", "رِیتوِیک تِیگَوَرَپو");
      referenceKey("ritvikHonor", "ریتویک تیگاواراپو", "رِیتوِیک تِیگَوَرَپو");
      referenceKey("rampalButton", "دکتر", "داکتر");
    }
  } else {
    document["dialect_fa"].style.display = "none";
  }
  if (lang == "sa") {
    document["script_sa"].style.display = "";
    dialect = document["script_sa"]["s_sa"].value; // really script, not dialect
    var keys = Object.keys(currentLangData);
    SANSKRIT_DIGITS = {
      "Deva": ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
      "Brah": ["𑁦", "𑁧", "𑁨", "𑁩", "𑁪", "𑁫", "𑁬", "𑁭", "𑁮", "𑁯"],
      "Latn": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "Telu": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      "Bali": ["᭐", "᭑", "᭒", "᭓", "᭔", "᭕", "᭖", "᭗", "᭘", "᭙"],
      "Tibt": ["༠", "༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩"]
    }[dialect];
    document.getElementById("script_sa_lipi").innerHTML = {
      "Deva": "लिपिः (Script) ",
      "Brah": "𑀮𑀺𑀧𑀺𑀂 (Script) ",
      "Latn": "Script ",
      "Telu": "లిపిః (Script) ",
      "Bali": "ᬮᬶᬧᬶᬄ (Script) ",
      "Tibt": "ལིཔིཿ (Script) "
    }[dialect];
    const TITLES = ["minExam", "semWithExam", "ritvikCalc", "ritvikHonor"];
    if (dialect == "Deva") {
      for (var k = 0; k < TITLES.length; k++)
        currentLangData[TITLES[k]] = "॥ " + currentLangData[TITLES[k]] + " ॥";
    } else if (dialect == "Latn") {
      var devanagari_consonants = ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
        "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
        "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ळ",
        "ः", "ं"];
      var devanagari_vowels = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", "ऋ"];
      var devanagari_matras = ["ां", "ाः", "िं", "िः", "ीं", "ीः", "ुं", "ुः", "ूं", "ूः", "ें", "ेः", "ैं", "ैः", "ों", "ोः", "ौं", "ौः",
        "्", "ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ृ", "ं", "ः"];
      var iast_consonants = ["k", "kh", "g", "gh", "ṅ", "c", "ch", "j", "jh", "ñ",
        "ṭ", "ṭh", "ḍ", "ḍh", "ṇ", "t", "th", "d", "dh", "n",
        "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "ś", "ṣ", "s", "h", "ḷ"];
      var iast_vowels = ["a", "ā", "i", "i", "u", "u", "e", "ai", "o", "au", "ṛ"];
      var iast_matras = ["āṃ", "āḥ", "iṃ", "iḥ", "īṃ", "īḥ", "uṃ", "uḥ", "ūm", "ūḥ", "eṃ", "eḥ", "aiṃ", "aiḥ", "oṃ", "oḥ", "auṃ", "auḥ",
        "", "ā", "i", "ī", "u", "ū", "e", "ai", "o", "au", "ṛ", "aṃ", "aḥ"];
      for (var k = 0; k < keys.length; k++) {
        if (["languages", "numbers"].indexOf(keys[k]) == -1) {
          for (var i = 0; i < devanagari_consonants.length; i++) {
            for (var j = 0; j < devanagari_matras.length; j++) {
              referenceKey(keys[k], devanagari_consonants[i]+devanagari_matras[j],
                iast_consonants[i]+iast_matras[j]);
            }
          }
          for (var i = 0; i < devanagari_vowels.length; i++) {
            referenceKey(keys[k], devanagari_vowels[i], iast_vowels[i]);
          }
          for (var i = 0; i < devanagari_consonants.length; i++) {
            referenceKey(keys[k], devanagari_consonants[i], iast_consonants[i]+"a");
          }
          for (var i = 0; i <= 9; i++) {
            referenceKey(keys[k], ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"][i], ""+i);
          }
          referenceKey(keys[k], "ऽ", "'");
          referenceKey(keys[k], "।", "|");
          referenceKey(keys[k], "॥", "||");
        }
      }
      for (var k = 0; k < TITLES.length; k++)
        currentLangData[TITLES[k]] = currentLangData[TITLES[k]].toUpperCase();
    } else {
      var devanagari_letters = ["अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", "ऋ",
        "्", "ा", "ि", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ृ", "ं", "ः", "।", "॥", "ऽ",
        "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
        "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
        "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "ळ",
        "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", " "];
      var new_letters = {"Brah": ["𑀅", "𑀆", "𑀇", "𑀈", "𑀉", "𑀊", "𑀏", "𑀐", "𑀑", "𑀒", "𑀋",
      "𑁆", "𑀸", "𑀺", "𑀻", "𑀼", "𑀽", "𑁂", "𑁃", "𑁄", "𑁅", "𑀾", "𑀁", "𑀂", "𑁇", "𑁈", "",
      "𑀓", "𑀔", "𑀕", "𑀖", "𑀗", "𑀘", "𑀙", "𑀚", "𑀛", "𑀜",
      "𑀝", "𑀞", "𑀟", "𑀠", "𑀡", "𑀢", "𑀣", "𑀤", "𑀥", "𑀦",
      "𑀧", "𑀨", "𑀩", "𑀪", "𑀫", "𑀬", "𑀭", "𑀮", "𑀯", "𑀰", "𑀱", "𑀲", "𑀳", "𑀴",
      "𑁦", "𑁧", "𑁨", "𑁩", "𑁪", "𑁫", "𑁬", "𑁭", "𑁮", "𑁯", " "],
      "Telu": ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఏ", "ఐ", "ఓ", "ఔ", "ఋ",
      "్", "ా", "ి", "ీ", "ు", "ూ", "ే", "ై", "ో", "ౌ", "ృ", "ం", "ః", "।", "॥", "ఽ",
      "క", "ఖ", "గ", "ఘ", "ఙ", "చ", "ఛ", "జ", "ఝ", "ఞ",
      "ట", "ఠ", "డ", "ఢ", "ణ", "త", "థ", "ద", "ధ", "న",
      "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ", "ళ",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " "],
      "Bali": ["ᬅ", "ᬆ", "ᬇ", "ᬈ", "ᬉ", "ᬊ", "ᬏ", "ᬐ", "ᬑ", "ᬒ", "ᬋ",
      "᭄", "ᬵ", "ᬶ", "ᬷ", "ᬸ", "ᬹ", "ᬾ", "ᬿ", "ᭀ", "ᭁ", "ᬺ", "ᬂ", "ᬄ", "᭞", "᭟", "",
      "ᬓ", "ᬔ", "ᬕ", "ᬖ", "ᬗ", "ᬘ", "ᬙ", "ᬚ", "ᬛ", "ᬜ",
      "ᬝ", "ᬞ", "ᬟ", "ᬠ", "ᬡ", "ᬢ", "ᬣ", "ᬤ", "ᬥ", "ᬦ",
      "ᬧ", "ᬨ", "ᬩ", "ᬩ", "ᬫ", "ᬬ", "ᬭ", "ᬮ", "ᬯ", "ᬰ", "ᬱ", "ᬲ", "ᬳ", "ᬮ",
      "᭐", "᭑", "᭒", "᭓", "᭔", "᭕", "᭖", "᭗", "᭘", "᭙", "&#8203;"],
      "Tibt": ["ཨ", "ཨཱ", "ཨི", "ཨཱི", "ཨུ", "ཨཱུ", "ཨེ", "ཨཻ", "ཨོ", "ཨཽ", "ཨྲྀ",
      "྄", "ཱ", "ི", "ཱི", "ུ", "ཱུ", "ེ", "ཻ", "ོ", "ཽ", "ྲྀ", "ཾ", "ཿ", "།", "༎", "྅",
      "ཀ", "ཁ", "ག", "གྷ", "ང", "ཙ", "ཚ", "ཛ", "ཛྷ", "ཉ",
      "ཊ", "ཋ", "ཌ", "ཌྷ", "ཎ", "ཏ", "ཐ", "ད", "དྷ", "ན",
      "པ", "ཕ", "བ", "བྷ", "མ", "ཡ", "ར", "ལ", "ཝ", "ཤ", "ཥ", "ས", "ཧ", "ལ",
      "༠", "༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩", "&#8203;"]}[dialect];
      var numberSep = {"Brah": "", "Telu": "", "Bali": "᭞", "Tibt": " "}[dialect];
      var TITLE_START = {"Brah": "𑁈 ", "Telu": "॥ ", "Bali": "᭚", "Tibt": "༄༎"}[dialect];
      var TITLE_END = {"Brah": " 𑁈", "Telu": " ॥", "Bali": "", "Tibt": ""}[dialect];
      for (var k = 0; k < keys.length; k++) {
        if (["languages", "numbers"].indexOf(keys[k]) == -1) {
          if (["Bali", "Tibt"].indexOf(dialect) != -1) {
            referenceKey(keys[k], "&nbsp;।", "।");
            referenceKey(keys[k], "&nbsp;॥", "॥");
          }
          for (var i = 0; i < devanagari_letters.length; i++)
            referenceKey(keys[k], devanagari_letters[i], new_letters[i]);
          for (var i = 0; i < currentLangData[keys[k]].length; i++) {
            if (SANSKRIT_DIGITS.concat("%").indexOf(currentLangData[keys[k]].substring(i,i+1)) != -1) {
              if (i == currentLangData[keys[k]].length ||
              SANSKRIT_DIGITS.concat([".","%"]).indexOf(currentLangData[keys[k]].substring(i+1,i+2)) == -1) {
                currentLangData[keys[k]] = currentLangData[keys[k]].substring(0,i+1) + numberSep +
                currentLangData[keys[k]].substring(i+1);
                i += numberSep.length;
              }
              if (i == 0 || SANSKRIT_DIGITS.concat([".","%"]).indexOf(currentLangData[keys[k]].substring(i-1,i)) == -1) {
                currentLangData[keys[k]] = currentLangData[keys[k]].substring(0,i) + numberSep +
                currentLangData[keys[k]].substring(i);
                i += numberSep.length;
              }
            }
          }
          referenceKey(keys[k], "$NUMBER", numberSep+"$NUMBER"+numberSep);
          referenceKey(keys[k], numberSep+"$NUMBER"+numberSep+"%", numberSep+"$NUMBER%"+numberSep);
          referenceKey(keys[k], "$SCORE%", numberSep+"$SCORE%"+numberSep);
          referenceKey(keys[k], "$MIN%", numberSep+"$MIN%"+numberSep);
          referenceKey(keys[k], "$WEIGHT%", numberSep+"$WEIGHT%"+numberSep);
          referenceKey(keys[k], "$PTS/$TOT", numberSep+"$PTS/$TOT"+numberSep);
          referenceKey(keys[k], "AHS&#8203;GPA", "AHS GPA");
          referenceKey(keys[k], "Count&#8203;as", "Count as");
          if (dialect == "Bali") {
            referenceKey(keys[k], "᭞&#8203;", "᭞ ");
            referenceKey(keys[k], "᭟&#8203;", "᭟ ");
          }
          if (dialect == "Tibt") {
            referenceKey(keys[k], "ང།", "ང༌།");
            referenceKey(keys[k], "ང༎", "ང༌༎");
            referenceKey(keys[k], "ཀ།", "ཀ&nbsp;།");
            referenceKey(keys[k], "ཀ༎", "ཀ&nbsp;༎");
            referenceKey(keys[k], "ག།", "ག&nbsp;།");
            referenceKey(keys[k], "ག༎", "ག&nbsp;༎");
            referenceKey(keys[k], "།&#8203;", "།&ensp;");
            referenceKey(keys[k], "༎&#8203;", "༎&ensp;");
            for (var i = 0xF40; i <= 0xF67; i++)
              referenceKey(keys[k], "྄"+String.fromCharCode(i), String.fromCharCode(i+0x50))
          }
        }
      }
      for (var k = 0; k < TITLES.length; k++)
        currentLangData[TITLES[k]] = TITLE_START + currentLangData[TITLES[k]] + TITLE_END;
    }
  } else {
    document["script_sa"].style.display = "none";
  }
}
function wordList(arr) {
  var str = "";
  var comma = ", ";
  var oxford = true;
  if (arr.length == 0) return str;
  if (arr.length == 1) return arr[0];
  if (RTL_LANG.indexOf(lang) != -1)
    comma = "&rlm;، ";
  if (["es", "pt"].indexOf(lang) != -1)
    oxford = false;
  if (["sa"].indexOf(lang) != -1)
    comma = " ";
  for (var i = 0; i < arr.length-2; i++)
    str += arr[i] + comma;
  str += arr[arr.length-2];
  if (oxford && arr.length > 2)
    str += comma;
  else
    str += " "
  if (lang != "sa")
    str += currentLangData.and;
  if (lang == "es" && arr[arr.length-1].toLowerCase().startsWith("i"))
    str = str.substring(0, str.length-1)+"e";
  str += " ";
  str += arr[arr.length-1];
  if (lang == "sa")
    currentLangData.and;
  return str;
}