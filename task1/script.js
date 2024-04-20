const defaultValue = 300000;

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('amount').innerHTML = formatValue(defaultValue);
	document.getElementById('rangeValue').innerHTML = '0';
});

function formatValue(value) {
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	});
}

function calculate(value) {
	const width = document.getElementById('rangeContainer').offsetWidth;
	const amount = defaultValue - 1000 * value;
	let left = (width * value) / 100;

	if (value < 10) {
		left += 5;
	} else if (value < 30) {
		left -= 2;
	} else if (value < 60) {
		left -= 5;
	} else if (value < 80) {
		left -= 8;
	} else if (value < 100) {
		left -= 11;
	} else {
		left -= 20;
	}

	document.getElementById('amount').innerHTML = formatValue(amount);
	document.getElementById('rangeValue').innerHTML = value;
	document.getElementById('rangeValue').style.left = `${left}px`;
}
