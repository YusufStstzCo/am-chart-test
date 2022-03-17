import * as am5 from '@amcharts/amcharts5';

export default class StatzTheme extends am5.Theme {
    setupDefaultRules() {
      this.rule("Graphics", ["line", "series", "fill"]).setAll({
        fillOpacity: 0.75,
        visible: true,
      });

      this.rule("Grid").setAll({})

      this.rule("Columns").setAll({})
      
      this.rule("Bullet").setup = function(target) {
        target.setAll({
          sprite: am5.Circle.new(target.root, {
            radius: 5,
            fill: am5.color(0xff0000),
            fillOpacity: 1
          })
        })
      }
    }
  }