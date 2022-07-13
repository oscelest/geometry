import Point, {SimplePoint} from "./Point";
import Line from "./Line";

export default class Triangle {

  public a: Point;
  public b: Point;
  public c: Point;

  constructor(a: SimplePoint, b: SimplePoint, c: SimplePoint) {
    this.a = Point.fromSimplePoint(a);
    this.b = Point.fromSimplePoint(b);
    this.c = Point.fromSimplePoint(c);
  }

  public static fromSimpleTriangle(line: SimpleTriangle) {
    return new Triangle(line.a, line.b, line.c);
  }

  public clone() {
    return new Triangle(this.a, this.b, this.c);
  }

  public getAngleAInRadians() {
    return Math.abs(Math.atan2(this.c.y - this.a.y, this.c.x - this.a.x) - Math.atan2(this.b.y - this.a.y, this.b.x - this.a.x));
  }

  public static getAngleAInRadians(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleAInRadians()
  }

  public getAngleAInDegrees() {
    return this.getAngleAInRadians() * 180 / Math.PI;
  }

  public static getAngleAInDegrees(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleAInDegrees()
  }

  public getAngleBInRadians() {
    return Math.abs(Math.atan2(this.a.y - this.b.y, this.a.x - this.b.x) - Math.atan2(this.c.y - this.b.y, this.c.x - this.b.x));
  }

  public static getAngleBInRadians(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleBInRadians()
  }

  public getAngleBInDegrees() {
    return this.getAngleBInRadians() * 180 / Math.PI;
  }

  public static getAngleBInDegrees(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleBInDegrees()
  }

  public getAngleCInRadians() {
    return Math.abs(Math.atan2(this.a.y - this.c.y, this.a.x - this.c.x) - Math.atan2(this.b.y - this.c.y, this.b.x - this.c.x));
  }

  public static getAngleCInRadians(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleCInRadians()
  }

  public getAngleCInDegrees() {
    return this.getAngleCInRadians() * 180 / Math.PI;
  }

  public static getAngleCInDegrees(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleCInDegrees()
  }

  public getArea() {
    const a = new Line(this.a, this.b).getLength();
    const b = new Line(this.b, this.c).getLength();
    const c = new Line(this.c, this.a).getLength();
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  public static getArea(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getArea();
  }

  public getHeight() {
    return 2 * this.getArea() / new Line(this.b, this.c).getLength();
  }

  public static getHeight(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getHeight();
  }
}

export interface SimpleTriangle {
  a: SimplePoint;
  b: SimplePoint;
  c: SimplePoint;
}
