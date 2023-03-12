import Point, {SimplePoint} from "./Point";

export default class Circle {
  
  public origin: Point;
  public radius: number;
  
  constructor(origin: SimplePoint, radius: number) {
    this.origin = Point.fromSimplePoint(origin);
    this.radius = radius;
  }
  
  public static fromSimpleCircle(source: SimpleCircle): Circle {
    return new Circle(source.origin, source.radius);
  }
  
  public static getDiameter(source: SimpleCircle): number {
    return this.fromSimpleCircle(source).getDiameter();
  }
  
  public static getArea(source: SimpleCircle): number {
    return this.fromSimpleCircle(source).getArea();
  }
  
  public static containsPoint(source: SimpleCircle, target: SimplePoint): boolean {
    return this.fromSimpleCircle(source).containsPoint(target);
  }
  
  public clone(): Circle {
    return new Circle(this.origin, this.radius);
  }
  
  public getDiameter(): number {
    return this.radius * 2;
  }
  
  public getArea(): number {
    return this.radius * this.radius * Math.PI;
  }
  
  public containsPoint(point: SimplePoint): boolean {
    return this.origin.getDistanceToPoint(point) <= this.radius;
  }
}

export interface SimpleCircle {
  origin: SimplePoint;
  radius: number;
}
