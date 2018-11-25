module.exports = {
    computeShipping: (req, res) => {
		let params = compute(req.query);
		res.render('pages/results', params);
    },

    
};

function compute(query) {
    let weight = Number(query.weight);
	let type = query.mailType;
	let result;
	let rate;
	console.log("Weight: " + weight + ", Type: " + type);
	switch (type) {
		case 'stamped':
			if (weight <= 1){rate = .50;}
			else if (weight <= 2) {rate = .71;}
			else if (weight <= 3) {rate = .92;}
			else if (weight <= 42.875) {rate = 1.13;}
			break;
		case 'metered':
			if (weight <= 1){rate = .47;}
			else if (weight <= 2) {rate = .68;}
			else if (weight <= 3) {rate = .89;}
			else if (weight <= 150.0625) {rate = 1.10;}
			break;
		case 'flats':
			if (weight <= 1){rate = 1;}
			else if (weight <= 2) {rate = 1.21;}
			else if (weight <= 3) {rate = 1.42;}
			else if (weight <= 4) {rate = 1.63;}
			else if (weight <= 5) {rate = 1.84;}
			else if (weight <= 6) {rate = 2.05;}
			else if (weight <= 7) {rate = 2.26;}
			else if (weight <= 8) {rate = 2.47;}
			else if (weight <= 9) {rate = 2.68;}
			else if (weight <= 10) {rate = 2.89;}
			else if (weight <= 11) {rate = 3.1;}
			else if (weight <= 12) {rate = 3.31;}
			else if (weight <= 13) {rate = 3.52;}
			break;
		case 'package':
			if (weight <= 1){rate = 1;}
			else if (weight <= 2) {rate = 3.50;}
			else if (weight <= 3) {rate = 3.50;}
			else if (weight <= 4) {rate = 3.50;}
			else if (weight <= 5) {rate = 3.75;}
			else if (weight <= 6) {rate = 3.75;}
			else if (weight <= 7) {rate = 3.75;}
			else if (weight <= 8) {rate = 3.75;}
			else if (weight <= 9) {rate = 4.10;}
			else if (weight <= 10) {rate = 4.45;}
			else if (weight <= 11) {rate = 4.80;}
			else if (weight <= 12) {rate = 5.15;}
			else if (weight <= 13) {rate = 5.50;}
			break;
	}
	result = rate * weight;
	console.log("Rate: " + rate + ", Result: " + result);
	// convert result to money formatMoney
	var money = result.toFixed(2);
	// Setup JSON object
	var params = {weight: weight, result: money, rate: rate, type: type};
	return params;
	// render responses
	//res.render('pages/results', params);
	/*
	let op = query.operation;
    let num1 = Number(query.operand1);
    let num2 = Number(query.operand2);
    let result;

    switch (op) {
        case 'add':
            result = num1 + num2;
            break;

        case 'subtract':
            result = num1 - num2;
            break;
        
        case 'multiply':
            result = num1 * num2;
            break;
        
        case 'divide':
            result = num1 / num2;
            break;
    } 

    return result;
	*/
}