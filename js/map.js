// --- 占位符字符串管理 (后期可在此统改) ---
const CONFIG = {
    title: "邯郸 · 我们的独家记忆",
    subtitle: "每一个坐标，都是一段无法抹去的故事",
    footer: "愿所有深情都不被辜负",
    mapCenter: { lng: 114.50, lat: 36.61 }, // 邯郸中心附近
    zoomLevel: 14
};

// 页面文案初始化
document.getElementById('page-title').innerText = CONFIG.title;
document.getElementById('page-subtitle').innerText = CONFIG.subtitle;
document.getElementById('footer-text').innerText = CONFIG.footer;

// 初始化百度地图
const map = new BMap.Map("map-container");
const point = new BMap.Point(CONFIG.mapCenter.lng, CONFIG.mapCenter.lat);
map.centerAndZoom(point, CONFIG.zoomLevel);
map.enableScrollWheelZoom(true);

// 设置地图风格 (可选：使用清新/浪漫风格)
map.setMapStyleV2({
    styleId: '4f253767c9c065f49d3790513e9a594d' // 这是一个示例柔和风格ID，需在百度后台创建
});

// 加载数据
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        renderMarkers(data);
    })
    .catch(err => console.error("数据加载失败:", err));

// 渲染标记点
function renderMarkers(points) {
    points.forEach(item => {
        const pt = new BMap.Point(item.lng, item.lat);
        
        // 使用自定义爱心图标 (建议准备一个 heart.png)
        // const myIcon = new BMap.Icon("img/heart.png", new BMap.Size(32, 32));
        // const marker = new BMap.Marker(pt, { icon: myIcon });
        
        const marker = new BMap.Marker(pt); 
        map.addOverlay(marker);

        // 点击交互
        marker.addEventListener("click", function() {
            const content = `
                <div class="custom-infowindow">
                    <strong>那个时刻...</strong>
                    ${item.text}
                </div>
            `;
            const infoWindow = new BMap.InfoWindow(content, {
                width: 0,     // 宽度自适应
                height: 0,    // 高度自适应
                title: ""     // 禁用默认标题
            });
            map.openInfoWindow(infoWindow, pt);
        });
    });
}