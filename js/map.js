// 1. 初始化地图
var map = new BMap.Map("map-container");
var centerPoint = new BMap.Point(114.52, 36.62); 
map.centerAndZoom(centerPoint, 14);
map.enableScrollWheelZoom(true);

// 2. 异步加载根目录下的 data.json
// 注意：路径写 './data.json' 或 'data.json' 都行，代表根目录
fetch('data.json')
    .then(response => {
        if (!response.ok) throw new Error('找不到 data.json 文件');
        return response.json();
    })
    .then(data => {
        console.log("成功读取到点位数量：", data.length);
        renderMarkers(data);
    })
    .catch(err => {
        console.error("数据加载失败:", err);
    });

// 3. 定义渲染函数
function renderMarkers(points) {
    points.forEach(function(item) {
        var pt = new BMap.Point(item.lng, item.lat);
        
        // 美化后的圆点标记
        var marker = new BMap.Marker(pt);
        
        map.addOverlay(marker);

        // 点击弹窗
      marker.addEventListener("click", function() {
    var content = `
        <div class="custom-infowindow">
            <strong>那一刻...</strong>
            <div>${item.text}</div>
        </div>
    `;
    var infoWindow = new BMap.InfoWindow(content, { width: 0, height: 0 });
    map.openInfoWindow(infoWindow, pt);
        });
    });
}
