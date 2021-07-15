const SCRIPT_ID = ["javascript", "start", "auto", "finalAuto", "autoCategories", "manual", "category",
  "editCategory", "addClass", "semester", "gpaCalc", "seth_img", "langSelect", "examGrade", "semesterGrade",
  "setLangForm", "intro", "footer", "translateMotto"];
const LANGUAGES = ["English", "Español", "Português", "Français", "हिन्दी", "اردو",
"বাংলা", "فارسی", "ᐃᓄᒃᑎᑐᑦ", "Latinum", "संस्कृतम्"];
const LANG_CODES = ["en", "es", "pt", "fr", "hi", "ur", "bn", "fa", "iu", "la", "sa"];
const RTL_LANG = ["ur", "fa"];

const MY_EMAIL = "harysdalvi@gmail.com";

var usedLangs = ["en"];

var currentLangData;
function changeLanguage(l) {
  lang = l;
  if (usedLangs.indexOf(l) == -1) {
    usedLangs.push(l);
    var script = document.createElement('script');
    script.src = "lang/"+l+".js";
    document.body.appendChild(script);
  } else {
    languageLoaded(l);
  }
}
function languageLoaded(l) {
  currentLangData = langData[l];
  setReference();
  var dialect = setDialect();
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
    ['<a href="mailto:'+MY_EMAIL+'?subject=Grade calculator issue">'+MY_EMAIL+'</a>']);
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
  langHTML("deleteCatButton");
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
  langHTML("translateMotto");
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
    } else if (l == "bn") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = 'bengali';
    } else if (l == "sa") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = '"Times New Roman", "Devanagari MT", devanagari, tibetan, balinese';
    } else if (l == "fa") {
      document.getElementById(SCRIPT_ID[i]).style.direction = "rtl";
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = "";
    } else if (l == "en" && dialect == "ASCII") {
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
      else if (l == "sa") {
        document.title = "AHS Grade Calculator " + d["sanskrit"];
        document.setLanguage.language.options[i].innerHTML = d["sanskrit"];
      } else
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
  var classicLangs = {"en": "ang la", "es": "la", "pt": "la", "hi": "sa fa",
  "ur": "sa fa", "fa": "peo ar", "la": "grk", "sa": "", "fr": "la", "bn": "sa",
  "iu": "en fr"}[lang].split(" ");
  if (l == "en" && dialect == "Anglish")
    classicLangs = ["ang"];
  if (l == "en" && dialect == "ASCII")
    classicLangs = [];
  var mottos = {"":"","la": "Ab Dolore Nvmerorvm ad Pacem", "ang": "ᚠᚱᚪᛗ᛫ᚱᛁᛗᚪ᛫ᛋᚪᚱᚾᛖᛋᛋᛖ᛫ᛏᚩ᛫ᚠᚱᛁᚦᛖ",
  "sa": "सङ्ख्यानां&#8203;पीडायाः&#8203;शान्तिम्", "fa": "از درد شمار‌ها به آرام",
  "ar": "مِنْ أَلَمِ الْأَرْقَامِ إِلَى السَّلَامِ", "grk": "Ἐκ τῆς λύπης τῶν ἀριθμῶν πρός τὴν εἰρήνην",
  "peo": "𐏃𐎨𐎠𐏐&#8203;𐎮𐎡𐎱𐎡𐎴𐎠𐎶𐏐&#8203;𐎭𐎼𐎢𐎥𐎠𐏐&#8203;𐏁𐎡𐎹𐎠𐎫𐎡𐎶",
  "en": "From the pain of the numbers to peace", "fr": "De la douleur des nombres à la paix"};
  document.getElementById("motto").innerHTML = "";
  for (var i = 0; i < classicLangs.length; i++) {
    document.getElementById("motto").innerHTML += '<p lang="'+classicLangs[i]+'">'
    + mottos[classicLangs[i]] + '</p>';
  }
  document.getElementsByTagName("html")[0].lang = l;
  updateGpa();
  updateCategories();
}
function languageSelect() {
  changeLanguage(document.setLanguage.language.value);
}
function langHTML(id, key=null) {
  var el = document.getElementById(id);
  if (key == null)
    key = id;
  if (typeof currentLangData[key] != "undefined") {
    el.innerHTML = currentLangData[key];
    el.lang = lang;
  } else {
    el.innerHTML = langData["en"][key];
    el.lang = "en";
  }
  if (RTL_LANG.indexOf(el.lang) != -1) {
    el.style.direction = "rtl";
  } else {
    el.style.direction = "ltr";
  }
}
function langReplace(key, codes, values) {
  var str = currentLangData[key];
  for (var i = 0; i < codes.length; i++)
    str = str.replace(codes[i], "" + values[i]);
  return str;
}

