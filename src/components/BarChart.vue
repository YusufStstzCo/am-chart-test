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
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
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
      series2: [],
      categoryYField: null,
      chart: null,
      root: null,
      name: null,
      xAxis: null,
      yAxis: null,
      data: [
        {
          label: "Ineffective",
          value: null,
          value2: null
        },
        {
          label: "Social & News",
          value: null,
          value2: null
        },
        {
          label: "Training & Learning",
          value: null,
          value2: null
        },
        {
          label: "Banking & Financial",
          value: null,
          value2: null
        },
        {
          label: "Research & Browsing",
          value: null,
          value2: null
        },
        {
          label: "Chat & Messaging",
          value: null,
          value2: null
        },
        {
          label: "Online Meetings",
          value: null,
          value2: null
        },
        {
          label: "IT Systems",
          value: null,
          value2: null
        },
        {
          label: "Business Systems",
          value: null,
          value2: null
        },
        {
          label: "Admin",
          value: null,
          value2: null
        },
        {
          label: "Email",
          value: null,
          value2: null
        },
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
        renderer: am5xy.AxisRendererX.new(this.root, {
          minGridDistance: 50
        }),
      })
    );

    let yRenderer = this.yAxis.get("renderer");
    yRenderer.grid.template.setAll({
      strokeOpacity: 0,
      inversed: true
    });

    this.chart.set("cursor", am5xy.XYCursor.new(this.root, {}));

    this.createSeries("value", "#48CFAE");
    this.createSeries("value2", "#ed5564");
    this.getData();
  },
  methods: {
    getData: function() {

      const userBody = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "fromDate": '2022-03-17T00:00:00',
        "toDate": '2022-03-17T23:59:59',
        "userId": 193
      }
      axios.post('https://mainapi.workstatz.com/api/Data/GetCategoryDash',userBody)
      .then(result=>{
          console.log(result.data)
          
          this.data = [
            {
              label: "Ineffective",
              value: null,
              value2: result.data.ineffective,
            },
            {
              label: "Social & News",
              value: result.data.social,
              value2: null
            },
            {
              label: "Training & Learning",
              value: result.data.training,
              value2: null
            },
            {
              label: "Banking & Financial",
              value: result.data.banking,
              value2: null
            },
            {
              label: "Research & Browsing",
              value: result.data.research,
              value2: null
            },
            {
              label: "Chat & Messaging",
              value: result.data.chat,
              value2: null
            },
            {
              label: "Online Meetings",
              value: result.data.meetings,
              value2: null
            },
            {
              label: "IT Systems",
              value: result.data.itsys,
              value2: null
            },
            {
              label: "Business Systems",
              value: result.data.bs,
              value2: null
            },
            {
              label: "Admin",
              value: result.data.admin,
              value2: null
            },
            {
              label: "Email",
              value: result.data.email,
              value2: null
            },
          ]
          console.log(this.data)
          this.series.data.setAll(this.data)

          this.clear()

          this.createSeries("value", "#48CFAE");
          this.createSeries("value2", "#ed5564");
          this.isLoading = false
          this.series.appear(2000);
      })
    },

		createSeries: function(value, color) {
			this.series = this.chart.series.push( 
				am5xy.ColumnSeries.new(this.root, { 
					name: 'BarChart',
					xAxis: this.xAxis, 
					yAxis: this.yAxis,
          stacked: true,
					categoryYField: "label",
					valueXField: value,
          fill: am5.color(color),
          tooltip: am5.Tooltip.new(this.root, {
            labelText: "{valueX} %"
          }),
				}) 
			);
      this.series.columns.template.setAll({
        cornerRadiusTR: 10,
        cornerRadiusBR: 10,
        height: 15,
      })
      console.log(this.series)
			this.series.data.setAll(this.data);
      this.series.appear(2000);
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

<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>