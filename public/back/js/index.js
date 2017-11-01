var myChart = echarts.init(document.getElementById('bar'));
var option = {
  title: {
    text: "2017年注册人数"
  },
  tooltip: {},
  legend: {
    data: [ "人数" ]
  },
  xAxis: {
    data: [ "1月", "2月", "3月", "4月", "5月","6月" ]
  },
  yAxis: {
  },
  series: [
    {
      name: "人数",
      type: "bar", 
      data: [ 59, 50, 70, 80, 50 ,40]
    }
  ]
};
myChart.setOption( option );

var myChart1=echarts.init(document.getElementById("pie"));
var option1 = {
  title : {
    text: '热门品牌销售',
    subtext: '2017年6月',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克','阿迪','百伦','安踏','李宁']
  },
  series : [
    {
      name: '访问来源',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'耐克'},
        {value:310, name:'阿迪'},
        {value:234, name:'百伦'},
        {value:135, name:'安踏'},
        {value:1548, name:'李宁'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
myChart1.setOption(option1);