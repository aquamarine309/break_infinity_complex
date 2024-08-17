import Decimal from "break_infinity.js";

function C(x, y) {
  return new Complex(x, y);
}

function R(x) {
  if (x instanceof Complex) return x;
  return C(x, 0);
}

function MA(module, arg) {
  return Complex.fromModuleArgument(module, arg);
}

function D(x) {
  if (x instanceof Decimal) return x;
  return new Decimal(x);
}

function I(x) {
  return new Complex(0, x);
}

class Complex {
  constructor(re, im) {
    if (im === undefined) {
      if (re instanceof Complex) {
        this.fromComplex(re);
        return;
      } if (typeof re === "string") {
        this.fromString(re);
        return;
      }
    }
    this.re = D(re ?? 0);
    this.im = D(im ?? 0);
  }
}

Complex.fromString = function(value) {
  return new Complex().fromString(value);
}

Complex.fromComplex = function(comp) {
  return new Complex().fromComplex(comp);
}

Complex.fromModuleArgument = function(module, arg) {
  return new Complex().fromModuleArgument(module, arg);
}

Complex.add = function(comp1, comp2) {
  return R(comp1).add(R(comp2));
}

Complex.plus = function(comp1, comp2) {
  return R(comp1).add(R(comp2));
}

Complex.addReal = function(comp1, comp2) {
  return R(comp1).addReal(comp2);
}

Complex.plusReal = function(comp1, comp2) {
  return R(comp1).addReal(comp2);
}

Complex.minus = function(comp1, comp2) {
  return R(comp1).minus(R(comp2));
}

Complex.sub = function(comp1, comp2) {
  return R(comp1).minus(R(comp2));
}

Complex.subtract = function(comp1, comp2) {
  return R(comp1).minus(R(comp2));
}

Complex.minusReal = function(comp1, comp2) {
  return R(comp1).minusReal(comp2);
}

Complex.subReal = function(comp1, comp2) {
  return R(comp1).minusReal(comp2);
}

Complex.subtractReal = function(comp1, comp2) {
  return R(comp1).minusReal(comp2);
}

Complex.times = function(comp1, comp2) {
  return R(comp1).times(R(comp2));
}

Complex.mul = function(comp1, comp2) {
  return R(comp1).times(R(comp2));
}

Complex.multply = function(comp1, comp2) {
  return R(comp1).times(R(comp2));
}

Complex.timesReal = function(comp1, comp2) {
  return R(comp1).timesReal(comp2);
}

Complex.mulReal = function(comp1, comp2) {
  return R(comp1).timesReal(comp2);
}

Complex.multiplyReal = function(comp1, comp2) {
  return R(comp1).timesReal(comp2);
}

Complex.div = function(comp1, comp2) {
  return R(comp1).div(R(comp2));
}

Complex.divideBy = function(comp1, comp2) {
  return R(comp1).div(R(comp2));
}

Complex.dividedBy = function(comp1, comp2) {
  return R(comp1).div(R(comp2));
}

Complex.divReal = function(comp1, comp2) {
  return R(comp1).divReal(comp2);
}

Complex.divideByReal = function(comp1, comp2) {
  return R(comp1).divReal(comp2);
}

Complex.dividedByReal = function(comp1, comp2) {
  return R(comp1).divReal(comp2);
}

Complex.pow = function(comp1, comp2) {
  return R(comp1).pow(R(comp2));
}

Complex.powReal = function(comp1, comp2) {
  return R(comp1).powReal(comp2);
}

Complex.log = function(comp1, comp2) {
  return R(comp).log(R(comp2));
}

Complex.logReal = function(comp1, comp2) {
  return R(comp).logReal(comp2);
}

Complex.ln = function(comp) {
  return R(comp).ln();
}

Complex.log10 = function(comp) {
  return R(comp).log10();
}

Complex.log2 = function(comp) {
  return R(comp).log2();
}

Complex.exp = function(comp) {
  return R(comp).exp();
}

Complex.sin = function(comp) {
  return R(comp).sin();
}

Complex.arcsin = function(comp) {
  return R(comp).arcsin();
}

Complex.asin = function(comp) {
  return R(comp).arcsin();
}

Complex.eq = function(comp1, comp2) {
  return R(comp1).eq(R(comp2));
}

Complex.neq = function(comp1, comp2) {
  return R(comp1).neq(R(comp2));
}

Complex.gt = function(comp1, comp2) {
  return R(comp1).gt(R(comp2));
}

Complex.lt = function(comp1, comp2) {
  return R(comp1).lt(R(comp2));
}

Complex.gte = function(comp1, comp2) {
  return R(comp1).gte(R(comp2));
}

Complex.lte = function(comp1, comp2) {
  return R(comp1).lte(R(comp2));
}

Complex.eqz = function(comp) {
  return R(comp).eqz();
}

Complex.nez = function(comp) {
  return R(comp).nez();
}

