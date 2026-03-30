// --- 1. 初始化地图 ---
var map = new BMap.Map("map-container");

// 设定邯郸中心点（根据你数据的大致范围微调）
var centerPoint = new BMap.Point(114.52, 36.62); 
map.centerAndZoom(centerPoint, 14);
map.enableScrollWheelZoom(true);

// --- 2. 个性化地图配色 (已修正) ---
// 如果你没有申请 styleId，请先注释掉或保持为空字符串，否则会导致地图报错不显示
map.setMapStyleV2({
    styleId: '' 
});

// --- 3. 渲染标记点 ---
// 逻辑说明：确保 data.js 已经在 index.html 中先于本文件加载
if (typeof MY_MEMORY_POINTS !== 'undefined') {
    
    MY_MEMORY_POINTS.forEach(function(item) {
        var pt = new BMap.Point(item.lng, item.lat);
        
        // --- 美化 Marker：使用半透明圆点代替默认水滴 (更现代) ---
        var marker = new BMap.Marker(pt, {
            icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
                scale: 0.7,           // 圆点大小
                fillColor: "#d63384", // 浪漫的枯玫瑰红
                fillOpacity: 0.8,     // 半透明度
                strokeWeight: 0       // 去掉外边框
            })
        });
        
        map.addOverlay(marker);

        // --- 4. 点击交互逻辑 ---
        marker.addEventListener("click", function() {
            // 自定义弹窗参数
            var opts = {
                width: 280,     // 稍微宽一点，方便文案排版
                height: 0,      // 高度自适应
                title: ""       // 禁用默认标题，我们在内容里自定义
            };
            
            // 构建带样式的弹窗内容
            var content = `
                <div style="padding: 10px; font-family: 'Noto Serif SC', serif; line-height: 1.8;">
                    <strong style="color: #d63384; font-size: 16px; display: block; margin-bottom: 8px; border-bottom: 1px solid #eee;">
                        那一刻...
                    </strong>
                    <div style="color: #555; font-size: 14px; word-break: break-all;">
                        ${item.text}
                    </div>
                </div>
            `;
            
            var infoWindow = new BMap.InfoWindow(content, opts);
            map.openInfoWindow(infoWindow, pt);
        });
    });
} else {
    console.error("未找到数据变量 MY_MEMORY_POINTS，请检查 data.js 是否加载正确。");
}
