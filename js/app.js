/**
 * Created with JetBrains PhpStorm.
 * User: melanker
 * Date: 10/13/13
 * Time: 4:20 PM
 * To change this template use File | Settings | File Templates.
 */
// Code goes here


var webApp = angular.module('webApp', []);

//controllers
webApp.controller ('VotesCtrl', function ($scope, Votes) {
    $scope.votes  = Votes;

    $scope.statuses = ["Approved","Pending","Trash","Spam"];
    $scope.selectedID = 1;
    $scope.expand = function(vote) {
        console.log("show");
        $scope.vote = vote;

        $scope.selectedID = vote.id;
    };

    $scope.change = function() {
        for(var i = 0; i < $scope.votes.length; i++) {
            if($scope.votes[i].cb) {
                $scope.votes[i].status = $scope.votes.status;
                $scope.votes[i].cb = false;
            }
            $scope.show = false;
        }
    };

});

//services
webApp.factory('Votes', [function() {
    //temporary repository till integration with DB this will be translated into restful get query
    var votes = [
        {
            id: '1',
            created: 1381583344653,
            updated: '222212',
            ratingID: '3',
            rate: 5,
            ip: '198.168.0.0',
            status: 'Pending',
            userIdentification:'IP-ADDRESS'
        },
        {
            id: '111',
            created: 1381583344653,
            updated: '222212',
            ratingID: '4',
            rate: 5,
            ip: '198.168.0.1',
            status: 'Spam',
            userIdentification:'FLASH-COOKIES'

        },
        {
            id: '2',
            created: 1382387322693,
            updated: '222212',
            ratingID: '3',
            rate: 1,
            ip: '198.168.0.2',
            status: 'Approved',
            userIdentification:'HTTP-COOKIES'

        },
        {

            id: '4',
            created: 1382387322693,
            updated: '222212',
            ratingID: '3',
            rate: 1,
            ip: '198.168.0.3',
            status: 'Spam',
            userIdentification:'IP-ADDRESS'
        }
    ];
    return votes;
}]);


webApp.directive('icheck', function($timeout, $parse) {
    return {
        link: function($scope, element, $attrs) {
            return $timeout(function() {
                var ngModelGetter, value;
                ngModelGetter = $parse($attrs['ngModel']);
                value = $parse($attrs['ngValue'])($scope);
                return $(element).iCheck({
                    checkboxClass: 'icheckbox_minimal',
                    radioClass: 'iradio_minimal-grey',
                    checkboxClass: 'icheckbox_minimal-grey',
                    increaseArea: '20%'
                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModelGetter.assign($scope, event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModelGetter.assign($scope, value);
                            });
                        }
                    });
            });
        }
    };
});