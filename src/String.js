define(

'class ClassyHelper.String',
{
	
	'public constant PASCAL (number)': undefined,
	'public constant HYPHEN (number)': undefined,
	'public constant UNDERSCORE (number)': undefined,
	
	'public uppercaseFirst (string) -> string': function(string)
	{
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	
	'public convertCase (string, number, number) -> string': function(string, from, to)
	{
		
		// @todo This will be much more concise
		// once the ClassyJS Reflection API
		// gives us access to a list of constants
		
		// Throw an error if the provided
		// string contains a space character
		// as this means it cannot be
		// charactarised as any format
		if (this.containsCharacter(string, ' ')) {
			throw new Error('Formatted string cannot contain spaces');
		}
		
		// Traverse the available formats
		// that the string could already
		// be in, noting which function
		// can convert it to an array
		switch (from) {
			case ClassyHelper.String.PASCAL():
				var fromFunction = 'fromPascal';
			break;
			case ClassyHelper.String.HYPHEN():
				var fromFunction = 'fromHyphen';
			break;
			case ClassyHelper.String.UNDERSCORE():
				var fromFunction = 'fromUnderscore';
			break;
		}
		
		// Traverse the available formats
		// that the string can be converted
		// in to, noting which function
		// should handle the array
		switch (to) {
			case ClassyHelper.String.PASCAL():
				var toFunction = 'toPascal';
			break;
			case ClassyHelper.String.HYPHEN():
				var toFunction = 'toHyphen';
			break;
			case ClassyHelper.String.UNDERSCORE():
				var toFunction = 'toUnderscore';
			break;
		}
		
		// Pass the string to the
		// 'fromFunction' and pass the
		// returned array to the 'toFunction'
		return this[toFunction](this[fromFunction](string));
		
	},
	
	'public containsCharacter (string, string, boolean = true) -> boolean': function(string, character, caseSensitive)
	{
		
		// If the character is not a string
		// of length one, throw an error
		if (character.length != 1) {
			throw new Error('Provided character must be a string of length one');
		}
		
		// If we do not care about case
		// sensitivity, convert both
		// the search string and the
		// character to lower case
		if (!caseSensitive) {
			string = string.toLowerCase();
			character = character.toLowerCase();
		}
		
		// Check whether the string
		// contains the character
		return (string.split(character).length > 1) ? true : false;
		
	},
	
	'protected fromUnderscore (string) -> [string]': function(string)
	{
		
		// Simply split by underscore
		return string.toLowerCase().split('_');
		
	},
	
	'protected fromHyphen (string) -> [string]': function(string)
	{
		
		// Simply split by hyphen
		return string.toLowerCase().split('-');
		
	},
	
	'protected fromPascal (string) -> [string]': function(string)
	{
		
		// Throw an error if the provided
		// string does not begin with a
		// capital letter as this means it
		// cannot be charactarised as 'Pascal'
		if (!string[0].match(/[A-Z]/)) {
			throw new Error('Provided string is not \'Pascal\' formatted');
		}
		
		// Traverse the provided string,
		// stopping each time a capital
		// letter is reached to record
		// a new string entry
		var parts = [];
		var currentString = '';
		for (var i = 0; i < string.length; i++) {
			if (string[i].match(/[A-Z]/)) {
				if (currentString != '') {
					parts.push(currentString);
					currentString = '';
				}
			}
			currentString += string[i].toLowerCase();
		}
		
		// Make sure we add the
		// last part to the array
		parts.push(currentString);
		
		// We end up with a string
		// array of parts
		return parts;
		
	},
	
	'protected toUnderscore ([string]) -> string': function(parts)
	{
		
		// Simply join by underscore
		return parts.join('_');
		
	},
	
	'protected toHyphen ([string]) -> string': function(parts)
	{
		
		// Simply join by hyphen
		return parts.join('-');
		
	},
	
	'protected toPascal ([string]) -> string': function(parts)
	{
		
		// Uppercase the first letter
		// of each part before joining
		// them all together
		for (var i = 0; i < parts.length; i++) {
			parts[i] = this.uppercaseFirst(parts[i]);
		}
		return parts.join('');
		
	}
	
});
