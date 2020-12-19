/*
            JavaScript functions for positional astronomy

                  by John Walker  --  September, MIM
                       http://www.fourmilab.ch/

                This program is in the public domain.
*/

//  Frequently-used constants

var
    J2000             = 2451545.0,              // Julian day of J2000 epoch
    ZodiacStart1      = 1825233.5,              /* Julian day of aligment
                                                between tropical and sidereal zodiacs */
    ZodiacStart2      = 2458587.913888889,      // Sidereal start of Aries
    JulianCentury     = 36525.0,                // Days in Julian century
    JulianMillennium  = (JulianCentury * 10),   // Days in Julian millennium
    AstronomicalUnit  = 149597870.0,            // Astronomical unit in kilometres
    TropicalYear      = 365.24219878,           // Mean solar tropical year
    SiderealYear      = 365.256363004,          // Mean solar sidereal year
    SynodicMonth      = 29.530587981;           // Mean synodic month
const KAABA_LATITUDE = 21.4225,
      KAABA_LONGITUDE = 39.8262;

/*  ASTOR  --  Arc-seconds to radians.  */

function astor(a)
{
    return a * (Math.PI / (180.0 * 3600.0));
}

/*  DTR  --  Degrees to radians.  */

function dtr(d)
{
    return (d * Math.PI) / 180.0;
}

/*  RTD  --  Radians to degrees.  */

function rtd(r)
{
    return (r * 180.0) / Math.PI;
}

/*  FIXANGLE  --  Range reduce angle in degrees.  */

function fixangle(a)
{
        return a - 360.0 * (Math.floor(a / 360.0));
}

/*  FIXANGR  --  Range reduce angle in radians.  */

function fixangr(a)
{
        return a - (2 * Math.PI) * (Math.floor(a / (2 * Math.PI)));
}

//  DSIN  --  Sine of an angle in degrees

function dsin(d)
{
    return Math.sin(dtr(d));
}

//  DCOS  --  Cosine of an angle in degrees

function dcos(d)
{
    return Math.cos(dtr(d));
}

//  DTAN  --  Tangent of an angle in degrees

function dtan(d) {
  return Math.tan(dtr(d));
}

/*  MOD  --  Modulus function which works for non-integers.  */

function mod(a, b)
{
    return a - (b * Math.floor(a / b));
}

//  AMOD  --  Modulus function which returns numerator if modulus is zero

function amod(a, b)
{
    return mod(a - 1, b) + 1;
}

// MODPOS -- Modulus function which always returns non-negative numbers
function modPos(n, m=360.0) {
  n %= m;
  if (n < 0) n += m;
  return n;
}

/*  JHMS  --  Convert Julian time to hour, minutes, and seconds,
              returned as a three-element array.  */

function jhms(j) {
    var ij;

    j += 0.5;                 /* Astronomical to civil */
    ij = ((j - Math.floor(j)) * 86400.0) + 0.5;
    return new Array(
                     Math.floor(ij / 3600.0),
                     Math.floor((ij / 60.0) % 60.0),
                     Math.floor(ij % 60.0));
}

//  JWDAY  --  Calculate day of week from Julian day

function jwday(j)
{
    return mod(Math.floor((j + 1.5)), 7);
}

/*  OBLIQEQ  --  Calculate the obliquity of the ecliptic for a given
                 Julian date.  This uses Laskar's tenth-degree
                 polynomial fit (J. Laskar, Astronomy and
                 Astrophysics, Vol. 157, page 68 [1986]) which is
                 accurate to within 0.01 arc second between AD 1000
                 and AD 3000, and within a few seconds of arc for
                 +/-10000 years around AD 2000.  If we're outside the
                 range in which this fit is valid (deep time) we
                 simply return the J2000 value of the obliquity, which
                 happens to be almost precisely the mean.  */

var oterms = new Array (
        -4680.93,
           -1.55,
         1999.25,
          -51.38,
         -249.67,
          -39.05,
            7.12,
           27.87,
            5.79,
            2.45
);

function obliqeq(jd)
{
    var eps, u, v, i;

    v = u = (jd - J2000) / (JulianCentury * 100);

    eps = 23 + (26 / 60.0) + (21.448 / 3600.0);

    if (Math.abs(u) < 1.0) {
        for (i = 0; i < 10; i++) {
            eps += (oterms[i] / 3600.0) * v;
            v *= u;
        }
    }
    return eps;
}

/* Periodic terms for nutation in longiude (delta \Psi) and
   obliquity (delta \Epsilon) as given in table 21.A of
   Meeus, "Astronomical Algorithms", first edition. */

var nutArgMult = new Array(
     0,  0,  0,  0,  1,
    -2,  0,  0,  2,  2,
     0,  0,  0,  2,  2,
     0,  0,  0,  0,  2,
     0,  1,  0,  0,  0,
     0,  0,  1,  0,  0,
    -2,  1,  0,  2,  2,
     0,  0,  0,  2,  1,
     0,  0,  1,  2,  2,
    -2, -1,  0,  2,  2,
    -2,  0,  1,  0,  0,
    -2,  0,  0,  2,  1,
     0,  0, -1,  2,  2,
     2,  0,  0,  0,  0,
     0,  0,  1,  0,  1,
     2,  0, -1,  2,  2,
     0,  0, -1,  0,  1,
     0,  0,  1,  2,  1,
    -2,  0,  2,  0,  0,
     0,  0, -2,  2,  1,
     2,  0,  0,  2,  2,
     0,  0,  2,  2,  2,
     0,  0,  2,  0,  0,
    -2,  0,  1,  2,  2,
     0,  0,  0,  2,  0,
    -2,  0,  0,  2,  0,
     0,  0, -1,  2,  1,
     0,  2,  0,  0,  0,
     2,  0, -1,  0,  1,
    -2,  2,  0,  2,  2,
     0,  1,  0,  0,  1,
    -2,  0,  1,  0,  1,
     0, -1,  0,  0,  1,
     0,  0,  2, -2,  0,
     2,  0, -1,  2,  1,
     2,  0,  1,  2,  2,
     0,  1,  0,  2,  2,
    -2,  1,  1,  0,  0,
     0, -1,  0,  2,  2,
     2,  0,  0,  2,  1,
     2,  0,  1,  0,  0,
    -2,  0,  2,  2,  2,
    -2,  0,  1,  2,  1,
     2,  0, -2,  0,  1,
     2,  0,  0,  0,  1,
     0, -1,  1,  0,  0,
    -2, -1,  0,  2,  1,
    -2,  0,  0,  0,  1,
     0,  0,  2,  2,  1,
    -2,  0,  2,  0,  1,
    -2,  1,  0,  2,  1,
     0,  0,  1, -2,  0,
    -1,  0,  1,  0,  0,
    -2,  1,  0,  0,  0,
     1,  0,  0,  0,  0,
     0,  0,  1,  2,  0,
    -1, -1,  1,  0,  0,
     0,  1,  1,  0,  0,
     0, -1,  1,  2,  2,
     2, -1, -1,  2,  2,
     0,  0, -2,  2,  2,
     0,  0,  3,  2,  2,
     2, -1,  0,  2,  2
);

