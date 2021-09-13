(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = typeof require !== "undefined" ? require : (x) => {
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/cookie/index.js
  var require_cookie = __commonJS({
    "node_modules/cookie/index.js"(exports) {
      "use strict";
      exports.parse = parse;
      exports.serialize = serialize;
      var decode = decodeURIComponent;
      var encode = encodeURIComponent;
      var pairSplitRegExp = /; */;
      var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function parse(str, options2) {
        if (typeof str !== "string") {
          throw new TypeError("argument str must be a string");
        }
        var obj = {};
        var opt = options2 || {};
        var pairs = str.split(pairSplitRegExp);
        var dec = opt.decode || decode;
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          var eq_idx = pair.indexOf("=");
          if (eq_idx < 0) {
            continue;
          }
          var key = pair.substr(0, eq_idx).trim();
          var val = pair.substr(++eq_idx, pair.length).trim();
          if (val[0] == '"') {
            val = val.slice(1, -1);
          }
          if (obj[key] == void 0) {
            obj[key] = tryDecode(val, dec);
          }
        }
        return obj;
      }
      function serialize(name, val, options2) {
        var opt = options2 || {};
        var enc = opt.encode || encode;
        if (typeof enc !== "function") {
          throw new TypeError("option encode is invalid");
        }
        if (!fieldContentRegExp.test(name)) {
          throw new TypeError("argument name is invalid");
        }
        var value = enc(val);
        if (value && !fieldContentRegExp.test(value)) {
          throw new TypeError("argument val is invalid");
        }
        var str = name + "=" + value;
        if (opt.maxAge != null) {
          var maxAge = opt.maxAge - 0;
          if (isNaN(maxAge) || !isFinite(maxAge)) {
            throw new TypeError("option maxAge is invalid");
          }
          str += "; Max-Age=" + Math.floor(maxAge);
        }
        if (opt.domain) {
          if (!fieldContentRegExp.test(opt.domain)) {
            throw new TypeError("option domain is invalid");
          }
          str += "; Domain=" + opt.domain;
        }
        if (opt.path) {
          if (!fieldContentRegExp.test(opt.path)) {
            throw new TypeError("option path is invalid");
          }
          str += "; Path=" + opt.path;
        }
        if (opt.expires) {
          if (typeof opt.expires.toUTCString !== "function") {
            throw new TypeError("option expires is invalid");
          }
          str += "; Expires=" + opt.expires.toUTCString();
        }
        if (opt.httpOnly) {
          str += "; HttpOnly";
        }
        if (opt.secure) {
          str += "; Secure";
        }
        if (opt.sameSite) {
          var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
          switch (sameSite) {
            case true:
              str += "; SameSite=Strict";
              break;
            case "lax":
              str += "; SameSite=Lax";
              break;
            case "strict":
              str += "; SameSite=Strict";
              break;
            case "none":
              str += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
        }
        return str;
      }
      function tryDecode(str, decode2) {
        try {
          return decode2(str);
        } catch (e) {
          return str;
        }
      }
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/Mime.js
  var require_Mime = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/Mime.js"(exports, module) {
      "use strict";
      function Mime() {
        this._types = Object.create(null);
        this._extensions = Object.create(null);
        for (let i = 0; i < arguments.length; i++) {
          this.define(arguments[i]);
        }
        this.define = this.define.bind(this);
        this.getType = this.getType.bind(this);
        this.getExtension = this.getExtension.bind(this);
      }
      Mime.prototype.define = function(typeMap, force) {
        for (let type in typeMap) {
          let extensions = typeMap[type].map(function(t) {
            return t.toLowerCase();
          });
          type = type.toLowerCase();
          for (let i = 0; i < extensions.length; i++) {
            const ext = extensions[i];
            if (ext[0] === "*") {
              continue;
            }
            if (!force && ext in this._types) {
              throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
            }
            this._types[ext] = type;
          }
          if (force || !this._extensions[type]) {
            const ext = extensions[0];
            this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
          }
        }
      };
      Mime.prototype.getType = function(path2) {
        path2 = String(path2);
        let last = path2.replace(/^.*[/\\]/, "").toLowerCase();
        let ext = last.replace(/^.*\./, "").toLowerCase();
        let hasPath = last.length < path2.length;
        let hasDot = ext.length < last.length - 1;
        return (hasDot || !hasPath) && this._types[ext] || null;
      };
      Mime.prototype.getExtension = function(type) {
        type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
        return type && this._extensions[type.toLowerCase()] || null;
      };
      module.exports = Mime;
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/types/standard.js
  var require_standard = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/types/standard.js"(exports, module) {
      module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["ecma", "es"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/mrb-consumer+xml": ["*xdf"], "application/mrb-publish+xml": ["*xdf"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["*xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-error+xml": ["xer"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/types/other.js
  var require_other = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/types/other.js"(exports, module) {
      module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/mime/index.js
  var require_mime = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/mime/index.js"(exports, module) {
      "use strict";
      var Mime = require_Mime();
      module.exports = new Mime(require_standard(), require_other());
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/types.js
  var require_types = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/types.js"(exports) {
      "use strict";
      var __extends = exports && exports.__extends || function() {
        var extendStatics = function(d2, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
            d3.__proto__ = b2;
          } || function(d3, b2) {
            for (var p in b2)
              if (b2.hasOwnProperty(p))
                d3[p] = b2[p];
          };
          return extendStatics(d2, b);
        };
        return function(d2, b) {
          extendStatics(d2, b);
          function __() {
            this.constructor = d2;
          }
          d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
      }();
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;
      var KVError = function(_super) {
        __extends(KVError2, _super);
        function KVError2(message, status) {
          var _newTarget = this.constructor;
          if (status === void 0) {
            status = 500;
          }
          var _this = _super.call(this, message) || this;
          Object.setPrototypeOf(_this, _newTarget.prototype);
          _this.name = KVError2.name;
          _this.status = status;
          return _this;
        }
        return KVError2;
      }(Error);
      exports.KVError = KVError;
      var MethodNotAllowedError = function(_super) {
        __extends(MethodNotAllowedError2, _super);
        function MethodNotAllowedError2(message, status) {
          if (message === void 0) {
            message = "Not a valid request method";
          }
          if (status === void 0) {
            status = 405;
          }
          return _super.call(this, message, status) || this;
        }
        return MethodNotAllowedError2;
      }(KVError);
      exports.MethodNotAllowedError = MethodNotAllowedError;
      var NotFoundError2 = function(_super) {
        __extends(NotFoundError3, _super);
        function NotFoundError3(message, status) {
          if (message === void 0) {
            message = "Not Found";
          }
          if (status === void 0) {
            status = 404;
          }
          return _super.call(this, message, status) || this;
        }
        return NotFoundError3;
      }(KVError);
      exports.NotFoundError = NotFoundError2;
      var InternalError = function(_super) {
        __extends(InternalError2, _super);
        function InternalError2(message, status) {
          if (message === void 0) {
            message = "Internal Error in KV Asset Handler";
          }
          if (status === void 0) {
            status = 500;
          }
          return _super.call(this, message, status) || this;
        }
        return InternalError2;
      }(KVError);
      exports.InternalError = InternalError;
    }
  });

  // .svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/index.js
  var require_dist = __commonJS({
    ".svelte-kit/cloudflare-workers/node_modules/@cloudflare/kv-asset-handler/dist/index.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve2) {
            resolve2(value);
          });
        }
        return new (P || (P = Promise))(function(resolve2, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;
      var mime = require_mime();
      var types_1 = require_types();
      Object.defineProperty(exports, "MethodNotAllowedError", { enumerable: true, get: function() {
        return types_1.MethodNotAllowedError;
      } });
      Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
        return types_1.NotFoundError;
      } });
      Object.defineProperty(exports, "InternalError", { enumerable: true, get: function() {
        return types_1.InternalError;
      } });
      var mapRequestToAsset = function(request) {
        var parsedUrl = new URL(request.url);
        var pathname = parsedUrl.pathname;
        if (pathname.endsWith("/")) {
          pathname = pathname.concat("index.html");
        } else if (!mime.getType(pathname)) {
          pathname = pathname.concat("/index.html");
        }
        parsedUrl.pathname = pathname;
        return new Request(parsedUrl.toString(), request);
      };
      exports.mapRequestToAsset = mapRequestToAsset;
      function serveSinglePageApp(request) {
        request = mapRequestToAsset(request);
        var parsedUrl = new URL(request.url);
        if (parsedUrl.pathname.endsWith(".html")) {
          return new Request(parsedUrl.origin + "/index.html", request);
        } else {
          return request;
        }
      }
      exports.serveSinglePageApp = serveSinglePageApp;
      var defaultCacheControl = {
        browserTTL: null,
        edgeTTL: 2 * 60 * 60 * 24,
        bypassCache: false
      };
      var getAssetFromKV2 = function(event2, options2) {
        return __awaiter(void 0, void 0, void 0, function() {
          var request, ASSET_NAMESPACE, ASSET_MANIFEST, SUPPORTED_METHODS, rawPathKey, pathIsEncoded, requestKey, parsedUrl, pathname, pathKey, cache, mimeType, shouldEdgeCache, cacheKey, evalCacheOpts, shouldSetBrowserCache, response, headers, shouldRevalidate, body;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                options2 = Object.assign({
                  ASSET_NAMESPACE: __STATIC_CONTENT,
                  ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
                  mapRequestToAsset,
                  cacheControl: defaultCacheControl,
                  defaultMimeType: "text/plain"
                }, options2);
                request = event2.request;
                ASSET_NAMESPACE = options2.ASSET_NAMESPACE;
                ASSET_MANIFEST = typeof options2.ASSET_MANIFEST === "string" ? JSON.parse(options2.ASSET_MANIFEST) : options2.ASSET_MANIFEST;
                if (typeof ASSET_NAMESPACE === "undefined") {
                  throw new types_1.InternalError("there is no KV namespace bound to the script");
                }
                SUPPORTED_METHODS = ["GET", "HEAD"];
                if (!SUPPORTED_METHODS.includes(request.method)) {
                  throw new types_1.MethodNotAllowedError(request.method + " is not a valid request method");
                }
                rawPathKey = new URL(request.url).pathname.replace(/^\/+/, "");
                pathIsEncoded = false;
                if (ASSET_MANIFEST[rawPathKey]) {
                  requestKey = request;
                } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
                  pathIsEncoded = true;
                  requestKey = request;
                } else {
                  requestKey = options2.mapRequestToAsset(request);
                }
                parsedUrl = new URL(requestKey.url);
                pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname;
                pathKey = pathname.replace(/^\/+/, "");
                cache = caches.default;
                mimeType = mime.getType(pathKey) || options2.defaultMimeType;
                if (mimeType.startsWith("text")) {
                  mimeType += "; charset=utf-8";
                }
                shouldEdgeCache = false;
                if (typeof ASSET_MANIFEST !== "undefined") {
                  if (ASSET_MANIFEST[pathKey]) {
                    pathKey = ASSET_MANIFEST[pathKey];
                    shouldEdgeCache = true;
                  }
                }
                cacheKey = new Request(parsedUrl.origin + "/" + pathKey, request);
                evalCacheOpts = function() {
                  switch (typeof options2.cacheControl) {
                    case "function":
                      return options2.cacheControl(request);
                    case "object":
                      return options2.cacheControl;
                    default:
                      return defaultCacheControl;
                  }
                }();
                options2.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts);
                if (options2.cacheControl.bypassCache || options2.cacheControl.edgeTTL === null || request.method == "HEAD") {
                  shouldEdgeCache = false;
                }
                shouldSetBrowserCache = typeof options2.cacheControl.browserTTL === "number";
                response = null;
                if (!shouldEdgeCache)
                  return [3, 2];
                return [4, cache.match(cacheKey)];
              case 1:
                response = _a.sent();
                _a.label = 2;
              case 2:
                if (!response)
                  return [3, 3];
                headers = new Headers(response.headers);
                shouldRevalidate = false;
                shouldRevalidate = [
                  request.headers.has("range") !== true,
                  request.headers.has("if-none-match"),
                  response.headers.has("etag"),
                  request.headers.get("if-none-match") === "" + pathKey
                ].every(Boolean);
                if (shouldRevalidate) {
                  if (response.body && "cancel" in Object.getPrototypeOf(response.body)) {
                    response.body.cancel();
                    console.log("Body exists and environment supports readable streams. Body cancelled");
                  } else {
                    console.log("Environment doesnt support readable streams");
                  }
                  headers.set("cf-cache-status", "REVALIDATED");
                  response = new Response(null, {
                    status: 304,
                    headers,
                    statusText: "Not Modified"
                  });
                } else {
                  headers.set("CF-Cache-Status", "HIT");
                  response = new Response(response.body, { headers });
                }
                return [3, 5];
              case 3:
                return [4, ASSET_NAMESPACE.get(pathKey, "arrayBuffer")];
              case 4:
                body = _a.sent();
                if (body === null) {
                  throw new types_1.NotFoundError("could not find " + pathKey + " in your content namespace");
                }
                response = new Response(body);
                if (shouldEdgeCache) {
                  response.headers.set("Accept-Ranges", "bytes");
                  response.headers.set("Content-Length", body.length);
                  if (!response.headers.has("etag")) {
                    response.headers.set("etag", "" + pathKey);
                  }
                  response.headers.set("Cache-Control", "max-age=" + options2.cacheControl.edgeTTL);
                  event2.waitUntil(cache.put(cacheKey, response.clone()));
                  response.headers.set("CF-Cache-Status", "MISS");
                }
                _a.label = 5;
              case 5:
                response.headers.set("Content-Type", mimeType);
                if (shouldSetBrowserCache) {
                  response.headers.set("Cache-Control", "max-age=" + options2.cacheControl.browserTTL);
                } else {
                  response.headers.delete("Cache-Control");
                }
                return [2, response];
            }
          });
        });
      };
      exports.getAssetFromKV = getAssetFromKV2;
    }
  });

  // .svelte-kit/output/server/app.js
  var import_cookie = __toModule(require_cookie());

  // node_modules/@lukeed/uuid/dist/index.mjs
  var IDX = 256;
  var HEX = [];
  var BUFFER;
  while (IDX--)
    HEX[IDX] = (IDX + 256).toString(16).substring(1);
  function v4() {
    var i = 0, num, out = "";
    if (!BUFFER || IDX + 16 > 256) {
      BUFFER = Array(i = 256);
      while (i--)
        BUFFER[i] = 256 * Math.random() | 0;
      i = IDX = 0;
    }
    for (; i < 16; i++) {
      num = BUFFER[IDX + i];
      if (i == 6)
        out += HEX[num & 15 | 64];
      else if (i == 8)
        out += HEX[num & 63 | 128];
      else
        out += HEX[num];
      if (i & 1 && i > 1 && i < 11)
        out += "-";
    }
    IDX++;
    return out;
  }

  // node_modules/xstate/es/_virtual/_tslib.js
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s2, i = 1, n = arguments.length; i < n; i++) {
        s2 = arguments[i];
        for (var p in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p))
            t[p] = s2[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s2, e) {
    var t = {};
    for (var p in s2)
      if (Object.prototype.hasOwnProperty.call(s2, p) && e.indexOf(p) < 0)
        t[p] = s2[p];
    if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s2); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i]))
          t[p[i]] = s2[p[i]];
      }
    return t;
  }
  function __values(o) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o[s2], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error4) {
      e = { error: error4 };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  }

  // node_modules/xstate/es/constants.js
  var STATE_DELIMITER = ".";
  var EMPTY_ACTIVITY_MAP = {};
  var DEFAULT_GUARD_TYPE = "xstate.guard";
  var TARGETLESS_KEY = "";

  // node_modules/xstate/es/environment.js
  var IS_PRODUCTION = false;

  // node_modules/xstate/es/utils.js
  function keys(value) {
    return Object.keys(value);
  }
  function matchesState(parentStateId, childStateId, delimiter) {
    if (delimiter === void 0) {
      delimiter = STATE_DELIMITER;
    }
    var parentStateValue = toStateValue(parentStateId, delimiter);
    var childStateValue = toStateValue(childStateId, delimiter);
    if (isString(childStateValue)) {
      if (isString(parentStateValue)) {
        return childStateValue === parentStateValue;
      }
      return false;
    }
    if (isString(parentStateValue)) {
      return parentStateValue in childStateValue;
    }
    return keys(parentStateValue).every(function(key) {
      if (!(key in childStateValue)) {
        return false;
      }
      return matchesState(parentStateValue[key], childStateValue[key]);
    });
  }
  function getEventType(event2) {
    try {
      return isString(event2) || typeof event2 === "number" ? "" + event2 : event2.type;
    } catch (e) {
      throw new Error("Events must be strings or objects with a string event.type property.");
    }
  }
  function toStatePath(stateId, delimiter) {
    try {
      if (isArray(stateId)) {
        return stateId;
      }
      return stateId.toString().split(delimiter);
    } catch (e) {
      throw new Error("'" + stateId + "' is not a valid state path.");
    }
  }
  function isStateLike(state) {
    return typeof state === "object" && "value" in state && "context" in state && "event" in state && "_event" in state;
  }
  function toStateValue(stateValue, delimiter) {
    if (isStateLike(stateValue)) {
      return stateValue.value;
    }
    if (isArray(stateValue)) {
      return pathToStateValue(stateValue);
    }
    if (typeof stateValue !== "string") {
      return stateValue;
    }
    var statePath = toStatePath(stateValue, delimiter);
    return pathToStateValue(statePath);
  }
  function pathToStateValue(statePath) {
    if (statePath.length === 1) {
      return statePath[0];
    }
    var value = {};
    var marker = value;
    for (var i = 0; i < statePath.length - 1; i++) {
      if (i === statePath.length - 2) {
        marker[statePath[i]] = statePath[i + 1];
      } else {
        marker[statePath[i]] = {};
        marker = marker[statePath[i]];
      }
    }
    return value;
  }
  function mapValues(collection, iteratee) {
    var result = {};
    var collectionKeys = keys(collection);
    for (var i = 0; i < collectionKeys.length; i++) {
      var key = collectionKeys[i];
      result[key] = iteratee(collection[key], key, collection, i);
    }
    return result;
  }
  function mapFilterValues(collection, iteratee, predicate) {
    var e_1, _a;
    var result = {};
    try {
      for (var _b = __values(keys(collection)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        var item = collection[key];
        if (!predicate(item)) {
          continue;
        }
        result[key] = iteratee(item, key, collection);
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return result;
  }
  var path = function(props) {
    return function(object) {
      var e_2, _a;
      var result = object;
      try {
        for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
          var prop = props_1_1.value;
          result = result[prop];
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (props_1_1 && !props_1_1.done && (_a = props_1.return))
            _a.call(props_1);
        } finally {
          if (e_2)
            throw e_2.error;
        }
      }
      return result;
    };
  };
  function nestedPath(props, accessorProp) {
    return function(object) {
      var e_3, _a;
      var result = object;
      try {
        for (var props_2 = __values(props), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
          var prop = props_2_1.value;
          result = result[accessorProp][prop];
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (props_2_1 && !props_2_1.done && (_a = props_2.return))
            _a.call(props_2);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      return result;
    };
  }
  function toStatePaths(stateValue) {
    if (!stateValue) {
      return [[]];
    }
    if (isString(stateValue)) {
      return [[stateValue]];
    }
    var result = flatten(keys(stateValue).map(function(key) {
      var subStateValue = stateValue[key];
      if (typeof subStateValue !== "string" && (!subStateValue || !Object.keys(subStateValue).length)) {
        return [[key]];
      }
      return toStatePaths(stateValue[key]).map(function(subPath) {
        return [key].concat(subPath);
      });
    }));
    return result;
  }
  function flatten(array) {
    var _a;
    return (_a = []).concat.apply(_a, __spreadArray([], __read(array)));
  }
  function toArrayStrict(value) {
    if (isArray(value)) {
      return value;
    }
    return [value];
  }
  function toArray(value) {
    if (value === void 0) {
      return [];
    }
    return toArrayStrict(value);
  }
  function mapContext(mapper, context, _event) {
    var e_5, _a;
    if (isFunction(mapper)) {
      return mapper(context, _event.data);
    }
    var result = {};
    try {
      for (var _b = __values(Object.keys(mapper)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        var subMapper = mapper[key];
        if (isFunction(subMapper)) {
          result[key] = subMapper(context, _event.data);
        } else {
          result[key] = subMapper;
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return))
          _a.call(_b);
      } finally {
        if (e_5)
          throw e_5.error;
      }
    }
    return result;
  }
  function isBuiltInEvent(eventType) {
    return /^(done|error)\./.test(eventType);
  }
  function isPromiseLike(value) {
    if (value instanceof Promise) {
      return true;
    }
    if (value !== null && (isFunction(value) || typeof value === "object") && isFunction(value.then)) {
      return true;
    }
    return false;
  }
  function isBehavior(value) {
    return value !== null && typeof value === "object" && "transition" in value && typeof value.transition === "function";
  }
  function partition(items, predicate) {
    var e_6, _a;
    var _b = __read([[], []], 2), truthy = _b[0], falsy = _b[1];
    try {
      for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
        var item = items_1_1.value;
        if (predicate(item)) {
          truthy.push(item);
        } else {
          falsy.push(item);
        }
      }
    } catch (e_6_1) {
      e_6 = {
        error: e_6_1
      };
    } finally {
      try {
        if (items_1_1 && !items_1_1.done && (_a = items_1.return))
          _a.call(items_1);
      } finally {
        if (e_6)
          throw e_6.error;
      }
    }
    return [truthy, falsy];
  }
  function updateHistoryStates(hist, stateValue) {
    return mapValues(hist.states, function(subHist, key) {
      if (!subHist) {
        return void 0;
      }
      var subStateValue = (isString(stateValue) ? void 0 : stateValue[key]) || (subHist ? subHist.current : void 0);
      if (!subStateValue) {
        return void 0;
      }
      return {
        current: subStateValue,
        states: updateHistoryStates(subHist, subStateValue)
      };
    });
  }
  function updateHistoryValue(hist, stateValue) {
    return {
      current: stateValue,
      states: updateHistoryStates(hist, stateValue)
    };
  }
  function updateContext(context, _event, assignActions, state) {
    if (!IS_PRODUCTION) {
      warn(!!context, "Attempting to update undefined context");
    }
    var updatedContext = context ? assignActions.reduce(function(acc, assignAction) {
      var e_7, _a;
      var assignment = assignAction.assignment;
      var meta = {
        state,
        action: assignAction,
        _event
      };
      var partialUpdate = {};
      if (isFunction(assignment)) {
        partialUpdate = assignment(acc, _event.data, meta);
      } else {
        try {
          for (var _b = __values(keys(assignment)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var propAssignment = assignment[key];
            partialUpdate[key] = isFunction(propAssignment) ? propAssignment(acc, _event.data, meta) : propAssignment;
          }
        } catch (e_7_1) {
          e_7 = {
            error: e_7_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_7)
              throw e_7.error;
          }
        }
      }
      return Object.assign({}, acc, partialUpdate);
    }, context) : context;
    return updatedContext;
  }
  var warn = function() {
  };
  if (!IS_PRODUCTION) {
    warn = function(condition, message) {
      var error4 = condition instanceof Error ? condition : void 0;
      if (!error4 && condition) {
        return;
      }
      if (console !== void 0) {
        var args = ["Warning: " + message];
        if (error4) {
          args.push(error4);
        }
        console.warn.apply(console, args);
      }
    };
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isString(value) {
    return typeof value === "string";
  }
  function toGuard(condition, guardMap) {
    if (!condition) {
      return void 0;
    }
    if (isString(condition)) {
      return {
        type: DEFAULT_GUARD_TYPE,
        name: condition,
        predicate: guardMap ? guardMap[condition] : void 0
      };
    }
    if (isFunction(condition)) {
      return {
        type: DEFAULT_GUARD_TYPE,
        name: condition.name,
        predicate: condition
      };
    }
    return condition;
  }
  function isObservable(value) {
    try {
      return "subscribe" in value && isFunction(value.subscribe);
    } catch (e) {
      return false;
    }
  }
  var symbolObservable = /* @__PURE__ */ function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  function isMachine(value) {
    try {
      return "__xstatenode" in value;
    } catch (e) {
      return false;
    }
  }
  function isActor(value) {
    return !!value && typeof value.send === "function";
  }
  function toEventObject(event2, payload) {
    if (isString(event2) || typeof event2 === "number") {
      return __assign({
        type: event2
      }, payload);
    }
    return event2;
  }
  function toSCXMLEvent(event2, scxmlEvent) {
    if (!isString(event2) && "$$type" in event2 && event2.$$type === "scxml") {
      return event2;
    }
    var eventObject = toEventObject(event2);
    return __assign({
      name: eventObject.type,
      data: eventObject,
      $$type: "scxml",
      type: "external"
    }, scxmlEvent);
  }
  function toTransitionConfigArray(event2, configLike) {
    var transitions = toArrayStrict(configLike).map(function(transitionLike) {
      if (typeof transitionLike === "undefined" || typeof transitionLike === "string" || isMachine(transitionLike)) {
        return {
          target: transitionLike,
          event: event2
        };
      }
      return __assign(__assign({}, transitionLike), {
        event: event2
      });
    });
    return transitions;
  }
  function normalizeTarget(target) {
    if (target === void 0 || target === TARGETLESS_KEY) {
      return void 0;
    }
    return toArray(target);
  }
  function reportUnhandledExceptionOnInvocation(originalError, currentError, id) {
    if (!IS_PRODUCTION) {
      var originalStackTrace = originalError.stack ? " Stacktrace was '" + originalError.stack + "'" : "";
      if (originalError === currentError) {
        console.error("Missing onError handler for invocation '" + id + "', error was '" + originalError + "'." + originalStackTrace);
      } else {
        var stackTrace = currentError.stack ? " Stacktrace was '" + currentError.stack + "'" : "";
        console.error("Missing onError handler and/or unhandled exception/promise rejection for invocation '" + id + "'. " + ("Original error: '" + originalError + "'. " + originalStackTrace + " Current error is '" + currentError + "'." + stackTrace));
      }
    }
  }
  function evaluateGuard(machine, guard, context, _event, state) {
    var guards = machine.options.guards;
    var guardMeta = {
      state,
      cond: guard,
      _event
    };
    if (guard.type === DEFAULT_GUARD_TYPE) {
      return ((guards === null || guards === void 0 ? void 0 : guards[guard.name]) || guard.predicate)(context, _event.data, guardMeta);
    }
    var condFn = guards[guard.type];
    if (!condFn) {
      throw new Error("Guard '" + guard.type + "' is not implemented on machine '" + machine.id + "'.");
    }
    return condFn(context, _event.data, guardMeta);
  }
  function toInvokeSource(src) {
    if (typeof src === "string") {
      return {
        type: src
      };
    }
    return src;
  }
  function toObserver(nextHandler, errorHandler, completionHandler) {
    if (typeof nextHandler === "object") {
      return nextHandler;
    }
    var noop2 = function() {
      return void 0;
    };
    return {
      next: nextHandler,
      error: errorHandler || noop2,
      complete: completionHandler || noop2
    };
  }

  // node_modules/xstate/es/types.js
  var ActionTypes;
  (function(ActionTypes2) {
    ActionTypes2["Start"] = "xstate.start";
    ActionTypes2["Stop"] = "xstate.stop";
    ActionTypes2["Raise"] = "xstate.raise";
    ActionTypes2["Send"] = "xstate.send";
    ActionTypes2["Cancel"] = "xstate.cancel";
    ActionTypes2["NullEvent"] = "";
    ActionTypes2["Assign"] = "xstate.assign";
    ActionTypes2["After"] = "xstate.after";
    ActionTypes2["DoneState"] = "done.state";
    ActionTypes2["DoneInvoke"] = "done.invoke";
    ActionTypes2["Log"] = "xstate.log";
    ActionTypes2["Init"] = "xstate.init";
    ActionTypes2["Invoke"] = "xstate.invoke";
    ActionTypes2["ErrorExecution"] = "error.execution";
    ActionTypes2["ErrorCommunication"] = "error.communication";
    ActionTypes2["ErrorPlatform"] = "error.platform";
    ActionTypes2["ErrorCustom"] = "xstate.error";
    ActionTypes2["Update"] = "xstate.update";
    ActionTypes2["Pure"] = "xstate.pure";
    ActionTypes2["Choose"] = "xstate.choose";
  })(ActionTypes || (ActionTypes = {}));
  var SpecialTargets;
  (function(SpecialTargets2) {
    SpecialTargets2["Parent"] = "#_parent";
    SpecialTargets2["Internal"] = "#_internal";
  })(SpecialTargets || (SpecialTargets = {}));

  // node_modules/xstate/es/actionTypes.js
  var start = ActionTypes.Start;
  var stop = ActionTypes.Stop;
  var raise = ActionTypes.Raise;
  var send = ActionTypes.Send;
  var cancel = ActionTypes.Cancel;
  var nullEvent = ActionTypes.NullEvent;
  var assign = ActionTypes.Assign;
  var after = ActionTypes.After;
  var doneState = ActionTypes.DoneState;
  var log = ActionTypes.Log;
  var init = ActionTypes.Init;
  var invoke = ActionTypes.Invoke;
  var errorExecution = ActionTypes.ErrorExecution;
  var errorPlatform = ActionTypes.ErrorPlatform;
  var error = ActionTypes.ErrorCustom;
  var update = ActionTypes.Update;
  var choose = ActionTypes.Choose;
  var pure = ActionTypes.Pure;

  // node_modules/xstate/es/actions.js
  var initEvent = /* @__PURE__ */ toSCXMLEvent({
    type: init
  });
  function getActionFunction(actionType, actionFunctionMap) {
    return actionFunctionMap ? actionFunctionMap[actionType] || void 0 : void 0;
  }
  function toActionObject(action, actionFunctionMap) {
    var actionObject;
    if (isString(action) || typeof action === "number") {
      var exec = getActionFunction(action, actionFunctionMap);
      if (isFunction(exec)) {
        actionObject = {
          type: action,
          exec
        };
      } else if (exec) {
        actionObject = exec;
      } else {
        actionObject = {
          type: action,
          exec: void 0
        };
      }
    } else if (isFunction(action)) {
      actionObject = {
        type: action.name || action.toString(),
        exec: action
      };
    } else {
      var exec = getActionFunction(action.type, actionFunctionMap);
      if (isFunction(exec)) {
        actionObject = __assign(__assign({}, action), {
          exec
        });
      } else if (exec) {
        var actionType = exec.type || action.type;
        actionObject = __assign(__assign(__assign({}, exec), action), {
          type: actionType
        });
      } else {
        actionObject = action;
      }
    }
    return actionObject;
  }
  var toActionObjects = function(action, actionFunctionMap) {
    if (!action) {
      return [];
    }
    var actions = isArray(action) ? action : [action];
    return actions.map(function(subAction) {
      return toActionObject(subAction, actionFunctionMap);
    });
  };
  function toActivityDefinition(action) {
    var actionObject = toActionObject(action);
    return __assign(__assign({
      id: isString(action) ? action : actionObject.id
    }, actionObject), {
      type: actionObject.type
    });
  }
  function raise2(event2) {
    if (!isString(event2)) {
      return send2(event2, {
        to: SpecialTargets.Internal
      });
    }
    return {
      type: raise,
      event: event2
    };
  }
  function resolveRaise(action) {
    return {
      type: raise,
      _event: toSCXMLEvent(action.event)
    };
  }
  function send2(event2, options2) {
    return {
      to: options2 ? options2.to : void 0,
      type: send,
      event: isFunction(event2) ? event2 : toEventObject(event2),
      delay: options2 ? options2.delay : void 0,
      id: options2 && options2.id !== void 0 ? options2.id : isFunction(event2) ? event2.name : getEventType(event2)
    };
  }
  function resolveSend(action, ctx, _event, delaysMap) {
    var meta = {
      _event
    };
    var resolvedEvent = toSCXMLEvent(isFunction(action.event) ? action.event(ctx, _event.data, meta) : action.event);
    var resolvedDelay;
    if (isString(action.delay)) {
      var configDelay = delaysMap && delaysMap[action.delay];
      resolvedDelay = isFunction(configDelay) ? configDelay(ctx, _event.data, meta) : configDelay;
    } else {
      resolvedDelay = isFunction(action.delay) ? action.delay(ctx, _event.data, meta) : action.delay;
    }
    var resolvedTarget = isFunction(action.to) ? action.to(ctx, _event.data, meta) : action.to;
    return __assign(__assign({}, action), {
      to: resolvedTarget,
      _event: resolvedEvent,
      event: resolvedEvent.data,
      delay: resolvedDelay
    });
  }
  var resolveLog = function(action, ctx, _event) {
    return __assign(__assign({}, action), {
      value: isString(action.expr) ? action.expr : action.expr(ctx, _event.data, {
        _event
      })
    });
  };
  var cancel2 = function(sendId) {
    return {
      type: cancel,
      sendId
    };
  };
  function start2(activity) {
    var activityDef = toActivityDefinition(activity);
    return {
      type: ActionTypes.Start,
      activity: activityDef,
      exec: void 0
    };
  }
  function stop2(actorRef) {
    var activity = isFunction(actorRef) ? actorRef : toActivityDefinition(actorRef);
    return {
      type: ActionTypes.Stop,
      activity,
      exec: void 0
    };
  }
  function resolveStop(action, context, _event) {
    var actorRefOrString = isFunction(action.activity) ? action.activity(context, _event.data) : action.activity;
    var resolvedActorRef = typeof actorRefOrString === "string" ? {
      id: actorRefOrString
    } : actorRefOrString;
    var actionObject = {
      type: ActionTypes.Stop,
      activity: resolvedActorRef
    };
    return actionObject;
  }
  function after2(delayRef, id) {
    var idSuffix = id ? "#" + id : "";
    return ActionTypes.After + "(" + delayRef + ")" + idSuffix;
  }
  function done(id, data) {
    var type = ActionTypes.DoneState + "." + id;
    var eventObject = {
      type,
      data
    };
    eventObject.toString = function() {
      return type;
    };
    return eventObject;
  }
  function doneInvoke(id, data) {
    var type = ActionTypes.DoneInvoke + "." + id;
    var eventObject = {
      type,
      data
    };
    eventObject.toString = function() {
      return type;
    };
    return eventObject;
  }
  function error2(id, data) {
    var type = ActionTypes.ErrorPlatform + "." + id;
    var eventObject = {
      type,
      data
    };
    eventObject.toString = function() {
      return type;
    };
    return eventObject;
  }
  function resolveActions(machine, currentState, currentContext, _event, actions, preserveActionOrder) {
    if (preserveActionOrder === void 0) {
      preserveActionOrder = false;
    }
    var _a = __read(preserveActionOrder ? [[], actions] : partition(actions, function(action) {
      return action.type === assign;
    }), 2), assignActions = _a[0], otherActions = _a[1];
    var updatedContext = assignActions.length ? updateContext(currentContext, _event, assignActions, currentState) : currentContext;
    var preservedContexts = preserveActionOrder ? [currentContext] : void 0;
    var resolvedActions = flatten(otherActions.map(function(actionObject) {
      var _a2;
      switch (actionObject.type) {
        case raise:
          return resolveRaise(actionObject);
        case send:
          var sendAction = resolveSend(actionObject, updatedContext, _event, machine.options.delays);
          if (!IS_PRODUCTION) {
            warn(!isString(actionObject.delay) || typeof sendAction.delay === "number", "No delay reference for delay expression '" + actionObject.delay + "' was found on machine '" + machine.id + "'");
          }
          return sendAction;
        case log:
          return resolveLog(actionObject, updatedContext, _event);
        case choose: {
          var chooseAction = actionObject;
          var matchedActions = (_a2 = chooseAction.conds.find(function(condition) {
            var guard = toGuard(condition.cond, machine.options.guards);
            return !guard || evaluateGuard(machine, guard, updatedContext, _event, currentState);
          })) === null || _a2 === void 0 ? void 0 : _a2.actions;
          if (!matchedActions) {
            return [];
          }
          var _b = __read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(toArray(matchedActions), machine.options.actions), preserveActionOrder), 2), resolvedActionsFromChoose = _b[0], resolvedContextFromChoose = _b[1];
          updatedContext = resolvedContextFromChoose;
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          return resolvedActionsFromChoose;
        }
        case pure: {
          var matchedActions = actionObject.get(updatedContext, _event.data);
          if (!matchedActions) {
            return [];
          }
          var _c = __read(resolveActions(machine, currentState, updatedContext, _event, toActionObjects(toArray(matchedActions), machine.options.actions), preserveActionOrder), 2), resolvedActionsFromPure = _c[0], resolvedContext = _c[1];
          updatedContext = resolvedContext;
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          return resolvedActionsFromPure;
        }
        case stop: {
          return resolveStop(actionObject, updatedContext, _event);
        }
        case assign: {
          updatedContext = updateContext(updatedContext, _event, [actionObject], currentState);
          preservedContexts === null || preservedContexts === void 0 ? void 0 : preservedContexts.push(updatedContext);
          break;
        }
        default:
          var resolvedActionObject = toActionObject(actionObject, machine.options.actions);
          var exec_1 = resolvedActionObject.exec;
          if (exec_1 && preservedContexts) {
            var contextIndex_1 = preservedContexts.length - 1;
            resolvedActionObject.exec = function(_ctx) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
              }
              exec_1 === null || exec_1 === void 0 ? void 0 : exec_1.apply(void 0, __spreadArray([preservedContexts[contextIndex_1]], __read(args)));
            };
          }
          return resolvedActionObject;
      }
    }).filter(function(a) {
      return !!a;
    }));
    return [resolvedActions, updatedContext];
  }

  // node_modules/xstate/es/stateUtils.js
  var isLeafNode = function(stateNode) {
    return stateNode.type === "atomic" || stateNode.type === "final";
  };
  function getChildren(stateNode) {
    return keys(stateNode.states).map(function(key) {
      return stateNode.states[key];
    });
  }
  function getAllStateNodes(stateNode) {
    var stateNodes = [stateNode];
    if (isLeafNode(stateNode)) {
      return stateNodes;
    }
    return stateNodes.concat(flatten(getChildren(stateNode).map(getAllStateNodes)));
  }
  function getConfiguration(prevStateNodes, stateNodes) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    var prevConfiguration = new Set(prevStateNodes);
    var prevAdjList = getAdjList(prevConfiguration);
    var configuration = new Set(stateNodes);
    try {
      for (var configuration_1 = __values(configuration), configuration_1_1 = configuration_1.next(); !configuration_1_1.done; configuration_1_1 = configuration_1.next()) {
        var s2 = configuration_1_1.value;
        var m = s2.parent;
        while (m && !configuration.has(m)) {
          configuration.add(m);
          m = m.parent;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (configuration_1_1 && !configuration_1_1.done && (_a = configuration_1.return))
          _a.call(configuration_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    var adjList = getAdjList(configuration);
    try {
      for (var configuration_2 = __values(configuration), configuration_2_1 = configuration_2.next(); !configuration_2_1.done; configuration_2_1 = configuration_2.next()) {
        var s2 = configuration_2_1.value;
        if (s2.type === "compound" && (!adjList.get(s2) || !adjList.get(s2).length)) {
          if (prevAdjList.get(s2)) {
            prevAdjList.get(s2).forEach(function(sn) {
              return configuration.add(sn);
            });
          } else {
            s2.initialStateNodes.forEach(function(sn) {
              return configuration.add(sn);
            });
          }
        } else {
          if (s2.type === "parallel") {
            try {
              for (var _e = (e_3 = void 0, __values(getChildren(s2))), _f = _e.next(); !_f.done; _f = _e.next()) {
                var child = _f.value;
                if (child.type === "history") {
                  continue;
                }
                if (!configuration.has(child)) {
                  configuration.add(child);
                  if (prevAdjList.get(child)) {
                    prevAdjList.get(child).forEach(function(sn) {
                      return configuration.add(sn);
                    });
                  } else {
                    child.initialStateNodes.forEach(function(sn) {
                      return configuration.add(sn);
                    });
                  }
                }
              }
            } catch (e_3_1) {
              e_3 = {
                error: e_3_1
              };
            } finally {
              try {
                if (_f && !_f.done && (_c = _e.return))
                  _c.call(_e);
              } finally {
                if (e_3)
                  throw e_3.error;
              }
            }
          }
        }
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (configuration_2_1 && !configuration_2_1.done && (_b = configuration_2.return))
          _b.call(configuration_2);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    try {
      for (var configuration_3 = __values(configuration), configuration_3_1 = configuration_3.next(); !configuration_3_1.done; configuration_3_1 = configuration_3.next()) {
        var s2 = configuration_3_1.value;
        var m = s2.parent;
        while (m && !configuration.has(m)) {
          configuration.add(m);
          m = m.parent;
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (configuration_3_1 && !configuration_3_1.done && (_d = configuration_3.return))
          _d.call(configuration_3);
      } finally {
        if (e_4)
          throw e_4.error;
      }
    }
    return configuration;
  }
  function getValueFromAdj(baseNode, adjList) {
    var childStateNodes = adjList.get(baseNode);
    if (!childStateNodes) {
      return {};
    }
    if (baseNode.type === "compound") {
      var childStateNode = childStateNodes[0];
      if (childStateNode) {
        if (isLeafNode(childStateNode)) {
          return childStateNode.key;
        }
      } else {
        return {};
      }
    }
    var stateValue = {};
    childStateNodes.forEach(function(csn) {
      stateValue[csn.key] = getValueFromAdj(csn, adjList);
    });
    return stateValue;
  }
  function getAdjList(configuration) {
    var e_5, _a;
    var adjList = new Map();
    try {
      for (var configuration_4 = __values(configuration), configuration_4_1 = configuration_4.next(); !configuration_4_1.done; configuration_4_1 = configuration_4.next()) {
        var s2 = configuration_4_1.value;
        if (!adjList.has(s2)) {
          adjList.set(s2, []);
        }
        if (s2.parent) {
          if (!adjList.has(s2.parent)) {
            adjList.set(s2.parent, []);
          }
          adjList.get(s2.parent).push(s2);
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (configuration_4_1 && !configuration_4_1.done && (_a = configuration_4.return))
          _a.call(configuration_4);
      } finally {
        if (e_5)
          throw e_5.error;
      }
    }
    return adjList;
  }
  function getValue(rootNode, configuration) {
    var config = getConfiguration([rootNode], configuration);
    return getValueFromAdj(rootNode, getAdjList(config));
  }
  function has(iterable, item) {
    if (Array.isArray(iterable)) {
      return iterable.some(function(member) {
        return member === item;
      });
    }
    if (iterable instanceof Set) {
      return iterable.has(item);
    }
    return false;
  }
  function nextEvents(configuration) {
    return __spreadArray([], __read(new Set(flatten(__spreadArray([], __read(configuration.map(function(sn) {
      return sn.ownEvents;
    })))))));
  }
  function isInFinalState(configuration, stateNode) {
    if (stateNode.type === "compound") {
      return getChildren(stateNode).some(function(s2) {
        return s2.type === "final" && has(configuration, s2);
      });
    }
    if (stateNode.type === "parallel") {
      return getChildren(stateNode).every(function(sn) {
        return isInFinalState(configuration, sn);
      });
    }
    return false;
  }
  function getMeta(configuration) {
    if (configuration === void 0) {
      configuration = [];
    }
    return configuration.reduce(function(acc, stateNode) {
      if (stateNode.meta !== void 0) {
        acc[stateNode.id] = stateNode.meta;
      }
      return acc;
    }, {});
  }

  // node_modules/xstate/es/State.js
  function stateValuesEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (a === void 0 || b === void 0) {
      return false;
    }
    if (isString(a) || isString(b)) {
      return a === b;
    }
    var aKeys = keys(a);
    var bKeys = keys(b);
    return aKeys.length === bKeys.length && aKeys.every(function(key) {
      return stateValuesEqual(a[key], b[key]);
    });
  }
  function isState(state) {
    if (isString(state)) {
      return false;
    }
    return "value" in state && "history" in state;
  }
  function bindActionToState(action, state) {
    var exec = action.exec;
    var boundAction = __assign(__assign({}, action), {
      exec: exec !== void 0 ? function() {
        return exec(state.context, state.event, {
          action,
          state,
          _event: state._event
        });
      } : void 0
    });
    return boundAction;
  }
  var State = /* @__PURE__ */ function() {
    function State2(config) {
      var _this = this;
      var _a;
      this.actions = [];
      this.activities = EMPTY_ACTIVITY_MAP;
      this.meta = {};
      this.events = [];
      this.value = config.value;
      this.context = config.context;
      this._event = config._event;
      this._sessionid = config._sessionid;
      this.event = this._event.data;
      this.historyValue = config.historyValue;
      this.history = config.history;
      this.actions = config.actions || [];
      this.activities = config.activities || EMPTY_ACTIVITY_MAP;
      this.meta = getMeta(config.configuration);
      this.events = config.events || [];
      this.matches = this.matches.bind(this);
      this.toStrings = this.toStrings.bind(this);
      this.configuration = config.configuration;
      this.transitions = config.transitions;
      this.children = config.children;
      this.done = !!config.done;
      this.tags = (_a = Array.isArray(config.tags) ? new Set(config.tags) : config.tags) !== null && _a !== void 0 ? _a : new Set();
      Object.defineProperty(this, "nextEvents", {
        get: function() {
          return nextEvents(_this.configuration);
        }
      });
    }
    State2.from = function(stateValue, context) {
      if (stateValue instanceof State2) {
        if (stateValue.context !== context) {
          return new State2({
            value: stateValue.value,
            context,
            _event: stateValue._event,
            _sessionid: null,
            historyValue: stateValue.historyValue,
            history: stateValue.history,
            actions: [],
            activities: stateValue.activities,
            meta: {},
            events: [],
            configuration: [],
            transitions: [],
            children: {}
          });
        }
        return stateValue;
      }
      var _event = initEvent;
      return new State2({
        value: stateValue,
        context,
        _event,
        _sessionid: null,
        historyValue: void 0,
        history: void 0,
        actions: [],
        activities: void 0,
        meta: void 0,
        events: [],
        configuration: [],
        transitions: [],
        children: {}
      });
    };
    State2.create = function(config) {
      return new State2(config);
    };
    State2.inert = function(stateValue, context) {
      if (stateValue instanceof State2) {
        if (!stateValue.actions.length) {
          return stateValue;
        }
        var _event = initEvent;
        return new State2({
          value: stateValue.value,
          context,
          _event,
          _sessionid: null,
          historyValue: stateValue.historyValue,
          history: stateValue.history,
          activities: stateValue.activities,
          configuration: stateValue.configuration,
          transitions: [],
          children: {}
        });
      }
      return State2.from(stateValue, context);
    };
    State2.prototype.toStrings = function(stateValue, delimiter) {
      var _this = this;
      if (stateValue === void 0) {
        stateValue = this.value;
      }
      if (delimiter === void 0) {
        delimiter = ".";
      }
      if (isString(stateValue)) {
        return [stateValue];
      }
      var valueKeys = keys(stateValue);
      return valueKeys.concat.apply(valueKeys, __spreadArray([], __read(valueKeys.map(function(key) {
        return _this.toStrings(stateValue[key], delimiter).map(function(s2) {
          return key + delimiter + s2;
        });
      }))));
    };
    State2.prototype.toJSON = function() {
      var _a = this, configuration = _a.configuration, transitions = _a.transitions, tags = _a.tags, jsonValues = __rest(_a, ["configuration", "transitions", "tags"]);
      return __assign(__assign({}, jsonValues), {
        tags: Array.from(tags)
      });
    };
    State2.prototype.matches = function(parentStateValue) {
      return matchesState(parentStateValue, this.value);
    };
    State2.prototype.hasTag = function(tag) {
      return this.tags.has(tag);
    };
    return State2;
  }();

  // node_modules/xstate/es/serviceScope.js
  var serviceStack = [];
  var provide = function(service, fn) {
    serviceStack.push(service);
    var result = fn(service);
    serviceStack.pop();
    return result;
  };

  // node_modules/xstate/es/Actor.js
  function createNullActor(id) {
    return {
      id,
      send: function() {
        return void 0;
      },
      subscribe: function() {
        return {
          unsubscribe: function() {
            return void 0;
          }
        };
      },
      getSnapshot: function() {
        return void 0;
      },
      toJSON: function() {
        return {
          id
        };
      }
    };
  }
  function createInvocableActor(invokeDefinition, machine, context, _event) {
    var _a;
    var invokeSrc = toInvokeSource(invokeDefinition.src);
    var serviceCreator = (_a = machine === null || machine === void 0 ? void 0 : machine.options.services) === null || _a === void 0 ? void 0 : _a[invokeSrc.type];
    var resolvedData = invokeDefinition.data ? mapContext(invokeDefinition.data, context, _event) : void 0;
    var tempActor = serviceCreator ? createDeferredActor(serviceCreator, invokeDefinition.id, resolvedData) : createNullActor(invokeDefinition.id);
    tempActor.meta = invokeDefinition;
    return tempActor;
  }
  function createDeferredActor(entity, id, data) {
    var tempActor = createNullActor(id);
    tempActor.deferred = true;
    if (isMachine(entity)) {
      var initialState_1 = tempActor.state = provide(void 0, function() {
        return (data ? entity.withContext(data) : entity).initialState;
      });
      tempActor.getSnapshot = function() {
        return initialState_1;
      };
    }
    return tempActor;
  }
  function isActor2(item) {
    try {
      return typeof item.send === "function";
    } catch (e) {
      return false;
    }
  }
  function isSpawnedActor(item) {
    return isActor2(item) && "id" in item;
  }
  function toActorRef(actorRefLike) {
    return __assign({
      subscribe: function() {
        return {
          unsubscribe: function() {
            return void 0;
          }
        };
      },
      id: "anonymous",
      getSnapshot: function() {
        return void 0;
      }
    }, actorRefLike);
  }

  // node_modules/xstate/es/invokeUtils.js
  function toInvokeSource2(src) {
    if (typeof src === "string") {
      var simpleSrc = {
        type: src
      };
      simpleSrc.toString = function() {
        return src;
      };
      return simpleSrc;
    }
    return src;
  }
  function toInvokeDefinition(invokeConfig) {
    return __assign(__assign({
      type: invoke
    }, invokeConfig), {
      toJSON: function() {
        var onDone = invokeConfig.onDone, onError = invokeConfig.onError, invokeDef = __rest(invokeConfig, ["onDone", "onError"]);
        return __assign(__assign({}, invokeDef), {
          type: invoke,
          src: toInvokeSource2(invokeConfig.src)
        });
      }
    });
  }

  // node_modules/xstate/es/StateNode.js
  var NULL_EVENT = "";
  var STATE_IDENTIFIER = "#";
  var WILDCARD = "*";
  var EMPTY_OBJECT = {};
  var isStateId = function(str) {
    return str[0] === STATE_IDENTIFIER;
  };
  var createDefaultOptions = function() {
    return {
      actions: {},
      guards: {},
      services: {},
      activities: {},
      delays: {}
    };
  };
  var validateArrayifiedTransitions = function(stateNode, event2, transitions) {
    var hasNonLastUnguardedTarget = transitions.slice(0, -1).some(function(transition) {
      return !("cond" in transition) && !("in" in transition) && (isString(transition.target) || isMachine(transition.target));
    });
    var eventText = event2 === NULL_EVENT ? "the transient event" : "event '" + event2 + "'";
    warn(!hasNonLastUnguardedTarget, "One or more transitions for " + eventText + " on state '" + stateNode.id + "' are unreachable. Make sure that the default transition is the last one defined.");
  };
  var StateNode = /* @__PURE__ */ function() {
    function StateNode2(config, options2, _context) {
      var _this = this;
      if (_context === void 0) {
        _context = "context" in config ? config.context : void 0;
      }
      var _a;
      this.config = config;
      this._context = _context;
      this.order = -1;
      this.__xstatenode = true;
      this.__cache = {
        events: void 0,
        relativeValue: new Map(),
        initialStateValue: void 0,
        initialState: void 0,
        on: void 0,
        transitions: void 0,
        candidates: {},
        delayedTransitions: void 0
      };
      this.idMap = {};
      this.tags = [];
      this.options = Object.assign(createDefaultOptions(), options2);
      this.parent = this.options._parent;
      this.key = this.config.key || this.options._key || this.config.id || "(machine)";
      this.machine = this.parent ? this.parent.machine : this;
      this.path = this.parent ? this.parent.path.concat(this.key) : [];
      this.delimiter = this.config.delimiter || (this.parent ? this.parent.delimiter : STATE_DELIMITER);
      this.id = this.config.id || __spreadArray([this.machine.key], __read(this.path)).join(this.delimiter);
      this.version = this.parent ? this.parent.version : this.config.version;
      this.type = this.config.type || (this.config.parallel ? "parallel" : this.config.states && keys(this.config.states).length ? "compound" : this.config.history ? "history" : "atomic");
      this.schema = this.parent ? this.machine.schema : (_a = this.config.schema) !== null && _a !== void 0 ? _a : {};
      if (!IS_PRODUCTION) {
        warn(!("parallel" in this.config), 'The "parallel" property is deprecated and will be removed in version 4.1. ' + (this.config.parallel ? "Replace with `type: 'parallel'`" : "Use `type: '" + this.type + "'`") + " in the config for state node '" + this.id + "' instead.");
      }
      this.initial = this.config.initial;
      this.states = this.config.states ? mapValues(this.config.states, function(stateConfig, key) {
        var _a2;
        var stateNode = new StateNode2(stateConfig, {
          _parent: _this,
          _key: key
        });
        Object.assign(_this.idMap, __assign((_a2 = {}, _a2[stateNode.id] = stateNode, _a2), stateNode.idMap));
        return stateNode;
      }) : EMPTY_OBJECT;
      var order = 0;
      function dfs(stateNode) {
        var e_1, _a2;
        stateNode.order = order++;
        try {
          for (var _b = __values(getChildren(stateNode)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            dfs(child);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
      dfs(this);
      this.history = this.config.history === true ? "shallow" : this.config.history || false;
      this._transient = !!this.config.always || (!this.config.on ? false : Array.isArray(this.config.on) ? this.config.on.some(function(_a2) {
        var event2 = _a2.event;
        return event2 === NULL_EVENT;
      }) : NULL_EVENT in this.config.on);
      this.strict = !!this.config.strict;
      this.onEntry = toArray(this.config.entry || this.config.onEntry).map(function(action) {
        return toActionObject(action);
      });
      this.onExit = toArray(this.config.exit || this.config.onExit).map(function(action) {
        return toActionObject(action);
      });
      this.meta = this.config.meta;
      this.doneData = this.type === "final" ? this.config.data : void 0;
      this.invoke = toArray(this.config.invoke).map(function(invokeConfig, i) {
        var _a2, _b;
        if (isMachine(invokeConfig)) {
          _this.machine.options.services = __assign((_a2 = {}, _a2[invokeConfig.id] = invokeConfig, _a2), _this.machine.options.services);
          return toInvokeDefinition({
            src: invokeConfig.id,
            id: invokeConfig.id
          });
        } else if (isString(invokeConfig.src)) {
          return toInvokeDefinition(__assign(__assign({}, invokeConfig), {
            id: invokeConfig.id || invokeConfig.src,
            src: invokeConfig.src
          }));
        } else if (isMachine(invokeConfig.src) || isFunction(invokeConfig.src)) {
          var invokeSrc = _this.id + ":invocation[" + i + "]";
          _this.machine.options.services = __assign((_b = {}, _b[invokeSrc] = invokeConfig.src, _b), _this.machine.options.services);
          return toInvokeDefinition(__assign(__assign({
            id: invokeSrc
          }, invokeConfig), {
            src: invokeSrc
          }));
        } else {
          var invokeSource = invokeConfig.src;
          return toInvokeDefinition(__assign(__assign({
            id: invokeSource.type
          }, invokeConfig), {
            src: invokeSource
          }));
        }
      });
      this.activities = toArray(this.config.activities).concat(this.invoke).map(function(activity) {
        return toActivityDefinition(activity);
      });
      this.transition = this.transition.bind(this);
      this.tags = toArray(this.config.tags);
    }
    StateNode2.prototype._init = function() {
      if (this.__cache.transitions) {
        return;
      }
      getAllStateNodes(this).forEach(function(stateNode) {
        return stateNode.on;
      });
    };
    StateNode2.prototype.withConfig = function(options2, context) {
      var _a = this.options, actions = _a.actions, activities = _a.activities, guards = _a.guards, services = _a.services, delays = _a.delays;
      return new StateNode2(this.config, {
        actions: __assign(__assign({}, actions), options2.actions),
        activities: __assign(__assign({}, activities), options2.activities),
        guards: __assign(__assign({}, guards), options2.guards),
        services: __assign(__assign({}, services), options2.services),
        delays: __assign(__assign({}, delays), options2.delays)
      }, context !== null && context !== void 0 ? context : this.context);
    };
    StateNode2.prototype.withContext = function(context) {
      return new StateNode2(this.config, this.options, context);
    };
    Object.defineProperty(StateNode2.prototype, "context", {
      get: function() {
        return isFunction(this._context) ? this._context() : this._context;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(StateNode2.prototype, "definition", {
      get: function() {
        return {
          id: this.id,
          key: this.key,
          version: this.version,
          context: this.context,
          type: this.type,
          initial: this.initial,
          history: this.history,
          states: mapValues(this.states, function(state) {
            return state.definition;
          }),
          on: this.on,
          transitions: this.transitions,
          entry: this.onEntry,
          exit: this.onExit,
          activities: this.activities || [],
          meta: this.meta,
          order: this.order || -1,
          data: this.doneData,
          invoke: this.invoke
        };
      },
      enumerable: false,
      configurable: true
    });
    StateNode2.prototype.toJSON = function() {
      return this.definition;
    };
    Object.defineProperty(StateNode2.prototype, "on", {
      get: function() {
        if (this.__cache.on) {
          return this.__cache.on;
        }
        var transitions = this.transitions;
        return this.__cache.on = transitions.reduce(function(map, transition) {
          map[transition.eventType] = map[transition.eventType] || [];
          map[transition.eventType].push(transition);
          return map;
        }, {});
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(StateNode2.prototype, "after", {
      get: function() {
        return this.__cache.delayedTransitions || (this.__cache.delayedTransitions = this.getDelayedTransitions(), this.__cache.delayedTransitions);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(StateNode2.prototype, "transitions", {
      get: function() {
        return this.__cache.transitions || (this.__cache.transitions = this.formatTransitions(), this.__cache.transitions);
      },
      enumerable: false,
      configurable: true
    });
    StateNode2.prototype.getCandidates = function(eventName) {
      if (this.__cache.candidates[eventName]) {
        return this.__cache.candidates[eventName];
      }
      var transient = eventName === NULL_EVENT;
      var candidates = this.transitions.filter(function(transition) {
        var sameEventType = transition.eventType === eventName;
        return transient ? sameEventType : sameEventType || transition.eventType === WILDCARD;
      });
      this.__cache.candidates[eventName] = candidates;
      return candidates;
    };
    StateNode2.prototype.getDelayedTransitions = function() {
      var _this = this;
      var afterConfig = this.config.after;
      if (!afterConfig) {
        return [];
      }
      var mutateEntryExit = function(delay, i) {
        var delayRef = isFunction(delay) ? _this.id + ":delay[" + i + "]" : delay;
        var eventType = after2(delayRef, _this.id);
        _this.onEntry.push(send2(eventType, {
          delay
        }));
        _this.onExit.push(cancel2(eventType));
        return eventType;
      };
      var delayedTransitions = isArray(afterConfig) ? afterConfig.map(function(transition, i) {
        var eventType = mutateEntryExit(transition.delay, i);
        return __assign(__assign({}, transition), {
          event: eventType
        });
      }) : flatten(keys(afterConfig).map(function(delay, i) {
        var configTransition = afterConfig[delay];
        var resolvedTransition = isString(configTransition) ? {
          target: configTransition
        } : configTransition;
        var resolvedDelay = !isNaN(+delay) ? +delay : delay;
        var eventType = mutateEntryExit(resolvedDelay, i);
        return toArray(resolvedTransition).map(function(transition) {
          return __assign(__assign({}, transition), {
            event: eventType,
            delay: resolvedDelay
          });
        });
      }));
      return delayedTransitions.map(function(delayedTransition) {
        var delay = delayedTransition.delay;
        return __assign(__assign({}, _this.formatTransition(delayedTransition)), {
          delay
        });
      });
    };
    StateNode2.prototype.getStateNodes = function(state) {
      var _a;
      var _this = this;
      if (!state) {
        return [];
      }
      var stateValue = state instanceof State ? state.value : toStateValue(state, this.delimiter);
      if (isString(stateValue)) {
        var initialStateValue = this.getStateNode(stateValue).initial;
        return initialStateValue !== void 0 ? this.getStateNodes((_a = {}, _a[stateValue] = initialStateValue, _a)) : [this, this.states[stateValue]];
      }
      var subStateKeys = keys(stateValue);
      var subStateNodes = subStateKeys.map(function(subStateKey) {
        return _this.getStateNode(subStateKey);
      });
      subStateNodes.push(this);
      return subStateNodes.concat(subStateKeys.reduce(function(allSubStateNodes, subStateKey) {
        var subStateNode = _this.getStateNode(subStateKey).getStateNodes(stateValue[subStateKey]);
        return allSubStateNodes.concat(subStateNode);
      }, []));
    };
    StateNode2.prototype.handles = function(event2) {
      var eventType = getEventType(event2);
      return this.events.includes(eventType);
    };
    StateNode2.prototype.resolveState = function(state) {
      var configuration = Array.from(getConfiguration([], this.getStateNodes(state.value)));
      return new State(__assign(__assign({}, state), {
        value: this.resolve(state.value),
        configuration,
        done: isInFinalState(configuration, this)
      }));
    };
    StateNode2.prototype.transitionLeafNode = function(stateValue, state, _event) {
      var stateNode = this.getStateNode(stateValue);
      var next = stateNode.next(state, _event);
      if (!next || !next.transitions.length) {
        return this.next(state, _event);
      }
      return next;
    };
    StateNode2.prototype.transitionCompoundNode = function(stateValue, state, _event) {
      var subStateKeys = keys(stateValue);
      var stateNode = this.getStateNode(subStateKeys[0]);
      var next = stateNode._transition(stateValue[subStateKeys[0]], state, _event);
      if (!next || !next.transitions.length) {
        return this.next(state, _event);
      }
      return next;
    };
    StateNode2.prototype.transitionParallelNode = function(stateValue, state, _event) {
      var e_2, _a;
      var transitionMap = {};
      try {
        for (var _b = __values(keys(stateValue)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var subStateKey = _c.value;
          var subStateValue = stateValue[subStateKey];
          if (!subStateValue) {
            continue;
          }
          var subStateNode = this.getStateNode(subStateKey);
          var next = subStateNode._transition(subStateValue, state, _event);
          if (next) {
            transitionMap[subStateKey] = next;
          }
        }
      } catch (e_2_1) {
        e_2 = {
          error: e_2_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_2)
            throw e_2.error;
        }
      }
      var stateTransitions = keys(transitionMap).map(function(key) {
        return transitionMap[key];
      });
      var enabledTransitions = flatten(stateTransitions.map(function(st) {
        return st.transitions;
      }));
      var willTransition = stateTransitions.some(function(st) {
        return st.transitions.length > 0;
      });
      if (!willTransition) {
        return this.next(state, _event);
      }
      var entryNodes = flatten(stateTransitions.map(function(t) {
        return t.entrySet;
      }));
      var configuration = flatten(keys(transitionMap).map(function(key) {
        return transitionMap[key].configuration;
      }));
      return {
        transitions: enabledTransitions,
        entrySet: entryNodes,
        exitSet: flatten(stateTransitions.map(function(t) {
          return t.exitSet;
        })),
        configuration,
        source: state,
        actions: flatten(keys(transitionMap).map(function(key) {
          return transitionMap[key].actions;
        }))
      };
    };
    StateNode2.prototype._transition = function(stateValue, state, _event) {
      if (isString(stateValue)) {
        return this.transitionLeafNode(stateValue, state, _event);
      }
      if (keys(stateValue).length === 1) {
        return this.transitionCompoundNode(stateValue, state, _event);
      }
      return this.transitionParallelNode(stateValue, state, _event);
    };
    StateNode2.prototype.next = function(state, _event) {
      var e_3, _a;
      var _this = this;
      var eventName = _event.name;
      var actions = [];
      var nextStateNodes = [];
      var selectedTransition;
      try {
        for (var _b = __values(this.getCandidates(eventName)), _c = _b.next(); !_c.done; _c = _b.next()) {
          var candidate = _c.value;
          var cond = candidate.cond, stateIn = candidate.in;
          var resolvedContext = state.context;
          var isInState = stateIn ? isString(stateIn) && isStateId(stateIn) ? state.matches(toStateValue(this.getStateNodeById(stateIn).path, this.delimiter)) : matchesState(toStateValue(stateIn, this.delimiter), path(this.path.slice(0, -2))(state.value)) : true;
          var guardPassed = false;
          try {
            guardPassed = !cond || evaluateGuard(this.machine, cond, resolvedContext, _event, state);
          } catch (err) {
            throw new Error("Unable to evaluate guard '" + (cond.name || cond.type) + "' in transition for event '" + eventName + "' in state node '" + this.id + "':\n" + err.message);
          }
          if (guardPassed && isInState) {
            if (candidate.target !== void 0) {
              nextStateNodes = candidate.target;
            }
            actions.push.apply(actions, __spreadArray([], __read(candidate.actions)));
            selectedTransition = candidate;
            break;
          }
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      if (!selectedTransition) {
        return void 0;
      }
      if (!nextStateNodes.length) {
        return {
          transitions: [selectedTransition],
          entrySet: [],
          exitSet: [],
          configuration: state.value ? [this] : [],
          source: state,
          actions
        };
      }
      var allNextStateNodes = flatten(nextStateNodes.map(function(stateNode) {
        return _this.getRelativeStateNodes(stateNode, state.historyValue);
      }));
      var isInternal = !!selectedTransition.internal;
      var reentryNodes = isInternal ? [] : flatten(allNextStateNodes.map(function(n) {
        return _this.nodesFromChild(n);
      }));
      return {
        transitions: [selectedTransition],
        entrySet: reentryNodes,
        exitSet: isInternal ? [] : [this],
        configuration: allNextStateNodes,
        source: state,
        actions
      };
    };
    StateNode2.prototype.nodesFromChild = function(childStateNode) {
      if (childStateNode.escapes(this)) {
        return [];
      }
      var nodes = [];
      var marker = childStateNode;
      while (marker && marker !== this) {
        nodes.push(marker);
        marker = marker.parent;
      }
      nodes.push(this);
      return nodes;
    };
    StateNode2.prototype.escapes = function(stateNode) {
      if (this === stateNode) {
        return false;
      }
      var parent = this.parent;
      while (parent) {
        if (parent === stateNode) {
          return false;
        }
        parent = parent.parent;
      }
      return true;
    };
    StateNode2.prototype.getActions = function(transition, currentContext, _event, prevState) {
      var e_4, _a, e_5, _b;
      var prevConfig = getConfiguration([], prevState ? this.getStateNodes(prevState.value) : [this]);
      var resolvedConfig = transition.configuration.length ? getConfiguration(prevConfig, transition.configuration) : prevConfig;
      try {
        for (var resolvedConfig_1 = __values(resolvedConfig), resolvedConfig_1_1 = resolvedConfig_1.next(); !resolvedConfig_1_1.done; resolvedConfig_1_1 = resolvedConfig_1.next()) {
          var sn = resolvedConfig_1_1.value;
          if (!has(prevConfig, sn)) {
            transition.entrySet.push(sn);
          }
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1
        };
      } finally {
        try {
          if (resolvedConfig_1_1 && !resolvedConfig_1_1.done && (_a = resolvedConfig_1.return))
            _a.call(resolvedConfig_1);
        } finally {
          if (e_4)
            throw e_4.error;
        }
      }
      try {
        for (var prevConfig_1 = __values(prevConfig), prevConfig_1_1 = prevConfig_1.next(); !prevConfig_1_1.done; prevConfig_1_1 = prevConfig_1.next()) {
          var sn = prevConfig_1_1.value;
          if (!has(resolvedConfig, sn) || has(transition.exitSet, sn.parent)) {
            transition.exitSet.push(sn);
          }
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (prevConfig_1_1 && !prevConfig_1_1.done && (_b = prevConfig_1.return))
            _b.call(prevConfig_1);
        } finally {
          if (e_5)
            throw e_5.error;
        }
      }
      if (!transition.source) {
        transition.exitSet = [];
        transition.entrySet.push(this);
      }
      var doneEvents = flatten(transition.entrySet.map(function(sn2) {
        var events = [];
        if (sn2.type !== "final") {
          return events;
        }
        var parent = sn2.parent;
        if (!parent.parent) {
          return events;
        }
        events.push(done(sn2.id, sn2.doneData), done(parent.id, sn2.doneData ? mapContext(sn2.doneData, currentContext, _event) : void 0));
        var grandparent = parent.parent;
        if (grandparent.type === "parallel") {
          if (getChildren(grandparent).every(function(parentNode) {
            return isInFinalState(transition.configuration, parentNode);
          })) {
            events.push(done(grandparent.id));
          }
        }
        return events;
      }));
      transition.exitSet.sort(function(a, b) {
        return b.order - a.order;
      });
      transition.entrySet.sort(function(a, b) {
        return a.order - b.order;
      });
      var entryStates = new Set(transition.entrySet);
      var exitStates = new Set(transition.exitSet);
      var _c = __read([flatten(Array.from(entryStates).map(function(stateNode) {
        return __spreadArray(__spreadArray([], __read(stateNode.activities.map(function(activity) {
          return start2(activity);
        }))), __read(stateNode.onEntry));
      })).concat(doneEvents.map(raise2)), flatten(Array.from(exitStates).map(function(stateNode) {
        return __spreadArray(__spreadArray([], __read(stateNode.onExit)), __read(stateNode.activities.map(function(activity) {
          return stop2(activity);
        })));
      }))], 2), entryActions = _c[0], exitActions = _c[1];
      var actions = toActionObjects(exitActions.concat(transition.actions).concat(entryActions), this.machine.options.actions);
      return actions;
    };
    StateNode2.prototype.transition = function(state, event2, context) {
      if (state === void 0) {
        state = this.initialState;
      }
      var _event = toSCXMLEvent(event2);
      var currentState;
      if (state instanceof State) {
        currentState = context === void 0 ? state : this.resolveState(State.from(state, context));
      } else {
        var resolvedStateValue = isString(state) ? this.resolve(pathToStateValue(this.getResolvedPath(state))) : this.resolve(state);
        var resolvedContext = context !== null && context !== void 0 ? context : this.machine.context;
        currentState = this.resolveState(State.from(resolvedStateValue, resolvedContext));
      }
      if (!IS_PRODUCTION && _event.name === WILDCARD) {
        throw new Error("An event cannot have the wildcard type ('" + WILDCARD + "')");
      }
      if (this.strict) {
        if (!this.events.includes(_event.name) && !isBuiltInEvent(_event.name)) {
          throw new Error("Machine '" + this.id + "' does not accept event '" + _event.name + "'");
        }
      }
      var stateTransition = this._transition(currentState.value, currentState, _event) || {
        transitions: [],
        configuration: [],
        entrySet: [],
        exitSet: [],
        source: currentState,
        actions: []
      };
      var prevConfig = getConfiguration([], this.getStateNodes(currentState.value));
      var resolvedConfig = stateTransition.configuration.length ? getConfiguration(prevConfig, stateTransition.configuration) : prevConfig;
      stateTransition.configuration = __spreadArray([], __read(resolvedConfig));
      return this.resolveTransition(stateTransition, currentState, _event);
    };
    StateNode2.prototype.resolveRaisedTransition = function(state, _event, originalEvent) {
      var _a;
      var currentActions = state.actions;
      state = this.transition(state, _event);
      state._event = originalEvent;
      state.event = originalEvent.data;
      (_a = state.actions).unshift.apply(_a, __spreadArray([], __read(currentActions)));
      return state;
    };
    StateNode2.prototype.resolveTransition = function(stateTransition, currentState, _event, context) {
      var e_6, _a;
      var _this = this;
      if (_event === void 0) {
        _event = initEvent;
      }
      if (context === void 0) {
        context = this.machine.context;
      }
      var configuration = stateTransition.configuration;
      var willTransition = !currentState || stateTransition.transitions.length > 0;
      var resolvedStateValue = willTransition ? getValue(this.machine, configuration) : void 0;
      var historyValue = currentState ? currentState.historyValue ? currentState.historyValue : stateTransition.source ? this.machine.historyValue(currentState.value) : void 0 : void 0;
      var currentContext = currentState ? currentState.context : context;
      var actions = this.getActions(stateTransition, currentContext, _event, currentState);
      var activities = currentState ? __assign({}, currentState.activities) : {};
      try {
        for (var actions_1 = __values(actions), actions_1_1 = actions_1.next(); !actions_1_1.done; actions_1_1 = actions_1.next()) {
          var action = actions_1_1.value;
          if (action.type === start) {
            activities[action.activity.id || action.activity.type] = action;
          } else if (action.type === stop) {
            activities[action.activity.id || action.activity.type] = false;
          }
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1
        };
      } finally {
        try {
          if (actions_1_1 && !actions_1_1.done && (_a = actions_1.return))
            _a.call(actions_1);
        } finally {
          if (e_6)
            throw e_6.error;
        }
      }
      var _b = __read(resolveActions(this, currentState, currentContext, _event, actions, this.machine.config.preserveActionOrder), 2), resolvedActions = _b[0], updatedContext = _b[1];
      var _c = __read(partition(resolvedActions, function(action2) {
        return action2.type === raise || action2.type === send && action2.to === SpecialTargets.Internal;
      }), 2), raisedEvents = _c[0], nonRaisedActions = _c[1];
      var invokeActions = resolvedActions.filter(function(action2) {
        var _a2;
        return action2.type === start && ((_a2 = action2.activity) === null || _a2 === void 0 ? void 0 : _a2.type) === invoke;
      });
      var children2 = invokeActions.reduce(function(acc, action2) {
        acc[action2.activity.id] = createInvocableActor(action2.activity, _this.machine, updatedContext, _event);
        return acc;
      }, currentState ? __assign({}, currentState.children) : {});
      var resolvedConfiguration = resolvedStateValue ? stateTransition.configuration : currentState ? currentState.configuration : [];
      var isDone = isInFinalState(resolvedConfiguration, this);
      var nextState = new State({
        value: resolvedStateValue || currentState.value,
        context: updatedContext,
        _event,
        _sessionid: currentState ? currentState._sessionid : null,
        historyValue: resolvedStateValue ? historyValue ? updateHistoryValue(historyValue, resolvedStateValue) : void 0 : currentState ? currentState.historyValue : void 0,
        history: !resolvedStateValue || stateTransition.source ? currentState : void 0,
        actions: resolvedStateValue ? nonRaisedActions : [],
        activities: resolvedStateValue ? activities : currentState ? currentState.activities : {},
        events: [],
        configuration: resolvedConfiguration,
        transitions: stateTransition.transitions,
        children: children2,
        done: isDone,
        tags: currentState === null || currentState === void 0 ? void 0 : currentState.tags
      });
      var didUpdateContext = currentContext !== updatedContext;
      nextState.changed = _event.name === update || didUpdateContext;
      var history = nextState.history;
      if (history) {
        delete history.history;
      }
      var isTransient = !isDone && (this._transient || configuration.some(function(stateNode) {
        return stateNode._transient;
      }));
      if (!willTransition && (!isTransient || _event.name === NULL_EVENT)) {
        return nextState;
      }
      var maybeNextState = nextState;
      if (!isDone) {
        if (isTransient) {
          maybeNextState = this.resolveRaisedTransition(maybeNextState, {
            type: nullEvent
          }, _event);
        }
        while (raisedEvents.length) {
          var raisedEvent = raisedEvents.shift();
          maybeNextState = this.resolveRaisedTransition(maybeNextState, raisedEvent._event, _event);
        }
      }
      var changed = maybeNextState.changed || (history ? !!maybeNextState.actions.length || didUpdateContext || typeof history.value !== typeof maybeNextState.value || !stateValuesEqual(maybeNextState.value, history.value) : void 0);
      maybeNextState.changed = changed;
      maybeNextState.history = history;
      maybeNextState.tags = new Set(flatten(maybeNextState.configuration.map(function(sn) {
        return sn.tags;
      })));
      return maybeNextState;
    };
    StateNode2.prototype.getStateNode = function(stateKey) {
      if (isStateId(stateKey)) {
        return this.machine.getStateNodeById(stateKey);
      }
      if (!this.states) {
        throw new Error("Unable to retrieve child state '" + stateKey + "' from '" + this.id + "'; no child states exist.");
      }
      var result = this.states[stateKey];
      if (!result) {
        throw new Error("Child state '" + stateKey + "' does not exist on '" + this.id + "'");
      }
      return result;
    };
    StateNode2.prototype.getStateNodeById = function(stateId) {
      var resolvedStateId = isStateId(stateId) ? stateId.slice(STATE_IDENTIFIER.length) : stateId;
      if (resolvedStateId === this.id) {
        return this;
      }
      var stateNode = this.machine.idMap[resolvedStateId];
      if (!stateNode) {
        throw new Error("Child state node '#" + resolvedStateId + "' does not exist on machine '" + this.id + "'");
      }
      return stateNode;
    };
    StateNode2.prototype.getStateNodeByPath = function(statePath) {
      if (typeof statePath === "string" && isStateId(statePath)) {
        try {
          return this.getStateNodeById(statePath.slice(1));
        } catch (e) {
        }
      }
      var arrayStatePath = toStatePath(statePath, this.delimiter).slice();
      var currentStateNode = this;
      while (arrayStatePath.length) {
        var key = arrayStatePath.shift();
        if (!key.length) {
          break;
        }
        currentStateNode = currentStateNode.getStateNode(key);
      }
      return currentStateNode;
    };
    StateNode2.prototype.resolve = function(stateValue) {
      var _a;
      var _this = this;
      if (!stateValue) {
        return this.initialStateValue || EMPTY_OBJECT;
      }
      switch (this.type) {
        case "parallel":
          return mapValues(this.initialStateValue, function(subStateValue, subStateKey) {
            return subStateValue ? _this.getStateNode(subStateKey).resolve(stateValue[subStateKey] || subStateValue) : EMPTY_OBJECT;
          });
        case "compound":
          if (isString(stateValue)) {
            var subStateNode = this.getStateNode(stateValue);
            if (subStateNode.type === "parallel" || subStateNode.type === "compound") {
              return _a = {}, _a[stateValue] = subStateNode.initialStateValue, _a;
            }
            return stateValue;
          }
          if (!keys(stateValue).length) {
            return this.initialStateValue || {};
          }
          return mapValues(stateValue, function(subStateValue, subStateKey) {
            return subStateValue ? _this.getStateNode(subStateKey).resolve(subStateValue) : EMPTY_OBJECT;
          });
        default:
          return stateValue || EMPTY_OBJECT;
      }
    };
    StateNode2.prototype.getResolvedPath = function(stateIdentifier) {
      if (isStateId(stateIdentifier)) {
        var stateNode = this.machine.idMap[stateIdentifier.slice(STATE_IDENTIFIER.length)];
        if (!stateNode) {
          throw new Error("Unable to find state node '" + stateIdentifier + "'");
        }
        return stateNode.path;
      }
      return toStatePath(stateIdentifier, this.delimiter);
    };
    Object.defineProperty(StateNode2.prototype, "initialStateValue", {
      get: function() {
        var _a;
        if (this.__cache.initialStateValue) {
          return this.__cache.initialStateValue;
        }
        var initialStateValue;
        if (this.type === "parallel") {
          initialStateValue = mapFilterValues(this.states, function(state) {
            return state.initialStateValue || EMPTY_OBJECT;
          }, function(stateNode) {
            return !(stateNode.type === "history");
          });
        } else if (this.initial !== void 0) {
          if (!this.states[this.initial]) {
            throw new Error("Initial state '" + this.initial + "' not found on '" + this.key + "'");
          }
          initialStateValue = isLeafNode(this.states[this.initial]) ? this.initial : (_a = {}, _a[this.initial] = this.states[this.initial].initialStateValue, _a);
        } else {
          initialStateValue = {};
        }
        this.__cache.initialStateValue = initialStateValue;
        return this.__cache.initialStateValue;
      },
      enumerable: false,
      configurable: true
    });
    StateNode2.prototype.getInitialState = function(stateValue, context) {
      var configuration = this.getStateNodes(stateValue);
      return this.resolveTransition({
        configuration,
        entrySet: configuration,
        exitSet: [],
        transitions: [],
        source: void 0,
        actions: []
      }, void 0, void 0, context);
    };
    Object.defineProperty(StateNode2.prototype, "initialState", {
      get: function() {
        this._init();
        var initialStateValue = this.initialStateValue;
        if (!initialStateValue) {
          throw new Error("Cannot retrieve initial state from simple state '" + this.id + "'.");
        }
        return this.getInitialState(initialStateValue);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(StateNode2.prototype, "target", {
      get: function() {
        var target;
        if (this.type === "history") {
          var historyConfig = this.config;
          if (isString(historyConfig.target)) {
            target = isStateId(historyConfig.target) ? pathToStateValue(this.machine.getStateNodeById(historyConfig.target).path.slice(this.path.length - 1)) : historyConfig.target;
          } else {
            target = historyConfig.target;
          }
        }
        return target;
      },
      enumerable: false,
      configurable: true
    });
    StateNode2.prototype.getRelativeStateNodes = function(relativeStateId, historyValue, resolve2) {
      if (resolve2 === void 0) {
        resolve2 = true;
      }
      return resolve2 ? relativeStateId.type === "history" ? relativeStateId.resolveHistory(historyValue) : relativeStateId.initialStateNodes : [relativeStateId];
    };
    Object.defineProperty(StateNode2.prototype, "initialStateNodes", {
      get: function() {
        var _this = this;
        if (isLeafNode(this)) {
          return [this];
        }
        if (this.type === "compound" && !this.initial) {
          if (!IS_PRODUCTION) {
            warn(false, "Compound state node '" + this.id + "' has no initial state.");
          }
          return [this];
        }
        var initialStateNodePaths = toStatePaths(this.initialStateValue);
        return flatten(initialStateNodePaths.map(function(initialPath) {
          return _this.getFromRelativePath(initialPath);
        }));
      },
      enumerable: false,
      configurable: true
    });
    StateNode2.prototype.getFromRelativePath = function(relativePath) {
      if (!relativePath.length) {
        return [this];
      }
      var _a = __read(relativePath), stateKey = _a[0], childStatePath = _a.slice(1);
      if (!this.states) {
        throw new Error("Cannot retrieve subPath '" + stateKey + "' from node with no states");
      }
      var childStateNode = this.getStateNode(stateKey);
      if (childStateNode.type === "history") {
        return childStateNode.resolveHistory();
      }
      if (!this.states[stateKey]) {
        throw new Error("Child state '" + stateKey + "' does not exist on '" + this.id + "'");
      }
      return this.states[stateKey].getFromRelativePath(childStatePath);
    };
    StateNode2.prototype.historyValue = function(relativeStateValue) {
      if (!keys(this.states).length) {
        return void 0;
      }
      return {
        current: relativeStateValue || this.initialStateValue,
        states: mapFilterValues(this.states, function(stateNode, key) {
          if (!relativeStateValue) {
            return stateNode.historyValue();
          }
          var subStateValue = isString(relativeStateValue) ? void 0 : relativeStateValue[key];
          return stateNode.historyValue(subStateValue || stateNode.initialStateValue);
        }, function(stateNode) {
          return !stateNode.history;
        })
      };
    };
    StateNode2.prototype.resolveHistory = function(historyValue) {
      var _this = this;
      if (this.type !== "history") {
        return [this];
      }
      var parent = this.parent;
      if (!historyValue) {
        var historyTarget = this.target;
        return historyTarget ? flatten(toStatePaths(historyTarget).map(function(relativeChildPath) {
          return parent.getFromRelativePath(relativeChildPath);
        })) : parent.initialStateNodes;
      }
      var subHistoryValue = nestedPath(parent.path, "states")(historyValue).current;
      if (isString(subHistoryValue)) {
        return [parent.getStateNode(subHistoryValue)];
      }
      return flatten(toStatePaths(subHistoryValue).map(function(subStatePath) {
        return _this.history === "deep" ? parent.getFromRelativePath(subStatePath) : [parent.states[subStatePath[0]]];
      }));
    };
    Object.defineProperty(StateNode2.prototype, "stateIds", {
      get: function() {
        var _this = this;
        var childStateIds = flatten(keys(this.states).map(function(stateKey) {
          return _this.states[stateKey].stateIds;
        }));
        return [this.id].concat(childStateIds);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(StateNode2.prototype, "events", {
      get: function() {
        var e_7, _a, e_8, _b;
        if (this.__cache.events) {
          return this.__cache.events;
        }
        var states = this.states;
        var events = new Set(this.ownEvents);
        if (states) {
          try {
            for (var _c = __values(keys(states)), _d = _c.next(); !_d.done; _d = _c.next()) {
              var stateId = _d.value;
              var state = states[stateId];
              if (state.states) {
                try {
                  for (var _e = (e_8 = void 0, __values(state.events)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var event_1 = _f.value;
                    events.add("" + event_1);
                  }
                } catch (e_8_1) {
                  e_8 = {
                    error: e_8_1
                  };
                } finally {
                  try {
                    if (_f && !_f.done && (_b = _e.return))
                      _b.call(_e);
                  } finally {
                    if (e_8)
                      throw e_8.error;
                  }
                }
              }
            }
          } catch (e_7_1) {
            e_7 = {
              error: e_7_1
            };
          } finally {
            try {
              if (_d && !_d.done && (_a = _c.return))
                _a.call(_c);
            } finally {
              if (e_7)
                throw e_7.error;
            }
          }
        }
        return this.__cache.events = Array.from(events);
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(StateNode2.prototype, "ownEvents", {
      get: function() {
        var events = new Set(this.transitions.filter(function(transition) {
          return !(!transition.target && !transition.actions.length && transition.internal);
        }).map(function(transition) {
          return transition.eventType;
        }));
        return Array.from(events);
      },
      enumerable: false,
      configurable: true
    });
    StateNode2.prototype.resolveTarget = function(_target) {
      var _this = this;
      if (_target === void 0) {
        return void 0;
      }
      return _target.map(function(target) {
        if (!isString(target)) {
          return target;
        }
        var isInternalTarget = target[0] === _this.delimiter;
        if (isInternalTarget && !_this.parent) {
          return _this.getStateNodeByPath(target.slice(1));
        }
        var resolvedTarget = isInternalTarget ? _this.key + target : target;
        if (_this.parent) {
          try {
            var targetStateNode = _this.parent.getStateNodeByPath(resolvedTarget);
            return targetStateNode;
          } catch (err) {
            throw new Error("Invalid transition definition for state node '" + _this.id + "':\n" + err.message);
          }
        } else {
          return _this.getStateNodeByPath(resolvedTarget);
        }
      });
    };
    StateNode2.prototype.formatTransition = function(transitionConfig) {
      var _this = this;
      var normalizedTarget = normalizeTarget(transitionConfig.target);
      var internal = "internal" in transitionConfig ? transitionConfig.internal : normalizedTarget ? normalizedTarget.some(function(_target) {
        return isString(_target) && _target[0] === _this.delimiter;
      }) : true;
      var guards = this.machine.options.guards;
      var target = this.resolveTarget(normalizedTarget);
      var transition = __assign(__assign({}, transitionConfig), {
        actions: toActionObjects(toArray(transitionConfig.actions)),
        cond: toGuard(transitionConfig.cond, guards),
        target,
        source: this,
        internal,
        eventType: transitionConfig.event,
        toJSON: function() {
          return __assign(__assign({}, transition), {
            target: transition.target ? transition.target.map(function(t) {
              return "#" + t.id;
            }) : void 0,
            source: "#" + _this.id
          });
        }
      });
      return transition;
    };
    StateNode2.prototype.formatTransitions = function() {
      var e_9, _a;
      var _this = this;
      var onConfig;
      if (!this.config.on) {
        onConfig = [];
      } else if (Array.isArray(this.config.on)) {
        onConfig = this.config.on;
      } else {
        var _b = this.config.on, _c = WILDCARD, _d = _b[_c], wildcardConfigs = _d === void 0 ? [] : _d, strictTransitionConfigs_1 = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
        onConfig = flatten(keys(strictTransitionConfigs_1).map(function(key) {
          if (!IS_PRODUCTION && key === NULL_EVENT) {
            warn(false, "Empty string transition configs (e.g., `{ on: { '': ... }}`) for transient transitions are deprecated. Specify the transition in the `{ always: ... }` property instead. " + ('Please check the `on` configuration for "#' + _this.id + '".'));
          }
          var transitionConfigArray = toTransitionConfigArray(key, strictTransitionConfigs_1[key]);
          if (!IS_PRODUCTION) {
            validateArrayifiedTransitions(_this, key, transitionConfigArray);
          }
          return transitionConfigArray;
        }).concat(toTransitionConfigArray(WILDCARD, wildcardConfigs)));
      }
      var eventlessConfig = this.config.always ? toTransitionConfigArray("", this.config.always) : [];
      var doneConfig = this.config.onDone ? toTransitionConfigArray(String(done(this.id)), this.config.onDone) : [];
      if (!IS_PRODUCTION) {
        warn(!(this.config.onDone && !this.parent), 'Root nodes cannot have an ".onDone" transition. Please check the config of "' + this.id + '".');
      }
      var invokeConfig = flatten(this.invoke.map(function(invokeDef) {
        var settleTransitions = [];
        if (invokeDef.onDone) {
          settleTransitions.push.apply(settleTransitions, __spreadArray([], __read(toTransitionConfigArray(String(doneInvoke(invokeDef.id)), invokeDef.onDone))));
        }
        if (invokeDef.onError) {
          settleTransitions.push.apply(settleTransitions, __spreadArray([], __read(toTransitionConfigArray(String(error2(invokeDef.id)), invokeDef.onError))));
        }
        return settleTransitions;
      }));
      var delayedTransitions = this.after;
      var formattedTransitions = flatten(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(doneConfig)), __read(invokeConfig)), __read(onConfig)), __read(eventlessConfig)).map(function(transitionConfig) {
        return toArray(transitionConfig).map(function(transition) {
          return _this.formatTransition(transition);
        });
      }));
      try {
        for (var delayedTransitions_1 = __values(delayedTransitions), delayedTransitions_1_1 = delayedTransitions_1.next(); !delayedTransitions_1_1.done; delayedTransitions_1_1 = delayedTransitions_1.next()) {
          var delayedTransition = delayedTransitions_1_1.value;
          formattedTransitions.push(delayedTransition);
        }
      } catch (e_9_1) {
        e_9 = {
          error: e_9_1
        };
      } finally {
        try {
          if (delayedTransitions_1_1 && !delayedTransitions_1_1.done && (_a = delayedTransitions_1.return))
            _a.call(delayedTransitions_1);
        } finally {
          if (e_9)
            throw e_9.error;
        }
      }
      return formattedTransitions;
    };
    return StateNode2;
  }();

  // node_modules/xstate/es/Machine.js
  function createMachine(config, options2) {
    return new StateNode(config, options2);
  }

  // node_modules/xstate/es/scheduler.js
  var defaultOptions = {
    deferEvents: false
  };
  var Scheduler = /* @__PURE__ */ function() {
    function Scheduler2(options2) {
      this.processingEvent = false;
      this.queue = [];
      this.initialized = false;
      this.options = __assign(__assign({}, defaultOptions), options2);
    }
    Scheduler2.prototype.initialize = function(callback) {
      this.initialized = true;
      if (callback) {
        if (!this.options.deferEvents) {
          this.schedule(callback);
          return;
        }
        this.process(callback);
      }
      this.flushEvents();
    };
    Scheduler2.prototype.schedule = function(task) {
      if (!this.initialized || this.processingEvent) {
        this.queue.push(task);
        return;
      }
      if (this.queue.length !== 0) {
        throw new Error("Event queue should be empty when it is not processing events");
      }
      this.process(task);
      this.flushEvents();
    };
    Scheduler2.prototype.clear = function() {
      this.queue = [];
    };
    Scheduler2.prototype.flushEvents = function() {
      var nextCallback = this.queue.shift();
      while (nextCallback) {
        this.process(nextCallback);
        nextCallback = this.queue.shift();
      }
    };
    Scheduler2.prototype.process = function(callback) {
      this.processingEvent = true;
      try {
        callback();
      } catch (e) {
        this.clear();
        throw e;
      } finally {
        this.processingEvent = false;
      }
    };
    return Scheduler2;
  }();

  // node_modules/xstate/es/registry.js
  var children = /* @__PURE__ */ new Map();
  var sessionIdIndex = 0;
  var registry = {
    bookId: function() {
      return "x:" + sessionIdIndex++;
    },
    register: function(id, actor) {
      children.set(id, actor);
      return id;
    },
    get: function(id) {
      return children.get(id);
    },
    free: function(id) {
      children.delete(id);
    }
  };

  // node_modules/xstate/es/devTools.js
  function getGlobal() {
    if (typeof self !== "undefined") {
      return self;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    return void 0;
  }
  function getDevTools() {
    var global2 = getGlobal();
    if (global2 && "__xstate__" in global2) {
      return global2.__xstate__;
    }
    return void 0;
  }
  function registerService(service) {
    if (!getGlobal()) {
      return;
    }
    var devTools = getDevTools();
    if (devTools) {
      devTools.register(service);
    }
  }

  // node_modules/xstate/es/behaviors.js
  function spawnBehavior(behavior, options2) {
    if (options2 === void 0) {
      options2 = {};
    }
    var state = behavior.initialState;
    var observers = new Set();
    var mailbox = [];
    var flushing = false;
    var flush = function() {
      if (flushing) {
        return;
      }
      flushing = true;
      while (mailbox.length > 0) {
        var event_1 = mailbox.shift();
        state = behavior.transition(state, event_1, actorCtx);
        observers.forEach(function(observer) {
          return observer.next(state);
        });
      }
      flushing = false;
    };
    var actor = toActorRef({
      id: options2.id,
      send: function(event2) {
        mailbox.push(event2);
        flush();
      },
      getSnapshot: function() {
        return state;
      },
      subscribe: function(next, handleError, complete) {
        var observer = toObserver(next, handleError, complete);
        observers.add(observer);
        observer.next(state);
        return {
          unsubscribe: function() {
            observers.delete(observer);
          }
        };
      }
    });
    var actorCtx = {
      parent: options2.parent,
      self: actor,
      id: options2.id || "anonymous",
      observers
    };
    state = behavior.start ? behavior.start(actorCtx) : state;
    return actor;
  }

  // node_modules/xstate/es/interpreter.js
  var DEFAULT_SPAWN_OPTIONS = {
    sync: false,
    autoForward: false
  };
  var InterpreterStatus;
  (function(InterpreterStatus2) {
    InterpreterStatus2[InterpreterStatus2["NotStarted"] = 0] = "NotStarted";
    InterpreterStatus2[InterpreterStatus2["Running"] = 1] = "Running";
    InterpreterStatus2[InterpreterStatus2["Stopped"] = 2] = "Stopped";
  })(InterpreterStatus || (InterpreterStatus = {}));
  var Interpreter = /* @__PURE__ */ function() {
    function Interpreter2(machine, options2) {
      var _this = this;
      if (options2 === void 0) {
        options2 = Interpreter2.defaultOptions;
      }
      this.machine = machine;
      this.scheduler = new Scheduler();
      this.delayedEventsMap = {};
      this.listeners = new Set();
      this.contextListeners = new Set();
      this.stopListeners = new Set();
      this.doneListeners = new Set();
      this.eventListeners = new Set();
      this.sendListeners = new Set();
      this.initialized = false;
      this.status = InterpreterStatus.NotStarted;
      this.children = new Map();
      this.forwardTo = new Set();
      this.init = this.start;
      this.send = function(event2, payload) {
        if (isArray(event2)) {
          _this.batch(event2);
          return _this.state;
        }
        var _event = toSCXMLEvent(toEventObject(event2, payload));
        if (_this.status === InterpreterStatus.Stopped) {
          if (!IS_PRODUCTION) {
            warn(false, 'Event "' + _event.name + '" was sent to stopped service "' + _this.machine.id + '". This service has already reached its final state, and will not transition.\nEvent: ' + JSON.stringify(_event.data));
          }
          return _this.state;
        }
        if (_this.status !== InterpreterStatus.Running && !_this.options.deferEvents) {
          throw new Error('Event "' + _event.name + '" was sent to uninitialized service "' + _this.machine.id + '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.\nEvent: ' + JSON.stringify(_event.data));
        }
        _this.scheduler.schedule(function() {
          _this.forward(_event);
          var nextState = _this.nextState(_event);
          _this.update(nextState, _event);
        });
        return _this._state;
      };
      this.sendTo = function(event2, to) {
        var isParent = _this.parent && (to === SpecialTargets.Parent || _this.parent.id === to);
        var target = isParent ? _this.parent : isString(to) ? _this.children.get(to) || registry.get(to) : isActor(to) ? to : void 0;
        if (!target) {
          if (!isParent) {
            throw new Error("Unable to send event to child '" + to + "' from service '" + _this.id + "'.");
          }
          if (!IS_PRODUCTION) {
            warn(false, "Service '" + _this.id + "' has no parent: unable to send event " + event2.type);
          }
          return;
        }
        if ("machine" in target) {
          target.send(__assign(__assign({}, event2), {
            name: event2.name === error ? "" + error2(_this.id) : event2.name,
            origin: _this.sessionId
          }));
        } else {
          target.send(event2.data);
        }
      };
      var resolvedOptions = __assign(__assign({}, Interpreter2.defaultOptions), options2);
      var clock = resolvedOptions.clock, logger = resolvedOptions.logger, parent = resolvedOptions.parent, id = resolvedOptions.id;
      var resolvedId = id !== void 0 ? id : machine.id;
      this.id = resolvedId;
      this.logger = logger;
      this.clock = clock;
      this.parent = parent;
      this.options = resolvedOptions;
      this.scheduler = new Scheduler({
        deferEvents: this.options.deferEvents
      });
      this.sessionId = registry.bookId();
    }
    Object.defineProperty(Interpreter2.prototype, "initialState", {
      get: function() {
        var _this = this;
        if (this._initialState) {
          return this._initialState;
        }
        return provide(this, function() {
          _this._initialState = _this.machine.initialState;
          return _this._initialState;
        });
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Interpreter2.prototype, "state", {
      get: function() {
        if (!IS_PRODUCTION) {
          warn(this.status !== InterpreterStatus.NotStarted, "Attempted to read state from uninitialized service '" + this.id + "'. Make sure the service is started first.");
        }
        return this._state;
      },
      enumerable: false,
      configurable: true
    });
    Interpreter2.prototype.execute = function(state, actionsConfig) {
      var e_1, _a;
      try {
        for (var _b = __values(state.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
          var action = _c.value;
          this.exec(action, state, actionsConfig);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    Interpreter2.prototype.update = function(state, _event) {
      var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
      var _this = this;
      state._sessionid = this.sessionId;
      this._state = state;
      if (this.options.execute) {
        this.execute(this.state);
      }
      this.children.forEach(function(child) {
        _this.state.children[child.id] = child;
      });
      if (this.devTools) {
        this.devTools.send(_event.data, state);
      }
      if (state.event) {
        try {
          for (var _e = __values(this.eventListeners), _f = _e.next(); !_f.done; _f = _e.next()) {
            var listener = _f.value;
            listener(state.event);
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (_f && !_f.done && (_a = _e.return))
              _a.call(_e);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      try {
        for (var _g = __values(this.listeners), _h = _g.next(); !_h.done; _h = _g.next()) {
          var listener = _h.value;
          listener(state, state.event);
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (_h && !_h.done && (_b = _g.return))
            _b.call(_g);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      try {
        for (var _j = __values(this.contextListeners), _k = _j.next(); !_k.done; _k = _j.next()) {
          var contextListener = _k.value;
          contextListener(this.state.context, this.state.history ? this.state.history.context : void 0);
        }
      } catch (e_4_1) {
        e_4 = {
          error: e_4_1
        };
      } finally {
        try {
          if (_k && !_k.done && (_c = _j.return))
            _c.call(_j);
        } finally {
          if (e_4)
            throw e_4.error;
        }
      }
      var isDone = isInFinalState(state.configuration || [], this.machine);
      if (this.state.configuration && isDone) {
        var finalChildStateNode = state.configuration.find(function(sn) {
          return sn.type === "final" && sn.parent === _this.machine;
        });
        var doneData = finalChildStateNode && finalChildStateNode.doneData ? mapContext(finalChildStateNode.doneData, state.context, _event) : void 0;
        try {
          for (var _l = __values(this.doneListeners), _m = _l.next(); !_m.done; _m = _l.next()) {
            var listener = _m.value;
            listener(doneInvoke(this.id, doneData));
          }
        } catch (e_5_1) {
          e_5 = {
            error: e_5_1
          };
        } finally {
          try {
            if (_m && !_m.done && (_d = _l.return))
              _d.call(_l);
          } finally {
            if (e_5)
              throw e_5.error;
          }
        }
        this.stop();
      }
    };
    Interpreter2.prototype.onTransition = function(listener) {
      this.listeners.add(listener);
      if (this.status === InterpreterStatus.Running) {
        listener(this.state, this.state.event);
      }
      return this;
    };
    Interpreter2.prototype.subscribe = function(nextListenerOrObserver, _, completeListener) {
      var _this = this;
      if (!nextListenerOrObserver) {
        return {
          unsubscribe: function() {
            return void 0;
          }
        };
      }
      var listener;
      var resolvedCompleteListener = completeListener;
      if (typeof nextListenerOrObserver === "function") {
        listener = nextListenerOrObserver;
      } else {
        listener = nextListenerOrObserver.next.bind(nextListenerOrObserver);
        resolvedCompleteListener = nextListenerOrObserver.complete.bind(nextListenerOrObserver);
      }
      this.listeners.add(listener);
      if (this.status === InterpreterStatus.Running) {
        listener(this.state);
      }
      if (resolvedCompleteListener) {
        this.onDone(resolvedCompleteListener);
      }
      return {
        unsubscribe: function() {
          listener && _this.listeners.delete(listener);
          resolvedCompleteListener && _this.doneListeners.delete(resolvedCompleteListener);
        }
      };
    };
    Interpreter2.prototype.onEvent = function(listener) {
      this.eventListeners.add(listener);
      return this;
    };
    Interpreter2.prototype.onSend = function(listener) {
      this.sendListeners.add(listener);
      return this;
    };
    Interpreter2.prototype.onChange = function(listener) {
      this.contextListeners.add(listener);
      return this;
    };
    Interpreter2.prototype.onStop = function(listener) {
      this.stopListeners.add(listener);
      return this;
    };
    Interpreter2.prototype.onDone = function(listener) {
      this.doneListeners.add(listener);
      return this;
    };
    Interpreter2.prototype.off = function(listener) {
      this.listeners.delete(listener);
      this.eventListeners.delete(listener);
      this.sendListeners.delete(listener);
      this.stopListeners.delete(listener);
      this.doneListeners.delete(listener);
      this.contextListeners.delete(listener);
      return this;
    };
    Interpreter2.prototype.start = function(initialState) {
      var _this = this;
      if (this.status === InterpreterStatus.Running) {
        return this;
      }
      registry.register(this.sessionId, this);
      this.initialized = true;
      this.status = InterpreterStatus.Running;
      var resolvedState = initialState === void 0 ? this.initialState : provide(this, function() {
        return isState(initialState) ? _this.machine.resolveState(initialState) : _this.machine.resolveState(State.from(initialState, _this.machine.context));
      });
      if (this.options.devTools) {
        this.attachDev();
      }
      this.scheduler.initialize(function() {
        _this.update(resolvedState, initEvent);
      });
      return this;
    };
    Interpreter2.prototype.stop = function() {
      var e_6, _a, e_7, _b, e_8, _c, e_9, _d, e_10, _e;
      var _this = this;
      try {
        for (var _f = __values(this.listeners), _g = _f.next(); !_g.done; _g = _f.next()) {
          var listener = _g.value;
          this.listeners.delete(listener);
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1
        };
      } finally {
        try {
          if (_g && !_g.done && (_a = _f.return))
            _a.call(_f);
        } finally {
          if (e_6)
            throw e_6.error;
        }
      }
      try {
        for (var _h = __values(this.stopListeners), _j = _h.next(); !_j.done; _j = _h.next()) {
          var listener = _j.value;
          listener();
          this.stopListeners.delete(listener);
        }
      } catch (e_7_1) {
        e_7 = {
          error: e_7_1
        };
      } finally {
        try {
          if (_j && !_j.done && (_b = _h.return))
            _b.call(_h);
        } finally {
          if (e_7)
            throw e_7.error;
        }
      }
      try {
        for (var _k = __values(this.contextListeners), _l = _k.next(); !_l.done; _l = _k.next()) {
          var listener = _l.value;
          this.contextListeners.delete(listener);
        }
      } catch (e_8_1) {
        e_8 = {
          error: e_8_1
        };
      } finally {
        try {
          if (_l && !_l.done && (_c = _k.return))
            _c.call(_k);
        } finally {
          if (e_8)
            throw e_8.error;
        }
      }
      try {
        for (var _m = __values(this.doneListeners), _o = _m.next(); !_o.done; _o = _m.next()) {
          var listener = _o.value;
          this.doneListeners.delete(listener);
        }
      } catch (e_9_1) {
        e_9 = {
          error: e_9_1
        };
      } finally {
        try {
          if (_o && !_o.done && (_d = _m.return))
            _d.call(_m);
        } finally {
          if (e_9)
            throw e_9.error;
        }
      }
      if (!this.initialized) {
        return this;
      }
      this.state.configuration.forEach(function(stateNode) {
        var e_11, _a2;
        try {
          for (var _b2 = __values(stateNode.definition.exit), _c2 = _b2.next(); !_c2.done; _c2 = _b2.next()) {
            var action = _c2.value;
            _this.exec(action, _this.state);
          }
        } catch (e_11_1) {
          e_11 = {
            error: e_11_1
          };
        } finally {
          try {
            if (_c2 && !_c2.done && (_a2 = _b2.return))
              _a2.call(_b2);
          } finally {
            if (e_11)
              throw e_11.error;
          }
        }
      });
      this.children.forEach(function(child) {
        if (isFunction(child.stop)) {
          child.stop();
        }
      });
      try {
        for (var _p = __values(keys(this.delayedEventsMap)), _q = _p.next(); !_q.done; _q = _p.next()) {
          var key = _q.value;
          this.clock.clearTimeout(this.delayedEventsMap[key]);
        }
      } catch (e_10_1) {
        e_10 = {
          error: e_10_1
        };
      } finally {
        try {
          if (_q && !_q.done && (_e = _p.return))
            _e.call(_p);
        } finally {
          if (e_10)
            throw e_10.error;
        }
      }
      this.scheduler.clear();
      this.initialized = false;
      this.status = InterpreterStatus.Stopped;
      registry.free(this.sessionId);
      return this;
    };
    Interpreter2.prototype.batch = function(events) {
      var _this = this;
      if (this.status === InterpreterStatus.NotStarted && this.options.deferEvents) {
        if (!IS_PRODUCTION) {
          warn(false, events.length + ' event(s) were sent to uninitialized service "' + this.machine.id + '" and are deferred. Make sure .start() is called for this service.\nEvent: ' + JSON.stringify(event));
        }
      } else if (this.status !== InterpreterStatus.Running) {
        throw new Error(events.length + ' event(s) were sent to uninitialized service "' + this.machine.id + '". Make sure .start() is called for this service, or set { deferEvents: true } in the service options.');
      }
      this.scheduler.schedule(function() {
        var e_12, _a;
        var nextState = _this.state;
        var batchChanged = false;
        var batchedActions = [];
        var _loop_1 = function(event_12) {
          var _event = toSCXMLEvent(event_12);
          _this.forward(_event);
          nextState = provide(_this, function() {
            return _this.machine.transition(nextState, _event);
          });
          batchedActions.push.apply(batchedActions, __spreadArray([], __read(nextState.actions.map(function(a) {
            return bindActionToState(a, nextState);
          }))));
          batchChanged = batchChanged || !!nextState.changed;
        };
        try {
          for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
            var event_1 = events_1_1.value;
            _loop_1(event_1);
          }
        } catch (e_12_1) {
          e_12 = {
            error: e_12_1
          };
        } finally {
          try {
            if (events_1_1 && !events_1_1.done && (_a = events_1.return))
              _a.call(events_1);
          } finally {
            if (e_12)
              throw e_12.error;
          }
        }
        nextState.changed = batchChanged;
        nextState.actions = batchedActions;
        _this.update(nextState, toSCXMLEvent(events[events.length - 1]));
      });
    };
    Interpreter2.prototype.sender = function(event2) {
      return this.send.bind(this, event2);
    };
    Interpreter2.prototype.nextState = function(event2) {
      var _this = this;
      var _event = toSCXMLEvent(event2);
      if (_event.name.indexOf(errorPlatform) === 0 && !this.state.nextEvents.some(function(nextEvent) {
        return nextEvent.indexOf(errorPlatform) === 0;
      })) {
        throw _event.data.data;
      }
      var nextState = provide(this, function() {
        return _this.machine.transition(_this.state, _event);
      });
      return nextState;
    };
    Interpreter2.prototype.forward = function(event2) {
      var e_13, _a;
      try {
        for (var _b = __values(this.forwardTo), _c = _b.next(); !_c.done; _c = _b.next()) {
          var id = _c.value;
          var child = this.children.get(id);
          if (!child) {
            throw new Error("Unable to forward event '" + event2 + "' from interpreter '" + this.id + "' to nonexistant child '" + id + "'.");
          }
          child.send(event2);
        }
      } catch (e_13_1) {
        e_13 = {
          error: e_13_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_13)
            throw e_13.error;
        }
      }
    };
    Interpreter2.prototype.defer = function(sendAction) {
      var _this = this;
      this.delayedEventsMap[sendAction.id] = this.clock.setTimeout(function() {
        if (sendAction.to) {
          _this.sendTo(sendAction._event, sendAction.to);
        } else {
          _this.send(sendAction._event);
        }
      }, sendAction.delay);
    };
    Interpreter2.prototype.cancel = function(sendId) {
      this.clock.clearTimeout(this.delayedEventsMap[sendId]);
      delete this.delayedEventsMap[sendId];
    };
    Interpreter2.prototype.exec = function(action, state, actionFunctionMap) {
      if (actionFunctionMap === void 0) {
        actionFunctionMap = this.machine.options.actions;
      }
      var context = state.context, _event = state._event;
      var actionOrExec = action.exec || getActionFunction(action.type, actionFunctionMap);
      var exec = isFunction(actionOrExec) ? actionOrExec : actionOrExec ? actionOrExec.exec : action.exec;
      if (exec) {
        try {
          return exec(context, _event.data, {
            action,
            state: this.state,
            _event
          });
        } catch (err) {
          if (this.parent) {
            this.parent.send({
              type: "xstate.error",
              data: err
            });
          }
          throw err;
        }
      }
      switch (action.type) {
        case send:
          var sendAction = action;
          if (typeof sendAction.delay === "number") {
            this.defer(sendAction);
            return;
          } else {
            if (sendAction.to) {
              this.sendTo(sendAction._event, sendAction.to);
            } else {
              this.send(sendAction._event);
            }
          }
          break;
        case cancel:
          this.cancel(action.sendId);
          break;
        case start: {
          var activity = action.activity;
          if (!this.state.activities[activity.id || activity.type]) {
            break;
          }
          if (activity.type === ActionTypes.Invoke) {
            var invokeSource = toInvokeSource(activity.src);
            var serviceCreator = this.machine.options.services ? this.machine.options.services[invokeSource.type] : void 0;
            var id = activity.id, data = activity.data;
            if (!IS_PRODUCTION) {
              warn(!("forward" in activity), "`forward` property is deprecated (found in invocation of '" + activity.src + "' in in machine '" + this.machine.id + "'). Please use `autoForward` instead.");
            }
            var autoForward = "autoForward" in activity ? activity.autoForward : !!activity.forward;
            if (!serviceCreator) {
              if (!IS_PRODUCTION) {
                warn(false, "No service found for invocation '" + activity.src + "' in machine '" + this.machine.id + "'.");
              }
              return;
            }
            var resolvedData = data ? mapContext(data, context, _event) : void 0;
            if (typeof serviceCreator === "string") {
              return;
            }
            var source = isFunction(serviceCreator) ? serviceCreator(context, _event.data, {
              data: resolvedData,
              src: invokeSource
            }) : serviceCreator;
            if (!source) {
              return;
            }
            var options2 = void 0;
            if (isMachine(source)) {
              source = resolvedData ? source.withContext(resolvedData) : source;
              options2 = {
                autoForward
              };
            }
            this.spawn(source, id, options2);
          } else {
            this.spawnActivity(activity);
          }
          break;
        }
        case stop: {
          this.stopChild(action.activity.id);
          break;
        }
        case log:
          var label = action.label, value = action.value;
          if (label) {
            this.logger(label, value);
          } else {
            this.logger(value);
          }
          break;
        default:
          if (!IS_PRODUCTION) {
            warn(false, "No implementation found for action type '" + action.type + "'");
          }
          break;
      }
      return void 0;
    };
    Interpreter2.prototype.removeChild = function(childId) {
      var _a;
      this.children.delete(childId);
      this.forwardTo.delete(childId);
      (_a = this.state) === null || _a === void 0 ? true : delete _a.children[childId];
    };
    Interpreter2.prototype.stopChild = function(childId) {
      var child = this.children.get(childId);
      if (!child) {
        return;
      }
      this.removeChild(childId);
      if (isFunction(child.stop)) {
        child.stop();
      }
    };
    Interpreter2.prototype.spawn = function(entity, name, options2) {
      if (isPromiseLike(entity)) {
        return this.spawnPromise(Promise.resolve(entity), name);
      } else if (isFunction(entity)) {
        return this.spawnCallback(entity, name);
      } else if (isSpawnedActor(entity)) {
        return this.spawnActor(entity, name);
      } else if (isObservable(entity)) {
        return this.spawnObservable(entity, name);
      } else if (isMachine(entity)) {
        return this.spawnMachine(entity, __assign(__assign({}, options2), {
          id: name
        }));
      } else if (isBehavior(entity)) {
        return this.spawnBehavior(entity, name);
      } else {
        throw new Error('Unable to spawn entity "' + name + '" of type "' + typeof entity + '".');
      }
    };
    Interpreter2.prototype.spawnMachine = function(machine, options2) {
      var _this = this;
      if (options2 === void 0) {
        options2 = {};
      }
      var childService = new Interpreter2(machine, __assign(__assign({}, this.options), {
        parent: this,
        id: options2.id || machine.id
      }));
      var resolvedOptions = __assign(__assign({}, DEFAULT_SPAWN_OPTIONS), options2);
      if (resolvedOptions.sync) {
        childService.onTransition(function(state) {
          _this.send(update, {
            state,
            id: childService.id
          });
        });
      }
      var actor = childService;
      this.children.set(childService.id, actor);
      if (resolvedOptions.autoForward) {
        this.forwardTo.add(childService.id);
      }
      childService.onDone(function(doneEvent) {
        _this.removeChild(childService.id);
        _this.send(toSCXMLEvent(doneEvent, {
          origin: childService.id
        }));
      }).start();
      return actor;
    };
    Interpreter2.prototype.spawnBehavior = function(behavior, id) {
      var actorRef = spawnBehavior(behavior, {
        id,
        parent: this
      });
      this.children.set(id, actorRef);
      return actorRef;
    };
    Interpreter2.prototype.spawnPromise = function(promise, id) {
      var _this = this;
      var canceled = false;
      var resolvedData;
      promise.then(function(response) {
        if (!canceled) {
          resolvedData = response;
          _this.removeChild(id);
          _this.send(toSCXMLEvent(doneInvoke(id, response), {
            origin: id
          }));
        }
      }, function(errorData) {
        if (!canceled) {
          _this.removeChild(id);
          var errorEvent = error2(id, errorData);
          try {
            _this.send(toSCXMLEvent(errorEvent, {
              origin: id
            }));
          } catch (error4) {
            reportUnhandledExceptionOnInvocation(errorData, error4, id);
            if (_this.devTools) {
              _this.devTools.send(errorEvent, _this.state);
            }
            if (_this.machine.strict) {
              _this.stop();
            }
          }
        }
      });
      var actor = {
        id,
        send: function() {
          return void 0;
        },
        subscribe: function(next, handleError, complete) {
          var observer = toObserver(next, handleError, complete);
          var unsubscribed = false;
          promise.then(function(response) {
            if (unsubscribed) {
              return;
            }
            observer.next(response);
            if (unsubscribed) {
              return;
            }
            observer.complete();
          }, function(err) {
            if (unsubscribed) {
              return;
            }
            observer.error(err);
          });
          return {
            unsubscribe: function() {
              return unsubscribed = true;
            }
          };
        },
        stop: function() {
          canceled = true;
        },
        toJSON: function() {
          return {
            id
          };
        },
        getSnapshot: function() {
          return resolvedData;
        }
      };
      this.children.set(id, actor);
      return actor;
    };
    Interpreter2.prototype.spawnCallback = function(callback, id) {
      var _this = this;
      var canceled = false;
      var receivers = new Set();
      var listeners = new Set();
      var emitted;
      var receive = function(e) {
        emitted = e;
        listeners.forEach(function(listener) {
          return listener(e);
        });
        if (canceled) {
          return;
        }
        _this.send(toSCXMLEvent(e, {
          origin: id
        }));
      };
      var callbackStop;
      try {
        callbackStop = callback(receive, function(newListener) {
          receivers.add(newListener);
        });
      } catch (err) {
        this.send(error2(id, err));
      }
      if (isPromiseLike(callbackStop)) {
        return this.spawnPromise(callbackStop, id);
      }
      var actor = {
        id,
        send: function(event2) {
          return receivers.forEach(function(receiver) {
            return receiver(event2);
          });
        },
        subscribe: function(next) {
          listeners.add(next);
          return {
            unsubscribe: function() {
              listeners.delete(next);
            }
          };
        },
        stop: function() {
          canceled = true;
          if (isFunction(callbackStop)) {
            callbackStop();
          }
        },
        toJSON: function() {
          return {
            id
          };
        },
        getSnapshot: function() {
          return emitted;
        }
      };
      this.children.set(id, actor);
      return actor;
    };
    Interpreter2.prototype.spawnObservable = function(source, id) {
      var _this = this;
      var emitted;
      var subscription = source.subscribe(function(value) {
        emitted = value;
        _this.send(toSCXMLEvent(value, {
          origin: id
        }));
      }, function(err) {
        _this.removeChild(id);
        _this.send(toSCXMLEvent(error2(id, err), {
          origin: id
        }));
      }, function() {
        _this.removeChild(id);
        _this.send(toSCXMLEvent(doneInvoke(id), {
          origin: id
        }));
      });
      var actor = {
        id,
        send: function() {
          return void 0;
        },
        subscribe: function(next, handleError, complete) {
          return source.subscribe(next, handleError, complete);
        },
        stop: function() {
          return subscription.unsubscribe();
        },
        getSnapshot: function() {
          return emitted;
        },
        toJSON: function() {
          return {
            id
          };
        }
      };
      this.children.set(id, actor);
      return actor;
    };
    Interpreter2.prototype.spawnActor = function(actor, name) {
      this.children.set(name, actor);
      return actor;
    };
    Interpreter2.prototype.spawnActivity = function(activity) {
      var implementation = this.machine.options && this.machine.options.activities ? this.machine.options.activities[activity.type] : void 0;
      if (!implementation) {
        if (!IS_PRODUCTION) {
          warn(false, "No implementation found for activity '" + activity.type + "'");
        }
        return;
      }
      var dispose = implementation(this.state.context, activity);
      this.spawnEffect(activity.id, dispose);
    };
    Interpreter2.prototype.spawnEffect = function(id, dispose) {
      this.children.set(id, {
        id,
        send: function() {
          return void 0;
        },
        subscribe: function() {
          return {
            unsubscribe: function() {
              return void 0;
            }
          };
        },
        stop: dispose || void 0,
        getSnapshot: function() {
          return void 0;
        },
        toJSON: function() {
          return {
            id
          };
        }
      });
    };
    Interpreter2.prototype.attachDev = function() {
      var global2 = getGlobal();
      if (this.options.devTools && global2) {
        if (global2.__REDUX_DEVTOOLS_EXTENSION__) {
          var devToolsOptions = typeof this.options.devTools === "object" ? this.options.devTools : void 0;
          this.devTools = global2.__REDUX_DEVTOOLS_EXTENSION__.connect(__assign(__assign({
            name: this.id,
            autoPause: true,
            stateSanitizer: function(state) {
              return {
                value: state.value,
                context: state.context,
                actions: state.actions
              };
            }
          }, devToolsOptions), {
            features: __assign({
              jump: false,
              skip: false
            }, devToolsOptions ? devToolsOptions.features : void 0)
          }), this.machine);
          this.devTools.init(this.state);
        }
        registerService(this);
      }
    };
    Interpreter2.prototype.toJSON = function() {
      return {
        id: this.id
      };
    };
    Interpreter2.prototype[symbolObservable] = function() {
      return this;
    };
    Interpreter2.prototype.getSnapshot = function() {
      if (this.status === InterpreterStatus.NotStarted) {
        return this.initialState;
      }
      return this._state;
    };
    Interpreter2.defaultOptions = /* @__PURE__ */ function(global2) {
      return {
        execute: true,
        deferEvents: true,
        clock: {
          setTimeout: function(fn, ms) {
            return setTimeout(fn, ms);
          },
          clearTimeout: function(id) {
            return clearTimeout(id);
          }
        },
        logger: global2.console.log.bind(console),
        devTools: false
      };
    }(typeof self !== "undefined" ? self : global);
    Interpreter2.interpret = interpret;
    return Interpreter2;
  }();
  function interpret(machine, options2) {
    var interpreter = new Interpreter(machine, options2);
    return interpreter;
  }

  // .svelte-kit/output/server/app.js
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };
  var _map;
  function get_single_valued_header(headers, key) {
    const value = headers[key];
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return void 0;
      }
      if (value.length > 1) {
        throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
      }
      return value[0];
    }
    return value;
  }
  function lowercase_keys(obj) {
    const clone = {};
    for (const key in obj) {
      clone[key.toLowerCase()] = obj[key];
    }
    return clone;
  }
  function error$1(body) {
    return {
      status: 500,
      body,
      headers: {}
    };
  }
  function is_string(s2) {
    return typeof s2 === "string" || s2 instanceof String;
  }
  function is_content_type_textual(content_type) {
    if (!content_type)
      return true;
    const [type] = content_type.split(";");
    return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
  }
  async function render_endpoint(request, route, match) {
    const mod = await route.load();
    const handler = mod[request.method.toLowerCase().replace("delete", "del")];
    if (!handler) {
      return;
    }
    const params = route.params(match);
    const response = await handler({ ...request, params });
    const preface = `Invalid response from route ${request.path}`;
    if (!response) {
      return;
    }
    if (typeof response !== "object") {
      return error$1(`${preface}: expected an object, got ${typeof response}`);
    }
    let { status = 200, body, headers = {} } = response;
    headers = lowercase_keys(headers);
    const type = get_single_valued_header(headers, "content-type");
    const is_type_textual = is_content_type_textual(type);
    if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
      return error$1(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
    }
    let normalized_body;
    if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
      headers = { ...headers, "content-type": "application/json; charset=utf-8" };
      normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
    } else {
      normalized_body = body;
    }
    return { status, body: normalized_body, headers };
  }
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
  var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
  var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  var escaped$1 = {
    "<": "\\u003C",
    ">": "\\u003E",
    "/": "\\u002F",
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  function devalue(value) {
    var counts = new Map();
    function walk(thing) {
      if (typeof thing === "function") {
        throw new Error("Cannot stringify a function");
      }
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (!isPrimitive(thing)) {
        var type = getType(thing);
        switch (type) {
          case "Number":
          case "String":
          case "Boolean":
          case "Date":
          case "RegExp":
            return;
          case "Array":
            thing.forEach(walk);
            break;
          case "Set":
          case "Map":
            Array.from(thing).forEach(walk);
            break;
          default:
            var proto = Object.getPrototypeOf(thing);
            if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
              throw new Error("Cannot stringify arbitrary non-POJOs");
            }
            if (Object.getOwnPropertySymbols(thing).length > 0) {
              throw new Error("Cannot stringify POJOs with symbolic keys");
            }
            Object.keys(thing).forEach(function(key) {
              return walk(thing[key]);
            });
        }
      }
    }
    walk(value);
    var names = new Map();
    Array.from(counts).filter(function(entry) {
      return entry[1] > 1;
    }).sort(function(a, b) {
      return b[1] - a[1];
    }).forEach(function(entry, i) {
      names.set(entry[0], getName(i));
    });
    function stringify(thing) {
      if (names.has(thing)) {
        return names.get(thing);
      }
      if (isPrimitive(thing)) {
        return stringifyPrimitive(thing);
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          return "Object(" + stringify(thing.valueOf()) + ")";
        case "RegExp":
          return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
        case "Date":
          return "new Date(" + thing.getTime() + ")";
        case "Array":
          var members = thing.map(function(v, i) {
            return i in thing ? stringify(v) : "";
          });
          var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
          return "[" + members.join(",") + tail + "]";
        case "Set":
        case "Map":
          return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
        default:
          var obj = "{" + Object.keys(thing).map(function(key) {
            return safeKey(key) + ":" + stringify(thing[key]);
          }).join(",") + "}";
          var proto = Object.getPrototypeOf(thing);
          if (proto === null) {
            return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
          }
          return obj;
      }
    }
    var str = stringify(value);
    if (names.size) {
      var params_1 = [];
      var statements_1 = [];
      var values_1 = [];
      names.forEach(function(name, thing) {
        params_1.push(name);
        if (isPrimitive(thing)) {
          values_1.push(stringifyPrimitive(thing));
          return;
        }
        var type = getType(thing);
        switch (type) {
          case "Number":
          case "String":
          case "Boolean":
            values_1.push("Object(" + stringify(thing.valueOf()) + ")");
            break;
          case "RegExp":
            values_1.push(thing.toString());
            break;
          case "Date":
            values_1.push("new Date(" + thing.getTime() + ")");
            break;
          case "Array":
            values_1.push("Array(" + thing.length + ")");
            thing.forEach(function(v, i) {
              statements_1.push(name + "[" + i + "]=" + stringify(v));
            });
            break;
          case "Set":
            values_1.push("new Set");
            statements_1.push(name + "." + Array.from(thing).map(function(v) {
              return "add(" + stringify(v) + ")";
            }).join("."));
            break;
          case "Map":
            values_1.push("new Map");
            statements_1.push(name + "." + Array.from(thing).map(function(_a) {
              var k = _a[0], v = _a[1];
              return "set(" + stringify(k) + ", " + stringify(v) + ")";
            }).join("."));
            break;
          default:
            values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
            Object.keys(thing).forEach(function(key) {
              statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
            });
        }
      });
      statements_1.push("return " + str);
      return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
    } else {
      return str;
    }
  }
  function getName(num) {
    var name = "";
    do {
      name = chars[num % chars.length] + name;
      num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
  }
  function isPrimitive(thing) {
    return Object(thing) !== thing;
  }
  function stringifyPrimitive(thing) {
    if (typeof thing === "string")
      return stringifyString(thing);
    if (thing === void 0)
      return "void 0";
    if (thing === 0 && 1 / thing < 0)
      return "-0";
    var str = String(thing);
    if (typeof thing === "number")
      return str.replace(/^(-)?0\./, "$1.");
    return str;
  }
  function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
  }
  function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
  }
  function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
  }
  function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
  }
  function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
  }
  function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
      var char = str.charAt(i);
      var code = char.charCodeAt(0);
      if (char === '"') {
        result += '\\"';
      } else if (char in escaped$1) {
        result += escaped$1[char];
      } else if (code >= 55296 && code <= 57343) {
        var next = str.charCodeAt(i + 1);
        if (code <= 56319 && (next >= 56320 && next <= 57343)) {
          result += char + str[++i];
        } else {
          result += "\\u" + code.toString(16).toUpperCase();
        }
      } else {
        result += char;
      }
    }
    result += '"';
    return result;
  }
  function noop$1() {
  }
  function safe_not_equal$1(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  Promise.resolve();
  var subscriber_queue$1 = [];
  function writable$1(value, start3 = noop$1) {
    let stop3;
    const subscribers = new Set();
    function set(new_value) {
      if (safe_not_equal$1(value, new_value)) {
        value = new_value;
        if (stop3) {
          const run_queue = !subscriber_queue$1.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue$1.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue$1.length; i += 2) {
              subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
            }
            subscriber_queue$1.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop$1) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop3 = start3(set) || noop$1;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0) {
          stop3();
          stop3 = null;
        }
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }
  function hash(value) {
    let hash2 = 5381;
    let i = value.length;
    if (typeof value === "string") {
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else {
      while (i)
        hash2 = hash2 * 33 ^ value[--i];
    }
    return (hash2 >>> 0).toString(36);
  }
  var s$1 = JSON.stringify;
  async function render_response({
    branch,
    options: options2,
    $session,
    page_config,
    status,
    error: error22,
    page: page2
  }) {
    const css2 = new Set(options2.entry.css);
    const js = new Set(options2.entry.js);
    const styles = new Set();
    const serialized_data = [];
    let rendered;
    let is_private = false;
    let maxage;
    if (error22) {
      error22.stack = options2.get_stack(error22);
    }
    if (page_config.ssr) {
      branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
        if (node.css)
          node.css.forEach((url) => css2.add(url));
        if (node.js)
          node.js.forEach((url) => js.add(url));
        if (node.styles)
          node.styles.forEach((content) => styles.add(content));
        if (fetched && page_config.hydrate)
          serialized_data.push(...fetched);
        if (uses_credentials)
          is_private = true;
        maxage = loaded.maxage;
      });
      const session = writable$1($session);
      const props = {
        stores: {
          page: writable$1(null),
          navigating: writable$1(null),
          session
        },
        page: page2,
        components: branch.map(({ node }) => node.module.default)
      };
      for (let i = 0; i < branch.length; i += 1) {
        props[`props_${i}`] = await branch[i].loaded.props;
      }
      let session_tracking_active = false;
      const unsubscribe = session.subscribe(() => {
        if (session_tracking_active)
          is_private = true;
      });
      session_tracking_active = true;
      try {
        rendered = options2.root.render(props);
      } finally {
        unsubscribe();
      }
    } else {
      rendered = { head: "", html: "", css: { code: "", map: null } };
    }
    const include_js = page_config.router || page_config.hydrate;
    if (!include_js)
      js.clear();
    const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
      ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
      ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
    ].join("\n		");
    let init22 = "";
    if (options2.amp) {
      init22 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
    } else if (include_js) {
      init22 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error32) => {
        throw new Error(`Failed to serialize session data: ${error32.message}`);
      })},
				host: ${page2 && page2.host ? s$1(page2.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error22)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page2 && page2.host ? s$1(page2.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page2 && page2.path)},
						query: new URLSearchParams(${page2 ? s$1(page2.query.toString()) : ""}),
						params: ${page2 && s$1(page2.params)}
					}
				}` : "null"}
			});
		<\/script>`;
    }
    if (options2.service_worker) {
      init22 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
    }
    const head = [
      rendered.head,
      styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
      links,
      init22
    ].join("\n\n		");
    const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
      let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
      if (body2)
        attributes += ` data-body="${hash(body2)}"`;
      return `<script ${attributes}>${json}<\/script>`;
    }).join("\n\n	")}
		`;
    const headers = {
      "content-type": "text/html"
    };
    if (maxage) {
      headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
    }
    if (!options2.floc) {
      headers["permissions-policy"] = "interest-cohort=()";
    }
    return {
      status,
      headers,
      body: options2.template({ head, body })
    };
  }
  function try_serialize(data, fail) {
    try {
      return devalue(data);
    } catch (err) {
      if (fail)
        fail(err);
      return null;
    }
  }
  function serialize_error(error22) {
    if (!error22)
      return null;
    let serialized = try_serialize(error22);
    if (!serialized) {
      const { name, message, stack } = error22;
      serialized = try_serialize({ ...error22, name, message, stack });
    }
    if (!serialized) {
      serialized = "{}";
    }
    return serialized;
  }
  function normalize(loaded) {
    const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
    if (loaded.error || has_error_status) {
      const status = loaded.status;
      if (!loaded.error && has_error_status) {
        return {
          status: status || 500,
          error: new Error()
        };
      }
      const error22 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
      if (!(error22 instanceof Error)) {
        return {
          status: 500,
          error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error22}"`)
        };
      }
      if (!status || status < 400 || status > 599) {
        console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
        return { status: 500, error: error22 };
      }
      return { status, error: error22 };
    }
    if (loaded.redirect) {
      if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
        return {
          status: 500,
          error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
        };
      }
      if (typeof loaded.redirect !== "string") {
        return {
          status: 500,
          error: new Error('"redirect" property returned from load() must be a string')
        };
      }
    }
    return loaded;
  }
  var s = JSON.stringify;
  async function load_node({
    request,
    options: options2,
    state,
    route,
    page: page2,
    node,
    $session,
    context,
    prerender_enabled,
    is_leaf,
    is_error,
    status,
    error: error22
  }) {
    const { module } = node;
    let uses_credentials = false;
    const fetched = [];
    let loaded;
    const page_proxy = new Proxy(page2, {
      get: (target, prop, receiver) => {
        if (prop === "query" && prerender_enabled) {
          throw new Error("Cannot access query on a page with prerendering enabled");
        }
        return Reflect.get(target, prop, receiver);
      }
    });
    if (module.load) {
      const load_input = {
        page: page_proxy,
        get session() {
          uses_credentials = true;
          return $session;
        },
        fetch: async (resource, opts = {}) => {
          let url;
          if (typeof resource === "string") {
            url = resource;
          } else {
            url = resource.url;
            opts = {
              method: resource.method,
              headers: resource.headers,
              body: resource.body,
              mode: resource.mode,
              credentials: resource.credentials,
              cache: resource.cache,
              redirect: resource.redirect,
              referrer: resource.referrer,
              integrity: resource.integrity,
              ...opts
            };
          }
          const resolved = resolve(request.path, url.split("?")[0]);
          let response;
          const filename = resolved.replace(options2.paths.assets, "").slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            response = options2.read ? new Response(options2.read(asset.file), {
              headers: asset.type ? { "content-type": asset.type } : {}
            }) : await fetch(`http://${page2.host}/${asset.file}`, opts);
          } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
            const relative = resolved;
            const headers = {
              ...opts.headers
            };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: relative,
              rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(relative, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          } else {
            if (resolved.startsWith("//")) {
              throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
            }
            if (typeof request.host !== "undefined") {
              const { hostname: fetch_hostname } = new URL(url);
              const [server_hostname] = request.host.split(":");
              if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
                uses_credentials = true;
                opts.headers = {
                  ...opts.headers,
                  cookie: request.headers.cookie
                };
              }
            }
            const external_request = new Request(url, opts);
            response = await options2.hooks.externalFetch.call(null, external_request);
          }
          if (response) {
            const proxy = new Proxy(response, {
              get(response2, key, receiver) {
                async function text() {
                  const body = await response2.text();
                  const headers = {};
                  for (const [key2, value] of response2.headers) {
                    if (key2 !== "etag" && key2 !== "set-cookie")
                      headers[key2] = value;
                  }
                  if (!opts.body || typeof opts.body === "string") {
                    fetched.push({
                      url,
                      body: opts.body,
                      json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                    });
                  }
                  return body;
                }
                if (key === "text") {
                  return text;
                }
                if (key === "json") {
                  return async () => {
                    return JSON.parse(await text());
                  };
                }
                return Reflect.get(response2, key, response2);
              }
            });
            return proxy;
          }
          return response || new Response("Not found", {
            status: 404
          });
        },
        context: { ...context }
      };
      if (is_error) {
        load_input.status = status;
        load_input.error = error22;
      }
      loaded = await module.load.call(null, load_input);
    } else {
      loaded = {};
    }
    if (!loaded && is_leaf && !is_error)
      return;
    if (!loaded) {
      throw new Error(`${node.entry} - load must return a value except for page fall through`);
    }
    return {
      node,
      loaded: normalize(loaded),
      context: loaded.context || context,
      fetched,
      uses_credentials
    };
  }
  var escaped$2 = {
    "<": "\\u003C",
    ">": "\\u003E",
    "/": "\\u002F",
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  function escape$1(str) {
    let result = '"';
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charAt(i);
      const code = char.charCodeAt(0);
      if (char === '"') {
        result += '\\"';
      } else if (char in escaped$2) {
        result += escaped$2[char];
      } else if (code >= 55296 && code <= 57343) {
        const next = str.charCodeAt(i + 1);
        if (code <= 56319 && next >= 56320 && next <= 57343) {
          result += char + str[++i];
        } else {
          result += `\\u${code.toString(16).toUpperCase()}`;
        }
      } else {
        result += char;
      }
    }
    result += '"';
    return result;
  }
  var absolute = /^([a-z]+:)?\/?\//;
  function resolve(base2, path2) {
    const base_match = absolute.exec(base2);
    const path_match = absolute.exec(path2);
    if (!base_match) {
      throw new Error(`bad base path: "${base2}"`);
    }
    const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
    const pathparts = path_match ? path2.slice(path_match[0].length).split("/") : path2.split("/");
    baseparts.pop();
    for (let i = 0; i < pathparts.length; i += 1) {
      const part = pathparts[i];
      if (part === ".")
        continue;
      else if (part === "..")
        baseparts.pop();
      else
        baseparts.push(part);
    }
    const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
    return `${prefix}${baseparts.join("/")}`;
  }
  function coalesce_to_error(err) {
    return err instanceof Error ? err : new Error(JSON.stringify(err));
  }
  async function respond_with_error({ request, options: options2, state, $session, status, error: error22 }) {
    const default_layout = await options2.load_component(options2.manifest.layout);
    const default_error = await options2.load_component(options2.manifest.error);
    const page2 = {
      host: request.host,
      path: request.path,
      query: request.query,
      params: {}
    };
    const loaded = await load_node({
      request,
      options: options2,
      state,
      route: null,
      page: page2,
      node: default_layout,
      $session,
      context: {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: false
    });
    const branch = [
      loaded,
      await load_node({
        request,
        options: options2,
        state,
        route: null,
        page: page2,
        node: default_error,
        $session,
        context: loaded ? loaded.context : {},
        prerender_enabled: is_prerender_enabled(options2, default_error, state),
        is_leaf: false,
        is_error: true,
        status,
        error: error22
      })
    ];
    try {
      return await render_response({
        options: options2,
        $session,
        page_config: {
          hydrate: options2.hydrate,
          router: options2.router,
          ssr: options2.ssr
        },
        status,
        error: error22,
        branch,
        page: page2
      });
    } catch (err) {
      const error32 = coalesce_to_error(err);
      options2.handle_error(error32, request);
      return {
        status: 500,
        headers: {},
        body: error32.stack
      };
    }
  }
  function is_prerender_enabled(options2, node, state) {
    return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
  }
  async function respond$1(opts) {
    const { request, options: options2, state, $session, route } = opts;
    let nodes;
    try {
      nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
    } catch (err) {
      const error32 = coalesce_to_error(err);
      options2.handle_error(error32, request);
      return await respond_with_error({
        request,
        options: options2,
        state,
        $session,
        status: 500,
        error: error32
      });
    }
    const leaf = nodes[nodes.length - 1].module;
    let page_config = get_page_config(leaf, options2);
    if (!leaf.prerender && state.prerender && !state.prerender.all) {
      return {
        status: 204,
        headers: {},
        body: ""
      };
    }
    let branch = [];
    let status = 200;
    let error22;
    ssr:
      if (page_config.ssr) {
        let context = {};
        for (let i = 0; i < nodes.length; i += 1) {
          const node = nodes[i];
          let loaded;
          if (node) {
            try {
              loaded = await load_node({
                ...opts,
                node,
                context,
                prerender_enabled: is_prerender_enabled(options2, node, state),
                is_leaf: i === nodes.length - 1,
                is_error: false
              });
              if (!loaded)
                return;
              if (loaded.loaded.redirect) {
                return {
                  status: loaded.loaded.status,
                  headers: {
                    location: encodeURI(loaded.loaded.redirect)
                  }
                };
              }
              if (loaded.loaded.error) {
                ({ status, error: error22 } = loaded.loaded);
              }
            } catch (err) {
              const e = coalesce_to_error(err);
              options2.handle_error(e, request);
              status = 500;
              error22 = e;
            }
            if (loaded && !error22) {
              branch.push(loaded);
            }
            if (error22) {
              while (i--) {
                if (route.b[i]) {
                  const error_node = await options2.load_component(route.b[i]);
                  let node_loaded;
                  let j = i;
                  while (!(node_loaded = branch[j])) {
                    j -= 1;
                  }
                  try {
                    const error_loaded = await load_node({
                      ...opts,
                      node: error_node,
                      context: node_loaded.context,
                      prerender_enabled: is_prerender_enabled(options2, error_node, state),
                      is_leaf: false,
                      is_error: true,
                      status,
                      error: error22
                    });
                    if (error_loaded.loaded.error) {
                      continue;
                    }
                    page_config = get_page_config(error_node.module, options2);
                    branch = branch.slice(0, j + 1).concat(error_loaded);
                    break ssr;
                  } catch (err) {
                    const e = coalesce_to_error(err);
                    options2.handle_error(e, request);
                    continue;
                  }
                }
              }
              return await respond_with_error({
                request,
                options: options2,
                state,
                $session,
                status,
                error: error22
              });
            }
          }
          if (loaded && loaded.loaded.context) {
            context = {
              ...context,
              ...loaded.loaded.context
            };
          }
        }
      }
    try {
      return await render_response({
        ...opts,
        page_config,
        status,
        error: error22,
        branch: branch.filter(Boolean)
      });
    } catch (err) {
      const error32 = coalesce_to_error(err);
      options2.handle_error(error32, request);
      return await respond_with_error({
        ...opts,
        status: 500,
        error: error32
      });
    }
  }
  function get_page_config(leaf, options2) {
    return {
      ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
      router: "router" in leaf ? !!leaf.router : options2.router,
      hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
    };
  }
  async function render_page(request, route, match, options2, state) {
    if (state.initiator === route) {
      return {
        status: 404,
        headers: {},
        body: `Not found: ${request.path}`
      };
    }
    const params = route.params(match);
    const page2 = {
      host: request.host,
      path: request.path,
      query: request.query,
      params
    };
    const $session = await options2.hooks.getSession(request);
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route,
      page: page2
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  }
  function read_only_form_data() {
    const map = new Map();
    return {
      append(key, value) {
        if (map.has(key)) {
          (map.get(key) || []).push(value);
        } else {
          map.set(key, [value]);
        }
      },
      data: new ReadOnlyFormData(map)
    };
  }
  var ReadOnlyFormData = class {
    constructor(map) {
      __privateAdd(this, _map, void 0);
      __privateSet(this, _map, map);
    }
    get(key) {
      const value = __privateGet(this, _map).get(key);
      return value && value[0];
    }
    getAll(key) {
      return __privateGet(this, _map).get(key);
    }
    has(key) {
      return __privateGet(this, _map).has(key);
    }
    *[Symbol.iterator]() {
      for (const [key, value] of __privateGet(this, _map)) {
        for (let i = 0; i < value.length; i += 1) {
          yield [key, value[i]];
        }
      }
    }
    *entries() {
      for (const [key, value] of __privateGet(this, _map)) {
        for (let i = 0; i < value.length; i += 1) {
          yield [key, value[i]];
        }
      }
    }
    *keys() {
      for (const [key] of __privateGet(this, _map))
        yield key;
    }
    *values() {
      for (const [, value] of __privateGet(this, _map)) {
        for (let i = 0; i < value.length; i += 1) {
          yield value[i];
        }
      }
    }
  };
  _map = new WeakMap();
  function parse_body(raw, headers) {
    if (!raw)
      return raw;
    const content_type = headers["content-type"];
    const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
    const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
    switch (type) {
      case "text/plain":
        return text();
      case "application/json":
        return JSON.parse(text());
      case "application/x-www-form-urlencoded":
        return get_urlencoded(text());
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(text(), boundary.slice("boundary=".length));
      }
      default:
        return raw;
    }
  }
  function get_urlencoded(text) {
    const { data, append } = read_only_form_data();
    text.replace(/\+/g, " ").split("&").forEach((str) => {
      const [key, value] = str.split("=");
      append(decodeURIComponent(key), decodeURIComponent(value));
    });
    return data;
  }
  function get_multipart(text, boundary) {
    const parts = text.split(`--${boundary}`);
    if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
      throw new Error("Malformed form data");
    }
    const { data, append } = read_only_form_data();
    parts.slice(1, -1).forEach((part) => {
      const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
      if (!match) {
        throw new Error("Malformed form data");
      }
      const raw_headers = match[1];
      const body = match[2].trim();
      let key;
      const headers = {};
      raw_headers.split("\r\n").forEach((str) => {
        const [raw_header, ...raw_directives] = str.split("; ");
        let [name, value] = raw_header.split(": ");
        name = name.toLowerCase();
        headers[name] = value;
        const directives = {};
        raw_directives.forEach((raw_directive) => {
          const [name2, value2] = raw_directive.split("=");
          directives[name2] = JSON.parse(value2);
        });
        if (name === "content-disposition") {
          if (value !== "form-data")
            throw new Error("Malformed form data");
          if (directives.filename) {
            throw new Error("File upload is not yet implemented");
          }
          if (directives.name) {
            key = directives.name;
          }
        }
      });
      if (!key)
        throw new Error("Malformed form data");
      append(key, body);
    });
    return data;
  }
  async function respond(incoming, options2, state = {}) {
    if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
      const has_trailing_slash = incoming.path.endsWith("/");
      if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
        const path2 = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
        const q = incoming.query.toString();
        return {
          status: 301,
          headers: {
            location: options2.paths.base + path2 + (q ? `?${q}` : "")
          }
        };
      }
    }
    const headers = lowercase_keys(incoming.headers);
    const request = {
      ...incoming,
      headers,
      body: parse_body(incoming.rawBody, headers),
      params: {},
      locals: {}
    };
    try {
      return await options2.hooks.handle({
        request,
        resolve: async (request2) => {
          if (state.prerender && state.prerender.fallback) {
            return await render_response({
              options: options2,
              $session: await options2.hooks.getSession(request2),
              page_config: { ssr: false, router: true, hydrate: true },
              status: 200,
              branch: []
            });
          }
          for (const route of options2.manifest.routes) {
            const match = route.pattern.exec(request2.path);
            if (!match)
              continue;
            const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
            if (response) {
              if (response.status === 200) {
                const cache_control = get_single_valued_header(response.headers, "cache-control");
                if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                  const etag = `"${hash(response.body || "")}"`;
                  if (request2.headers["if-none-match"] === etag) {
                    return {
                      status: 304,
                      headers: {},
                      body: ""
                    };
                  }
                  response.headers["etag"] = etag;
                }
              }
              return response;
            }
          }
          const $session = await options2.hooks.getSession(request2);
          return await respond_with_error({
            request: request2,
            options: options2,
            state,
            $session,
            status: 404,
            error: new Error(`Not found: ${request2.path}`)
          });
        }
      });
    } catch (err) {
      const e = coalesce_to_error(err);
      options2.handle_error(e, request);
      return {
        status: 500,
        headers: {},
        body: options2.dev ? e.stack : e.message
      };
    }
  }
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  var is_client = typeof window !== "undefined";
  var now = is_client ? () => window.performance.now() : () => Date.now();
  var raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
  var tasks = new Set();
  function run_tasks(now2) {
    tasks.forEach((task) => {
      if (!task.c(now2)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0)
      raf(run_tasks);
  }
  function loop(callback) {
    let task;
    if (tasks.size === 0)
      raf(run_tasks);
    return {
      promise: new Promise((fulfill) => {
        tasks.add(task = { c: callback, f: fulfill });
      }),
      abort() {
        tasks.delete(task);
      }
    };
  }
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
  }
  function getContext(key) {
    return get_current_component().$$.context.get(key);
  }
  Promise.resolve();
  var escaped = {
    '"': "&quot;",
    "'": "&#39;",
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function escape(html) {
    return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
  }
  function each(items, fn) {
    let str = "";
    for (let i = 0; i < items.length; i += 1) {
      str += fn(items[i], i);
    }
    return str;
  }
  var missing_component = {
    $$render: () => ""
  };
  function validate_component(component, name) {
    if (!component || !component.$$render) {
      if (name === "svelte:component")
        name += " this={...}";
      throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
  }
  var on_destroy;
  function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
      const parent_component = current_component;
      const $$ = {
        on_destroy,
        context: new Map(parent_component ? parent_component.$$.context : context || []),
        on_mount: [],
        before_update: [],
        after_update: [],
        callbacks: blank_object()
      };
      set_current_component({ $$ });
      const html = fn(result, props, bindings, slots);
      set_current_component(parent_component);
      return html;
    }
    return {
      render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
        on_destroy = [];
        const result = { title: "", head: "", css: new Set() };
        const html = $$render(result, props, {}, $$slots, context);
        run_all(on_destroy);
        return {
          html,
          css: {
            code: Array.from(result.css).map((css2) => css2.code).join("\n"),
            map: null
          },
          head: result.title + result.head
        };
      },
      $$render
    };
  }
  function add_attribute(name, value, boolean) {
    if (value == null || boolean && !value)
      return "";
    return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
  }
  function afterUpdate() {
  }
  var css$6 = {
    code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
    map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
  };
  var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { stores } = $$props;
    let { page: page2 } = $$props;
    let { components } = $$props;
    let { props_0 = null } = $$props;
    let { props_1 = null } = $$props;
    let { props_2 = null } = $$props;
    setContext("__svelte__", stores);
    afterUpdate(stores.page.notify);
    if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
      $$bindings.stores(stores);
    if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
      $$bindings.page(page2);
    if ($$props.components === void 0 && $$bindings.components && components !== void 0)
      $$bindings.components(components);
    if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
      $$bindings.props_0(props_0);
    if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
      $$bindings.props_1(props_1);
    if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
      $$bindings.props_2(props_2);
    $$result.css.add(css$6);
    {
      stores.page.set(page2);
    }
    return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
      default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
        default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
      })}` : ``}`
    })}

${``}`;
  });
  var base$1 = "";
  var assets = "";
  function set_paths(paths) {
    base$1 = paths.base;
    assets = paths.assets || base$1;
  }
  function set_prerendering(value) {
  }
  var handle = async ({ request, resolve: resolve2 }) => {
    const cookies = import_cookie.default.parse(request.headers.cookie || "");
    request.locals.userid = cookies.userid || v4();
    if (request.query.has("_method")) {
      request.method = request.query.get("_method").toUpperCase();
    }
    const response = await resolve2(request);
    if (!cookies.userid) {
      response.headers["set-cookie"] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
    }
    return response;
  };
  var user_hooks = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    handle
  });
  var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
  var options = null;
  var default_settings = { paths: { "base": "", "assets": "" } };
  function init2(settings = default_settings) {
    set_paths(settings.paths);
    set_prerendering(settings.prerendering || false);
    const hooks = get_hooks(user_hooks);
    options = {
      amp: false,
      dev: false,
      entry: {
        file: assets + "/_app/start-c2365925.js",
        css: [assets + "/_app/assets/start-61d1577b.css"],
        js: [assets + "/_app/start-c2365925.js", assets + "/_app/chunks/vendor-fd221d49.js"]
      },
      fetched: void 0,
      floc: false,
      get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
      get_stack: (error22) => String(error22),
      handle_error: (error22, request) => {
        hooks.handleError({ error: error22, request });
        error22.stack = options.get_stack(error22);
      },
      hooks,
      hydrate: true,
      initiator: void 0,
      load_component,
      manifest,
      paths: settings.paths,
      prerender: true,
      read: settings.read,
      root: Root,
      service_worker: null,
      router: true,
      ssr: true,
      target: "#svelte",
      template,
      trailing_slash: "never"
    };
  }
  var d = decodeURIComponent;
  var empty = () => ({});
  var manifest = {
    assets: [{ "file": "favicon.png", "size": 1571, "type": "image/png" }, { "file": "robots.txt", "size": 67, "type": "text/plain" }, { "file": "svelte-welcome.png", "size": 360807, "type": "image/png" }, { "file": "svelte-welcome.webp", "size": 115470, "type": "image/webp" }],
    layout: "src/routes/__layout.svelte",
    error: ".svelte-kit/build/components/error.svelte",
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: empty,
        a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
        b: [".svelte-kit/build/components/error.svelte"]
      },
      {
        type: "page",
        pattern: /^\/about\/?$/,
        params: empty,
        a: ["src/routes/__layout.svelte", "src/routes/about.svelte"],
        b: [".svelte-kit/build/components/error.svelte"]
      },
      {
        type: "endpoint",
        pattern: /^\/todos\.json$/,
        params: empty,
        load: () => Promise.resolve().then(function() {
          return index_json;
        })
      },
      {
        type: "page",
        pattern: /^\/todos\/?$/,
        params: empty,
        a: ["src/routes/__layout.svelte", "src/routes/todos/index.svelte"],
        b: [".svelte-kit/build/components/error.svelte"]
      },
      {
        type: "endpoint",
        pattern: /^\/todos\/([^/]+?)\.json$/,
        params: (m) => ({ uid: d(m[1]) }),
        load: () => Promise.resolve().then(function() {
          return _uid__json;
        })
      }
    ]
  };
  var get_hooks = (hooks) => ({
    getSession: hooks.getSession || (() => ({})),
    handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
    handleError: hooks.handleError || (({ error: error22 }) => console.error(error22.stack)),
    externalFetch: hooks.externalFetch || fetch
  });
  var module_lookup = {
    "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
      return __layout;
    }),
    ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
      return error3;
    }),
    "src/routes/index.svelte": () => Promise.resolve().then(function() {
      return index$1;
    }),
    "src/routes/about.svelte": () => Promise.resolve().then(function() {
      return about;
    }),
    "src/routes/todos/index.svelte": () => Promise.resolve().then(function() {
      return index;
    })
  };
  var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-1b37ef5a.js", "css": ["assets/pages/__layout.svelte-a06e2686.css"], "js": ["pages/__layout.svelte-1b37ef5a.js", "chunks/vendor-fd221d49.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-b1502ae6.js", "css": [], "js": ["error.svelte-b1502ae6.js", "chunks/vendor-fd221d49.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-1da62613.js", "css": ["assets/pages/index.svelte-38319f25.css"], "js": ["pages/index.svelte-1da62613.js", "chunks/vendor-fd221d49.js"], "styles": [] }, "src/routes/about.svelte": { "entry": "pages/about.svelte-08acbd98.js", "css": ["assets/pages/about.svelte-bf4528fa.css"], "js": ["pages/about.svelte-08acbd98.js", "chunks/vendor-fd221d49.js"], "styles": [] }, "src/routes/todos/index.svelte": { "entry": "pages/todos/index.svelte-786ef25d.js", "css": ["assets/pages/todos/index.svelte-784042c1.css"], "js": ["pages/todos/index.svelte-786ef25d.js", "chunks/vendor-fd221d49.js"], "styles": [] } };
  async function load_component(file) {
    const { entry, css: css2, js, styles } = metadata_lookup[file];
    return {
      module: await module_lookup[file](),
      entry: assets + "/_app/" + entry,
      css: css2.map((dep) => assets + "/_app/" + dep),
      js: js.map((dep) => assets + "/_app/" + dep),
      styles
    };
  }
  function render(request, {
    prerender: prerender2
  } = {}) {
    const host = request.headers["host"];
    return respond({ ...request, host }, options, { prerender: prerender2 });
  }
  var base = "https://api.svelte.dev";
  async function api(request, resource, data) {
    if (!request.locals.userid) {
      return { status: 401 };
    }
    const res = await fetch(`${base}/${resource}`, {
      method: request.method,
      headers: {
        "content-type": "application/json"
      },
      body: data && JSON.stringify(data)
    });
    if (res.ok && request.method !== "GET" && request.headers.accept !== "application/json") {
      return {
        status: 303,
        headers: {
          location: "/todos"
        }
      };
    }
    return {
      status: res.status,
      body: await res.json()
    };
  }
  var get = async (request) => {
    const response = await api(request, `todos/${request.locals.userid}`);
    if (response.status === 404) {
      return { body: [] };
    }
    return response;
  };
  var post = async (request) => {
    const response = await api(request, `todos/${request.locals.userid}`, {
      text: request.body.get("text")
    });
    return response;
  };
  var index_json = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    get,
    post
  });
  var patch = async (request) => {
    return api(request, `todos/${request.locals.userid}/${request.params.uid}`, {
      text: request.body.get("text"),
      done: request.body.has("done") ? !!request.body.get("done") : void 0
    });
  };
  var del = async (request) => {
    return api(request, `todos/${request.locals.userid}/${request.params.uid}`);
  };
  var _uid__json = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    patch,
    del
  });
  var browser = false;
  var dev = false;
  var getStores = () => {
    const stores = getContext("__svelte__");
    return {
      page: {
        subscribe: stores.page.subscribe
      },
      navigating: {
        subscribe: stores.navigating.subscribe
      },
      get preloading() {
        console.error("stores.preloading is deprecated; use stores.navigating instead");
        return {
          subscribe: stores.navigating.subscribe
        };
      },
      session: stores.session
    };
  };
  var page = {
    subscribe(fn) {
      const store = getStores().page;
      return store.subscribe(fn);
    }
  };
  var logo = "/_app/assets/svelte-logo-87df40b8.svg";
  var css$5 = {
    code: "header.svelte-1twf6mk.svelte-1twf6mk{display:flex;justify-content:space-between}.corner.svelte-1twf6mk.svelte-1twf6mk{width:3em;height:3em}.corner.svelte-1twf6mk a.svelte-1twf6mk{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-1twf6mk img.svelte-1twf6mk{width:2em;height:2em;object-fit:contain}nav.svelte-1twf6mk.svelte-1twf6mk{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-1twf6mk.svelte-1twf6mk{width:2em;height:3em;display:block}path.svelte-1twf6mk.svelte-1twf6mk{fill:var(--background)}ul.svelte-1twf6mk.svelte-1twf6mk{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-1twf6mk.svelte-1twf6mk{position:relative;height:100%}li.active.svelte-1twf6mk.svelte-1twf6mk::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}nav.svelte-1twf6mk a.svelte-1twf6mk{display:flex;height:100%;align-items:center;padding:0 1em;color:var(--heading-color);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:10%;text-decoration:none;transition:color 0.2s linear}a.svelte-1twf6mk.svelte-1twf6mk:hover{color:var(--accent-color)}",
    map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n\\timport { page } from '$app/stores';\\n\\timport logo from './svelte-logo.svg';\\n<\/script>\\n\\n<header>\\n\\t<div class=\\"corner\\">\\n\\t\\t<a href=\\"https://kit.svelte.dev\\">\\n\\t\\t\\t<img src={logo} alt=\\"SvelteKit\\" />\\n\\t\\t</a>\\n\\t</div>\\n\\n\\t<nav>\\n\\t\\t<svg viewBox=\\"0 0 2 3\\" aria-hidden=\\"true\\">\\n\\t\\t\\t<path d=\\"M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z\\" />\\n\\t\\t</svg>\\n\\t\\t<ul>\\n\\t\\t\\t<li class:active={$page.path === '/'}><a sveltekit:prefetch href=\\"/\\">Home</a></li>\\n\\t\\t\\t<li class:active={$page.path === '/about'}><a sveltekit:prefetch href=\\"/about\\">About</a></li>\\n\\t\\t\\t<li class:active={$page.path === '/todos'}><a sveltekit:prefetch href=\\"/todos\\">Todos</a></li>\\n\\t\\t</ul>\\n\\t\\t<svg viewBox=\\"0 0 2 3\\" aria-hidden=\\"true\\">\\n\\t\\t\\t<path d=\\"M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z\\" />\\n\\t\\t</svg>\\n\\t</nav>\\n\\n\\t<div class=\\"corner\\">\\n\\t\\t<!-- TODO put something else here? github link? -->\\n\\t</div>\\n</header>\\n\\n<style>\\n\\theader {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t}\\n\\n\\t.corner {\\n\\t\\twidth: 3em;\\n\\t\\theight: 3em;\\n\\t}\\n\\n\\t.corner a {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.corner img {\\n\\t\\twidth: 2em;\\n\\t\\theight: 2em;\\n\\t\\tobject-fit: contain;\\n\\t}\\n\\n\\tnav {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\t--background: rgba(255, 255, 255, 0.7);\\n\\t}\\n\\n\\tsvg {\\n\\t\\twidth: 2em;\\n\\t\\theight: 3em;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\tpath {\\n\\t\\tfill: var(--background);\\n\\t}\\n\\n\\tul {\\n\\t\\tposition: relative;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\theight: 3em;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tlist-style: none;\\n\\t\\tbackground: var(--background);\\n\\t\\tbackground-size: contain;\\n\\t}\\n\\n\\tli {\\n\\t\\tposition: relative;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\tli.active::before {\\n\\t\\t--size: 6px;\\n\\t\\tcontent: '';\\n\\t\\twidth: 0;\\n\\t\\theight: 0;\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: calc(50% - var(--size));\\n\\t\\tborder: var(--size) solid transparent;\\n\\t\\tborder-top: var(--size) solid var(--accent-color);\\n\\t}\\n\\n\\tnav a {\\n\\t\\tdisplay: flex;\\n\\t\\theight: 100%;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0 1em;\\n\\t\\tcolor: var(--heading-color);\\n\\t\\tfont-weight: 700;\\n\\t\\tfont-size: 0.8rem;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tletter-spacing: 10%;\\n\\t\\ttext-decoration: none;\\n\\t\\ttransition: color 0.2s linear;\\n\\t}\\n\\n\\ta:hover {\\n\\t\\tcolor: var(--accent-color);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAgCC,MAAM,8BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAC/B,CAAC,AAED,OAAO,8BAAC,CAAC,AACR,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC,AAED,sBAAO,CAAC,CAAC,eAAC,CAAC,AACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC,AAED,sBAAO,CAAC,GAAG,eAAC,CAAC,AACZ,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,OAAO,AACpB,CAAC,AAED,GAAG,8BAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,YAAY,CAAE,wBAAwB,AACvC,CAAC,AAED,GAAG,8BAAC,CAAC,AACJ,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,KAAK,AACf,CAAC,AAED,IAAI,8BAAC,CAAC,AACL,IAAI,CAAE,IAAI,YAAY,CAAC,AACxB,CAAC,AAED,EAAE,8BAAC,CAAC,AACH,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,eAAe,CAAE,OAAO,AACzB,CAAC,AAED,EAAE,8BAAC,CAAC,AACH,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,AACb,CAAC,AAED,EAAE,qCAAO,QAAQ,AAAC,CAAC,AAClB,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,CAC7B,MAAM,CAAE,IAAI,MAAM,CAAC,CAAC,KAAK,CAAC,WAAW,CACrC,UAAU,CAAE,IAAI,MAAM,CAAC,CAAC,KAAK,CAAC,IAAI,cAAc,CAAC,AAClD,CAAC,AAED,kBAAG,CAAC,CAAC,eAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,KAAK,CAAE,IAAI,eAAe,CAAC,CAC3B,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,MAAM,CACjB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,GAAG,CACnB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,MAAM,AAC9B,CAAC,AAED,+BAAC,MAAM,AAAC,CAAC,AACR,KAAK,CAAE,IAAI,cAAc,CAAC,AAC3B,CAAC"}`
  };
  var Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $page, $$unsubscribe_page;
    $$unsubscribe_page = subscribe(page, (value) => $page = value);
    $$result.css.add(css$5);
    $$unsubscribe_page();
    return `<header class="${"svelte-1twf6mk"}"><div class="${"corner svelte-1twf6mk"}"><a href="${"https://kit.svelte.dev"}" class="${"svelte-1twf6mk"}"><img${add_attribute("src", logo, 0)} alt="${"SvelteKit"}" class="${"svelte-1twf6mk"}"></a></div>

	<nav class="${"svelte-1twf6mk"}"><svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-1twf6mk"}"><path d="${"M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"}" class="${"svelte-1twf6mk"}"></path></svg>
		<ul class="${"svelte-1twf6mk"}"><li class="${["svelte-1twf6mk", $page.path === "/" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/"}" class="${"svelte-1twf6mk"}">Home</a></li>
			<li class="${["svelte-1twf6mk", $page.path === "/about" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/about"}" class="${"svelte-1twf6mk"}">About</a></li>
			<li class="${["svelte-1twf6mk", $page.path === "/todos" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/todos"}" class="${"svelte-1twf6mk"}">Todos</a></li></ul>
		<svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-1twf6mk"}"><path d="${"M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"}" class="${"svelte-1twf6mk"}"></path></svg></nav>

	<div class="${"corner svelte-1twf6mk"}"></div>
</header>`;
  });
  var css$4 = {
    code: "main.svelte-1izrdc8.svelte-1izrdc8{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:1024px;margin:0 auto;box-sizing:border-box}footer.svelte-1izrdc8.svelte-1izrdc8{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px}footer.svelte-1izrdc8 a.svelte-1izrdc8{font-weight:bold}@media(min-width: 480px){footer.svelte-1izrdc8.svelte-1izrdc8{padding:40px 0}}",
    map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\n\\timport Header from '$lib/header/Header.svelte';\\n\\timport '../app.css';\\n<\/script>\\n\\n<section>\\n\\t<Header />\\n\\n\\t<main>\\n\\t\\t<slot />\\n\\t</main>\\n\\n\\t<footer>\\n\\t\\t<p>visit <a href=\\"https://kit.svelte.dev\\">kit.svelte.dev</a> to learn SvelteKit</p>\\n\\t</footer>\\n</section>\\n\\n<style>\\n\\tmain {\\n\\t\\tflex: 1;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tpadding: 1rem;\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 1024px;\\n\\t\\tmargin: 0 auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\n\\tfooter {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 40px;\\n\\t}\\n\\n\\tfooter a {\\n\\t\\tfont-weight: bold;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\tfooter {\\n\\t\\t\\tpadding: 40px 0;\\n\\t\\t}\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAkBC,IAAI,8BAAC,CAAC,AACL,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACvB,CAAC,AAED,MAAM,8BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,AACd,CAAC,AAED,qBAAM,CAAC,CAAC,eAAC,CAAC,AACT,WAAW,CAAE,IAAI,AAClB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,MAAM,8BAAC,CAAC,AACP,OAAO,CAAE,IAAI,CAAC,CAAC,AAChB,CAAC,AACF,CAAC"}`
  };
  var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    $$result.css.add(css$4);
    return `<section>${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

	<main class="${"svelte-1izrdc8"}">${slots.default ? slots.default({}) : ``}</main>

	<footer class="${"svelte-1izrdc8"}"><p>visit <a href="${"https://kit.svelte.dev"}" class="${"svelte-1izrdc8"}">kit.svelte.dev</a> to learn SvelteKit</p></footer>
</section>`;
  });
  var __layout = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": _layout
  });
  function load$1({ error: error22, status }) {
    return { props: { error: error22, status } };
  }
  var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { status } = $$props;
    let { error: error22 } = $$props;
    if ($$props.status === void 0 && $$bindings.status && status !== void 0)
      $$bindings.status(status);
    if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
      $$bindings.error(error22);
    return `<h1>${escape(status)}</h1>

<pre>${escape(error22.message)}</pre>



${error22.frame ? `<pre>${escape(error22.frame)}</pre>` : ``}
${error22.stack ? `<pre>${escape(error22.stack)}</pre>` : ``}`;
  });
  var error3 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": Error$1,
    load: load$1
  });
  var subscriber_queue = [];
  function writable(value, start3 = noop) {
    let stop3;
    const subscribers = new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop3) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop3 = start3(set) || noop;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0) {
          stop3();
          stop3 = null;
        }
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }
  function is_date(obj) {
    return Object.prototype.toString.call(obj) === "[object Date]";
  }
  function tick_spring(ctx, last_value, current_value, target_value) {
    if (typeof current_value === "number" || is_date(current_value)) {
      const delta = target_value - current_value;
      const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
      const spring2 = ctx.opts.stiffness * delta;
      const damper = ctx.opts.damping * velocity;
      const acceleration = (spring2 - damper) * ctx.inv_mass;
      const d2 = (velocity + acceleration) * ctx.dt;
      if (Math.abs(d2) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
        return target_value;
      } else {
        ctx.settled = false;
        return is_date(current_value) ? new Date(current_value.getTime() + d2) : current_value + d2;
      }
    } else if (Array.isArray(current_value)) {
      return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
    } else if (typeof current_value === "object") {
      const next_value = {};
      for (const k in current_value) {
        next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
      }
      return next_value;
    } else {
      throw new Error(`Cannot spring ${typeof current_value} values`);
    }
  }
  function spring(value, opts = {}) {
    const store = writable(value);
    const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
    let last_time;
    let task;
    let current_token;
    let last_value = value;
    let target_value = value;
    let inv_mass = 1;
    let inv_mass_recovery_rate = 0;
    let cancel_task = false;
    function set(new_value, opts2 = {}) {
      target_value = new_value;
      const token = current_token = {};
      if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
        cancel_task = true;
        last_time = now();
        last_value = new_value;
        store.set(value = target_value);
        return Promise.resolve();
      } else if (opts2.soft) {
        const rate = opts2.soft === true ? 0.5 : +opts2.soft;
        inv_mass_recovery_rate = 1 / (rate * 60);
        inv_mass = 0;
      }
      if (!task) {
        last_time = now();
        cancel_task = false;
        task = loop((now2) => {
          if (cancel_task) {
            cancel_task = false;
            task = null;
            return false;
          }
          inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
          const ctx = {
            inv_mass,
            opts: spring2,
            settled: true,
            dt: (now2 - last_time) * 60 / 1e3
          };
          const next_value = tick_spring(ctx, last_value, value, target_value);
          last_time = now2;
          last_value = value;
          store.set(value = next_value);
          if (ctx.settled) {
            task = null;
          }
          return !ctx.settled;
        });
      }
      return new Promise((fulfil) => {
        task.promise.then(() => {
          if (token === current_token)
            fulfil();
        });
      });
    }
    const spring2 = {
      set,
      update: (fn, opts2) => set(fn(target_value, value), opts2),
      subscribe: store.subscribe,
      stiffness,
      damping,
      precision
    };
    return spring2;
  }
  var css$3 = {
    code: ".counter.svelte-ltn89m.svelte-ltn89m{display:flex;border-top:1px solid rgba(0, 0, 0, 0.1);border-bottom:1px solid rgba(0, 0, 0, 0.1);margin:1rem 0}.counter.svelte-ltn89m button.svelte-ltn89m{width:2em;padding:0;display:flex;align-items:center;justify-content:center;border:0;background-color:transparent;color:var(--text-color);font-size:2rem}.counter.svelte-ltn89m button.svelte-ltn89m:hover{background-color:var(--secondary-color)}svg.svelte-ltn89m.svelte-ltn89m{width:25%;height:25%}path.svelte-ltn89m.svelte-ltn89m{vector-effect:non-scaling-stroke;stroke-width:2px;stroke:var(--text-color)}.counter-viewport.svelte-ltn89m.svelte-ltn89m{width:8em;height:4em;overflow:hidden;text-align:center;position:relative}.counter-viewport.svelte-ltn89m strong.svelte-ltn89m{position:absolute;display:block;width:100%;height:100%;font-weight:400;color:var(--accent-color);font-size:4rem;display:flex;align-items:center;justify-content:center}.counter-digits.svelte-ltn89m.svelte-ltn89m{position:absolute;width:100%;height:100%}",
    map: `{"version":3,"file":"Counter.svelte","sources":["Counter.svelte"],"sourcesContent":["<script>\\n\\timport { spring } from 'svelte/motion';\\n\\n\\tlet count = 0;\\n\\n\\tconst displayed_count = spring();\\n\\t$: displayed_count.set(count);\\n\\t$: offset = modulo($displayed_count, 1);\\n\\n\\tfunction modulo(n, m) {\\n\\t\\t// handle negative numbers\\n\\t\\treturn ((n % m) + m) % m;\\n\\t}\\n<\/script>\\n\\n<div class=\\"counter\\">\\n\\t<button on:click={() => (count -= 1)} aria-label=\\"Decrease the counter by one\\">\\n\\t\\t<svg aria-hidden=\\"true\\" viewBox=\\"0 0 1 1\\">\\n\\t\\t\\t<path d=\\"M0,0.5 L1,0.5\\" />\\n\\t\\t</svg>\\n\\t</button>\\n\\n\\t<div class=\\"counter-viewport\\">\\n\\t\\t<div class=\\"counter-digits\\" style=\\"transform: translate(0, {100 * offset}%)\\">\\n\\t\\t\\t<strong style=\\"top: -100%\\" aria-hidden=\\"true\\">{Math.floor($displayed_count + 1)}</strong>\\n\\t\\t\\t<strong>{Math.floor($displayed_count)}</strong>\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<button on:click={() => (count += 1)} aria-label=\\"Increase the counter by one\\">\\n\\t\\t<svg aria-hidden=\\"true\\" viewBox=\\"0 0 1 1\\">\\n\\t\\t\\t<path d=\\"M0,0.5 L1,0.5 M0.5,0 L0.5,1\\" />\\n\\t\\t</svg>\\n\\t</button>\\n</div>\\n\\n<style>\\n\\t.counter {\\n\\t\\tdisplay: flex;\\n\\t\\tborder-top: 1px solid rgba(0, 0, 0, 0.1);\\n\\t\\tborder-bottom: 1px solid rgba(0, 0, 0, 0.1);\\n\\t\\tmargin: 1rem 0;\\n\\t}\\n\\n\\t.counter button {\\n\\t\\twidth: 2em;\\n\\t\\tpadding: 0;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tborder: 0;\\n\\t\\tbackground-color: transparent;\\n\\t\\tcolor: var(--text-color);\\n\\t\\tfont-size: 2rem;\\n\\t}\\n\\n\\t.counter button:hover {\\n\\t\\tbackground-color: var(--secondary-color);\\n\\t}\\n\\n\\tsvg {\\n\\t\\twidth: 25%;\\n\\t\\theight: 25%;\\n\\t}\\n\\n\\tpath {\\n\\t\\tvector-effect: non-scaling-stroke;\\n\\t\\tstroke-width: 2px;\\n\\t\\tstroke: var(--text-color);\\n\\t}\\n\\n\\t.counter-viewport {\\n\\t\\twidth: 8em;\\n\\t\\theight: 4em;\\n\\t\\toverflow: hidden;\\n\\t\\ttext-align: center;\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.counter-viewport strong {\\n\\t\\tposition: absolute;\\n\\t\\tdisplay: block;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tfont-weight: 400;\\n\\t\\tcolor: var(--accent-color);\\n\\t\\tfont-size: 4rem;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t}\\n\\n\\t.counter-digits {\\n\\t\\tposition: absolute;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAqCC,QAAQ,4BAAC,CAAC,AACT,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3C,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC,AAED,sBAAQ,CAAC,MAAM,cAAC,CAAC,AAChB,KAAK,CAAE,GAAG,CACV,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,CAAC,CACT,gBAAgB,CAAE,WAAW,CAC7B,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,SAAS,CAAE,IAAI,AAChB,CAAC,AAED,sBAAQ,CAAC,oBAAM,MAAM,AAAC,CAAC,AACtB,gBAAgB,CAAE,IAAI,iBAAiB,CAAC,AACzC,CAAC,AAED,GAAG,4BAAC,CAAC,AACJ,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC,AAED,IAAI,4BAAC,CAAC,AACL,aAAa,CAAE,kBAAkB,CACjC,YAAY,CAAE,GAAG,CACjB,MAAM,CAAE,IAAI,YAAY,CAAC,AAC1B,CAAC,AAED,iBAAiB,4BAAC,CAAC,AAClB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,MAAM,CAChB,UAAU,CAAE,MAAM,CAClB,QAAQ,CAAE,QAAQ,AACnB,CAAC,AAED,+BAAiB,CAAC,MAAM,cAAC,CAAC,AACzB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,cAAc,CAAC,CAC1B,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,AACxB,CAAC,AAED,eAAe,4BAAC,CAAC,AAChB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC"}`
  };
  function modulo(n, m) {
    return (n % m + m) % m;
  }
  var Counter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let offset;
    let $displayed_count, $$unsubscribe_displayed_count;
    let count = 0;
    const displayed_count = spring();
    $$unsubscribe_displayed_count = subscribe(displayed_count, (value) => $displayed_count = value);
    $$result.css.add(css$3);
    {
      displayed_count.set(count);
    }
    offset = modulo($displayed_count, 1);
    $$unsubscribe_displayed_count();
    return `<div class="${"counter svelte-ltn89m"}"><button aria-label="${"Decrease the counter by one"}" class="${"svelte-ltn89m"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-ltn89m"}"><path d="${"M0,0.5 L1,0.5"}" class="${"svelte-ltn89m"}"></path></svg></button>

	<div class="${"counter-viewport svelte-ltn89m"}"><div class="${"counter-digits svelte-ltn89m"}" style="${"transform: translate(0, " + escape(100 * offset) + "%)"}"><strong style="${"top: -100%"}" aria-hidden="${"true"}" class="${"svelte-ltn89m"}">${escape(Math.floor($displayed_count + 1))}</strong>
			<strong class="${"svelte-ltn89m"}">${escape(Math.floor($displayed_count))}</strong></div></div>

	<button aria-label="${"Increase the counter by one"}" class="${"svelte-ltn89m"}"><svg aria-hidden="${"true"}" viewBox="${"0 0 1 1"}" class="${"svelte-ltn89m"}"><path d="${"M0,0.5 L1,0.5 M0.5,0 L0.5,1"}" class="${"svelte-ltn89m"}"></path></svg></button>
</div>`;
  });
  var toggleMachine = createMachine({
    id: "toggle",
    initial: "inactive",
    states: {
      inactive: { on: { TOGGLE: "active" } },
      active: { on: { TOGGLE: "inactive" } }
    }
  });
  var toggleService = interpret(toggleMachine).start();
  var css$2 = {
    code: "section.svelte-1bgohwt{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1}h1.svelte-1bgohwt{width:100%}",
    map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\texport const prerender = true;\\n<\/script>\\n\\n<script>\\n\\timport Counter from '$lib/Counter.svelte';\\n\\timport { toggleService } from '/src/machines/toggleMachine.js';\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Home</title>\\n</svelte:head>\\n\\n<section>\\n\\t<h1>\\n\\t\\t<button on:click={() => toggleService.send('TOGGLE')}>Switch</button>\\n\\t\\t{$toggleService.matches('inactive') ? 'Off' : 'On'}\\n\\t</h1>\\n\\t<div>\\n\\t\\t<Counter />\\n\\t</div>\\n</section>\\n\\n<style>\\n\\tsection {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tflex: 1;\\n\\t}\\n\\n\\th1 {\\n\\t\\twidth: 100%;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwBC,OAAO,eAAC,CAAC,AACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,IAAI,CAAE,CAAC,AACR,CAAC,AAED,EAAE,eAAC,CAAC,AACH,KAAK,CAAE,IAAI,AACZ,CAAC"}`
  };
  var prerender$1 = true;
  var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $toggleService, $$unsubscribe_toggleService;
    $$unsubscribe_toggleService = subscribe(toggleService, (value) => $toggleService = value);
    $$result.css.add(css$2);
    $$unsubscribe_toggleService();
    return `${$$result.head += `${$$result.title = `<title>Home</title>`, ""}`, ""}

<section class="${"svelte-1bgohwt"}"><h1 class="${"svelte-1bgohwt"}"><button>Switch</button>
		${escape($toggleService.matches("inactive") ? "Off" : "On")}</h1>
	<div>${validate_component(Counter, "Counter").$$render($$result, {}, {}, {})}</div>
</section>`;
  });
  var index$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": Routes,
    prerender: prerender$1
  });
  var css$1 = {
    code: ".content.svelte-cf77e8{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto}",
    map: `{"version":3,"file":"about.svelte","sources":["about.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\timport { browser, dev } from '$app/env';\\n\\n\\t// we don't need any JS on this page, though we'll load\\n\\t// it in dev so that we get hot module replacement...\\n\\texport const hydrate = dev;\\n\\n\\t// ...but if the client-side router is already loaded\\n\\t// (i.e. we came here from elsewhere in the app), use it\\n\\texport const router = browser;\\n\\n\\t// since there's no dynamic data here, we can prerender\\n\\t// it so that it gets served as a static asset in prod\\n\\texport const prerender = true;\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>About</title>\\n</svelte:head>\\n\\n<div class=\\"content\\">\\n\\t<h1>About this app</h1>\\n\\n\\t<p>\\n\\t\\tThis is a <a href=\\"https://kit.svelte.dev\\">SvelteKit</a> app. You can make your own by typing the\\n\\t\\tfollowing into your command line and following the prompts:\\n\\t</p>\\n\\n\\t<!-- TODO lose the @next! -->\\n\\t<pre>npm init svelte@next</pre>\\n\\n\\t<p>\\n\\t\\tThe page you're looking at is purely static HTML, with no client-side interactivity needed.\\n\\t\\tBecause of that, we don't need to load any JavaScript. Try viewing the page's source, or opening\\n\\t\\tthe devtools network panel and reloading.\\n\\t</p>\\n\\n\\t<p>\\n\\t\\tThe <a href=\\"/todos\\">TODOs</a> page illustrates SvelteKit's data loading and form handling. Try using\\n\\t\\tit with JavaScript disabled!\\n\\t</p>\\n</div>\\n\\n<style>\\n\\t.content {\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: var(--column-width);\\n\\t\\tmargin: var(--column-margin-top) auto 0 auto;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4CC,QAAQ,cAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,AAC7C,CAAC"}`
  };
  var hydrate = dev;
  var router = browser;
  var prerender = true;
  var About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    $$result.css.add(css$1);
    return `${$$result.head += `${$$result.title = `<title>About</title>`, ""}`, ""}

<div class="${"content svelte-cf77e8"}"><h1>About this app</h1>

	<p>This is a <a href="${"https://kit.svelte.dev"}">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	
	<pre>npm init svelte@next</pre>

	<p>The page you&#39;re looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don&#39;t need to load any JavaScript. Try viewing the page&#39;s source, or opening
		the devtools network panel and reloading.
	</p>

	<p>The <a href="${"/todos"}">TODOs</a> page illustrates SvelteKit&#39;s data loading and form handling. Try using
		it with JavaScript disabled!
	</p>
</div>`;
  });
  var about = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": About,
    hydrate,
    router,
    prerender
  });
  var css = {
    code: `.todos.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto;line-height:1}.new.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{margin:0 0 0.5rem 0}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid transparent}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus-visible{box-shadow:inset 1px 1px 6px rgba(0, 0, 0, 0.1);border:1px solid #ff3e00 !important;outline:none}.new.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{font-size:28px;width:100%;padding:0.5em 1em 0.3em 1em;box-sizing:border-box;background:rgba(255, 255, 255, 0.05);border-radius:8px;text-align:center}.todo.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{display:grid;grid-template-columns:2rem 1fr 2rem;grid-gap:0.5rem;align-items:center;margin:0 0 0.5rem 0;padding:0.5rem;background-color:white;border-radius:8px;filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));transform:translate(-1px, -1px);transition:filter 0.2s, transform 0.2s}.done.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{transform:none;opacity:0.4;filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1))}form.text.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:relative;display:flex;align-items:center;flex:1}.todo.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{flex:1;padding:0.5em 2em 0.5em 0.8em;border-radius:3px}.todo.svelte-dmxqmd button.svelte-dmxqmd.svelte-dmxqmd{width:2em;height:2em;border:none;background-color:transparent;background-position:50% 50%;background-repeat:no-repeat}button.toggle.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid rgba(0, 0, 0, 0.2);border-radius:50%;box-sizing:border-box;background-size:1em auto}.done.svelte-dmxqmd .toggle.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");opacity:0.2}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:hover,.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:absolute;right:0;opacity:0;background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A")}.todo.svelte-dmxqmd input.svelte-dmxqmd:focus+.save.svelte-dmxqmd,.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}`,
    map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\timport { enhance } from '$lib/form';\\n\\n\\t// see https://kit.svelte.dev/docs#loading\\n\\texport const load = async ({ fetch }) => {\\n\\t\\tconst res = await fetch('/todos.json');\\n\\n\\t\\tif (res.ok) {\\n\\t\\t\\tconst todos = await res.json();\\n\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tprops: { todos }\\n\\t\\t\\t};\\n\\t\\t}\\n\\n\\t\\tconst { message } = await res.json();\\n\\n\\t\\treturn {\\n\\t\\t\\terror: new Error(message)\\n\\t\\t};\\n\\t};\\n<\/script>\\n\\n<script>\\n\\timport { scale } from 'svelte/transition';\\n\\timport { flip } from 'svelte/animate';\\n\\n\\texport let todos;\\n\\n\\tasync function patch(res) {\\n\\t\\tconst todo = await res.json();\\n\\n\\t\\ttodos = todos.map((t) => {\\n\\t\\t\\tif (t.uid === todo.uid) return todo;\\n\\t\\t\\treturn t;\\n\\t\\t});\\n\\t}\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Todos</title>\\n</svelte:head>\\n\\n<div class=\\"todos\\">\\n\\t<h1>Todos</h1>\\n\\n\\t<form\\n\\t\\tclass=\\"new\\"\\n\\t\\taction=\\"/todos.json\\"\\n\\t\\tmethod=\\"post\\"\\n\\t\\tuse:enhance={{\\n\\t\\t\\tresult: async (res, form) => {\\n\\t\\t\\t\\tconst created = await res.json();\\n\\t\\t\\t\\ttodos = [...todos, created];\\n\\n\\t\\t\\t\\tform.reset();\\n\\t\\t\\t}\\n\\t\\t}}\\n\\t>\\n\\t\\t<input name=\\"text\\" aria-label=\\"Add todo\\" placeholder=\\"+ tap to add a todo\\" />\\n\\t</form>\\n\\n\\t{#each todos as todo (todo.uid)}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"todo\\"\\n\\t\\t\\tclass:done={todo.done}\\n\\t\\t\\ttransition:scale|local={{ start: 0.7 }}\\n\\t\\t\\tanimate:flip={{ duration: 200 }}\\n\\t\\t>\\n\\t\\t\\t<form\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tpending: (data) => {\\n\\t\\t\\t\\t\\t\\ttodo.done = !!data.get('done');\\n\\t\\t\\t\\t\\t},\\n\\t\\t\\t\\t\\tresult: patch\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<input type=\\"hidden\\" name=\\"done\\" value={todo.done ? '' : 'true'} />\\n\\t\\t\\t\\t<button class=\\"toggle\\" aria-label=\\"Mark todo as {todo.done ? 'not done' : 'done'}\\" />\\n\\t\\t\\t</form>\\n\\n\\t\\t\\t<form\\n\\t\\t\\t\\tclass=\\"text\\"\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=patch\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tresult: patch\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<input aria-label=\\"Edit todo\\" type=\\"text\\" name=\\"text\\" value={todo.text} />\\n\\t\\t\\t\\t<button class=\\"save\\" aria-label=\\"Save todo\\" />\\n\\t\\t\\t</form>\\n\\n\\t\\t\\t<form\\n\\t\\t\\t\\taction=\\"/todos/{todo.uid}.json?_method=delete\\"\\n\\t\\t\\t\\tmethod=\\"post\\"\\n\\t\\t\\t\\tuse:enhance={{\\n\\t\\t\\t\\t\\tpending: () => (todo.pending_delete = true),\\n\\t\\t\\t\\t\\tresult: () => {\\n\\t\\t\\t\\t\\t\\ttodos = todos.filter((t) => t.uid !== todo.uid);\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t}}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<button class=\\"delete\\" aria-label=\\"Delete todo\\" disabled={todo.pending_delete} />\\n\\t\\t\\t</form>\\n\\t\\t</div>\\n\\t{/each}\\n</div>\\n\\n<style>\\n\\t.todos {\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: var(--column-width);\\n\\t\\tmargin: var(--column-margin-top) auto 0 auto;\\n\\t\\tline-height: 1;\\n\\t}\\n\\n\\t.new {\\n\\t\\tmargin: 0 0 0.5rem 0;\\n\\t}\\n\\n\\tinput {\\n\\t\\tborder: 1px solid transparent;\\n\\t}\\n\\n\\tinput:focus-visible {\\n\\t\\tbox-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);\\n\\t\\tborder: 1px solid #ff3e00 !important;\\n\\t\\toutline: none;\\n\\t}\\n\\n\\t.new input {\\n\\t\\tfont-size: 28px;\\n\\t\\twidth: 100%;\\n\\t\\tpadding: 0.5em 1em 0.3em 1em;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tbackground: rgba(255, 255, 255, 0.05);\\n\\t\\tborder-radius: 8px;\\n\\t\\ttext-align: center;\\n\\t}\\n\\n\\t.todo {\\n\\t\\tdisplay: grid;\\n\\t\\tgrid-template-columns: 2rem 1fr 2rem;\\n\\t\\tgrid-gap: 0.5rem;\\n\\t\\talign-items: center;\\n\\t\\tmargin: 0 0 0.5rem 0;\\n\\t\\tpadding: 0.5rem;\\n\\t\\tbackground-color: white;\\n\\t\\tborder-radius: 8px;\\n\\t\\tfilter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));\\n\\t\\ttransform: translate(-1px, -1px);\\n\\t\\ttransition: filter 0.2s, transform 0.2s;\\n\\t}\\n\\n\\t.done {\\n\\t\\ttransform: none;\\n\\t\\topacity: 0.4;\\n\\t\\tfilter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));\\n\\t}\\n\\n\\tform.text {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex: 1;\\n\\t}\\n\\n\\t.todo input {\\n\\t\\tflex: 1;\\n\\t\\tpadding: 0.5em 2em 0.5em 0.8em;\\n\\t\\tborder-radius: 3px;\\n\\t}\\n\\n\\t.todo button {\\n\\t\\twidth: 2em;\\n\\t\\theight: 2em;\\n\\t\\tborder: none;\\n\\t\\tbackground-color: transparent;\\n\\t\\tbackground-position: 50% 50%;\\n\\t\\tbackground-repeat: no-repeat;\\n\\t}\\n\\n\\tbutton.toggle {\\n\\t\\tborder: 1px solid rgba(0, 0, 0, 0.2);\\n\\t\\tborder-radius: 50%;\\n\\t\\tbox-sizing: border-box;\\n\\t\\tbackground-size: 1em auto;\\n\\t}\\n\\n\\t.done .toggle {\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\\");\\n\\t}\\n\\n\\t.delete {\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A\\");\\n\\t\\topacity: 0.2;\\n\\t}\\n\\n\\t.delete:hover,\\n\\t.delete:focus {\\n\\t\\ttransition: opacity 0.2s;\\n\\t\\topacity: 1;\\n\\t}\\n\\n\\t.save {\\n\\t\\tposition: absolute;\\n\\t\\tright: 0;\\n\\t\\topacity: 0;\\n\\t\\tbackground-image: url(\\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A\\");\\n\\t}\\n\\n\\t.todo input:focus + .save,\\n\\t.save:focus {\\n\\t\\ttransition: opacity 0.2s;\\n\\t\\topacity: 1;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAgHC,MAAM,0CAAC,CAAC,AACP,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,MAAM,CAAE,IAAI,mBAAmB,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAI,CAC5C,WAAW,CAAE,CAAC,AACf,CAAC,AAED,IAAI,0CAAC,CAAC,AACL,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,AACrB,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,AAC9B,CAAC,AAED,+CAAK,cAAc,AAAC,CAAC,AACpB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAChD,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,UAAU,CACpC,OAAO,CAAE,IAAI,AACd,CAAC,AAED,kBAAI,CAAC,KAAK,4BAAC,CAAC,AACX,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,CAC5B,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CACrC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,MAAM,AACnB,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CACpC,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CACpB,OAAO,CAAE,MAAM,CACf,gBAAgB,CAAE,KAAK,CACvB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACnD,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,UAAU,CAAE,MAAM,CAAC,IAAI,CAAC,CAAC,SAAS,CAAC,IAAI,AACxC,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,YAAY,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,AACpD,CAAC,AAED,IAAI,KAAK,0CAAC,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,IAAI,CAAE,CAAC,AACR,CAAC,AAED,mBAAK,CAAC,KAAK,4BAAC,CAAC,AACZ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,aAAa,CAAE,GAAG,AACnB,CAAC,AAED,mBAAK,CAAC,MAAM,4BAAC,CAAC,AACb,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,WAAW,CAC7B,mBAAmB,CAAE,GAAG,CAAC,GAAG,CAC5B,iBAAiB,CAAE,SAAS,AAC7B,CAAC,AAED,MAAM,OAAO,0CAAC,CAAC,AACd,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,UAAU,CACtB,eAAe,CAAE,GAAG,CAAC,IAAI,AAC1B,CAAC,AAED,mBAAK,CAAC,OAAO,4BAAC,CAAC,AACd,gBAAgB,CAAE,IAAI,uQAAuQ,CAAC,AAC/R,CAAC,AAED,OAAO,0CAAC,CAAC,AACR,gBAAgB,CAAE,IAAI,yrBAAyrB,CAAC,CAChtB,OAAO,CAAE,GAAG,AACb,CAAC,AAED,iDAAO,MAAM,CACb,iDAAO,MAAM,AAAC,CAAC,AACd,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC,AAED,KAAK,0CAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,CAAC,CACV,gBAAgB,CAAE,IAAI,gpBAAgpB,CAAC,AACxqB,CAAC,AAED,mBAAK,CAAC,mBAAK,MAAM,CAAG,mBAAK,CACzB,+CAAK,MAAM,AAAC,CAAC,AACZ,UAAU,CAAE,OAAO,CAAC,IAAI,CACxB,OAAO,CAAE,CAAC,AACX,CAAC"}`
  };
  var load = async ({ fetch: fetch2 }) => {
    const res = await fetch2("/todos.json");
    if (res.ok) {
      const todos = await res.json();
      return { props: { todos } };
    }
    const { message } = await res.json();
    return { error: new Error(message) };
  };
  var Todos = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let { todos } = $$props;
    if ($$props.todos === void 0 && $$bindings.todos && todos !== void 0)
      $$bindings.todos(todos);
    $$result.css.add(css);
    return `${$$result.head += `${$$result.title = `<title>Todos</title>`, ""}`, ""}

<div class="${"todos svelte-dmxqmd"}"><h1>Todos</h1>

	<form class="${"new svelte-dmxqmd"}" action="${"/todos.json"}" method="${"post"}"><input name="${"text"}" aria-label="${"Add todo"}" placeholder="${"+ tap to add a todo"}" class="${"svelte-dmxqmd"}"></form>

	${each(todos, (todo) => `<div class="${["todo svelte-dmxqmd", todo.done ? "done" : ""].join(" ").trim()}"><form action="${"/todos/" + escape(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input type="${"hidden"}" name="${"done"}"${add_attribute("value", todo.done ? "" : "true", 0)} class="${"svelte-dmxqmd"}">
				<button class="${"toggle svelte-dmxqmd"}" aria-label="${"Mark todo as " + escape(todo.done ? "not done" : "done")}"></button></form>

			<form class="${"text svelte-dmxqmd"}" action="${"/todos/" + escape(todo.uid) + ".json?_method=patch"}" method="${"post"}"><input aria-label="${"Edit todo"}" type="${"text"}" name="${"text"}"${add_attribute("value", todo.text, 0)} class="${"svelte-dmxqmd"}">
				<button class="${"save svelte-dmxqmd"}" aria-label="${"Save todo"}"></button></form>

			<form action="${"/todos/" + escape(todo.uid) + ".json?_method=delete"}" method="${"post"}"><button class="${"delete svelte-dmxqmd"}" aria-label="${"Delete todo"}" ${todo.pending_delete ? "disabled" : ""}></button></form>
		</div>`)}
</div>`;
  });
  var index = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": Todos,
    load
  });

  // .svelte-kit/cloudflare-workers/entry.js
  var import_kv_asset_handler = __toModule(require_dist());
  init2();
  addEventListener("fetch", (event2) => {
    event2.respondWith(handle2(event2));
  });
  async function handle2(event2) {
    if (event2.request.method == "GET") {
      try {
        return await (0, import_kv_asset_handler.getAssetFromKV)(event2);
      } catch (e) {
        if (!(e instanceof import_kv_asset_handler.NotFoundError)) {
          return new Response("Error loading static asset:" + (e.message || e.toString()), {
            status: 500
          });
        }
      }
    }
    const request = event2.request;
    const request_url = new URL(request.url);
    try {
      const rendered = await render({
        host: request_url.host,
        path: request_url.pathname,
        query: request_url.searchParams,
        rawBody: await read(request),
        headers: Object.fromEntries(request.headers),
        method: request.method
      });
      if (rendered) {
        return new Response(rendered.body, {
          status: rendered.status,
          headers: makeHeaders(rendered.headers)
        });
      }
    } catch (e) {
      return new Response("Error rendering route:" + (e.message || e.toString()), { status: 500 });
    }
    return new Response({
      status: 404,
      statusText: "Not Found"
    });
  }
  async function read(request) {
    return new Uint8Array(await request.arrayBuffer());
  }
  function makeHeaders(headers) {
    const result = new Headers();
    for (const header in headers) {
      const value = headers[header];
      if (typeof value === "string") {
        result.set(header, value);
        continue;
      }
      for (const sub of value) {
        result.append(header, sub);
      }
    }
    return result;
  }
})();
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
