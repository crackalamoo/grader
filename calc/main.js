var screentxt = "";
var buttons = document.getElementsByClassName("button");
var cursor = 0;
var memselect = -1;
var mathprint = true;
var clearWithButton = false;
var closebrackets = [")", "]", "}", "Ä"];
var openbrackets = ["(", "[", "{", "Ä"];
var operations = ["+", "-", "*", "/", "^", "!", "ÿ"];
var functions = ["ì", "ç", "à", "ł", "ù", "Ł", "Ì", "Ç", "À", "Ù", "¯", "¸"];
var variables = ["¡", "¤", "¢", "£", "¥", "«", "®", "Þ", "θ", "¶", "ñ", "¿"];
var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var automult = functions.concat(variables).concat(["è", "π"]).concat(["\\(", "\\{", "\\[", "Â"]);
var doublefunctions = ["^", "á", "©", "¦"];
var anglemode = 1;
var memDivs = [];
document.mode.angle.value = anglemode;
var notation = 0;
var logbase = 10;
document.mode.notation.value = notation;
var mem = [];
var commandmem = [];
var screenview = 0; /* 0: normal, 1: mode, 2: program, 3: choose function */
var buttonmode;
var debugmode = false;
const BIG_NUM = math.pow(10, 309);
const CMND_DEF = "\\newcommand{\\floor}[1]{\\left\\lfloor #1 \\right\\rfloor} \\newcommand{\\ceil}[1]{\\left\\lceil #1 \\right\\rceil}";
var functxt = "";
switchbutton(0);
function writescreen(str, add=true, render=true, mem=true) {
  if (screenview == 0) {
    if (str != "")
      memselect = -1;
    if (!add || clearWithButton) {
      screentxt = "";
      cursor = 0;
      clearWithButton = false;
    }
    if (add) {
      document.getElementById("ans").style.textAlign = "";
    }
    if (screentxt.length == 0 && mem) {
      updateMem();
    }
    if (add && screentxt.length == 0 && (operations.indexOf(str[0]) != -1 || str == ">")) {
      screentxt = "Å";
      cursor = 1;
    }
    screentxt = writemath(document.getElementById("ans"), screentxt, str, add, render)
    if (render) {
      document.getElementById("screen").scrollTop = document.getElementById("screen").scrollHeight;
      document.getElementById("screen").scrollLeft = document.getElementById("ans").scrollWidth;
      switchbutton(0);
    }
  }
}
function writefunc(str, add=true, render=true) {
  functxt = writemath(document.getElementById("func"), functxt, str, add, render);
}
// ans, screentxt, str...
function writemath(div, txt, write, add=true, render=true) {
  txt = txt.slice(0, cursor) + write + txt.slice(cursor);
  if (render) {
    cursor += write.length;
    let txt2 = txt;
    if (cursor == txt.length && add) {
      txt2 += " \\_ ";
    } else {
      if (closebrackets.indexOf(txt[cursor]) == -1 && openbrackets.indexOf(txt[cursor]) == -1) {
        txt2 = txt.slice(0, cursor) + " \\underline{ " + txt.slice(cursor, cursor+1) + "}" +
          txt.slice(cursor+1);
      } else {
        txt2 = txt.slice(0, cursor) + " ß " +
          txt.slice(cursor);
      }
    }
    txt2 = txt2.replace(/{}á{}/g, "{ß}á{ß}");
    div.innerHTML = "\\(" + CMND_DEF + to_latex(txt2) + "\\)";
    updateMath();
  }
  return txt;
}
function negbutton() {
  writescreen('-', true, false);
  if (screentxt.length == 2 && screentxt[0] == "Å") {
    screentxt = screentxt[1];
    cursor = 1;
  } else {
    cursor++;
  }
  writescreen('');
}
function updateMem(lastmem=true) {
  document.getElementById("membuffer").style.display = "";
  let membox = document.getElementById("mem");
  membox.innerHTML = "";
  let shift = 1;
  if (lastmem) shift = 0;
  for (var i = 0; i < mem.length-shift; i++) {
    membox.innerHTML += "<div class='commandMem'>\\( " + CMND_DEF + to_latex(commandmem[i]) + "\\)</div>";
    membox.innerHTML += "<div>\\( " + mem[i] + "\\)</div>";
  }
  if (commandmem.length > mem.length-shift && mem.length-shift > -1) {
    for (var i = mem.length-shift; i < commandmem.length; i++) {
      membox.innerHTML += "<div class='commandMem'>\\( " + CMND_DEF + to_latex(commandmem[i]) + "\\)</div>";
    }
  }
  let allDivs = document.getElementsByTagName("div");
  memDivs = [];
  for (var i = 0; i < allDivs.length; i++) {
    if (membox.contains(allDivs[i]) && membox != allDivs[i])
      memDivs.push(allDivs[i]);
  }
  if (memselect >= 0 && memselect < memDivs.length)
    memDivs[memselect].className += " highlight";
  document.getElementById("screen").scrollTop = document.getElementById("screen").scrollHeight;
}
function updateMath() {
  renderMathInElement(document.getElementById("screen"));
  renderMathInElement(document.getElementById("func"));
  if (debugmode) {
    document.getElementById("debug").innerHTML = "screentxt: " + screentxt + "<br>LATEX: " + to_latex(screentxt) +
      "<br>eval: " + to_eval(screentxt) + "<br>screentxt[cursor]: " + screentxt[cursor];
  }
  document.getElementById("screen").scrollTop = document.getElementById("screen").scrollHeight;
}
function to_eval(str) {
  for (var i = 0; i < automult.length; i++) {
    let re = new RegExp("[0-9]" + automult[i], 'g');
    str = str.replace(re, function(match) {
      return match[0] + "*" + match[1];
    });
  }
  for (var i = 0; i < str.length-1; i++) {
    if (variables.indexOf(str[i]) != -1 && variables.indexOf(str[i+1]) != -1) {
      str = str.slice(0, i+1) + "*" + str.slice(i+1);
      i++;
    }
    if ((["(", "["].indexOf(str[i+1]) != -1 || functions.indexOf(str[i+1]) != -1) && automult.indexOf(str[i]) != -1
        && functions.indexOf(str[i]) == -1 && str[i] != "Ä") {
      str = str.slice(0, i+1) + "*" + str.slice(i+1);
      i++;
    }
    if (closebrackets.indexOf(str[i]) != -1 && automult.indexOf(str[i+1]) != -1 && str[i] != "Ä") {
      str = str.slice(0, i+1) + "*" + str.slice(i+1);
      i++;
    }
  }
  while (str.indexOf("^") != -1) {
    var i = str.indexOf("^");
    let exponent = str.slice(i+2, findClosingBracket(str, i+1, open='{', close='}'));
    var j = i - 1;
    for (var b = 0; b < closebrackets.length; b++) {
      if (str[j] == closebrackets[b]) {
        j = findOpeningBracket(str, j, open=openbrackets[b], close=closebrackets[b]);
        if (j > 0 && functions.indexOf(str[j-1]) != -1)
          j--;
      }
    }
    while (str[j-1] == "." || digits.indexOf(str[j-1]) != -1) j--;
    while (j > 0) {
      if (operations.indexOf(str[j-1]) == -1 && functions.indexOf(str[j-1]) == -1 && openbrackets.indexOf(str[j-1]) == -1
        && closebrackets.indexOf(str[j-1]) == -1 && str[j-1] != ",") {
          j--;
      }
      else {
        break;
      }
    }
    str = str.slice(0, j) + "pow(" + str.slice(j, i) + "," + exponent + ")" + str.slice(i + exponent.length + 3);
  }
  while (str.indexOf("Ä") != -1) {
    var i = str.indexOf("Ä");
    var j = str.lastIndexOf("Ä");
    if (j == i) {
      str += ")";
    } else {
      str = str.slice(0, j) + ")" + str.slice(j+1);
    }
    str = str.slice(0, i) + "abs(" + str.slice(i+1);
  }
  while (str.indexOf("!") != -1) {
    var i = str.indexOf("!");
    var j = i-1;
    while (digits.indexOf(str[j]) == -1 && j != "Å" && variables.indexOf(str[j]) != -1 && j > 0) j--;
    str = str.slice(0, j) + "factorial(" + str.slice(j, i) + ")" + str.slice(i+1);
  }
  while (str.indexOf("©") != -1) {
    let i = str.indexOf("©");
    let j = findOpeningBracket(str, str.lastIndexOf("}", i), open="{", close="}");
    str = str.slice(0, j) + "nCr(" + str.slice(j+1, i-1) + "," + str.slice(i+2);
  }
  while (str.indexOf("¦") != -1) {
    let i = str.indexOf("¦");
    let j = findOpeningBracket(str, str.lastIndexOf("}", i), open="{", close="}");
    str = str.slice(0, j) + "nPr(" + str.slice(j+1, i-1) + "," + str.slice(i+2);
  }
  str = str.replace(/Å/g, "ans");
  str = str.replace(/ýà/g, "tanh");
  str = str.replace(/ýç/g, "cosh");
  str = str.replace(/ýì/g, "sinh");
  str = str.replace(/ýÀ/g, "atanh");
  str = str.replace(/ýÇ/g, "acosh");
  str = str.replace(/ýÌ/g, "asinh");
  str = str.replace(/à/g, "tan_mode");
  str = str.replace(/ç/g, "cos_mode");
  str = str.replace(/ì/g, "sin_mode");
  str = str.replace(/À/g, "atan_mode");
  str = str.replace(/Ç/g, "acos_mode");
  str = str.replace(/Ì/g, "asin_mode");
  str = str.replace(/ł/g, "log");
  str = str.replace(/á/g, "/");
  str = str.replace(/[{]/g, "(");
  str = str.replace(/[}]/g, ")");
  str = str.replace(/π/g, "pi");
  str = str.replace(/ù/g, "sqrt");
  str = str.replace(/Ù/g, "cbrt");
  str = str.replace(/Ł/g, "log_mode");
  str = str.replace(/è/g, "e");
  str = str.replace(/ÿ/g, "*0.01");
  str = str.replace(/θ/g, "theta");
  str = str.replace(/¡/g, "a");
  str = str.replace(/¤/g, "b");
  str = str.replace(/¢/g, "c");
  str = str.replace(/£/g, "x");
  str = str.replace(/¥/g, "y");
  str = str.replace(/«/g, "z");
  str = str.replace(/Þ/g, "t");
  str = str.replace(/®/g, "r");
  str = str.replace(/¶/g, "m");
  str = str.replace(/£/g, "ñ");
  str = str.replace(/¿/g, "k");
  str = str.replace(/Â/g, "random()");
  str = str.replace(/\}©\{/g, ",");
  str = str.replace(/\}¦\{/g, ",");
  str = str.replace(/¸/g, "floor");
  str = str.replace(/¯/g, "ceil");
  return str;
}
function to_latex(str) {
  str = str.replace(/\*/g, " \\cdot ");
  str = str.replace(/Å/g, "\\text{ans}");
  str = str.replace(/\//g, " \\div ");
  str = str.replace(/ý/g, "\\text{hyp}");
  str = str.replace(/\\text{hyp}à/g, "\\tanh");
  str = str.replace(/\\text{hyp}ç/g, "\\cosh");
  str = str.replace(/\\text{hyp}ì/g, "\\sinh");
  str = str.replace(/\\text{hyp}À/g, "\\tanh^{-1}");
  str = str.replace(/\\text{hyp}Ç/g, "\\cosh^{-1}");
  str = str.replace(/\\text{hyp}Ì/g, "\\sinh^{-1}");
  str = str.replace(/à/g, "\\tan");
  str = str.replace(/ç/g, "\\cos");
  str = str.replace(/ì/g, "\\sin");
  str = str.replace(/À/g, "\\tan^{-1}");
  str = str.replace(/Ç/g, "\\cos^{-1}");
  str = str.replace(/Ì/g, "\\sin^{-1}");
  str = str.replace(/ł/g, "\\ln");
  str = str.replace(/π/g, "\\pi");
  str = str.replace(/ù/g, "\\sqrt");
  str = str.replace(/Ù/g, "\\sqrt[3]");
  str = str.replace(/Â/g, "\\text{rand}");
  if (logbase == 10)
    str = str.replace(/Ł/g, "\\log");
  else
    str = str.replace(/Ł/g, "\\log_{" + logbase + "}");
  str = str.replace(/è/g, "e");
  str = str.replace(/>/g, "\\rightarrow ");
  str = str.replace(/ÿ/g, "\\%");
  str = str.replace(/ß/g, "\\fbox{ \\vphantom{5} }");
  str = str.replace(/¡/g, "a");
  str = str.replace(/¤/g, "b");
  str = str.replace(/¢/g, "c");
  str = str.replace(/£/g, "x");
  str = str.replace(/¥/g, "y");
  str = str.replace(/«/g, "z");
  str = str.replace(/Þ/g, "t");
  str = str.replace(/®/g, "r");
  str = str.replace(/¶/g, "m");
  str = str.replace(/ñ/g, "n");
  str = str.replace(/¿/g, "k");
  str = str.replace(/\}©\{/g, "\\choose ");
  str = str.replace(/\}¦\{/g, "P");
  str = str.replace(/¸/g, "\\floor");
  str = str.replace(/¯/g, "\\ceil");
  for (var i = 0; i < str.length-1; i++) {
    if (str[i] == "(") {
      let j = findClosingBracket(str, i);
      if (j != -1) {
        str = str.slice(0, i) + "\\left" + str.slice(i);
        str = str.slice(0, j+5) + "\\right" + str.slice(j+5);
        i += 5;
      }
    } if (str[i] == "Ä") {
      let j = findClosingBracket(str, i, open="Ä", close="Ä");
      if (j == -1) {
        str = str.slice(0, i) + "\\lvert " + str.slice(i+1);
        i += 6;
      } else {
        str = str.slice(0, i) + "\\lvert " + str.slice(i+1);
        str = str.slice(0, j+6) + "\\rvert " + str.slice(j+7);
        i += 6;
      }
    }
  }
  while (str.indexOf("á") != -1) {
    let i = str.indexOf("á");
    let j = findOpeningBracket(str, str.lastIndexOf("}", i), open="{", close="}");
    str = str.slice(0, i) + str.slice(i+1);
    str = str.slice(0, j) + "\\frac" + str.slice(j);
  }
  return str;
}
function enter(onlydecimal=false) {
  var val;
  var storevar = null;
  if (screenview == 0) {
    if (memselect == -1) {
      commandmem.push(screentxt);
      if (screentxt[screentxt.length - 2] == ">" && variables.indexOf(screentxt[screentxt.length - 1]) != -1) {
        storevar = screentxt[screentxt.length - 1];
        screentxt = screentxt.slice(0, screentxt.length - 2);
      }
      try {
        while ((screentxt.match(/[(]/g) || []).length > (screentxt.match(/[)]/g) || []).length)
          screentxt += ")";
        if (screentxt[0] == "=") {
          val = scope.ans;
          commandmem[commandmem.length-1] = "Å";
        } else
          val = math.evaluate(to_eval(screentxt), scope);
        if  (val == undefined || isNaN(val) || !isFinite(val)) {
          throw new Error("Error in evaluating input");
        }
        scope.ans = val;
        val = new Number(val.toFixed(15));
        if (notation == 1 || Math.abs(val) >= Math.pow(10, 9) || (Math.abs(val) <= Math.pow(10, -7) && Math.abs(val) > 0)) {
          val = val.toExponential().toString();
          if (val.indexOf("e") > 12) {
            val = val.slice(0, 11) + val.slice(val.indexOf("e"));
          }
          let shift = 2;
          if (val[val.indexOf("e")+1] == "-") shift = 1;
          val = val.slice(0, val.indexOf("e")) + "\\cdot 10^{" + val.slice(val.indexOf("e")+shift) + "}";
        } else if (!onlydecimal && Math.abs(val - Math.round(val)) > Math.pow(10, -9)) {
          for (var i = 2; i <= 100; i++) {
            if (Math.abs(Math.round(val*i) - val*i) < Math.pow(10, -9) && Math.abs(val) > Math.pow(10, -9)) {
              val = "\\frac{" + Math.round(val*i) + "}{" + i + "}";
              break;
            }
          }
        }
        switch(storevar) {
          case null: break;
          case "¡": scope.a = scope.ans; break;
          case "¤": scope.b = scope.ans; break;
          case "¢": scope.c = scope.ans; break;
          case "£": scope.x = scope.ans; break;
          case "¥": scope.y = scope.ans; break;
          case "«": scope.z = scope.ans; break;
          case "Þ": scope.t = scope.ans; break;
          case "®": scope.r = scope.ans; break;
          case "θ": scope.theta = scope.ans; break;
          case "¶": scope.m = scope.ans; break;
          case "ñ": scope.n = scope.ans; break;
          case "¿": scope.k = scope.ans; break;
        }
        mem.push(val);
        val = "=" + val.toString();
        document.getElementById("ans").style.textAlign = "right";
        screentxt = "";
        cursor = 0;
      } catch(err) {
        if (debugmode)
          val = "\\color{red}{\\text{ERROR: " + err.message + "}}";
        else
          val = "\\color{red}{\\text{ERROR}}";
        clearmem();
        mem.push("\\color{red}{\\text{ERROR}}");
      }
      updateMem(false);
      writescreen(val, false, true, false);
      clearWithButton = true;
    } else {
      if (memselect % 2 == 0)
        writescreen(commandmem[Math.floor(memselect / 2)].toString());
      else
        writescreen(mem[Math.floor(memselect / 2)].toString());
      memselect = -1;
      updateMem();
      updateMath();
      document.getElementById("screen").scrollTop = document.getElementById("screen").scrollHeight;
      document.getElementById("screen").scrollLeft = document.getElementById("screen").scrollWidth;
    }
  }
}
function scrollright() {
  var txt = screentxt;
  cursor++;
  while (txt[cursor] == "{" || doublefunctions.indexOf(txt[cursor]) != -1 || functions.indexOf(txt[cursor]) != -1)
    cursor++;
  if (cursor > txt.length)
    cursor = txt.length;
  if (txt[cursor] == "{") cursor--;
  math_disp("");
}
function scrollleft() {
  var txt = screentxt;
  cursor--;
  while (txt[cursor] == "{" || doublefunctions.indexOf(txt[cursor]) != -1 || functions.indexOf(txt[cursor]) != -1)
    cursor--;
  if (cursor < 0)
    cursor = 0;
  if (txt[cursor] == "{") cursor++;
  math_disp("");
}
function scrollup() {
  if (screenview == 0) {
    if (memselect < 0) memselect = mem.length + commandmem.length - 1;
    else if (memselect > -1) memselect--;
    updateMem();
    writescreen("");
    if (memselect != -1)
      document.getElementById("screen").scrollTop = memDivs[memselect].offsetHeight * memselect - 30;
    document.getElementById("screen").scrollLeft = 0;
  }
  switchbutton(1);
}
function scrolldown() {
  if (screenview == 0) {
    if (memselect >= mem.length + commandmem.length - 1) memselect = -1;
    else memselect++;
    updateMem();
    writescreen("");
    if (memselect != -1)
      document.getElementById("screen").scrollTop = memDivs[memselect].offsetHeight * memselect - 30;
    document.getElementById("screen").scrollLeft = 0;
  }
  switchbutton(1);
}

function findClosingBracket(str, pos, open='(', close=')') {
  if (str[pos] != open)
    throw new Error("No " + open + " at index " + pos);
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    switch (str[i]) {
      case close:
        if (--depth == 0)
          return i;
        break;
      case open:
        depth++; break;
    }
  }
  return -1;
}

