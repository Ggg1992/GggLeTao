

  var tools={
    getParamObj:function () {
      var search = location.search;
 search = search.slice(1);
      var arr = search.split("&");
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var key = arr[i].split('=')[0];
        var value = decodeURI(arr[i].split('=')[1]);
        obj[key] = value;
      }
      return obj;
    },
    getParam:function(key){
      return  this.getParamObj()[key]
    }
  }
  //var result=getParam();
  // console.log(result);
  //var key=tools.param(key);
  //$('.search_text').val(key);

