
$(function () {
  var currentPage=1;
  var pageSize=5;
  function render() {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        // console.log(data);
        var html = template("tpl", data);
        $("tbody").html(html);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          size:'small',
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function (event,originevent,type,page) {
            currentPage=page;
            render();
          }
        })
      }
    });
  }
  render();
  
  var $form=$("#form");

  $(".product_add").on('click',function () {
    $('#productModal').modal("show");
    $.ajax({
      type:"get",
      url:" /category/querySecondCategoryPaging",
      data:{
        page:1,
    pageSize:100
      },
      success:function (data) {
        // console.log(data);
        var html=template("tpl1",data);
        $('.dropdown-menu').html(html);
      }
    })

  });
  $(".dropdown-menu").on('click','a',function () {
    $(".dropdown-text").text($(this).text());
    $("#brandId").val($(this).data('id'));
     $form.data("bootstrapValidator").updateStatus("brandId","VALID");
  });
var imgArray=[];
  $("#fileupload").fileupload({
    dataType:'json',
    done:function (e,data) {
      // console.log(data);
      $(".img_box").append('<img width="100" height="100" src="'+data.result.picAddr+'" alt="">');
       imgArray.push(data.result);
      if(imgArray.length===3){
        $form.data("bootstrapValidator").updateStatus('productLogo','VALID');
      }else {
        $form.data("bootstrapValidator").updateStatus('productLogo',INVALID);
      }

    }
  })
  //console.log($form);
  $form.bootstrapValidator({
  excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon  glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
    brandId:{
      validators:{
      notEmpty:{
        message:'请选择二级分类'
      }
    }
    },
    proName:{
      validators:{
        notEmpty:{
          message:"请输入商品名称"
        }
      }
    },
    proDesc:{
      validators:{
        notEmpty:{
          message:"请输入商品描述"
        }
      }
    },
    num:{
      validators:{
        notEmpty:{
          message:"商品库存不能为空"
        },
        regexp:{
          regexp:/^[1-9]\d*$/,
          message:"请输入一个大于0的数"
          
        }
      }
    },
    price:{
      validators:{
      notEmpty:{
        message:"商品价格不能为空"
      }
      }
    },
    oldPrice:{
      validators:{
        notEmpty:{
          message:"商品原价不能为空"
        }
      }
    },
    size:{
      validators:{
        notEmpty:{
          message:"请输入商品尺寸"
        },
        regexp:{
          regexp:/\d{2}-\d{2}/,
          message:'请输入商品尺寸（35-50）'
        }
      }
    },
      productLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
  }
})



  $form.on("success.form.bv",function(e){
    e.preventDefault();
    var param=$form.serialize();
    param+="&picName1="+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
    param+="&picName2="+imgArray[1].picName+"&picAddr2="+imgArray[1].picAddr;
    param+="&picName3="+imgArray[2].picName+"&picAddr3="+imgArray[2].picAddr;
    $.ajax({
      type:"post",
      url:" /product/addProduct",
      data:param,
      success:function(data){
        if(data.success){
          $("#productModal").modal('hide');
          currentPage=1;
          render();
          $form[0].reset();
          $(".dropdown-text").text('请选择二级分类');
          $form.data("bootstrapValidator").resetForm();
          $(".img_box img").remove();
          imgArray=[];
        }
      }
    })
  })
});//入口函数结束





