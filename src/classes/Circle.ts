import Point, {SimplePoint} from "./Point";

export default class Circle {

  public origin: Point;
  public radius: number;

  constructor(origin: SimplePoint, radius: number) {
    this.origin = Point.fromSimplePoint(origin);
    this.radius = radius;
  }

  public static fromSimpleCircle(source: SimpleCircle) {
    return new Circle(source.origin, source.radius);
  }

  public static getDiameter(source: SimpleCircle) {
    return this.fromSimpleCircle(source).getDiameter();
  }

  public static getArea(source: SimpleCircle) {
    return this.fromSimpleCircle(source).getArea();
  }

  public static containsPoint(source: SimpleCircle, target: SimplePoint) {
    return this.fromSimpleCircle(source).containsPoint(target);
  }

  public clone() {
    return new Circle(this.origin, this.radius);
  }

  public getDiameter() {
    return this.radius * 2;
  }

  public getArea() {
    return this.radius * this.radius * Math.PI;
  }

  public containsPoint(point: SimplePoint) {
    return this.origin.getDistanceToPoint(point) <= this.radius;
  }
}

export interface SimpleCircle {
  origin: SimplePoint;
  radius: number;
}
