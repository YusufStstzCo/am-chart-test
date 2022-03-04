<template>
  <div>
		<button v-on:click='getData()'>Pull API Data</button>
    <!-- <button v-on:click='createSeries()'>Series 1</button> -->
		
		<div class="hello" ref="chartdiv"></div>
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
// import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import axios from 'axios'
import StatzTheme from "./StatzTheme"

export default {
  name: 'HelloWorld',
  data: () => { 
    return {
      dataLoaded:false,
      alertData: [],
      series: [],
      chart: null,
      root: null,
      name: null,
      valueYField: null,

      xAxis: null,
      yAxis: null,
      data: [
        {
          label: "00:00",
          productive: 1,
          ineffective: 2.5,
          Weekavg: 5
        },{
          label: "01:00",
          productive: 1,
          ineffective: 2.5,
          Weekavg: 5
        }, {
          label: "02:00",
          productive: 3,
          ineffective: 2.1,
          Weekavg: 4
        }, {
          label: "03:00",
          productive: 2,
          ineffective: 3,
          Weekavg: 4.5
        }, {
          label: "04:00",
          productive: 1,
          ineffective: 2,
          Weekavg: 3.5
        }, {
          label: "05:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "06:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "07:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "08:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "09:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "10:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "11:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "12:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "13:00",
          productive: 50,
          ineffective: 40,
          Weekavg: 30
        }, {
          label: "14:00",
          productive: 50,
          ineffective: 40,
          Weekavg: 30
        }, {
          label: "15:00",
          productive: 50,
          ineffective: 40,
          Weekavg: 30
        }, {
          label: "16:00",
          productive: 50,
          ineffective: 40,
          Weekavg: 30
        }, {
          label: "17:00",
          productive: 50,
          ineffective: 40,
          Weekavg: 30
        }, {
          label: "18:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "19:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "20:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "21:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "22:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }, {
          label: "23:00",
          productive: 1.5,
          ineffective: 0.5,
          Weekavg: 3
        }
      ]
    }
  },
  mounted() {


    // this.getData();
    this.root = am5.Root.new(this.$refs.chartdiv);

    this.root.setThemes([am5themes_Animated.new(this.root), StatzTheme.new(this.root)]);

    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX"
      })
    );

    // Set data variable to data object
    // let data = this.data

    // Create Y-axis
    this.yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    // Create X-Axis
    this.xAxis = this.chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
				// maxDeviation: 0,
				categoryField: "label",
        renderer: am5xy.AxisRendererX.new(this.root, {
					minGridDistance: 30
				}),
        tooltip: am5.Tooltip.new(this.root, {})
      })
    );
    this.xAxis.data.setAll(this.data);

    // Create series
    // this.series = this.chart.series.push(
    //   am5xy.SmoothedXLineSeries.new(this.root, {
    //     name: "Series 1",
		// 		xAxis: this.xAxis,
		// 		yAxis: this.yAxis,
		// 		valueYField: "value2",
		// 		valueXField: "date",
    //   })
    // );
    // this.series.data.setAll(this.data);

    this.createSeries("Productive", "productive");
    this.createSeries("Ineffective", "ineffective");
    this.createSeries("Offline", "Weekavg");

    this.series.get("colors").set("colors", [
      am5.color("#48CFAE"),
      am5.color("#ED5564"),
      am5.color("#FF8A55")
    ]);

		// this.series.fills.template.setAll({
		// 	visible: true,
		// 	fillOpacity: 0.2
		// });

    this.series.labels.template.setAll({
      alignLabels: false,
      fontSize: 12,
      text: "{category}",
      textType: "circular",
      inside: true,
      radius: 10,
      fill: am5.color(0xFFFFFF),
      centerX: am5.percent(100)
    });

		var tooltip = this.series.set("tooltip", am5.Tooltip.new(this.root, {}));
			tooltip.label.set("text", "{valueY}");

    // Add legend
    let legend = this.chart.children.push(am5.Legend.new(this.root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: this.root.horizontalLayout
    }));
    legend.data.setAll(this.chart.series.values);

    // Add cursor
    this.chart.set("cursor", am5xy.LineSeries.new(this.root, {}));

    this.series.get("colors").set("colors", [
      am5.color("#FFC0CB"),
      am5.color("#ED5564"),
      am5.color("#FF8A55")
      
    ]);

    // this.root = root;
  },
  methods: {
    getData: function() {
      const userBody = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "fromDate": '2022-02-23T00:00:00',
        "toDate": '2022-02-23T23:59:59',
        "state": 'Productive',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody)
      .then(result=>{
        console.log('productive results', result.data)

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].productive = result.data[i].percentage
            console.log(result.data[i].percentage, this.data[i].productive)
          }
        }
      })

      this.createSeries("Productive", "productive");

      const userBody2 = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "fromDate": '2022-02-23T00:00:00',
        "toDate": '2022-02-23T23:59:59',
        "state": 'Ineffective',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody2)
      .then(result=>{
        console.log('ineffective results',result.data)

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].ineffective = result.data[i].percentage
            console.log(result.data[i].percentage, this.data[i].ineffective)
          }
        }
      })

      const userBody3 = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "fromDate": '2022-02-23T00:00:00',
        "toDate": '2022-02-23T23:59:59',
        "state": '30Weekavg',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody3)
      .then(result=>{
        console.log('average results',result.data)

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].Weekavg = result.data[i].percentage
            console.log(result.data[i].percentage, this.data[i].Weekavg)
          }
        }
      })
      

      // this.data = alertDataList;
      this.series.data.setAll(this.data)
    },
    clear: function() {
      // this.series.data = []
      // console.log(this.series.get("colors"))
    },
    createSeries: function(name, field) {
      this.series = this.chart.series.push(
        am5xy.SmoothedXLineSeries.new(this.root, {
          name: name,
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          valueYField: field,
          categoryXField: "label",
        })
      );
      this.series.data.setAll(this.data);
      },
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