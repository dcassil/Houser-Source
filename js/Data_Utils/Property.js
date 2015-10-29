define(['js/ajax', './utility', 'js/xml',], function (ajax, utility, xml) {
	var tps = function () {
		return {
			getSherifSaleDates: function () {
				// TODO set last param to false (use_cache) we want live dates.
				// TODO or better yet implement cache expiration and make this expire after a couple hours.
				return ajax.post({}, ajax.service.details.getSaleDates, true, true);
			},
			getSherifSaleRecordForDate: function (date) {
				return ajax.post({sDate: date}, ajax.service.details.getSaleRecord);
			},
			getAccountData: function (account_ids) {
				var self = this,
					query = Parse.Query('Account');

				query.query.containedIn("ACCOUNTNO", account_ids);

				query.find({
					success: function(results) {
						console.log(results);
					},
					error: function(error) {
						console.log(error);
					}
				})
			},
			getImprovementData: function (account_ids) {
				var self = this,
					deferred = $.Deferred(),
					query = new Parse.Query('Improvement');

				query.containedIn("ACCOUNTNO", account_ids);

				query.find({
					success: function(results) {
						deferred.resolve(results);
					},
					error: function(error) {
						deferred.reject(error);
					}
				})

				return deferred;
			},
			getZillowDeepSearch: function (model) {
				var self = this,
					deferred = $.Deferred(),
					data;

				data = {
					'zws-id': ajax.api_keys.zillow,
					address: (model.get('address')),
					citystatezip: (model.get('city') + '+' + model.get('state'))
				};

				ajax.genericCallXML('POST', data, ajax.api.zillow, ajax.service.zillow.deepSearch, {
					success: function (resp) {
						if (resp) {
							var zd;
							if (resp.getElementsByTagName('result').length) {
								zd = xml.toJSON(resp.getElementsByTagName('result')[0]);
								model.set('zpid', zd.zpid['#text']);
								model.set('baths', zd.bathrooms['#text']);
								model.set('beds', zd.bedrooms['#text']);
								model.set('sqft', zd.finishedSqFt['#text']);
								model.set('lot', zd.lotSizeSqFt['#text']);
								model.set('year_built', zd.yearBuilt['#text']);
								model.set('zest_avg', utility.asDollar(zd.zestimate.amount['#text']));
								model.set('zest_high', utility.asDollar(zd.zestimate.valuationRange.high['#text']));
								model.set('zest_low', utility.asDollar(zd.zestimate.valuationRange.low['#text']));
								model.set('last_sold_date', zd.lastSoldDate ? zd.lastSoldDate['#text'] : 'na');
								model.set('last_sold_price', zd.lastSoldPrice ? '$' + utility.asDollar(zd.lastSoldPrice['#text']) : 'na');
								deferred.resolve();
							} else {
								console.log('Error! Zillow says: ' + $(resp.getElementsByTagName('message')).find('text').text());
								deferred.resolve();
							}

						} else {
							alert('Unkown zillow error.');
						}
					},
					error: function (resp) {
						console.error(resp);
						deferred.resolve();
					}
				});
				return deferred;
			}
		}
	};
	return new tps();
})
