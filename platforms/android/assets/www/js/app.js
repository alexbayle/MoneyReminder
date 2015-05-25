var appIndex = $.inherit({

    duration: 300,
    sideBarOpent: false,
    friendOpen: false,

    __constructor : function() {
        this.body = $('body');
        this.sidebar = this.body.find('.sidebar');
        this.btnMenu = this.body.find('a.display-sidebar');
        this.sidebarSize = this.sidebar.width();

        this.friendsPanel = this.body.find('.friend-panel-mini');
        this.friendsPanelSize = this.friendsPanel.outerHeight();
        this.friendsPanelOpenSize = this.friendsPanel.find('.friend-open-panel').outerHeight();
        this.btnRecover = this.friendsPanel.find('.recover');
        this.btnDue = this.friendsPanel.find('.due');

        this.initEvents();
    },

    initEvents : function() {
        this.initMenu();
        this.initFriends();
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

        this.friendsPanel.delegate(this.btnRecover, 'click', function(e) {
            // Recuperer div parent et l'attr data-id pour savoir quel friend modifier
            e.preventDefault();
            var action = $(e.target).attr('class');
            var panel = $(e.target).parent('.friend-panel-mini');
            var data = {
                'action': action,
                'panel': panel
            };
            if (data.panel.hasClass('active')) {
                self.closeFriendPanel(data);
            } else {
                // Affiche popin de formulaire
                if (action == 'recover') {
                    self.friendsPanel.height(self.friendsPanelSize);
                    self.friendsPanel.removeClass('active');
                    console.log("Affiche recover panel");
                    self.openFriendPanel(data);
                }
                if (action == 'due') {
                    self.friendsPanel.height(self.friendsPanelSize);
                    self.friendsPanel.removeClass('active');
                    self.friendsPanel.height(self.friendsPanelSize);
                    console.log("Affiche due panel");
                }
            }
        })
    },

    closeFriendPanel : function(data) {
        $(data.panel).stop().animate({
            'height': this.friendsPanelSize,
            'ease': 'ease'
        }, 300);
        $(data.panel).removeClass('active');
    },

    openFriendPanel : function(data) {
        console.log(data.id + " est l'ID du parent");
        this.friendsPanel.height(this.friendsPanelSize);
        this.openFriendPanelSize = this.friendsPanelSize + this.friendsPanelOpenSize;

        $(data.panel).stop().animate({
            'height': this.openFriendPanelSize,
            'ease': 'ease'
        }, 300);
        $(data.panel).addClass('active');
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
    }
});
new appIndex();

/*
$(document).ready(function() {
    var body = $('body');
    var sidebar = body.find('.sidebar');
    var btnMenu = body.find('a.display-sidebar');
    var sidebarSize = sidebar.width();

    var friendsPanel = body.find('.friend-panel-mini');
    var friendsPanelSize = friendsPanel.outerHeight();
    var friendsPanelOpenSize = friendsPanel.find('.friend-open-panel').outerHeight();
    var btnRecover = friendsPanel.find('.recover');
    var btnDue = friendsPanel.find('.due');

    var duration = 500;
    var sidebarOpen = false;
    var friendOpen = false;
    console.log(friendsPanel);

    btnMenu.on('click', function (e) {
        e.preventDefault();
        console.log(sidebarSize);
        if (sidebarOpen){
            body.stop().animate({
                'left': 0
            }, duration);
            sidebarOpen = false;
        } else {
            body.stop().animate({
                'left': sidebarSize
            }, duration);
            sidebarOpen = true;
        }
    })

    friendsPanel.delegate(btnRecover, 'click', function(e) {
        // Recuperer div parent et l'attr data-id pour savoir quel friend modifier
        e.preventDefault();
        var action = $(e.target).attr('class');
        var panel = $(e.target).parent('.friend-panel-mini');
        var data = {
            'action': action,
            'panel': panel
        };
        if (data.panel.hasClass('active')) {
            closeFriendPanel(data);
        } else {
            // Affiche popin de formulaire
            if (action == 'recover') {
                friendsPanel.height(friendsPanelSize);
                friendsPanel.removeClass('active');
                console.log("Affiche recover panel");
                openFriendPanel(data);
            }
            if (action == 'due') {
                friendsPanel.height(friendsPanelSize);
                friendsPanel.removeClass('active');
                friendsPanel.height(friendsPanelSize);
                console.log("Affiche due panel");
            }
        }
    })

    function openFriendPanel(data) {
        console.log(data.id + " est l'ID du parent");
        friendsPanel.height(friendsPanelSize);
        var openFriendPanelSize = friendsPanelSize + friendsPanelOpenSize;
        $(data.panel).stop().animate({
            'height': openFriendPanelSize,
            'ease': 'ease'
        }, 300);
        $(data.panel).addClass('active');
    }

    function closeFriendPanel(data) {
        $(data.panel).stop().animate({
            'height': friendsPanelSize,
            'ease': 'ease'
        }, 300);
        $(data.panel).removeClass('active');
    }
})
*/