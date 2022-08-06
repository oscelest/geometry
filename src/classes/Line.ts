import Point, {SimplePoint} from "./Point";

export default class Line {

  public a: SimplePoint;
  public b: SimplePoint;

  constructor(a: SimplePoint, b: SimplePoint) {
    this.a = a;
    this.b = b;
  }

  public static fromSimpleLine(source: SimpleLine): Line {
    return new this(source.a, source.b);
  }

  public static getLength(line: SimpleLine): number {
    return this.fromSimpleLine(line).getLength();
  }

  public static getCenterPoint(source: SimpleLine): Point {
    return this.fromSimpleLine(source).getCenterPoint();
  }

  public static getFormula(source: SimpleLine): {a: number; b: number; c: number} {
    return this.fromSimpleLine(source).getFormula();
  }

  public static getIntersection(source: SimpleLine, target: SimpleLine): Point {
    return this.fromSimpleLine(source).getIntersection(target);
  }

  public clone(): Line {
    return new Line(this.a, this.b);
  }

  public getLength(): number {
    return Math.sqrt(Math.pow(this.b.x - this.a.x, 2) + Math.pow(this.b.y - this.a.y, 2));
  }

  public getCenterPoint(): Point {
    return new Point((this.a.x + this.b.x) / 2, (this.a.y + this.b.y) / 2);
  }

  public getFormula(): {a: number; b: number; c: number} {
    return {a: this.a.y - this.b.y, b: this.b.x - this.a.x, c: this.a.x * this.b.y - this.b.x * this.a.y};
  }

  public getIntersection(target: SimpleLine): Point {
    const l1: {a: number; b: number; c: number} = this.getFormula();
    const l2: {a: number; b: number; c: number} = Line.getFormula(target);

    const d: number = l1.a * l2.b - l2.a * l1.b;
    return new Point(-(l2.b * l1.c - l1.b * l2.c) / d, -(l1.a * l2.c - l2.a * l1.c) / d);
  }

}

export interface SimpleLine {
  a: SimplePoint;
  b: SimplePoint;
}
