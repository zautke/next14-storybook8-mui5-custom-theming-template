import dayjs from "dayjs";

export const timestampNow = () => {
	const currentDate = dayjs();
	return currentDate.format("YYYY-MM-DD HH:mm:ss");
};
