mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9nZXJnY2MiLCJhIjoiY2swNjBxZjdoMDB4OTNkbzdwZDRyd3Y2cCJ9.IAhPr1E2_-V8CqMc-zILDg";
var map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/dark-v10", //hosted style id
  center: [-91.874, 42.76], // starting position
  zoom: 12 // starting zoom
});

var draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true
  }
});
map.addControl(draw);

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
}