var nutArgCoeff = new Array(
    -171996,   -1742,   92095,      89,          /*  0,  0,  0,  0,  1 */
     -13187,     -16,    5736,     -31,          /* -2,  0,  0,  2,  2 */
      -2274,      -2,     977,      -5,          /*  0,  0,  0,  2,  2 */
       2062,       2,    -895,       5,          /*  0,  0,  0,  0,  2 */
       1426,     -34,      54,      -1,          /*  0,  1,  0,  0,  0 */
        712,       1,      -7,       0,          /*  0,  0,  1,  0,  0 */
       -517,      12,     224,      -6,          /* -2,  1,  0,  2,  2 */
       -386,      -4,     200,       0,          /*  0,  0,  0,  2,  1 */
       -301,       0,     129,      -1,          /*  0,  0,  1,  2,  2 */
        217,      -5,     -95,       3,          /* -2, -1,  0,  2,  2 */
       -158,       0,       0,       0,          /* -2,  0,  1,  0,  0 */
        129,       1,     -70,       0,          /* -2,  0,  0,  2,  1 */
        123,       0,     -53,       0,          /*  0,  0, -1,  2,  2 */
         63,       0,       0,       0,          /*  2,  0,  0,  0,  0 */
         63,       1,     -33,       0,          /*  0,  0,  1,  0,  1 */
        -59,       0,      26,       0,          /*  2,  0, -1,  2,  2 */
        -58,      -1,      32,       0,          /*  0,  0, -1,  0,  1 */
        -51,       0,      27,       0,          /*  0,  0,  1,  2,  1 */
         48,       0,       0,       0,          /* -2,  0,  2,  0,  0 */
         46,       0,     -24,       0,          /*  0,  0, -2,  2,  1 */
        -38,       0,      16,       0,          /*  2,  0,  0,  2,  2 */
        -31,       0,      13,       0,          /*  0,  0,  2,  2,  2 */
         29,       0,       0,       0,          /*  0,  0,  2,  0,  0 */
         29,       0,     -12,       0,          /* -2,  0,  1,  2,  2 */
         26,       0,       0,       0,          /*  0,  0,  0,  2,  0 */
        -22,       0,       0,       0,          /* -2,  0,  0,  2,  0 */
         21,       0,     -10,       0,          /*  0,  0, -1,  2,  1 */
         17,      -1,       0,       0,          /*  0,  2,  0,  0,  0 */
         16,       0,      -8,       0,          /*  2,  0, -1,  0,  1 */
        -16,       1,       7,       0,          /* -2,  2,  0,  2,  2 */
        -15,       0,       9,       0,          /*  0,  1,  0,  0,  1 */
        -13,       0,       7,       0,          /* -2,  0,  1,  0,  1 */
        -12,       0,       6,       0,          /*  0, -1,  0,  0,  1 */
         11,       0,       0,       0,          /*  0,  0,  2, -2,  0 */
        -10,       0,       5,       0,          /*  2,  0, -1,  2,  1 */
         -8,       0,       3,       0,          /*  2,  0,  1,  2,  2 */
          7,       0,      -3,       0,          /*  0,  1,  0,  2,  2 */
         -7,       0,       0,       0,          /* -2,  1,  1,  0,  0 */
         -7,       0,       3,       0,          /*  0, -1,  0,  2,  2 */
         -7,       0,       3,       0,          /*  2,  0,  0,  2,  1 */
          6,       0,       0,       0,          /*  2,  0,  1,  0,  0 */
          6,       0,      -3,       0,          /* -2,  0,  2,  2,  2 */
          6,       0,      -3,       0,          /* -2,  0,  1,  2,  1 */
         -6,       0,       3,       0,          /*  2,  0, -2,  0,  1 */
         -6,       0,       3,       0,          /*  2,  0,  0,  0,  1 */
          5,       0,       0,       0,          /*  0, -1,  1,  0,  0 */
         -5,       0,       3,       0,          /* -2, -1,  0,  2,  1 */
         -5,       0,       3,       0,          /* -2,  0,  0,  0,  1 */
         -5,       0,       3,       0,          /*  0,  0,  2,  2,  1 */
          4,       0,       0,       0,          /* -2,  0,  2,  0,  1 */
          4,       0,       0,       0,          /* -2,  1,  0,  2,  1 */
          4,       0,       0,       0,          /*  0,  0,  1, -2,  0 */
         -4,       0,       0,       0,          /* -1,  0,  1,  0,  0 */
         -4,       0,       0,       0,          /* -2,  1,  0,  0,  0 */
         -4,       0,       0,       0,          /*  1,  0,  0,  0,  0 */
          3,       0,       0,       0,          /*  0,  0,  1,  2,  0 */
         -3,       0,       0,       0,          /* -1, -1,  1,  0,  0 */
         -3,       0,       0,       0,          /*  0,  1,  1,  0,  0 */
         -3,       0,       0,       0,          /*  0, -1,  1,  2,  2 */
         -3,       0,       0,       0,          /*  2, -1, -1,  2,  2 */
         -3,       0,       0,       0,          /*  0,  0, -2,  2,  2 */
         -3,       0,       0,       0,          /*  0,  0,  3,  2,  2 */
         -3,       0,       0,       0           /*  2, -1,  0,  2,  2 */
);

/*  NUTATION  --  Calculate the nutation in longitude, deltaPsi, and
                  obliquity, deltaEpsilon for a given Julian date
                  jd.  Results are returned as a two element Array
                  giving (deltaPsi, deltaEpsilon) in degrees.  */

function nutation(jd)
{
    jd -= timeZone(1, jd);
    var deltaPsi, deltaEpsilon,
        i, j,
        t = (jd - 2451545.0) / 36525.0, t2, t3, to10,
        ta = new Array,
        dp = 0, de = 0, ang;

    t3 = t * (t2 = t * t);

    /* Calculate angles.  The correspondence between the elements
       of our array and the terms cited in Meeus are:

       ta[0] = D  ta[0] = M  ta[2] = M'  ta[3] = F  ta[4] = \Omega

    */

    ta[0] = dtr(297.850363 + 445267.11148 * t - 0.0019142 * t2 +
                t3 / 189474.0);
    ta[1] = dtr(357.52772 + 35999.05034 * t - 0.0001603 * t2 -
                t3 / 300000.0);
    ta[2] = dtr(134.96298 + 477198.867398 * t + 0.0086972 * t2 +
                t3 / 56250.0);
    ta[3] = dtr(93.27191 + 483202.017538 * t - 0.0036825 * t2 +
                t3 / 327270);
    ta[4] = dtr(125.04452 - 1934.136261 * t + 0.0020708 * t2 +
                t3 / 450000.0);

    /* Range reduce the angles in case the sine and cosine functions
       don't do it as accurately or quickly. */

    for (i = 0; i < 5; i++) {
        ta[i] = fixangr(ta[i]);
    }

    to10 = t / 10.0;
    for (i = 0; i < 63; i++) {
        ang = 0;
        for (j = 0; j < 5; j++) {
            if (nutArgMult[(i * 5) + j] != 0) {
                ang += nutArgMult[(i * 5) + j] * ta[j];
            }
        }
        dp += (nutArgCoeff[(i * 4) + 0] + nutArgCoeff[(i * 4) + 1] * to10) * Math.sin(ang);
        de += (nutArgCoeff[(i * 4) + 2] + nutArgCoeff[(i * 4) + 3] * to10) * Math.cos(ang);
    }

    /* Return the result, converting from ten thousandths of arc
       seconds to radians in the process. */

    deltaPsi = dp / (3600.0 * 10000.0);
    deltaEpsilon = de / (3600.0 * 10000.0);

    return new Array(deltaPsi, deltaEpsilon);
}

