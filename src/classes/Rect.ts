import Point, {SimplePoint} from "./Point";

export default class Rect {

  public x: number;
  public y: number;
  public width: number;
  public height: number;

  public top: number;
  public left: number;
  public right: number;
  public bottom: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.top = y;
    this.left = x;
    this.right = x + width;
    this.bottom = y + height;
  }

  public clone() {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  public static fromPoints(point_1: Point, point_2: Point) {
    const x1 = Math.min(point_1.x, point_2.x);
    const x2 = Math.max(point_1.x, point_2.x);
    const y1 = Math.min(point_1.y, point_2.y);
    const y2 = Math.max(point_1.y, point_2.y);
    return new Rect(x1, y1, x2 - x1, y2 - y1);
  }

  public static fromSimpleRect(rect: SimpleRect) {
    return new Rect(rect.x, rect.y, rect.width, rect.height);
  }

  public containsPoint(point: Point) {
    return !(this.left >= point.x || this.right <= point.x || this.top >= point.y || this.bottom <= point.y);
  }

  public static containsPoint(source: SimpleRect, target: Point) {
    return new Rect(source.x, source.y, source.width, source.height).containsPoint(target);
  }

  public containsRect(rect: SimpleRect) {
    return !(this.left < rect.x || this.top < rect.y || this.right > rect.x + rect.height || this.bottom > rect.y + rect.height);
  }

  public static containsRect(source: SimpleRect, target: SimpleRect) {
    return new Rect(source.x, source.y, source.width, source.height).containsRect(target);
  }

  public intersectsRect(rect: SimpleRect) {
    return !(this.left >= rect.x + rect.height  || this.right <= rect.x || this.top >= rect.y + rect.height || this.bottom <= rect.y);
  }

  public static intersectsRect(source: SimpleRect, target: SimpleRect) {
    return new Rect(source.x, source.y, source.width, source.height).intersectsRect(target);
  }

  public translateX(x: number) {
    this.x += x;
    return this;
  }

  public static translateX(source: SimpleRect, x: number) {
    return new Rect(source.x, source.y, source.width, source.height).translateX(x);
  }

  public translateY(y: number) {
    this.y += y;
    return this;
  }

  public static translateY(source: SimpleRect, y: number) {
    return new Rect(source.x, source.y, source.width, source.height).translateY(y);
  }

  public translateByCoords(x: number, y: number) {
    this.translateX(x);
    this.translateY(y);
    return this;
  }

  public static translateByCoords(source: SimpleRect, x: number, y: number) {
    return new Rect(source.x, source.y, source.width, source.height).translateByCoords(x, y);
  }

  public translateByPoint(point: SimplePoint) {
    return this.translateByCoords(point.x, point.y);
  }

  public static translateByPoint(source: SimpleRect, target: SimplePoint) {
    return new Rect(source.x, source.y, source.width, source.height).translateByPoint(target);
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

  public static scale(source: SimpleRect, decimal_percent: number) {
    return new Rect(source.x, source.y, source.width, source.height).scale(decimal_percent);
  }

  public union(...rect_list: SimpleRect[]) {
    for (let i = 0; i < rect_list.length; i++) {
      const rect = rect_list.at(i);
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

  public static union(...rect_list: SimpleRect[]) {
    if (rect_list.length < 1) throw new Error("Cannot create union of Rects from empty list.");

    const x1 = Math.min(...rect_list.map(v => v.x));
    const y1 = Math.min(...rect_list.map(v => v.y));
    const x2 = Math.max(...rect_list.map(v => v.x + v.width));
    const y2 = Math.max(...rect_list.map(v => v.y + v.height));

    return new Rect(x1, y1, x2 - x1, y2 - y1);
  }

}

export interface SimpleRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
