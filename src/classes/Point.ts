import Rect, {SimpleRect} from "./Rect";

export default class Point {

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public clone() {
    return new Point(this.x, this.y);
  }

  public distanceToPoint(point: SimplePoint) {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
  }

  public static distanceToPoint(source: SimplePoint, target: SimplePoint) {
    return Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2));
  }

  public translateX(x: number) {
    this.x += x;
    return this;
  }

  public static translateX(source: SimplePoint, x: number) {
    return new Point(source.x, source.y).translateX(x);
  }

  public translateY(y: number) {
    this.y += y;
    return this;
  }

  public static translateY(source: SimplePoint, y: number) {
    return new Point(source.x, source.y).translateY(y);
  }

  public translateByCoords(x: number, y: number) {
    return this.translateX(x).translateY(y);
  }

  public static translateByCoords(source: SimplePoint, x: number, y: number) {
    return new Point(source.x, source.y).translateByCoords(x, y);
  }

  public translateByPoint(point: SimplePoint) {
    this.translateByCoords(point.x, point.y);
    return this;
  }

  public static translateByPoint(source: SimplePoint, target: SimplePoint) {
    return new Point(source.x, source.y).translateByPoint(target);
  }

  public clampX(min: number, max: number) {
    this.x = Math.min(max, Math.max(min, this.x));
    return this;
  }

  public static clampX(source: SimplePoint, min: number, max: number) {
    return new Point(source.x, source.y).clampX(min, max);
  }

  public clampY(min: number, max: number) {
    this.y = Math.min(max, Math.max(min, this.y));
    return this;
  }

  public static clampY(source: SimplePoint, min: number, max: number) {
    return new Point(source.x, source.y).clampY(min, max);
  }

  public clampByRect(rect: SimpleRect) {
    this.clampX(rect.x, rect.x + rect.width);
    this.clampY(rect.x, rect.x + rect.width);
    return this;
  }

  public static clampByRect(source: SimplePoint, target: SimpleRect) {
    return new Point(source.x, source.y).clampByRect(target);
  }
}

export interface SimplePoint {
  x: number
  y: number
}
