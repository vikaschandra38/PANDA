import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-travel-map',
  templateUrl: './travel-map.component.html',
  styleUrls: ['./travel-map.component.scss']
})
export class TravelMapComponent implements OnInit {

  @ViewChild('travelMap') gmapElement: any;
  map: any;
  bounds: any;
  isMobile = false;

  experts = [{
    name: 'Maria Odobescu',
    location: 'Senegal',
    position: 'Manager',
    start_date: '28.08.22',
    end_date: '22.01.23',
    profile_pic: 'https://scontent.fixc1-4.fna.fbcdn.net/v/t1.6435-1/123141777_3209829305793709_4057303121368734570_n.jpg?stp=dst-jpg_p148x148&_nc_cat=100&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=cfmXxYPMySQAX_0nIqZ&_nc_ht=scontent.fixc1-4.fna&oh=00_AfCTT6b-JZAaZRLHnD5vDaC1NXdhn-lEcwVzr95CCrX4Gw&oe=640AB298',
    lat: 10.142333,
    lng: 12.125116
  },
  {
    name: 'Ashish Garg',
    location: 'Senegal',
    position: 'Manager',
    start_date: '28.08.22',
    end_date: '22.01.23',
    profile_pic: 'https://scontent.fixc1-4.fna.fbcdn.net/v/t1.6435-1/123141777_3209829305793709_4057303121368734570_n.jpg?stp=dst-jpg_p148x148&_nc_cat=100&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=cfmXxYPMySQAX_0nIqZ&_nc_ht=scontent.fixc1-4.fna&oh=00_AfCTT6b-JZAaZRLHnD5vDaC1NXdhn-lEcwVzr95CCrX4Gw&oe=640AB298',
    lat: 37.77085,
    lng: -122.41356
  }];
  constructor() {
    if (window.screen.width < 576) {
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    var mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(10.342333, 12.325116),
      zoom: 4,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#F5F1ED"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#F5F1ED"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#d8d5d0"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#FAF5EF"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#D8D5D0"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.experts.forEach((expert) => {
      this.setMarkerAndInfo(expert);
    });

    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
      this.getPanes().markerLayer.id = 'markerLayer';
    };
    myoverlay.setMap(this.map);
  }

  setMarkerAndInfo(object: any) {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(object.lat, object.lng),
      icon: {
        url: object.profile_pic,
        scaledSize: new google.maps.Size(70, 70), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(20, 72) // anchor
      }
    });

    marker.setMap(this.map);

    var infoContent = ''
    infoContent += `<style>
    .gm-style .gm-style-iw-tc {
      display: none;
    }
    .gm-style-iw {
      background-color: #F5F1ED !important;
    }
    .gm-style-iw-d {
      overflow: hidden !important;
      padding: 12px !important;
    }
    .gm-style .gm-style-iw-c {
      top: 97px;
      border-radius: 35px;
      left: -110px;
      padding: 0px;
    }
    @media (max-width: 576px) {
      .gm-style .gm-style-iw-c {
        top: 210px;
        left: 10px;
        max-width: 295px !important;
      }
      .infoWindow {
        width: 250px !important;
      }
    }
    .infoWindow {
      width: 295px;
      height: 170px
    }

    .infoWindow .name {
      font-family: 'BIZ UDPGothic';
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 23px;
      width: 100%;
    }

    .infoWindow .descripiton {
      font-family: 'BIZ UDPGothic';
      font-style: normal;
      font-size: 13px;
      line-height: 20px;
      width: 100%;
    }

    .infoWindow .date {
      font-family: 'BIZ UDPGothic';
      font-style: normal;
      font-size: 13px;
      line-height: 20px;
      color: #A95454;
      font-weight: bold;
      width: 100%;
    }
    .infoWindow .image {
      width: 60px;
      height: 60px;
      cursor: pointer;
      border-radius: 50% 50% 0px 50%;
      transform: rotate(45deg);
      overflow: hidden;
    }
    .infoWindow .image img {
      width: 70px;
      height: 70px;
      transform: rotate(-45deg);
    }

    </style>`;
    infoContent += `<div class="infoWindow cursor-pointer">`
    infoContent += `
    <div class="d-flex h-100">
      <div class="align-items-baseline col-sm-9 d-flex flex-column justify-content-around p-2">
        <div class="name">
        ${object.name}
        </div>
        <div class="descripiton">
          <div>
            Location: ${object.location}
          </div>
          <div>
            Position: ${object.position}
          </div>
        </div>
        <div class="date">
          ${object.start_date} - ${object.end_date}
        </div>
      </div>
      <div class="align-items-center col-sm-3 d-flex flex-column p-2">
        <div class="pb-3">`
    if (false) {
      infoContent += `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="48" viewBox="0 0 52 48" fill="none">
            <rect x="9.99997" y="17" width="34" height="14" rx="7" fill="#E0E0E0"/>
            <g filter="url(#filter0_dd_1_19039)">
            <rect x="8.6842" y="14" width="20" height="20" rx="10" fill="#EDEBE9"/>
            <rect x="8.4342" y="13.75" width="20.5" height="20.5" rx="10.25" stroke="black" stroke-opacity="0.04" stroke-width="0.5"/>
            </g>
            <defs>
            <filter id="filter0_dd_1_19039" x="0.184204" y="8.5" width="37" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="1"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_19039"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3"/>
            <feGaussianBlur stdDeviation="4"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow_1_19039" result="effect2_dropShadow_1_19039"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_19039" result="shape"/>
            </filter>
            </defs>
          </svg>`
    } else {
      infoContent += `<svg xmlns="http://www.w3.org/2000/svg" width="53" height="49" viewBox="0 0 53 49" fill="none">
            <rect x="6.54688" y="17.5068" width="34" height="14" rx="7" fill="#A95454"/>
            <g filter="url(#filter0_dd_1_3741)">
            <rect x="23.5469" y="14.5068" width="20" height="20" rx="10" fill="#EDEBE9"/>
            <rect x="23.2969" y="14.2568" width="20.5" height="20.5" rx="10.25" stroke="black" stroke-opacity="0.04" stroke-width="0.5"/>
            </g>
            <defs>
            <filter id="filter0_dd_1_3741" x="15.0469" y="9.00684" width="37" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="1"/>
            <feGaussianBlur stdDeviation="0.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3741"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3"/>
            <feGaussianBlur stdDeviation="4"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="effect1_dropShadow_1_3741" result="effect2_dropShadow_1_3741"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_3741" result="shape"/>
            </filter>
            </defs>
          </svg>`
    }
    infoContent += `</div>
        <div class="image">
          <img src="${object.profile_pic}" alt="Pic" />
        </div>
      </div>
    </div>
    `
    infoContent += `</div>`
    var infowindow = new google.maps.InfoWindow({
      content: infoContent
    });

    google.maps.event.addListener(marker, 'click', ((marker) => {
      return () => {
        if (this.activeInfoWindow != null) {
          this.activeInfoWindow.close();
        }
        this.activeInfoWindow = infowindow;
        this.activeInfoWindow.open(this.map, marker);
        infowindow.open(this.map, marker);
      }

    })(marker));
    google.maps.event.addListener(this.map, "click", function (event) {
      infowindow.close();
    });
    // this.map.setZoom(4);
  }

  activeInfoWindow: any;
}
