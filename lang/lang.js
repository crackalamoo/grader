const SCRIPT_ID = ["javascript", "start", "auto", "finalAuto", "autoCategories", "manual", "category",
  "editCategory", "addClass", "semester", "gpaCalc", "seth_img", "langSelect", "examGrade", "semesterGrade",
  "setLangForm", "intro", "footer", "translateMotto"];
const LANGUAGES = ["English", "Español", "Português", "Français", "हिन्दी", "اردو",
"বাংলা", "فارسی", "Latinum", "संस्कृतम्"];
const LANG_CODES = ["en", "es", "pt", "fr", "hi", "ur", "bn", "fa", "la", "sa"];
const RTL_LANG = ["ur", "fa"];

const MY_EMAIL = "harysdalvi@gmail.com";

var usedLangs = ["en"];

var SANSKRIT_DIGITS;

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
  if (document.getElementById("manualInput").style.display == "block")
    langHTML("autoCalculation", "newClass");
  else
    langHTML("autoCalculation", "quarterGrades");
  document.getElementById("intro").innerHTML = langReplace("intro", ["$EMAIL"],
    ['<a href="mailto:'+MY_EMAIL+'?subject=Grade calculator issue">'+MY_EMAIL+'</a>']);
  langHTML("manualBack", "back");
  langHTML("categoryBack", "back");
  langHTML("autoBack", "back");
  langHTML("faqBack", "back");
  langHTML("semesterBack", "back");
  langHTML("gpaBack", "back");
  langHTML("mailBack", "back");
  langHTML("doneEditCat", "done");
  langHTML("editLetter", "letterGrade");
  langHTML("editLetter2", "letterGrade");
  langHTML("addAssignmentButton", "addAssignment");
  langHTML("delAssignmentButton", "deleteAssignment");
  document.editCategory.letter.options[0].innerHTML = "-- " + d.selectLetter + " --";
  document.editCategory.letter2.options[0].innerHTML = "-- " + d.selectLetter + " --";
  langHTML("autoNext", "next");
  langHTML("autoContinue", "continue");
  document.getElementById("selClass").innerHTML = d.selClass + " <img id=\"seth_img\" src=\"SETH.JPG\">";
  document.classes.class.options[0].innerHTML = "-- " + d.selClassOption + " --";
  document.classes.class.options[1].innerHTML = d.addClassOption;
  ["sethClassInstruct", "pointSystemInstruct", "pointSystemInstruct2", "nameOfClass", "enterCatNames",
  "enterWeights", "enterNotes", "minExam", "wantAtLeast", "ahsWeighted", "5scale", "4scale",
  "ritvikCalc", "ritvikHonor", "rampalButton", "manualButton", "dontWorry", "shouldContinue",
  "superAlgorithm", "pasteGradesInstruct", "mobileCopyInstruct", "copyGradesInstruct",
  "deleteCatButton", "changeWeightButton", "numPointsWorth", "desiredGrade", "whatNeed",
  "creditCathy", "createCat", "editInstruct", "newCatButton", "catInstruct", "catName",
  "catPercent", "semGradesButton", "gpaCalcButton", "welcome", "semWithExam",
  "clearDataExp", "clearDataButton", "getCreditButton", "creditNum", "announcements",
  "footer", "pronunciation", "translateMotto", "help", "rampalExp", "calcRequiredButton"].forEach(
      id => langHTML(id));
  calculateSemester();
  document.getElementById("semesterGrade").innerHTML += "<br>" + d.selectAbove;
  calculateExam();
  document.getElementById("examGrade").innerHTML += "<br>" + d.selectAbove;
  document.modifyCredit.numCredits.options[0].innerHTML = d.semester;
  document.modifyCredit.numCredits.options[1].innerHTML = d.quarter;
  document.addCredit.numCredits.options[0].innerHTML = d.semester;
  document.addCredit.numCredits.options[1].innerHTML = d.quarter;
  langHTML("editCreditButton", "apply");
  langHTML("deleteCreditButton", "delete");
  langHTML("addCreditButton", "add");
  langHTML("modifyCreditHeading");
  langHTML("q13sem", "quarter13");
  langHTML("q13exam", "quarter13");
  langHTML("q24sem", "quarter24");
  langHTML("q24exam", "quarter24");
  langHTML("semExam", "examGrade");
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
      document.getElementById(SCRIPT_ID[i]).style.fontFamily = '';
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
      switch (l) {
        case "en":
          document.title = "AHS Grade Calculator"; break;
        case "la":
          document.title = "AHS Grade Calculator Latinus"; break;
        case "sa":
          document.title = "AHS Grade Calculator " + d["sanskrit"];
          document.setLanguage.language.options[i].innerHTML = d["sanskrit"];
          break;
        default:
          document.title = "AHS Grade Calculator " + d.languages[i];
      }
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
  "ur": "sa fa", "fa": "peo ar", "la": "grk", "sa": "", "fr": "la", "bn": "sa"}[lang].split(" ");
  if (l == "en" && dialect == "Anglish")
    classicLangs = ["ang"];
  if (l == "en" && dialect == "ASCII")
    classicLangs = [];
  var mottos = {"":"","la": "Ab Dolore Nvmerorvm ad Pacem", "ang": "ᚠᚱᚪᛗ᛫ᚱᛁᛗᚪ᛫ᛋᚪᚱᚾᛖᛋᛋᛖ᛫ᛏᚩ᛫ᚠᚱᛁᚦᛖ",
  "sa": "सङ्ख्यानां&#8203;पीडायाः&#8203;शान्तिम्", "fa": "از درد شمار‌ها به آرام",
  "ar": "مِنْ أَلَمِ الْأَرْقَامِ إِلَى السَّلَامِ", "grk": "Ἐκ τῆς λύπης τῶν ἀριθμῶν πρός τὴν εἰρήνην",
  "peo": "𐏃𐎨𐎠𐏐&#8203;𐎮𐎡𐎱𐎡𐎴𐎠𐎶𐏐&#8203;𐎭𐎼𐎢𐎥𐎠𐏐&#8203;𐏁𐎡𐎹𐎠𐎫𐎡𐎶"};
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
        
      case "hi": switch(refer) {
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
      if (["mf2", "ff2"].indexOf(refer) != -1)
        setFormal2_hi();
      if (["mf0", "ff0"].indexOf(refer) != -1)
        setFormal0_hi();
      if (["ff0", "ff1", "ff2"].indexOf(refer) != -1)
        setFem_hi();
    } else if (lang == "ur") {
      if (["mf2", "ff2"].indexOf(refer) != -1)
        setFormal2_ur();
      if (["mf0", "ff0"].indexOf(refer) != -1)
        setFormal0_ur();
      if (["ff0", "ff1", "ff2"].indexOf(refer) != -1)
        setFem_ur();
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
    
    if (["mf1", "ff1", "nf1"].indexOf(refer) != -1)
      setFormal_es();
    if (["mf0", "mf1"].indexOf(refer) != -1)
      setMasc_es();
    if (["ff0", "ff1"].indexOf(refer) != -1)
      setFem_es();
  }
  if (["fa"].indexOf(lang) == -1) {
    document["refer_fa"].style.display = "none";
  } else {
    document["refer_fa"].style.display = "";
    rForm = document["refer_fa"]["r_fa"];
    refer = rForm.value;
    var pronoun = {"f0": "تو", "f1": "شما"}[refer];
    document.getElementById("refer_fa_friend").innerHTML = "چگونه باید با " + pronoun + " صحبت کنم؟";
    if (refer == "f0")
      setInformal_fa();
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
      referenceKeys("rampalButton", ["Mr.", "Dr."], ["Mr", "Dr"]);
      referenceKey("superAlgorithm", "super cool", "bloody brilliant");
      ["begin", "catInstruct", "rampalInstruct", "editInstruct", "pointSystemInstruct2",
      "rampalExp"].forEach(
        key => referenceKeys(key, ["&ldquo;", "&rdquo;"], ["&lsquo;", "&rsquo;"]));
      referenceKey("creditCathy", "T.", "T");
    } else if (dialect == "ASCII") {
      var keys = Object.keys(currentLangData);
      currentLangData["pronunciation"] = "Say: HAH-riss DAHL-vee";
      for (var k = 0; k < keys.length; k++) {
        if (["languages", "numbers"].indexOf(keys[k]) == -1) {
          var tag = 0;
          var inVar = false;
          referenceKeys(keys[k], ["&nbsp;", "&ldquo;", "&rdquo;", "&ndash;"], [" ", '"', '"', "-"]);
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
      referenceKey("rampalExp", "grade isn't correct", "Grade be not Precise");
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
          switch(keys[k].substring(0,1)) {
            case "U":
              keys[k] = "V"+keys[k].substring(1); break;
            case "u":
              keys[k] = "v"+keys[k].substring(1); break;
          }
          referenceKeys(keys[k], ["fſ", "ſſ", " u", " U"], ["fs", "ſs", " v", " V"]);
          referenceKey(keys[k], "JauaScript", "JavaScript");
          referenceKey(keys[k], "ahſchool", "ahschool");
          referenceKeys(keys[k], ["point ſyſtem", "percent ſyſtem"], ["Point Syſtem", "Percent Syſtem"]);
          referenceKeys(keys[k], ["grade", "Grade"], ["Score", "Score"]);
          referenceKey(keys[k], "<i>Aſsignment</i>", "<i>Assignment</i>");
          referenceKeys(keys[k], ["&nbſp;", "&ndaſh;", "&mdaſh;"], ["&nbsp;", "&ndash;", "&mdash;"]);
          referenceKeys(keys[k], ["enter", "Enter"], ["entre", "Entre"]);
          referenceKeys(keys[k], ["required", "Required"], ["neceſsary", "Neceſsary"]);
        }
      }
      currentLangData["pronunciation"] = "Say: HAH-riss DAHL-vee";
      for (var i = 0; i < currentLangData["languages"].length; i++) {
        var langSpell = currentLangData["languages"][i];
        switch(langSpell) {
          case "English": langSpell = "Engliſh"; break;
          case "Spanish": langSpell = "Spaniſh"; break;
          case "Portuguese": langSpell = "Portugueſe"; break;
          case "Urdu": langSpell = "Vrdu"; break;
          case "Bengali": langSpell = "Bengalee"; break;
          case "Sanskrit": langSpell = "Sanſcrit"; break;
        }
        currentLangData["languages"][i] = langSpell;
      }
      currentLangData["numbers"][4] = "fiue";
      currentLangData["numbers"][6] = "seuen";
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
      "pain": "soreness", "peace": "shelter", "correct": "right", "image": "drawing", "try": "see to"};
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
      referenceKeys("footer", ["October", "August"], ["Fall", "Summer"]);
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
      ["begin", "catInstruct", "rampalInstruct", "editInstruct", "pointSystemInstruct2", "footer",
      "rampalExp"].forEach(
        key => referenceKeys(key, ["&ldquo;", "&rdquo;"], ["&laquo;", "&raquo;"]));
    }
  } else {
    document["dialect_es"].style.display = "none";
  }
  if (lang == "fa") {
    document["dialect_fa"].style.display = "";
    dialect = document["dialect_fa"]["d_fa"].value;
    if (dialect == "AF")
      setDari_fa();
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
    document.getElementById("script_sa_lipi").innerHTML = SANSKRIT_SCRIPT[dialect];
    const TITLES = ["minExam", "semWithExam", "ritvikCalc", "ritvikHonor"];
    if (dialect == "Deva") {
      for (var k = 0; k < TITLES.length; k++)
        currentLangData[TITLES[k]] = "॥ " + currentLangData[TITLES[k]] + " ॥";
    } else if (dialect == "Latn") {
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
          for (var i = 0; i < DEVANAGARI.length; i++)
            referenceKey(keys[k], DEVANAGARI[i], new_letters[i]);
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