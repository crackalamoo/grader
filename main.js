var mode = "start";
var categories = [];
var currentCategory = null;
var divs = document.getElementsByClassName("main");
var imgs = document.getElementsByTagName("img");
var autoCalc = [];
var semesters = [];
var gpaData = [];
const COMMA_DECIMAL_LANG = ["pt", "fr"];
const URDU_DIGIT_LANG = ["ur", "fa"];
const DEVANAGARI_DIGIT_LANG = ["hi"];
const URDU_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const BENGALI_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function lazyLoad(group) {
  for (var i = 0; i < imgs.length; i++) {
    if (imgs[i].dataset.lazy == group)
      imgs[i].src = imgs[i].dataset.src;
  }
}
function changeMode(mode) {
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].id != mode)
      divs[i].style.display = "none";
    else
      divs[i].style.display = "block";
  }
  lazyLoad(mode);
  if (mode == "start") {
    document.getElementById("topInfo").style.display = "block";
    document.getElementById("sitename").innerHTML = "AHS* Grade Calculator";
    document.setLanguage.style.display = "none";
    document.getElementById("pronunciation").style.display = "";
    document.getElementById("languageButtons").style.display = "flex";
  } else {
    document.getElementById("topInfo").style.display = "none";
    document.getElementById("sitename").innerHTML = "AHS Grade Calculator";
    document.setLanguage.style.display = "block";
    document.getElementById("pronunciation").style.display = "none";
    document.getElementById("languageButtons").style.display = "none";
  }
}
changeMode("start");

function makeNumber(grade, possible=100.0) {
  switch(grade) {
    case "A+": grade=98.5; break;
    case "A": grade=95; break;
    case "A-": grade=91.5; break;
    case "B+": grade=88.5; break;
    case "B": grade=85; break;
    case "B-": grade=81.5; break;
    case "C+": grade=78.5; break;
    case "C": grade=75; break;
    case "C-": grade=71.5; break;
    case "D+": grade=68.5; break;
    case "D": grade=65; break;
    case "D-": grade=61.5; break;
    case "F+": grade=58.5; break;
    case "F": grade=30; break;
    case "F-": grade=0; break;
    case "LATE": grade = 50; break;
    case "NTI":
    case "AB":
    case "P":
    case "PEND":
    case "NA":
    case "":
    case " ":
      grade = 0; break;
    default: return new Number(grade);
  }
  return new Number(grade*possible/100.0);
}
class Category {
  constructor(name, percentage, percentSystem=false) {
    this.name = name;
    this.percentage = percentage;
    this.total = 0.0;
    this.possible = 0.0;
    this.percentSystem = percentSystem;
    categories.push(this);
  }
  add(total, possible, countAs=1.0) {
    var dTotal = makeNumber(total, possible)*countAs;
    var dPossible = makeNumber(possible)*countAs;
    if (this.percentSystem) {
      this.total += dTotal/dPossible*100*countAs;
      this.possible += 100;
    } else {
      this.total += dTotal;
      this.possible += dPossible;
    }
  }
  remove (total, possible) {
    var dTotal = makeNumber(total, possible);
    var dPossible = makeNumber(possible);
    if (this.percentSystem) {
      this.total -= dTotal/dPossible*100;
      this.possible -= 100;
    } else {
      this.total -= dTotal;
      this.possible -= dPossible;
    }
  }
  score() {
    return (this.total/this.possible)*100.0;
  }
}
function roundDecimal(num, places) {
  if (myNaN(num)) {
    if (URDU_DIGIT_LANG.indexOf(lang) != -1)
      return "؟؟؟";
    return "???";
  }
  var n = Math.round(num*Math.pow(10.0, places))/Math.pow(10.0, places);
  n = n.toString();
  var decimals = n.slice(n.indexOf(".") + 1).length;
  if (n.indexOf(".") == -1) {
    decimals = 0;
    n += ".";
  }
  if (COMMA_DECIMAL_LANG.indexOf(lang) != -1 ||
  (lang == "es" && document["dialect_es"]["d_es"].value == "ES") ||
  (lang == "sa" && ["Bali"].indexOf(document["script_sa"]["s_sa"].value) != -1) )
    n = n.replace(".", ",");
  for (var i = 0; i < places-decimals; i++) n += "0";
  if (["fa"].indexOf(lang) != -1) {
    for (var i = 0; i < URDU_DIGITS.length; i++)
      n = n.replaceAll(new RegExp(""+i,"g"), URDU_DIGITS[i]);
    n = n.replace(".", "٫");
  }
  if (["sa"].indexOf(lang) != -1) {
    for (var i = 0; i < SANSKRIT_DIGITS.length; i++)
      n = n.replaceAll(new RegExp(""+i,"g"), SANSKRIT_DIGITS[i]);
  }
  if (["bn"].indexOf(lang) != -1) {
    for (var i = 0; i < BENGALI_DIGITS.length; i++)
      n = n.replaceAll(new RegExp(""+i,"g"), BENGALI_DIGITS[i]);
  }
  if (RTL_LANG.indexOf(lang) != -1 && num < 0)
    n = n.substring(1) + "-";

  return n;
}

