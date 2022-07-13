import Point, {SimplePoint} from "./Point";
import Line from "./Line";
import Triangle from "./Triangle";

export default class Quadrilateral {

  public top_left: Point;
  public top_right: Point;
  public bottom_left: Point;
  public bottom_right: Point;

  public top: Line;
  public left: Line;
  public right: Line;
  public bottom: Line;

  constructor(top_left: SimplePoint, top_right: SimplePoint, bottom_left: SimplePoint, bottom_right: SimplePoint) {
    this.top_left = Point.fromSimplePoint(top_left);
    this.top_right = Point.fromSimplePoint(top_right);
    this.bottom_left = Point.fromSimplePoint(bottom_left);
    this.bottom_right = Point.fromSimplePoint(bottom_right);

    this.top = new Line(top_left, top_right);
    this.left = new Line(top_left, bottom_left);
    this.right = new Line(top_right, bottom_right);
    this.bottom = new Line(bottom_left, bottom_right);
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
    return new Quadrilateral(this.top_left, this.top_right, this.bottom_left, this.bottom_right);
  }

  public getArea() {
    return new Triangle(this.top_left, this.top_right, this.bottom_right).getArea() + new Triangle(this.top_left, this.bottom_left, this.bottom_right).getArea();
  }

  public containsPoint(point: SimplePoint) {
    const point_area = Math.round(
      new Triangle(point, this.top_left, this.top_right).getArea() +
      new Triangle(point, this.top_left, this.bottom_left).getArea() +
      new Triangle(point, this.top_right, this.bottom_right).getArea() +
      new Triangle(point, this.bottom_left, this.bottom_right).getArea()
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
