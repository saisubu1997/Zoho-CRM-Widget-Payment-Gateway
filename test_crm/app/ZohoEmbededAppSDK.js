var ZOHO=function(){var b,f={};return{embeddedApp:{on:function(e,b){f[e]=b},init:function(){b=new ZSDK;var e,k=new Promise(function(b,c){e=b});b.OnLoad(function(){e()});for(var d in f)b.getContext().Event.Listen(d,f[d]);return k}},CRM:function(){function e(a){return b.getContext().Event.Trigger("CRM_EVENT",a,!0)}function k(a,b,c,d){a={category:"CREATE",Entity:a,RelatedID:c,APIData:b};a.type=d||"RECORD";return e(a)}function d(a,b,c){return e({category:"READ",APIData:{Entity:a,RecordID:b,RelatedList:c}})}
function g(a,b,c){var d=void 0;if("CONNECTOR"!=c){c=b.url;var k=b.params,d=b.headers;b=b.body;if(!c)throw{Message:"Url missing"};if(k){var g,t=[];for(g in k)t.push(encodeURIComponent(g)+"\x3d"+encodeURIComponent(k[g]));g=t.join("\x26");c+=(-1<c.indexOf("?")?"\x26":"?")+g}d={url:c,Header:d,Body:b}}else d=b;return e({category:"CONNECTOR",nameSpace:a,data:d})}function c(a){$.extend(a,{category:"UI"});return e(a)}function h(a,b){return e({category:"CONFIG",type:a,nameSpace:b})}function f(a){var b={category:"USER"};
a.ID?b.ID=a.ID:a.Type&&(b.Type=a.Type);return e(b)}function m(a){a={category:"META",type:a.type,Entity:a.Entity};return e(a)}return{CONFIG:{getOrgVariable:function(a){return h("VARIABLE",a)},getOrgInfo:function(a){return h("ORG")},getCurrentUser:function(){return h("CURRENT_USER").then(function(a){return a[0]})}},META:{API:{getFields:function(a){a.type="FIELD_LIST";return m(a)},getModules:function(){return m({type:"MODULE_LIST"})},getAssignmentRules:function(a){a.type="ASSIGNMENT_RULES";return m(a)}}},
API:{addNotes:function(a){return k(a.Entity,{data:[{Note_Title:a.Title,Note_Content:a.Content}]},a.RecordID,"NOTES")},addNotesAttachment:function(a){return e({category:"UPDATE",type:"NOTES",Entity:a.Entity,RecordID:a.RecordID,RelatedRecordID:a.RelatedRecordID,APIData:{Files:{FileName:File.Name,FileData:File.Content}}})},insertRecord:function(a){return k(a.Entity,a.APIData)},getRecord:function(a){return d(a.Entity,a.RecordID)},getAllRecords:function(a){return e({category:"READ",APIData:a})},updateRecord:function(a){return e({category:"UPDATE",
type:"RECORD",Entity:a.Entity,APIData:a.APIData})},deleteRecord:function(a){return e({category:"DELETE",type:"RECORD",Entity:a.Entity,RecordID:a.RecordID})},searchRecord:function(a){return e({category:"SEARCH",Entity:a.Entity,Type:a.Type,Query:a.Query})},getAllUsers:function(a){return f({Type:a.Type})},getUser:function(a){return f({ID:a.ID})},getAllUsers:function(a){return f({Type:a.Type})},getRelatedRecords:function(a){return d(a.Entity,a.RecordID,a.RelatedList)},updateRelatedRecords:function(a){return e({category:"UPDATE",
type:"RELATED_RECORD",Entity:a.Entity,RecordID:a.RecordID,RelatedList:a.RelatedList,RelatedRecordID:a.RelatedRecordID,APIData:a.APIData})},delinkRelatedRecord:function(a){return e({category:"DELETE",type:"RELATED_RECORD",Entity:a.Entity,RecordID:a.RecordID,RelatedList:a.RelatedList,RelatedRecordID:a.RelatedRecordID})},attachFile:function(a){var b=a.Entity,c=a.RecordID;a=a.File;a={FileName:a.Name,FileData:a.Content};return k(b,a,c,"ATTACHMENT")}},INTERACTION:{getPageInfo:function(){return e({category:"PAGEINFO"})}},
UI:{Resize:function(a,b){return c({action:"RESIZE",data:{width:a,height:b}})},Dialer:{maximize:function(){return c({action:{telephony:"MAXIMIZE"}})},minimize:function(){return c({action:{telephony:"MINIMIZE"}})},notify:function(){return c({action:{telephony:"NOTIFY"}})},resize:function(a,b){}},Record:{open:function(a){a={action:{record:"OPEN"},data:{Entity:a.Entity,RecordID:a.RecordID}};return c(a)},edit:function(a){a={action:{record:"EDIT"},data:{Entity:a.Entity,RecordID:a.RecordID}};return c(a)},
create:function(a){a={action:{record:"CREATE"},data:{Entity:a.Entity,RecordID:a.RecordID}};return c(a)},populate:function(a){return c({action:{record:"POPULATE"},data:a})}},Popup:{close:function(){return c({action:{popup:"CLOSE"}})},closeReload:function(){return c({action:{popup:"CLOSE_RELOAD"}})}}},HTTP:{get:function(a){return g("wget.get",a)},post:function(a){return g("wget.post",a)}},CONNECTOR:{invokeAPI:function(a,b){return g(a,b,"CONNECTOR")}}}}()}}();var ZSDKUtil=function(b){function f(b){}function e(b){var c={};b=b||window.location.href;b.substr(b.indexOf("?")+1).split("\x26").forEach(function(b,d){var e=b.split("\x3d");c[e[0]]=e[1]});c.hasOwnProperty("serviceOrigin")&&(c.serviceOrigin=decodeURIComponent(c.serviceOrigin));return c}var k=e(),d;f.prototype.Info=function(){(b.isDevMode()||b.isLogEnabled())&&window.console.info.apply(null,arguments)};f.prototype.Error=function(){(b.isDevMode()||b.isLogEnabled())&&window.console.error.apply(null,
arguments)};b.GetQueryParams=e;b.isDevMode=function(){return k&&k.isDevMode};b.isLogEnabled=function(){return k&&k.isLogEnabled};b.getLogger=function(){d&&d instanceof f||(d=new f);return d};b.Sleep=function(b){for(var c=(new Date).getTime();c+b>(new Date).getTime(););};return b}(window.ZSDKUtil||{}),ZSDKMessageManager=function(b){function f(a){try{var b="string"===typeof a.data?JSON.parse(a.data):a.data}catch(c){b=a.data}var u=b.type,l=b.eventName;try{var z;if(!(z="SET_CONTEXT"===l)){var A=a.source,
B=a.origin;z=q&&p===A&&r===B?!0:Error("Un-Authorized Message.")}if(z)switch(u){case "FRAMEWORK.EVENT":var g={SET_CONTEXT:e,UPDATE_CONTEXT:k,EVENT_RESPONSE:d}[b.eventName];g&&"function"===typeof g?g(a,b):ZSDKEventManager.NotifyEventListeners(h.AppContext,b.eventName,b.data);break;case "SDK.CNTR_ACCESS_CODE_RECEIVED":var f=b.code,v=b.error,m=b.state;!f||v&&"undefined"!==v?f&&"undefined"!==f||!v||(n[m]={error:v,error_time:(new Date).getTime()}):n[m]={code:f,access_code_time:(new Date).getTime()};break;
default:h.MessageInterceptor(a,b)}}catch(c){x.Error("[SDK.MessageHandler] \x3d\x3e ",c.stack)}}function e(a,b){var c=a.origin;if(!w.test(c))throw Error("Messsage received from unauthorized domain.");p=a.source;r=c;h.SetContext(b.data);h.ExecuteLoadHandler();q=!0}function k(a,b){}function d(b,c){var d=c.promiseid,e=c.data;a.hasOwnProperty(d)&&(a[d].resolve(e),a[d]=void 0,delete a[d])}function g(b){return new Promise(function(c,d){a[b]={resolve:c,reject:d,time:(new Date).getTime()}})}function c(a){"object"===
typeof a&&(a.appOrigin=encodeURIComponent(window.location.href));if(!p)throw Error("Parentwindow reference not found.");p.postMessage(a,h.QueryParams.serviceOrigin)}var h,x=ZSDKUtil.getLogger(),m=100,a={},w=/^https?:\/\/[a-zA-Z0-9-_]*.(sandbox.ucrm.com|sandbox.localzoho.com|csez.zohocorpin.com|zoho.com|localzoho.com|zohoplatform.com|localzohoplatform.com|zohosandbox.com|localzohosandbox.com)(:[0-9]{0,4})?$/,q=!1,p,r,n={};b.Init=function(a,c){if(!a||"object"!==typeof a)throw Error("Invalid Context object passed");
if(c&&"object"!==typeof c)throw Error("Invalid Configuration Passed to MessageManager");h=a;return f.bind(b)};b.RegisterApp=function(){var a={type:"SDK.EVENT",eventName:"REGISTER",appOrigin:encodeURIComponent(window.location.href)};window.top.postMessage(a,h.QueryParams.serviceOrigin)};b.DERegisterApp=function(){var a={type:"SDK.EVENT",eventName:"DEREGISTER",uniqueID:h.getUniqueID()};c(a)};b.SendRequest=function(a){if(!a||"object"!==typeof a)throw Error("Invalid Options passed");if(a.connector&&ZSDKUtil.isDevMode()){var b=
h.GetConnectors();return ZSDKAPIHelper.GetRequest(a,b)}b="Promise"+m++;a={type:"SDK.EVENT",eventName:"HTTP_REQUEST",uniqueID:h.getUniqueID(),time:(new Date).getTime(),promiseid:b,data:a};c(a);a=g(b);return a};b.TriggerEvent=function(a,b,d){if(!a)throw Error("Invalid Eventname : ",a);var e=d?"Promise"+m++:void 0;a={type:"SDK.EVENT",eventName:a,uniqueID:h.getUniqueID(),time:(new Date).getTime(),promiseid:e,data:b};c(a);if(d)return g(e)};b.getFetchedAccessCode=function(a){return n[a]};b.UpdateConnectorData=
function(a,b){return new Promise(function(c,d){$.post({url:"http://127.0.0.1:5000/updateconnector",dataType:"json",data:{connectorName:a,connectorData:JSON.stringify(b)}}).then(function(a){c(a)},function(a){d(JSON.parse(a))})})};return b}(window.ZSDKMessageManager||{}),ZSDKEventManager=function(b){var f=ZSDKUtil.getLogger(),e={};b.AttachEventListener=function(b,d){"function"===typeof d&&(Array.isArray(e[b])||(e[b]=[]),e[b].push(d))};b.NotifyEventListeners=function(b,d,g){var c=d.match(/^\__[A-Za-z_]+\__$/gi);
Array.isArray(c);if((c=e[d])&&Array.isArray(c))for(d=0;d<c.length;d++)c[d].call(b,g);else f.Info("Cannot find EventListeners for Event : ",d)};b.NotifyInternalEventHandler=function(b,d){var e=d.eventName;"__APP_INIT__"===e?(b.SetContext(d.data),b.ExecuteLoadHandler()):"__APP_CONTEXT_UPDATE__"===e&&(b.UpdateContext(d.data),b.ExecuteContextUpdateHandler())};return b}(window.ZSDKEventManager||{});
function ZSDK(){function b(){"function"!==typeof q?u.Error("No OnLoad Handler provided to execute."):q.call(l,l)}function f(){p.call(l,l)}function e(a,b,c){return ZSDKMessageManager.TriggerEvent(a,b,c)}function k(a){u.Info("Setting AppContext data");var b=a&&a.model||{};isDevMode&&a.locale&&a.localeResource&&0===Object.keys(a.localeResource).length&&a.localeResource.constructor===Object&&a.locale&&h(a.locale);if("undefined"!==typeof ZSDKModelManager){for(var c in b)ZSDKModelManager.AddModel(c,b[c]);
l.Model=ZSDKModelManager.GetModelStore()}t=a.uniqueID;r=a.connectors;u.Info("App Connectors ",r)}function d(){return t}function g(a){}function c(){return r}function h(a){x("/app-translations/"+a+".json",function(a){y=JSON.parse(a);w()})}function x(a,b){var c=new XMLHttpRequest;c.open("GET",a,!1);c.onreadystatechange=function(){4==c.readyState&&"200"==c.status&&b(c.responseText)};c.send(null)}function m(a,b,c){for(var d="";d!=a;)d=a,a=a.replace(b,c);return a}function a(a,b){b=b.replace(/\[(\w+)\]/g,
".$1");b=b.replace(/^\./,"");for(var c=b.split("."),d=0,e=c.length;d<e;++d){var f=c[d];if(f in a)a=a[f];else return}return a}function w(){var b=document.querySelectorAll("[data-i18n]"),c;for(c in b)if(b.hasOwnProperty(c)){var d=a(y,b[c].getAttribute("data-i18n"));if(!d)return!1;if(b[c].hasAttribute("data-options")){var e=JSON.parse(JSON.stringify(eval("("+b[c].getAttribute("data-options")+")"))),f=Object.keys(e),g;for(g in f)d=m(d,"${"+f[g]+"}",e[f[g]])}b[c].innerHTML=d}}var q,p,r,n,t,y={},u=ZSDKUtil.getLogger();
this.isContextReady=!1;this.HelperContext={};this.isDevMode=!1;this.getContext=function(){return l};var l={Model:{},Event:{}};l.Event.Listen=function(a,b){ZSDKEventManager.AttachEventListener(a,b)};l.Event.Trigger=e;l.GetRequest=function(a){return ZSDKMessageManager.SendRequest(a)};l.QueryParams=n;l.Translate=function(b,c){var d="";b&&(d=a(y,b));if(!d)return!1;if(c){var e=JSON.parse(JSON.stringify(eval(c))),f=Object.keys(e);for(b in f)d=m(d,"${"+f[b]+"}",e[f[b]])}return d};this.OnLoad=function(a){if("function"!==
typeof a)throw Error("Invalid Function value is passed");q=a};this.OnUnLoad=function(a){};this.OnContextUpdate=function(a){p=a};(function(){n=ZSDKUtil.GetQueryParams();isDevMode=!!n.isDevMode;var a={};a.isDevMode=isDevMode;a.ExecuteLoadHandler=b;a.SetContext=k;a.UpdateContext=g;a.QueryParams=n;a.GetConnectors=c;a.TriggerEvent=e;a.ExecuteContextUpdateHandler=f;a.getUniqueID=d;var h=ZSDKMessageManager.Init(a);window.addEventListener("message",h);window.addEventListener("unload",function(){ZSDKMessageManager.DERegisterApp()});
"undefined"!==typeof ZSDKModelManager&&ZSDKModelManager.Init(a);ZSDKMessageManager.RegisterApp()})()};