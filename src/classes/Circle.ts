export default class Circle {

  public origin: number;
  public radius: number;

  constructor(origin: number, radius: number) {
    this.origin = origin;
    this.radius = radius;
  }

  public static fromSimpleCircle(circle: SimpleCircle) {
    return new Circle(circle.origin, circle.radius);
  }

  public getDiameter() {
    return this.radius * 2;
  }

  public static getDiameter(source: SimpleCircle) {
    return this.fromSimpleCircle(source).getDiameter()
  }

  public getArea() {
    return this.radius * this.radius * Math.PI;
  }

  public static getArea(source: SimpleCircle) {
    return this.fromSimpleCircle(source).getArea()
  }

}

export interface SimpleCircle {
  origin: number;
  radius: number;
}
