export type IndexSignatureKey<T> = T extends string | number | symbol
	? T
	: never;

export type ObjectLiteral<I, T> = {
	[key in IndexSignatureKey<I>]: T;
};