function formatInt(num, nativeDigits=true, upper=false, gender=null, writeNum=true) {
  if (myNaN(num)) {
    if (URDU_DIGIT_LANG.indexOf(lang) != -1)
      return "؟؟؟";
    return "???";
  }
  if (["sa"].indexOf(lang) != -1)
    writeNum = false;
  num = Math.round(num);
  var n = num.toString();
  if (1 <= num && num <= 10 && writeNum == true) {
    n = currentLangData.numbers[num-1];
    if (gender != null && ["es", "pt", "fr"].indexOf(lang) != -1) {
      if (num == 1) {
        n = {"es": ["un", "una"], "pt": ["um", "uma"],
        "fr": ["un", "une"]}[lang][gender];
      } if (num == 2 && lang == "pt") {
        n = "duas";
      }
    }
    if (upper)
      n = n.substring(0, 1).toUpperCase() + n.substring(1);
    return n;
  }
  if (nativeDigits || ["fa", "sa", "bn"].indexOf(lang) != -1) {
    if (DEVANAGARI_DIGIT_LANG.indexOf(lang) != -1) {
      for (var i = 0; i < DEVANAGARI_DIGITS.length; i++)
        n = n.replaceAll(new RegExp(""+i,"g"), DEVANAGARI_DIGITS[i]);
    }
    if (URDU_DIGIT_LANG.indexOf(lang) != -1) {
      if (num == 0 && lang == "ur")
        return "0";
      for (var i = 0; i < URDU_DIGITS.length; i++)
        n = n.replaceAll(new RegExp(""+i,"g"), URDU_DIGITS[i]);
    }
    if (lang == "bn") {
      for (var i = 0; i < BENGALI_DIGITS.length; i++)
        n = n.replaceAll(new RegExp(""+i,"g"), BENGALI_DIGITS[i]);
    }
    if (lang == "sa") {
      for (var i = 0; i < SANSKRIT_DIGITS.length; i++)
        n = n.replaceAll(new RegExp(""+i,"g"), SANSKRIT_DIGITS[i]);
    }
  }
  return n;
}
function symbolInt(num) {
  return formatInt(num, false, false, null, false);
}

function letterGrade(num) {
  if (myNaN(num)) {
    if (URDU_DIGIT_LANG.indexOf(lang) != -1)
      return "؟؟؟";
    return "???";
  }
  num = Math.round(num*100)/100.0;
  if (num >= 96.5) return "A+";
  if (num >= 92.5) return "A";
  if (num >= 89.5) return "A-";
  if (num >= 86.5) return "B+";
  if (num >= 82.5) return "B";
  if (num >= 79.5) return "B-";
  if (num >= 76.5) return "C+";
  if (num >= 72.5) return "C";
  if (num >= 69.5) return "C-";
  if (num >= 66.5) return "D+";
  if (num >= 62.5) return "D";
  if (num >= 59.5) return "D-";
  return "F";
}
function formatGrade(letter) {
  if (RTL_LANG.indexOf(lang) != -1) {
    if (letter.indexOf("+") != -1)
      letter = letter.replace("+", "+&lrm;");
    if (letter.indexOf("-") != -1)
      letter = letter.replace("-", "-&lrm;");
  }
  return letter;
}

