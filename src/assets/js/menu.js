/*---------- 03. Mobile Menu Active ----------*/
$.fn.vsmobilemenu = function (options) {
  var opt = $.extend(
    {
      menuToggleBtn: ".quanto-menu-toggle",
      bodyToggleClass: "quanto-body-visible",
      subMenuClass: "quanto-submenu",
      subMenuParent: "quanto-item-has-children",
      subMenuParentToggle: "quanto-active",
      meanExpandClass: "quanto-mean-expand",
      appendElement: '<span class="quanto-mean-expand"></span>',
      subMenuToggleClass: "quanto-open",
      toggleSpeed: 400,
    },
    options
  );

  return this.each(function () {
    var menu = $(this); // Select menu

    // Menu Show & Hide
    function menuToggle() {
      menu.toggleClass(opt.bodyToggleClass);

      // collapse submenu on menu hide or show
      var subMenu = "." + opt.subMenuClass;
      $(subMenu).each(function () {
        if ($(this).hasClass(opt.subMenuToggleClass)) {
          $(this).removeClass(opt.subMenuToggleClass);
          $(this).css("display", "none");
          $(this).parent().removeClass(opt.subMenuParentToggle);
        }
      });
    }

    // Class Set Up for every submenu
    menu.find("li").each(function () {
      var submenu = $(this).find("ul");
      submenu.addClass(opt.subMenuClass);
      submenu.css("display", "none");
      submenu.parent().addClass(opt.subMenuParent);
      submenu.prev("a").append(opt.appendElement);
      submenu.next("a").append(opt.appendElement);
    });

    // Toggle Submenu
    function toggleDropDown($element) {
      if ($($element).next("ul").length > 0) {
        $($element).parent().toggleClass(opt.subMenuParentToggle);
        $($element).next("ul").slideToggle(opt.toggleSpeed);
        $($element).next("ul").toggleClass(opt.subMenuToggleClass);
      } else if ($($element).prev("ul").length > 0) {
        $($element).parent().toggleClass(opt.subMenuParentToggle);
        $($element).prev("ul").slideToggle(opt.toggleSpeed);
        $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
      }
    }

    // Submenu toggle Button
    var expandToggler = "." + opt.meanExpandClass;
    $(expandToggler).each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        toggleDropDown($(this).parent());
      });
    });

    // Menu Show & Hide On Toggle Btn click
    $(opt.menuToggleBtn).each(function () {
      $(this).on("click", function () {
        menuToggle();
      });
    });

    // Hide Menu On out side click
    menu.on("click", function (e) {
      e.stopPropagation();
      menuToggle();
    });

    // Stop Hide full menu on menu click
    menu.find("div").on("click", function (e) {
      e.stopPropagation();
    });
  });
};

function applyMenu() {
  if (window.innerWidth <= 991.99) {
    $(".quanto-menu-wrapper.v3").vsmobilemenu();
  } else {
    $(".quanto-menu-wrapper.v2").vsmobilemenu();
  }

  if (
    !$(".quanto-menu-wrapper").hasClass("v2") &&
    !$(".quanto-menu-wrapper").hasClass("v3")
  ) {
    $(".quanto-menu-wrapper").vsmobilemenu();
  }
}
// Initially apply the correct menu
applyMenu();

// Reapply when the window is resized
$(window).resize(function () {
  applyMenu();
});
