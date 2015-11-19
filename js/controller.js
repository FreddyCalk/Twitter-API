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

	twitterApp.controller('twitterController',function ($scope,$http){
		
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=trump&secondHash=women';	
			$http.get(twitterURL).success(function (tweetData){
				console.log(tweetData);
				$scope.tweets = tweetData.statuses;

			})
	})

twitterApp.controller('otherController', function($scope,$http, $routeParams){
		var searchVar = $routeParams.firstParam;
		var secondVar = '&secondHash='+searchVar;
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=trump';
		$http.get(twitterURL).success(function (tweetData){
			console.log(tweetData);

		})
})










