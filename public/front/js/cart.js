$(function(){
  mui.init({
    pullRefresh:{
      container:'.mui-scroll-wrapper',
      down:{
        auto:true,
        callback:function(){
          $.ajax({
            type:"get",
            url:" /cart/queryCart",
            success:function(data){
              //console.log(data);
              setTimeout(function () {
                tools.checkLogin(data);
                var html=template('tpl',{data:data});
                $("#OA_task_2").html(html);
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              },1000);
            }
          })
        }
      }
    }
  });
  //删除功能:为了ios上一个bug，如果用到了下拉刷新或者上拉加载，mui禁用了click，需要使用tap

  $("#OA_task_2").on('tap','.btn_delete',function(){
    //console.log(1);
    var id=$(this).data("id");
mui.confirm('确定删除吗？','提示',['否','是'],function(e){
  if(e.index===0){
    mui.toast("操作取消");
  }else {
    $.ajax({
      type:"get",
      url:" /cart/deleteCart",
      data:{
        id:[id]
      },
      success:function(data){
        //console.log(data);
        tools.checkLogin(data);
        if(data.success){
          mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
        }
      }
    })


  }

})

  });


  $("#OA_task_2").on('tap','.btn_edit',function(){
  var data=this.dataset;
    //data.arr = [];
    //console.log(data);
    //var arr= data.productsize.split('-');
    //console.log(arr);
    //var newArr=[];
    //data.push.apply(data,arr);
    //console.log(data);
    //for(var i= +arr[0];i<= +arr[1];i++){
    //  newArr.push(i);
    //}
    //console.log(newArr);
    //console.log(data);
    //var html=template('tpl2',{newArr:newArr});
    var html=template("tpl2",data);
    html=html.replace(/\n/g,'');
    mui.confirm(html,'编辑商品',["确定",'取消'],function(e){

      if(e.index==0){
        $.ajax({
          type:"get",
          url:"/cart/deleteCart",
          data:{
            id:data.id,
            size:$(".lt_edit_size span.now").html(),
            num:$(".mui-numbox-input").val()
          },
          success:function(data){
            tools.checkLogin(data);
            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            //console.log(data);
          }
        })
      }else {
        mui.toast("操作取消");
      }
    });
    mui(".mui-numbox").numbox();
    $(".lt_edit_size span").on("tap",function(){
      $(this).addClass('now').siblings().removeClass("now");
    })
  })

//计算总金额
  var total=0;
$("#OA_task_2").on('change','.ck',function(){

  if(this.checked){
    $(this).each(function(i,e){
      total+=$(this).data("num")*$(this).data("price");
    });
  }
  if(!this.checked){
    total-=$(this).data("num")*$(this).data('price');
  }

  $(".lt_total span").html(total);




})





})