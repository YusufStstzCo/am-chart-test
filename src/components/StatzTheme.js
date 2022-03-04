import * as am5 from '@amcharts/amcharts5';

export default class StatzTheme extends am5.Theme {
    setupDefaultRules() {
      this.rule("Graphics", ["line", "series", "stroke"]).setAll({
        strokeWidth: 2,
        strokeDasharray: [10, 5]
      });
      
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
  0