/*  ECLIPTOEQ  --  Convert celestial (ecliptical) longitude and
                   latitude into right ascension (in degrees) and
                   declination.  We must supply the time of the
                   conversion in order to compensate correctly for the
                   varying obliquity of the ecliptic over time.
                   The right ascension and declination are returned
                   as a two-element Array in that order.  */

function ecliptoeq(jd, Lambda, Beta)
{
    var eps, Ra, Dec;

    /* Obliquity of the ecliptic. */

    eps = dtr(obliqeq(jd));

    Ra = rtd(Math.atan2((Math.cos(eps) * Math.sin(dtr(Lambda)) -
                        (Math.tan(dtr(Beta)) * Math.sin(eps))),
                      Math.cos(dtr(Lambda))));
    Ra = fixangle(rtd(Math.atan2((Math.cos(eps) * Math.sin(dtr(Lambda)) -
                        (Math.tan(dtr(Beta)) * Math.sin(eps))),
                      Math.cos(dtr(Lambda)))));
    Dec = rtd(Math.asin((Math.sin(eps) * Math.sin(dtr(Lambda)) * Math.cos(dtr(Beta))) +
                 (Math.sin(dtr(Beta)) * Math.cos(eps))));

    return new Array(Ra, Dec);
}


/*  DELTAT  --  Determine the difference, in seconds, between
                Dynamical time and Universal time.  */

/*  Table of observed Delta T values at the beginning of
    even numbered years from 1620 through 2002.  */

var deltaTtab = new Array(
    121, 112, 103, 95, 88, 82, 77, 72, 68, 63, 60, 56, 53, 51, 48, 46,
    44, 42, 40, 38, 35, 33, 31, 29, 26, 24, 22, 20, 18, 16, 14, 12,
    11, 10, 9, 8, 7, 7, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10,
    10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13,
    13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16,
    16, 16, 15, 15, 14, 13, 13.1, 12.5, 12.2, 12, 12, 12, 12, 12, 12,
    11.9, 11.6, 11, 10.2, 9.2, 8.2, 7.1, 6.2, 5.6, 5.4, 5.3, 5.4, 5.6,
    5.9, 6.2, 6.5, 6.8, 7.1, 7.3, 7.5, 7.6, 7.7, 7.3, 6.2, 5.2, 2.7,
    1.4, -1.2, -2.8, -3.8, -4.8, -5.5, -5.3, -5.6, -5.7, -5.9, -6,
    -6.3, -6.5, -6.2, -4.7, -2.8, -0.1, 2.6, 5.3, 7.7, 10.4, 13.3, 16,
    18.2, 20.2, 21.1, 22.4, 23.5, 23.8, 24.3, 24, 23.9, 23.9, 23.7,
    24, 24.3, 25.3, 26.2, 27.3, 28.2, 29.1, 30, 30.7, 31.4, 32.2,
    33.1, 34, 35, 36.5, 38.3, 40.2, 42.2, 44.5, 46.5, 48.5, 50.5,
    52.2, 53.8, 54.9, 55.8, 56.9, 58.3, 60, 61.6, 63, 65, 66.6
                         );

function deltat(year)
{
    var dt, f, i, t;

    if ((year >= 1620) && (year <= 2000)) {
        i = Math.floor((year - 1620) / 2);
        f = ((year - 1620) / 2) - i;  /* Fractional part of year */
        dt = deltaTtab[i] + ((deltaTtab[i + 1] - deltaTtab[i]) * f);
    } else {
        t = (year - 2000) / 100;
        if (year < 948) {
            dt = 2177 + (497 * t) + (44.1 * t * t);
        } else {
            dt = 102 + (102 * t) + (25.3 * t * t);
            if ((year > 2000) && (year < 2100)) {
                dt += 0.37 * (year - 2100);
            }
        }
    }
    return dt;
}

/*  EQUINOX  --  Determine the Julian Ephemeris Day of an
                 equinox or solstice.  The "which" argument
                 selects the item to be computed:

                    0   March equinox
                    1   June solstice
                    2   September equinox
                    3   December solstice

*/

//  Periodic terms to obtain true time

var EquinoxpTerms = new Array(
                       485, 324.96,   1934.136,
                       203, 337.23,  32964.467,
                       199, 342.08,     20.186,
                       182,  27.85, 445267.112,
                       156,  73.14,  45036.886,
                       136, 171.52,  22518.443,
                        77, 222.54,  65928.934,
                        74, 296.72,   3034.906,
                        70, 243.58,   9037.513,
                        58, 119.81,  33718.147,
                        52, 297.17,    150.678,
                        50,  21.02,   2281.226,
                        45, 247.54,  29929.562,
                        44, 325.15,  31555.956,
                        29,  60.93,   4443.417,
                        18, 155.12,  67555.328,
                        17, 288.79,   4562.452,
                        16, 198.04,  62894.029,
                        14, 199.76,  31436.921,
                        12,  95.39,  14577.848,
                        12, 287.11,  31931.756,
                        12, 320.81,  34777.259,
                         9, 227.73,   1222.114,
                         8,  15.45,  16859.074
                             );

JDE0tab1000 = new Array(
   new Array(1721139.29189, 365242.13740,  0.06134,  0.00111, -0.00071),
   new Array(1721233.25401, 365241.72562, -0.05323,  0.00907,  0.00025),
   new Array(1721325.70455, 365242.49558, -0.11677, -0.00297,  0.00074),
   new Array(1721414.39987, 365242.88257, -0.00769, -0.00933, -0.00006)
                       );

JDE0tab2000 = new Array(
   new Array(2451623.80984, 365242.37404,  0.05169, -0.00411, -0.00057),
   new Array(2451716.56767, 365241.62603,  0.00325,  0.00888, -0.00030),
   new Array(2451810.21715, 365242.01767, -0.11575,  0.00337,  0.00078),
   new Array(2451900.05952, 365242.74049, -0.06223, -0.00823,  0.00032)
                       );

function equinox(year, which)
{
    var deltaL, i, j, JDE0, JDE, JDE0tab, S, T, W, Y;

    /*  Initialise terms for mean equinox and solstices.  We
        have two sets: one for years prior to 1000 and a second
        for subsequent years.  */

    if (year < 1000) {
        JDE0tab = JDE0tab1000;
        Y = year / 1000;
    } else {
        JDE0tab = JDE0tab2000;
        Y = (year - 2000) / 1000;
    }

    JDE0 =  JDE0tab[which][0] +
           (JDE0tab[which][1] * Y) +
           (JDE0tab[which][2] * Y * Y) +
           (JDE0tab[which][3] * Y * Y * Y) +
           (JDE0tab[which][4] * Y * Y * Y * Y);

    T = (JDE0 - 2451545.0) / 36525;
    W = (35999.373 * T) - 2.47;
    deltaL = 1 + (0.0334 * dcos(W)) + (0.0007 * dcos(2 * W));

    //  Sum the periodic terms for time T

    S = 0;
    for (i = j = 0; i < 24; i++) {
        S += EquinoxpTerms[j] * dcos(EquinoxpTerms[j + 1] + (EquinoxpTerms[j + 2] * T));
        j += 3;
    }

    JDE = JDE0 + ((S * 0.00001) / deltaL);

    return JDE;
}

