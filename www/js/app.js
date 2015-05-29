var appIndex = $.inherit({

    duration: 300,
    sideBarOpent: false,
    friendOpen: false,

    __constructor : function() {
        this.body = $('body');
        // SIDEBAR VAR
        this.sidebar = this.body.find('.sidebar');
        this.btnMenu = this.body.find('a.display-sidebar');
        this.sidebarSize = this.sidebar.width();

        this.main = this.body.find('.main');
        this.mainContent = this.body.find('.main-content');
        this.friendSinglePanel = this.body.find('.friend-panel-single');
        this.friendsPanel = this.mainContent.find('.friend-panel-mini');
        this.btnRecover = this.friendsPanel.find('.recover');
        this.btnDue = this.friendsPanel.find('.due');

        console.log(this.friendSinglePanel);

        // BOTTOM NAV VAR
        this.bottomNav = this.body.find('.main nav.bottom-nav');
        this.btnFriends = this.bottomNav.find('a.viewFriends');
        this.btnAddFriend = this.bottomNav.find('a.addFriend');

        this.screenWidth = $(window).width();


        this.initEvents();
    },

    initEvents : function() {
        this.initMenu();
        this.initFriends();
        this.initBottomNav();

        this.requestFindUser();
        this.requestFindAll();
        //this.testRequestAddFriend();
    },

    initBottomNav : function() {
        var self = this;

        this.btnFriends.on("click", function() {
            self.displayListFriends();
        });
        this.btnAddFriend.on("click", function() {
            self.displayAddFriend();
        });
    },

    initMenu : function() {
        var self = this;

        // MENU EVENT
        this.btnMenu.on('click', function (e) {
            e.preventDefault();
            console.log(self.sidebarSize);
            if (self.sidebarOpen){
                self.closeMenu();
            } else {
                self.openMenu();
            }
        })
    },

    initFriends : function() {
        var self = this;

        // Single Friend Panels bind
        this.mainContent.delegate(this.friendsPanel, 'click', function(e) {
            // Recuperer div parent et l'attr data-id pour savoir quel friend modifier
            e.preventDefault();
            var friendId = $(e.target).parent('.friend-panel-mini').data('id');
            var friendId = friendId;
            self.requestFindFriend(friendId);

        })
    },

    injectSingleFriend : function(friend) {
         // INJECT SINGLE FRIEND PANEL
        // DISPLAY THE PANEL
        this.displaySingleFriend();
    },

    displaySingleFriend : function() {
        // ANIMATE SINGLE FRIEND VIEW
        this.friendSinglePanel.stop().animate({
            'opacity': 1,
            'zIndex': 200
        }, this.duration);
        this.mainContent.css('display', 'none');
    },

    injectListFriends : function(list) {
        // INJECT LIST FRIENDS
        for(var i = 0; i < list.length; i++) {
            console.log(list[i].friend_name);
        }
        // DISPLAY VIEW
        this.displayListFriends();
    },

    displayListFriends : function() {
        this.mainContent.css('display', 'block');
        this.friendSinglePanel.stop().animate({
            "zIndex": 0,
            'opacity': 0
        }, this.duration);
    },

    displayAddFriend : function() {
        console.log("DISPLAY ADD FRIEND");
    },

    closeMenu : function() {
        this.body.stop().animate({
            'left': 0
        }, this.duration);
        this.sidebarOpen = false;
    },

    openMenu : function() {
        this.body.stop().animate({
            'left': this.sidebarSize
        }, this.duration);
        this.sidebarOpen = true;
    },

    requestAddFriend : function() {
        var data = {
            'type' : 'friend',
            'action' : 'add',
            'userid' : '1',
            'friend' : {
                'friend_id': 1,
                'friend_name' : 'alex',
                'moneyHeOwnesYou' : 23,
                'moneyToGetBack': 50,
                'friend_profilPic': 'dzazafzaf.png'
            }
        }
        $.ajax({
            url      : 'http://alexandrebayle.com/moneyreminder/controllers/friend_controller.php?',
            data     : {
                'type' : data.type,
                'action': data.action,
                'userid': data.userid,
                'friend': data.friend
            },
            dataType: 'json',
            success  : function(data) {
                console.log(data);
                console.log("HAHA");
            },
            error : function(data) {
                console.log(data);
                console.log("erreur ...");
            }
        });
    },

    requestFindAll : function() {
        var self = this;
        var data = {
            'type' : 'friend',
            'action' : 'findAll',
            'userid' : '1'
        }
        $.ajax({
            url      : 'http://alexandrebayle.com/moneyreminder/controllers/friend_controller.php?',
            data     : {
                'type' : data.type,
                'action': data.action,
                'userid': data.userid
            },
            dataType: 'json',
            success  : function(data) {
                console.log(data);
                self.injectListFriends(data);
            },
            error : function(data) {
                console.log(data);
                console.log("erreur ...");
            }
        });
    },

    requestFindFriend : function(id) {
        var self = this;

        var data = {
            'type' : 'friend',
            'action' : 'find',
            'userid' : '1',
            'friend' : {
                'friend_id': id
            }
        }
        $.ajax({
            url      : 'http://alexandrebayle.com/moneyreminder/controllers/friend_controller.php?',
            data     : {
                'type' : data.type,
                'action': data.action,
                'userid': data.userid,
                'friend': data.friend
            },
            dataType: 'json',
            success  : function(data) {
                console.log(data);
                self.injectSingleFriend(data);
            },
            error : function(data) {
                console.log(data);
                console.log("erreur ...");
            }
        });
    },

    requestFindUser : function() {
        var self = this;
        var data = {
            'type' : 'friend',
            'action' : 'findAll',
            'userid' : '1'
        }
        $.ajax({
            url      : 'http://alexandrebayle.com/moneyreminder/controllers/friend_controller.php?',
            data     : {
                'type' : data.type,
                'action': data.action,
                'userid': data.userid
            },
            dataType: 'json',
            success  : function(data) {
                console.log(data);
                self.injectListFriends(data);
            },
            error : function(data) {
                console.log(data);
                console.log("erreur ...");
            }
        });
    }
});
new appIndex();