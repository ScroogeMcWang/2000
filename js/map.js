// 初始化地图
var map = new BMap.Map("map-container");
// 设定邯郸中心点
var centerPoint = new BMap.Point(114.50, 36.62);
map.centerAndZoom(centerPoint, 14);
map.enableScrollWheelZoom(true);

// 百度地图个性化配色 (重要：这里可以进一步去百度后台选“高端黑”或“清新蓝”风格)
map.setMapStyleV2({
    styleId: '这里可以替换为你生成的个性化风格ID' 
});

// 渲染标记点
// 假设你的数据文件里变量名是 MY_MEMORY_POINTS
if (typeof MY_MEMORY_POINTS !== 'undefined') {
    MY_MEMORY_POINTS.forEach(function(item) {
        var pt = new BMap.Point(item.lng, item.lat);
        var marker = new BMap.Marker(pt); 
        map.addOverlay(marker);

        marker.addEventListener("click", function() {
            var opts = {
                width: 250,
                height: 0,
                title: "<span style='color:#d63384;font-family:serif;'>那段回忆...</span>"
            };
            var infoWindow = new BMap.InfoWindow(item.text, opts);
            map.openInfoWindow(infoWindow, pt);
        });
    });
}