/*  SUNPOS  --  Position of the Sun.  Please see the comments
                on the return statement at the end of this function
                which describe the array it returns.  We return
                intermediate values because they are useful in a
                variety of other contexts.  */

function sunpos(jd, timezone=null)
{
    var T, T2, L0, M, e, C, sunLong, sunAnomaly, sunR,
        Omega, Lambda, epsilon, epsilon0, Alpha, Delta,
        AlphaApp, DeltaApp, n, L, g, sunLongEcliptic, ayanamsha,
        suryaSiddhanthaLong;
    if (timezone == null) jd -= timeZone(1, jd);
    else jd -= timezone/24.0;

    T = (jd - J2000) / JulianCentury;
    T2 = T * T;
    L0 = 280.46646 + (36000.76983 * T) + (0.0003032 * T2);
    L0 = fixangle(L0);
    M = 357.52911 + (35999.05029 * T) + (-0.0001537 * T2);
    M = fixangle(M);
    e = 0.016708634 + (-0.000042037 * T) + (-0.0000001267 * T2);
    C = ((1.914602 + (-0.004817 * T) + (-0.000014 * T2)) * dsin(M)) +
        ((0.019993 - (0.000101 * T)) * dsin(2 * M)) +
        (0.000289 * dsin(3 * M));
    sunLong = L0 + C;
    sunAnomaly = M + C;
    sunR = (1.000001018 * (1 - (e * e))) / (1 + (e * dcos(sunAnomaly)));
    Omega = 125.04 - (1934.136 * T);
    Lambda = sunLong + (-0.00569) + (-0.00478 * dsin(Omega));
    epsilon0 = obliqeq(jd);
    epsilon = epsilon0 + (0.00256 * dcos(Omega));
    Alpha = rtd(Math.atan2(dcos(epsilon0) * dsin(sunLong), dcos(sunLong)));
    Alpha = fixangle(Alpha);
    Delta = rtd(Math.asin(dsin(epsilon0) * dsin(sunLong)));
    AlphaApp = rtd(Math.atan2(dcos(epsilon) * dsin(Lambda), dcos(Lambda)));
    AlphaApp = fixangle(AlphaApp);
    DeltaApp = rtd(Math.asin(dsin(epsilon) * dsin(Lambda)));

    /* n = jd - J2000;
    L = 280.460 + 0.9856474*n;
    g = 357.528 + 0.9856003*n;
    L = modPos(L); g = modPos(g);
    sunLongEcliptic = L + 1.915*dsin(g) + 0.020*dsin(2*g); */
    sunLongEcliptic = Lambda;
    ayanamsha = (jd-ZodiacStart1)/TropicalYear*(36000.0/25771.5/100.0);
    sunLongEcliptic -= ayanamsha;
    sunLongEcliptic = fixangle(sunLongEcliptic);
    var suryaSiddhanthaAyanamsha = mod(ayanamsha, 108.0);
    if (27 < suryaSiddhanthaAyanamsha && suryaSiddhanthaAyanamsha < 81)
      suryaSiddhanthaAyanamsha = 54.0 - suryaSiddhanthaAyanamsha;
    else if (81 <= suryaSiddhanthaAyanamsha)
      suryaSiddhanthaAyanamsha -= 108;
    suryaSiddhanthaLong = fixangle(Lambda-suryaSiddhanthaAyanamsha);

    return new Array(                 //  Angular quantities are expressed in decimal degrees
        L0,                           //  [0] Geometric mean longitude of the Sun
        M,                            //  [1] Mean anomaly of the Sun
        e,                            //  [2] Eccentricity of the Earth's orbit
        C,                            //  [3] Sun's equation of the Centre
        sunLong,                      //  [4] Sun's true longitude
        sunAnomaly,                   //  [5] Sun's true anomaly
        sunR,                         //  [6] Sun's radius vector in AU
        Lambda,                       //  [7] Sun's apparent longitude at true equinox of the date
        Alpha,                        //  [8] Sun's true right ascension
        Delta,                        //  [9] Sun's true declination
        AlphaApp,                     // [10] Sun's apparent right ascension
        DeltaApp,                     // [11] Sun's apparent declination
        sunLongEcliptic,              // [12] Sun's sidereal longitude along the ecliptic relative to the stars
        ayanamsha,                    // [13] Degree difference between tropical and sidereal zodiacs
        suryaSiddhanthaLong,          /* [14] Sun's sidereal longitude according to the Surya Siddhantha
                                              (not accurate but used for the Hindu Calendar) */
        suryaSiddhanthaAyanamsha      // [15] Ayanamsha that moves back and forth between positive and negative 27 degrees
    );
}

/*  SUNPOS2  --  Position of the Sun specific to local coordinates.
                 Please see the comments on the return statement at
                 the end of this function which describe the array
                 it returns.  */

function sunpos2(jd) {
  var hourAngle, solarNoon, elevationAngle, declination, time,
    lat, long, azimuth, shadowDir, shadowLength, sunrise, sunset;

  lat = getLatitude();
  long = getLongitude();
  declination = sunpos(jd)[9];
  solarNoon = sunTimes_jd(jd, 2);
  sunrise = sunTimes_jd(jd, 0);
  sunset = sunTimes_jd(jd, 1);
  time = (jd+0.5)%1.0;
  jd_local = jd - timeZone(1, jd);
  T = (jd_local-J2000)/36525.0;
  //hourAngle = time - solarNoon;
  // hourAngle *= 360;
  deltaPsi = nutation(jd_local)[0];
  obliquity = obliqeq(jd_local);
  hourAngle = fixangle(280.46061837 + 360.98564736629*(jd_local-J2000) +
    0.000387933*T*T - T*T*T/38710000 + deltaPsi*dcos(obliquity) + getLongitude() - sunpos(jd)[10]);
  if (hourAngle > 180) hourAngle -= 360;
  elevationAngle = rtd(Math.asin( dsin(declination)*dsin(lat)
                        + dcos(declination)*dcos(hourAngle)*dcos(lat) ));
  azimuth = modPos(rtd(Math.acos( (dsin(declination)*dcos(lat) - dcos(declination)*dcos(hourAngle)*dsin(lat))/
                              (dcos(elevationAngle)) )));
  if (hourAngle > 0) azimuth = 360.0 - azimuth;
  shadowDir = modPos(azimuth+180);
  shadowLength = 1.0/dtan(elevationAngle);
  if (elevationAngle == 90) shadowLength = 0;
  if (elevationAngle <= 0) {
    shadowLength = null;
    shadowDir = null;
  }
  return new Array(                 //  Angular quantities are expressed in decimal degrees
    hourAngle,                      //  [0] Hour angle based on time in hours from local solar noon
    elevationAngle,                 //  [1] Elevation angle of the sun above the horizon
    azimuth,                        //  [2] Azimuth of the sun clockwise from north
    shadowDir,                      //  [3] Direction of shadows (opposite of azimuth of sun)
    shadowLength                    //  [4] Ratio of shadow length to object height
  );
}

