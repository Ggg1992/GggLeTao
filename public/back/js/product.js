$(function () {
  var currentPage=1;
  var pageSize=5;
  function render() {
    $.ajax({
      type:"get",
      url:" /product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        // console.log(data);
        var html=template('tpl1',data);
        $('tbody').html(html);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          size:"small",
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function (event,originalEvent,type,page) {
          currentPage=page;
            render();
          }
        })
      }
    })
  }
  render();
var $form=$("#form");
  var imgArray=[];
  $(".product_add").on("click",function () {
    $("#ProductModal").modal("show");
    $.ajax({
      type:'get',
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      success:function (data) {
        // console.log(data);
        var html=template('tpl2',data);
        $('.dropdown-menu').html(html);
      }
    })
  })
$(".dropdown-menu").on("click",'a',function () {
  $('.dropdown-text').text($(this).text());
  $("#brandId").val($(this).data("id"));
  $form.data('bootstrapValidator').updateStatus('brandId','VALID');
});
$("#fileupload").fileupload({
  dataType:'json',
  done:function (e,data) {
    // console.log(data.result);
    $(".img_box").append('<img width="100" height="100" src="'+data.result.picAddr+'" alt="">');
    // imgArray.push(data.result);
  }
});
  $form.bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    feilds:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请输入二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'商品名称不能为空'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'商品描述不能为空'
          }
        }
      },
      num:{
        validators:{
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'请输入一个大于0的库存'
          },
          notEmpty:{
            message:'请输入商品库存'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品价格'
          },
          regexp:{
            regexp:/^\d$/,
            message:'请输入一个大于0的数字'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          },
          regexp:{
            regexp:/^\d$/,
            message:'请输入一个大于0的数字'

          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺寸'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入正确的尺码（30-50）'
          }
        }
      }
    }
  })

})