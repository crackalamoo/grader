const SCRIPT_ID = ["javascript", "start", "auto", "finalAuto", "autoCategories", "manual", "category",
  "editCategory", "addClass", "semester", "gpaCalc", "seth_img", "langSelect", "examGrade", "semesterGrade",
  "setLangForm"];
const LANGUAGES = ["English", "Español", "Português", "हिन्दी", "اردو", "فارسی"];
const LANG_CODES = ["en", "es", "pt", "hi", "ur", "fa"];
const RTL_LANG = ["ur", "fa"];
var currentLangData;
function changeLanguage(l) {
  lang = l;
  currentLangData = langData[l];
  setReference();
  var d = currentLangData;
  document.setLanguage.language.value = lang;
  document.getElementById("javascript").innerHTML = d.jsSuccess;
  langHTML("langSelect", "setLang");
  langHTML("welcome");
  if (document.getElementById("manualInput").style.display == "block")
    langHTML("newClass", "quarterGrades");
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
    } else if (l == "hi") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = 'devanagari';
    } else if (l == "fa") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "rtl";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = '';
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
  var refer, rForm, rButtons;
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
        ["mailSent", "manualButton", "addClassOption", "sethClassInstruct"].forEach(
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
        ["mailSent", "manualButton", "addClassOption", "sethClassInstruct"].forEach(
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
      referenceKey("copyGradesInstruct", "copia", "copie");
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
}
function referenceKey(key, o, n) {
  currentLangData[key] = currentLangData[key].replaceAll(o, n);
}
function referenceKeys(key, o, n) {
  for (var i = 0; i < o.length; i++)
    currentLangData[key] = currentLangData[key].replaceAll(o[i], n[i]);
}