var LUNAR_ANOMALIES = "0.000	0.000	0.000	-0.000	-0.000\n" +
  "0.237	0.046	0.045	-0.006	-0.004\n" +
  "0.473	0.093	0.089	-0.011	-0.008\n" +
  "0.709	0.139	0.133	-0.017	-0.012\n" +
  "0.943	0.185	0.177	-0.022	-0.017\n" +
  "1.176	0.230	0.219	-0.028	-0.021\n" +
  "1.408	0.276	0.261	-0.033	-0.025\n" +
  "1.637	0.321	0.301	-0.039	-0.029\n" +
  "1.864	0.366	0.339	-0.044	-0.033\n" +
  "2.088	0.410	0.376	-0.050	-0.037\n" +
  "2.310	0.454	0.411	-0.055	-0.041\n" +
  "2.527	0.497	0.444	-0.060	-0.045\n" +
  "2.741	0.540	0.475	-0.065	-0.049\n" +
  "2.951	0.582	0.504	-0.070	-0.052\n" +
  "3.157	0.623	0.529	-0.075	-0.056\n" +
  "3.358	0.663	0.553	-0.080	-0.060\n" +
  "3.554	0.703	0.573	-0.085	-0.063\n" +
  "3.746	0.742	0.591	-0.090	-0.067\n" +
  "3.931	0.780	0.605	-0.094	-0.070\n" +
  "4.111	0.817	0.617	-0.099	-0.074\n" +
  "4.285	0.853	0.625	-0.103	-0.077\n" +
  "4.454	0.888	0.630	-0.107	-0.080\n" +
  "4.615	0.922	0.632	-0.111	-0.083\n" +
  "4.770	0.955	0.631	-0.115	-0.086\n" +
  "4.919	0.986	0.627	-0.119	-0.089\n" +
  "5.061	1.017	0.620	-0.123	-0.092\n" +
  "5.195	1.046	0.609	-0.126	-0.094\n" +
  "5.323	1.074	0.595	-0.130	-0.097\n" +
  "5.443	1.100	0.579	-0.133	-0.099\n" +
  "5.555	1.125	0.559	-0.136	-0.101\n" +
  "5.660	1.149	0.536	-0.139	-0.103\n" +
  "5.757	1.172	0.511	-0.142	-0.106\n" +
  "5.847	1.193	0.483	-0.144	-0.107\n" +
  "5.929	1.212	0.453	-0.147	-0.109\n" +
  "6.002	1.230	0.420	-0.149	-0.111\n" +
  "6.068	1.247	0.385	-0.151	-0.112\n" +
  "6.126	1.262	0.348	-0.153	-0.114\n" +
  "6.176	1.276	0.309	-0.154	-0.115\n" +
  "6.218	1.288	0.269	-0.156	-0.116\n" +
  "6.252	1.298	0.227	-0.157	-0.117\n" +
  "6.278	1.307	0.184	-0.158	-0.118\n" +
  "6.296	1.314	0.139	-0.159	-0.118\n" +
  "6.306	1.320	0.094	-0.159	-0.119\n" +
  "6.308	1.324	0.048	-0.160	-0.119\n" +
  "6.302	1.326	0.002	-0.160	-0.119\n" +
  "6.289	1.327	-0.044	-0.160	-0.119\n" +
  "6.289	1.327	-0.044	-0.160	-0.119\n" +
  "6.268	1.326	-0.090	-0.160	-0.119\n" +
  "6.239	1.324	-0.136	-0.160	-0.119\n" +
  "6.203	1.320	-0.182	-0.159	-0.119\n" +
  "6.160	1.314	-0.226	-0.159	-0.118\n" +
  "6.109	1.307	-0.270	-0.158	-0.118\n" +
  "6.051	1.298	-0.313	-0.157	-0.117\n" +
  "5.986	1.288	-0.354	-0.156	-0.116\n" +
  "5.915	1.276	-0.394	-0.154	-0.115\n" +
  "5.836	1.262	-0.432	-0.153	-0.114\n" +
  "5.751	1.247	-0.468	-0.151	-0.112\n" +
  "5.660	1.230	-0.502	-0.149	-0.111\n" +
  "5.562	1.212	-0.533	-0.147	-0.109\n" +
  "5.458	1.193	-0.562	-0.144	-0.107\n" +
  "5.348	1.172	-0.589	-0.142	-0.106\n" +
  "5.233	1.149	-0.613	-0.139	-0.103\n" +
  "5.111	1.125	-0.634	-0.136	-0.101\n" +
  "4.985	1.100	-0.652	-0.133	-0.099\n" +
  "4.853	1.074	-0.667	-0.130	-0.097\n" +
  "4.716	1.046	-0.678	-0.126	-0.094\n" +
  "4.575	1.017	-0.687	-0.123	-0.092\n" +
  "4.428	0.986	-0.693	-0.119	-0.089\n" +
  "4.277	0.955	-0.695	-0.115	-0.086\n" +
  "4.122	0.922	-0.694	-0.111	-0.083\n" +
  "3.963	0.888	-0.689	-0.107	-0.080\n" +
  "3.799	0.853	-0.682	-0.103	-0.077\n" +
  "3.632	0.817	-0.671	-0.099	-0.074\n" +
  "3.462	0.780	-0.657	-0.094	-0.070\n" +
  "3.288	0.742	-0.640	-0.090	-0.067\n" +
  "3.111	0.703	-0.620	-0.085	-0.063\n" +
  "2.931	0.663	-0.597	-0.080	-0.060\n" +
  "2.748	0.623	-0.571	-0.075	-0.056\n" +
  "2.562	0.582	-0.542	-0.070	-0.052\n" +
  "2.375	0.540	-0.511	-0.065	-0.049\n" +
  "2.184	0.497	-0.477	-0.060	-0.045\n" +
  "1.992	0.454	-0.442	-0.055	-0.041\n" +
  "1.798	0.410	-0.404	-0.050	-0.037\n" +
  "1.603	0.366	-0.364	-0.044	-0.033\n" +
  "1.406	0.321	-0.322	-0.039	-0.029\n" +
  "1.207	0.276	-0.279	-0.033	-0.025\n" +
  "1.008	0.230	-0.235	-0.028	-0.021\n" +
  "0.807	0.185	-0.189	-0.022	-0.017\n" +
  "0.606	0.139	-0.143	-0.017	-0.012\n" +
  "0.404	0.093	-0.095	-0.011	-0.008\n" +
  "0.202	0.046	-0.048	-0.006	-0.004\n" +
  "0.000	0.000	-0.000	-0.000	-0.000";
