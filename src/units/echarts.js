//按需导入eacharts组件
var _echarts = require('echarts/lib/echarts');
(function () {
    for (var key in _echarts) {
        if (_echarts == null || !_echarts.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
        exports[key] = _echarts[key];
    }
})();
var _export = require("echarts/lib/export");
(function () {
    for (var key in _export) {
        if (_export == null || !_export.hasOwnProperty(key) || key === 'default' || key === '__esModule') return;
        exports[key] = _export[key];
    }
})();
/* 以下是首页引用到的组件 */
// 柱状图
require('echarts/lib/chart/bar');
// 折线图
require('echarts/lib/chart/line');
// 饼图
require('echarts/lib/chart/pie');
// 图例组件
require("echarts/lib/component/legend");
// 工具栏
require("echarts/lib/component/toolbox");
// 提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/map");
require("echarts/lib/chart/effectScatter");
require("echarts/lib/component/geo");
require("echarts/lib/component/dataZoom");