function updateCategories() {
  var categoryP = document.getElementById("manualCategory");
  var categoryList = document.getElementById("manualCategories");
  document.getElementById("beginCategories").innerHTML = categories.length > 0 ? "" : currentLangData.begin;
  categoryList.innerHTML = currentLangData.catList;
  let totalPercent = 0;
  var categoryScore = 0;
  var totalScore = 0;
  for (var i = 0; i < categories.length; i++) {
    let newCategory = document.createElement("div");
    categoryList.appendChild(newCategory);
    newCategory.innerHTML = categories[i].name + " (" + categories[i].percentage + "%)";
    newCategory.className = "button";
    newCategory.onclick = function(cat) { return function() {
      currentCategory = cat;
      document.editCategory.percent.value = currentCategory.percentage;
      changeMode("editCategory");
      document.getElementById("editCategoryInfo").innerHTML = langReplace("catAvg", ["$CATEGORY", "$NUMBER"], [currentCategory.name, roundDecimal(currentCategory.score(), 2)]);
      document.getElementById("required_score").innerHTML = "";
      document.getElementById("changedWeight").innerHTML = "";
    }}(categories[i]);
    if (currentCategory != null && categories[i].name == currentCategory.name) {
      newCategory.className = "button selected";
      categoryScore = categories[i].score();
    }
    totalPercent += categories[i].percentage;
    totalScore += categories[i].score()*categories[i].percentage/100.0;
  }
  totalScore /= (totalPercent/100.0);
  categoryP.innerHTML = langReplace("avg", ["$SCORE", "$LETTER", "$GPA", "$SUM"],
    [roundDecimal(totalScore, 2), formatGrade(letterGrade(totalScore)), roundDecimal(totalScore/20.0 - 1, 2), symbolInt(totalPercent)]);
  if (currentCategory == null)
    categoryP.innerHTML += currentLangData.noCat;
  else {
    categoryP.innerHTML += langReplace("selCat", ["$CATEGORY", "$SCORE"], [currentCategory.name, roundDecimal(categoryScore, 2)]);
  }
  if (myNaN(totalScore))
    categoryP.innerHTML += "<br><b>" + currentLangData.scoreNaN + "</b>";
}
function addCatScreen() {
  document.getElementById("catError").innerHTML = "";
  document.category.name.value = "";
  document.category.percent.value = "";
  changeMode("category");
}
function createCategory() {
  var canCreate = true;
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].name == document.category.name.value) {
      canCreate = false;
      break;
    }
  }
  if (canCreate) {
    currentCategory = new Category(document.category.name.value, new Number(document.category.percent.value));
    currentCategory.percentSystem = categories[0].percentSystem;
    document.category.name.value = "";
    document.category.percent.value = "";
    updateCategories();
    changeMode("manual");
  } else {
    document.category.name.value = "";
    document.getElementById("catError").innerHTML = currentLangData.catNameExists;
  }
}
function deleteCategory() {
  var sure = confirm(currentLangData.confirm);
  if (sure) {
    categories.splice(categories.indexOf(currentCategory), 1);
    currentCategory = null;
    updateCategories();
    changeMode("manual");
  }
}
function addAssignment() {
  currentCategory.add(document.editCategory.score.value, document.editCategory.possible.value);
  document.editCategory.score.type = "number";
  document.editCategory.score.value = "";
  document.editCategory.possible.value = "";
  document.getElementById("editCategoryInfo").innerHTML = langReplace("catAvg", ["$CATEGORY", "$NUMBER"], [currentCategory.name, roundDecimal(currentCategory.score(), 2)]);
}
function deleteAssignment() {
  currentCategory.remove(document.editCategory.score.value, document.editCategory.possible.value);
  document.editCategory.score.type = "number";
  document.editCategory.score.value = "";
  document.editCategory.possible.value = "";
  document.getElementById("editCategoryInfo").innerHTML = langReplace("catAvg", ["$CATEGORY", "$NUMBER"], [currentCategory.name, roundDecimal(currentCategory.score(), 2)]);
}
function changePercent() {
  currentCategory.percentage = new Number(document.editCategory.percent.value);
  document.getElementById("changedWeight").innerHTML = langReplace("weightChanged", ["$WEIGHT"], [symbolInt(new Number(document.editCategory.percent.value))]);
}
function findCategories(autoResult) {
  var cats = [];
  for (var i = 0; i < autoResult.length; i++) {
    if (cats.indexOf(autoResult[i][0]) == -1)
      cats.push(autoResult[i][0]);
  }
  cats.sort();
  return cats;
}
if(typeof(String.prototype.trim) === "undefined") {
  String.prototype.trim = function()
  {
      return String(this).replace(/^\s+|\s+$/g, '');
  };
}
if (typeof(Storage) !== "undefined") {
  if (localStorage.gpaData) {
    gpaData = JSON.parse(localStorage.getItem("gpaData"));
    document.getElementById("clearLocalStorage").style.display = "block";
  }
}
var previousInput = "";
var RAMPAL = false;
function auto_filter(el) {
  return el != "" && el != " ";
}
function isNotGrade(g) {
  if (myNaN(makeNumber(g, 100.0))) {
    if (["", " ", "P", "EXC", "EX", "PEND", "NA"].indexOf(g) == -1)
      return true;
    else
      return false;
  } else if (g.toString().indexOf(".") == -1 && ["NTI", "AB", "EX", "EXC", "P", "PEND", "LATE", "NA"].indexOf(g) == -1) {
    return true
  } else {
    return false;
  }
}
function autoGrade(rampal=false) {
  var temp = [];
  var temp2 = [];
  if (rampal) {
    document.getElementById("rampalButton").style.display = "none";
    document.getElementById("rampalmemes").style.display = "flex";
    document.getElementById("rampalExp").style.display = "none";
    lazyLoad("rampal");
    RAMPAL = true;
  } else {
    previousInput = document.getElementById("inputGrades").value;
    document.getElementById("rampalButton").style.display = "block";
    document.getElementById("rampalmemes").style.display = "none";
    document.getElementById("rampalExp").style.display = "";
    RAMPAL = false;
  }
  autoCalc = previousInput.split("\n");
  document.getElementById("inputGrades").value = "";
  while (autoCalc.indexOf("Comment") != -1 || autoCalc.indexOf("Missing Assignment") != -1 || autoCalc[0] == '')
    autoCalc.shift();
  console.log(autoCalc);
  try {
    firstItem = autoCalc[0].trim().split("\t").filter(auto_filter);
    secondItem = autoCalc[1].trim().split("\t").filter(auto_filter);
    console.log(firstItem);
    console.log(secondItem);
    if (firstItem.length <= 2 && secondItem.length >= 3)
      lineSystem = 2;
    else
      lineSystem = 1;
  } catch(err) {
    lineSystem = 2;
  }
  console.log(lineSystem);
  for (var i = lineSystem-1; i < autoCalc.length; i += lineSystem) {
    autoCalc[i] = autoCalc[i].trim();
    let splitArray = autoCalc[i].split("\t");
    if (splitArray.length == 1) splitArray = autoCalc[i].split(" ");
    console.log(splitArray);
    while (isNotGrade(splitArray[1]))
      splitArray.shift();
    console.log(splitArray);
    temp = [];
    temp.push(splitArray[0]);
    temp.push(splitArray[1]);
    temp.push(splitArray[2]);
    temp.push(splitArray[3].slice(0, -1));
    if (["", " ", "P", "EXC", "EX", "PEND", "NA"].indexOf(temp[1]) == -1)
      temp2.push(temp);
    if (["", " ", "P", "PEND", "NA"].indexOf(temp[1]) != -1)
      if (splitArray[3] == "0.00%") temp2.push(temp);
  }
  autoCalc = temp2;
  document.gradesList.innerHTML = "";
  for (var i = 0; i < temp2.length; i++) {
    if (RAMPAL) {
      document.gradesList.innerHTML += temp2[i][0] + ", " +
        temp2[i][1] + "/" + temp2[i][2] + " (Count as <input name=\"" + i + "\" type=\"number\" value=\"1.0\">)<br>";
    } else {
      document.gradesList.innerHTML += temp2[i][0] + ", " +
        temp2[i][1] + "/" + temp2[i][2] + "<br>";
    }
  }
  var findCats = findCategories(autoCalc);
  var foundCatText = langReplace("catsFound", ["$NUMBER", "$CATEGORIES"], [formatInt(findCats.length, true, true, 1),
    wordList(findCats)]);
  if (findCats.length == 1)
    foundCatText = langReplace("catsFound1", ["$CATEGORIES"], [wordList(findCats)]);
  if (["sa"].indexOf(lang) != -1 && findCats.length == 2)
    foundCatText = langReplace("catsFound2", ["$CATEGORIES"], [wordList(findCats)]);
  document.gradesList.innerHTML += foundCatText;
  if (RAMPAL)
    document.gradesList.innerHTML += "<br>" + langReplace("rampalInstruct", ["$IMG1", "$IMG2"],
    ["<img src=\"rampal/rampal1.png\">", "<img src=\"rampal/rampal2.png\">"]);
  changeMode("finalAuto");
}
/* document.getElementById("inputGrades").addEventListener('paste', (event) => {setTimeout(function() {
  autoGrade();
  window.scrollBy(0, -300);
}, 5)}); */