LUNAR_ANOMALIES = LUNAR_ANOMALIES.split("\n");
for (var i = 0; i < LUNAR_ANOMALIES.length; i++) {
  LUNAR_ANOMALIES[i] = LUNAR_ANOMALIES[i].split("\t");
  for (var j = 0; j < LUNAR_ANOMALIES[i].length; j++)
    LUNAR_ANOMALIES[i][j] = parseFloat(LUNAR_ANOMALIES[i][j]);
}
function getAnomaly(degree, num) {
  var anomaly1, anomaly2;
  if (degree <= 180) {
    anomaly1 = LUNAR_ANOMALIES[Math.floor(degree/2.0)][num];
    anomaly2 = LUNAR_ANOMALIES[Math.ceil(degree/2.0)][num];
  } else {
    degree -= 180;
    anomaly1 = LUNAR_ANOMALIES[Math.floor(degree/2.0)][num]*-1;
    anomaly2 = LUNAR_ANOMALIES[Math.ceil(degree/2.0)][num]*-1;
  }
  return (anomaly1+anomaly2)/2.0;
}
function moonpos(jd, timezone=null) {
  var t, sunCalc, Ls, Ms, aL, aM, aF, D, L, q, eLat,
    T, a1, a2, a3, a4, a5, elongation, epsilon,
    q1, q2, q3, q4, q5, meanAnomaly, F, latitude,
    Dec, RA, P, deltaPsi, obliquity, hourAngle,
    ra, dec, aL, E, M;
  if (timezone == null) jd_local = jd - timeZone(1, jd);
  else jd_local = jd - (timezone/24.0);
  t = (jd_local - J2000);
  T = t/36525.0;
  sunCalc = sunpos(jd);
  Ls = sunCalc[4];
  Ms = sunCalc[1];
  //aL = modPos(218.3164477 + 13.1764*t);
  aL = 218.3164477 + 481267.88123423*T
    - 0.0015786*T*T + T*T*T/538841.0 - T*T*T*T/65194000.0;
  aM = fixangle(13.0650*t + 134.916);
  aF = fixangle(13.2294*t + 93.284);
  /*D = aL - Ls;
  a1 = Math.round(modPos(aM));
  a2 = Math.round(modPos(2*D - aM));
  a3 = Math.round(modPos(D));
  a4 = Math.round(modPos(Ms));
  a5 = Math.round(modPos(2 * aF));
  q1 = getAnomaly(a1, 0);
  q2 = getAnomaly(a2, 1);
  q3 = getAnomaly(a3, 2);
  q4 = getAnomaly(a4, 3);
  q5 = getAnomaly(a5, 4);
  L = aL + q1+q2+q3+q4+q5; */
  L = aL;

  deltaPsi = nutation(jd_local)[0];
  elongation = fixangle(297.8501921 + 445267.1114034*T - 0.0018819*T*T +
      T*T*T/545868.0 - T*T*T*T/113065000.0);
  meanAnomaly = fixangle(134.9633964 + 477198.8675055*T + 0.0087414*T*T +
    T*T*T/69699.0 - T*T*T*T/14712000.0);
  F = fixangle(93.2720950 + 483202.0175233*T - 0.0036539*T*T - T*T*T/3526000.0
    + T*T*T*T/863310000.0);
  E = fixangle(1 - 0.002516*T - 0.0000074*T*T);
  M = fixangle(357.5291092 + 3599.0502909*T - 0.0001536*T*T +
    T*T*T/24490000.0);
  var d = elongation;
  var mp = meanAnomaly;
  var sumL = 6288774*dsin(mp) + 1274027*dsin(2*d - mp) + 658314*dsin(2*d) +
    213618*dsin(2*mp) - 185116*E*dsin(M) - 114332*dsin(2*F) + 58793*dsin(2*d - 2*mp) +
    57066*E*dsin(2*d - M - mp) + 53322*dsin(2*d + mp) + 45758*E*dsin(2*d - 2*M)
    - 40923*E*dsin(M - mp) - 34720*dsin(d) - 30383*E*dsin(M + mp) + 15327*dsin(2*d - 2*F);
  L += sumL/1000000.0;
  aL = L + deltaPsi;
  latitude = 5128122*dsin(F) + 280602*dsin(meanAnomaly + F) + 277693*dsin(meanAnomaly - F) + 173237*dsin(2*elongation*F) +
    55413*dsin(2*elongation - meanAnomaly + F) + 46271*dsin(2*elongation - meanAnomaly - F) + 32573*dsin(2*elongation + F) +
    17198*dsin(2*meanAnomaly + F) + 9266*dsin(2*elongation + meanAnomaly - F) + 8822*dsin(2*meanAnomaly - F) +
    4324*dsin(2*elongation - 2*meanAnomaly - F) + 4200*dsin(2*elongation + meanAnomaly + F);
  latitude -= 2235 * dsin(L);
  latitude = fixangle(latitude/1000000.0);
  if (latitude > 180.0) latitude -= 360.0;
  let pos = ecliptoeq(jd_local, aL, latitude);
  RA = pos[0];
  Dec = pos[1];
  obliquity = obliqeq(jd_local);
  let se = dsin(obliquity);
  let ce = dcos(obliquity);
  let sm = dsin(aL);
  ra = fixangle(rtd(Math.atan2(sm*ce - dtan(latitude)*se, dcos(aL))));
  dec = fixangle(rtd(Math.asin(dsin(latitude)*ce + dcos(latitude)*se*sm)));
  P = fixangle(rtd(Math.atan2( dcos(sunCalc[11])*dsin(sunCalc[10]-ra),
        dsin(sunCalc[11])*dcos(dec) - dcos(sunCalc[11])*dsin(dec)*dcos(sunCalc[10]-ra))));
  hourAngle = fixangle(280.46061837 + 360.98564736629*(jd_local-J2000) +
    0.000387933*T*T - T*T*T/38710000 + deltaPsi*dcos(obliquity)) + getLongitude() - ra;
  eLat = getLatitude();
  q = rtd(Math.atan2(dsin(hourAngle), dtan(eLat)*dcos(dec) - dsin(dec)*dcos(hourAngle)));
  D = 385000560.0;
  D -= 20905355*dcos(meanAnomaly) + 3699111*dcos(2*elongation - meanAnomaly) + 2955968*dcos(2*elongation)
    + 569925*dcos(2*meanAnomaly) + 48888*E*dcos(sunCalc[1]) + 3149*dcos(2*F) - 246158*dcos(2*elongation-2*meanAnomaly)
    + 152138*E*dcos(2*elongation - sunCalc[1] - meanAnomaly) + 170733*dcos(2*elongation + meanAnomaly) +
    204586*E*dcos(2*elongation - sunCalc[1]) + 129620*E*dcos(sunCalc[1] - meanAnomaly) - 108743*dcos(elongation)
    - 104755*E*dcos(sunCalc[1] + meanAnomaly) - 10321*dcos(2*elongation - 2*F) - 79661*dcos(2*meanAnomaly - 2*F)
    + 34782*dcos(4*elongation - meanAnomaly) + 23210*dcos(3*meanAnomaly) + 21636*dcos(4*elongation - 2*meanAnomaly)
    - 30824*E*dcos(2*elongation + sunCalc[1]) + 8379*dcos(2*elongation - meanAnomaly) + 16675*E*dcos(elongation + sunCalc[1])
    + 12831*E*dcos(2*elongation - sunCalc[1] + meanAnomaly) + 10445*dcos(2*elongation + 2*meanAnomaly)
    + 11650*dcos(4*elongation) -14403*dcos(2*elongation - 3*meanAnomaly) + 7003*E*dcos(sunCalc[1] - 2*meanAnomaly)
    - 10056*E*dcos(2*elongation - sunCalc[1] - 2*meanAnomaly) - 6322*dcos(elongation + meanAnomaly)
    + 9884*E*E*dcos(2*elongation - 2*sunCalc[1]) - 5751*E*dcos(sunCalc[1] + 2*meanAnomaly) +
    4950*E*E*dcos(2*elongation - 2*sunCalc[1] - meanAnomaly) - 4130*dcos(2*elongation + meanAnomaly - 2*F);
  return new Array(fixangle(aL),            // [0] Apparent longitude of the moon
                  fixangle(L),              // [1] Mean longitude of the moon
                  elongation,             // [2] Mean elongation of the moon
                  meanAnomaly,            // [3] Mean anomaly of the moon
                  F,                      // [4] Argument of latitude of the moon
                  latitude,               // [5] Latitude of the moon
                  RA,                     // [6] True right ascension of the moon
                  Dec,                    // [7] True declination of the moon
                  P,                      // [8] Position angle of the moon's bright limb
                                          //     eastward from the moon's North Point
                  hourAngle,              // [9] Hour angle of the moon
                  fixangle(q),              // [10] Parallactic angle of the moon
                  fixangle(P - q),          /* [11] Position angle of the moon's bright limb
                                                  as seen by an observer on Earth */
                  ra,                     // [12] Apparent right ascension of the moon
                  dec,                    // [13] Apparent declination of the moon
                  D/1000.0                // [14] Distance in km to the moon

  );
}
function moonpos2(jd) {
  var h, elongation, lat, altitude,
    azimuth, declination, moon;
  moon = moonpos(jd);
  declination = moon[13];
  h = moon[9];
  lat = getLatitude();
  azimuth = fixangle(180.0 + rtd(Math.atan2( dsin(h), dcos(h)*dsin(lat) -
    dtan(declination)*dcos(lat) )));
  var parallaxCorr = 6371.0/moon[14];
  altitude = rtd( Math.asin( dsin(lat)*dsin(declination) +
    dcos(lat)*dcos(declination)*dcos(h) ) );
  parallaxCorr = rtd(Math.asin(parallaxCorr * dcos(altitude)));
  var r = (altitude + 10.3/(altitude + 5.11));
  r = 0.017/dtan(r);
  altitude += r - parallaxCorr;
  if (altitude > 180.0) altitude -= 360.0;
  return new Array(fixangle(azimuth), altitude);
}

