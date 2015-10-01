define([], function () {
	var utility = function () {

		return {
			asDollar: function (n) {
				n = parseInt(n);
				return n.toFixed(2).replace(/./g, function(c, i, a) {
				    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
				});
			},
		};
	};
	return new utility();
})
