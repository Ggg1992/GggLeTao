
$(function () {

  var currentPage=1;
  var pageSize=5;
  function render() {
    $.ajax({
      type:"get",
      url:' /category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        // console.log(data);
        var html=template('tpl',data);
        $('tbody').html(html);
      
        $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion:3,
          currentPage:currentPage,
          size:'small',
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
  $(".first_add").on('click',function () {
    $("#firstModal").modal('show');
  });
  var $form=$("#form");
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名称不能为空"
          }
        }
      }
    }
  });
  $form.on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function (data) {
        // console.log(data);
        $("#firstModal").modal('hide');
        currentPage=1;
        render();
      }
    });
    $("#form")[0].reset();
    $("#form").data('bootstrapValidator').resetForm();
  });









})