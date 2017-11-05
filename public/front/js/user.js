$(function(){
  $.ajax({
    type:'get',
    url:"/user/queryUserMessage",
    success:function(data){
      //console.log(data);
      tools.checkLogin(data);
      var html=template('tpl',data);
      $(".userinfo").html(html);
    }
  });


  $(".logout a").on('click',function(){
    mui.confirm('你确认退出吗？','温馨提示',['是','否'],function(e){
      //console.log(e);
      if(e.index==0){
        mui.toast("退出成功");
        $.ajax({
          type:"get",
          url:"/user/logout",
          success:function(data){
            //console.log(data);
            if(data.success){
              location.href='login.html';
            }
          }
        })
      }
    })




  })

})