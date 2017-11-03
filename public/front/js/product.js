$(function(){

mui(".mui-scroll-wrapper").scroll({
  indicators:false
})


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


  })




})