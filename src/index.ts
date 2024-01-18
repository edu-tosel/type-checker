/**
 * @name TypeChecker
 * @author Minseong Kim <minseong@tosel.co.kr>
 * @description A simple type checker for typescript
 * @example
 * ```ts
 * const obj = {
 *   name: "John",
 *   age: 20,
 *   isMale: true,
 * }
 * const checker = new TypeChecker(obj)
 * const result = checker
 *   .is("name")
 *   .as("string")
 *   .is("age")
 *   .as("number")
 *   .is("isMale")
 *   .as(["boolean", "undefined"])
 *   .end();
 * console.log(result) // true
 * ```
 */
export interface TypeChecker {
  is(key: string | string[]): TypeChecker;
  as(type: TypeOf | TypeOf[]): TypeChecker;
  end(): boolean;
}

export class TypeChecker implements TypeChecker {
  obj: Record<string, any | undefined>;
  valid: boolean = true;
  message: string[] = [];
  key: string | string[] = "";
  isChecking: boolean = false;
  constructor(obj: Record<string, any | undefined>) {
    if (typeof obj !== "object")
      throw new TypeCheckerError("You must pass an object");
    this.obj = obj;
  }
  is(key: string | string[]) {
    this.key = key;
    this.isChecking = true;
    return this;
  }
  as(type: TypeOf | TypeOf[]) {
    let valid: boolean = false;
    if (!Array.isArray(type)) {
      if (typeof this.key === "string") {
        //type is typeof TypeOf and key is string
        valid = this.checkType(this.key, type);
        if (!valid) this.failed(this.key, typeof this.obj[this.key], type);
      } else {
        //type is typeof TypeOf and key is string[]
        valid = this.key.every((key) => {
          const result = this.checkType(key, type);
          if (!result) {
            this.failed(key, typeof this.obj[key], type);
          }
          return result;
        });
      }
    } else {
      if (typeof this.key === "string") {
        //type is typeof TypeOf[] and key is string
        valid = this.checkTypes(this.key, type);
        if (!valid) this.failedAll(this.key, typeof this.obj[this.key], type);
      } else {
        //type is typeof TypeOf[] and key is string[]
        valid = this.key.every((key) => {
          const result = this.checkTypes(key, type);
          if (!result) {
            this.failedAll(key, typeof this.obj[key], type);
          }
        });
      }
    }
    this.valid = valid && this.valid;
    return this;
  }
  end() {
    if (!this.valid) {
      this.message.forEach((a) => console.log(a));
    }
    return this.valid;
  }
  private checkTypes(key: string, types: TypeOf[]) {
    const result = types.some((type) => this.checkType(key, type));
    return result;
  }
  /**
   * Check the type of the key
   * @param key The key to check
   * @param type The type to check
   * @returns Returns true if the type is correct
   */
  private checkType(key: string, type: TypeOf) {
    const keyType = typeof this.obj[key] as TypeOf;
    if (type === "undefined") {
      return keyType === "undefined";
    } else if (type === "array") {
      return Array.isArray(this.obj[key]);
    } else if (type === "object") {
      return keyType === "object";
    } else if (type === "null") {
      return this.obj[key] === null;
    }
    if (typeof this.obj[key] !== type) {
      return keyType === type;
    }
    return true;
  }
  private failedAll(key: string, types: TypeOf, expected: TypeOf[]) {
    this.message.push(
      `The key ${key} must be one of ${expected} but got ${types}`
    );
    this.valid = false;
  }
  private failed(key: string, type: TypeOf, expected: TypeOf) {
    this.message.push(`The key ${key} must be ${expected} but got ${type}`);
    this.valid = false;
  }
}
type TypeOf =
  | "array"
  | "bigint"
  | "boolean"
  | "function"
  | "null"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined";
export class TypeCheckerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TypeCheckerError";
  }
}
