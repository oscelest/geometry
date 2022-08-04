import {Point, SimplePoint} from "./index";
import {TransformationOrigin} from "../enums";

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

  public static fromSimpleRect(source: SimpleRect): Rect {
    return new this(source.x, source.y, source.width, source.height);
  }

  public static fromPoints(p1: SimplePoint, p2: SimplePoint): Rect {
    const x1: number = Math.min(p1.x, p2.x);
    const x2: number = Math.max(p1.x, p2.x);
    const y1: number = Math.min(p1.y, p2.y);
    const y2: number = Math.max(p1.y, p2.y);
    return new this(x1, y1, x2 - x1, y2 - y1);
  }

  public static getCenterPoint(source: SimpleRect): Point {
    return this.fromSimpleRect(source).getCenterPoint();
  }

  public static getArea(source: SimpleRect): Rect {
    return this.fromSimpleRect(source);
  }

  public static containsPoint(source: SimpleRect, target: SimplePoint): boolean {
    return this.fromSimpleRect(source).containsPoint(target);
  }

  public static containsRect(source: SimpleRect, target: SimpleRect): boolean {
    return this.fromSimpleRect(source).containsRect(target);
  }

  public static intersectsRect(source: SimpleRect, target: SimpleRect): boolean {
    return this.fromSimpleRect(source).intersectsRect(target);
  }

  public static translateX(source: SimpleRect, x: number): Rect {
    return this.fromSimpleRect(source).translateX(x);
  }

  public static translateY(source: SimpleRect, y: number): Rect {
    return this.fromSimpleRect(source).translateY(y);
  }

  public static translateByCoords(source: SimpleRect, x: number, y: number): Rect {
    return this.fromSimpleRect(source).translateByCoords(x, y);
  }

  public static translateByPoint(source: SimpleRect, target: SimplePoint): Rect {
    return this.fromSimpleRect(source).translateByPoint(target);
  }

  public static expandWidth(source: SimpleRect, width: number, origin: TransformationOrigin = TransformationOrigin.CENTER): Rect {
    return this.fromSimpleRect(source).expandWidth(width, origin);
  }

  public static expandHeight(source: SimpleRect, height: number, origin: TransformationOrigin = TransformationOrigin.CENTER): Rect {
    return this.fromSimpleRect(source).expandHeight(height, origin);
  }

  public static expand(source: SimpleRect, width: number, height: number, origin: TransformationOrigin = TransformationOrigin.CENTER): Rect {
    return this.fromSimpleRect(source).expand(width, height, origin);
  }

  public static scaleWidth(source: SimpleRect, width_decimal_percent: number, origin: TransformationOrigin = TransformationOrigin.CENTER): Rect {
    return this.fromSimpleRect(source).scaleWidth(width_decimal_percent, origin);
  }

  public static scaleHeight(source: SimpleRect, height_decimal_percent: number, origin: TransformationOrigin = TransformationOrigin.CENTER): Rect {
    return this.fromSimpleRect(source).scaleHeight(height_decimal_percent, origin);
  }

  public static scale(source: SimpleRect, width_decimal_percent: number, height_decimal_percent: number, origin: TransformationOrigin = TransformationOrigin.CENTER): Rect {
    return this.fromSimpleRect(source).scale(width_decimal_percent, height_decimal_percent, origin);
  }

  public static union(...rect_list: SimpleRect[]): Rect {
    if (rect_list.length < 1) throw new Error("Cannot create union of Rects from empty list.");

    const x1: number = Math.min(...rect_list.map((v: SimpleRect) => v.x));
    const y1: number = Math.min(...rect_list.map((v: SimpleRect) => v.y));
    const x2: number = Math.max(...rect_list.map((v: SimpleRect) => v.x + v.width));
    const y2: number = Math.max(...rect_list.map((v: SimpleRect) => v.y + v.height));

    return new this(x1, y1, x2 - x1, y2 - y1);
  }

  public clone(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }

  public getCenterPoint(): Point {
    return new Point(this.x + this.width / 2, this.y + this.height / 2);
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public containsPoint(point: SimplePoint): boolean {
    return !(this.x >= point.x || this.x + this.width <= point.x || this.y >= point.y || this.y + this.height <= point.y);
  }

  public containsRect(rect: SimpleRect): boolean {
    return !(this.x < rect.x || this.y < rect.y || this.x + this.width > rect.x + rect.height || this.y + this.height > rect.y + rect.height);
  }

  public intersectsRect(rect: SimpleRect): boolean {
    return (this.x <= rect.x + rect.width && rect.x <= this.x + this.width && this.y <= rect.y + rect.height && rect.y <= this.y + this.height);
  }

  public translateX(x: number): this {
    this.x += x;
    return this;
  }

  public translateY(y: number): this {
    this.y += y;
    return this;
  }

  public translateByCoords(x: number, y: number): this {
    this.translateX(x);
    this.translateY(y);
    return this;
  }

  public translateByPoint(point: SimplePoint): this {
    return this.translateByCoords(point.x, point.y);
  }

  public expandWidth(width: number, origin: TransformationOrigin = TransformationOrigin.CENTER): this {
    if (origin === TransformationOrigin.TOP_LEFT || origin === TransformationOrigin.LEFT || origin === TransformationOrigin.BOTTOM_LEFT) {
      this.width += width;
    }
    else if (origin === TransformationOrigin.TOP_RIGHT || origin === TransformationOrigin.RIGHT || origin === TransformationOrigin.BOTTOM_RIGHT) {
      this.x += width;
      this.width += width;
    }
    else {
      this.x -= width / 2;
      this.width += width / 2;
    }
    return this;
  }

  public expandHeight(height: number, origin: TransformationOrigin = TransformationOrigin.CENTER): this {
    if (origin === TransformationOrigin.BOTTOM_LEFT || origin === TransformationOrigin.BOTTOM || origin === TransformationOrigin.BOTTOM_RIGHT) {
      this.y -= height;
      this.height += height;
    }
    else if (origin === TransformationOrigin.TOP_LEFT || origin === TransformationOrigin.TOP || origin === TransformationOrigin.TOP_RIGHT) {
      this.height += height;
    }
    else {
      this.y -= height / 2;
      this.height += height / 2;
    }

    return this;
  }

  public expand(width: number, height: number, origin: TransformationOrigin = TransformationOrigin.CENTER): this {
    return this.expandWidth(width, origin).expandHeight(height, origin);
  }

  public scaleWidth(decimal_percent: number, origin: TransformationOrigin = TransformationOrigin.CENTER): this {
    return this.expandWidth(this.width * Math.max(0, decimal_percent), origin);
  }

  public scaleHeight(decimal_percent: number, origin: TransformationOrigin = TransformationOrigin.CENTER): this {
    return this.expandHeight(this.width * Math.max(0, decimal_percent), origin);
  }

  public scale(width_decimal_percent: number, height_decimal_percent: number, origin: TransformationOrigin = TransformationOrigin.CENTER): this {
    return this.scaleWidth(width_decimal_percent, origin).scaleHeight(height_decimal_percent, origin);
  }

  public union(...rect_list: SimpleRect[]): this {
    for (let i = 0; i < rect_list.length; i++) {
      const rect: SimpleRect = rect_list[i];
      if (!rect) continue;

      const x1: number = Math.min(this.x, rect.x);
      const x2: number = Math.max(this.x + this.width, rect.x + rect.width);
      const y1: number = Math.min(this.y, rect.y);
      const y2: number = Math.max(this.y + this.height, rect.y + rect.height);

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
