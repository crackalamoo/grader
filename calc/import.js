var scope = {
  a: 0,
  b: 0,
  c: 0,
  x: 0,
  y: 0,
  z: 0,
  t: 0,
  r: 0,
  theta: 0,
  m: 0,
  n: 0,
  k: 0,
  ans: 0
};

math.import({
  sin_mode: function(num) {
    if (anglemode == 0)
      num = Math.sin(num);
    else
      num = Math.sin(num*Math.PI/180.0);
    return num;
  },
  cos_mode: function(num) {
    if (anglemode == 0)
      num = Math.cos(num);
    else
      num = Math.cos(num*Math.PI/180.0);
    return num;
  },
  tan_mode: function(num) {
    if (anglemode == 0)
      num = Math.tan(num);
    else
      num = Math.tan(num*Math.PI/180.0);
    if (Math.abs(num) >= 150000000000000)
      return NaN;
    return num;
  },
  asin_mode: function(num) {
    num = Math.asin(num);
    if (anglemode == 1)
      num *= 180.0/Math.PI;
    return num;
  },
  acos_mode: function(num) {
    num = Math.acos(num);
    if (anglemode == 1)
      num *= 180.0/Math.PI;
    return num;
  },
  atan_mode: function(num) {
    num = Math.atan(num);
    if (anglemode == 1)
      num *= 180.0/Math.PI;
    return num;
  },
  nCr: function(n, r) {
    return (math.factorial(n))/(math.factorial(r) * math.factorial(n-r));
  },
  nPr: function(n, r) {
    return (math.factorial(n))/(math.factorial(n-r));
  },
  log_mode: function(num) {
    return math.log10(num)/math.log10(logbase);
  }
});
