describe('ClassyHelper.Array', function(){
	
	var helper;
	
	beforeEach(function(){
		helper = new ClassyHelper.Array();
	});
	
	describe('isArray', function(){
		
		it('identifies empty array', function(){
			expect(helper.isArray([])).toBe(true);
		});
		
		it('identifies non-empty array', function(){
			expect(helper.isArray([1, 2, 3])).toBe(true);
		});
		
		it('identifies non-array', function(){
			expect(helper.isArray({})).toBe(false);
			expect(helper.isArray('string')).toBe(false);
			expect(helper.isArray(123)).toBe(false);
			expect(helper.isArray(true)).toBe(false);
			expect(helper.isArray(undefined)).toBe(false);
			expect(helper.isArray(null)).toBe(false);
			expect(helper.isArray(function(){})).toBe(false);
			expect(helper.isArray(/regex/)).toBe(false);
		});
		
	});
	
	describe('indexOf', function(){
		
		it('identifies index of simple element', function(){
			expect(helper.indexOf('a', ['a', 'b', 'c'])).toBe(0);
			expect(helper.indexOf(102, [100, 101, 102])).toBe(2);
		});
		
		it('identifies index of object element', function(){
			var targetObject = {};
			expect(helper.indexOf(targetObject, [{}, targetObject, {}])).toBe(1);
		});
		
		it('returns -1 for missing element', function(){
			expect(helper.indexOf(101, [100, 102])).toBe(-1);
		});
		
	});
	
	describe('containsElement', function(){
		
		it('indicates if array contains simple element', function(){
			expect(helper.containsElement('c', ['a', 'b', 'c'])).toBe(true);
			expect(helper.containsElement(103, [100, 101, 102, 103])).toBe(true);
		});
		
		it('indicates if array contains object element', function(){
			var targetObject = {};
			expect(helper.containsElement(targetObject, [{}, targetObject, {}])).toBe(true);
		});
		
		it('indicates if array does not contain element', function(){
			expect(helper.containsElement(99, [100, 101, 102])).toBe(false);
		});
		
	});
	
	describe('removeElement', function(){
		
		it('removes simple element from array', function(){
			var array = ['a', 'b', 'c'];
			var newArray = helper.removeElement('b', array);
			expect(newArray.length).toBe(2);
			expect(newArray[0]).toBe('a');
			expect(newArray[1]).toBe('c');
		});
		
		it('removes object from array', function(){
			var targetObject = {};
			var otherObject1 = {};
			var otherObject2 = {};
			var array = [targetObject, otherObject1, otherObject2];
			var newArray = helper.removeElement(targetObject, array);
			expect(newArray.length).toBe(2);
			expect(newArray[0]).toBe(otherObject1);
			expect(newArray[1]).toBe(otherObject2);
		});
		
		it('returns original array', function(){
			var array = ['a', 'b', 'c'];
			var newArray = helper.removeElement('b', array);
			expect(array === newArray).toBe(true);
		});
		
		it('can return new array containing same elements using a flag', function(){
			var targetObject = {};
			var otherObject1 = {};
			var otherObject2 = {};
			var array = [otherObject1, targetObject, otherObject2];
			var newArray = helper.removeElement(targetObject, array, true);
			expect(array === newArray).toBe(false);
			expect(newArray.length).toBe(2);
			expect(newArray[0]).toBe(otherObject1);
			expect(newArray[1]).toBe(otherObject2);
		});
		
		it('throws error if element is not present', function(){
			var expectedError = new Error('Array does not contain provided element');
			expect(function(){ helper.removeElement('a', [1, 2, 3]); }).toThrow(expectedError);
		});
		
	});
	
	describe('removeDuplicates', function(){
		
		it('removes simple duplicates from array', function(){
			var array = [1, 2, 1, 3, 3];
			var alteredArray = helper.removeDuplicates(array);
			expect(alteredArray.length).toBe(3);
			expect(alteredArray[0]).toBe(1);
			expect(alteredArray[1]).toBe(2);
			expect(alteredArray[2]).toBe(3);
		});
		
		it('removes object duplicates from array', function(){
			var targetObject1 = {};
			var targetObject2 = {};
			var array = [targetObject1, targetObject2, targetObject2];
			var alteredArray = helper.removeDuplicates(array);
			expect(alteredArray.length).toBe(2);
			expect(alteredArray[0]).toBe(targetObject1);
			expect(alteredArray[1]).toBe(targetObject2);
		});
		
		it('removes multiple duplicates', function(){
			expect(helper.removeDuplicates([1, 2, 3, 3, 2, 3, 2, 1, 2, 3, 1])).toEqual([1, 2, 3]);
		});
		
		it('returns array unaffected if no duplicates exist', function(){
			var targetObject1 = {};
			var targetObject2 = {};
			var array = [targetObject1, targetObject2];
			var alteredArray = helper.removeDuplicates(array);
			expect(alteredArray.length).toBe(2);
			expect(alteredArray[0]).toBe(targetObject1);
			expect(alteredArray[1]).toBe(targetObject2);
		});
		
		it('returns original array', function(){
			var array = ['one', 'two', 'one'];
			var alteredArray = helper.removeDuplicates(array);
			expect(array === alteredArray).toBe(true);
		});
		
		it('can return new array containing same elements using a flag', function(){
			var targetObject1 = {};
			var targetObject2 = {};
			var array = [targetObject1, targetObject2, targetObject2];
			var alteredArray = helper.removeDuplicates(array, true);
			expect(array === alteredArray).toBe(false);
			expect(alteredArray.length).toBe(2);
			expect(alteredArray[0]).toBe(targetObject1);
			expect(alteredArray[1]).toBe(targetObject2);
		});
		
	});
	
	describe('toNewArray', function(){
		
		it('returns new array containing same elements', function(){
			var object = {};
			var array = [1, 'two', true, object];
			var newArray = helper.toNewArray(array);
			expect(array === newArray).toBe(false);
			expect(newArray.length).toBe(4);
			expect(newArray[0]).toBe(1);
			expect(newArray[1]).toBe('two');
			expect(newArray[2]).toBe(true);
			expect(newArray[3]).toBe(object);
		});
		
	});
	
	describe('objectToArray', function(){
		
		it('moves object values into new array', function(){
			var subObject = {};
			var object = { name: 'Pete', age: 30, favObject: subObject };
			var array = helper.objectToArray(object);
			expect(Object.prototype.toString.call(array)).toBe('[object Array]');
			expect(array.length).toBe(3);
			expect(array[0]).toBe('Pete');
			expect(array[1]).toBe(30);
			expect(array[2]).toBe(subObject);
		});
		
	});
	
	describe('enumerateObjectToArray', function(){
		
		it('translates enumeratable object to array', function(){
			var object = {
				2: 'three',
				0: 'one',
				length: 3,
				1: 'two'
			};
			var array = helper.enumerateObjectToArray(object);
			expect(Object.prototype.toString.call(array)).toBe('[object Array]');
			expect(array.length).toBe(3);
			expect(array[0]).toBe('one');
			expect(array[1]).toBe('two');
			expect(array[2]).toBe('three');
		});
		
		it('translates missing indices as undefined', function(){
			var object = {
				length: 2,
				1: 'one'
			};
			var array = helper.enumerateObjectToArray(object);
			expect(array.length).toBe(2);
			expect(array[0]).toBe(undefined);
			expect(array[1]).toBe('one');
		});
		
		it('ignores non-numerically-indexed values', function(){
			var object = {
				length: 2,
				0: 'one',
				1: 'two',
				key: 'value'
			};
			var array = helper.enumerateObjectToArray(object);
			expect(array.length).toBe(2);
			expect(array[0]).toBe('one');
			expect(array[1]).toBe('two');
		});
		
		it('ignores out-of-range values', function(){
			var object = {
				length: 2,
				0: 'one',
				1: 'two',
				2: 'threee'
			};
			var array = helper.enumerateObjectToArray(object);
			expect(array.length).toBe(2);
			expect(array[0]).toBe('one');
			expect(array[1]).toBe('two');
		});
		
		it('throws error if length property is not present in object', function(){
			var expectedError = new Error('Cannot enumerate an object with no length property');
			expect(function(){ helper.enumerateObjectToArray({}); }).toThrow(expectedError);
		});
		
	});
	
});