/*  EQUATIONOFTIME  --  Compute equation of time for a given moment.
                        Returns the equation of time as a fraction of
                        a day.  */

function equationOfTime(jd, timezone=null)
{
    var EoT, m, l, sun;
    sun = sunpos(jd, timezone);
    m = sun[1];
    l = sun[4];
    EoT = 0.0053*dsin(m) - 0.0069*dsin(2*l);
    return EoT;
}

function sunTimes(date, type) {
  let j = gregorian_to_jd(date[0], date[1]+1, date[2]);
  var declination = sunpos(j)[9];
  var latitude = getLatitude();
  var longitude = getLongitude();
  var angle;
  if (type == 0 || type == 1) angle = -(5/6.0);
  else if (type == -0.5) angle = -ISLAMIC_CALCULATIONS[document.islamic.calculation.value][0];
  else if (type == 2.5) angle = -ISLAMIC_CALCULATIONS[document.islamic.calculation.value][1];
  else if (type == -0.1 || type == 1.1) angle = -6;
  else if (type == -0.2 || type == 1.2) angle = -12;
  else if (type == -0.3 || type == 1.3) angle = -18;
  else angle = 0;
  var hour =
    (dsin(angle)-dsin(latitude)*dsin(declination))/
    (dcos(latitude)*dcos(declination))
  ;
  if (type == 2.1) {
    hour = (Math.sin(Math.atan(1/(new Number(document.islamic.asr.value) + dtan(latitude - declination)))) - dsin(latitude)*dsin(declination))/
           (dcos(latitude)*dcos(declination));
  }
  hour = Math.acos(hour)/Math.PI*12;
  var solarNoon = 12.0 + equationOfTime(j)*24.0 + timeZone(0, j) - (longitude/15.0);
  if (type == 0 || type == -0.5 || type == -0.1 ||
      type == -0.2 || type == -0.3)
    hour = solarNoon - hour;
  else if (type == 1 || type == 2.5 || type == 2.1 || type == 1.1 ||
      type == 1.2 || type == 1.3)
    hour = solarNoon + hour;
  else
    hour = solarNoon;
  var minute = (hour % 1.0)*60.0;
  if (isNaN(hour)) {
    hour = NaN;
    minute = NaN;
  }
  return new Array(Math.floor(hour), Math.floor(minute));
}
function sunTimes_jd(jd, type, hindu=false) {
  if (hindu) FORCE_INDIA = document.hinducalendar.india.checked;
  let date = jd_to_gregorian(jd);
  date[1]--;
  let time = sunTimes(date, type);
  time[0] %= 24.0;
  FORCE_INDIA = false;
  return (time[0]/24.0 + time[1]/1440.0);
}
function moonTimes_jd(jd, type) {
  var originalJd = jd;
  var transit = modPos(sunTimes_jd(jd, 2)+tithi(Math.floor(jd-0.5)+0.5+sunTimes_jd(jd, 2))/30.0, 1.0) + Math.floor(jd-0.5)+0.5,
      i = 0;
  transit = modPos(transit-0.5, 1.0);
  var moon = moonpos(transit);
  var ra = moon[12];
  transit = fixangle((moon[9] + getLongitude()))/360.0;
  if (type == 2) {
    transit += Math.floor(jd-0.5)+0.5;
    jd = transit;
    var E, rightChange, leftChange, change;
    for (var i = 0; i < 30; i++) {
      E = moonpos2(jd)[1];
      change = 0.05*((31-i)/30.0);
      rightChange = moonpos2(jd+change)[1] - E;
      leftChange = moonpos2(jd-change)[1] - E;
      if (rightChange > 0) jd += change;
      else if (leftChange > 0) jd -= change;
      i++;
    }
    transit = modPos(jd+0.5, 1);
    return new Array(transit, 0);
  }
  var h0 = 0;
  //if (type == 0 || type == 1) h0 = -0.833333333;
  if (type == 0 || type == 1) h0 = -0.26666667; // Refraction already accounted for in altitude calculations
  var estimate = modPos(sunTimes_jd(jd, type)-sunTimes_jd(jd,2)+tithi(jd+sunTimes_jd(jd, type))/30.0, 1.0)
                    + Math.floor(jd-0.5)+0.5;
  moon = moonpos(estimate);
  var cosH0 = (dsin(h0) - dsin(getLatitude())*dsin(moon[13]))/
    (dcos(getLatitude())*dcos(moon[13]));
  var hour = Math.acos(cosH0)/(2*Math.PI);
  var time;
  if (type == 0) time = transit - hour;
  if (type == 1) time = transit + hour;
  estimate = time + Math.floor(jd+0.5)-0.5;
  moon = moonpos(estimate);
  cosH0 = (dsin(h0) - dsin(getLatitude())*dsin(moon[13]))/
    (dcos(getLatitude())*dcos(moon[13]));
  hour = Math.acos(cosH0)/(2*Math.PI);
  if (type == 0) time = transit - hour;
  if (type == 1) time = transit + hour;
  if (!isNaN(hour)) {
    var dE, E;
    jd = estimate;
    while (Math.abs(moonpos2(jd)[1] - h0) > 0.25 && i < 25) {
      E = moonpos2(jd)[1];
      dE = moonpos2(jd+0.05)[1] - E;
      if (dE > 0) dE = 0.1;
      else dE = -0.1;
      dE *= ((25-i)/25.0);
      if (E < h0)
        jd += dE;
      else jd -= dE;
      i++;
    }
    time = (jd+0.5)%1.0;
  }
  var dayDiff = Math.floor(jd+0.5)-0.5;
  dayDiff -= Math.floor(originalJd+0.5)-0.5;
  return new Array(time, dayDiff);
}

