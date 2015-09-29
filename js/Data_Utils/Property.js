define(['js/ajax'], function (ajax) {
	var tps = function () {
		return {
			getSherifSaleDates: function() {
				// TODO set last param to false (use_cache) we want live dates.
				// TODO or better yet implement cache expiration and make this expire after a couple hours.
				return ajax.post({}, ajax.service.details.getSaleDates, true, true);
			},
			getSherifSaleRecordForDate: function(date) {
				return ajax.post({sDate: date}, ajax.service.details.getSaleRecord);
			}
		}
	};
	return new tps();
})