Complex.prototype.fromString = function(value) {
  if (value === "NaN") {
    return this.fromComplex(Complex.NaN);
  }
  if (value === "i") {
    return this.fromComplex(Complex.unit);
  }
  if (value === "-i") {
    return this.fromComplex(Complex.unit).neg();
  }
  const matched = value.match(/^(.+)\s*(\+|-)\s*(.+)?i$/);
  if (matched) {
    const re = Decimal.fromString(matched[1]);
    const im = matched[3] ? Decimal.fromString(matched[3]) : new Decimal(1);
    this.re = re;
    this.im = matched[2] === "+" ? im : im.neg();
  } else {
    const newMatched = value.match(/^(.+)(i?)$/);
    this.fromComplex(Complex.zero);
    if (newMatched !== null) {
      const decimal = Decimal.fromString(newMatched[1]);
      if (newMatched[2]) {
        this.im = decimal;
      } else {
        this.re = decimal;
      }
    }
  }

  if (this.isNaN()) {
    throw Error("[ComplexError] Invalid argument: " + value);
  }

  return this;
}

Complex.prototype.fromComplex = function(comp) {
  this.re = comp.re;
  this.im = comp.im;
  return this;
}

Object.defineProperty(Complex.prototype, "module", {
  get: function get() {
    return this.re.pow(2).add(this.im.pow(2)).sqrt();
  }
});

Object.defineProperty(Complex.prototype, "arg", {
  get: function get() {
    if (this.eq(0)) return NaN;
    if (this.re.gt(0)) return Math.atan(this.im.div(this.re).toNumber());
    if (this.re.eq(0)) {
      if (this.im.gt(0)) return Math.PI / 2;
      return -Math.PI / 2;
    }
    if (this.re.lt(0)) {
      if (this.im.gte(0)) {
        return Math.atan(this.im.div(this.re).toNumber()) + Math.PI;
      } else {
        return Math.atan(this.im.div(this.re).toNumber()) - Math.PI;
      }
    }
  }
});

Complex.prototype.fromModuleArgument = function(module, arg) {
  const m = D(module);
  this.re = m.times(Math.cos(arg));
  this.im = m.times(Math.sin(arg));
  return this;
}

Object.defineProperty(Complex.prototype, "isReal", {
  get: function get() {
    return this.im.eq(0);
  }
});

Complex.prototype.add = function(comp) {
  return C(this.re.add(comp.re), this.im.add(comp.im));
}

Complex.prototype.plus = function(comp) {
  return this.add(comp);
}

Complex.prototype.addReal = function(re) {
  return C(this.re.add(re), this.im);
}

Complex.prototype.plusReal = function(re) {
  return this.addReal(re);
}

Complex.prototype.neg = function() {
  return C(this.re.neg(), this.im.neg());
}

Complex.prototype.conjugate = function() {
  return C(this.re, this.im.neg());
}

Complex.prototype.minus = function(comp) {
  return this.add(comp.neg());
}
Complex.prototype.sub = function(comp) {
  return this.minus(comp);
}

Complex.prototype.subtract = function(comp) {
  return this.minus(comp);
}

Complex.prototype.minusReal = function(re) {
  return this.addReal(D(re).neg());
}

Complex.prototype.subReal = function(re) {
  return this.minusReal(re);
}

Complex.prototype.subtractReal = function(re) {
  return this.minusReal(re);
}

Complex.prototype.times = function(comp) {
  if (this.isReal) return comp.timesReal(this.re);
  if (comp.isReal) return this.timesReal(comp.re);
  return C(this.re.times(comp.re).minus(this.im.times(comp.im)), this.re.times(comp.im).add(this.im.times(comp.re)));
}

Complex.prototype.mul = function(comp) {
  return this.times(comp);
}

Complex.prototype.multply = function(comp) {
  return this.times(comp);
}

Complex.prototype.timesReal = function(re) {
  return C(this.re.times(re), this.im.times(re));
}

Complex.prototype.mulReal = function(re) {
  return this.timesReal(re);
}

Complex.prototype.multplyReal = function(re) {
  return this.timesReal(re);
}

Complex.prototype.timesI = function() {
  return C(this.im.neg(), this.re);
}

Complex.prototype.mulI = function(re) {
  return this.timesI(re);
}

Complex.prototype.multplyI = function(re) {
  return this.timesI(re);
}

Complex.prototype.eqz = function() {
  return this.re.eq(0) && this.im.eq(0);
}

Complex.prototype.nez = function() {
  return !this.eqz();
}

Complex.prototype.gt = function(comp) {
  if (this.isReal && comp.isReal) return this.re.gt(comp.re);
  throw new Error("[ComplexError]Complex cannot be compared.");
  // return this.module.gt(R(comp).module);
}

Complex.prototype.lt = function(comp) {
  if (this.isReal && comp.isReal) return this.re.lt(comp.re);
  throw new Error("[ComplexError]Complex cannot be compared.");
  // return this.module.lt(R(comp).module);
}

Complex.prototype.gte = function(comp) {
  return !this.lt(comp);
}

