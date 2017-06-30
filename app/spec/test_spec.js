
describe("app test", function() {

  it('Hello world test passes', function() {
    expect(true).toBe(true);
  });

});

describe("item test", function() {
	var item;
	beforeEach(function() {
        item = new Item('test',false);
    });
  	describe("when Item  create new object", function(){
        it("create new instance of Item", function() {
            expect(item).toEqual(jasmine.objectContaining({ name: 'test', isDone: false }));
        });
    });

});

describe("ToDoItemList test", function() {
	var item,index;
	var mockItem = {name: 'evening meeting', isDone: false};
	var mockData = [
	{name: 'morning meeting', isDone: false}
	];
	beforeEach(function() {
        item = new ToDoItemList();
        item.setData(mockData);
    });
  	describe("when ToDoItemList  create new object", function(){
        it("should able to create new instance of ToDoItemList", function() {
            expect(item).toEqual(jasmine.objectContaining([]));
        });
        it("should able to set data", function() {
            expect(item.itemlist).toEqual([
			jasmine.objectContaining({name: 'morning meeting', isDone: false})
			]);
        });
        describe("when ToDoItemList  add item object", function(){
        	beforeEach(function() {
		        item = new ToDoItemList();
		        item.addItem(mockItem);
		    });
	        it("should able to add data", function() {
	            expect(item.itemlist).toEqual([
				jasmine.objectContaining({name: 'evening meeting', isDone: false})
				]);
	        });
	    });
	    describe("when ToDoItemList  remove item object", function(){
        	beforeEach(function() {
		        item = new ToDoItemList();
		        item.setData(mockData);
		        item.addItem(mockItem);
		        index =1;
		        item.removeItem(index);
		    });
	        it("should able to remove data", function() {
	            expect(item.itemlist).toEqual([
				jasmine.objectContaining({name: 'morning meeting', isDone: false})
				]);
	        });
	    });
	    describe("when ToDoItemList  doneToggle object", function(){
        	beforeEach(function() {
		        item = new ToDoItemList();
		        item.setData(mockData);
		        index = 0;
		        item.doneToggle(index);
		    });
	        it("should able to change isDone value", function() {
	            expect(item.itemlist).toEqual([
				jasmine.objectContaining({name: 'morning meeting', isDone: true})
				]);
	        });
	    });
    
    });

});
