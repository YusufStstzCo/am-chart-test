<template>
  <div>
    <v-card v-if="isLoading" style="padding: 50px; background-color: #cdcdcd; border-radius: 10px; margin-left: 25%; width: 500px; height: 400px; margin-top: 10px; float: left">
      <miniloader></miniloader>
    </v-card>
    <div>
      <div class="hello" ref="chartdiv"></div>
    </div>
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import axios from 'axios'
import StatzTheme from "./StatzTheme"
import miniloader from "./MiniLoader.vue"

export default {
  name: 'HelloWorld',
  components: {
		'miniloader':miniloader,
  },
  data: () => { 
    return {
      isLoading: true,
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
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "02:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "03:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "04:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "05:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "06:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "07:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "08:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "09:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "10:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "11:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "12:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
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
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "19:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "20:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "21:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
        }, {
          label: "22:00",
          productive: 50,
          ineffective: 40,
          weekavg: 30
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
    this.root = am5.Root.new(this.$refs.chartdiv);

    this.root.setThemes([am5themes_Animated.new(this.root), StatzTheme.new(this.root)]);

    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
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
        renderer: am5xy.AxisRendererX.new(this.root, {}),
        tooltip: am5.Tooltip.new(this.root, {})
      })
    );

    let xRenderer = this.xAxis.get("renderer");
    xRenderer.grid.template.setAll({
      strokeOpacity: 0
    });

    this.chart.set("cursor", am5xy.XYCursor.new(this.root, {}));

    this.xAxis.data.setAll(this.data);

    this.createSeries("Productive", "productive", "#48CFAE");
    this.createSeries("Ineffective", "ineffective", "#ED5564");
    this.createSeries("30Weekavg", "weekavg", "#aab2bd");
    this.series.appear(2000)
    this.getData()
  },
  methods: {
    getData: function() {

      this.clear()

      const userBody = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "dateFrom": '2022-03-17T00:00:00',
        "dateTo": '2022-03-17T23:59:59',
        "state": 'Productive',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody)
      .then(result=>{

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].productive = result.data[i].percentage
          }
        }
        console.log('productive results done')
        this.createSeries("Productive", "productive", "#48CFAE");
        this.series.appear(2000)
      })

      const userBody2 = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "dateFrom": '2022-03-17T00:00:00',
        "dateTo": '2022-03-17T23:59:59',
        "state": 'Ineffective',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody2)
      .then(result=>{

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].ineffective = result.data[i].percentage
          }
        }
        console.log('ineffective results done')
        this.createSeries("Ineffective", "ineffective", "#ED5564");
        this.series.appear(2000)
      })

      const userBody3 = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "dateFrom": '2022-03-17T00:00:00',
        "dateTo": '2022-03-17T23:59:59',
        "state": '30Weekavg',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetMainWTGraph',userBody3)
      .then(result=>{

        for(var i =0;i<result.data.length; i++) {
          if(this.data[i].label === result.data[i].timeStampHour){
            this.data[i].weekavg = result.data[i].percentage
          }
        }
        console.log('average results done')
        this.createSeries("30Weekavg", "weekavg", "#AAB2BD");
        this.series.appear(2000)
      })
      
      this.series.data.setAll(this.data)
      this.isLoading = false
    },
    clear: function() {
      var length = this.chart.series.length
      for(var i =0;i<length; i++) {
        this.chart.series.removeIndex(0)
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
          tooltip: am5.Tooltip.new(this.root, {
            labelText: "{name}: {valueY.formatNumber('#.##')}%"
          })
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

<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>