var currentParam;

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
		
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=trump&secondHash=clinton';	
			$http.get(twitterURL).success(function (tweetData){
				$scope.tweets = tweetData.statuses;
				console.log($scope.tweets)
				var blanksFound = 0;
				for (i=0;i<tweetData.statuses.length;i++) {
					if(($scope.tweets[i].user.profile_banner_url == null)&&(blanksFound%2 == 0)) {
						$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
						blanksFound++;
					}else if(($scope.tweets[i].user.profile_banner_url == null)&&(blanksFound%2 == 1)) {
						$scope.tweets[i].user.profile_banner_url = "assets/images/Hallary-Clinton-2015-Banner.jpg";
						blanksFound++;
					}
				};
			});
	});

	twitterApp.controller('otherController', function ($scope, $http, $routeParams){
		var searchVar = $routeParams.firstParam;
		currentParam = searchVar;
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash='+searchVar;
		$http.get(twitterURL).success(function (tweetData){
			$scope.tweets = tweetData.statuses;
			for(i=0;i<tweetData.statuses.length;i++){
				if(($scope.tweets[i].user.profile_banner_url == null)&&(searchVar == 'trump')) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
				}else if(($scope.tweets[i].user.profile_banner_url == null)&&(searchVar == 'clinton')) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/Hallary-Clinton-2015-Banner.jpg";
				}
			}
		$scope.submit = function(){
			console.log($scope.text);
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
				if(($scope.tweets[i].user.profile_banner_url == null)&&(searchVar == 'trump')) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
				}else if(($scope.tweets[i].user.profile_banner_url == null)&&(searchVar == 'clinton')) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/Hallary-Clinton-2015-Banner.jpg";
				}
			}

		})
	});

	twitterApp.controller('search-controller', function ($scope){
		$scope.submit = function(){
			var searchTerm = $scope.text.split(" ");
			if((currentParam !== 'clinton')&&(currentParam !== 'trump')){
				currentParam = undefined;
			}
			if((currentParam)&&($scope.text)){
				$('#search-field').val("");
				window.location.href = "#/"+currentParam+"/"+searchTerm[0];
			}else if($scope.text){
				$('#search-field').val("");
				window.location.href = "#/"+searchTerm[0];
			}
			currentParam = undefined;
			
		}
	})












