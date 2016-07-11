var base_url = "http://52.221.250.174:3000/api";
loadPostList = function($scope, $state, $http, SharedDataFactory, category) {
    $scope.questions = [];
    $scope.searchKey = {};

    var url = base_url + "/get_posts";
    $http.get(url, { headers: {'Content-Type':'application/json', 'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}})
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                $scope.questions = [];
                for(var i = 0; i < data.posts.length; i++) {
                  var obj = data.posts[i];
                  //alert("i = "+i+"category="+category+" obj.category="+obj.category);
                  if (!category || (category==obj.category)) {
                    var new_index = $scope.questions.length;
                    $scope.questions[new_index] = {};
                    $scope.questions[new_index].id = obj.id;
                    $scope.questions[new_index].title = obj.content;
                    $scope.questions[new_index].info = "カテゴリー："+obj.category;
                    $scope.questions[new_index].info += "<br>"+obj.updated_at;
                    $scope.questions[new_index].info += "<br>回答数："+0;
                    $scope.questions[new_index].upvote = 0;
                    $scope.questions[new_index].downvote = 0;
                  }
                }
                //SharedDataFactory.questions = data.posts;
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });

    $scope.searchQuestions = function() {
      var url = base_url + "/get_posts";
      $http.get(url, { headers: {'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}})
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                $scope.questions = [];
                for(var i = 0; i < data.posts.length; i++) {
                  var obj = data.posts[i];
                  if (obj.content.indexOf($scope.searchKey.string) > -1) {
                    var new_index = $scope.questions.length;

                    $scope.questions[new_index] = {};
                    $scope.questions[new_index].id = obj.id;
                    $scope.questions[new_index].title = obj.content;
                    $scope.questions[new_index].info = "カテゴリー："+obj.category;
                    $scope.questions[new_index].info += "<br>"+obj.updated_at;
                    $scope.questions[new_index].info += "<br>回答数："+0;
                    $scope.questions[new_index].upvote = 0;
                    $scope.questions[new_index].downvote = 0;
                  }
                }
                SharedDataFactory.questions = data.posts;
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });
    };

    $scope.sort_rule = {};
    $scope.sort_rule.string = "新着";
    $scope.onSortRuleChanged = function() {
        if ($scope.sort_rule.string === "新着") {
            console.log("新着");
        }
        else {
            console.log("並び替えた");
        }
    }

    $scope.onClickedOneQuestion = function($question) {
        SharedDataFactory.clickedQuestion = $question;
        $state.go('page24');
    }
}

angular.module('app.controllers', [])
.controller('sidemenuCtrl', function($scope, $ionicSideMenuDelegate, SharedDataFactory) {
    $scope.user = {};
    if (SharedDataFactory.userInfo) {
      $scope.user.full_name = SharedDataFactory.userInfo.full_name;
    }
})
.controller('newCtrl', function($scope, $state, $http, SharedDataFactory) {
    loadPostList($scope, $state, $http, SharedDataFactory, null);
})

.controller('page10Ctrl', function($scope, $state, $http, SharedDataFactory) {
    loadPostList($scope, $state, $http, SharedDataFactory, "研究");
})

.controller('page11Ctrl', function($scope, $state, $http, SharedDataFactory) {
    loadPostList($scope, $state, $http, SharedDataFactory, "サークル");
})

.controller('page12Ctrl', function($scope, $state, $http, SharedDataFactory) {
    loadPostList($scope, $state, $http, SharedDataFactory, "イベント");
})

.controller('page13Ctrl', function($scope, $state, $http, SharedDataFactory) {
    loadPostList($scope, $state, $http, SharedDataFactory, "学生サポート");
})

.controller('page23Ctrl', function($scope, $http, SharedDataFactory) {


    $scope.questions = [];


    $scope.user = {};
    $scope.user.info = SharedDataFactory.userInfo.full_name;
    $scope.user.info += "<br/>"+SharedDataFactory.userInfo.birthday;
    $scope.user.info += "<br/>"+SharedDataFactory.userInfo.year;
    $scope.user.info += "<br/>"+SharedDataFactory.userInfo.faculty;
    $scope.user.info += "<br/>"+SharedDataFactory.userInfo.email;

    var url = base_url + "/get_posts";
    $http.get(url, { headers: {'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}})
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                for(var i = 0; i < data.posts.length; i++) {
                  var obj = data.posts[i];
                  var new_index = $scope.questions.length;
                  if (obj.user_id == SharedDataFactory.userInfo.id) {

                    $scope.questions[new_index] = {};
                    $scope.questions[new_index].id = obj.id;
                    $scope.questions[new_index].title = obj.content;
                    $scope.questions[new_index].info = "カテゴリー："+obj.category;
                    $scope.questions[new_index].info += "<br>"+obj.updated_at;
                    $scope.questions[new_index].info += "<br>回答数："+0;
                    $scope.questions[new_index].upvote = 0;
                    $scope.questions[new_index].downvote = 0;
                  }
                }
                SharedDataFactory.questions = data.posts;
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });

})

.controller('page6Ctrl', function($scope, $state, $http, SharedDataFactory) {
  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    var url = base_url + "/login";
    $http.post(url, {}, { params: { "user_name": $scope.loginData.username, "password": $scope.loginData.password } })
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                SharedDataFactory.userInfo = data;
                $state.go('phanPhucLac.new');
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });

  };
})