function setReference() {
  var refer, rForm;
  currentLangData = JSON.parse(JSON.stringify(langData[lang])); // make a copy
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
        referenceKeys("begin", ["बनाओ", "मानो"], ["बनाएँ", "मानें"]);
        referenceKeys("catInstruct", ["बनाओ", "मानो"], ["बनाएँ", "मानें"]);
        currentLangData["rampalInstruct"] = currentLangData["rampalInstruct"].replace("करो", "कीजिए").replaceAll("करो", "करें").replaceAll("दो", "दें");
        ["catList", "scoreNaN", "submit", "apply", "add", "delete", "edit", "mailSent", "editInstruct",
        "copyGradesInstruct", "dontWorry", "intro", "selectAbove", "addClassOption", "search"].forEach(
          key => referenceKey(key, "करो", "करें"));
        referenceKey("continue", "बढ़ो", "बढ़ें");
        currentLangData["intro"] = currentLangData["intro"].replaceAll("चुन लो", "चुन लें").replace("करें", "कीजिए");;
        referenceKey("notPossibleGrade", "रहो", "रहें");
        referenceKey("fritzExam", "करोगे", "करेंगे");
        ["mailSent", "manualButton", "addClassOption", "sethClassInstruct", "add", "addAssignment",
        "editInstruct"].forEach(
          key => referenceKey(key, "डालो", "डालें"));
        referenceKey("jsSuccess", "हो", "हैं");
        referenceKey("createCat", "बनाओ", "बनाएँ");
        referenceKey("editInstruct", "दबाओ", "दबाएँ");
        referenceKey("calcRequiredButton", "लगाओ", "लगाएँ");
        referenceKey("changeWeightButton", "दो", "दें");
        referenceKey("mobileCopyInstruct", "हो", "हैं");
        referenceKey("pasteGradesInstruct", "दबाओ", "दबाएँ");
        referenceKey("dontWorry", "सकते हो", "सकते हैं");
        referenceKey("selClass", "चुनो", "चुनें");
        referenceKey("selClassOption", "चुनो", "चुनें");
        referenceKey("sethClassInstruct", "दबाओ", "दबाएँ");
        referenceKey("pointSystemInstruct", "देखो", "देखें");
        referenceKey("pointSystemInstruct2", "सकते हो", "सकते हैं");
        referenceKey("enterNotes", "चाहो", "चाहें");
        referenceKey("clearDataButton", "हटाओ", "हटाएँ");
        referenceKeys("clearDataExp", ["आओगे", "रहने दो", "हटाओ", "ना हो"], ["आएँगे", "रहने दें", "हटाएँ", "ना हों"]);
        referenceKey("getCreditButton", "देखो", "देखें");
        referenceKeys("modifyCreditHeading", ["बदलो", "हटाओ"], ["बदलें", "हटाएँ"]);
        referenceKey("pronunciation", "कह दो", "कह दीजिए");
        referenceKey("deleteAssignment", "निकालो", "निकालें");
        referenceKey("editInstruct", "निकालो", "निकालें");
        referenceKey("delete", "निकालो", "निकालें");
        referenceKey("selectLetter", "लो", "लें");
        referenceKey("deleteCatButton", "ओ", "एँ");
        referenceKey("validData", "करो", "कीजिए");
      }
      if (["mf0", "ff0"].indexOf(refer) != -1) {
        ["reqScore_0", "reqScore", "welcome", "intro", "copyGradesInstruct", "superAlgorithm",
        "clearDataExp"].forEach(
          key => referenceKey(key, "आपको", "तुम्हें"));
        ["begin", "confirm"].forEach(
          key => referenceKey(key, "आपको", "तुमको"));
        ["begin", "scoreNaN", "notPossibleGrade", "mailSent", "welcome", "jsSuccess"].forEach(
          key => referenceKey(key, "आपक", "तुम्हार"));
        ["fritzExam", "welcome", "jsSuccess", "clearDataExp"].forEach(
          key => referenceKey(key, "आप", "तुम"));
        ["mobileCopyInstruct", "dontWorry"].forEach(
          key => referenceKey(key, "आप ", ""));
      }
      if (["ff0", "ff1", "ff2"].indexOf(refer) != -1) {
        ["notPossibleGrade", "jsSuccess", "mobileCopyInstruct", "dontWorry", "pointSystemInstruct2"].forEach(
          key => referenceKeys(key, ["ते", "इस्तीमाल"], ["ती", "इस्तेमाल"]));
        referenceKey("fritzExam", "गे)", "गी)");
        referenceKeys("clearDataExp", ["आओगे", "आएँगे"], ["आओगी", "आएँगी"]);
        referenceKey("jsSuccess", "रहे", "रही");
      }
    } else if (lang == "ur") {
      if (["mf2", "ff2"].indexOf(refer) != -1) {
        referenceKeys("begin", ["بناؤ", "مانو"], ["بنائیں", "مانیں"]);
        referenceKeys("catInstruct", ["بناؤ", "مانو"], ["بنائیں", "مانیں"]);
        currentLangData["rampalInstruct"] = currentLangData["rampalInstruct"].replace("کرو", "کیجئے").replaceAll("کرو", "کریں").replaceAll("دو", "دیں");
        ["catList", "scoreNaN", "submit", "apply", "add", "delete", "edit", "mailSent", "editInstruct",
        "copyGradesInstruct", "dontWorry", "intro", "selectAbove", "addClassOption", "search"].forEach(
          key => referenceKey(key, "کرو", "کریں"));
        referenceKey("continue", "بڑھو", "بڑھیں");
        currentLangData["intro"] = currentLangData["intro"].replaceAll("چن لو", "چن لیں").replace("کریں", "کیجئے");
        referenceKey("notPossibleGrade", "رہو", "رہیں");
        referenceKey("fritzExam", "کرو گے", "کریں گے");
        ["mailSent", "manualButton", "addClassOption", "sethClassInstruct", "add", "addAssignment",
        "editInstruct"].forEach(
          key => referenceKey(key, "ڈالو", "ڈالیں"));
        referenceKey("jsSuccess", "ہو", "ہیں");
        referenceKey("createCat", "بناؤ", "بنائیں");
        referenceKey("editInstruct", "دباؤ", "دبائیں");
        referenceKey("calcRequiredButton", "لگاؤ", "لگائیں");
        referenceKey("changeWeightButton", "دو", "دیں");
        referenceKey("mobileCopyInstruct", "ہو", "ہیں");
        referenceKey("pasteGradesInstruct", "دباؤ", "دبائیں");
        referenceKey("dontWorry", "سکتے ہو", "سکتے ہیں");
        referenceKey("selClass", "چنو", "چنیں");
        referenceKey("selClassOption", "چنو", "چنیں");
        referenceKey("sethClassInstruct", "دباؤ", "دبائیں");
        referenceKey("pointSystemInstruct", "دیکھو", "دیکھیں");
        referenceKey("pointSystemInstruct2", "سکتے ہو", "سکتے ہیں");
        referenceKey("enterNotes", "چاہو", "چاہیں");
        referenceKey("clearDataButton", "ہٹاؤ", "ہٹائیں");
        referenceKeys("clearDataExp", ["آؤ گے", "رہنے دو", "ہٹاؤ", "نہ ہو"], ["آئیں گے", "رہنے دیں", "ہٹائیں", "نہ ہوں"]);
        referenceKey("getCreditButton", "دیکھو", "دیکھیں");
        referenceKeys("modifyCreditHeading", ["بدلو", "ہٹاؤ"], ["بدلیں", "ہٹائیں"]);
        referenceKey("pronunciation", "کہہ دو", "کہہ دیجئے");
        referenceKey("deleteAssignment", "نکالو", "نکالیں");
        referenceKey("delete", "نکالو", "نکالیں");
        referenceKey("editInstruct", "نکالو", "نکالیں");
        referenceKey("selectLetter", "لو", "لیں");
        referenceKey("deleteCatButton", "ؤ", "ئیں");
        referenceKey("validData", "کرو", "کیجئے");
      }
      if (["mf0", "ff0"].indexOf(refer) != -1) {
        ["reqScore_0", "reqScore", "welcome", "intro", "copyGradesInstruct", "superAlgorithm",
        "clearDataExp"].forEach(
          key => referenceKey(key, "آپ کو", "تمہیں"));
        ["begin", "confirm"].forEach(
          key => referenceKey(key, "آپ کو", "تم کو"));
        ["begin", "scoreNaN", "notPossibleGrade", "mailSent", "welcome", "jsSuccess"].forEach(
          key => referenceKeys(key, ["آپ کا", "آپ کی", "آپ کے"], ["تمہارا", "تمہاری", "تمہارے"]));
        ["fritzExam", "welcome", "jsSuccess", "clearDataExp"].forEach(
          key => referenceKey(key, "آپ", "تم"));
        ["mobileCopyInstruct", "dontWorry"].forEach(
          key => referenceKey(key, "آپ ", ""));
      }
      if (["ff0", "ff1", "ff2"].indexOf(refer) != -1) {
        ["notPossibleGrade", "jsSuccess", "mobileCopyInstruct", "dontWorry", "pointSystemInstruct2"].forEach(
          key => referenceKey(key, "تے", "تی"));
        referenceKey("fritzExam", "گے)", "گی)");
        referenceKeys("clearDataExp", ["آؤ گے", "آؤ گی"], ["آئیں گے", "آئیں گی"]);
        referenceKey("jsSuccess", "رہے", "رہی");
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
      referenceKey("pronunciation", "Di ", "Diga ");
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
      referenceKeys("begin", ["کنید", "نمرهٔ شما"], ["کن", "نمرهٔ تو"]);
      referenceKeys("catInstruct", ["کنید", "نمرهٔ شما"], ["کن", "نمرهٔ تو"]);
      referenceKey("catList", "بکنید", "بکن");
      referenceKeys("scoreNaN", ["رج شما", "کنید"], ["رجت", "کن"]);
      referenceKeys("rampalInstruct", ["کنید", "بنویسین"], ["کن", "بنویس"]);
      referenceKeys("notPossibleGrade", ["برای شما", "بدهید"], ["برای تو", "بده"]);
      referenceKey("fritzExam", "نکنید", "نکن");
      referenceKey("validData", "بکنید", "بکن");
      referenceKeys("mailSent", ["سخ شما", "تشکر", "بگردید", "کنید", "بگیرید", "خاست شما"], ["سخت", "مرسی", "بگرد", "کن", "بگیر", "خاستت"]);
      referenceKeys("reqScore_0", ["شما ", "بگیرید"], ["", "بگیر"]);
      referenceKeys("reqScore", ["شما ", "بگیرید"], ["", "بگیر"]);
      referenceKeys("welcome", ["ببینید", "شما", "دارید", "بدانید", "نباشید", "دانید"], ["ببین", "تو", "داری", "بدان", "نباش", "دانی"]);
      referenceKeys("jsSuccess", ["شما ", "دارید", "توانید", "خوانید", "کنید"], ["", "داری", "توانی", "خوانی", "کن"]);
      referenceKeys("intro", ["کنید", "شما ", "بگیرید", "توانید"], ["کن", "", "بگیر", "توانی"]);
      referenceKeys("editInstruct", ["کنید", "نویسید"], ["کن", "نویس"]);
      referenceKey("selectLetter", "کنید", "کن");
      referenceKeys("copyGradesInstruct", ["کنید", "ت شما"], ["کن", "تت"]);
      referenceKeys("mobileCopyInstruct", ["شما ", "هستید", "توانید", "کنید"], ["", "هستی", "توانی", "کن"]);
      referenceKeys("pasteGradesInstruct", ["بچسبونید", "کنید"], ["بچسبون", "کن"]);
      referenceKey("superAlgorithm", "ت شما", "تت");
      referenceKey("dontWorry", ["نباشید", "توانید", "کنید"], ["نباش", "توانی", "کن"]);
      referenceKeys("selClass", ["کنید", "توانید"], ["کن", "توانی"]);
      referenceKey("sethClassInstruct", "کنید", "کن");
      referenceKey("pointSystemInstruct", "ببینید", "ببین");
      referenceKey("pointSystemInstruct2", ["توانید", "نویسید"], ["توانی", "نویش"]);
      referenceKey("minGrade", "توانید", "توانی");
      referenceKey("fritzExam", "توانید", "توانی");
      referenceKey("selectAbove", "کنید", "کن");
      referenceKeys("clearDataExp", ["شما را", "آیید", "GPA شما",
      "کنید","گذارید", "نیستید"], ["تو را", "آیی", "GPAت",
      "کن", "گذار", "نیستی"]);
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
  var dialect = null;
  if (lang == "en") {
    document["dialect_en"].style.display = "";
    dialect = document["dialect_en"]["d_en"].value;
    document.getElementById("d_en_dialect").innerHTML = "Dialect: ";
    if (dialect == "UK") {
      ["edit", "notPossibleGrade", "minGrade", "fritzExam",
      "mobileCopyInstruct", "manualButton", "minExam",
      "copyGradesInstruct", "dontWorry"].forEach(
          key => currentLangData[key]=currentLangData[key].replaceAll("grade", "mark"));
      referenceKey("welcome", "you need to make", "you've got to make");
      referenceKey("begin", "grades", "marks");
      referenceKey("examGrade", "grade", "score");
      referenceKey("setPoint", "Grading", "Scoring");
      referenceKey("shouldContinue", "Should", "Shall");
      referenceKey("ritvikHonor", "honor", "honour");
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
      ["scores", "if the class is based", "point system", "category", "called something like", "your"],
      ["Scores", "should the Class be based", "the Point System", "Category", "whose Name is like", "thy"]);
      referenceKeys("catNameExists", ["is already", "category", "name"], ["already is", "Category", "Name"]);
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
      referenceKeys("mobileCopyInstruct", ["you are", "you can", "mobile device", "highlight"], ["thou art", "thou canst", "Mobile Device", "mark"]);
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
        }
      }
      currentLangData["pronunciation"] = "Say: HAH-riss DAHL-vee";
      referenceKeys("dontWorry", ["been entreed yet", "Don't worry", "don't worry", "you can manually", "category after"],
      ["yet been entered", "Grieve not", "grieve not", "thou canst", "category by hand after"]);
    } else if (dialect == "Anglish") {
      referenceKey("mobileCopyInstruct", "select", "highlight");
      var keys = Object.keys(currentLangData);
      var anglish_english = {"category": "set", "categories": "sets", "creating": "making", "create": "make",
      "system": "framework", "total": "whole", "consider": "deem", "grade": "score", "lazy": "idle",
      "adding": "putting in", "add": "put in", "remove": "take out", "delete": "take out", "an assignment": "a chore",
      "assignment": "chore", "average": "norm", "class": "field", "sum": "whole", "denominator": "bottom", "zero": "naught",
      "error": "mistake", "entered": "put in", "enter its": "put in its", "enter it": "put it in", "enter": "put in", "continue": "go on", "submit": "send", "manually": "by hand",
      "apply": "set", "unfortunately": "sadly", "is not possible": "cannot be", "/Possible": "/Could-be",
      "semester": "halfyear", "quarter": "season", "minimum": "least", "required": "needed", "examples": "like", "exam": "test",
      "valid": "sound", "response": "answer", "available": "at hand", "contact": "write to",
      "request": "wish", "cumulative": "gathered", "receive": "get", "language": "tongue", "calculator": "reckoner",
      "make sure you": "see to it that you", "message": "writ", "NOTE:": "WRIT:", "despite": "notwithstanding",
      "human": "flesh and blood", "selecting": "choosing", "selected": "chosen", "select": "choose", "calculation": "reckoning",
      "percentage": "byhundred", "percent": "byhundred", "(ex:": "(like:", "point": "mark", "letter": "rune",
      "credit to": "thanks to", "credit": "schooltime", "note": "writ", "type": "write", "EXACT": "WORD FOR WORD",
      "appear": "seem", "order": "row", "optional": "not needed", "suggested": "put forward", "computer": "reckoner",
      "in honor of": "to thank", "clearing": "wiping", "clear": "wipe", "data": "input", "visit": "come to", "force you to": "bind you to",
      "page": "websheet", "saved": "kept", "edit": "work", "mobile device": "handheld tool", "including": "along with",
      "simply": "straightforwardly", "view": "see", "super cool": "mighty cool", "view": "see", "based on": "built on",
      "please": "do", "simplified": "cleaned", "check that": "mark that", "check how much": "see how much",
      "changed": "bent", "change": "bend", "calculate": "reckon", "figure out": "find out", "quizzes": "smalltests",
      "numbers": "telling", "number": "telling", "modify": "bend", "incognito mode": "unnamed mood", "are you sure you": "do you truly",
      "scale": "reckoning", "grading": "scoring", "search": "hunt", "use": "work", "idea": "thought",
      "pain": "soreness", "peace": "shelter", "correct": "right", "image": "drawing"};
      var english_words = Object.keys(anglish_english);
      for (var k = 0; k < keys.length; k++) {
        if (["languages", "numbers"].indexOf(keys[k]) == -1) {
          for (var i = 0; i < english_words.length; i++) {
            referenceKey(keys[k], english_words[i], anglish_english[english_words[i]]);
            referenceKey(keys[k], english_words[i].substring(0,1).toUpperCase()+english_words[i].substring(1),
            anglish_english[english_words[i]].substring(0, 1).toUpperCase()+anglish_english[english_words[i]].substring(1));
          }
        }
      }
      referenceKey("mobileCopyInstruct", "Chore", "Assignment");
      referenceKey("dontWorry", "by hand put in that set", "put in that set by hand");
      referenceKey("clearDataExp", "re-put in your GPA", "put in your GPA again");
      referenceKeys("footer", ["October", "June"], ["Fall", "Summer"]);
      referenceKeys("catInstruct", ["Do don't", "an existing name"], ["Don't", "a name from before"]);
      referenceKey("selClass", "automatically fill in byhundreds/weighting", "have byhundreds/weighting fill in by themselves");
      currentLangData["manualButton"] = "Put in grades by hand";
      currentLangData["announcements"] += "<br>If you're wondering, \"Anglish\" is a kind of English that borrows as few " +
        "outland (mostly Latin, Greek, and French) words as can be. Some writers, like George Orwell, thought that " +
        "it would be good to have more of these Anglo-Saxon words in writing. Many are easier than the outland words, " +
        "but a few feel odd.";
      document.getElementById("d_en_dialect").innerHTML = "Speak: ";
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
      // Imperial Persian vs Hijri Zodiac and Gregorian French- vs English-derived months
      referenceKeys("footer", ["مهر ۲۵۷۸ شاهنشاهی", "تیر ۲۵۸۰ شاهنشاهی", "اکتبر", "ژوئیه"],
      ["میزان ۱۳۹۸ هجری", "سرطان ۱۴۰۰ هجری", "اکتوبر", "جولای"]);
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
      "Tibt": ["༠", "༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩"],
      "Khmr": ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"],
      "Mlym": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    }[dialect];
    document.getElementById("script_sa_lipi").innerHTML = {
      "Deva": "लिपिः (Script) ",
      "Brah": "𑀮𑀺𑀧𑀺𑀂 (Script) ",
      "Latn": "Script ",
      "Telu": "లిపిః (Script) ",
      "Bali": "ᬮᬶᬧᬶᬄ (Script) ",
      "Tibt": "ལིཔིཿ (Script) ",
      "Khmr": "លិបិះ (Script) ",
      "Mlym": "ലിപിഃ (Script) "
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
      var new_letters = SANSKRIT_LETTER_MAP[dialect];
      var numberSep = {"Brah": "", "Telu": "", "Bali": "᭞", "Tibt": " ", "Khmr": " ", "Mlym": ""}[dialect];
      var TITLE_START = {"Brah": "𑁈 ", "Telu": "॥ ", "Bali": "᭚", "Tibt": "༄༎", "Khmr": "៙", "Mlym": "॥ "}[dialect];
      var TITLE_END = {"Brah": " 𑁈", "Telu": " ॥", "Bali": "", "Tibt": "", "Khmr": "", "Mlym": " ॥"}[dialect];
      for (var k = 0; k < keys.length; k++) {
        if (["languages", "numbers"].indexOf(keys[k]) == -1) {
          if (["Bali", "Tibt"].indexOf(dialect) != -1) {
            referenceKey(keys[k], "&nbsp;।", "।");
            referenceKey(keys[k], "&nbsp;॥", "॥");
          }
          if (["Khmr"].indexOf(dialect) != -1) {
            referenceKey(keys[k], "। ", "।&nbsp;");
            referenceKey(keys[k], "॥ ", "॥&nbsp;");
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
          if (dialect == "Khmr") {
            referenceKeys(keys[k], ["្&#8203;", "្&nbsp;"], ["៑&#8203;", "៑&nbsp;"]);
            if (currentLangData[keys[k]].endsWith("្")) {
              currentLangData[keys[k]] = currentLangData[keys[k]].substring(0,
              currentLangData[keys[k]].length-1) + "៑";
            }
          }
          if (dialect == "Mlym") {
            referenceKeys(keys[k], ["ണ് ", "ണ്&nbsp"], ["ൺ ", "ൺ&nbsp;"]);
            referenceKeys(keys[k], ["ന് ", "ന്&nbsp"], ["ൻ ", "ൻ&nbsp;"]);
            referenceKeys(keys[k], ["ല് ", "ല്&nbsp"], ["ൽ ", "ൽ&nbsp;"]);
            referenceKeys(keys[k], ["ള് ", "ള്&nbsp"], ["ൾ ", "ൾ&nbsp;"]);
            referenceKeys(keys[k], ["ക് ", "ക്&nbsp"], ["ൿ ", "ൿ&nbsp;"]);
          }
        }
      }
      for (var k = 0; k < TITLES.length; k++)
        currentLangData[TITLES[k]] = TITLE_START + currentLangData[TITLES[k]] + TITLE_END;
      referenceKey("confirm", "&#8203;", "​"); // unicode zero width space in quotes
      referenceKey("pronunciation", "ɾɪs&#8203;d", "ɾɪs d");
      referenceKey("pronunciation", "ɾɪs̪&#8203;ˈd̪", "ɾɪs̪ ˈd̪");
      referenceKey("rampalInstruct", "Count&#8203;as", "Count as");
    }
    currentLangData["languages"] = [];
    for (var k = 0; k < LANG_CODES.length; k++)
      currentLangData["languages"].push(currentLangData["l_"+LANG_CODES[k]]);
  } else {
    document["script_sa"].style.display = "none";
  }
  return dialect;
}
function wordList(arr) {
  var str = "";
  var comma = ", ";
  var oxford = true;
  if (arr.length == 0) return str;
  if (arr.length == 1) return arr[0];
  if (RTL_LANG.indexOf(lang) != -1)
    comma = "&rlm;، ";
  if (["es", "pt", "fr"].indexOf(lang) != -1)
    oxford = false;
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
    str += " " + currentLangData.and;
  return str;
}