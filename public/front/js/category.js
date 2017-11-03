var sc=mui('.mui-scroll-wrapper').scroll({
  deceleration:0.0005,
  indicators:false
});
var scrollRight=mui(".lt_category_r .mui-scroll-wrapper").scroll({
  deceleration:0.0005,
  indicators:false
});
 var scrollLeft=mui(".lt_category_l .mui-scroll-wrapper").scroll({
  deceleration:0.0005,
  indicators:false
});



$.ajax({
  type:"get",
   url:" /category/queryTopCategory",
  success:function(data){
    //console.log(data);
    var html=template("tpl",data);
    $('.lt_category_l ul').html(html);
    renderSecond(data.rows[0].id);
  }
});

function renderSecond(id){
  $.ajax({
    type:"get",
    url:" /category/querySecondCategory",
    data:{
      id:id
    },
    success:function(data){
      //console.log(data);
      var html=template("tpl2",data);
      $(".lt_category_r ul").html(html);
    }
  })
}

$(".lt_category_l ul").on("click",'li',function(){
  $(this).addClass("now").siblings().removeClass("now");
  var id=$(this).data("id");
  renderSecond(id);
  sc[1].scrollTo(0,0,500);
})





