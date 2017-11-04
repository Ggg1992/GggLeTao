
if(location.href.indexOf("login.html")<0){
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    success:function (data) {
        if(data.error===400){
          location.href='login.js';
        }
    }
})
};
// 设置进度条
$(window).ajaxStart(function () {
  NProgress.start();
});
$(window).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done()
  },500);
});

//index.js
$(function () {
  $(".icon_logout").on("click",function () {
    $('#logoutModal').modal("show");
  });
$(".child").prev().on('click',function () {
  $(this).next().slideToggle();
});
  $(".lt_nav li>a").on("click",function () {
    $(this).css({
      borderLeft:'3px solid #3c8dbc',
      background:"#1d1f21",
      color:'#fff'
    }).parent().siblings().children('a').css({
      borderLeft:'3px solid transparent',
      background:"#222d32",
      color:'#ccc'
    });
  
    

  });
  
  // $(".lt_nav .child>a").on("click",function () {
  //   $(this).css({
  //     borderLeft:'3px solid #3c8dbc',
  //     background:"#1d1f21",
  //     color:'#fff'
  //   }).siblings().css({
  //     borderLeft:'3px solid transparent',
  //     background:"#222d32",
  //     color:'#ccc'
  //   });
  
  
  $(".icon_menu").on("click",function () {
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
  });
  $(".btn_logout").on('click',function () {
    $.ajax({
      type:'get',
      url:"/employee/employeeLogout",
      success:function (data) {
        // console.log(data);
        if(data.success){
          // console.log(location.href);
          location.href='login.js';
        }
      }
    })
  })
});
