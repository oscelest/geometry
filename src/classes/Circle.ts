import Point, {SimplePoint} from "./Point";

export default class Circle {

  public origin: Point;
  public radius: number;

  constructor(origin: SimplePoint, radius: number) {
    this.origin = Point.fromSimplePoint(origin);
    this.radius = radius;
  }

  public static fromSimpleCircle(circle: SimpleCircle) {
    return new Circle(circle.origin, circle.radius);
  }

  public static getDiameter(source: SimpleCircle) {
    return this.fromSimpleCircle(source).getDiameter();
  }

  public static getArea(source: SimpleCircle) {
    return this.fromSimpleCircle(source).getArea();
  }

  public getDiameter() {
    return this.radius * 2;
  }

  public getArea() {
    return this.radius * this.radius * Math.PI;
  }
}

export interface SimpleCircle {
  origin: SimplePoint;
  radius: number;
}
