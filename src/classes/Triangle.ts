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

  public static getAngleAInRadians(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleAInRadians();
  }

  public static getAngleAInDegrees(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleAInDegrees();
  }

  public static getAngleBInRadians(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleBInRadians();
  }

  public static getAngleBInDegrees(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleBInDegrees();
  }

  public static getAngleCInRadians(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleCInRadians();
  }

  public static getAngleCInDegrees(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getAngleCInDegrees();
  }

  public static getArea(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getArea();
  }

  public static getHeight(source: SimpleTriangle) {
    return this.fromSimpleTriangle(source).getHeight();
  }

  public clone() {
    return new Triangle(this.a, this.b, this.c);
  }

  public getAngleAInRadians() {
    return Math.abs(Math.atan2(this.c.y - this.a.y, this.c.x - this.a.x) - Math.atan2(this.b.y - this.a.y, this.b.x - this.a.x));
  }

  public getAngleAInDegrees() {
    return this.getAngleAInRadians() * 180 / Math.PI;
  }

  public getAngleBInRadians() {
    return Math.abs(Math.atan2(this.a.y - this.b.y, this.a.x - this.b.x) - Math.atan2(this.c.y - this.b.y, this.c.x - this.b.x));
  }

  public getAngleBInDegrees() {
    return this.getAngleBInRadians() * 180 / Math.PI;
  }

  public getAngleCInRadians() {
    return Math.abs(Math.atan2(this.a.y - this.c.y, this.a.x - this.c.x) - Math.atan2(this.b.y - this.c.y, this.b.x - this.c.x));
  }

  public getAngleCInDegrees() {
    return this.getAngleCInRadians() * 180 / Math.PI;
  }

  public getArea() {
    const a = new Line(this.a, this.b).getLength();
    const b = new Line(this.b, this.c).getLength();
    const c = new Line(this.c, this.a).getLength();
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  public getHeight() {
    return 2 * this.getArea() / new Line(this.b, this.c).getLength();
  }
}

export interface SimpleTriangle {
  a: SimplePoint;
  b: SimplePoint;
  c: SimplePoint;
}
