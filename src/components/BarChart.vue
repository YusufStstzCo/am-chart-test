<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
// import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


export default {
  name: 'HelloWorld',
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );

    // Define data
    let data = [{
        category: "Monday",
        value1: 100
      }, {
        category: "Tuesday",
        value1: 120
      }, {
        category: "Wednesday",
        value1: 85
      }, {
        category: "Thursday",
        value1: 85
      }, {
        category: "Friday",
        value1: 85
      }, {
        category: "Saturday",
        value1: 85
      }, {
        category: "Sunday",
        value1: 85
      }
    ];

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
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "value1",
        categoryField: "category"
      })
    );
    series.data.setAll(data);

    // Add legend
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.horizontalLayout
    }));
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5percent.PieSeries.new(root, {}));

    series.get("colors").set("colors", [
      am5.color(0x9d0208),
      am5.color(0xdc2f02),
      am5.color(0xe85d04),
      am5.color(0xf48c06),
      am5.color(0xfaa307)
    ]);

    this.root = root;
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