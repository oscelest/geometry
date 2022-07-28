import {SimplePoint} from "./Point";

export default class Rect {

  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public static fromSimpleRect(source: SimpleRect) {
    return new this(source.x, source.y, source.width, source.height);
  }

  public static fromPoints(p1: SimplePoint, p2: SimplePoint) {
    const x1 = Math.min(p1.x, p2.x);
    const x2 = Math.max(p1.x, p2.x);
    const y1 = Math.min(p1.y, p2.y);
    const y2 = Math.max(p1.y, p2.y);
    return new this(x1, y1, x2 - x1, y2 - y1);
  }

  public static getArea(source: SimpleRect) {
    return this.fromSimpleRect(source);
  }

  public static containsPoint(source: SimpleRect, target: SimplePoint) {
    return this.fromSimpleRect(source).containsPoint(target);
  }

  public static containsRect(source: SimpleRect, target: SimpleRect) {
    return this.fromSimpleRect(source).containsRect(target);
  }

  public static intersectsRect(source: SimpleRect, target: SimpleRect) {
    return this.fromSimpleRect(source).intersectsRect(target);
  }

  public static translateX(source: SimpleRect, x: number) {
    return this.fromSimpleRect(source).translateX(x);
  }

  public static translateY(source: SimpleRect, y: number) {
    return this.fromSimpleRect(source).translateY(y);
  }

  public static translateByCoords(source: SimpleRect, x: number, y: number) {
    return this.fromSimpleRect(source).translateByCoords(x, y);
  }

  public static translateByPoint(source: SimpleRect, target: SimplePoint) {
    return this.fromSimpleRect(source).translateByPoint(target);
  }

  public static scale(source: SimpleRect, decimal_percent: number) {
    return this.fromSimpleRect(source).scale(decimal_percent);
  }

  public static union(...rect_list: SimpleRect[]) {
    if (rect_list.length < 1) throw new Error("Cannot create union of Rects from empty list.");

    const x1 = Math.min(...rect_list.map(v => v.x));
    const y1 = Math.min(...rect_list.map(v => v.y));
    const x2 = Math.max(...rect_list.map(v => v.x + v.width));
    const y2 = Math.max(...rect_list.map(v => v.y + v.height));

    return new this(x1, y1, x2 - x1, y2 - y1);
  }

  public clone() {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  public getArea() {
    return this.width * this.height;
  }

  public containsPoint(point: SimplePoint) {
    return !(this.x >= point.x || this.x + this.width <= point.x || this.y >= point.y || this.y + this.height <= point.y);
  }

  public containsRect(rect: SimpleRect) {
    return !(this.x < rect.x || this.y < rect.y || this.x + this.width > rect.x + rect.height || this.y + this.height > rect.y + rect.height);
  }

  public intersectsRect(rect: SimpleRect) {
    return (this.x <= rect.x + rect.width && rect.x <= this.x + this.width && this.y <= rect.y + rect.height && rect.y <= this.y + this.height);
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
    this.translateX(x);
    this.translateY(y);
    return this;
  }

  public translateByPoint(point: SimplePoint) {
    return this.translateByCoords(point.x, point.y);
  }

  public scale(decimal_percent: number) {
    decimal_percent = Math.max(0, decimal_percent);
    const dx = this.x * decimal_percent * 0.5;
    const dy = this.y * decimal_percent * 0.5;
    this.x += dx / 2;
    this.y += dy / 2;
    this.width -= dx;
    this.height -= dy;
    return this;
  }

  public union(...rect_list: SimpleRect[]) {
    for (let i = 0; i < rect_list.length; i++) {
      const rect = rect_list[i];
      if (!rect) continue;

      const x1 = Math.min(this.x, rect.x);
      const x2 = Math.max(this.x + this.width, rect.x + rect.width);
      const y1 = Math.min(this.y, rect.y);
      const y2 = Math.max(this.y + this.height, rect.y + rect.height);

      this.x = x1;
      this.y = y1;
      this.width = x2 - x1;
      this.height = y2 - y1;
    }
    return this;
  }
}

export interface SimpleRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
