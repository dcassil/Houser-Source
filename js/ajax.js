define([], function () {
	var ajax = function () {

		return {
			api_keys: {
				zillow: 'X1-ZWz1dehfmymz2j_7vqv1'
			},
			servers: {
				live: 'http://houser-2.apphb.com/WebUtilities/DetailsWebService.asmx/',
				dev: 'http://houser/WebUtilities/DetailsWebService.asmx/'
			},
			api: {
				zillow: 'http://www.zillow.com/webservice/'
			},
			service: {
				details: {
					getSaleDates: 'GetSherifSaleDates',
					getSaleRecord: 'GetSherifSaleRecord'
				},
				zillow: {
					deepSearch: 'GetDeepSearchResults.htm'
				}
			},
			post: function (data, service, parse, use_cache) {
				return this.callAjax("POST", data, service, parse, use_cache);
			},
			callAjax: function (method, data, service, parse, use_cache) {
				var deferred = $.Deferred(),
					options,
					cache_resp;

				parse = typeof parse === 'undefined' ? true : parse;
				use_cache = typeof use_cache === 'undefined' ? true : use_cache;

				options = {
					type: method,
					contentType: "application/json; charset=utf-8",
					url: this.servers.live + service,
					data: JSON.stringify(data),
					dataType: "json",
					async: true
				}

				// Need to implement cache expiration using the wrapped object with date time now idea.
				if (use_cache && window.localStorage) {
					cache_resp = localStorage.getItem(JSON.stringify(options));
				}

				if (cache_resp) {
					if (parse) {
						cache_resp = JSON.parse(cache_resp);
					}
					deferred.resolve(cache_resp);
				} else {
					$.ajax(options).done(function (resp) {
						if (resp && resp.d) {

							if (use_cache && window.localStorage) {
								localStorage.setItem(JSON.stringify(options), resp.d)
							}

							if (parse) {
								resp.d = JSON.parse(resp.d);
							}

							deferred.resolve(resp.d);
						} else {
							deferred.reject('resp or resp.d was empty.', resp)
						}
					}).fail(function (resp) {
						deferred.reject(resp);
					});
				}





				return deferred;
			},
			genericCallXML: function (method, data, server, service, callback) {
				$.get(server + service, data).done(callback.success).fail(callback.error);
			}
		};
	};
	return new ajax();
})
