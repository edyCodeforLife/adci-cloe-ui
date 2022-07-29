import { isEmpty, clone } from 'lodash';

export const QrsToObj = (str) => {
	let search = str.substring(1);
	return search
		? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (
			key,
			value
		) {
			return key === '' ? value : decodeURIComponent(value);
		})
		: {};
};

export const validateEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export const getFormData = object => Object.keys(object).reduce((formData, key) => {
	formData.append(key, object[key]);
	return formData;
}, new FormData());

export function convertObjectKey(data, arr1, arr2) {
	let arrey = [];
	let temp = {};
	for (let i = 0; i < data?.length; i++) {
		Object.assign(temp, data[i]);
		for (let y = 0; y < arr1?.length; y++) {
			temp[arr2[y]] = temp[arr1[y]];
			delete temp[arr1[y]];
		}
		arrey.push(temp);
		temp = {}
	}
	return arrey;
}

export function scoreFactorColor(rating) {
	switch (rating?.toLowerCase()) {
		case "low":
			return "limegreen";
		case "medium":
			return "yellow";
		case "high":
			return "#EF3E3E";
	}
}


export const formattedDate = (
	_date,
	lang,
	withDayName,
	withTime,
	short,
	withoutYear
) => {
	const date = new Date(_date);

	const months = {
		idn: [
			'Januari',
			'Februari',
			'Maret',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Agustus',
			'September',
			'Oktober',
			'November',
			'Desember',
		],
		en: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
	};

	const monthsShort = {
		idn: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Agu',
			'Sep',
			'Okt',
			'Nov',
			'Des',
		],
		en: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
	};

	const dayLabel = {
		idn: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
		en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	};

	if (!isNaN(date.getTime())) {
		let year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate(),
			dayName = date.getDay(),
			hour = date.getHours(),
			minute = date.getMinutes();

		if (String(minute).length < 2) (minute) = '0' + minute;

		let monthName = months[lang][month];
		let dayText = dayLabel[lang][dayName];
		if (short) monthName = monthsShort[lang][month];
		if (lang === 'idn')
			return `${withDayName ? dayText + "," : ""} ${day < 10 ? '0' + day : day} ${monthName} ${withoutYear ? '' : year
				} ${withTime ? hour + ':' + minute : ''}`;
		else
			return `${withDayName ? dayText : ""} ${monthName} ${day < 10 ? '0' + day : day}${withoutYear ? ' ' : ', ' + year
				} ${withTime ? hour + ':' + minute : ''}`;
	}
	return undefined;
};