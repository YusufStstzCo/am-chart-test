<template>
  <div>
		<!-- <button v-on:click='getData()'>Pull API Data</button> -->
		<!-- <button v-on:click='clear()'>Clear</button> -->
		
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
          label: "Admin",
          value: 50
        },
        {
          label: "Banking",
          value: 50
        },
        {
          label: "Business Systems",
          value: 50
        },
        {
          label: "Messaging",
          value: 50
        },
        {
          label: "Email",
          value: 50
        },
        {
          label: "IT Systems",
          value: 50
        },
        {
          label: "Meetings",
          value: 50
        },
        {
          label: "Research",
          value: 50
        },
        {
          label: "Social",
          value: 50
        },
        {
          label: "Training",
          value: 50
        },
        {
          label: "Ineffective",
          value: 50
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
        panX: false,
        // wheelY: "zoomX",
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

    let yRenderer = this.yAxis.get("renderer");
    yRenderer.grid.template.setAll({
      strokeOpacity: 0
    });

    this.chart.set("cursor", am5xy.XYCursor.new(this.root, {}));

    // this.xAxis.data.setAll(this.data);

    this.createSeries();
    this.getData();
    // this.series.columns.template.settings.cornerRadiusTR = 10
    // console.log(this.series)
  },
  methods: {
    getData: function() {

      const userBody = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "fromDate": '2022-02-23T00:00:00',
        "toDate": '2022-02-23T23:59:59',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetCategoryDash',userBody)
      .then(result=>{
          console.log(result.data)
          
          this.data = [
            {
              label: "Admin",
              value: result.data.admin
            },
            {
              label: "Banking",
              value: result.data.banking
            },
            {
              label: "Business Systems",
              value: result.data.bs
            },
            {
              label: "Messaging",
              value: result.data.chat
            },
            {
              label: "Email",
              value: result.data.email
            },
            {
              label: "IT Systems",
              value: result.data.itsys
            },
            {
              label: "Meetings",
              value: result.data.meetings
            },
            {
              label: "Research",
              value: result.data.research
            },
            {
              label: "Social",
              value: result.data.social
            },
            {
              label: "Training",
              value: result.data.training
            },
            {
              label: "Ineffective",
              value: result.data.ineffective
            }
          ]
          console.log(this.data)
          this.series.data.setAll(this.data)
          // this.createSeries();
      })
    },

		createSeries: function() {
			this.series = this.chart.series.push( 
				am5xy.ColumnSeries.new(this.root, { 
					name: "barChart",
					xAxis: this.xAxis, 
					yAxis: this.yAxis, 
					categoryYField: "label",
					valueXField: "value",
          fill: am5.color("#48CFAE"),
          stroke: am5.color("#48CFAE"),
          tooltip: am5.Tooltip.new(this.root, {
            labelText: "{valueX} %"
          })
				}) 
			);
      this.series.columns.template.setAll({
        cornerRadiusTR: 10,
        cornerRadiusBR: 10,
        height: 15,
      })
      console.log(this.yAxis)
			this.series.data.setAll(this.data);
      // console.log(this.series)
		},

    clear: function() {
      var length = this.chart.series.length
      console.log('length', length)
      for(var i =0;i<length; i++) {
        this.chart.series.removeIndex(0)
        console.log('removed')
      }
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