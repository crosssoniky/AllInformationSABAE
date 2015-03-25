var gSidebarInApp = false;
var AboutBoard = false;
var map;
var MarkerShelter = [];
var MarkerPolls = [];
var MarkerCivicPOI = [];
var MarkerBeacon = [];
var MarkerPublicToilet = [];
var MarkerParkingFacility = [];
var MarkerMedicalInstitute = [];
var MarkerHydrant = [];
var MarkerFarmersMarket = [];
var MarkerPublicWIFI = [];
var MarkerAED = [];
var MarkerRAAUFD = [];
var MarkerTemporaryGatheringLocation = [];
var MarkerRoadConstruction = [];
var MarkerCivicFacility = [];
var infoWindow;

function sidebar() {
    var SidebarState;
    var Target = document.getElementById("sidebar").style;

    if (gSidebarInApp) {
        SidebarState = 0;
        (function moveL() {
            if (SidebarState > -235) {
                setTimeout(moveL, 10);
            }
            SidebarState -= 10;
            Target.left = SidebarState + "px";
            if (SidebarState <= -235) {
                gSidebarInApp = false;
                return;
            }
        })();
    } else {
        SidebarState = -235;
        (function moveR() {
            if (SidebarState < 0) {
                setTimeout(moveR, 10);
            }
            SidebarState += 10;
            if (SidebarState >= 0) {
                gSidebarInApp = true;
                return;
            }
            Target.left = SidebarState + "px";
        })();
    }
}

function initialize() {
    var latlng = new google.maps.LatLng(35.9565532, 136.1844742);
    var opts = {
        zoom: 13,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), opts);
}

function SetMarker(marker) {
    marker.setMap(map);
    google.maps.event.addListener(marker, 'click', function () {
        if (infoWindow)
            infoWindow.close();
        var info = new google.maps.InfoWindow({
            content: marker.title
        });
        info.open(map, marker);
        infoWindow = info;
    });
}

function checkShelter() {
    if (document.getElementById("避難場所").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/108>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#EmergencyFacility>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/red.png"
                });
                MarkerShelter.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerShelter) {
            for (i in MarkerShelter) {
                MarkerShelter[i].setMap(null);
            }
            MarkerShelter.length = 0;
        }
    }
}
function checkPolls() {
    if (document.getElementById("投票場所").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/247>{                                                 \
            ?s  rdf:type <http://odp.jig.jp/odp/1.0#Polls>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/green.png"
                });
                MarkerPolls.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerPolls) {
            for (i in MarkerPolls) {
                MarkerPolls[i].setMap(null);
            }
            MarkerPolls.length = 0;
        }
    }
}
function checkCivicPOI() {
    if (document.getElementById("観光情報").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/197>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#CivicPOI>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/orange.png"
                });
                MarkerCivicPOI.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerCivicPOI) {
            for (i in MarkerCivicPOI) {
                MarkerCivicPOI[i].setMap(null);
            }
            MarkerCivicPOI.length = 0;
        }
    }
}
function checkBeacon() {
    if (document.getElementById("オープンBeacon").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/209>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#OpenBeacon>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/green.png"
                });
                MarkerBeacon.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerBeacon) {
            for (i in MarkerBeacon) {
                MarkerBeacon[i].setMap(null);
            }
            MarkerBeacon.length = 0;
        }
    }
}
function checkPublicToilet() {
    if (document.getElementById("公共トイレ").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/202>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#PublicToilet>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/green.png"
                });
                MarkerPublicToilet.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerPublicToilet) {
            for (i in MarkerPublicToilet) {
                MarkerPublicToilet[i].setMap(null);
            }
            MarkerPublicToilet.length = 0;
        }
    }
}
function checkParkingFacility() {
    if (document.getElementById("駐車場").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/201>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#ParkingFacility>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/blue.png"
                });
                MarkerParkingFacility.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerParkingFacility) {
            for (i in MarkerParkingFacility) {
                MarkerParkingFacility[i].setMap(null);
            }
            MarkerParkingFacility.length = 0;
        }
    }
}
function checkMedicalInstitute() {
    if (document.getElementById("医療機関").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/156>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#MedicalInstitute>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/green.png"
                });
                MarkerMedicalInstitute.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerMedicalInstitute) {
            for (i in MarkerMedicalInstitute) {
                MarkerMedicalInstitute[i].setMap(null);
            }
            MarkerMedicalInstitute.length = 0;
        }
    }
}
function checkHydrant() {
    if (document.getElementById("消火栓").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/200>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#Hydrant>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/red.png"
                });
                MarkerHydrant.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerHydrant) {
            for (i in MarkerHydrant) {
                MarkerHydrant[i].setMap(null);
            }
            MarkerHydrant.length = 0;
        }
    }
}
function checkFarmersMarket() {
    if (document.getElementById("農産物直売所").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/198>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#FarmersMarket>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/orange.png"
                });
                MarkerFarmersMarket.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerFarmersMarket) {
            for (i in MarkerFarmersMarket) {
                MarkerFarmersMarket[i].setMap(null);
            }
            MarkerFarmersMarket.length = 0;
        }
    }
}
function checkPublicWIFI() {
    if (document.getElementById("公衆無線LAN").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/173>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#PublicWIFI>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/green.png"
                });
                MarkerPublicWIFI.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerPublicWIFI) {
            for (i in MarkerPublicWIFI) {
                MarkerPublicWIFI[i].setMap(null);
            }
            MarkerPublicWIFI.length = 0;
        }
    }
}
function checkAED() {
    if (document.getElementById("AED設置場所").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/112>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#AED>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/red.png"
                });
                MarkerAED.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerAED) {
            for (i in MarkerAED) {
                MarkerAED[i].setMap(null);
            }
            MarkerAED.length = 0;
        }
    }
}
function checkRAAUFD() {
    if (document.getElementById("災害時要援護者利用施設").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/155>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#RequiringAssistanceAuthorizedUsersFacilityDisaster>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/red.png"
                });
                MarkerRAAUFD.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerRAAUFD) {
            for (i in MarkerRAAUFD) {
                MarkerRAAUFD[i].setMap(null);
            }
            MarkerRAAUFD.length = 0;
        }
    }
}
function checkTemporaryGatheringLocation() {
    if (document.getElementById("一時避難所").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
                                                                                    \
            select distinct ?label ?lat ?long{                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/154>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#temporaryGatheringLocation>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                         \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/red.png"
                });
                MarkerTemporaryGatheringLocation.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerTemporaryGatheringLocation) {
            for (i in MarkerTemporaryGatheringLocation) {
                MarkerTemporaryGatheringLocation[i].setMap(null);
            }
            MarkerTemporaryGatheringLocation.length = 0;
        }
    }
}
function checkRoadConstruction() {
    if (document.getElementById("道路工事").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
            PREFIX j0: <http://www.georss.org/>                             \
                                                                                    \
            select distinct ?label ?georsspoint ?nodeID {                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/175>{                                                 \
            ?nodeID                                                                \
            rdfs:label ?label;                                                      \
            j0:georsspoint ?georsspoint;                                                        \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlngTMP = jsons[i].georsspoint.value;
                var latlngArray = latlngTMP.split(" - ");
                var nodeID = jsons[i].nodeID.value;
                var latlng = new google.maps.LatLng(latlngArray[0], latlngArray[1]);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/blue.png"
                });
                MarkerRoadConstruction.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerRoadConstruction) {
            for (i in MarkerRoadConstruction) {
                MarkerRoadConstruction[i].setMap(null);
            }
            MarkerRoadConstruction.length = 0;
        }
    }
