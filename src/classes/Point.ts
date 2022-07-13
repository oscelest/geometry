import {SimpleRect} from "./Rect";

export default class Point {

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static fromSimplePoint(source: SimplePoint) {
    return new this(source.x, source.y);
  }

  public static getMagnitude(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).getDistanceToPoint(target);
  }

  public static getDotProductWith(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).getDotProductWith(target);
  }

  public static getDistanceToPoint(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).getDistanceToPoint(target);
  }

  public static translateX(source: SimplePoint, x: number) {
    return this.fromSimplePoint(source).translateX(x);
  }

  public static translateY(source: SimplePoint, y: number) {
    return this.fromSimplePoint(source).translateY(y);
  }

  public static translateByCoords(source: SimplePoint, x: number, y: number) {
    return this.fromSimplePoint(source).translateByCoords(x, y);
  }

  public static translateByPoint(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).translateByPoint(target);
  }

  public static clampX(source: SimplePoint, min: number, max: number) {
    return this.fromSimplePoint(source).clampX(min, max);
  }

  public static clampY(source: SimplePoint, min: number, max: number) {
    return this.fromSimplePoint(source).clampY(min, max);
  }

  public static clampByRect(source: SimplePoint, target: SimpleRect) {
    return this.fromSimplePoint(source).clampByRect(target);
  }

  public clone() {
    return new Point(this.x, this.y);
  }

  public getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  public getDotProductWith(target: SimplePoint) {
    return this.x * target.x + this.y * target.y;
  }

  public getDistanceToPoint(point: SimplePoint) {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
  }

  public translateX(x: number) {
    this.x += x;
    return this;
  }

  public translateY(y: number) {
    this.y += y;
    return this;
  }

  public translateByCoords(x: number, y: number) {
    return this.translateX(x).translateY(y);
  }

  public translateByPoint(point: SimplePoint) {
    this.translateByCoords(point.x, point.y);
    return this;
  }

  public clampX(min: number, max: number) {
    this.x = Math.min(max, Math.max(min, this.x));
    return this;
  }

  public clampY(min: number, max: number) {
    this.y = Math.min(max, Math.max(min, this.y));
    return this;
  }

  public clampByRect(rect: SimpleRect) {
    this.clampX(rect.x, rect.x + rect.width);
    this.clampY(rect.x, rect.x + rect.width);
    return this;
  }
}

export interface SimplePoint {
  x: number;
  y: number;
}
