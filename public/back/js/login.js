$(function () {
  // 校验功能开始
  var $form = $("#form");
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:"用户名错误"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"用户密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"用户密码必须6-12位"
          },
          callback:{
            message:"用户密码错误"
          }
        }
      }
    }
  });
  var validator=$form.data('bootstrapValidator');
  // 表单校验成功，阻止表单自动提交，改用ajax提交方式
  $form.on("success.form.bv",function (e) {
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$form.serialize(),
      success:function (data) {
          // console.log(data);
        if(data.success){
          location.href='index.html';
        }else{
          if(data.error===1000){
            validator.updateStatus("username",'INVALID',"callback")
          }
            if(data.error===1001){
              validator.updateStatus("password",'INVALID',"callback")
            }
        }
      }
    })
  });
  // 重置功能
  $("[type=reset]").on('click',function () {
    validator.resetForm(true);
  });
});