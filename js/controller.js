var twitterApp = angular.module('twitterApp',['ngRoute']);

twitterApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateURL: 'index.html',
		controller: 'twitterController'
	}).
	when('/:firstParam',{
		templateURL: 'pages/otherTweets.html',
		controller: 'otherController'
	}).
	otherwise({
		redirectTo: '/'
	});
})

twitterApp.controller('twitterController',twitterController);


	var twitterController =	function ($scope,$http) {
		var apiKey = 'xlAgMS5Vz808jUe429KWaV7vyrtaEEpFas0>B';
		var searchTerm = "trump";
		var twitterURL = 'https://api.twitter.com/1.1/search/tweets.json?q=%23'+searchTerm+'&since_id='+apiKey;
		console.log(twitterURL)
			$http.get(twitterURL).success(function (tweetData) {
				console.log(tweetData);
				$scope.tweetText = tweetData.text;
				$scope.tweetUser = tweetData.user;
			});
	}

twitterApp.controller('otherController', function($scope,$http, $routeParams){
	var firstParam = $routeParams.firstParam;
	
	
});