function qibla() {
  var latitude = getLatitude();
  var longitude = getLongitude();
  if (longitude <= 39.8262 - 180.0) {
    longitude += 360.0;
  }
  var ns = KAABA_LATITUDE - latitude;
  var ew = KAABA_LONGITUDE - longitude;
  if (ew == 0) {
    if (ns > 0)
      return 90.0;
    else
      return 0.0;
  }
  var y = dsin(ew) * dcos(KAABA_LATITUDE);
  var x = dcos(latitude)*dsin(KAABA_LATITUDE) -
          dsin(latitude)*dcos(KAABA_LATITUDE)*dcos(ew);
  var angle = Math.atan2(y, x);
  return Math.PI/2.0 - angle; // For drawing the Qibla compass, it is easier to use 0 degrees as East
}

function timeZone(type, j=null) {
  // type=0: hours, type=1: days
  if (FORCE_INDIA) {
    if (type == 1) return 5.5/24.0;
    else return 5.5;
  }
  if (FORCE_MECCA) {
    if (type == 1) return 3.0/24.0;
    else return 3.0;
  }
  if (FORCE_BEIJING) {
    if (type == 1) return 8.0/24.0;
    else return 8.0;
  }
  if (j == null) j = document.julianday.day.value;
  var offset = document.basic.timezone2.value * [1, -1][document.basic.timezone1.selectedIndex];
  if (is_dst(j)) offset++;
  if (type == 1)
    offset /= 24.0;
  return offset;
}

// Returns most recent time before a given Julian day for a phase of the moon
function moonPhaseBefore(jd, phase=0, notNow=false, trueAmavasya=false) {
  // phase: 0 is new moon, 1 is full moon
  // notNow: if currently at phase, find time before now
  // trueAmavasya: Use amavasya as defined by the Hindu calendar (right before new moon)
  let goalTithi = [0, 15][phase];
  let newJd = jd;
  if (!notNow && Math.floor(tithi(newJd, trueAmavasya)*20) == goalTithi*20) return jd;
  if (notNow) {
    while (Math.floor(tithi(newJd, trueAmavasya)*30) == goalTithi*30)
      newJd -= 10;
  }
  while (Math.floor(tithi(newJd, trueAmavasya)/3.0) != goalTithi/3.0)
    newJd -= (2.0);
  newJd += 2.0;
  while (Math.floor(tithi(newJd, trueAmavasya)) != goalTithi)
    newJd -= (0.2);
  newJd += 0.2;
  while (Math.floor(tithi(newJd, trueAmavasya)*10) != goalTithi*10)
    newJd -= (0.02);
  while (Math.floor(tithi(newJd, trueAmavasya)*30) != goalTithi*30)
    newJd -= (0.002);
  if (newJd > jd) return moonPhaseBefore(jd-2, phase, notNow, trueAmavasya);
  return newJd;
}
// Returns closest time after a given Julian day for a phase of the moon
function moonPhaseAfter(jd, phase=0, notNow=false, trueAmavasya=false) {
  // phase: 0 is new moon, 1 is full moon
  // notNow: if currently at phase, find time after now
  let goalTithi = [0, 15][phase];
  let newJd = jd;
  if (!notNow && Math.floor(tithi(newJd, trueAmavasya)*20) == goalTithi*20) return jd;
  if (notNow) {
    while (Math.floor(tithi(newJd, trueAmavasya)*30) == goalTithi*30)
      newJd += 10;
  }
  while (Math.floor(tithi(newJd, trueAmavasya)/3.0) != goalTithi/3.0)
    newJd += (2.0);
  newJd -= 2.0;
  while (Math.floor(tithi(newJd, trueAmavasya)) != goalTithi)
    newJd += (0.2);
  newJd -= 0.2;
  while (Math.floor(tithi(newJd, trueAmavasya)*10) != goalTithi*10)
    newJd += (0.02);
  while (Math.floor(tithi(newJd, trueAmavasya)*30) != goalTithi*30)
    newJd += (0.002);
  if (newJd < jd) return moonPhaseAfter(jd+2, phase, notNow, trueAmavasya);
  return newJd;
}

// Returns the sidereal zodiac for a Julian day
function getZodiac(jd, suryaSiddhantha=false, giveAngle=false) {
  let year = jd_to_gregorian(jd)[0];
  let zodiacStart = ZodiacStart1;
  if (Math.abs(year - 285) > Math.abs(year - 2019))
    zodiacStart = ZodiacStart2;
  let ayanamsha = sunpos(jd)[13];
  let zodiacShift = Math.floor(ayanamsha/30.0);
  if (zodiacShift < 0) zodiacShift = Math.ceil(ayanamsha/30.0); // -2.5 should be -2, not -3 (closest to 0)
  let zodiac = sunpos(jd)[12]/30.0;
  if (suryaSiddhantha) zodiac = sunpos(jd)[14]/30.0;
  var adjustForPrecession = false;
  if (!giveAngle) {
    zodiac = Math.floor(zodiac) + 1;
    if (adjustForPrecession) {
      zodiac += zodiacShift;
      zodiac %= 12;
      if (zodiac < 1) zodiac += 12;
  }}
  return zodiac;
}

function getLatitude() {
  if (FORCE_INDIA) return 23.18;
  if (FORCE_MECCA) return 21.39;
  var coord = document.basic.latitude.value.split(" ");
  var latitude = 0.0;
  for (var i = 0; i < coord.length; i++) {
    if (i == 0) latitude += coord[i]/(Math.pow(60.0, i));
    else {
      if (coord[0] > 0) latitude += coord[i]/(Math.pow(60.0, i));
      else latitude -= coord[i]/(Math.pow(60.0, i));
  }}
  latitude *= [1, -1][document.basic.NS.selectedIndex];
  return latitude;
}
function getLongitude() {
  if (FORCE_INDIA) return 82.5;
  if (FORCE_MECCA) return 39.86;
  var coord = document.basic.longitude.value.split(" ");
  var longitude = 0.0;
  for (var i = 0; i < coord.length; i++) {
    if (i == 0) longitude += coord[i]/(Math.pow(60.0, i));
    else {
      if (coord[0] > 0) longitude += coord[i]/(Math.pow(60.0, i));
      else longitude -= coord[i]/(Math.pow(60.0, i));
  }}
  longitude *= [1, -1][document.basic.EW.selectedIndex];
  return longitude;
}