/*
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>     
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX cal: <http://www.w3.org/2002/12/cal/icaltzd#> 
PREFIX schema: <http://schema.org/> 
PREFIX jrrk: <http://purl.org/jrrk#> 

select distinct ?label ?start ?end ?nodeID ?lng ?res ?jr{      
GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/175>{ 
?s    rdf:type <http://purl.org/jrrk#RoadConstruction>; 
cal:dtstart ?start;
cal:dtend  ?end;
schema:location ?nodeID;
schema:description ?lng;
rdfs:label ?label;              
rdf:type ?res;
jrrk:category ?jr
}}*/
}
function checkCivicFacility() {
    if (document.getElementById("鯖江の施設").checked) {
        var query = "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>       \
            PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>                  \
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>  \
            PREFIX j0: <http://www.georss.org/>                             \
                                                                                    \
            select distinct ?label ?lat ?long {                  \
            GRAPH<http://odp.jig.jp/rdf/jp/fukui/sabae/107>{                                                 \
            ?s  rdf:type <http://purl.org/jrrk#CivicFacility>;                  \
            rdfs:label ?label;                                                      \
            geo:lat ?lat;                                                           \
            geo:long ?long;                                                       \
            }}";
        var url = "http://sparql.odp.jig.jp/api/v1/sparql?query=" + encodeURIComponent(query) + "&output=json";
        d3.json(url, function (error, data) {
            var jsons = data["results"]["bindings"];
            for (var i = 0; i < jsons.length; i++) {
                var latlng = new google.maps.LatLng(jsons[i].lat.value, jsons[i].long.value);
                var marker = new google.maps.Marker({
                    position: latlng,
                    title: jsons[i].label.value,
                    icon: "AllInformation/green.png"
                });
                MarkerCivicFacility.push(marker);
                SetMarker(marker);
            }
        });
    } else {
        if (MarkerCivicFacility) {
            for (i in MarkerCivicFacility) {
                MarkerCivicFacility[i].setMap(null);
            }
            MarkerCivicFacility.length = 0;
        }
    }
}
function checkAbout() {
    if (!AboutBoard) {
        document.getElementById("ABOUT").style.zIndex = 100;
        setTimeout(function () {
            AboutBoard = true;
        }, 100);
    }
}
function RemoveAbout() {
    if (AboutBoard) {
        document.getElementById("ABOUT").style.zIndex = -100;
        setTimeout(function () {
            AboutBoard = false;
        }, 100);
    }
}