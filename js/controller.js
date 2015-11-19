var myApp = angular.module('twitterApp',[])

myApp.controller('twitterController',function ($scope,$http){
	var apiKey = 'xlAgMS5Vz808jUe429KWaV7vyrtaEEpFas0>B';
	var twitterURL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&since_id='+apiKey;
	console.log(twitterURL)
	$http.get(twitterURL).success(function (tweetData){
		console.log(tweetData);

	})
})