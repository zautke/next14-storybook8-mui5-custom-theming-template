export function deepMerge<
	T extends Record<string, unknown>,
	U extends Record<string, unknown>,
>(obj1: T, obj2: U): Record<string, unknown> {
	const mergedObj: Record<string, unknown> = {} as Record<string, unknown>;

	for (const key of Object.keys(obj1)) {
		if (Object.prototype.hasOwnProperty.call(obj2, key)) {
			// Check if both properties are objects and not null
			if (
				typeof obj1[key] === "object" &&
				obj1[key] !== null &&
				typeof obj2[key] === "object" &&
				obj2[key] !== null
			) {
				mergedObj[key] = deepMerge<T, U>(obj1[key] as T, obj2[key] as U);
			} else {
				// If they are not both objects, prefer obj2's value
				mergedObj[key] = obj2[key];
			}
		} else {
			mergedObj[key] = obj1[key];
		}
	}

	for (const key of Object.keys(obj2)) {
		if (!Object.prototype.hasOwnProperty.call(mergedObj, key)) {
			mergedObj[key] = obj2[key];
		}
	}

	return mergedObj;
}

import type {
	FullJsonArray,
	FullJsonObject,
	FullJsonValue,
} from "@typings/util";

export function removeExtraSpaces(str: string | string[]): string | string[] {
	return Array.isArray(str)
		? str.map((item) => item.replace(/\s+/g, " ").trim())
		: str.replace(/\s+/g, " ").trim();
}

export function deepJsonPluck(
	json: FullJsonObject | FullJsonArray | string,
	pattern: RegExp,
): FullJsonValue[] | string {
	const results: FullJsonValue[] = [];

	function recursiveSearch(value: FullJsonValue): void {
		if (typeof value === "string" && pattern.test(value)) {
			results.push(value);
		} else if (typeof value === "object" && value !== null) {
			if (Array.isArray(value)) {
				for (const item of value) {
					recursiveSearch(item);
				}
			} else {
				for (const key in value) {
					if (Object.prototype.hasOwnProperty.call(value, key)) {
						recursiveSearch(value[key]);
					}
				}
			}
		}
	}

	recursiveSearch(json);
	return results;
}

export function isHtml(str: string): boolean {
	return /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(
		str,
	);
}

export const isSSR = typeof window === "undefined";
export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";
