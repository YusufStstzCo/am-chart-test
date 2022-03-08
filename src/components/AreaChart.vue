<template>
  <div>
		<button v-on:click='getData()'>Pull API Data</button>
    <button v-on:click='createSeries("Productive", "productive", "#48CFAE")'>Productive1</button>
    <button v-on:click='createSeries("Ineffective", "ineffective", "#ED5564")'>Ineffective</button>
    <button v-on:click='createSeries("30Weekavg", "weekavg", "#AAB2BD")'>30 Week Avg</button>
    <button v-on:click='clear()'>Clear</button>
		
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
          productive: 0,
          ineffective: 0,
          weekavg: 0
        },{
          label: "01:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "02:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "03:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "04:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "05:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "06:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "07:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "08:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "09:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "10:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "11:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "12:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "13:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "14:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "15:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "16:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "17:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "18:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "19:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "20:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "21:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "22:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
        }, {
          label: "23:00",
          productive: 0,
          ineffective: 0,
          weekavg: 0
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
				categoryField: "label",
        renderer: am5xy.AxisRendererX.new(this.root, {
					minGridDistance: 30
				}),
        tooltip: am5.Tooltip.new(this.root, {})
      })
    );
    this.xAxis.data.setAll(this.data);

    // this.createSeries("Productive", "productive", "#48CFAE");
    this.createSeries("Ineffective", "ineffective", "#ED5564");
    this.createSeries("30Weekavg", "weekavg", "#aab2bd");
    
    this.series.labels.template.setAll({
      alignLabels: false,
      fontSize: 12,
      text: "{label}",
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

  },
  methods: {
    getData: function() {

      this.clear()

      const userBody = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "dateFrom": '2022-02-23T00:00:00',
        "dateTo": '2022-02-23T23:59:59',
        "state": 'Productive',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody)
      .then(result=>{
        // console.log('productive results', result.data)

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].productive = result.data[i].percentage
          }
        }
        console.log('productive results', this.data.productive)
        this.createSeries("Productive", "productive", "#48CFAE");
      })

      const userBody2 = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "dateFrom": '2022-02-23T00:00:00',
        "dateTo": '2022-02-23T23:59:59',
        "state": 'Ineffective',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody2)
      .then(result=>{
        // console.log('ineffective results',result.data)

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].ineffective = result.data[i].percentage
          }
        }
        console.log('ineffective results', this.data.ineffective)
        this.createSeries("Ineffective", "ineffective", "#ED5564");
      })

      const userBody3 = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "dateFrom": '2022-02-23T00:00:00',
        "dateTo": '2022-02-23T23:59:59',
        "state": '30Weekavg',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody3)
      .then(result=>{
        // console.log('average results',result.data)

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].weekavg = result.data[i].percentage
          }
        }
        console.log('average results', this.data.weekavg)
        this.createSeries("30Weekavg", "weekavg", "#AAB2BD");
      })
      
      this.series.data.setAll(this.data)
    },
    clear: function() {
      var length = this.chart.series.length
      console.log('length', length)
      for(var i =0;i<length; i++) {
        this.chart.series.removeIndex(0)
        console.log('removed')
      }
    },
    createSeries: function(name, field, color) {
      this.series = this.chart.series.push(
        am5xy.SmoothedXLineSeries.new(this.root, {
          name: name,
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          valueYField: field,
          categoryXField: "label",
        })
      );
      this.series.set("fill", am5.color(color))
      this.series.set("stroke", am5.color(color))
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