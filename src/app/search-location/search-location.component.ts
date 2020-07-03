import {Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild} from '@angular/core';
import { FormControl} from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {Location} from '../models/location.model';
import {environment} from '../../environments/environment';

declare var google: any;

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {
  dropdownSettings = {
    singleSelect: {
      singleSelection: true,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      idField: 'layer_option',
      textField: 'shape_name',
    }
  };
  @ViewChild('screen') screen: ElementRef;
  google: any;
  currentMap: any;
  location: Location[];
  public latitude: number;
  public longitude: number;
  // tslint:disable-next-line:variable-name
  public street_number: string;
  public route: string;
  public locality: string;
  public country: string;
  public city: string;
  // tslint:disable-next-line:variable-name
  public postal_code: number;
  public placeId: string;
  public address: string;
  public phoneFormat: string;
  public searchControl: FormControl;
  public zoom: number;
  tile: any;
  currentZoom: number;
  selectedLocation: Location = null;
  weatherMapSource = '';
  weatherOption = {};
  weatherLayerOn = false;
  weatherMapSourceApiKey = environment.weatherAPIKey;
  mapWeatherLayers = [
    {
      shape_name: 'Wind Speed',
      layer_value: 'wind_new',
      legendMin: '0 m/s',
      legendAvg: '100 m/s',
      legendMax: '200 m/s',
      legendTitle: 'Wind Speed',
      scaleClass: 'weather-wind'
    },
    {
      shape_name: 'Temperature',
      layer_value: 'temp_new',
      legendMin: '-40 deg C',
      legendAvg: '0 deg C',
      legendMax: '40 deg C',
      legendTitle: 'Temperature',
      scaleClass: 'weather-temperature'
    },
    {
      shape_name: 'Pressure',
      layer_value: 'pressure_new',
      legendMin: '949.92 hPa',
      legendAvg: '1013.25 hPa',
      legendMax: '1070.63 hPa',
      legendTitle: 'Pressure',
      scaleClass: 'weather-pressure'
    },
    {
      shape_name: 'Percipitation',
      layer_value: 'precipitation_new',
      legendMin: '0 mm',
      legendAvg: '100 mm',
      legendMax: '200 mm',
      legendTitle: 'Snow',
      scaleClass: 'weather-percepitation'
    },
    {
      shape_name: 'Clouds',
      layer_value: 'clouds_new',
      legendMin: '0 %',
      legendAvg: '50 %',
      legendMax: '100 %',
      legendTitle: 'Cloud',
      scaleClass: 'weather-cloud'
    }
  ];
  selectedWeatherLayer = [];
  tileType: any;
  tileLayer: any;
  coordX: any;
  coordY: any;


  @ViewChild('search') public searchElementRef: ElementRef;


  constructor(private mapsAPILoader: MapsAPILoader,
              private renderer: Renderer2,
              private el: ElementRef,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.searchControl = new FormControl();
    this.setCurrentPosition();


    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']  // geocode (cities) (regions) establishment address
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // @ts-ignore
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.selectedLocation = {
            latitude: this.latitude,
            longitude: this.longitude,
          };
          this.zoom = 12;
          this.placeId = place.place_id;
          this.address = place.formatted_address;
          this.phoneFormat = place.formatted_phone_number;
          this.getAddressComponentByPlace(place);
        });
      });
    });

  }

  private getAddressComponentByPlace(place) {
    const components = place.address_components;
    let country = null;
    let city = null;
    // tslint:disable-next-line:variable-name
    let postal_code = null;
    // tslint:disable-next-line:variable-name
    let street_number = null;
    let route = null;
    let locality = null;

    // tslint:disable-next-line:no-conditional-assignment
    for (let i = 0, component; component = components[i]; i++) {
      console.log(component);
      if (component.types[0] === 'country') {
        country = component.short_name + ', ' + component.long_name;
      }
      if (component.types[0] === 'administrative_area_level_1') {
        city = component.short_name;
      }
      if (component.types[0] === 'postal_code') {
        postal_code = component.short_name;
      }
      if (component.types[0] === 'street_number') {
        street_number = component.short_name;
      }
      if (component.types[0] === 'route') {
        route = component.long_name;
      }
      if (component.types[0] === 'locality') {
        locality = component.short_name;
      }

    }

    this.country = country;
    this.city = city;
    this.postal_code = postal_code;
    this.street_number = street_number;
    this.route = route;
    this.locality = locality;
  }


  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        const latLng = new google.maps.LatLng(this.latitude, this.longitude);
        const geocoder = new google.maps.Geocoder();
        const request = {
          location: latLng
        };

        geocoder.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[0] !== null) {
              this.getAddressComponentByPlace(results[0]);
              this.zoom = 12;
            }
          }
        });
      });
    }
  }

  onMapReady(event) {
    this.currentMap = event;
  }

  addWeatherLayer(event) {
    this.selectedWeatherLayer = event.value;
    this.weatherMapSource = 'https://tile.openweathermap.org/map/' + this.selectedWeatherLayer + '/';
    this.weatherOption = this.selectedWeatherLayer[0].layer_option;
    this.plotWeatherLayers(this.currentMap);
    this.weatherLayerOn = true;
  }

  removeWeatherLayer() {
    this.weatherMapSource = '';
    this.currentMap.overlayMapTypes.clear();
    this.weatherLayerOn = false;
  }


  plotWeatherLayers(event){
    const weatherMapProvider = this.weatherMapSource;
    const weatherApiKey = this.weatherMapSourceApiKey;
    event.overlayMapTypes.clear();
    event.overlayMapTypes.insertAt(0, new agmMapType({width: 256, height: 256, f: 'px', b: 'px'}));
    function agmMapType(tileSize){
      this.tileSize = tileSize;
    }
    agmMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
      const div = ownerDocument.createElement('div');
      div.style.width = this.tileSize.width + 'px';
      div.style.height = this.tileSize.height + 'px';
      div.style.fontSize = '10';
      div.style['background-image'] = 'url(' + weatherMapProvider + zoom + '/' + coord.x + '/' + coord.y + '.png?appid=' + weatherApiKey + ')';
      return div;
    };
  }
}