function findOpeningBracket(str, pos, open='(', close=')') {
  if (str[pos] != close)
    throw new Error("No " + close + " at index " + pos);
  let depth = 1;
  for (let i = pos - 1; i >= 0; i--) {
    switch (str[i]) {
      case close:
        depth++; break;
      case open:
        if (--depth == 0)
          return i;
        break;
    }
  }
  return -1;
}
function clearmem() {
  document.getElementById("membuffer").style.display = "block";
  updateMem();
  document.getElementById("mem").innerHTML += "<br><br><br><br><br><br><br><br>";
  document.getElementById("ans").innerHTML = "";
  screentxt = "";
  cursor = 0;
  updateMath();
  document.getElementById("screen").scrollTop = document.getElementById("screen").scrollHeight;
}
function clearallmem() {
  mem = [];
  commandmem = [];
  clearmem();
  switchbutton(0);
}

function deltxt() {
  var delchar = cursor;
  var txt = screentxt;
  if (delchar == screentxt.length) delchar--;
  if (txt[delchar] == "}") {
    delchar--;
  }
  if (txt[delchar] == "{") {
    let end = findClosingBracket(txt, delchar, open='{', close='}');
    if (end == -1) {
      txt = txt.slice(0, delchar) + txt.slice(delchar+1);
    } else {
      txt = txt.slice(0, delchar) + txt.slice(end+1);
    }
    delchar--;
    if (delchar < 0) delchar = 0;
    if (doublefunctions.indexOf(txt[delchar]) != -1) {
      txt = txt.slice(0, delchar) + txt.slice(delchar+1);
      delchar--;
      if (txt[delchar] == "}") {
        let start = findOpeningBracket(txt, delchar, open='{', close='}');
        txt[delchar] = ")";
        txt[start] = "(";
      }
    }
    txt = txt.replace(/}/, ")");
    txt = txt.replace(/{/, "(");
  } else {
    txt = txt.slice(0, delchar) + txt.slice(delchar+1);
  }
  if (functions.indexOf(txt[delchar-1]) != -1)
    txt = txt.slice(0, delchar-1) + txt.slice(delchar);
  if (doublefunctions.indexOf(txt[cursor]) != -1) cursor--;
  if (cursor > txt.length) cursor = txt.length;
  if (cursor < 0) cursor = 0;
  screentxt = txt;
  writescreen("");
  return true;
}
function changeMode() {
  document.getElementById("screen").style.display = "none";
  document.getElementById("mode").style.display = "block";
  document.getElementById("prgm").style.display = "none";
  document.getElementById("selection").style.display = "none";
  screenview = 1;
}
function editPrgm() {
  document.getElementById("screen").style.display = "none";
  document.getElementById("mode").style.display = "none";
  document.getElementById("prgm").style.display = "block";
  document.getElementById("selection").style.display = "none";
  document.getElementById("prgm_txt").focus();
  screenview = 2;
  switchbutton(0);
}
function quit() {
  if (screenview == 1) {
    anglemode = new Number(document.mode.angle.value).valueOf();
    notation = new Number(document.mode.notation.value).valueOf();
    logbase = new Number(document.mode.logbase.value).valueOf();
    document.getElementById("mode").style.display = "none";
    document.getElementById("screen").style.display = "block";
    screenview = 0;
    debugmode = document.mode.debug.checked;
    document.body.className = document.mode.color.value;
    let color = document.mode.color.value;
    if (color == "abdussalam") {
      document.getElementById("maharashtra").style.display = "none";
      document.getElementById("punjab").style.display = "block";
    } else {
      document.getElementById("maharashtra").style.display = "block";
      document.getElementById("punjab").style.display = "none";
      let mi_m = document.getElementById("mi_m");
      let mi_svg = document.getElementById("mi_svg");
      let mi_txt = document.getElementById("mi_txt");
      let state = "Maharashtra";
      if (color == "" || color == "night") {
        mi_svg.style.visibility = "";
      } else
        mi_svg.style.visibility = "hidden";
      if (color == "")
        mi_m.style.fill = "#AAE0EE";
      else if (color == "night")
        mi_m.style.fill = "#111155";
      else if (color == "cathy")
        state = "Yunnan";
      else if (color == "washington")
        state = "Virginia";
      mi_txt.innerHTML = state + " Instruments";
      document.getElementById("calcname").innerHTML = state[0] + "I-\\(n\\)<i>spire</i> CX II CAS";
      renderMathInElement(document.getElementById("calcname"));
    }
  } if (screenview == 2) {
    document.getElementById("prgm").style.display = "none";
    document.getElementById("screen").style.display = "block";
    screenview = 0;
  } if (screenview == 3) {
    document.getElementById("selection").style.display = "none";
    document.getElementById("screen").style.display = "block";
    screenview = 0;
    writescreen(document.selection.choice.value);
    if (document.selection.choice.value == "{}©{}" || document.selection.choice.value == "{}¦{}") {
      cursor -= 2;
      scrollleft();
    }
    if (document.selection.choice.value == "¯{}" || document.selection.choice.value == "¸{}")
      scrollleft();
  }
  updateMath();
}
function secondbutton() {
  if (buttonmode == 1)
    switchbutton(0);
  else
    switchbutton(1);
}
function alphabutton() {
  if (buttonmode == 2)
    switchbutton(0);
  else
    switchbutton(2);
}
function switchbutton(page) {
  if (page == 1)
    document.getElementById("second").className = "active button";
  else
    document.getElementById("second").className = "button";
  if (page == 2)
    document.getElementById("alpha").className = "active button";
  else
    document.getElementById("alpha").className = "button";
  buttonmode = page;
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].attributes["data-bpage"] != undefined) {
      if (buttons[i].attributes["data-bpage"].value == page)
        buttons[i].style.display = "inline-block";
      else
        buttons[i].style.display = "none";
    }
  }
}
function math_disp(str, add=true, render=true) {
  var disp_f;
  if (screenview == 0) disp_f = function(s, a, r) { writescreen(s, a, r); };
  else disp_f = function(s, a, r) { return; };
  return disp_f(str, add, render);
}
function keypress(event) {
  var u = event.which || event.keyCode;
  if (screenview == 0) {
    if (48 <= u && u <= 59) math_disp('' + (u-48));
    if (u == 45) math_disp('-');
    if (u == 43) math_disp("+");
    if (u == 61 || u == 13) enter();
    if (u == 46) math_disp(".");
    if (u == 47) math_disp("/");
    if (u == 42) math_disp("*");
    if (u == 40) math_disp("(");
    if (u == 41) math_disp(")");
    if (u == 67) clearmem();
    if (u == 37) math_disp("ÿ");
    if (u == 124) math_disp("Ä");
    if (u == 104) math_disp("ý");
    if (u == 101) math_disp("è");
    if (u == 62) math_disp(">");
    if (u == 97) math_disp("¡");
    if (u == 98) math_disp("¤");
    if (u == 99) math_disp("¢");
    if (u == 120) math_disp("£");
    if (u == 121) math_disp("¥");
    if (u == 122) math_disp("«");
    if (u == 116) math_disp("Þ");
    if (u == 114) math_disp("®");
    if (u == 109) math_disp("¶");
    if (u == 110) math_disp("ñ");
    if (u == 107) math_disp("¿");
    if (u == 102) fracbutton();
    if (u == 94) {
      math_disp('^{}', true, false); cursor += 2; math_disp('');
    }
  }
}
function specialkeys(event) {
  var u = event.which || event.keyCode;
  if (screenview == 0) {
    if (u == 8 || u == 46) deltxt();
    if (u == 37) scrollleft();
    if (u == 38) scrollup();
    if (u == 39) scrollright();
    if (u == 40) scrolldown();
    if (u == 16) switchbutton(1);
  }
}
function specialkeysUp(event) {
  var u = event.which || event.keyCode;
  if (screenview == 0) {
    if (u == 16) switchbutton(0);
  }
}
function execPrgm() {
  try {
    var code = document.getElementById("prgm_txt").innerHTML;
    code = code.replace(/<div>/g, "\n");
    code = code.replace(/<br>/g, "\n");
    code = code.replace(/<\/div>/g, "");
    eval(code);
  } catch(err) {
    writescreen("\\color{red}{\\text{ERROR: " + err.message + "}}", false, true);
    clearWithButton = true;
  }
}
function fracbutton() {
  writescreen('{}á{}', true, false); cursor++; writescreen('');
}
function choosefunction(functions, disp) {
  document.getElementById("screen").style.display = "none";
  document.getElementById("mode").style.display = "none";
  document.getElementById("prgm").style.display = "none";
  document.getElementById("selection").style.display = "block";
  while (document.selection.choice.options.length > 0)
    document.selection.choice.remove(0);
  for (var i = 0; i < functions.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = disp[i];
    option.value = functions[i];
    document.selection.choice.add(option);
  }
  switchbutton(0);
  screenview = 3;
}

window.onload = function() {
  writescreen("");
  document.body.addEventListener("keyup", specialkeysUp);
};
