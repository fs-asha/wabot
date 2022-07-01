(function () {
    "use strict";
    var $slimScrolls = $(".slimscroll");
    if ($slimScrolls.length > 0) {
      $slimScrolls.slimScroll({
        height: "auto",
        width: "100%",
        position: "right",
        size: "7px",
        color: "#ccc",
        wheelStep: 10,
        touchScrollStep: 100,
      });
      var wHeight = $(window).height();
      $slimScrolls.height(wHeight);
      $(
        ".left-sidebar .slimScrollDiv, .sidebar-menu .slimScrollDiv, .sidebar-menu .slimScrollDiv"
      ).height(wHeight);
      $(".right-sidebar .slimScrollDiv").height(wHeight - 30);
      $(".chat .slimScrollDiv").height(wHeight - 70);
      $(".chat.settings-main .slimScrollDiv").height(wHeight);
      $(".right-sidebar.video-right-sidebar .slimScrollDiv").height(wHeight - 90);
      $(window).resize(function () {
        var rHeight = $(window).height();
        $slimScrolls.height(rHeight);
        $(
          ".left-sidebar .slimScrollDiv, .sidebar-menu .slimScrollDiv, .sidebar-menu .slimScrollDiv"
        ).height(rHeight);
        $(".right-sidebar .slimScrollDiv").height(wHeight - 30);
        $(".chat .slimScrollDiv").height(rHeight - 70);
        $(".chat.settings-main .slimScrollDiv").height(wHeight);
        $(".right-sidebar.video-right-sidebar .slimScrollDiv").height(
          wHeight - 90
        );
      });
    }

    // activate the menu in left side bar (Vertical Menu) based on url
    $("#chat-menus a").each(function () {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl) {
            $(this).addClass("active");
            $(this).parent().addClass("menuitem-active");
            $(this).parent().parent().parent().addClass("show");
            
            var firstLevelParent = $(this).parent().parent().parent().parent().parent().parent();
            if (firstLevelParent.attr('id') !== 'sidebar-menu')
                firstLevelParent.addClass("show");
            
            var secondLevelParent = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent();
            if (secondLevelParent.attr('id') !== 'wrapper')
                secondLevelParent.addClass("show");
        }
    });

})();