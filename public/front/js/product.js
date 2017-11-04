$(function(){

mui(".mui-scroll-wrapper").scroll({
  indicators:false
});
 var id=tools.getParam('productId');
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id :id
    },
    success:function(data){
      //console.log(data);
      //console.log(data.size);
      var temp=data.size.split("-");
      //console.log(temp);
      var arr=[];
      for(var i=temp[0];i<=temp[1];i++){
        arr.push(i);
      }
      //console.log(arr);
      data.arr=arr;
      var html=template("tpl",data);
      $(".mui-scroll").html(html);
      mui(".mui-slider").slider({
        interval:1000
      });

      mui(".mui-numbox").numbox();

    }
  });

  //尺码选择功能
  $('.mui-scroll').on("click",'.size',function(){
    $(this).addClass("now").siblings().removeClass("now");
  });
  //添加购物车功能
$(".btn_add_cart").on("click",function(){
  var size=$(".size.now").html();
  var num=$(".mui-numbox-input").val();
  if(!size){
    mui.toast("请选择尺码");
    return false;
  }
  $.ajax({
    type:"post",
    url:"/cart/addCart",
    data:{
      productId:id,
      num:num,
      size:size
    },
    success:function(data){
      //console.log(data);
      if(data.success){
        mui.toast("添加成功");
      }
      if(data.error===400){
        //console.log(location.href);
        location.href='login.html?retUrl='+location.href;
      }
    }
});



  })




})