	//在angular的ng-app="demo"中引入sdk
	var demo = angular.module("demo", ["RongWebIMWidget"]);

	demo.config(function($logProvider){
	  // $logProvider.debugEnabled(false);
	})


	//配置appKey\token这两个基础函数
	demo.controller("main", ["$scope", "WebIMWidget","$http",function($scope,WebIMWidget,$http) {
	  $scope.server = WebIMWidget;
	  //初始化回调函数，只需要调用一次init方法
	  WebIMWidget.init({
	    appkey:"qd46yzrf44cnf",
	    token:"PD5v88SokxjEhgimIZ/qIRVUYfso8rAGhPbErpceSLeEo0APdHF6966j8LpjuncBqepJuq/EbjCWvCbzthWHHw==",
	    displayConversationList:true,
	    conversationListPosition:WebIMWidget.EnumConversationListPosition.left,
	    style:{
	       width:500,
	       height:600,
	       top:200,
	       left:0
	     },
	    onSuccess:function(id){
	      //初始化完成
	      console.log('success init');
	      //设置当前对话的setConversation只有在初始化成功后才能使用
	      WebIMWidget.setConversation(WebIMWidget.EnumConversationType.PRIVATE,"1","shea");
	      //设置用户信息
	      WebIMWidget.setUserInfoProvider(function(targetId,obj){
	      	jQuery.ajax({
	      	  url: 'http://7xp6o6.com1.z0.glb.clouddn.com/Users.json',
	      	  type: 'GET',
	      	  success: function(data, textStatus, xhr) {
	      	    //called when successful
	      	    console.log(data.userlist);
	      	    var users = data.userlist;
	      	    for (var i = 0; i < users.length; i++) {
	      	    	console.log(users);
	      	    	if (users[i].id == targetId) {
	      	    		obj.onSuccess({name:users[i].name,userId:users[i].id,portraitUri:users[i].portraitUri});
	      	    	}
	      	    }
	      	  },
	      	  error: function(xhr, textStatus, errorThrown) {
	      	    //called when there is an error
	      	    console.log(errorThrown);
	      	  }
	      	});
	      });

	    },
	    onError:function(){
	      //初始化错误
	      console.log('saddly');
	    }
	    
	  	});
	    WebIMWidget.show();
		//会话面板被关闭时
		WebIMWidget.onClose = function() {
			//do something
			console.log('is close');
		}

		//接收到消息时
		WebIMWidget.onReceivedMessage = function(message) {
			//message 收到的消息
			console.log('you got a message');
		}
		
		
	}]);
