System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters: [],
        execute: function () {
            Item = (function () {
                function Item(name, isDone) {
                    this.name = name;
                    this.isDone = isDone;
                }
                return Item;
            }());
            exports_1("Item", Item);
            ;
        }
    };
});

//# sourceMappingURL=item.js.map