Complex.prototype.lte = function(comp) {
  return !this.gt(comp);
}

Complex.prototype.neq = function(comp) {
  return !this.eq(comp);
}

Complex.prototype.eq = function(x) {
  const comp = R(x);
  return this.re.eq(comp.re) && this.im.eq(comp.im);
}

Complex.prototype.div = function(comp) {
  if (comp.isReal) return C(this.re.div(comp.re), this.im.div(comp.im));
  return this.times(comp.recip());
}

Complex.prototype.divideBy = function(comp) {
  return this.div(comp);
}

Complex.prototype.dividedBy = function(comp) {
  return this.div(comp);
}

Complex.prototype.divReal = function(re) {
  return C(this.re.div(re), this.im.div(re));
}

Complex.prototype.divideByReal = function(comp) {
  return this.divReal(comp);
}

Complex.prototype.dividedByReal = function(comp) {
  return this.divReal(comp);
}

Complex.prototype.divI = function() {
  return this.timesI().neg();
}

Complex.prototype.divideByI = function() {
  return this.divI();
}

Complex.prototype.dividedByI = function() {
  return this.divI();
}

Complex.prototype.recip = function() {
  if (this.eqz()) return Complex.fromComplex(Complex.Infinity);
  if (this.im.eq(0)) return C(this.re.recip(), 0);
  return this.conjugate().timesReal(this.re.pow(2).add(this.im.pow(2)).recip());
}

Complex.prototype.sin = function() {
  return this.timesI().exp().minus(this.neg().timesI().exp()).divReal(2).divI();
}

Complex.prototype.cos = function() {
  return this.timesI().exp().add(this.neg().timesI().exp()).divReal(2);
}

Complex.prototype.tan = function() {
  return this.sin().div(this.cos());
}

Complex.prototype.cot = function() {
  return this.cos().div(this.sin());;
}

Complex.prototype.arcsin = function() {
  return this.sqr().minusReal(1).sqrt().minus(this).timesI().ln().timesI();
}

Complex.prototype.asin = function() {
  return this.arcsin();
}

Complex.prototype.arccos = function() {
  return this.sqr().minusReal(1).sqrt().add(this).ln().timesI().neg();
}

Complex.prototype.acos = function() {
  return this.arccos();
}

Complex.prototype.arctan = function() {
  return this.timesI().addReal(1).div(this.timesI().minusReal(1).neg()).ln().divI().divReal(2);
}

Complex.prototype.atan = function() {
  return this.arctan();
}

Complex.prototype.ln = function() {
  return C(this.module.ln(), this.arg);
}

Complex.prototype.log10 = function() {
  return this.ln().timesReal(Math.LOG10E);
}

Complex.prototype.log2 = function() {
  return this.ln().timesReal(Math.LOG2E);
}

Complex.prototype.log = function(comp) {
  return this.ln().div(comp.ln());
}

Complex.prototype.logReal = function(re) {
  return this.ln().div(D(re).ln());
}

Complex.prototype.powI = function() {
  return C(Math.cos(this.module.ln()), Math.sin(this.module.ln())).timesReal(D(this.arg).neg().exp());
}

Complex.prototype.pow = function(comp) {
  if (comp.eqz()) return R(1);
  if (this.eqz()) return R(0);
  if (comp.eq(1)) return this;
  if (this.eq(1)) return R(1);
  if (comp.isReal) {
    return this.powReal(comp.re);
  }
  if (comp.re.eq(0)) {
    return this.powI().powReal(comp.im);
  }
  return this.powReal(comp.re).times(this.powI().powReal(comp.im));
}

Complex.prototype.powReal = function(re) {
  if (this.eqz()) return Complex.zero;
  return MA(this.module.pow(re), this.arg * re);
}

Complex.prototype.sqr = function() {
  return this.powReal(2);
}

Complex.prototype.sqrt = function() {
  return this.powReal(0.5);
}

Complex.prototype.cbrt = function() {
  return this.powReal(1 / 3);
}

Complex.prototype.isNaN = function() {
  return isNaN(this.re.mantissa) ||
    isNaN(this.re.exponent) ||
    isNaN(this.im.mantissa) ||
    isNaN(this.im.exponent);
}

Complex.prototype.exp = function() {
  return R(Math.E).pow(this);
}

Complex.prototype.toString = function() {
  if (this.im.eq(0)) return this.re.toString();
  if (this.re.eq(0)) return `${this.im.eq(1) ? "" : this.im.toString()}i`;
  const sign = this.im.gte(0) ? "+" : "-";
  return `${this.re}${sign}${this.im.abs()}i`;
}

Complex.prototype.valueOf = function() {
  throw new Error("Implicit conversion from Complex to number");
}

Complex.prototype.toJSON = function() {
  return this.toString();
}

Complex.zero = R(0);
Complex.unit = I(1);
Complex.NaN = C(NaN, NaN);
Complex.Infinity = C(Infinity, Infinity);

export default Complex;