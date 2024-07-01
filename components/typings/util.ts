/**
 * ${1:Description placeholder}
 *
 * @export
 * @typedef {JsonValue}
 * @template T
 */
export type JsonValue<T> = string | JsonObjectArray<T>;
/**
 * ${1:Description placeholder}
 *
 * @export
 * @typedef {JsonObject}
 * @template T
 */
export type JsonObject<T> = { [key: string]: T };
/**
 * ${1:Description placeholder}
 *
 * @export
 * @typedef {JsonObjectArray}
 * @template T
 */
export type JsonObjectArray<T> = JsonObject<T>[];
/**
 * ${1:Description placeholder}
 *
 * @export
 * @typedef {JsonArray}
 * @template T
 */
export type JsonArray<T> = Array<JsonValue<T>>;

/**
 * ${1:Description placeholder}
 *
 * @export
 * @typedef {FullJsonArray}
 */
export type FullJsonArray = Array<FullJsonValue>;
/**
 * ${1:Description placeholder}
 *
 * @export
 * @typedef {FullJsonValue}
 */
export type FullJsonValue =
	| string
	| number
	| boolean
	| FullJsonObject
	| FullJsonArray
	| null;
/**
 * ${1:Description placeholder}
 *
 * @export
 * @typedef {FullJsonObject}
 */
export type FullJsonObject = {
	[key: string]: FullJsonValue;
};
