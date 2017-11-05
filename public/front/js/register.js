$(function(){

  $(".btn_getcode").on('click',function()
  {
     $this=$(this);
   if($this.hasClass("disabled")){
     return false;
   }
    $.ajax({
      type:'get',
      url:" /user/vCode",
      success:function(data){
        //console.log(data);
        tools.checkLogin(data);
        var count=60;
        var timer =  setInterval(function(){
          count--;
          $this.addClass('disabled').html(count+'秒后重新获取验证码');
          if(count<=0){
            $this.removeClass("disabled").html("获取验证码");
            clearInterval(timer);
          }
        },1000);
      }
    })






  })


  $(".btn_register").on('click',function(){

    var username=$("[name='username']").val();
    var password=$("[name='password']").val();
    var repassword=$("[name='repassword']").val();
    var mobile=$("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();
    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    if(!password){
      mui.toast("请输入密码");
      return false;
    }
    if(!repassword){
      mui.toast("请输入确认密码");
      return false;
    }
    if(!vCode){
      mui.toast("请输入验证码");
      return false;
    }
    if(!/^\d{6}$/.test(vCode)){
      mui.toast("请输入有效验证码");
      return false;
    }
    if(!mobile){
      mui.toast("请输入手机号");
      return false;
    }
    if(!/^1[34578]\d{9}$/.test(mobile)){
      mui.toast("请输入有效手机号")
    };
    $.ajax({
      type:"post",
      url:"/user/register",
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success:function(data){
        //console.log(data);
        if(data.success){
          mui.toast("注册成功,即将跳转到登陆页")
          setTimeout(function(){
            location.href='login.html';
          },1000)
        }else {
          mui.toast(data.message);
        }
      }
    })
  })





})