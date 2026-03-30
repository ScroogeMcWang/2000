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
        var marker = new BMap.Marker(pt, {
            icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                scale: 0.8,
                fillColor: "#d63384",
                fillOpacity: 0.8,
                strokeWeight: 0
            })
        });
        
        map.addOverlay(marker);

        // 点击弹窗
        marker.addEventListener("click", function() {
            var content = `
                <div style="padding: 10px; font-family: 'Noto Serif SC', serif; line-height: 1.8;">
                    <strong style="color: #d63384; font-size: 16px; display: block; margin-bottom: 8px; border-bottom: 1px solid #eee;">那一刻...</strong>
                    <div style="color: #555; font-size: 14px;">${item.text}</div>
                </div>
            `;
            var infoWindow = new BMap.InfoWindow(content, { width: 280, height: 0 });
            map.openInfoWindow(infoWindow, pt);
        });
    });
}
