const defaultValue = 300000;

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('amount').innerHTML = formatValue(defaultValue);
	document.getElementById('rangeDealLabel').innerHTML = '0';
	document.getElementById('rangeProspectsLabel').innerHTML = '0';
	document.getElementById('rangeRatioLabel').innerHTML = '0';
});

window.addEventListener('resize', function () {
	showRangeLabels(['Deal', 'Prospects', 'Ratio']);
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
	
	let amount = defaultValue;
	amount -= 1000 * dealValue; //Discount 1000 per deal
	amount += (250 * prospectsValue); //Increase 250 per prospect
	amount -= 5 * ratioValue; //Discount 5 per ratio

	document.getElementById('amount').innerHTML = formatValue(amount);
	showRangeLabels(['Deal', 'Prospects', 'Ratio']);
}

function showRangeLabels(ids) {
	if(typeof ids == 'string') {
		ids = [ids];
	}

	for(let id of ids) {
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

		document.getElementById('range' + id + 'Label').innerHTML = value;
		document.getElementById('range' + id + 'Label').style.paddingLeft = `${left}px`;
	}
}
