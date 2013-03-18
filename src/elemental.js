(function(){

    var root = this;
    var Elemental;
    if (typeof exports !== 'undefined') {
        Elemental = exports;
    } else {
        Elemental = root.Elemental = {};
    }

    var namespaces = [root];

    function findBehaviors(behaviorAsNamespaces){
        return jQuery.map(namespaces, function(namespace, index){
            return _.reduce(behaviorAsNamespaces, function(prev, next){
                return prev[next];
            }, namespace);
        });
    }

    function findFirstBehavior(fns){
        return _.find(fns, function(fn){
            return undefined !== fn;
        });
    }

    function callEachBehavior(element, behavior){
        var behaviorWithNamespaces = behavior.split(".");
        var behaviors = findBehaviors(behaviorWithNamespaces);
        var behavior = findFirstBehavior(behaviors);
        if (undefined !== behavior) {
            behavior(element);
        }
    }

    function initializeBehaviorForElement(element){
        var behaviors = element.attr('data-behavior');
        jQuery.each(behaviors.split(" "), function(index, behavior){
          callEachBehavior(element, behavior);
        });
    }

    function elementsWithDefinedBehaviors(scope){
        return $(scope).find("*").andSelf().filter("[data-behavior]");
    }

    Elemental.load = function(element){
        elementsWithDefinedBehaviors(element).each(function(index, thisElement){
            initializeBehaviorForElement($(thisElement));
        });
    };

    Elemental.addNamespace = function(namespace){
        namespaces.push(namespace);
    };
})();
