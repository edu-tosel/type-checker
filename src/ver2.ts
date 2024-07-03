import { TypeCheckerError, TypeOf } from "./index";

export type TypeGuard = (obj: unknown) => boolean;
export interface TypeChecker2 {
  isString: (key: string | string[]) => this;
  isOptionalString: (key: string | string[]) => this;
  isNullString: (key: string | string[]) => this;
  isNumber: (key: string | string[]) => this;
  isOptionalNumber: (key: string | string[]) => this;
  isNullNumber: (key: string | string[]) => this;
  isBoolean: (key: string | string[]) => this;
  isOptionalBoolean: (key: string | string[]) => this;
  isNullBoolean: (key: string | string[]) => this;
  isObject: (key: string | string[]) => this;
  isOptionalObject: (key: string | string[]) => this;
  isNullObject: (key: string | string[]) => this;
  isOptionalNull: (key: string | string[]) => this;
  isArray: (key: string | string[]) => this;
  isOptionalArray: (key: string | string[]) => this;
  isNullArray: (key: string | string[]) => this;
  isSatisfy: (key: string | string[], typeGuard: TypeGuard) => this;
  is: (keys: string | string[], type: TypeOf | TypeOf[]) => this;
  check: <T>(obj: unknown) => obj is T;
}
/**
 * @name TypeChecker2
 * @author Minseong Kim <minseong@tosel.co.kr>
 * @description A simple type checker for typescript
 * @default
 * strict = true //if true, check if there are any keys that are not defined
 * silent = false //if false, print error messages on stderr
 * @example
 * ```ts
 * interface Student {
 *   name: string;
 *   age: number;
 *   isMale: boolean;
 *   subjects?: string[];
 * }
 * const obj = {
 *   name: "John",
 *   age: 20,
 *   isMale: true,
 * }
 * const messageOut: string[] = [];
 * const isStudent = new TypeChecker2({ strict: true, silent: false, messageOut }
 *   // typeof isStudent = (obj: unknown) => obj is Student
 *   .isString("name")
 *   .isNumber("age")
 *   .isBoolean("isMale")
 *   .isOptionalArray("subjects")
 *   .check<Student>;
 * console.log(isStudent(obj)) // true
 * console.log(messageOut) // []
 * type Obj = typeof obj; // Student
 * ```
 */
export class TypeChecker2 {
  private message: string[] = [];
  private checkers: Map<string, (TypeOf | TypeGuard)[]> = new Map();
  private strict: boolean = true;
  private silent: boolean = false;
  constructor(options?: {
    strict?: boolean;
    silent?: boolean;
    messageOut?: string[];
  }) {
    if (options?.strict !== undefined) this.strict = options.strict;
    if (options?.silent !== undefined) this.silent = options.silent;
    if (options?.messageOut !== undefined) this.message = options.messageOut;
    this.message = [];
    this.checkers = new Map();
  }
  private isType = (key: string[], type: (TypeOf | TypeGuard)[]) => {
    const isDuplicate = key.some((k) => this.checkers.has(k));
    if (isDuplicate) throw new TypeCheckerError("Duplicate key");
    for (const k of key) this.checkers.set(k, type);
  };
  private error = (message: string) => {
    if (!this.silent) console.error(message);
    this.message.push(message);
    return false as false;
  };
  isString = (key: string | string[]) => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["string"]);
    return this;
  };
  isOptionalString = (key: string | string[]) => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["string", "undefined"]);
    return this;
  };
  isNullString = (key: string | string[]) => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["string", "null"]);
    return this;
  };
  isStringArray = (key: string | string[]) => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, [
      (value) =>
        value instanceof Array && value.every((v) => typeof v === "string"),
    ]);
    return this;
  };
  isNumber = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["number"]);
    return this;
  };
  isOptionalNumber = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["number", "undefined"]);
    return this;
  };
  isNullNumber = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["number", "null"]);
    return this;
  };
  isNumberArray = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, [
      (value) =>
        value instanceof Array && value.every((v) => typeof v === "number"),
    ]);
    return this;
  };
  isBoolean = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["boolean"]);
    return this;
  };
  isOptionalBoolean = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["boolean", "undefined"]);
    return this;
  };
  isNullBoolean = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["boolean", "null"]);
    return this;
  };
  isBooleanArray = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, [
      (value) =>
        value instanceof Array && value.every((v) => typeof v === "boolean"),
    ]);
    return this;
  };
  isObject = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["object"]);
    return this;
  };
  isOptionalObject = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["object", "undefined"]);
    return this;
  };
  isNullObject = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["object", "null"]);
    return this;
  };
  isOptionalNull = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["null", "undefined"]);
    return this;
  };
  /** @deprecated use isAnyArray */
  isArray = (key: string | string[]): this => this.isAnyArray(key);
  isAnyArray = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["array"]);
    return this;
  };
  isOptionalArray = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["array", "undefined"]);
    return this;
  };
  isNullArray = (key: string | string[]): this => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["array", "null"]);
    return this;
  };
  isUndefined = (key: string | string[]) => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, ["undefined"]);
    return this;
  };
  isSatisfy = (key: string | string[], typeGuard: TypeGuard) => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, [typeGuard]);
    return this;
  };
  isSatisfyArray = (key: string | string[], typeGuard: TypeGuard) => {
    key = Array.isArray(key) ? key : [key];
    this.isType(key, [
      (value) => value instanceof Array && value.every(typeGuard),
    ]);
    return this;
  };
  is = (keys: string | string[], type: TypeOf | TypeOf[]) => {
    keys = Array.isArray(keys) ? keys : [keys];
    this.isType(keys, Array.isArray(type) ? type : [type]);
    return this;
  };
  check = <T>(obj: unknown): obj is T => {
    if (!(obj instanceof Object)) return this.error("Input is not an object");
    const o = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>;
    const validKeys = [...this.checkers.entries()].map(
      ([key, types]): [string, boolean] => {
        if (!(key in o)) {
          if (types.some((type) => type === "undefined")) return [key, true];
          else if (
            types.some((type) => type instanceof Function && type(undefined))
          )
            return [key, true];
          else return [key, this.error(`Key \`${key}\` not found`)];
        }
        const value = o[key];
        const isValid = types.some((type) => {
          if (type === "undefined") return typeof value === "undefined";
          if (type === "null") return value === null;
          if (type === "array") return Array.isArray(value);
          if (type instanceof Function) return type(value);
          return typeof value === type;
        });
        o[key] = undefined;
        if (!isValid) return [key, this.error(`Key \`${key}\` is invalid`)];
        else return [key, isValid];
      }
    );
    const keys = Object.keys(o);
    const isRemain = keys.filter((key) => typeof o[key] !== "undefined");
    const isValid = validKeys.every(([, valid]) => valid);
    if (this.strict && isRemain.length > 0) {
      this.error(
        `Key ${isRemain.map((s) => `\`${s}\``).join(", ")} is not allowed`
      );
      return false;
    }
    return isValid;
  };
}