.controller('page8Ctrl', function($scope, $state, $http, SharedDataFactory) {
  $scope.user = {};
  $scope.user.school = SharedDataFactory.userInfo.faculty;
  $scope.user.grade = parseInt(SharedDataFactory.userInfo.year);
  $scope.user.full_name = SharedDataFactory.userInfo.full_name;
  $scope.user.birth = new Date(SharedDataFactory.userInfo.birthday);
  $scope.putNewUser = function() {
    console.log('putNewUser', $scope.user);
    var url = base_url + "/update_user";
    $http.put(url, {}, { headers: {'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}, params: {"user_name":SharedDataFactory.userInfo.user_name, "email":SharedDataFactory.userInfo.email, "full_name":$scope.user.full_name, "birthday":$scope.user.birth, "faculty":$scope.user.school, "year":$scope.user.grade  } })
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                SharedDataFactory.userInfo.faculty = data.faculty;
                SharedDataFactory.userInfo.year = data.year;
                SharedDataFactory.userInfo.birthday = data.birthday;
                SharedDataFactory.userInfo.full_name = data.full_name;
                $state.go('phanPhucLac.page15');
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });
  }
})
.controller('signupCtrl', function($scope, $state, $http, SharedDataFactory) {
  $scope.user = {};
  $scope.user.school = "法学部";
  $scope.user.grade = 1;
  $scope.putNewUser = function() {
    console.log('putNewUser', $scope.user);
    var url = base_url + "/signup";
    $http.post(url, {}, { params: { "user_name": $scope.user.username, "email":$scope.user.email, "password": $scope.user.password, "password_confirmation":$scope.user.password_retyped, "full_name":$scope.user.lastname+""+$scope.user.firstname, "birthday":$scope.user.birth, "faculty":$scope.user.school, "year":$scope.user.grade  } })
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                SharedDataFactory.userInfo = data;
                $state.go('signupsuccess');
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });
  }
})
.controller('page25Ctrl', function($scope, $state, $http, SharedDataFactory) {
  $scope.question = {};
  $scope.question.category = "研究";
  $scope.postNewQuestion = function() {
    console.log('question:', $scope.question);
    var url = base_url + "/create_post";
    $http.post(url, {}, { headers: {'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}, params: { "content":$scope.question.description, "category":$scope.question.category } })
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                //SharedDataFactory.question = data;
                $state.go('page14');
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });
   };

})

.controller('page15Ctrl', function($scope, $ionicHistory) {
    $scope.onClickedFinishButton = function() {
        $ionicHistory.goBack(-2);
    }
})
.controller('signupsuccessCtrl', function($scope, $state, $ionicHistory) {
    $scope.onClickedFinishButton = function() {
        $state.go('phanPhucLac.new');
    }
})

.controller('page14Ctrl', function($scope) {

})

.controller('page24Ctrl', function($scope, $http, SharedDataFactory) {
//○○のサークルに興味ありませんか？

    $scope.question = SharedDataFactory.clickedQuestion;

    $scope.onClickedUpVote = function() {
        if (!SharedDataFactory.voted) {
            $scope.question.upvote++;
            SharedDataFactory.voted = 1;
        } else if (SharedDataFactory.voted < 0) {
            $scope.question.downvote--;
            $scope.question.upvote++;
            SharedDataFactory.voted = 1;
        } else {
            $scope.question.upvote--;
            SharedDataFactory.voted = 0;
        }
    }
    $scope.onClickedDownVote = function() {
        if (!SharedDataFactory.voted) {
            $scope.question.downvote++;
            SharedDataFactory.voted = -1;
        } else if (SharedDataFactory.voted < 0) {
            $scope.question.downvote--;
            SharedDataFactory.voted = 0;
        } else {
            $scope.question.upvote--;
            $scope.question.downvote++;
            SharedDataFactory.voted = -1;
        }
    }

    $scope.answer = {};
    $scope.answers = [];

    $scope.onClickedSendAnswerButton = function() {
        if (!($scope.answer.content.length > 0)) {
            alert("no content!");
            return;
        }
        var url = base_url + "/create_post_answer/"+$scope.question.id;
        $http.post(url, {}, { headers: {'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}, params: { "post_id":$scope.question.id, "content":$scope.answer.content } })
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                //SharedDataFactory.question = data;
                $scope.answers[$scope.answers.length] = {"id":data.id, "content":data.content, "replies":[]};
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });
    }
    $scope.onClickedSendReplyToAnswerButton = function(answer, reply) {
        if (!(reply.content.length > 0)) {
            alert("no content!");
            return;
        }
        var url = base_url + "/create_comment_answer";
        $http.post(url, {}, { headers: {'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}, params: { "post_id":$scope.question.id, "answer_id":answer.id, "content":reply.content } })
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                var length = answer.replies.length;
                answer.replies[length] = {};
                answer.replies[length].content = data.content;

            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });
    }

    var url = base_url + "/get_post_answers/" + $scope.question.id;
    $http.get(url, { headers: {'Content-Type':'application/json', 'Authorization': 'Token token='+SharedDataFactory.userInfo.access_token}})
            .success(function(data, status, headers, config) {
                //alert("SUCCESS: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
                $scope.answers = data.answers;
                for(var i = 0; i < $scope.answers.length; i++) {
                    $scope.answers[i].replies = [];
                }
            })
            .error(function(data, status, headers, config) {
                alert("ERROR: data= "+JSON.stringify(data)+" status="+status+" config="+JSON.stringify(config));
            });
})
