define(

'class ClassyHelper.Array',
{
	
	'public isArray (mixed) -> boolean': function(target)
	{
		// http://stackoverflow.com/questions/4775722/check-if-object-is-array
		return Object.prototype.toString.call(target) == '[object Array]';
	},
	
	'public indexOf (mixed, array) -> number': function(element, array)
	{
		// http://stackoverflow.com/questions/1181575/ ...
		// javascript-determine-whether-an-array-contains-a-value
		for (var i = 0; i < array.length; i++) if (array[i] === element) return i;
		return -1;
	},
	
	'public containsElement (mixed, array) -> boolean': function(element, array)
	{
		return (this.indexOf(element, array) > -1) ? true : false;
	},
	
	'public removeElement (mixed, array, boolean = false) -> array': function(element, array, returnNew)
	{
		var index = this.indexOf(element, array);
		// @todo Custom error please
		if (index < 0) throw new Error('Array does not contain provided element');
		array.splice(index, 1);
		if (returnNew) return this.toNewArray(array);
		return array;
	},
	
	'public removeDuplicates (array, boolean = false) -> array': function(array, returnNew)
	{
		// Inspired by but not the same as the article below
		// (the article creates a new array when we do not want to)
		// http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
		for (var i = array.length - 1; i >= 0; --i) {
			if (this.indexOf(array[i], array) != i) array.splice(i, 1);
		}
		if (returnNew) return this.toNewArray(array);
		return array;
	},
	
	'public toNewArray (array) -> array': function(array)
	{
		var newArray = [];
		for (var i = 0; i < array.length; i++) newArray[i] = array[i];
		return newArray;
	},
	
	'public objectToArray (object) -> array': function(object)
	{
		var array = [];
		for (var i in object) if (object.hasOwnProperty(i)) array.push(object[i]);
		return array;
	},
	
	'public enumerateObjectToArray (object) -> array': function(object)
	{
		if (object.length === undefined) {
			throw new Error('Cannot enumerate an object with no length property');
		}
		var array = [];
		for (var i = 0; i < object.length; i++) array.push(object[i]);
		return array;
	}
	
});