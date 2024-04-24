const defaultValueB2B = 300000;
const defaultValueB2C = 220000;
const defaultRanges = ['Deal', 'Prospects', 'Ratio'];

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('amount-b2b').innerHTML = formatValue(defaultValueB2B);
	document.getElementById('amount-b2c').innerHTML = formatValue(defaultValueB2C);
	document.getElementById('rangeDealLabel').innerHTML = '0';
	document.getElementById('rangeProspectsLabel').innerHTML = '0';
	document.getElementById('rangeRatioLabel').innerHTML = '0';

	for (let rangeId of defaultRanges) {
		const input = document.getElementById('range' + rangeId + 'Value');
		input.addEventListener('input', () => {
			calculateValue();
		});
	}
});

window.addEventListener('resize', function () {
	showRangeLabels(defaultRanges);
});

function formatValue(value) {
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	});
}

function calculateValue() {
	const dealValue = document.getElementById('rangeDealValue').value;
	const prospectsValue = document.getElementById('rangeProspectsValue').value;
	const ratioValue = document.getElementById('rangeRatioValue').value;

	let amountB2B = defaultValueB2B;
	amountB2B -= 1000 * dealValue; //Discount 1000 per deal
	amountB2B += 250 * prospectsValue; //Increase 250 per prospect
	amountB2B -= 5 * ratioValue; //Discount 5 per ratio

	let amountB2C = defaultValueB2C;
	amountB2C -= 800 * dealValue; //Discount 800 per deal
	amountB2C += 200 * prospectsValue; //Increase 200 per prospect
	amountB2C -= 4 * ratioValue; //Discount 4 per ratio

	document.getElementById('amount-b2b').innerHTML = formatValue(amountB2B);
	document.getElementById('amount-b2c').innerHTML = formatValue(amountB2C);

	showRangeLabels(defaultRanges);
}

function showRangeLabels(ids) {
	if (typeof ids == 'string') {
		ids = [ids];
	}

	for (let id of ids) {
		const value = document.getElementById('range' + id + 'Value').value;
		const width = document.getElementById('range' + id + 'Container').offsetWidth;
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

		const element = document.getElementById('range' + id + 'Label');
		element.innerHTML = value;
		element.style.paddingLeft = `${left}px`;
	}
}

function changeReach(prefixIn, prefixOut) {
	document.getElementById(prefixIn + '-button').classList.add('active');
	document.getElementById(prefixOut + '-button').classList.remove('active');

	const hideElements = ['amount', 'text'];

	for (let id of hideElements) {
		document.getElementById(id + '-' + prefixIn).classList.remove('hidden');
		document.getElementById(id + '-' + prefixOut).classList.add('hidden');
	}
}
