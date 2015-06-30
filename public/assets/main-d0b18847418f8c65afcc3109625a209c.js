var app=angular.module("app",["ngResource","ngRoute","ngSanitize","ngDragDrop","ui.bootstrap"]);app.factory("Dashboard",["$resource",function(e){return e("/main/dashboard")}]),app.factory("Community",["$resource",function(e){return e("/main/community")}]),app.factory("Test",["$resource",function(e){return e("/test/index")}]),app.factory("RegisterNew",["$resource",function(e){return e("/users/create")}]),app.factory("SendPost",["$resource",function(e){return e("/main/postit")}]),app.factory("Register",["$resource",function(e){return e("/users/register")}]),app.factory("SignOut",["$resource",function(e){return e("/main/signout")}]),app.factory("SignIn",["$resource",function(e){return e("/main/signin")}]),app.factory("AnswerSave",["$resource",function(e){return e("/test/answer")}]),app.factory("TestSave",["$resource",function(e){return e("/test/save")}]),app.factory("TestFetch",["$resource",function(e){return e("/test/fetch")}]),app.factory("TestPart",["$resource",function(e){return e("/test/part")}]),app.factory("GetProfile",["$resource",function(e){return e("/main/profile")}]),app.controller("CommunityCtrl",["$scope","$window","$document","$sce","Community","SendPost",function(e,t,n,r,i,o){e.data=[],e.forum="",e.query="",e.thread="",e.board="",e.my_query=!1,e.copylink="",e.postsCount=0,e.setThread=function(){i.get({get:"thread",id:e.query,thread:$("#thread").val()})},e.setBoard=function(){i.get({get:"board",id:e.forum,board:$("#board").val()})},e.deleteQuery=function(t){i.get({get:"deleteQuery",id:t},function(){e.forumulate(e.forum)})},e.deleteForum=function(t){i.get({get:"deleteForum",id:t},function(){e.formulize()})},e.getSize=function(e){var t=new Image;t.src=e;var n=t.height,r=t.width,i="";return i+=n>r?"height:100%;width:auto;":"width:100%;height:auto;"},e.deleteMe=function(){i.get({get:"deletepost",id:$("#pickme").attr("name")},function(){e.postulate(e.data[0].query,-1)})},e.submit=function(){o.get({editid:$("#pickme").attr("name"),post:$("#textarea").html(),query:e.query,swag:[]},function(){e.postulate(e.query,-1)})},e.setLink=function(t){e.styleBox(2,t,!1),e.styleBox(4,t,!1),e.styleBox(5,t,!1)},e.trustAsHtml=function(e){return r.trustAsHtml(e)},e.avatarHTML=function(e){return'<object data="'+e+'" type="image/png"></object>'},e.styleBox=function(t,n,r){var i=!0,o=[],s=$(n.target).next().val(),a=$(n.target).prev().val(),l=["font-weight","font-style","text-decoration","font-size","color","cursor"],u=["600","italic","underline",s+"px","blue","pointer"],c=window.getSelection().getRangeAt(0),d=c.startContainer;if($.contains($("#textarea").get(0),d)){d.parentNode.id.length<1&&(d=d.parentNode),d.parentNode.id.length<1&&(d=d.parentNode);for(var p=d.parentNode.childNodes,f="",h=0;p[h]!=d;)f+=p[h].outerHTML||"<span>"+$(p[h]).text()+"</span>",h++;var g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(0,c.startOffset);g.html(m),f+=g.get(0).outerHTML,h++;for(var v=c.startOffset,_=$(d).text().length-v,b=c.toString().length;b>_;)g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v,v+_),g.html(m),r?(i=!1,g.css(l[t],""),5==t&&(g.removeAttr("onclick"),g.css("color",""),g.css("cursor",""))):(g.css(l[t])!=u[t]&&(i=!1),g.css(l[t],u[t]),4==t&&g.attr("onclick","window.location.href='"+a+"'")),f+=g.get(0).outerHTML,b-=_,d=d.nextSibling,_=$(d).text().length,v=0,o.push(h),h++;for(_==b&&(g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v),g.html(m),r?(i=!1,g.css(l[t],""),5==t&&(g.removeAttr("onclick"),g.css("color",""),g.css("cursor",""))):(g.css(l[t])!=u[t]&&(i=!1),g.css(l[t],u[t]),4==t&&g.attr("onclick","window.location.href='"+a+"'")),f+=g.get(0).outerHTML,o.push(h),h++),_>b&&(g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v,v+b),g.html(m),r?(i=!1,g.css(l[t],""),5==t&&(g.removeAttr("onclick"),g.css("color",""),g.css("cursor",""))):(g.css(l[t])!=u[t]&&(i=!1),g.css(l[t],u[t]),4==t&&g.attr("onclick","window.location.href='"+a+"'")),f+=g.get(0).outerHTML,o.push(h),h++,g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v+b),g.html(m),f+=g.get(0).outerHTML);d.nextSibling;)d=d.nextSibling,f+=d.outerHTML||"<span>"+$(d).text()+"</span>";if(i)e.styleBox(t,n,!0);else{var x=$("#textarea");x.html(f),$("#preview").html(f);var y=x.children();$(y.get(y.length-1)).text().length>0&&(x.append("<span></span>"),y=x.children());var w=window.getSelection(),k=document.createRange();k.setStart(y.get(o[0]),0);var T=y.get(o[o.length-1]+1);k.setEnd(T,0),w.removeAllRanges(),w.addRange(k)}}},e.forumulate=function(t){window.scrollTo(0,0),i.get({get:"forum",id:t},function(t){$("#posts").fadeOut(500),$("#forums").fadeOut(500),e.data=t.queries,e.forum=t.forum,e.board=t.board,e.mine=t.mine,$("#queries").fadeIn(500)})},e.edit=function(e){i.get({get:"edit",id:e},function(e){$("#textarea").html(e.post.message)})},e.postulate=function(t,n){e.postsCount=0,i.get({get:"post",id:t,forum:n},function(t){$("#queries").fadeOut(500),e.data=t.posts,e.forum=t.forum,e.query=t.query,e.thread=t.thread,e.my_query=t.my_query,$("#posts").fadeIn(500,function(){$("#alterHeight").css("height",parseInt($("#posts").css("height").replace("px",""))+300+"px")})})},e.format=function(t){t&&($("#posts").prepend('<div style="display:none" id="p'+e.postsCount+'">'+t+"</div>"),e.postsCount++)},e.last=function(e){return $("#p"+e).text().length>0&&$("#post"+e).html($("#p"+e).html()),""},e.formulize=function(){$("#queries").fadeOut(500),i.get({get:"index"},function(t){e.data=t.forums,$("#forums").fadeIn(500)})},angular.element(document).ready(function(){i.get({get:"index"},function(t){e.data=t.forums})}),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","jquery.ui.widget"],e):"object"==typeof exports?e(require("jquery"),require("./vendor/jquery.ui.widget")):e(window.jQuery)}(function(e){"use strict";function t(t){var n="dragover"===t;return function(r){r.dataTransfer=r.originalEvent&&r.originalEvent.dataTransfer;var i=r.dataTransfer;i&&-1!==e.inArray("Files",i.types)&&this._trigger(t,e.Event(t,{delegatedEvent:r}))!==!1&&(r.preventDefault(),n&&(i.dropEffect="copy"))}}e.support.fileInput=!(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent)||e('<input type="file">').prop("disabled")),e.support.xhrFileUpload=!(!window.ProgressEvent||!window.FileReader),e.support.xhrFormDataFileUpload=!!window.FormData,e.support.blobSlice=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice),e.widget("blueimp.fileupload",{options:{dropZone:e(document),pasteZone:void 0,fileInput:void 0,replaceFileInput:!0,paramName:void 0,singleFileUploads:!0,limitMultiFileUploads:void 0,limitMultiFileUploadSize:void 0,limitMultiFileUploadSizeOverhead:512,sequentialUploads:!1,limitConcurrentUploads:void 0,forceIframeTransport:!1,redirect:void 0,redirectParamName:void 0,postMessage:void 0,multipart:!0,maxChunkSize:void 0,uploadedBytes:void 0,recalculateProgress:!0,progressInterval:100,bitrateInterval:500,autoUpload:!0,messages:{uploadedBytes:"Uploaded bytes exceed file size"},i18n:function(t,n){return t=this.messages[t]||t.toString(),n&&e.each(n,function(e,n){t=t.replace("{"+e+"}",n)}),t},formData:function(e){return e.serializeArray()},add:function(t,n){return t.isDefaultPrevented()?!1:void((n.autoUpload||n.autoUpload!==!1&&e(this).fileupload("option","autoUpload"))&&n.process().done(function(){n.submit()}))},processData:!1,contentType:!1,cache:!1},_specialOptions:["fileInput","dropZone","pasteZone","multipart","forceIframeTransport"],_blobSlice:e.support.blobSlice&&function(){var e=this.slice||this.webkitSlice||this.mozSlice;return e.apply(this,arguments)},_BitrateTimer:function(){this.timestamp=Date.now?Date.now():(new Date).getTime(),this.loaded=0,this.bitrate=0,this.getBitrate=function(e,t,n){var r=e-this.timestamp;return(!this.bitrate||!n||r>n)&&(this.bitrate=(t-this.loaded)*(1e3/r)*8,this.loaded=t,this.timestamp=e),this.bitrate}},_isXHRUpload:function(t){return!t.forceIframeTransport&&(!t.multipart&&e.support.xhrFileUpload||e.support.xhrFormDataFileUpload)},_getFormData:function(t){var n;return"function"===e.type(t.formData)?t.formData(t.form):e.isArray(t.formData)?t.formData:"object"===e.type(t.formData)?(n=[],e.each(t.formData,function(e,t){n.push({name:e,value:t})}),n):[]},_getTotal:function(t){var n=0;return e.each(t,function(e,t){n+=t.size||1}),n},_initProgressObject:function(t){var n={loaded:0,total:0,bitrate:0};t._progress?e.extend(t._progress,n):t._progress=n},_initResponseObject:function(e){var t;if(e._response)for(t in e._response)e._response.hasOwnProperty(t)&&delete e._response[t];else e._response={}},_onProgress:function(t,n){if(t.lengthComputable){var r,i=Date.now?Date.now():(new Date).getTime();if(n._time&&n.progressInterval&&i-n._time<n.progressInterval&&t.loaded!==t.total)return;n._time=i,r=Math.floor(t.loaded/t.total*(n.chunkSize||n._progress.total))+(n.uploadedBytes||0),this._progress.loaded+=r-n._progress.loaded,this._progress.bitrate=this._bitrateTimer.getBitrate(i,this._progress.loaded,n.bitrateInterval),n._progress.loaded=n.loaded=r,n._progress.bitrate=n.bitrate=n._bitrateTimer.getBitrate(i,r,n.bitrateInterval),this._trigger("progress",e.Event("progress",{delegatedEvent:t}),n),this._trigger("progressall",e.Event("progressall",{delegatedEvent:t}),this._progress)}},_initProgressListener:function(t){var n=this,r=t.xhr?t.xhr():e.ajaxSettings.xhr();r.upload&&(e(r.upload).bind("progress",function(e){var r=e.originalEvent;e.lengthComputable=r.lengthComputable,e.loaded=r.loaded,e.total=r.total,n._onProgress(e,t)}),t.xhr=function(){return r})},_isInstanceOf:function(e,t){return Object.prototype.toString.call(t)==="[object "+e+"]"},_initXHRData:function(t){var n,r=this,i=t.files[0],o=t.multipart||!e.support.xhrFileUpload,s="array"===e.type(t.paramName)?t.paramName[0]:t.paramName;t.headers=e.extend({},t.headers),t.contentRange&&(t.headers["Content-Range"]=t.contentRange),o&&!t.blob&&this._isInstanceOf("File",i)||(t.headers["Content-Disposition"]='attachment; filename="'+encodeURI(i.name)+'"'),o?e.support.xhrFormDataFileUpload&&(t.postMessage?(n=this._getFormData(t),t.blob?n.push({name:s,value:t.blob}):e.each(t.files,function(r,i){n.push({name:"array"===e.type(t.paramName)&&t.paramName[r]||s,value:i})})):(r._isInstanceOf("FormData",t.formData)?n=t.formData:(n=new FormData,e.each(this._getFormData(t),function(e,t){n.append(t.name,t.value)})),t.blob?n.append(s,t.blob,i.name):e.each(t.files,function(i,o){(r._isInstanceOf("File",o)||r._isInstanceOf("Blob",o))&&n.append("array"===e.type(t.paramName)&&t.paramName[i]||s,o,o.uploadName||o.name)})),t.data=n):(t.contentType=i.type||"application/octet-stream",t.data=t.blob||i),t.blob=null},_initIframeSettings:function(t){var n=e("<a></a>").prop("href",t.url).prop("host");t.dataType="iframe "+(t.dataType||""),t.formData=this._getFormData(t),t.redirect&&n&&n!==location.host&&t.formData.push({name:t.redirectParamName||"redirect",value:t.redirect})},_initDataSettings:function(e){this._isXHRUpload(e)?(this._chunkedUpload(e,!0)||(e.data||this._initXHRData(e),this._initProgressListener(e)),e.postMessage&&(e.dataType="postmessage "+(e.dataType||""))):this._initIframeSettings(e)},_getParamName:function(t){var n=e(t.fileInput),r=t.paramName;return r?e.isArray(r)||(r=[r]):(r=[],n.each(function(){for(var t=e(this),n=t.prop("name")||"files[]",i=(t.prop("files")||[1]).length;i;)r.push(n),i-=1}),r.length||(r=[n.prop("name")||"files[]"])),r},_initFormSettings:function(t){t.form&&t.form.length||(t.form=e(t.fileInput.prop("form")),t.form.length||(t.form=e(this.options.fileInput.prop("form")))),t.paramName=this._getParamName(t),t.url||(t.url=t.form.prop("action")||location.href),t.type=(t.type||"string"===e.type(t.form.prop("method"))&&t.form.prop("method")||"").toUpperCase(),"POST"!==t.type&&"PUT"!==t.type&&"PATCH"!==t.type&&(t.type="POST"),t.formAcceptCharset||(t.formAcceptCharset=t.form.attr("accept-charset"))},_getAJAXSettings:function(t){var n=e.extend({},this.options,t);return this._initFormSettings(n),this._initDataSettings(n),n},_getDeferredState:function(e){return e.state?e.state():e.isResolved()?"resolved":e.isRejected()?"rejected":"pending"},_enhancePromise:function(e){return e.success=e.done,e.error=e.fail,e.complete=e.always,e},_getXHRPromise:function(t,n,r){var i=e.Deferred(),o=i.promise();return n=n||this.options.context||o,t===!0?i.resolveWith(n,r):t===!1&&i.rejectWith(n,r),o.abort=i.promise,this._enhancePromise(o)},_addConvenienceMethods:function(t,n){var r=this,i=function(t){return e.Deferred().resolveWith(r,t).promise()};n.process=function(t,o){return(t||o)&&(n._processQueue=this._processQueue=(this._processQueue||i([this])).pipe(function(){return n.errorThrown?e.Deferred().rejectWith(r,[n]).promise():i(arguments)}).pipe(t,o)),this._processQueue||i([this])},n.submit=function(){return"pending"!==this.state()&&(n.jqXHR=this.jqXHR=r._trigger("submit",e.Event("submit",{delegatedEvent:t}),this)!==!1&&r._onSend(t,this)),this.jqXHR||r._getXHRPromise()},n.abort=function(){return this.jqXHR?this.jqXHR.abort():(this.errorThrown="abort",r._trigger("fail",null,this),r._getXHRPromise(!1))},n.state=function(){return this.jqXHR?r._getDeferredState(this.jqXHR):this._processQueue?r._getDeferredState(this._processQueue):void 0},n.processing=function(){return!this.jqXHR&&this._processQueue&&"pending"===r._getDeferredState(this._processQueue)},n.progress=function(){return this._progress},n.response=function(){return this._response}},_getUploadedBytes:function(e){var t=e.getResponseHeader("Range"),n=t&&t.split("-"),r=n&&n.length>1&&parseInt(n[1],10);return r&&r+1},_chunkedUpload:function(t,n){t.uploadedBytes=t.uploadedBytes||0;var r,i,o=this,s=t.files[0],a=s.size,l=t.uploadedBytes,u=t.maxChunkSize||a,c=this._blobSlice,d=e.Deferred(),p=d.promise();return this._isXHRUpload(t)&&c&&(l||a>u)&&!t.data?n?!0:l>=a?(s.error=t.i18n("uploadedBytes"),this._getXHRPromise(!1,t.context,[null,"error",s.error])):(i=function(){var n=e.extend({},t),p=n._progress.loaded;n.blob=c.call(s,l,l+u,s.type),n.chunkSize=n.blob.size,n.contentRange="bytes "+l+"-"+(l+n.chunkSize-1)+"/"+a,o._initXHRData(n),o._initProgressListener(n),r=(o._trigger("chunksend",null,n)!==!1&&e.ajax(n)||o._getXHRPromise(!1,n.context)).done(function(r,s,u){l=o._getUploadedBytes(u)||l+n.chunkSize,p+n.chunkSize-n._progress.loaded&&o._onProgress(e.Event("progress",{lengthComputable:!0,loaded:l-n.uploadedBytes,total:l-n.uploadedBytes}),n),t.uploadedBytes=n.uploadedBytes=l,n.result=r,n.textStatus=s,n.jqXHR=u,o._trigger("chunkdone",null,n),o._trigger("chunkalways",null,n),a>l?i():d.resolveWith(n.context,[r,s,u])}).fail(function(e,t,r){n.jqXHR=e,n.textStatus=t,n.errorThrown=r,o._trigger("chunkfail",null,n),o._trigger("chunkalways",null,n),d.rejectWith(n.context,[e,t,r])})},this._enhancePromise(p),p.abort=function(){return r.abort()},i(),p):!1},_beforeSend:function(e,t){0===this._active&&(this._trigger("start"),this._bitrateTimer=new this._BitrateTimer,this._progress.loaded=this._progress.total=0,this._progress.bitrate=0),this._initResponseObject(t),this._initProgressObject(t),t._progress.loaded=t.loaded=t.uploadedBytes||0,t._progress.total=t.total=this._getTotal(t.files)||1,t._progress.bitrate=t.bitrate=0,this._active+=1,this._progress.loaded+=t.loaded,this._progress.total+=t.total},_onDone:function(t,n,r,i){var o=i._progress.total,s=i._response;i._progress.loaded<o&&this._onProgress(e.Event("progress",{lengthComputable:!0,loaded:o,total:o}),i),s.result=i.result=t,s.textStatus=i.textStatus=n,s.jqXHR=i.jqXHR=r,this._trigger("done",null,i)},_onFail:function(e,t,n,r){var i=r._response;r.recalculateProgress&&(this._progress.loaded-=r._progress.loaded,this._progress.total-=r._progress.total),i.jqXHR=r.jqXHR=e,i.textStatus=r.textStatus=t,i.errorThrown=r.errorThrown=n,this._trigger("fail",null,r)},_onAlways:function(e,t,n,r){this._trigger("always",null,r)},_onSend:function(t,n){n.submit||this._addConvenienceMethods(t,n);var r,i,o,s,a=this,l=a._getAJAXSettings(n),u=function(){return a._sending+=1,l._bitrateTimer=new a._BitrateTimer,r=r||((i||a._trigger("send",e.Event("send",{delegatedEvent:t}),l)===!1)&&a._getXHRPromise(!1,l.context,i)||a._chunkedUpload(l)||e.ajax(l)).done(function(e,t,n){a._onDone(e,t,n,l)}).fail(function(e,t,n){a._onFail(e,t,n,l)}).always(function(e,t,n){if(a._onAlways(e,t,n,l),a._sending-=1,a._active-=1,l.limitConcurrentUploads&&l.limitConcurrentUploads>a._sending)for(var r=a._slots.shift();r;){if("pending"===a._getDeferredState(r)){r.resolve();break}r=a._slots.shift()}0===a._active&&a._trigger("stop")})};return this._beforeSend(t,l),this.options.sequentialUploads||this.options.limitConcurrentUploads&&this.options.limitConcurrentUploads<=this._sending?(this.options.limitConcurrentUploads>1?(o=e.Deferred(),this._slots.push(o),s=o.pipe(u)):(this._sequence=this._sequence.pipe(u,u),s=this._sequence),s.abort=function(){return i=[void 0,"abort","abort"],r?r.abort():(o&&o.rejectWith(l.context,i),u())},this._enhancePromise(s)):u()},_onAdd:function(t,n){var r,i,o,s,a=this,l=!0,u=e.extend({},this.options,n),c=n.files,d=c.length,p=u.limitMultiFileUploads,f=u.limitMultiFileUploadSize,h=u.limitMultiFileUploadSizeOverhead,g=0,m=this._getParamName(u),v=0;if(!f||d&&void 0!==c[0].size||(f=void 0),(u.singleFileUploads||p||f)&&this._isXHRUpload(u))if(u.singleFileUploads||f||!p)if(!u.singleFileUploads&&f)for(o=[],r=[],s=0;d>s;s+=1)g+=c[s].size+h,(s+1===d||g+c[s+1].size+h>f||p&&s+1-v>=p)&&(o.push(c.slice(v,s+1)),i=m.slice(v,s+1),i.length||(i=m),r.push(i),v=s+1,g=0);else r=m;else for(o=[],r=[],s=0;d>s;s+=p)o.push(c.slice(s,s+p)),i=m.slice(s,s+p),i.length||(i=m),r.push(i);else o=[c],r=[m];return n.originalFiles=c,e.each(o||c,function(i,s){var u=e.extend({},n);return u.files=o?s:[s],u.paramName=r[i],a._initResponseObject(u),a._initProgressObject(u),a._addConvenienceMethods(t,u),l=a._trigger("add",e.Event("add",{delegatedEvent:t}),u)}),l},_replaceFileInput:function(t){var n=t.fileInput,r=n.clone(!0);t.fileInputClone=r,e("<form></form>").append(r)[0].reset(),n.after(r).detach(),e.cleanData(n.unbind("remove")),this.options.fileInput=this.options.fileInput.map(function(e,t){return t===n[0]?r[0]:t}),n[0]===this.element[0]&&(this.element=r)},_handleFileTreeEntry:function(t,n){var r,i=this,o=e.Deferred(),s=function(e){e&&!e.entry&&(e.entry=t),o.resolve([e])},a=function(e){i._handleFileTreeEntries(e,n+t.name+"/").done(function(e){o.resolve(e)}).fail(s)},l=function(){r.readEntries(function(e){e.length?(u=u.concat(e),l()):a(u)},s)},u=[];return n=n||"",t.isFile?t._file?(t._file.relativePath=n,o.resolve(t._file)):t.file(function(e){e.relativePath=n,o.resolve(e)},s):t.isDirectory?(r=t.createReader(),l()):o.resolve([]),o.promise()},_handleFileTreeEntries:function(t,n){var r=this;return e.when.apply(e,e.map(t,function(e){return r._handleFileTreeEntry(e,n)})).pipe(function(){return Array.prototype.concat.apply([],arguments)})},_getDroppedFiles:function(t){t=t||{};var n=t.items;return n&&n.length&&(n[0].webkitGetAsEntry||n[0].getAsEntry)?this._handleFileTreeEntries(e.map(n,function(e){var t;return e.webkitGetAsEntry?(t=e.webkitGetAsEntry(),t&&(t._file=e.getAsFile()),t):e.getAsEntry()})):e.Deferred().resolve(e.makeArray(t.files)).promise()},_getSingleFileInputFiles:function(t){t=e(t);var n,r,i=t.prop("webkitEntries")||t.prop("entries");if(i&&i.length)return this._handleFileTreeEntries(i);if(n=e.makeArray(t.prop("files")),n.length)void 0===n[0].name&&n[0].fileName&&e.each(n,function(e,t){t.name=t.fileName,t.size=t.fileSize});else{if(r=t.prop("value"),!r)return e.Deferred().resolve([]).promise();n=[{name:r.replace(/^.*\\/,"")}]}return e.Deferred().resolve(n).promise()},_getFileInputFiles:function(t){return t instanceof e&&1!==t.length?e.when.apply(e,e.map(t,this._getSingleFileInputFiles)).pipe(function(){return Array.prototype.concat.apply([],arguments)}):this._getSingleFileInputFiles(t)},_onChange:function(t){var n=this,r={fileInput:e(t.target),form:e(t.target.form)};this._getFileInputFiles(r.fileInput).always(function(i){r.files=i,n.options.replaceFileInput&&n._replaceFileInput(r),n._trigger("change",e.Event("change",{delegatedEvent:t}),r)!==!1&&n._onAdd(t,r)})},_onPaste:function(t){var n=t.originalEvent&&t.originalEvent.clipboardData&&t.originalEvent.clipboardData.items,r={files:[]};n&&n.length&&(e.each(n,function(e,t){var n=t.getAsFile&&t.getAsFile();n&&r.files.push(n)}),this._trigger("paste",e.Event("paste",{delegatedEvent:t}),r)!==!1&&this._onAdd(t,r))},_onDrop:function(t){t.dataTransfer=t.originalEvent&&t.originalEvent.dataTransfer;var n=this,r=t.dataTransfer,i={};r&&r.files&&r.files.length&&(t.preventDefault(),this._getDroppedFiles(r).always(function(r){i.files=r,n._trigger("drop",e.Event("drop",{delegatedEvent:t}),i)!==!1&&n._onAdd(t,i)}))},_onDragOver:t("dragover"),_onDragEnter:t("dragenter"),_onDragLeave:t("dragleave"),_initEventHandlers:function(){this._isXHRUpload(this.options)&&(this._on(this.options.dropZone,{dragover:this._onDragOver,drop:this._onDrop,dragenter:this._onDragEnter,dragleave:this._onDragLeave}),this._on(this.options.pasteZone,{paste:this._onPaste})),e.support.fileInput&&this._on(this.options.fileInput,{change:this._onChange})},_destroyEventHandlers:function(){this._off(this.options.dropZone,"dragenter dragleave dragover drop"),this._off(this.options.pasteZone,"paste"),this._off(this.options.fileInput,"change")},_setOption:function(t,n){var r=-1!==e.inArray(t,this._specialOptions);r&&this._destroyEventHandlers(),this._super(t,n),r&&(this._initSpecialOptions(),this._initEventHandlers())},_initSpecialOptions:function(){var t=this.options;void 0===t.fileInput?t.fileInput=this.element.is('input[type="file"]')?this.element:this.element.find('input[type="file"]'):t.fileInput instanceof e||(t.fileInput=e(t.fileInput)),t.dropZone instanceof e||(t.dropZone=e(t.dropZone)),t.pasteZone instanceof e||(t.pasteZone=e(t.pasteZone))},_getRegExp:function(e){var t=e.split("/"),n=t.pop();return t.shift(),new RegExp(t.join("/"),n)},_isRegExpOption:function(t,n){return"url"!==t&&"string"===e.type(n)&&/^\/.*\/[igm]{0,3}$/.test(n)},_initDataAttributes:function(){var t=this,n=this.options,r=this.element.data();e.each(this.element[0].attributes,function(e,i){var o,s=i.name.toLowerCase();/^data-/.test(s)&&(s=s.slice(5).replace(/-[a-z]/g,function(e){return e.charAt(1).toUpperCase()}),o=r[s],t._isRegExpOption(s,o)&&(o=t._getRegExp(o)),n[s]=o)})},_create:function(){this._initDataAttributes(),this._initSpecialOptions(),this._slots=[],this._sequence=this._getXHRPromise(!0),this._sending=this._active=0,this._initProgressObject(this),this._initEventHandlers()},active:function(){return this._active},progress:function(){return this._progress},add:function(t){var n=this;t&&!this.options.disabled&&(t.fileInput&&!t.files?this._getFileInputFiles(t.fileInput).always(function(e){t.files=e,n._onAdd(null,t)}):(t.files=e.makeArray(t.files),this._onAdd(null,t)))},send:function(t){if(t&&!this.options.disabled){if(t.fileInput&&!t.files){var n,r,i=this,o=e.Deferred(),s=o.promise();return s.abort=function(){return r=!0,n?n.abort():(o.reject(null,"abort","abort"),s)},this._getFileInputFiles(t.fileInput).always(function(e){if(!r){if(!e.length)return void o.reject();t.files=e,n=i._onSend(null,t),n.then(function(e,t,n){o.resolve(e,t,n)},function(e,t,n){o.reject(e,t,n)})}}),this._enhancePromise(s)}if(t.files=e.makeArray(t.files),t.files.length)return this._onSend(null,t)}return this._getXHRPromise(!1,t&&t.context)}})})}]),app.controller("MasterCtrl",["$rootScope","$scope","$timeout","Dashboard","SignOut","SignIn","GetProfile",function(e,t,n,r,o,s,a){function l(){o.get(function(){$(".sliders").fadeOut(1500),$.wait(1500).then(function(){window.location.href="https://www.eztoeic.com"}),$("#logger1").css("display","inline-block"),$("#logger2").css("display","inline-block"),$("#logger3").css("display","none"),$("#logger4").css("display","none"),$("#logger4").html("")})}function u(){t.messenger($("#login").html(),300,270,"Sign-in",["Cancel","Submit"]),$(".ui-button:last").attr("onclick",'$("#mrButton").click()')}function c(){t.messenger($("#register").html(),380,500,"Update Your Profile",["Cancel","Submit"]),$(".ui-button:last").attr("onclick",'$("#updater").click();')}function d(){t.messenger($("#register").html(),380,500,"Register for free!",["Cancel","Submit"]),$(".ui-button:last").attr("onclick",'$("input:last").click()'),$("form").attr("onsubmit",'$("#verify").click()')}function p(e,t,n,r,i,o){var s,a,l,u;l=t,u=n,e.moveTo(t,n);for(var c=1;10>=c;c++)s=(t*c+r*(100-c))/100,a=(n*c+i*(100-c))/100,f(e,l,u,s,a,o),l=s,u=a}function f(e,t,n,r,i,o){var s=(t+r)/2,a=(n+i)/2;o?(p(e,t,n,s,a,!1),p(e,s,a,r,i,!1)):(e.quadraticCurveTo(t,n,s,a),e.quadraticCurveTo(s,a,r,i))}t.data=[],t.loginId="",t.loginPass="",t.loggedIn=0,t.login="nobody";var h=0;t.$on("Dashboard",function(){$(".tabs").css("background-color","#262626"),$('td[name="Dashboard"]').css("background-color","gray");var e=$("#Dashboard");$(".sliders").not(e).fadeOut(500),e.fadeIn(500),e.css("top","0")}),t.focusTab=function(t){$(".tabs").css("background-color","#262626"),$(t.target).css("background-color","gray");var n=$("#"+$(t.target).attr("name"));$(".sliders").not(n).fadeOut(500),e.$broadcast($(t.target).attr("name"),"fadeIn"),n.fadeIn(500),n.css("top","0")},t.getTab=function(t){$(".tabs").css("background-color","#262626"),$(t.target).css("background-color","gray");var n=$(parseInt($(t.target).attr("name"))<8?"#Dashboard":"#Community");$(".sliders").not(n).fadeOut(500),e.$broadcast($(t.target).attr("name"),"fadeIn"),n.fadeIn(500),n.css("top","0")},t.alert=function(e){if(h++,6==h){e&&t.messenger(e,300,200,"Welcome!",["Cool!"]),$(".sliders").not("#Dashboard").fadeOut(500);var n=$("#Dashboard");n.css("top","0"),n.fadeIn(500)}},t.doLogin=function(){alert(t.loginId),alert(t.loginPass)},t.regLog=function(e){switch(e){case 1:d();break;case 2:u();break;case 3:l();break;case 4:c()}},t.logMeIn=function(){var e={},n=$('input[type="text"].classFun:last'),r=$('input[type="password"].classFun:last');e["user[login]"]=n.val(),e["user[password]"]=r.val(),s.get(e,function(e){$(".sliders").fadeOut(1500),$.wait(1500).then(function(){window.location.href="https://www.eztoeic.com"}),e.login?(t.loggedIn=e.login,t.login=t.loggedIn.login,$("#logger1").css("display","none"),$("#logger2").css("display","none"),$("#logger3").css("display","inline-block"),$("#logger4").css("display","inline-block"),$("#logger4").html(t.login)):(t.loggedIn=null,t.login="nobody")})},$.wait=function(e){var t=$.Deferred();return setTimeout(function(){t.resolve()},e),t},t.updateProfile=function(){for(var e=$('form[id^="edit_user"]:last').find("input"),t={},n=0;n<e.length;n++)t[$(e.get(n)).attr("name")]=$(e.get(n)).val();a.get(t,function(){window.location.href="https://www.eztoeic.com"})},t.$on("Messenger",function(){var e=$("#Part1").find("#fullSize");t.messenger(e.html(),1067,625,"Expanded View",["Close"]),$("#message").css("text-align",""),$("#message").find("#gameBox0").css("top",""),$("#message").find("#gameBox1").css("top",""),$("#message").find("#gameBox0").css("width",""),$("#message").find("#gameBox1").css("width","")}),t.messenger=function(e,t,n,r,o){$("#message").html(e);var s=$("#dialog-confirm");s.attr("title",r),$("#ui-id-1").html(r);var a=[0];for(i in o)a[i]={text:o[i],click:function(){$(this).dialog("close")}};s.dialog({resizable:!1,height:n,width:t,modal:!0,buttons:a})},angular.element(document).ready(function(){r.get(function(e){t.data=e;var n=($(window).width()>1200&&"true"==$("body").attr("chrome"),1);$("#thisGraph").attr("width",620*n),$("#thisGraph").attr("height",450*n);var r=$("#thisGraph").get(0),i=r?r.getContext("2d"):null;i.clearRect(0,0,r.width,r.height);var o=r.width/2,s=r.height/2,a=200*n;i.lineWidth=3*n,i.strokeStyle="#000000",i.lineCap="round",i.lineJoin="round";for(var l=0;7>l;l++)i.beginPath(),i.arc(o,s,a,1.5*Math.PI+2/7*Math.PI*l,1.5*Math.PI+2/7*Math.PI*(l+1),!1),i.lineTo(o,s),i.stroke(),i.closePath();i.font=""+20*n+"px Arial",i.fillText("Previous",520*n,30*n),i.fillText("Now",520*n,60*n);var u,c,d=.6234898018587335,f=.7818314824680298,h=[7],g=[7],m=[7],v=[7],_=o,b=s-a;h[0]=_,g[0]=b,m[0]=_,v[0]=b;for(var l=0;6>l;l++)u=_-o,c=b-s,_=o+u*d-c*f,b=s+u*f+c*d,h[l+1]=_,g[l+1]=b,m[l+1]=_,v[l+1]=b;for(var l=0;4>l;l++){var x=t.data.listening[l].score,y=100-x;h[(l+7)%7]=(h[(l+7)%7]*x+o*y)/100,g[(l+7)%7]=(g[(l+7)%7]*x+s*y)/100}for(var l=0;3>l;l++){var x=t.data.reading[l].score,y=100-x;h[(l+4)%7]=(h[(l+4)%7]*x+o*y)/100,g[(l+4)%7]=(g[(l+4)%7]*x+s*y)/100}i.font=""+16*n+"px Arial";for(var w=[-20*n,5*n,8*n,-10*n,-30*n,-50*n,-45*n],k=[-7*n,-5*n,10*n,25*n,25*n,10*n,-5*n],l=0;7>l;l++){i.fillText("Part "+(l%7+1),m[l%7]+w[l],v[l%7]+k[l]);var x=t.data.improvement[l],y=100-x;m[l%7]=(m[l%7]*x+o*y)/100,v[l%7]=(v[l%7]*x+s*y)/100}i.shadowColor="#3350D8",i.shadowBlur=1,i.strokeStyle="#3350D8",i.lineWidth=0,i.lineTo(o,s),i.beginPath(),i.translate(.5,.5);for(var l=0;15>l;l++)p(i,m[l%7],v[l%7],m[(l+1)%7],v[(l+1)%7],0==l);i.stroke(),i.closePath(),i.shadowColor="#8e3931",i.shadowBlur=1,i.strokeStyle="#8e3931",i.lineTo(o,s),i.beginPath(),i.stroke();for(var l=0;15>l;l++)p(i,h[l%7],g[l%7],h[(l+1)%7],g[(l+1)%7],0==l);i.stroke(),i.closePath(),i.lineWidth=3,i.shadowColor=null,i.shadowBlur=null;for(var l=0;2>l;l++)i.strokeStyle=["#3350D8","#8e3931"][l],i.beginPath(),i.lineTo(490*n,15*n+30*n*l),i.stroke(),i.lineTo(510*n,15*n+30*n*l),i.stroke(),i.lineTo(510*n,30*n+30*n*l),i.stroke(),i.lineTo(490*n,30*n+30*n*l),i.stroke(),i.lineTo(490*n,15*n+30*n*l),i.stroke(),i.closePath();var T=[10],S=[10],I=[10],D=[10];i.strokeStyle="#000000",i.font=""+10*n+"px Arial";for(var l=0;5>l;l++)T[0+2*l]=o-5*n,S[0+2*l]=s-40*n*(l+1),T[1+2*l]=o+5*n,S[1+2*l]=s-40*n*(l+1),I[l]=o,D[l]=s-40*(l+1),i.fillText(""+20*(l+1),o+8*n+(4==l?-3*n:0),s-40*n*(l+1)+5*n+(4==l?7*n:0));i.lineWidth=n;for(var l=0;7>l;l++){for(var H=0;4>H;H++)i.beginPath(),i.moveTo(T[2*H],S[2*H]),i.lineTo(T[2*H+1],S[2*H+1]),i.stroke(),i.closePath();for(var H=0;10>H;H++)u=T[H]-o,c=S[H]-s,T[H]=o+u*d-c*f,S[H]=s+u*f+c*d}})})}]),app.controller("TestCtrl",["$rootScope","$scope","$sce","$interval","Test","TestSave","TestFetch","TestPart","AnswerSave",function(e,t,n,r,i,o,s,a,l){t.data=[],t.boxes=[],t.sections=0,t.future=null,t.testQueue=[0],t.seconds="",t.minutes="",t.hours="",t.radioValue=[],t.index=1,t.testDescrip="Description <br> ...",t.admin=!1,t.questions=[],t.thisQuestion=["",""],t.setHeight="",t.checkLater=[],t.answers="ABCD",t.finalAnswer="",t.theseNumbs=1,t.clumps=[],t.checks=[],t.linkBox=!1,t.radioCount=null,t.partSelect=1,t.dimeSelect=1,t.pennySelect=0,t.bools=[],t.which_one=1;for(var u=!1,c=0;201>c;c++)t.checks[c]=!1;t.apartide=function(e){return"Part "+e},t.addAnswers=function(e){var n=t.answers.length;(n>2||e>0)&&(10>n||0>e)&&(n+=e,t.answers=2==n?"TX":"ABCDEFGH".substring(0,n))},t.expandView=function(){e.$broadcast("Messenger","expand")},t.moveIndex=function(e){var n=$(e.target);n.attr("id")||(n=n.parent()),t.index=parseInt(n.attr("id").substring(1)),t.theseNumbs=t.index,t.changeIndex(0)},t.checkAfter=function(e){var n=$("#Part1").find('input[type="checkbox"]'),r=n.prop("checked");r&&e&&(t.checkLater[t.index-1]=!0,$("#r"+t.index).css("background-color","rgba(41, 148, 195, 0.26)")),!r&&e&&(t.checkLater[t.index-1]=!1,$("#r"+t.index).css("background-color",""))},t.addQuestion=function(){$("#TestMain").fadeOut(500),t.fetch(),$("#TestEdit").fadeIn(500)},t.updateDescrip=function(){$("#descrip").html($("#descripEdit").html())},t.avatarHTML=function(e){return'<object data="'+e+'" type="image/png"></object>'},t.startTest=function(){for(var e=0;200>=e;e++)t.radioValue[e]=-1;u=!0;for(var n=$('input[type="checkbox"]:checked'),e=0;e<n.length;e++)t.testQueue[e]=$(n.get(e)).attr("id");t.openPart()},t.parse=function(e){return parseInt(e)},t.setAnswer=function(e,n){t.radioValue[e]=n},t.fetch=function(){var e="p"+t.partSelect+"|";e+="q"+(t.dimeSelect+parseInt(t.pennySelect))+"|",s.get({identifier:e},function(e){e.part?($("#textarea2").html(e.html||"(empty)"),t.linkBox=1==e.link,t.answers=e.count,t.radioCount=e.answer,t.bools=e.bools,t.which_one=e.which_one):($("#textarea2").html("(empty)"),t.linkBox=!1,t.answers="ABCD",t.radioCount=null,t.bools=e.bools,t.which_one=1),$("#preview").html($("#textarea2").html())})},r(function(){var e=new Date,n=Math.floor((t.future-e)/1e3),r=n%60;n=Math.floor(n/60);var i=n%60;n=Math.floor(n/60);var o=n%24;if(t.seconds=r+(1==r?" second":" seconds")+" remaining",t.minutes=i>0?i+(1==i?" minute,":" minutes,"):"",t.hours=o>0?o+(1==o?" hour,":" hours,"):"",0>=r&&0>=i&&0>=o&&(t.seconds="Time is up.",u)){var s=$('span[ng-bind="seconds"]');s.css("font-weight","600"),setTimeout(function(){s.css("font-weight",""),t.openPart()
},2e3),u=!1}},1e3),t.getImage=function(e){return e.html},t.openPart=function(){t.pluck=t.testQueue[0];var n=t.testQueue;if(t.testQueue=[],0==n.length)$("#Part1").fadeOut(500),$("#alterHeight").css("height","67em"),e.$broadcast("Dashboard","fadeIn");else{for(var r=1;r<n.length;r++)t.testQueue[r-1]=n[r];$("#TestMain").fadeOut(500),t.index=1==t.pluck?1:2==t.pluck?11:3==t.pluck?41:4==t.pluck?71:5==t.pluck?101:6==t.pluck?141:153,t.theseNumbs=t.index,a.get({part:t.pluck},function(e){var n=e.questions;t.clumps=[],t.clumps[t.index]=0;for(var r=0;r<n.length;r++)t.questions[t.index-1+r]=n[r],t.clumps[t.index+1+r]=1==n[r].link?t.clumps[t.index+r]+1:0;for(var r=0;r<t.questions.length;r++)t.checkLater.push(!1);t.thisQuestion[t.index%2]=t.questions[t.index-1].html,t.setHeight=t.questions[t.index-1].html,t.answers=t.questions[t.index-1].count,t.theseNumbs+=t.questions[t.index-1].range-1}),$("#Part1").fadeIn(500),$("#gameBox"+(t.index+1)%2).css("z-index","0"),$("#gameBox"+t.index%2).css("z-index","25"),$("#gameBox"+(t.index+1)%2).fadeOut(500),$("#gameBox"+t.index%2).fadeIn(500),$("#alterHeight").css("height","80em"),t.checkAfter(!1),t.future=new Date((new Date).getTime()+6e5+1e3)}},t.changeIndex=function(e){t.index+=e,t.theseNumbs=t.index,t.questions[t.index-1]?(t.answers=t.questions[t.index-1].count,t.theseNumbs+=t.questions[t.index-1].range-1,t.questions[t.index-2]&&0!=t.questions[t.index-2].link?1!=e&&(t.thisQuestion[t.index%2]=t.questions[t.index-2].html,t.setHeight=t.questions[t.index-2].html,$("#gameBox"+(t.index+1)%2).css("z-index","0"),$("#gameBox"+t.index%2).css("z-index","25"),$("#gameBox"+(t.index+1)%2).fadeOut(500),$("#gameBox"+t.index%2).fadeIn(500,function(){})):(t.thisQuestion[t.index%2]=t.questions[t.index-1].html,t.setHeight=t.questions[t.index-1].html,$("#gameBox"+(t.index+1)%2).css("z-index","0"),$("#gameBox"+t.index%2).css("z-index","25"),$("#gameBox"+(t.index+1)%2).fadeOut(500),$("#gameBox"+t.index%2).fadeIn(500,function(){})),t.checkAfter(!1)):t.openPart()},t.hello=function(){alert("hello")},t.trustAsHtml=function(e){return n.trustAsHtml(e)},t.chooseSection=function(){switch(parseInt($(".circles:checked").val())){case 0:for(var e=1;5>e;e++)$("#"+e).prop("checked",!0);for(var e=5;8>e;e++)$("#"+e).prop("checked",!1);break;case 1:for(var e=1;5>e;e++)$("#"+e).prop("checked",!1);for(var e=5;8>e;e++)$("#"+e).prop("checked",!0);break;case 2:for(var e=0;8>e;e++)$("#"+e).prop("checked",!0)}},t.saveTest=function(e){o.get({identifier:e,html:$(e).html()})},t.saveAnswers=function(e,n){if(e.length>0){var r=$(e.get(0)).children(),i="("!=r.get(0).innerHTML.charAt(0),s={};s[0]=i,s[1]=t.partSelect,s[2]=r.length,s[3]=t.dimeSelect+parseInt(t.pennySelect)+n;for(var a=0;a<r.length;a++)s[a+4]=r.get(a).innerHTML;l.get(s,function(){n++,t.saveAnswers(e.not(e.get(0)),n)})}else{for(var u=$("#textarea2"),c=u.find(".multiple"),a=0;a<c.length;a++)c.get(a).innerHTML="[["+a+"]]";var d="p"+t.partSelect+"|";d+="q"+(t.dimeSelect+parseInt(t.pennySelect))+"|",d+="c"+$(".radioCount").length+"|",d+="l"+(t.linkBox?1:0)+"|",d+="a"+$("#TestEdit").find('input[name="radio"]:checked').attr("id")||9;var p=u.html();o.get({identifier:d,html:p,kids:n},function(){t.fetch()})}},t.editQuestion=function(){var e=$("#textarea2");if(1==t.which_one)t.saveAnswers(e.find(".multiple"),0);else{var n="p"+t.partSelect+"|";n+="q"+(t.dimeSelect+parseInt(t.pennySelect))+"|",n+="c"+$(".radioCount").length+"|",n+="l"+(t.linkBox?1:0)+"|",n+="a"+$("#TestEdit").find('input[name="radio"]:checked').attr("id")||9;var r=e.html();o.get({identifier:n,html:r},function(){t.fetch()})}},t.testIndex=function(){i.get({get:"index"},function(e){t.descrip=e.descrip,t.admin=e.admin,$("#alterHeight").css("height","80em"),$("#descrip").html(e.descrip),$("#descripEdit").html(e.descrip);for(var n=1;5>n;n++)$("#"+n).attr("checked",!0);for(var n=1;8>n;n++)$("#"+n).attr("checked",!1);$("#circle1").attr("checked",!0),$("#TestEdit").fadeOut(500),$("#TestMain").fadeIn(500)})},t.setLink=function(e){t.styleBox(2,e,!1),t.styleBox(4,e,!1),t.styleBox(5,e,!1)},t.styleBox=function(e,n,r){var i=!0,o=[],s=$(n.target).next().val(),a=$(n.target).prev().val(),l=["font-weight","font-style","text-decoration","font-size","color","cursor","","letters"],u=["600","italic","underline",s+"px","blue","pointer","","ABCD"],c=window.getSelection().getRangeAt(0),d=c.startContainer;if($.contains($("#textarea2").get(0),d)){d.parentNode.id.length<1&&(d=d.parentNode),d.parentNode.id.length<1&&(d=d.parentNode),d.parentNode.id.length<1&&(d=d.parentNode);for(var p=d.parentNode.childNodes,f="",h=0;p[h]!=d;)f+=p[h].outerHTML||"<span>"+$(p[h]).text()+"</span>",h++;var g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(0,c.startOffset);g.html(m),f+=g.get(0).outerHTML,h++;for(var v=c.startOffset,_=$(d).text().length-v,b=c.toString().length;b>_;){if(g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v,v+_),g.html(m),r)i=!1,g.css(l[e],""),5==e&&(g.removeAttr("onclick"),g.css("color",""),g.css("cursor",""));else if(g.css(l[e])!=u[e]&&(i=!1),6==e)g=$('<div style="text-align: center">'+g.get(0).outerHTML+"</div>");else if(7==e){var x='<div class="multiple" style="vertical-align: top; display: inline-block; margin-bottom: 31px;">';x+="<div>_</div></div>&nbsp;",g=$(x)}else g.css(l[e],u[e]),4==e&&g.attr("onclick","window.location.href='"+a+"'");f+=g.get(0).outerHTML,b-=_,d=d.nextSibling,_=$(d).text().length,v=0,o.push(h),h++}if(_==b){if(g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v),g.html(m),r)i=!1,g.css(l[e],""),5==e&&(g.removeAttr("onclick"),g.css("color",""),g.css("cursor",""));else if(g.css(l[e])!=u[e]&&(i=!1),6==e)g=$('<div style="text-align: center">'+g.get(0).outerHTML+"</div>");else if(7==e){var x='<div class="multiple" style="vertical-align: top; display: inline-block; margin-bottom: 31px;">';x+="<div>_</div></div>&nbsp;",g=$(x)}else g.css(l[e],u[e]),4==e&&g.attr("onclick","window.location.href='"+a+"'");f+=g.get(0).outerHTML,o.push(h),h++}if(_>b){if(g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v,v+b),g.html(m),r)i=!1,g.css(l[e],""),5==e&&(g.removeAttr("onclick"),g.css("color",""),g.css("cursor",""));else if(g.css(l[e])!=u[e]&&(i=!1),6==e)g=$('<div style="text-align: center">'+g.get(0).outerHTML+"</div>");else if(7==e){var x='<div class="multiple" style="vertical-align: top; display: inline-block; margin-bottom: 31px;">';x+="<div>_</div></div>&nbsp;",g=$(x)}else g.css(l[e],u[e]),4==e&&g.attr("onclick","window.location.href='"+a+"'");f+=g.get(0).outerHTML,o.push(h),h++,g=$(d.outerHTML||"<span>"+$(d).text()+"</span>"),m=g.text().substring(v+b),g.html(m),f+=g.get(0).outerHTML}for(;d.nextSibling;)d=d.nextSibling,f+=d.outerHTML||"<span>"+$(d).text()+"</span>";if(i)t.styleBox(e,n,!0);else{var y=$("#textarea2");y.html(f),$("#preview").html(f);var w=y.children();$(w.get(w.length-1)).text().length>0&&(y.append("<span>&nbsp;</span>"),w=y.children());var k=window.getSelection(),T=document.createRange();T.setStart(w.get(o[0]),0);var S=w.get(o[o.length-1]+1);T.setEnd(S,0),k.removeAllRanges(),k.addRange(T)}}},t.$on("Test",function(){t.testIndex()}),angular.element(document).ready(function(){})}]);