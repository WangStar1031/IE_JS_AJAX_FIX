/**
 * A simple object to represent web routes and URIs built from them
 * To make AJAX work
 *
 * Firstly run the folling to statically set all the exposed routes:
 * new WebsiteRoutes().addRoutes([
 *   {'n': 'route/name', 't':'/a/template/with/{arg0}/{arg1}', 'm': 'GET'},
 *   ...
 * ])
 *
 * Then call anywhere like:
 *     var r = WebsiteRoutes('route/name', {'arg0': 'a', 'arg1': '1'}))
 * This will give an object like:
 *     r.template.name     == 'route/name'
 *     r.template.template == '/a/template/with/{arg0}/{arg1}'
 *     r.template.method   == 'GET'
 *     r.method            == 'GET'
 *     r.uri               == '/a/template/with/a/1'
 *
 * N.b. runing: WebsiteRoutes('route/name', {'arg0': 'a', 'arg1': '1'})) + ''
 *     Would just give the uri, so:
 *         WebsiteRoutes('route/name', {'arg0': 'a', 'arg1': '1'})) + ''
 *             == '/a/template/with/a/1'
 * Which is simpilar if you just need a built uri for AJAX
 * 
 * N.b. runing:
 *     WebsiteRoutes('route/name')) + '' == '/a/template/with/{arg0}/{arg1}'
 */
WebsiteRoutes = (function() {
    /** static array for all routes for this page */
    var routes = []

    /** const HTTP verbs */
    var methods = {
        'POST'    : 'POST',
        'GET'     : 'GET',
        'PUT'     : 'PUT',
        'PATCH'   : 'PATCH',
        'DELETE'  : 'DELETE',
    }

    /**
     * @param routeTemplate RouteTemplate
     * @param args          array
     * @return string
     */
    function createRouteUri(routeTemplate, args) {
        var uri = routeTemplate.template
        for (var key in args) {
            if (args.hasOwnProperty(key)) {
                uri = uri.replace('{' + key + '}', args[key])
            }
        }
        return uri
    }

    function RouteTemplate(name, template, method) {
        this.name     = name
        this.template = template
        this.method   = method
    }

    function Route(template, uri) {
        this.template = template
        this.method   = template.method
        this.uri      = uri

        this.toString = function () {
            return this.uri
        }
    }

    /** The WebsiteRoutes public object */
    return function (routeName, args) {
        /** if routeName was provided return a Route here */
        if (routeName) {
            for (var i in routes) {
                if (routes[i].name == routeName) {
                    return new Route(routes[i], createRouteUri(routes[i], args))
                }
            }
        }

        /**
         * This should be called as "new WebsiteRoutes().addRoutes"
         * before dom ready or any onload handlers!
         */
        this.addRoutes = function (routesPlain) {
            for (var i in routesPlain) {
                if (routesPlain.hasOwnProperty(i)) {
                    var r = routesPlain[i]
                    if (!methods[r.m]) {
                        throw (
                            'Route: %1 has an invalid HTTP method: %2'
                                .replace('%1', r.n)
                                .replace('%2', r.m)
                            )
                    }
                    routes.push(new RouteTemplate(r.n, r.t, r.m))
                }
            }
        }
    }
})()
/*
new WebsiteRoutes().addRoutes([
    {'n': 'article/create', 't':'/topic/{topicPathPart}/article/blank', 'm': 'GET'},
    {'n': 'article/view' , 't': '/topic/{topicPathPart}/article/{articlePathPart}', 'm': 'GET'}
])
//console.log(WebsiteRoutes('article/create') + '')
console.log(WebsiteRoutes('article/view', {'topicPathPart': 555555, 'articlePathPart': 4}) + 'dfg')
*/