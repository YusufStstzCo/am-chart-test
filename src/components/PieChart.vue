<template>
  <div>
    <div class="hello" ref="chartdiv"></div>
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import axios from 'axios'
import StatzTheme from "./StatzTheme"

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
    this.root = am5.Root.new(this.$refs.chartdiv);

    this.root.setThemes([am5themes_Animated.new(this.root), StatzTheme.new(this.root)]);

    let chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: am5.percent(75)
      })
    );

    // Create series
    this.series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        name: "Series",
        valueField: "value",
        categoryField: "label",
        alignLabels: false
      })
    );
    this.series.data.setAll(this.data);

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

    // Add legend
    let legend = chart.children.push(am5.Legend.new(this.root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: this.root.horizontalLayout
    }));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5percent.PieSeries.new(this.root, {}));

    this.series.get("colors").set("colors", [
      am5.color("#48CFAE"),
      am5.color("#ED5564"),
      am5.color("#FF8A55")
    ]);

    // this.root = root;

    this.getData();
    this.series.appear(2000)
  },
  methods: {
    getData: function() {
      const userBody = {
        "clientId": 'AAA19916-278E-4691-9547-08D874108BD7',
        "fromDate": '2022-03-17T00:00:00',
        "toDate": '2022-03-17T23:59:59',
        "userId": 193
      }
     axios.post('https://mainapi.workstatz.com/api/Data/GetProductivityView',userBody)
      .then(result=>{
      
        var alertDataList = [];
        
        alertDataList.push({
          label:'Productive',
          value:result.data["productive"]
        })

        alertDataList.push({
          label:'Ineffective',
          value:result.data["inefficient"]
        })

        alertDataList.push({
          label:'Passive',
          value:result.data["passive"]
        })
         
        this.dataLoaded = true;
        this.data = alertDataList;
        this.series.data.setAll(this.data)
        this.series.appear(2000)
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

<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>