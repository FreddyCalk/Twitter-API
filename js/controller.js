var twitterApp = angular.module('twitterApp',['ngRoute','ngCookies']);

	twitterApp.config(function($routeProvider){
		$routeProvider.when('/',{
			templateUrl: 'pages/default-tweets.html',
			controller: 'twitterController'
		}).
		when('/:firstParam',{
			templateUrl: 'pages/other-tweets.html',
			controller: 'otherController'
		}).
		when('/:firstParam/:secondParam',{
			templateUrl: 'pages/other-tweets.html',
			controller: 'thirdController'
		}).
		otherwise({
			redirectTo: '/'
		});
	});
	twitterApp.controller('twitterController',['$cookies','$cookieStore','$scope','$window',function ($cookies,$cookieStore,$window,$scope,$http){
		
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash=trump';	
			$http.get(twitterURL).success(function (tweetData){
				$scope.tweets = tweetData.statuses;
				for (i=0;i<tweetData.statuses.length;i++) {
					tweetData.statuses[i].created_at = timePosted(tweetData.statuses,i);
					if($scope.tweets[i].user.profile_banner_url == null) {
						$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
					}
				};
			})
	}])

	twitterApp.controller('otherController',['$cookies','$cookieStore','$scope','$window', function ($cookies,$cookieStore,$window,$scope,$http,$routeParams){
		var searchVar = $routeParams.firstParam;
		var secondVar = '&secondHash='+searchVar;
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash='+searchVar;
		$http.get(twitterURL).success(function (tweetData){
			$scope.tweets = tweetData.statuses;
			for(i=0;i<tweetData.statuses.length;i++){
				tweetData.statuses[i].created_at = timePosted(tweetData.statuses,i);
				if($scope.tweets[i].user.profile_banner_url == null) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
				}
			}

		})
	})

	twitterApp.controller('thirdController', function($scope,$http, $routeParams){
		var searchVar = $routeParams.firstParam;
		var secondVar = '&secondHash='+$routeParams.secondParam;
		var twitterURL = 'http://ec2-52-34-116-224.us-west-2.compute.amazonaws.com/trump-tweets/?hash='+searchVar+secondVar;
		$http.get(twitterURL).success(function (tweetData){
			$scope.tweets = tweetData.statuses;
			for(i=0;i<tweetData.statuses.length;i++){
				tweetData.statuses[i].created_at = timePosted(tweetData.statuses,i);
				if($scope.tweets[i].user.profile_banner_url == null) {
					$scope.tweets[i].user.profile_banner_url = "assets/images/sample-cover.jpg";
				}
			}

		})
	})

function timePosted(data,index){
		timeString = data[index].created_at.slice(11,data[index].created_at.indexOf('+')-1);
		var hourMinSec = timeString.split(':');
		if((hourMinSec[0]<=24)&&(hourMinSec[0]>=5)){
			hourMinSec[0]-=5;
		}else{
			hourMinSec[0] = 24-(5-hourMinSec[0]);
		}
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();
		currentHourMinSec = [hours,minutes,seconds];
		var hourDiff = currentHourMinSec[0]-hourMinSec[0];
		var minDiff = currentHourMinSec[1]-hourMinSec[1];
		var secDiff = currentHourMinSec[2]-hourMinSec[2];
		if((hourDiff === 0)&&(minDiff === 0)){
			return secDiff+" seconds ago";
		}else if(hourDiff === 0){
			return minDiff+" minutes ago";
		}else{
			return hourDiff+" hours ago";
		}

}








