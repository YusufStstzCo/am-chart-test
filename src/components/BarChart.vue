<template>
  <div>
    <button v-on:click='getData()'>Pull API Data</button>
   
    <div class="hello" ref="chartdiv"></div>
   </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
// import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data: () => { 
    return {
      dataLoaded:false,
      alertData: [],
      series: null,
      data: [
        {
          label: "Monday",
          value: 100
        }, {
          label: "Tuesday",
          value: 120
        }, {
          label: "Wednesday",
          value: 85
        }, {
          label: "Thursday",
          value: 85
        }, {
          label: "Friday",
          value: 85
        }, {
          label: "Saturday",
          value: 85
        }, {
          label: "Sunday",
          value: 85
        }
      ]
    }
  },
  mounted() {
    // this.getData();
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );


    // Test Data
    let data = this.data

    // Define data
    // let data = [{
    //     category: "Monday",
    //     value1: 100
    //   }, {
    //     category: "Tuesday",
    //     value1: 120
    //   }, {
    //     category: "Wednesday",
    //     value1: 85
    //   }, {
    //     category: "Thursday",
    //     value1: 85
    //   }, {
    //     category: "Friday",
    //     value1: 85
    //   }, {
    //     category: "Saturday",
    //     value1: 85
    //   }, {
    //     category: "Sunday",
    //     value1: 85
    //   }
    // ];

    // Create Y-axis
    // let yAxis = chart.yAxes.push(
    //   am5percent.ValueAxis.new(root, {
    //     renderer: am5percent.AxisRendererY.new(root, {})
    //   })
    // );

    // Create X-Axis
    // let xAxis = chart.xAxes.push(
    //   am5percent.CategoryAxis.new(root, {
    //     renderer: am5percent.AxisRendererX.new(root, {}),
    //     categoryField: "category"
    //   })
    // );
    // xAxis.data.setAll(data);

    // Create series
    
    this.series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "value",
        categoryField: "label"
      })
    );
    this.series.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout
    }));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5percent.PieSeries.new(root, {}));

    this.series.get("colors").set("colors", [
      am5.color(0x000300),
      am5.color(0xdc2f02),
      am5.color(0xe85d04),
      am5.color(0xf48c06),
      am5.color(0xfaa307)
    ]);

    this.root = root;
  },
  methods: {
    getData: function() {
      const userBody = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "fromDate": '2022-02-23T00:00:00',
        "toDate": '2022-02-23T23:59:59',

        "userId": 193
      }
     axios.post('https://mainapi.workstatz.com/api/Data/GetProductivityView',userBody)
      .then(result=>{
      
        var alertDataList = [];
        
          alertDataList.push({label:'Productive',
          value:result.data["productive"],
          "color":  am5.color(0xdc2f02)
         
          })
          alertDataList.push({label:'Ineffective',
          value:result.data["inefficient"],
           "color":  am5.color(0xe85d04)
         
          })
          alertDataList.push({label:'Passive',
          value:result.data["passive"],
           "color":  am5.color(0xfaa307)
         
          })
         
          this.dataLoaded = true;
        

        this.data = alertDataList;
        this.series.data.setAll(this.data)
      })
    }
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>