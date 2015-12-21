var twitterApp = angular.module('twitterApp',['ngRoute','ngCookies']);

	twitterApp.config(function($routeProvider){
		$routeProvider.when('/',{
			templateUrl: 'pages/default-tweets.html',
			controller: 'twitterController'
		}).
		when('/:firstParam',{
			templateUrl: 'pages/default-tweets.html',
			controller: 'otherController'
		}).
		when('/:firstParam/:secondParam',{
			templateUrl: 'pages/default-tweets.html',
			controller: 'thirdController'
		}).
		otherwise({
			redirectTo: '/'
		});
	});
	twitterApp.controller('twitterController', function ($scope,$http){
		
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=trump';	
			$http.get(twitterURL).success(function (tweetData){
				$scope.tweets = tweetData.statuses;
				console.log($scope.tweets)
				for (i=0;i<tweetData.statuses.length;i++) {
					if($scope.tweets[i].user.profile_banner_url == null) {
						$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
					}
				};
			});
	});

	twitterApp.controller('otherController', function ($scope, $http, $routeParams){
		var searchVar = $routeParams.firstParam;
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash='+searchVar;
		$http.get(twitterURL).success(function (tweetData){
			$scope.tweets = tweetData.statuses;
			for(i=0;i<tweetData.statuses.length;i++){
				if($scope.tweets[i].user.profile_banner_url == null) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
				}
			}
		});
	});

	twitterApp.controller('thirdController', function ($scope, $http, $routeParams){
		var searchVar = $routeParams.firstParam;
		var secondVar = '&secondHash='+$routeParams.secondParam;
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash='+searchVar+secondVar;
		$http.get(twitterURL).success(function (tweetData){
			$scope.tweets = tweetData.statuses;
			for(i=0;i<tweetData.statuses.length;i++){
				if($scope.tweets[i].user.profile_banner_url == null) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
				}
			}

		})
	});










