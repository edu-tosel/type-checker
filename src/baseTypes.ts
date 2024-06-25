const isString = (value: unknown): value is string => typeof value === "string";
const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || isString(value);
const isNullableString = (value: unknown): value is string | null =>
  value === null || isString(value);
const isStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((v) => typeof v === "string");
const isNullableStrings = (value: unknown): value is (string | null)[] =>
  Array.isArray(value) &&
  value.every((v) => v === null || typeof v === "string");

const isNumber = (value: unknown): value is number => typeof value === "number";
const isOptionalNumber = (value: unknown): value is number | undefined =>
  value === undefined || isNumber(value);
const isNullableNumber = (value: unknown): value is number | null =>
  value === null || isNumber(value);
const isNumbers = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every((v) => typeof v === "number");
const isNullableNumbers = (value: unknown): value is (number | null)[] =>
  Array.isArray(value) &&
  value.every((v) => v === null || typeof v === "number");

const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
const isOptionalBoolean = (value: unknown): value is boolean | undefined =>
  value === undefined || isBoolean(value);
const isNullableBoolean = (value: unknown): value is boolean | null =>
  value === null || isBoolean(value);
const isBooleans = (value: unknown): value is boolean[] =>
  Array.isArray(value) && value.every((v) => typeof v === "boolean");
const isNullableBooleans = (value: unknown): value is (boolean | null)[] =>
  Array.isArray(value) &&
  value.every((v) => v === null || typeof v === "boolean");

const isObject = (value: unknown): value is object => typeof value === "object";
const isOptionalObject = (value: unknown): value is object | undefined =>
  value === undefined || isObject(value);
const isNullableObject = (value: unknown): value is object | null =>
  value === null || isObject(value);
const isObjects = (value: unknown): value is object[] =>
  Array.isArray(value) && value.every((v) => typeof v === "object");
const isNullableObjects = (value: unknown): value is (object | null)[] =>
  Array.isArray(value) &&
  value.every((v) => v === null || typeof v === "object");

const isSomethings = <T>(
  value: unknown,
  isSomething: (value: unknown) => value is T
): value is T[] => Array.isArray(value) && value.every(isSomething);
const isNullableSomethings = <T>(
  value: unknown,
  isSomething: (value: unknown) => value is T
): value is (T | null)[] =>
  Array.isArray(value) && value.every((v) => v === null || isSomething(v));

const baseTypeChecker = {
  isString,
  isOptionalString,
  isNullableString,
  isStrings,
  isNullableStrings,
  isNumber,
  isOptionalNumber,
  isNullableNumber,
  isNumbers,
  isNullableNumbers,
  isBoolean,
  isOptionalBoolean,
  isNullableBoolean,
  isBooleans,
  isNullableBooleans,
  isObject,
  isOptionalObject,
  isNullableObject,
  isObjects,
  isNullableObjects,
  isSomethings,
};
export default baseTypeChecker;
