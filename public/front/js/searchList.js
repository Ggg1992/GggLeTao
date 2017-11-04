$(function(){
mui('.mui-scroll-wrapper').scroll({
  indicators:false
})

  var data={
    proName:"",
  price:"",
    num:"",
    page:1,
    pageSize:10,
  };
function render(){
  $.ajax({
    type:"get",
    url:" /product/queryProduct",
    data:data,
    success:function(data){
      //console.log(data);
      setTimeout(function(){
        var html=template("tpl",data);
        $(".lt_product").html(html);
      },1000);
    }
  })
}


  var key=tools.getParam("key");
  $('.search_text').val(key);
  data.proName=key;
  render(data);
  $(".search_btn").on("click",function(){
    //console.log(1);
    $(".lt_sort a").removeClass('now');
    $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
    data.price='';
    data.num='';

    var key=$(".search_text").val().trim();
    if(key===''){
      mui.toast('请输入搜索的内容');
      return;
    }
    $(".lt_product").html('<div class="loading"></div>');
    data.proName=key;
    render();
  })
//排序
    $(".lt_sort a[data-type]").on('click',function(){
      //console.log(1);
      var $this=$(this);
      var $span=$(this).find("span");
      if($(this).hasClass('now')){
        if($span.hasClass("fa-angle-down")){
          $span.removeClass('fa-angle-down').addClass('fa-angle-up');
        }
        else {
          $span.addClass("fa-angle-down").removeClass('fa-angle-up');
        }
      }
      else {
        $(this).addClass('now').siblings().removeClass('now');
        $(".lt_sort span").removeClass('fa-angle-up').addClass('fa-angle-down');
      }
      var type=$this.data("type");
      var value=$span.hasClass('fa-angle-down')?2:1;

      data[type]=value;
      render(data);
  });

  $("")
})