var mode = "start";
var categories = [];
var currentCategory = null;
var divs = document.getElementsByClassName("main");
var autoCalc = [];
var semesters = [];
var gpaData = [];
function changeMode(mode) {
  for (var i = 0; i < divs.length; i++) {
    if (divs[i].id != mode)
      divs[i].style.display = "none";
    else
      divs[i].style.display = "block";
  }
  if (mode == "start") {
    document.getElementById("topInfo").style.display = "block";
    document.getElementById("sitename").innerHTML = "AHS* Grade Calculator";
  } else {
    document.getElementById("topInfo").style.display = "none";
    document.getElementById("sitename").innerHTML = "AHS Grade Calculator";
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
    case "NTI": grade = 0; break;
    case "LATE": grade = 50; break;
    case "AB": grade = 0; break;
    default: return new Number(grade);
  }
  return new Number(grade*possible/100.0);
}
class Category {
  constructor(name, percentage) {
    this.name = name;
    this.percentage = percentage;
    this.total = 0.0;
    this.possible = 0.0;
    categories.push(this);
  }
  add(total, possible, countAs=1.0) {
    this.total += makeNumber(total, possible)*countAs;
    this.possible += makeNumber(possible)*countAs;
  }
  remove (total, possible) {
    this.total -= makeNumber(total, possible);
    this.possible -= makeNumber(possible);
  }
  score() {
    return (this.total/this.possible)*100.0;
  }
}
function roundDecimal(num, places) {
  if (isNaN(num)) return "ERROR";
  var n = Math.round(num*Math.pow(10.0, places))/Math.pow(10.0, places);
  n = n.toString();
  var decimals = n.slice(n.indexOf(".") + 1).length;
  if (n.indexOf(".") == -1) {
    decimals = 0;
    n += ".";
  }
  for (var i = 0; i < places-decimals; i++) n += "0";
  return n;
}
function letterGrade(num) {
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
function updateCategories() {
  var categoryP = document.getElementById("manualCategory");
  var categoryList = document.getElementById("manualCategories");
  document.getElementById("beginCategories").innerHTML = categories.length > 0 ? "" :
    "Begin by creating categories for grades. If the class is based on point system, make a category called something like \"Total\" and consider it 100% of your grade.";
  categoryList.innerHTML = "<strong>Click a category</strong> to add or remove assignments and to see that category's score.<br><br>Categories:<br>";
  var totalPercent = 0;
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
      document.getElementById("editCategoryInfo").innerHTML = "Average in " + currentCategory.name +
        ": " + roundDecimal(currentCategory.score(), 2) + "%";
    }}(categories[i]);
    if (currentCategory != null && categories[i].name == currentCategory.name) {
      newCategory.className = "button selected";
      categoryScore = categories[i].score();
    }
    totalPercent += categories[i].percentage;
    totalScore += categories[i].score()*categories[i].percentage/100.0;
  }
  totalScore /= (totalPercent/100.0);
  categoryP.innerHTML = "Score so far in this class: " + roundDecimal(totalScore, 2) + "% (Letter grade: " + letterGrade(totalScore) + ")<br>" +
    "Unweighted GPA: " + roundDecimal(totalScore/20.0 - 1, 2) +
    "<br>Sum of all categories: " + Math.round(totalPercent) + "% (Should be 100%)<br>";
  if (currentCategory == null)
    categoryP.innerHTML += "No category is currently selected";
  else {
    categoryP.innerHTML += "Score so far in " + currentCategory.name + ": " + roundDecimal(categoryScore, 2) + "%";
  }
  if (isNaN(totalScore))
    categoryP.innerHTML += "<br><b>You have a denominator of zero or another error in at least one category." +
      " Try adding some assignments.</b>";
}
function createCategory() {
  currentCategory = new Category(document.category.name.value, new Number(document.category.percent.value));
  document.category.name.value = "";
  document.category.percent.value = "";
  updateCategories();
  changeMode("manual");
}
function addAssignment() {
  currentCategory.add(document.editCategory.score.value, document.editCategory.possible.value);
  document.editCategory.score.type = "number";
  document.editCategory.score.value = "";
  document.editCategory.possible.value = "";
  document.getElementById("editCategoryInfo").innerHTML = "Average in " + currentCategory.name +
    ": " + roundDecimal(currentCategory.score(), 2) + "%";
}
function deleteAssignment() {
  currentCategory.remove(document.editCategory.score.value, document.editCategory.possible.value);
  document.editCategory.score.type = "number";
  document.editCategory.score.value = "";
  document.editCategory.possible.value = "";
  document.getElementById("editCategoryInfo").innerHTML = "Average in " + currentCategory.name +
    ": " + roundDecimal(currentCategory.score(), 2) + "%";
}
function changePercent() {
  currentCategory.percentage = new Number(document.editCategory.percent.value);
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
    updateGpa();
    document.getElementById("clearLocalStorage").style.display = "block";
  }
}
var previousInput = "";
var RAMPAL = false;
function auto_filter(el) {
  return el != "" && el != " ";
}
function isNotGrade(g) {
  if (isNaN(makeNumber(g, 100.0))) {
    if (["", " ", "P", "EXC", "EX"].indexOf(g) == -1)
      return true;
    else
      return false;
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
    RAMPAL = true;
  } else {
    previousInput = document.getElementById("inputGrades").value;
    document.getElementById("rampalButton").style.display = "block";
    document.getElementById("rampalmemes").style.display = "none";
    RAMPAL = false;
  }
  autoCalc = previousInput.split("\n");
  document.getElementById("inputGrades").value = "";
  while (autoCalc.indexOf("Comment") != -1 || autoCalc.indexOf("Missing Assignment") != -1)
    autoCalc.shift();
  try {
    firstItem = autoCalc[0].trim().split("\t").filter(auto_filter);
    secondItem = autoCalc[1].trim().split("\t").filter(auto_filter);
    if (firstItem.length <= 2 && secondItem.length >= 3)
      lineSystem = 2;
    else
      lineSystem = 1;
  } catch(err) {
    lineSystem = 2;
  }
  for (var i = lineSystem-1; i < autoCalc.length; i += lineSystem) {
    autoCalc[i] = autoCalc[i].trim();
    let splitArray = autoCalc[i].split("\t");
    while (isNotGrade(splitArray[1]))
      splitArray.shift();
    temp = [];
    temp.push(splitArray[0]);
    temp.push(splitArray[1]);
    temp.push(splitArray[2]);
    if (["", " ", "P", "EXC", "EX"].indexOf(temp[1]) == -1)
      temp2.push(temp);
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
  document.gradesList.innerHTML += "<br>" + findCategories(autoCalc).length +
    " categories found: ";
  document.gradesList.innerHTML += findCategories(autoCalc);
  if (RAMPAL) {
    document.gradesList.innerHTML += "<br><br><b>Do the following for <em>each</em> assignment:</b><br>Click on the assignment<br>" +
      "<img src=\"rampal/rampal1.png\"><br><img src=\"rampal/rampal2.png\"><br>Look at the <strong>\"Count as\"</strong> and enter it above";
  }
  changeMode("finalAuto");
}
function autoCats() {
  var form = document.autoCategories;
  var cats = findCategories(autoCalc);
  form.innerHTML = "";
  for (var i = 0; i < cats.length; i++) {
    form.innerHTML += cats[i] + ": <input name='" + i + "' type='number'></input>%<br>";
  }
  form.innerHTML += '<input type="checkbox" name="point"></input> This class is point system<br>'
  form.innerHTML += '<br><div class="button" onclick="autoCalc2();" id="continueClass">Next</div>';
  if (RAMPAL) {
    form.point.checked = false;
    if (cats.length == 2) {
      form[0].value = 10;
      form[1].value = 90;
    } if (cats.length == 3) {
      form[0].value = 10;
      form[1].value = 10;
      form[2].value = 80;
    }
  }
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
    currentCategory = new Category("Total", 100);
    for (var i = 0; i < autoCalc.length; i++) {
      categories[0].add(autoCalc[i][1], autoCalc[i][2]);
    }
  } else {
    for (var i = 0; i < cats.length; i++) {
      new Category(cats[i], new Number(document.autoCategories[new Number(i).toString()].value));
    }
    var countAs = 1.0;
    for (var i = 0; i < autoCalc.length; i++) {
      if (RAMPAL) countAs = new Number(document.gradesList[i].value);
      else countAs = 1.0;
      categoryByName(autoCalc[i][0]).add(autoCalc[i][1], autoCalc[i][2], countAs);
    }
    currentCategory = null;
  }
  updateCategories();
  changeMode("manual");
  document.getElementById("manualInput").style.display = "block";
  document.getElementById("manualInput").innerHTML = "Edit grades";
  document.getElementById("autoCalculation").innerHTML = "New class (automatic)";
}
var classes = {
  "ap lang brown": [["h", "m", "q", "t"], [false, 20, 5, 25, 50]],
  "ap lang meyer": [["a", "g", "q", "t"], [false, 5, 20, 25, 50]],
  "ap chem": [["h", "l", "q", "t"], [false, 10, 25, 15, 50]],
  "ap bio": [[], [true]],
  "ap enviro": [[], [true]],
  "ap physics 1": [[], [true]],
  "spanish 4": [["h", "p", "q", "t"], [false, 10, 30, 25, 35]],
  "research": [[], [true]],
  "precalc": [[], [true]],
  "mandarin 3": [["h", "p", "q", "t"], [false, 10, 30, 25, 35]],
  "stats": [["f", "m", "s", "t"], [false, 18, 20, 2, 60]],
  "alice": [["a", "h", "ta", "te"], [false, 25, 20, 20, 35]],
  "ap macro": [["h", "p", "q", "t"], [false, 20, 10, 30, 40]],
  "apush": [["c", "f", "q", "t"], [false, 20, 20, 20, 40]],
  "english 2": [["c", "l", "s", "w"], [false, 25, 35, 5, 35]],
  "english 3 cp": [["c", "l", "s", "w"], [false, 25, 35, 5, 35]],
  "calc": [["h", "t"], [false, 10, 90]]
};
function setclass() {
  if (document.classes.class.value == "add class") {
    document.classes.class.value = "";
    document.add_class["entry.1953535029"].value = findCategories(autoCalc);
    changeMode('addClass');
  } else {
    var catLetters = classes[document.classes.class.value][0];
    var catData = classes[document.classes.class.value][1];
    var classCats = findCategories(autoCalc);
    document.autoCategories.point.checked = catData[0];
    for (var i = 0; i < catLetters.length; i++) {
      try {
        for (var j = 0; j < classCats.length; j++) {
          if (classCats[j].toLowerCase().startsWith(catLetters[i]))
            document.autoCategories[j].value = catData[i+1];
        }
      } catch (err) {}
    }
    if (document.classes.class.value == "spanish 4") {
      date = new Date();
      document.getElementById("hoyesel").innerHTML = "HOY ES EL " +
        ["PRIMERO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ",
        "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISÉIS", "DIECISIETE", "DIECIOCHO",
        "DIECINUEVE", "VEINTE", "VEINTIUNO", "VEINTIDÓS", "VEINTITRES", "VEINTICUATRO",
        "VEINTICINCO", "VEINTISÉIS", "VEINTISIETE", "VEINTIOCHO", "VEINTINUEVE", "TREINTA",
        "TREINTA Y UNO"][date.getDate() - 1] +
        " DE " + ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO",
        "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"][date.getMonth()] + " DE "
        + date.getFullYear() + "!!!!!";
    } else {
      document.getElementById("hoyesel").innerHTML = "";
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
  for (var i = 0; i < 12; i++) {
    exam = grades[i];
    if (grade + exam*0.2 >= target) {
      required = i;
      break;
    }
  }
  var gradeDisplay = document.getElementById("semesterGrade");
  if (required == -1)
    gradeDisplay.innerHTML = "Unfortunately this grade is not possible for you this semester. Good luck for next semester!";
  else
    gradeDisplay.innerHTML = "Minimum grade required on semester exam: " + min[required] + "% (goes in as " + letterGrade(grades[required]) +
      "/" + grades[required] + "%)";
  var fail = -1;
  for (var i = 59; i >= 0; i--) {
    if (grade + i*0.2 >= target)
      fail = i;
  }
  if (fail != -1)
    gradeDisplay.innerHTML = "Minimum grade required on semester exam: " + fail + "% (I hope you don't Fritz the exam that badly)";
}
function mailSent() {
  if (document.add_class["entry.1399913855"].value == "" ||
    document.add_class["entry.1953535029"].value == "" ||
    document.add_class["entry.1262923778"].value == "")
      document.getElementById("mail_sent").innerHTML = "Please enter valid data.";
  else {
    document.getElementById("mail_sent").innerHTML = "Your response was sent and the class should be available shortly. Thank you!" +
      "<br>For now, go back and enter weightings manually.";
    document.add_class.style.display = "none";
    document.classes.class.remove(1);
  }
}
function calculateExam() {
  var exam = new Number(document.exam.exam.value);
  var q1 = new Number(document.exam.q1.value);
  var q2 = new Number(document.exam.q2.value);
  var grade = q1*0.4 + q2*0.4 + exam*0.2;
  var gradeDisplay = document.getElementById("examGrade");
  examGrade.innerHTML = "Grade for the semester: " + letterGrade(grade) + " (" + roundDecimal(grade, 2) + ")"
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
    g.innerHTML += "" + (i+1) + ": " + roundDecimal(gpa, 2) + " (" +
      gpaData[i][0] + ", " + gpaData[i][1] + ", " + gpaData[i][2] + " credits)<br>";
  }
  g.innerHTML += "<b>GPA sum: " + roundDecimal(totalGpa, 2) + "<br>Total credits: " + roundDecimal(totalCredits, 1) +
   "<br>Cumulative GPA: " + roundDecimal(totalGpa/totalCredits, 4) + "</b>";
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
  localStorage.clear();
  document.getElementById("clearLocalStorage").style.display = "none";
}