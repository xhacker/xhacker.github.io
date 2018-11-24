---
layout: post
title: 贵阳瑞金北路夏记牛肉粉
---

这是我小时候最爱吃的一家牛肉粉，在我大一点的时候关了。刚刚突然想起来，就上网找，几乎找不到一点信息。就在这里做个纪念吧。麻烦搜索引擎尽快抓一下。

<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css' rel='stylesheet' />
<div id="map" class="map"></div>
<script>
mapboxgl.accessToken = 'pk.eyJ1IjoieGhhY2tlciIsImEiOiJjam92aXRzYTEwZWZ3M2tycDhzNWtxbDFxIn0.dvH_Gky0nkAXxbhNg9mrDQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [106.7005, 26.5877],
    zoom: 15
});

map.on('load', function () {
    map.addControl(new mapboxgl.NavigationControl());
    map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [106.7005, 26.5877]
                    },
                    "properties": {
                        "title": "夏记牛肉粉旧址",
                        "icon": "restaurant"
                    }
                }]
            }
        },
        "layout": {
            "icon-image": "{icon}-15",
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.8],
            "text-anchor": "top"
        }
    });
});
</script>