function autoCats() {
  var form = document.autoCategories;
  var cats = findCategories(autoCalc);
  form.innerHTML = "";
  for (var i = 0; i < cats.length; i++) {
    form.innerHTML += cats[i] + ": <span dir=\"ltr\"><input name='" + i + "' type='number'></input>%</span><br>";
  }
  form.innerHTML += '<input type="checkbox" name="point"></input> ' + currentLangData.pointCheck + '<br>'
  form.innerHTML += '<input type="checkbox" name="percent"></input> ' + currentLangData.percentCheck + '<br>';
  form.innerHTML += '<br><div class="button" onclick="autoCalc2();" id="continueClass">' + currentLangData.next + '</div>';
  if (RAMPAL) {
    form.point.checked = false;
    form.percent.checked = false;
  }
  window.scrollBy(0, -300);
}
function categoryByName(name) {
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].name == name) return categories[i];
  }
  return null;
}
function autoCalc2() {
  var cats = findCategories(autoCalc);
  categories = [];
  if (document.autoCategories.point.checked) {
    currentCategory = new Category("Total", 100, document.autoCategories.percent.checked);
    for (var i = 0; i < autoCalc.length; i++) {
      categories[0].add(autoCalc[i][1], autoCalc[i][2]);
    }
  } else {
    for (var i = 0; i < cats.length; i++) {
      new Category(cats[i], new Number(document.autoCategories[new Number(i).toString()].value), document.autoCategories.percent.checked);
    }
    var countAs = 1.0;
    for (var i = 0; i < autoCalc.length; i++) {
      if (RAMPAL) countAs = new Number(document.gradesList[i].value);
      else countAs = 1.0;
      if (document.autoCategories.percent.checked) {
        if (autoCalc[i][3] == '')
          categoryByName(autoCalc[i][0]).add(autoCalc[i][1], 100, countAs);
        else
          categoryByName(autoCalc[i][0]).add(autoCalc[i][3], 100, countAs);
      } else {
        categoryByName(autoCalc[i][0]).add(autoCalc[i][1], autoCalc[i][2], countAs);
      }
    }
    currentCategory = null;
  }
  updateCategories();
  changeMode("manual");
  document.getElementById("manualInput").style.display = "block";
  document.getElementById("manualInput").innerHTML = currentLangData.edit;
  document.getElementById("autoCalculation").innerHTML = currentLangData.newClass;
  document.getElementById("classmeme").innerHTML = "";
  document.classes.search.value = "";
  classSearch();
  window.scrollBy(0, -300);
}
var classes = {
  "ap lang": [["h", "q", "t"], [0, 20, 30, 50]],
  "ap chem": [["h", "l", "q", "t"], [0, 10, 25, 15, 50]],
  "spanish 4": [["f", "pe", "po"], [0, 25, 35, 40]],
  "research": [[], [1]],
  "precalc": [[], [1]],
  "mandarin 3": [["h", "p", "q", "t"], [0, 10, 30, 25, 35]],
  "stats": [["f", "s", "t"], [0, 5, 25, 70]],
  "java hh": [["a", "h", "p", "t"], [0, 25, 20, 20, 35]],
  "ap macro": [["f", "t", "h", "p"], [0, 30, 45, 15, 10]],
  "american history": [["h", "p", "q", "t"], [0, 20, 10, 30, 40]],
  "apush": [["c", "f", "q", "t"], [0, 20, 20, 20, 40]],
  "english 2": [["c", "l", "w"], [0, 30, 35, 35]],
  "english 3 cp": [["c", "l", "s", "w"], [0, 25, 35, 5, 35]],
  "calc": [["h", "t"], [0, 10, 90]],
  "calc ab": [["h", "t"], [0, 15, 85]],
  "ap lit": [["c", "q", "t"], [0, 15, 35, 50]],
  "ap gov": [["h", "f", "q", "t"], [0, 10, 25, 20, 45]],
  "ap comparative": [["c", "q", "t", "f", "p"], [0, 10, 20, 40, 20, 10]],
  "ap world": [["e", "h", "q", "t"], [0, 15, 20, 25, 40]],
  "stats adv": [["a", "g", "m", "t"], [0, 2, 20, 18, 60]],
  "intro code": [["h", "q", "t", "p"], [0, 20, 20, 30, 30]],
  "chem q3": [["h", "l", "q", "s", "t"], [0, 10, 35, 15, 20, 20]],
  "spanish 3": [["h", "p", "q", "t"], [0, 10, 30, 25, 35]],
  "principles": [["c", "t", "w"], [0, 50, 20, 30]],
  "english 1": [["c", "l", "s", "w"], [0, 25, 35, 5, 35]],
  "ap human": [["h", "p", "q", "t"], [0, 10, 20, 30, 40]],
  "ap psych": [["h", "p", "q", "t"], [0, 25, 10, 25, 40]],
  "precalc adv": [["h", "t", "s"], [0, 20, 75, 5]],
  "physics c": [["c", "l", "t"], [0, 10, 25, 65]],
  "honors gov": [["h", "q", "t", "p"], [0, 20, 30, 40, 10]],
  "ap mandarin": [["i", "q", "p"], [0, 20, 35, 45]],
  "honors econ": [["h", "q", "t", "d"], [0, 20, 25, 40, 15]],
  "english 4 h": [["c", "l", "w"], [0, 20, 40, 40]],
  "stats h": [["g", "s", "t"], [0, 5, 25, 70]],
  "sociology": [["h", "p", "t", "q"], [0, 25, 10, 40, 25]],
  "alg 2": [["c", "h", "q", "t"], [0, 15, 15, 30, 40]],
  "alg 2 comp": [["h", "q", "t"], [0, 10, 30, 60]],
  "alg 2 adv": [["a", "c", "h"], [0, 65, 15, 20]],
  "spanish lit": [["f", "q", "e"], [0, 25, 35, 40]],
  "world": [["h", "q", "t"], [0, 20, 25, 40]],
  "pre alg": [["a", "q", "t"], [0, 30, 30, 40]],
  "apcsa": [["h", "t"], [0, 15, 85]],
  "env health": [["q", "t", "l", "h", "c"], [0, 15, 40, 30, 5, 10]],
  "alg 1": [["a", "q", "t"], [0, 20, 30, 45]],
  "physics 1": [["q", "t", "h", "l"], [2, 15, 55, 10, 20]],
  "college alg": [[], [1]],
  "bio h": [["h", "l", "p", "q", "t"], [2, 10, 20, 10, 15, 45]],
  "calc adv": [["h", "t"], [0, 35, 65]],
  "english 3 h": [["h", "l", "w"], [0, 30, 35, 35]],
  "lit 8": [[], [1]],
  "alg 1 comp": [["c", "h", "q"], [0, 15, 15, 70]],
  "spanish 1": [["f", "p", "s"], [0, 25, 40, 35]]

};
function setclass() {
  var classVal = document.classes.class.value;
  if (classVal == "add class") {
    document.classes.class.value = "";
    document.add_class["cats"].value = findCategories(autoCalc);
    changeMode('addClass');
  } else {
    var catLetters = classes[classVal][0];
    var catData = classes[classVal][1];
    var classCats = findCategories(autoCalc);
    var meme = document.getElementById("classmeme");
    document.autoCategories.point.checked = (catData[0] == 1);
    document.autoCategories.percent.checked = (catData[0] == 2);
    for (var i = 0; i < catLetters.length; i++) {
      try {
        for (var j = 0; j < classCats.length; j++) {
          if (classCats[j].toLowerCase().startsWith(catLetters[i]))
            document.autoCategories[j].value = catData[i+1];
        }
      } catch (err) {}
    }
    if (classVal == "spanish 4" || classVal == "spanish lit") {
      var date = new Date();
      meme.innerHTML = "¡HOY ES EL " +
        ["PRIMERO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ",
        "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO",
        "DIECINUEVE", "VEINTE", "VEINTIUNO", "VEINTIDÓS", "VEINTITRES", "VEINTICUATRO",
        "VEINTICINCO", "VEINTISÉIS", "VEINTISIETE", "VEINTIOCHO", "VEINTINUEVE", "TREINTA",
        "TREINTA Y UNO"][date.getDate() - 1] +
        " DE " + ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO",
        "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"][date.getMonth()] + " DE "
        + date.getFullYear() + "!<br>¡No olvides escribir tu nombre y la fecha!<br>";
      if (lang == "es") {
        meme.innerHTML += "¡Me alegra <em>mucho</em> de que estés usando español!"
      } else {
        meme.innerHTML += "¿¿¿Oigo inglés??? " +
        "Es importante que practiques tu español. Por eso estoy cambiando tu idioma.";
        changeLanguage("es");
      }
    } else if (classVal == "ap world") {
      meme.innerHTML = "Clear your desks, please.<br>Say &ldquo;la vie!&rdquo;";
    } else if (classVal == "physics c") {
      meme.innerHTML = "<ol><li>Lab</li><li>Be Happy</li></ol>";
    } else {
      meme.innerHTML = "";
    }
    switch(catData[0]) {
      case 1:
        langHTML("classError", "setPoint");
        break;
      case 2:
        langHTML("classError", "setPercent");
        break;
      default:
        document.getElementById("classError").innerHTML = "";
    }
    document.classes.class.value = "";
  }
}
function calculateSemester() {
  var target = new Number(document.semester.target.value);
  var q1 = new Number(document.semester.q1.value);
  var q2 = new Number(document.semester.q2.value);
  var grade = q1*0.4 + q2*0.4;
  var exam = 0;
  var required = -1;
  var grades = [61.5, 65, 68.5,
                71.5, 75, 78.5,
                81.5, 85, 88.5,
                91.5, 95, 98.5];
  var min = [59.5, 62.5, 66.5,
             69.5, 72.5, 76.5,
             79.5, 82.5, 86.5,
             89.5, 92.5, 96.5];
  if (grade + 59.5*0.2 <= target) {
    for (var i = 0; i < 12; i++) {
      exam = grades[i];
      if (grade + exam*0.2 >= target) {
        required = i;
        break;
      }
    }
  }
  var gradeDisplay = document.getElementById("semesterGrade");
  if (required == -1) {
    required = (target - grade)/0.2;
    if (required < 0)
      required = 0;
    if (required > 98.5)
      gradeDisplay.innerHTML = currentLangData.notPossibleGrade;
    else
      gradeDisplay.innerHTML = langReplace("fritzExam", ["$MIN"], [roundDecimal(required, 1)]);
  } else {
    gradeDisplay.innerHTML = langReplace("minGrade", ["$MIN", "$LETTER", "$NUMBER"], [roundDecimal(min[required], 2),
    formatGrade(letterGrade(grades[required])), roundDecimal(grades[required], 2)]);
  }
}
function mailSent() {
  if (document.add_class["class"].value == "" ||
    document.add_class["cats"].value == "" ||
    document.add_class["weights"].value == "") {
      document.getElementById("mail_sent").innerHTML = currentLangData.validData;
  } else {
    document.getElementById("mail_sent").innerHTML = langReplace("mailSent", ["$EMAIL"],
    ['<a href="mailto:'+MY_EMAIL+'?subject=Class list issue">'+MY_EMAIL+'</a>']);
    document.add_class.style.display = "none";
    document.classes.class.remove(1);
  }
}
function calculateExam() {
  var q1 = new Number(document.exam.q1.value);
  var q2 = new Number(document.exam.q2.value);
  var grade;
  if (document.exam.exam.value == "N/A") {
    grade = q1*0.5 + q2*0.5;
  } else {
    var exam = new Number(document.exam.exam.value);
    grade = q1*0.4 + q2*0.4 + exam*0.2;
  }
  var gradeDisplay = document.getElementById("examGrade");
  gradeDisplay.innerHTML = langReplace("semGrade", ["$LETTER", "$NUMBER"], [formatGrade(letterGrade(grade)), roundDecimal(grade, 2)]);
}
function updateGpa() {
  var g = document.getElementById("gpaData");
  g.innerHTML = "";
  var weighted = document.addCredit.weights.value == "weighted";
  var fivescale = document.addCredit.weights.value == "fivescale";
  totalGpa = 0.0;
  totalCredits = 0.0;
  for (var i = 0; i < gpaData.length; i++) {
    let gpa = {"A+": 13,
      "A": 12,
      "A-": 11,
      "B+": 10,
      "B": 9,
      "B-": 8,
      "C+": 7,
      "C": 6,
      "C-": 5,
      "D+": 4,
      "D": 3,
      "D-": 2,
      "F": 0
    }[gpaData[i][0]];
    if (weighted) {
      gpa += {"AP": 7.0, "H": 4.0, "CP": 1.0}[gpaData[i][1]];
    } else {
      if (gpa == 13)
        gpa = 12;
      if (gpa < 3)
        gpa = 0;
      else if (fivescale)
        gpa += {"AP": 3.0, "H": 1.5, "CP": 0.0}[gpaData[i][1]];
    }
    gpa /= 3.0;
    totalGpa += (Math.round(gpa*100)/100.0)*gpaData[i][2];
    totalCredits += gpaData[i][2];
    g.innerHTML += langReplace("gpaClass", ["$INDEX", "$GPA", "$GRADE", "$LEVEL", "$CREDITS"],
      [i+1, roundDecimal(gpa, 2), formatGrade(gpaData[i][0]), gpaData[i][1], roundDecimal(gpaData[i][2], 2)]) + "<br>";
  }
  g.innerHTML += langReplace("gpaSum", ["$SUM", "$CREDITS", "$GPA"],
    [roundDecimal(totalGpa, 2), roundDecimal(totalCredits, 2), roundDecimal(totalGpa/totalCredits, 4)]);
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("gpaData", JSON.stringify(gpaData));
    document.getElementById("clearLocalStorage").style.display = "block";
  }
}
function addGpaUnit() {
  f = document.addCredit;
  gpaData.push(new Array(f.letterGrade.value, f.classType.value, new Number(f.numCredits.value)));
  updateGpa();
}
function creditInfo() {
  i = new Number(document.modifyCredit.creditNum.value) - 1;
  document.modifyCredit.letterGrade.value = gpaData[i][0];
  document.modifyCredit.classType.value = gpaData[i][1];
  document.modifyCredit.numCredits.value = gpaData[i][2];
  document.getElementById("creditInfo").style.display = "block";
  document.getElementById("getCreditButton").style.display = "none";
}
function hideCreditInfo() {
  document.getElementById("creditInfo").style.display = "none";
  document.getElementById("getCreditButton").style.display = "block";
}
function editCredit() {
  i = new Number(document.modifyCredit.creditNum.value) - 1;
  document.modifyCredit.creditNum.value = "";
  gpaData[i][0] = document.modifyCredit.letterGrade.value;
  gpaData[i][1] = document.modifyCredit.classType.value;
  gpaData[i][2] = new Number(document.modifyCredit.numCredits.value);
  hideCreditInfo();
  updateGpa();
}
function deleteCredit() {
  i = new Number(document.modifyCredit.creditNum.value) - 1;
  document.modifyCredit.creditNum.value = "";
  gpaData.splice(i, 1);
  hideCreditInfo();
  updateGpa();
}
function addLetterGrade() {
  document.editCategory.score.type = "text";
  document.editCategory.score.value = document.editCategory["letter"].value;
  document.editCategory["letter"].value = "";
}
function clearGpa() {
  var sure = confirm(currentLangData.confirm);
  if (sure) {
    localStorage.clear();
    document.getElementById("clearLocalStorage").style.display = "none";
    gpaData = [];
    updateGpa();
  }
}
function totalClassScore() {
  var totalScore = 0;
  let totalPercent = 0;
  for (var i = 0; i < categories.length; i++) {
    totalPercent += categories[i].percentage;
    totalScore += categories[i].score()*categories[i].percentage/100.0;
  }
  totalScore /= (totalPercent/100.0);
  return totalScore;
}
function calcRequired() {
  var initial_score = [currentCategory.total, currentCategory.possible];
  var req_grade = new Number(document.editCategory.keepGrade.value);
  var worthPoints = currentCategory.percentSystem ? 100 : new Number(document.editCategory.worthPoints.value);
  let totalPercent = 0;
  for (var i = 0; i < categories.length; i++)
    totalPercent += categories[i].percentage;
  currentCategory.possible += worthPoints;
  var increase = req_grade - totalClassScore();
  var category_increase = increase / (currentCategory.percentage / totalPercent * 100);
  var category_increase_pts = category_increase * currentCategory.possible;
  if (worthPoints == 0) {
    document.getElementById("required_score").innerHTML = langReplace("reqScore_0",
      ["$PTS", "$TOT", "$GRADE"], [roundDecimal(category_increase_pts, 2), roundDecimal(worthPoints, 2),
      roundDecimal(req_grade, 2)]);
  } else {
    document.getElementById("required_score").innerHTML = langReplace("reqScore",
      ["$PTS", "$TOT", "$GRADE", "$PERCENT"], [roundDecimal(category_increase_pts, 2), roundDecimal(worthPoints, 2),
      roundDecimal(req_grade, 2), roundDecimal(category_increase_pts*100.0/worthPoints, 2)]);
  }
  currentCategory.total = initial_score[0];
  currentCategory.possible = initial_score[1];
}
function manualButton() {
  changeMode("manual");
  document.getElementById("manualInput").style.display = "block";
  document.getElementById("manualInput").innerHTML = currentLangData.edit;
  document.getElementById("autoCalculation").innerHTML = currentLangData.newClass;
}

