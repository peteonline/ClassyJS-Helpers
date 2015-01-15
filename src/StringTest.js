describe('ClassyHelper.String', function(){
	
	var helper;
	
	beforeEach(function(){
		helper = new ClassyHelper.String();
	});
	
	describe('uppercaseFirst', function(){
		
		it('converts first letter of string to uppercase', function(){
			expect(helper.uppercaseFirst('pete')).toBe('Pete');
		});
		
		it('does nothing if first letter is already upper case', function(){
			expect(helper.uppercaseFirst('Pete')).toBe('Pete');
		});
		
		it('does nothing if first character is not a letter', function(){
			expect(helper.uppercaseFirst('!pete')).toBe('!pete');
		});
		
	});
	
	describe('convertCase', function(){
		
		it('converts from a variety of formats to other formats', function(){
			// Note this is all combinations
			// of Pascal, hyphen and underscore
			expect(helper.convertCase(
				'ExamplePascalCased',
				ClassyHelper.String.PASCAL(),
				ClassyHelper.String.HYPHEN()
			)).toBe('example-pascal-cased');
			expect(helper.convertCase(
				'ExamplePascalCased',
				ClassyHelper.String.PASCAL(),
				ClassyHelper.String.UNDERSCORE()
			)).toBe('example_pascal_cased');
			expect(helper.convertCase(
				'example-hyphen-ated',
				ClassyHelper.String.HYPHEN(),
				ClassyHelper.String.PASCAL()
			)).toBe('ExampleHyphenAted');
			expect(helper.convertCase(
				'example-hyphen-ated',
				ClassyHelper.String.HYPHEN(),
				ClassyHelper.String.UNDERSCORE()
			)).toBe('example_hyphen_ated');
			expect(helper.convertCase(
				'example_under_scored',
				ClassyHelper.String.UNDERSCORE(),
				ClassyHelper.String.PASCAL()
			)).toBe('ExampleUnderScored');
			expect(helper.convertCase(
				'example_under_scored',
				ClassyHelper.String.UNDERSCORE(),
				ClassyHelper.String.HYPHEN()
			)).toBe('example-under-scored');
		});
		
		it('throws error if string contains spaces', function(){
			var expectedError = new Error('Formatted string cannot contain spaces');
			expect(function(){
				helper.convertCase(
					'Example String',
					ClassyHelper.String.PASCAL(),
					ClassyHelper.String.HYPHEN()
				);
			}).toThrow(expectedError);
		});
		
		it('simply lower-cases first character if no further Pascal humps are present', function(){
			expect(helper.convertCase(
				'Example',
				ClassyHelper.String.PASCAL(),
				ClassyHelper.String.HYPHEN()
			)).toBe('example');
		});
		
		it('treats double capital letters as separate words in Pascal casing', function(){
			expect(helper.convertCase(
				'ExampleABC',
				ClassyHelper.String.PASCAL(),
				ClassyHelper.String.HYPHEN()
			)).toBe('example-a-b-c');
		});
		
		it('throws error if Pascal string does not start with a capital letter', function(){
			var expectedError = new Error('Provided string is not \'Pascal\' formatted');
			expect(function(){
				helper.convertCase(
					'exampleString',
					ClassyHelper.String.PASCAL(),
					ClassyHelper.String.HYPHEN()
				);
			}).toThrow(expectedError);
		});
		
		it('simply affects first character if no hyphens are present', function(){
			expect(helper.convertCase(
				'example',
				ClassyHelper.String.HYPHEN(),
				ClassyHelper.String.PASCAL()
			)).toBe('Example');
		});
		
		it('ignores multiple consecutive hyphen characters', function(){
			expect(helper.convertCase(
				'example--hyphen---ated',
				ClassyHelper.String.HYPHEN(),
				ClassyHelper.String.PASCAL()
			)).toBe('ExampleHyphenAted');
		});
		
		it('simply affects first character if no underscores are present', function(){
			expect(helper.convertCase(
				'example',
				ClassyHelper.String.UNDERSCORE(),
				ClassyHelper.String.PASCAL()
			)).toBe('Example');
		});
		
		it('ignores multiple consecutive underscore characters', function(){
			expect(helper.convertCase(
				'example__under___scored',
				ClassyHelper.String.UNDERSCORE(),
				ClassyHelper.String.PASCAL()
			)).toBe('ExampleUnderScored');
		});
		
	});
	
	describe('containsCharacter', function(){
		
		it('identifies if string contains character', function(){
			expect(helper.containsCharacter('example', 'e')).toBe(true);
		});
		
		it('identifies if string does not contain character', function(){
			expect(helper.containsCharacter('example', 'b')).toBe(false);
		});
		
		it('throws error if character provided is not one single character', function(){
			var expectedError = new Error('Provided character must be a string of length one');
			expect(function(){ helper.containsCharacter('abc', 'ab'); }).toThrow(expectedError);
		});
		
		it('identifies character case-sensitively', function(){
			expect(helper.containsCharacter('abc', 'A')).toBe(false);
		});
		
		it('can identify a character non-case-sensitively via a flag', function(){
			expect(helper.containsCharacter('abc', 'A', false)).toBe(true);
		});
		
	});
	
});
