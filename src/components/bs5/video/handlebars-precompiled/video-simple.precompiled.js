{"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<script type=\"text/javascript\" defer=\"defer\" src=\"https://extend.vimeocdn.com/ga/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"analyticsTrackingCode") || (depth0 != null ? lookupProperty(depth0,"analyticsTrackingCode") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"analyticsTrackingCode","hash":{},"data":data,"loc":{"start":{"line":4,"column":81},"end":{"line":4,"column":106}}}) : helper)))
    + ".js\">\n</script>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "empty-thumbnail";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "- duration "
    + container.escapeExpression((lookupProperty(helpers,"formatDuration")||(depth0 && lookupProperty(depth0,"formatDuration"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"duration") : depth0),"long",{"name":"formatDuration","hash":{},"data":data,"loc":{"start":{"line":14,"column":63},"end":{"line":14,"column":97}}}));
},"7":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div title=\"Video duration\" class=\"video-duration\">\n                        <span class=\"icon\"></span><span>"
    + container.escapeExpression((lookupProperty(helpers,"formatDuration")||(depth0 && lookupProperty(depth0,"formatDuration"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"formatDuration","hash":{},"data":data,"loc":{"start":{"line":25,"column":56},"end":{"line":25,"column":83}}}))
    + "</span>\n                    </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <iframe title=\"Vimeo video\" class=\"embed-responsive-item video-vimeo\" allow=\"autoplay; fullscreen\" allowfullscreen muted=\"muted\" src=\"https://player.vimeo.com/video/"
    + alias1(((helper = (helper = lookupProperty(helpers,"videoId") || (depth0 != null ? lookupProperty(depth0,"videoId") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"videoId","hash":{},"data":data,"loc":{"start":{"line":33,"column":181},"end":{"line":33,"column":192}}}) : helper)))
    + "?rel=0&autoplay="
    + alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"urlParams") : depth0)) != null ? lookupProperty(stack1,"autoplay") : stack1), depth0))
    + "&background="
    + alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"urlParams") : depth0)) != null ? lookupProperty(stack1,"background") : stack1), depth0))
    + "&controls="
    + alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"urlParams") : depth0)) != null ? lookupProperty(stack1,"controls") : stack1), depth0))
    + "\"></iframe>\n\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"ifCond")||(depth0 && lookupProperty(depth0,"ifCond"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"source") : depth0),"===","youtube",{"name":"ifCond","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data,"loc":{"start":{"line":35,"column":12},"end":{"line":45,"column":12}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <iframe title=\"YouTube video\" class=\"embed-responsive-item video-youtube\" allow=\"autoplay; fullscreen\" allowfullscreen src=\"https://www.youtube.com/embed/"
    + alias1(((helper = (helper = lookupProperty(helpers,"videoId") || (depth0 != null ? lookupProperty(depth0,"videoId") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"videoId","hash":{},"data":data,"loc":{"start":{"line":36,"column":170},"end":{"line":36,"column":181}}}) : helper)))
    + "?rel=0&autoplay="
    + alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"urlParams") : depth0)) != null ? lookupProperty(stack1,"autoplay") : stack1), depth0))
    + "&controls="
    + alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"urlParams") : depth0)) != null ? lookupProperty(stack1,"controls") : stack1), depth0))
    + "\"></iframe>\n\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"ifCond")||(depth0 && lookupProperty(depth0,"ifCond"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"source") : depth0),"===","custom",{"name":"ifCond","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":38,"column":12},"end":{"line":45,"column":12}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <iframe title=\"Custom video\" class=\"embed-responsive-item video-custom\" allow=\"autoplay; fullscreen\" allowfullscreen\n                src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"videoId") || (depth0 != null ? lookupProperty(depth0,"videoId") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"videoId","hash":{},"data":data,"loc":{"start":{"line":40,"column":21},"end":{"line":40,"column":32}}}) : helper)))
    + "\"></iframe>\n\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"text-center position-absolute top-50\">A video has not been provided.</p>\n\n            ";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"transcriptAccordion") || (depth0 != null ? lookupProperty(depth0,"transcriptAccordion") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"transcriptAccordion","hash":{},"data":data,"loc":{"start":{"line":55,"column":8},"end":{"line":55,"column":35}}}) : helper))) != null ? stack1 : "")
    + "\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- QGDS Component: Video -->\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"analyticsTrackingCode") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "")
    + "\n<section class=\"video not-ready "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"thumbnail") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":32},"end":{"line":10,"column":79}}})) != null ? stack1 : "")
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"videoSize") || (depth0 != null ? lookupProperty(depth0,"videoSize") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"videoSize","hash":{},"data":data,"loc":{"start":{"line":10,"column":80},"end":{"line":10,"column":93}}}) : helper)))
    + "\">\n    <div class=\"video-player ratio ratio-"
    + alias4(((helper = (helper = lookupProperty(helpers,"aspectRatio") || (depth0 != null ? lookupProperty(depth0,"aspectRatio") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"aspectRatio","hash":{},"data":data,"loc":{"start":{"line":11,"column":41},"end":{"line":11,"column":56}}}) : helper)))
    + "\">\n\n        <a href=\"#\" class=\"video-thumbnail video-controls\" title=\"Play Video\" \n            aria-label=\"Watch video "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":36},"end":{"line":14,"column":104}}})) != null ? stack1 : "")
    + "\">\n\n            <div class=\"video-thumbnail-image\" style=\"--thumbnail:url("
    + alias4(((helper = (helper = lookupProperty(helpers,"thumbnail") || (depth0 != null ? lookupProperty(depth0,"thumbnail") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thumbnail","hash":{},"data":data,"loc":{"start":{"line":16,"column":70},"end":{"line":16,"column":83}}}) : helper)))
    + ")\"></div>\n\n            <div class=\"video-nav\">\n                <div class=\"video-watch\">\n                    <span class=\"icon\"></span><span>Watch</span>\n                </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"duration") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":16},"end":{"line":27,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n        </a>\n\n        <div class=\"video-embed ratio ratio-"
    + alias4(((helper = (helper = lookupProperty(helpers,"aspectRatio") || (depth0 != null ? lookupProperty(depth0,"aspectRatio") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"aspectRatio","hash":{},"data":data,"loc":{"start":{"line":31,"column":44},"end":{"line":31,"column":59}}}) : helper)))
    + "\">\n"
    + ((stack1 = (lookupProperty(helpers,"ifCond")||(depth0 && lookupProperty(depth0,"ifCond"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"source") : depth0),"===","vimeo",{"name":"ifCond","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":32,"column":12},"end":{"line":45,"column":23}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n\n    <div class=\"video-description\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":50,"column":8},"end":{"line":50,"column":27}}}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"transcriptContent") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":4},"end":{"line":56,"column":11}}})) != null ? stack1 : "")
    + "\n</section>\n";
},"useData":true}
