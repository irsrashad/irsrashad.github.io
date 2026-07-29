/* Shared MapLibre helpers — themed to the site's cartography-lab palette.
   Basemap: CARTO Dark Matter GL style (free with attribution) over OSM data. */
window.MapLab = (function () {
  var STYLE_URL = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

  function createMap(container, opts) {
    opts = opts || {};
    var map = new maplibregl.Map({
      container: container,
      style: STYLE_URL,
      center: opts.center || [40, 10],
      zoom: opts.zoom || 1.8,
      minZoom: opts.minZoom || 1,
      attributionControl: false
    });
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left');
    return map;
  }

  function popupHTML(p) {
    var link = p.link
      ? '<a class="ml-popup-link" href="' + p.link + '"' +
        (/^https?:/.test(p.link) ? ' target="_blank" rel="noopener"' : '') + '>' +
        (p.linkLabel || 'View case study') + ' &rarr;</a>'
      : '';
    return (
      '<div class="ml-popup">' +
        '<div class="ml-popup-kind ml-kind-' + p.kind + '">' + p.kindLabel + ' · ' + p.years + '</div>' +
        '<div class="ml-popup-title">' + p.name + '</div>' +
        '<div class="ml-popup-place">' + p.place + '</div>' +
        '<div class="ml-popup-blurb">' + p.blurb + '</div>' +
        link +
      '</div>'
    );
  }

  return { createMap: createMap, popupHTML: popupHTML };
})();
