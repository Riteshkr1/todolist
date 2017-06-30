var Item = (function () {
    function Item(name, isDone) {
        this.name = name;
        this.isDone = isDone;
    }
    return Item;
}());
;
var ToDoItemList = (function () {
    function ToDoItemList() {
        this.itemlist = [];
        this.setData = function (data) {
            var i;
            this.itemlist = [];
            for (i = 0; i < data.length; i++) {
                this.addItem(new Item(data[i].name, data[i].isDone));
            }
        };
        this.reset = function (data) {
            var todoListContainer = document.getElementById("todoItem");
            this.setData(data);
            this.populateTodoList(todoListContainer);
        };
    }
    ToDoItemList.prototype.addItem = function (item) {
        this.itemlist.push(item);
    };
    ;
    ToDoItemList.prototype.removeItem = function (index) {
        this.itemlist.splice(index, 1);
    };
    ;
    ToDoItemList.prototype.doneToggle = function (index) {
        this.itemlist[index].isDone = !this.itemlist[index].isDone;
    };
    ;
    ToDoItemList.prototype.populateTodoItem = function (item, index) {
        var li = document.createElement("li");
        li.setAttribute("id", 'item_' + index);
        var t = document.createTextNode(item.name);
        li.appendChild(t);
        if (item.isDone) {
            li.className = 'done';
        }
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        return li;
    };
    ;
    ToDoItemList.prototype.RemoveEvent = function (todoContainer) {
        var close = document.getElementsByClassName("close");
        var i;
        var _this = this;
        var index;
        var li_id;
        var closeLength = close.length;
        for (i = 0; i < closeLength; i++) {
            close[i].addEventListener("click", function () {
                li_id = this.parentElement.id;
                index = parseInt(li_id.replace("item_", ""));
                _this.removeItem(index);
                _this.populateTodoList(todoContainer);
                console.log('1');
            }, false);
        }
    };
    ;
    ToDoItemList.prototype.doneEvent = function (todoContainer) {
        var li = document.getElementsByTagName("LI");
        var i;
        var liLength = li.length;
        var index;
        var LI_ID;
        var _this = this;
        for (i = 0; i < liLength; i++) {
            li[i].addEventListener("click", function (ev) {
                if (ev.target.tagName === 'LI') {
                    LI_ID = this.id;
                    index = +(LI_ID.replace("item_", ""));
                    _this.doneToggle(index);
                    _this.populateTodoList(todoContainer);
                    console.log('2');
                }
            }, false);
        }
    };
    ;
    ToDoItemList.prototype.addEvent = function (todoContainer) {
        var addTextbox = document.getElementById("newItem");
        var name = addTextbox.value;
        addTextbox.value = "";
        var errorElement = document.getElementById('errorMsg');
        if (name == "") {
            errorElement.style.display = "none";
            return false;
        }
        else if (name.replace(/\s/g, '').length > 120) {
            errorElement.style.display = "block";
            return false;
        }
        else {
            errorElement.style.display = "none";
            var item = new Item(name, false);
            this.addItem(item);
            this.populateTodoList(todoContainer);
            document.getElementById("newItem").nodeValue = "";
        }
    };
    ;
    ToDoItemList.prototype.populateTodoList = function (todoContainer) {
        todoContainer.removeChild(todoContainer.childNodes[0]);
        var itemListLength = this.itemlist.length;
        var i;
        if (this.itemlist.length >= 10) {
            document.getElementById("addItem").disabled = true;
        }
        else {
            document.getElementById("addItem").disabled = false;
        }
        var ul = document.createElement("ul");
        var li;
        var totalItemContainer = document.getElementById("totalCount");
        for (i = 0; i < itemListLength; i++) {
            li = this.populateTodoItem(this.itemlist[i], i);
            ul.appendChild(li);
        }
        todoContainer.appendChild(ul);
        totalItemContainer.textContent = '(' + this.itemlist.length + ')';
        this.RemoveEvent(todoContainer);
        this.doneEvent(todoContainer);
        if (typeof (Storage) !== "undefined") {
            localStorage.clear();
            localStorage.setItem('locListItem', JSON.stringify(this));
        }
    };
    ;
    ToDoItemList.prototype.init = function (targetcontainer, data) {
        var template = '<div class="header">' +
            '<h2>TODO List <sup><span id="totalCount"></span></sup></h2>' +
            '<input type="text" id="newItem" placeholder="New TODO Iteam">' +
            '<input type="button" id= "addItem" class="btn" value="Add" name="add"/>' +
            '<input type="button" id= "resetItem" class="btn" value="Reset" name="reset"/>' +
            '<div id="errorMsg"> you have exceeded  from 120 characher</div>' +
            '</div>' +
            '<div id="todoItem">' +
            '<ul></ul>' +
            '</div>' +
            '</div>';
        targetcontainer.innerHTML = template;
        var todoListContainer = document.getElementById("todoItem");
        this.setData(data);
        this.populateTodoList(todoListContainer);
        var _this = this;
        document.getElementById("addItem").addEventListener("click", function () {
            _this.addEvent(todoListContainer);
        });
    };
    ;
    return ToDoItemList;
}());
;
var data = [
    { name: 'morning meeting', isDone: false },
    { name: 'Bank appointment', isDone: false }
];
var itemList = new ToDoItemList();
var itemListData = [];
if (typeof (Storage) !== "undefined") {
    var localIteamList = JSON.parse(localStorage.getItem('locListItem'));
    if (localIteamList !== null) {
        itemListData = localIteamList.itemlist;
    }
    else {
        itemListData = data;
    }
}
var todoListContainer = document.getElementById("todoList");
itemList.init(todoListContainer, itemListData);
var resetbtn = document.getElementById("resetItem");
resetbtn.addEventListener("click", function () {
    localStorage.clear();
    itemList.reset(data);
});

//# sourceMappingURL=app.js.map
