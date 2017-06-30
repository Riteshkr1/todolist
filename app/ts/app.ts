class Item  {
 	name:string;
 	isDone:boolean;
 	constructor(name:string,isDone:boolean) {
 		this.name = name;
 		this.isDone = isDone;
 	}
};
class ToDoItemList {
 	itemlist:Array<Item> =[];
 	setData = function( data:any) {
		let i:number;
		this.itemlist = [];
	   for(i=0;i<data.length;i++){
			this.addItem(new Item(data[i].name,data[i].isDone));
		}
	};
	addItem( item:Item) {
	   this.itemlist.push(item);
	};
	removeItem(index:number) {
  		this.itemlist.splice(index, 1);
  	};
  	doneToggle(index:number) {
	  this.itemlist[index].isDone = !this.itemlist[index].isDone;
	};
	populateTodoItem(item:Item,index:number) {
	  let li:any = document.createElement("li");
	  li.setAttribute("id", 'item_'+ index);
	  let t:any = document.createTextNode(item.name);
	  li.appendChild(t);
	  if(item.isDone){
	  	li.className = 'done';
	  }
	  let span:any = document.createElement("SPAN");
	  let txt:any = document.createTextNode("\u00D7");
	  span.className = "close";
	  span.appendChild(txt);
	  li.appendChild(span);
	  return li;
	};
	RemoveEvent(todoContainer:any) {
		let close:any = document.getElementsByClassName("close");
		let i:number;
		let _this:ToDoItemList = this;
		let index:number;
		let li_id:string;
		let closeLength:number	= close.length;
		for (i = 0; i < closeLength; i++) {
			close[i].addEventListener("click", function(){
				li_id = this.parentElement.id;
				index = parseInt(li_id.replace("item_", ""));
			    _this.removeItem(index);
			    _this.populateTodoList(todoContainer);
			    console.log('1');
			}, false);
		}
	};
	doneEvent(todoContainer:any) {
		let li:any = document.getElementsByTagName("LI");
		let i:number;
		let liLength:number = li.length;
		let index:number;
		let LI_ID:string;
		let _this:ToDoItemList = this;
		for (i = 0; i < liLength; i++) {
			li[i].addEventListener("click", function(ev:any){
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
	addEvent(todoContainer:any) {
		let addTextbox:HTMLInputElement = document.getElementById("newItem") as HTMLInputElement;
		let name:string  = addTextbox.value;
		addTextbox.value ="";
		let errorElement:any = document.getElementById('errorMsg');
		if(name ==""){
			errorElement.style.display = "none";
			return false
		}else if(name.replace(/\s/g,'').length>120){
			errorElement.style.display = "block";
			return false
		}else{
			errorElement.style.display = "none";
			let item:Item  =  new Item(name,false);
			this.addItem(item);
			this.populateTodoList(todoContainer);
			document.getElementById("newItem").nodeValue ="";
				
		}
	};
	populateTodoList(todoContainer:any) {
		todoContainer.removeChild(todoContainer.childNodes[0]);
		let itemListLength:number = this.itemlist.length;
		let i:number;
		if(this.itemlist.length >=10){
			document.getElementById("addItem").disabled = true;
		}else{
			document.getElementById("addItem").disabled = false;
		}
		let ul:any =  document.createElement("ul");
		var li:any;
		var totalItemContainer = document.getElementById("totalCount");
		for (i = 0; i < itemListLength; i++) {
			li = this.populateTodoItem(this.itemlist[i],i);
			ul.appendChild(li);
		}
		todoContainer.appendChild(ul);
		totalItemContainer.textContent = '(' +this.itemlist.length+')';
		this.RemoveEvent(todoContainer);
		this.doneEvent(todoContainer);
		if (typeof(Storage) !== "undefined") {
			localStorage.clear();
			localStorage.setItem('locListItem',JSON.stringify(this));
			
		}
	};
	init(targetcontainer:any,data:any){

		let template:string = '<div class="header">'+
				'<h2>TODO List <sup><span id="totalCount"></span></sup></h2>'+
				'<input type="text" id="newItem" placeholder="New TODO Iteam">'+
				'<input type="button" id= "addItem" class="btn" value="Add" name="add"/>'+
				'<input type="button" id= "resetItem" class="btn" value="Reset" name="reset"/>'+
				'<div id="errorMsg"> you have exceeded  from 120 characher</div>'+
				'</div>'+
				'<div id="todoItem">'+
				'<ul></ul>'+
				'</div>'+
				'</div>';
		
		targetcontainer.innerHTML = template;
		let todoListContainer:any = document.getElementById("todoItem");		
		this.setData(data);
		this.populateTodoList(todoListContainer);
		let _this:ToDoItemList = this;
		document.getElementById("addItem").addEventListener("click", function(){
			_this.addEvent(todoListContainer);
		});
	};
	reset = function(data:any){
		let todoListContainer:any = document.getElementById("todoItem")		
		this.setData(data);
		this.populateTodoList(todoListContainer);
	};
};



//initial todo item
	let data:any =[
	{name: 'morning meeting', isDone: false},
	{name:'Bank appointment', isDone:false}
	];
//creating new todo list component
	let itemList = new ToDoItemList();
//selecting data either from initial todoitem or localStorage
	let itemListData:any = [];
	if (typeof(Storage) !== "undefined") {
		var localIteamList = JSON.parse(localStorage.getItem('locListItem'));
		//var localIteamListLength = localIteamList.itemlist.length; 
		if ( localIteamList !== null) {
			itemListData = localIteamList.itemlist;
		}else{
			itemListData = data;
		}
	}
// todo list component container
	let todoListContainer:any = document.getElementById("todoList")
// Initialization todo comopent 
	itemList.init(todoListContainer,itemListData);
// bind reset funtion
	let resetbtn:any = document.getElementById("resetItem")
	resetbtn.addEventListener("click", function(){
		localStorage.clear();
		itemList.reset(data);
	});



