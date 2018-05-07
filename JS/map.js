init();

function init() {
    d3.json('/data/topo_wpc.json', function (err, data) {
        console.log(err);
        console.log(JSON.stringify(data));
    });
}
