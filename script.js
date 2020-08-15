

var TOKEN = config.TOKEN;

mapboxgl.accessToken =
  TOKEN;
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/dark-v10", //hosted style id
  center: [-70.24637446871719, -18.015857040865768], // starting position
  zoom: 15 // starting zoom
});

var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
});
map.addControl(draw);


map.on('load', function () {

  map.addSource('zonas_pinto', {
    type: 'geojson',
     data: 'https://gist.githubusercontent.com/rogergcc/e19cc5885579b3c76219e12f8be13e46/raw/4fbf14688e02a877f72896635982305d5f7aebdd/zonaPinto.geojson'
    // data: 'https://gist.githubusercontent.com/rogergcc/e19cc5885579b3c76219e12f8be13e46/raw/4fbf14688e02a877f72896635982305d5f7aebdd/zonaPinto.geojson'
    
  });

  map.addLayer({
    'id': 'park-boundary',
    'type': 'fill',
    'source': 'zonas_pinto',
    'paint': {
      'fill-color': '#D81B60',
      
      'fill-outline-color': '#D81B60',
      'fill-opacity': 0.2
    },
    'filter': ['==', '$type', 'Polygon']
  });

  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'zonas_pinto',
    'layout': {
    'line-join': 'round',
    'line-cap': 'round'
    },
    'paint': {
    'line-color': '#D81B60',
    'line-width': 4
    }
    });
    
  map.addLayer({
    'id': 'park-volcanoes',
    'type': 'circle',
    'source': 'zonas_pinto',
    'paint': {
      'circle-radius': 6,
      'circle-color': '#B42222'
    },
    'filter': ['==', '$type', 'Point']
  });


});


map.on("draw.create", updateArea);
map.on("draw.delete", updateArea);
map.on("draw.update", updateArea);

function updateArea(e) {
  var data = draw.getAll();
  var answer = document.getElementById("calculated-area");
  if (data.features.length > 0) {
    var area = turf.area(data);
    // restrict to area to 2 decimal points
    var rounded_area = Math.round(area * 100) / 100;
    answer.innerHTML =
      "<p><strong>" + rounded_area + "</strong></p><p>square meters</p>";
  } else {
    answer.innerHTML = "";
    if (e.type !== "draw.delete")
      alert("Use the draw tools to draw a polygon!");
  }

  const collection_data = document.getElementById('collection-data');

  var data = JSON.stringify(data)
  collection_data.innerHTML = data;
  //console.log(data);
  
  
}