function dayNightTheme() {
  var hour = new Date().getHours();
  if (hour <= 6 || hour >= 21) {
    document.write("<link rel='stylesheet' href='night.css'>")
  }
}
dayNightTheme();

function classSearch() {
  var opt = document.classes.class_hidden.options;
  var sel = document.classes.class;
  var s = document.classes.search.value.toUpperCase();
  for (var i = sel.options.length-1; i >= 2; i--)
    sel.remove(i);
  if (s == "") {
    for (var i = 0; i < opt.length; i++) {
      sel.add(opt[i].cloneNode());
      sel.options[sel.options.length-1].innerHTML = opt[i].innerHTML;
    }
  } else {
    for (var i = 0; i < opt.length; i++) {
      if (opt[i].innerHTML.toUpperCase().indexOf(s) != -1 ||
      (opt[i].getAttribute("data-alt") != undefined && opt[i].getAttribute("data-alt").toUpperCase().indexOf(s) != -1)) {
        sel.add(opt[i].cloneNode());
        sel.options[sel.options.length-1].innerHTML = opt[i].innerHTML;
      }
    }
  }
  sel.selectedIndex = 0;
}
classSearch();

function letterNeeded() {
  document.editCategory.keepGrade.value = document.editCategory.letter2.value;
  if (document.editCategory.worthPoints.value != 0)
    calcRequired();
  document.editCategory.letter2.value = "";
}
function myNaN(n) {
  return (isNaN(n) || n === Infinity);
}