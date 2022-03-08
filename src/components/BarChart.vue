<template>
  <div>
		<button v-on:click='getData()'>Pull API Data</button>
		
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
      // valueYField: null,

      xAxis: null,
      yAxis: null,
      data: [
        {
          label: 'Email',
					value: 40
				}, {
					label: 'Texting',
					value: 80
				}, {
					label: 'Admin',
					value: 70
				}, {
					label: 'IT Systems',
					value: 20
        }
      ]
    }
  },
  mounted() {
    this.root = am5.Root.new(this.$refs.chartdiv); 

    this.root.setThemes([
      am5themes_Animated.new(this.root),
      StatzTheme.new(this.root)
    ]);

    this.chart = this.root.container.children.push( 
      am5xy.XYChart.new(this.root, {
        panY: false,
        wheelY: "zoomX",
        layout: this.root.horizontalLayout
      }) 
    );

    // Craete Y-axis
    this.yAxis = this.chart.yAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        categoryField: "label",
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );
    this.yAxis.data.setAll(this.data);

    // Create X-Axis
    this.xAxis = this.chart.xAxes.push(
      am5xy.ValueAxis.new(this.root, {
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererX.new(this.root, {}),
      })
    );
    // this.xAxis.data.setAll(this.data);

    this.createSeries("Series", "value");
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
          console.log(result.data)
      })
      this.series.data.setAll(this.data)
    },
		createSeries: function(name, field) {
			this.series = this.chart.series.push( 
				am5xy.ColumnSeries.new(this.root, { 
					name: name,
					xAxis: this.xAxis, 
					yAxis: this.yAxis, 
					categoryYField: "label",
					valueXField: field, 
				}) 
			);
      this.series.columns.template.column.adapter.add("cornerRadiusTopLeft", 10);
      this.series.set("fill", am5.color("#48CFAE"))
      this.series.set("stroke", am5.color("#48CFAE"))
			this.series.data.setAll(this.data);
		},
		beforeDestroy() {
			if (this.root) {
				this.root.dispose();
			}
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