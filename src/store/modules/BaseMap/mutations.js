import { loadModules } from 'esri-loader'
import { deleteFeatures, updateFeatures } from '@esri/arcgis-rest-feature-layer';
const mutations = {
    loadbasemap: (state) =>{
        loadModules([
            "esri/Map",
            "esri/Basemap",
            "esri/views/MapView",
            "esri/layers/WebTileLayer",
            "esri/layers/MapImageLayer",
            "esri/layers/GroupLayer",
            "esri/layers/FeatureLayer",
            "esri/widgets/LayerList",
            "esri/widgets/Expand",
            "esri/widgets/BasemapGallery",
            "esri/widgets/Search",
            "esri/widgets/Track",
        ],{
            url: "https://js.arcgis.com/4.11/",
          
        })
        .then(([
            Map,
            Basemap,
            MapView,
            WebTileLayer,
            MapImageLayer,
            GroupLayer,
            FeatureLayer,
            LayerList,
            Expand,
            BasemapGallery,
            Search,
            Track

        ]) => {
            var map = new Map({
                basemap: 'osm'
            });

            var view = new MapView({
                map: map,
                container: "viewDiv",
                center: [106.366362, 10.360622],
                zoom: 14,
                popup: {
                    dockEnabled: false,
                    dockOptions: {
                        position: "bottom-right",
                        breakpoint: false,
                    },
                    highlightEnabled : true,
                },
                highlightOptions: {
                    color: [255, 255, 0, 1],
                    haloOpacity: 0.9,
                    fillOpacity: 0.2
                }
            });

            var topoImage = new WebTileLayer({
                id: "topoimage",
                title: "topo google map",
                urlTemplate: "https://mt1.google.com/vt/lyrs=p&x={col}&y={row}&z={level}",
            });
            var worldImage = new WebTileLayer({
                id: "worldimage",
                title: "World google map",
                urlTemplate:  "https://mt1.google.com/vt/lyrs=y&x={col}&y={row}&z={level}",
            });
            var streetImage = new WebTileLayer({
                id: "streetimage",
                title: "Street google map",
                urlTemplate: "https://mt1.google.com/vt/lyrs=m&x={col}&y={row}&z={level}",
            });

            var topoBaseMap = new Basemap({
                thumbnailUrl: "http://localhost:8080/images/Thumbnai/topo.PNG",	
                id: "topobasemap",
                title: "topo basemap",
                baseLayers: [topoImage]
            });
            var worldBaseMap = new Basemap({
                thumbnailUrl: "http://localhost:8080/images/Thumbnai/streets.PNG",	
                id: "worldbasemap",
                title: "world basemap",
                baseLayers: [worldImage]
            });
            var streetsBaseMap = new Basemap({
                thumbnailUrl: "http://localhost:8080/images/Thumbnai/satellite.PNG",	
                id: "streetsbasemap",
                title: "streets basemap",
                baseLayers: [streetImage]
            });

            var baseMapGallery = new BasemapGallery({
                container: document.createElement('div'),
                view: view,
                id: "basemapgallery",
                lable: "Bản đồ nền",
                iconClass: "esri-icon-basemap",
                source: [
                    topoBaseMap,
                    streetsBaseMap,
                    worldBaseMap,
                    Basemap.fromId("hybrid"),
                    Basemap.fromId("gray"),
                    Basemap.fromId("dark-gray"),
                    Basemap.fromId("osm"),
                    Basemap.fromId("dark-gray-vector"),
                    Basemap.fromId("gray-vector"),
                    Basemap.fromId("streets-night-vector"),
                    Basemap.fromId("streets-relief-vector"),
                    Basemap.fromId("streets-navigation-vector"),
                ]
            });

            var bgExpand = new Expand({
                content: baseMapGallery,
                view: view,
                expandTooltip: "Bản đồ nền"
            })

            view.ui.move("zoom", "bottom-right" );
            view.ui.add(bgExpand, "bottom-right");  

            var phuongXaLayer = new MapImageLayer({
                url: "https://tigis.vbgis.vn/arcgis/rest/services/NenTienGiang/PhuongXa/MapServer",
                title: "bản đồ phường xã",
                labelsVisible: true,
            });

            var quanHuyenLayer = new MapImageLayer({
                url: "https://tigis.vbgis.vn/arcgis/rest/services/NenTienGiang/QuanHuyen/MapServer",
                title: "bản đồ quận huyện",
                visible: true
            });

            var hanhChinhGroupLayer = new GroupLayer({
                layers: [phuongXaLayer, quanHuyenLayer],
                title: "Bản Đồ Hành chính",
                visibilityMode: "independent",
            });

            map.add(hanhChinhGroupLayer)

            var hanhChinhLayerList = new LayerList({
                view: view,
                listItemCreate: async(event) => {
                    if (event.item.title === "bản đồ phường xã" ){
                        event.item.visible = false
                    }
                }
            });

            var hanhchinhexpand = new Expand({
                view: view,
                content: hanhChinhLayerList,
                expandTooltip: "Bản Đồ Hành Chính",
                expandIconClass: "esri-icon-collection",
            });

            view.ui.add(hanhchinhexpand, 'bottom-right')

            var ubgpopuptemplate = {
                title: "Số hiệu: {SoHieu} - cây {MaTenCX}",
                content: [
                    {
                        type: "fields",
                        fieldInfos:[
                            {
                                fieldName: "SoHieu",
                                label: "Số Hiệu",
                            },
                            {
                                fieldName: "MaTenCX",
                                label: "Tên Cây",
                            },
                            {
                                fieldName: "KinhDo",
                                label: "Kinh Độ",
                            },
                            {
                                fieldName: "ViDo",
                                label: "Vĩ Độ",
                            },
                            {
                                fieldName: "DuongKinh",
                                lable: "Đường Kính",
                            },
                            {
                                fieldName: "ChieuCao",
                                lable: "Chiều Cao",
                            },
                            {
                                fieldName: "DoRongTan",
                                label: "Độ rộng tán",
                            },
                            {
                                fieldName: "NgayTrong",
                                label: "Ngày trồng cây",
                            },
                            {
                                fieldName: "ThuocTinh",
                                label: "Thuộc Tính",
                            },
                            {
                                fieldName: "GhiChu",
                                label: "Ghi Chú",
                            },
                            {
                                fieldName: "TuyenDuong",
                                label: "Tuyến Đường",
                            },
                            {
                                fieldName: "MaTinhTrang",
                                label: "Tình Trạng",
                            },
                            {
                                fieldName: "NguoiCapNhat",
                                label: "Người Cập Nhật",
                            },
                        ]
                    }
                ],
                actions: [
                    {
                        id: "updateInfor",
                        title: "Sửa Thông Tin Cây Xanh",
                        className: "esri-icon-edit"
                    },
                    {
                        id: "viewImage",
                        title: "Xem Hình Ảnh Của Cây",
                        className: "esri-icon-media",
                    },
                    {
                        id: "delTree",
                        title: "Xóa Cây",
                        className: "esri-icon-trash",
                    }
                ]
            }
            state.ubgpopupTemplate = ubgpopuptemplate

            var ubgFeatureLayer = new FeatureLayer({
                url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
                // definitionExpression: "XoaBo = 0",
                title: "Cây Xanh", 
                objectIdField: "OBJECTID",
                outfields: ["*"],
                popupTemplate: ubgpopuptemplate
            });
            state.FeatureLayer = ubgFeatureLayer
            map.add(ubgFeatureLayer);

            var ubg_searchwidget = new Search({
                view: view,
                sources: [
                    {
                        layer: ubgFeatureLayer,
                        searchFields: ["SoHieu", "MaTenCX"],
                        displayField: "SoHieu", 
                        placeholder: "Số hiệu, chủng loại",
                        exactMatch: false,
                        outFields: ["*"],
                        maxResults: 10,
                        maxSuggestions: 10,
                        suggestionsEnabled: true,
                        minSuggestCharacters: 0,
                        searchAllEnabled: true,
                        suggestionTemplate: "Cây: {MaTenCX}- Số Hiệu: {SoHieu}",
                        name: "Tìm theo Tên hoặc Số Hiệu Của Cây Xanh",
                        resultSymbol: {
                            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                            color: [226, 119, 40],
                            outline: { // autocasts as new SimpleLineSymbol()
                                color: [255, 255, 255],
                                width: 2
                            }
                        }
                    }
                ]
            });
            view.ui.add(ubg_searchwidget, {
                position: "bottom-right",
                index: 2
            });

            ubg_searchwidget.includeDefaultSources = false;
            ubg_searchwidget.locationEnabled = false;
            state.view = view;
            view.when(async () => {
                view.popup.on("trigger-action", async (event) => {
                    if(event.action.id === "delTree"){
                        state.selectedFeature = await event.target.selectedFeature
                        var varning_del = await confirm('Bạn có chắc muốn xóa cây?');
                        if (varning_del == true){
                            await deleteFeatures({
                                url: state.url,
                                objectIds: [state.selectedFeature.attributes.OBJECTID]
                            }).then(() => {
                                state.FeatureLayer.refresh()
                                view.popup.close()
                            });
                        }
                    }
                    if(event.action.id === "updateInfor"){
                        state.dialog_update = await true
                        state.selectedFeature = await event.target.selectedFeature
                        // await console.log(state.selectedFeature)
                    }
                    if(event.action.id =="viewImage"){
                        djalog_imagepage = await true
                    }
                })
            });
            var track = new Track({
                view: view
            });
            view.ui.add(track, "top-right");
            console.log('track', track.view.center)

        });
    },
    uploadfeature: (state, payload) => {
        state.feature = payload
    },
    uploadfeatureupdate: (state, payload) => {
        state.selectedFeature = payload
    },
    updateFeature: (state, payload) => {
        updateFeatures({
            url: state.url,
            features: [{
                geometry:payload.geometry,
                attributes: payload.attributes
            }],
        }).then(() => {
            alert("Cập Nhật Thành công!");
            state.FeatureLayer.refresh()
            state.dialog_update = false;
            
        })
        state.FeatureLayer.refresh()
    },
    drawGraphics: (state,payload) =>
    {
        loadModules([
            "esri/Graphic",
            "esri/geometry/Polyline",
            "esri/geometry/Polygon",
            "esri/symbols/SimpleFillSymbol",
            "esri/tasks/QueryTask",
            "esri/tasks/support/Query",
        ]).then(([
            Graphic,
            Polyline,
            Polygon,
            SimpleFillSymbol,
            QueryTask,
            Query
        ]) => {
            var polygon = new Polygon({
                rings: payload.rings,
                spatialReference: { 
                    latestWkid: 3857,
                    wkid: 102100 }
              });
            
            var fillSymbol = new SimpleFillSymbol({
                color: [0, 77, 0, 0.2],
                outline: {
                  color: [255, 255, 255],
                  width: 1
                }
              });
            
              // Add the geometry and symbol to a new graphic
            var polygonGraphic = new Graphic({
                geometry: polygon,
                symbol: fillSymbol
            });
            //   console.log(zoom)
            state.view.graphics.removeAll()
            state.view.graphics.add(polygonGraphic);
            state.view.goTo({
                target: polygonGraphic,
                zoom: payload.zoom
            }) 
              //query
            let queryFeature = new Query(
            {
                returnGeometry: true,
                outFields: ["*"],
                geometry: polygon,
                spatialRelationship: "intersects"
            });
            let FeatureTask = new QueryTask({
                url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0"
            });
            FeatureTask.execute(queryFeature).then((response) => {
                var object = []
                var pointGraphic = null
                state.searchs = response.features
                response.features.forEach(feature => {
                    object.push(feature.attributes.OBJECTID)
                });
                // console.log(object)
                if(object.length > 0)
                {
                    state.FeatureLayer.definitionExpression = "OBJECTID  in (" +object + ")"
                }
                else
                {
                    state.FeatureLayer.definitionExpression = "OBJECTID  is NULL"
                }
                
            })
        })
    }
}

export default mutations;