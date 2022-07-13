import Point, {SimplePoint} from "./Point";
import Triangle from "./Triangle";

export default class Quadrilateral {

  public a: Point;
  public b: Point;
  public c: Point;
  public d: Point;

  constructor(top_left: SimplePoint, top_right: SimplePoint, bottom_left: SimplePoint, bottom_right: SimplePoint) {
    this.a = Point.fromSimplePoint(top_left);
    this.b = Point.fromSimplePoint(top_right);
    this.c = Point.fromSimplePoint(bottom_left);
    this.d = Point.fromSimplePoint(bottom_right);
  }

  public static fromSimpleQuadrilateral(quadrilateral: SimpleQuadrilateral) {
    return new this(quadrilateral.top_left, quadrilateral.top_right, quadrilateral.bottom_left, quadrilateral.bottom_right);
  }

  public static getArea(source: SimpleQuadrilateral) {
    return this.fromSimpleQuadrilateral(source).getArea();
  }

  public static containsPoint(source: SimpleQuadrilateral, target: SimplePoint) {
    return this.fromSimpleQuadrilateral(source).containsPoint(target);
  }

  public clone() {
    return new Quadrilateral(this.a, this.b, this.c, this.d);
  }

  public getArea() {
    return new Triangle(this.a, this.b, this.d).getArea() + new Triangle(this.a, this.c, this.d).getArea();
  }

  public containsPoint(point: SimplePoint) {
    const point_area = Math.round(
      new Triangle(point, this.a, this.b).getArea() +
      new Triangle(point, this.a, this.c).getArea() +
      new Triangle(point, this.b, this.d).getArea() +
      new Triangle(point, this.c, this.d).getArea()
    );

    return Math.round(this.getArea()) === point_area;
  }
}

export interface SimpleQuadrilateral {
  top_left: SimplePoint;
  top_right: SimplePoint;
  bottom_left: SimplePoint;
  bottom_right: SimplePoint;
}
