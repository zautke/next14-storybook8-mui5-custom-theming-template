// https://github.com/douglascrockford/JSON-js/blob/master/json2.js (file since reverted)
export const isValidJSON = (text: string) =>
	/^[\],:{}\s]*$/.test(
		text
			.replace(/\\["\\\/bfnrtu]/g, "@")
			.replace(
				/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				"]",
			)
			.replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
	);
