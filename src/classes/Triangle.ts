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

  public static fromSimpleTriangle(source: SimpleTriangle): Triangle {
    return new Triangle(source.a, source.b, source.c);
  }

  public static getHeight(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getHeight();
  }

  public static getArea(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getArea();
  }

  public static getAngleAInRadians(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getAngleAInRadians();
  }

  public static getAngleAInDegrees(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getAngleAInDegrees();
  }

  public static getAngleBInRadians(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getAngleBInRadians();
  }

  public static getAngleBInDegrees(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getAngleBInDegrees();
  }

  public static getAngleCInRadians(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getAngleCInRadians();
  }

  public static getAngleCInDegrees(source: SimpleTriangle): number {
    return this.fromSimpleTriangle(source).getAngleCInDegrees();
  }

  public clone(): Triangle {
    return new Triangle(this.a, this.b, this.c);
  }

  public getHeight(): number {
    return 2 * this.getArea() / new Line(this.b, this.c).getLength();
  }

  public getArea(): number {
    const a: number = new Line(this.a, this.b).getLength();
    const b: number = new Line(this.b, this.c).getLength();
    const c: number = new Line(this.c, this.a).getLength();
    const s: number = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  public getAngleAInRadians(): number {
    return Math.abs(Math.atan2(this.c.y - this.a.y, this.c.x - this.a.x) - Math.atan2(this.b.y - this.a.y, this.b.x - this.a.x));
  }

  public getAngleAInDegrees(): number {
    return this.getAngleAInRadians() * 180 / Math.PI;
  }

  public getAngleBInRadians(): number {
    return Math.abs(Math.atan2(this.a.y - this.b.y, this.a.x - this.b.x) - Math.atan2(this.c.y - this.b.y, this.c.x - this.b.x));
  }

  public getAngleBInDegrees(): number {
    return this.getAngleBInRadians() * 180 / Math.PI;
  }

  public getAngleCInRadians(): number {
    return Math.abs(Math.atan2(this.a.y - this.c.y, this.a.x - this.c.x) - Math.atan2(this.b.y - this.c.y, this.b.x - this.c.x));
  }

  public getAngleCInDegrees(): number {
    return this.getAngleCInRadians() * 180 / Math.PI;
  }
}

export interface SimpleTriangle {
  a: SimplePoint;
  b: SimplePoint;
  c: SimplePoint;
}
