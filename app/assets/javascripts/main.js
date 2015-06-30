//= require_self
//= require_tree ./angular

var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize', 'ngDragDrop', 'ui.bootstrap']);

app.factory('Dashboard', ['$resource', function ($resource) {
    return $resource('/main/dashboard');
}]);

app.factory('Community', ['$resource', function ($resource) {
    return $resource('/main/community');
}]);

app.factory('Test', ['$resource', function ($resource) {
    return $resource('/test/index');
}]);

app.factory('RegisterNew', ['$resource', function ($resource) {
    return $resource('/users/create');
}]);

app.factory('SendPost', ['$resource', function ($resource) {
    return $resource('/main/postit');
}]);

app.factory('Register', ['$resource', function ($resource) {
    return $resource('/users/register');
}]);

app.factory('SignOut', ['$resource', function ($resource) {
    return $resource('/main/signout');
}]);

app.factory('SignIn', ['$resource', function ($resource) {
    return $resource('/main/signin');
}]);

app.factory('AnswerSave', ['$resource', function ($resource) {
    return $resource('/test/answer');
}]);

app.factory('TestSave', ['$resource', function ($resource) {
    return $resource('/test/save');
}]);

app.factory('TestFetch', ['$resource', function ($resource) {
    return $resource('/test/fetch');
}]);

app.factory('TestPart', ['$resource', function ($resource) {
    return $resource('/test/part');
}]);

app.factory('GetProfile', ['$resource', function ($resource) {
    return $resource('/main/profile');
}]);
