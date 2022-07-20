(()=>{"use strict";var t=function t(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){if(e.constructor!==i.constructor)return!1;var r,s,a;if(Array.isArray(e)){if((r=e.length)!=i.length)return!1;for(s=r;0!=s--;)if(!t(e[s],i[s]))return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===i.toString();if((r=(a=Object.keys(e)).length)!==Object.keys(i).length)return!1;for(s=r;0!=s--;)if(!Object.prototype.hasOwnProperty.call(i,a[s]))return!1;for(s=r;0!=s--;){var n=a[s];if(!t(e[n],i[n]))return!1}return!0}return e!=e&&i!=i};const e="__googleMapsScriptId";var i;!function(t){t[t.INITIALIZED=0]="INITIALIZED",t[t.LOADING=1]="LOADING",t[t.SUCCESS=2]="SUCCESS",t[t.FAILURE=3]="FAILURE"}(i||(i={}));class r{constructor({apiKey:i,authReferrerPolicy:s,channel:a,client:n,id:o=e,language:l,libraries:h=[],mapIds:c,nonce:g,region:d,retries:p=3,url:u="https://maps.googleapis.com/maps/api/js",version:f}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=i,this.authReferrerPolicy=s,this.channel=a,this.client=n,this.id=o||e,this.language=l,this.libraries=h,this.mapIds=c,this.nonce=g,this.region=d,this.retries=p,this.url=u,this.version=f,r.instance){if(!t(this.options,r.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(r.instance.options)}`);return r.instance}r.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?i.FAILURE:this.done?i.SUCCESS:this.loading?i.LOADING:i.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let t=this.url;return t+=`?callback=${this.CALLBACK}`,this.apiKey&&(t+=`&key=${this.apiKey}`),this.channel&&(t+=`&channel=${this.channel}`),this.client&&(t+=`&client=${this.client}`),this.libraries.length>0&&(t+=`&libraries=${this.libraries.join(",")}`),this.language&&(t+=`&language=${this.language}`),this.region&&(t+=`&region=${this.region}`),this.version&&(t+=`&v=${this.version}`),this.mapIds&&(t+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(t+=`&auth_referrer_policy=${this.authReferrerPolicy}`),t}deleteScript(){const t=document.getElementById(this.id);t&&t.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise(((t,e)=>{this.loadCallback((i=>{i?e(i.error):t(window.google)}))}))}loadCallback(t){this.callbacks.push(t),this.execute()}setScript(){if(document.getElementById(this.id))return void this.callback();const t=this.createUrl(),e=document.createElement("script");e.id=this.id,e.type="text/javascript",e.src=t,e.onerror=this.loadErrorCallback.bind(this),e.defer=!0,e.async=!0,this.nonce&&(e.nonce=this.nonce),document.head.appendChild(e)}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(t){if(this.errors.push(t),this.errors.length<=this.retries){const t=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout((()=>{this.deleteScript(),this.setScript()}),t)}else this.onerrorEvent=t,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach((t=>{t(this.onerrorEvent)})),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version)return console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),void this.callback();this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}const s=function(t){t.data("addressPickerFormComponent",(function(t){var e=t.state,i=t.api_key,s=new r({apiKey:i,version:"weekly",libraries:["places"]});return{state:e,api_key:i,map:null,marker:null,coordinate:{lat:0,lng:0},init:function(){var t=this;null!==this.state&&""!==this.state&&this.setState(this.state),s.loadCallback((function(e){if(e&&console.log(e),t.map=new google.maps.Map(t.$refs.map_container,{zoom:16,center:t.coordinate,streetViewControl:!1}),!t.is_coordinate(t.state)){var i={query:t.state,fields:["name","geometry"]};new google.maps.places.PlacesService(t.map).findPlaceFromQuery(i,(function(e,i){i===google.maps.places.PlacesServiceStatus.OK&&e&&(t.createMark(e[0].geometry.location),t.map.setCenter(e[0].geometry.location))}))}t.createMark()}))},createMark:function(t){var i=this.map;this.marker=new google.maps.Marker({position:t||this.coordinate,map:i,title:"Mark",draggable:!0});var r=this;google.maps.event.addListener(this.marker,"dragend",(function(t){var i=t.latLng;e=i.lat()+","+i.lng(),r.setState(e)}))},is_coordinate:function(t){try{var e=t.split(",")[0],i=t.split(",")[1];return isFinite(e)&&Math.abs(e)<=90&&isFinite(i)&&Math.abs(i)<=180}catch(t){}return!1},setState:function(t){this.state=t,this.is_coordinate(t)&&(this.coordinate.lat=parseFloat(t.split(",")[0]),this.coordinate.lng=parseFloat(t.split(",")[1]))}}}))};document.addEventListener("alpine:init",(function(){window.Alpine.plugin(s)}))})();