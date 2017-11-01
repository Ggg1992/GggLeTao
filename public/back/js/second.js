$(function () {

  var currentPage=1;
  var pageSize=5;
  function render() {
    $.ajax({
      type:'get',
      url:" /category/querySecondCategoryPaging",
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
          size:'small',
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function(event,originalEvent,type,page){
            currentPage=page;
            render();
          }
        })
      }
    })
  }
  render();
  
  $(".second_add").on('click',function () {
    $('#secondModal').modal('show');
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (data) {
        // console.log(data);
        var html=template("tpl2",data);
        $('.dropdown-menu').html(html);
      }
    })
  });



var $form=$("#form");
  $(".dropdown-menu").on("click",'a',function () {
    $(".dropdown-text").text($(this).text());
    $("#categoryId").val($(this).data('id'));
    $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
  });

  $("#fileupload").fileupload({
    dataType:'json',
    done:function (e,data) {
      // console.log(data);
      $(".img_box img").attr('src',data.result.picAddr);
      $("#brandLogo").val(data.result.picAddr);
      $form.data("bootstrapValidator").updateStatus('brandLogo','VALID');
    }
  })

  $form.bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'一级分类名称不能为空'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'二级分类名称不能为空'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片'
          }
        }
      }
    }
  });



  $form.on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:" /category/addSecondCategory",
      data:$form.serialize(),
      success:function (data) {
        console.log(data);
        if(data.success){
          $("#secondModal").modal('hide');
          currentPage=1;
          render();
          $form[0].reset();
          $form.data('bootstrapValidator').resetForm();
          $(".dropdown-text").text("请选择一级分类")
          $(".img_box img").attr('src','images/none.png');
        }
      }
    })
  })

  


})