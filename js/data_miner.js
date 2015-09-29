define(['js/ajax'], function (ajax) {
	var dm = function () {
		return {
			getCountyPropData(accountid) {
				var data = {
					ACCOUNTNO: accountid,
					BUILDING: 1
				}
				
			}
		};
	};
	return new dm();
})
