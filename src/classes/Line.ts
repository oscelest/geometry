import Point, {SimplePoint} from "./Point";

export default class Line {

  public a: SimplePoint;
  public b: SimplePoint;

  constructor(a: SimplePoint, b: SimplePoint) {
    this.a = a;
    this.b = b;
  }

  public static fromSimpleLine(line: SimpleLine) {
    return new this(line.a, line.b);
  }

  public static getFormula(source: SimpleLine) {
    return this.fromSimpleLine(source).getFormula();
  }

  public static getLength(line: SimpleLine) {
    return this.fromSimpleLine(line).getLength();
  }

  public static getIntersection(source: SimpleLine, target: SimpleLine) {
    return this.fromSimpleLine(source).getIntersection(target);
  }

  public static getCenterPoint(source: SimpleLine) {
    return this.fromSimpleLine(source).getCenterPoint();
  }

  public clone() {
    return new Line(this.a, this.b);
  }

  public getFormula() {
    return {a: this.a.y - this.b.y, b: this.b.x - this.a.x, c: this.a.x * this.b.y - this.b.x * this.a.y};
  }

  public getLength() {
    return Math.sqrt(Math.pow(this.b.x - this.a.x, 2) + Math.pow(this.b.y - this.a.y, 2));
  }

  public getIntersection(target: SimpleLine) {
    const l1 = this.getFormula();
    const l2 = Line.getFormula(target);

    const determinant = l1.a * l2.b - l2.a * l1.b;
    return {x: -(l2.b * l1.c - l1.b * l2.c) / determinant, y: -(l1.a * l2.c - l2.a * l1.c) / determinant};
  }

  public getCenterPoint() {
    return new Point((this.a.x + this.b.x) / 2, (this.a.y + this.b.y) / 2);
  }
}

export interface SimpleLine {
  a: SimplePoint;
  b: SimplePoint;
}
