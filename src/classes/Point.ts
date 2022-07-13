import {SimpleRect} from "./Rect";

export default class Point {

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static fromSimplePoint(point: SimplePoint) {
    return new this(point.x, point.y);
  }

  public clone() {
    return new Point(this.x, this.y);
  }

  public getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  public static getMagnitude(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).getDistanceToPoint(target);
  }

  public getDotProductWith(target: SimplePoint) {
    return this.x * target.x + this.y * target.y;
  }

  public static getDotProductWith(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).getDotProductWith(target);
  }

  public getDistanceToPoint(point: SimplePoint) {
    return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2));
  }

  public static getDistanceToPoint(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).getDistanceToPoint(target);
  }

  public translateX(x: number) {
    this.x += x;
    return this;
  }

  public static translateX(source: SimplePoint, x: number) {
    return this.fromSimplePoint(source).translateX(x);
  }

  public translateY(y: number) {
    this.y += y;
    return this;
  }

  public static translateY(source: SimplePoint, y: number) {
    return this.fromSimplePoint(source).translateY(y);
  }

  public translateByCoords(x: number, y: number) {
    return this.translateX(x).translateY(y);
  }

  public static translateByCoords(source: SimplePoint, x: number, y: number) {
    return this.fromSimplePoint(source).translateByCoords(x, y);
  }

  public translateByPoint(point: SimplePoint) {
    this.translateByCoords(point.x, point.y);
    return this;
  }

  public static translateByPoint(source: SimplePoint, target: SimplePoint) {
    return this.fromSimplePoint(source).translateByPoint(target);
  }

  public clampX(min: number, max: number) {
    this.x = Math.min(max, Math.max(min, this.x));
    return this;
  }

  public static clampX(source: SimplePoint, min: number, max: number) {
    return this.fromSimplePoint(source).clampX(min, max);
  }

  public clampY(min: number, max: number) {
    this.y = Math.min(max, Math.max(min, this.y));
    return this;
  }

  public static clampY(source: SimplePoint, min: number, max: number) {
    return this.fromSimplePoint(source).clampY(min, max);
  }

  public clampByRect(rect: SimpleRect) {
    this.clampX(rect.x, rect.x + rect.width);
    this.clampY(rect.x, rect.x + rect.width);
    return this;
  }

  public static clampByRect(source: SimplePoint, target: SimpleRect) {
    return this.fromSimplePoint(source).clampByRect(target);
  }
}

export interface SimplePoint {
  x: number;
  y: number;
}
