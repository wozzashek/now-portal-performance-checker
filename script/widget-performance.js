//widget performance script herevar 
tuWidgetPerformance = (() => {
    
    var runBtn = $('<button style="position:fixed;bottom:1rem;right:1.5rem;" class="btn btn-lg btn-danger">RUN PAGE PERFORMANCE</button>').click(function() {
        $('.display_results_box').remove();
        tuWidgetPerformance.getServerTimings();
    })

    $('body').append(runBtn);

    return {

        getWidgetScopes: (p1, p2) => {
            var _widgetName;999
            var _callback;
            /**
             * Allow the user to either enter a string name of the widget, a string name of
             * the widget with a callback, or just a callback.
             */
            if (p1) {
                if (typeof (p1) === "string") {
                    _widgetName = p1;
                } else if (typeof (p1) === "function") {
                    _callback = p1;
                }
            }
            if (p2) {
                if (typeof (p2) === "function")
                    _callback = p2;
            }

            var widgetScopes = [];
            var spWidgets = document.querySelectorAll("[widget='widget']");

            spWidgets.forEach((widget, i) => {
                var thisScope = angular.element(spWidgets[i]).scope();
                widgetScopes.push(thisScope);
            });

            if (_widgetName) {
                if (_callback) {
                    var results = widgetScopes.filter((scope) => {
                        return scope.widget.name.toUpperCase() == _widgetName.toUpperCase()
                    });
                    _callback(results);
                    return;
                } else {
                    return widgetScopes.filter((scope) => {
                        return scope.widget.name.toUpperCase() == _widgetName.toUpperCase()
                    });
                }
            }
            if (_callback) _callback(widgetScopes);
            else return widgetScopes;
        },

        timeServer: (scope) => {

            console.log("Timing "+scope.widget.name);

            return new Promise((resolve, reject) => {
                var timing;
                var start = Date.now();
                //console.log(scope.widget.name + " started @" + Date.now());
                scope.server.refresh().then(() => {
                    var end = Date.now();
                    //console.log(scope.widget.name + " finished @" + Date.now());
                    timing = end - start;
                    resolve({
                        timing: timing,
                        widget: scope.widget
                    });
                    scope.load_time = timing;
                    console.log("Load Time: "+scope.load_time);
                });
            });
        },

        // Promises need to run in a synchronous chain, this is not happening yet.
        getServerTimings: (callback) => {
            var scopes = tuWidgetPerformance.getWidgetScopes();
            var timingResults = [];
            var chain = Promise.resolve();
            scopes.forEach((scope, i, a) => {
                chain = chain.then(() =>
                    tuWidgetPerformance.timeServer(scope)).then((result) => {
                    timingResults.push(result)
                    // if this is the last element in the array, then send the information back
                    if (i == (a.length - 1)) {
                        if(callback && callback != undefined) {
                        callback(timingResults);
                        }
                        tuWidgetPerformance.displayResults();
                    }
                });
            });
        },

        displayResults: () => {
            
            $("div [widget='widget']").css("border", "1px solid red").css("padding-top", "20px").css("position", "relative").each(function (i) {
                var scope = $(this).scope();
                var widget = scope.widget;

                //get existing performance elements and deletec them
                //$('#display_results_box').remove();

                var elem = $("<div class='display_results_box' style='position: absolute; top: 1px; left: 1px'><a target='_blank' href='/$sp.do?id=widget_editor&sys_id=" + widget.sys_id + "'> " + widget.name + "</a>&nbsp;&nbsp;</div>");
                var printScope = $("<a href='javascript:void(0);'>Print scope</a>").on('click', function () {
                    console.info(scope);
                });

                var loadTime = $('<div style="display: inline-block;font-weight: bold;margin-left: 2rem;"><bold><i class="fa fa-clock-o" aria-hidden="true"></i>'+scope.load_time+'ms</bold></div>').click(function() {
                   scope.server.update();
                });

                elem.append(printScope);
                elem.append(loadTime);

                $(this).append(elem);

            });

        }

    }
})();