//.CommonJS
var CSSOM = {
	CSSValue: require('./CSSValue').CSSValue
};
///CommonJS


/**
 * @constructor
 * @see http://msdn.microsoft.com/en-us/library/ms537634(v=vs.85).aspx
 *
 */
CSSOM.CSSValueExpression = function CSSValueExpression(token, idx) {
	this._token = token;
	this._idx = idx;
};

CSSOM.CSSValueExpression.prototype = new CSSOM.CSSValue;
CSSOM.CSSValueExpression.prototype.constructor = CSSOM.CSSValueExpression;

/**
 * parse css expression() value
 *
 * @return {Object}
 *				 - error:
 *				 or
 *				 - idx:
 *				 - expression:
 *
 * Example:
 *
 * .selector {
 *		zoom: expression(documentElement.clientWidth > 1000 ? '1000px' : 'auto');
 * }
 */
CSSOM.CSSValueExpression.prototype.parse = function() {
	var token = this._token,
			idx = this._idx;

	var character = '',
			STATES = {
				LITERAL: 0,
				STRING: 1,
				REGEXP: 2
			},
			state = STATES.LITERAL;
			string_sep = '',
			expression = '',
			error = '',
			paren = [];


	for (; ; ++idx) {
		character = token.charAt(idx);

		// end of token
		if (character == '') {
			error = 'css expression error: unfinished expression!';
			break;
		}

		switch(character) {
			case '(':
				if (state == STATES.LITERAL) {
					paren.push(character);
				}
				expression += character;
				break;

			case ')':
				if (state == STATES.LITERAL) {
					paren.pop(character);
				}
				expression += character;
				break;

			case '/':
				if (state == STATES.LITERAL) {
					var nextChar = token.charAt(idx + 1),
							regExp;
					if (nextChar == '/' || nextChar == '*') { // comment
						var commentEndChar,
								commentEndIdx;

						if (nextChar == '/') { // line comment
							commentEndChar = '\n';
						} else if (nextChar == '*') { // block comment
							commentEndChar = '*/';
						}

						commentEndIdx = token.indexOf(commentEndChar, idx + 1 + 1);
						if (commentEndIdx !== -1) {
							idx = commentEndIdx + commentEndChar.length - 1;
						} else {
							error = 'css expression error: unfinished comment in expression!';
						}
					} else if (regExp = parseJSRexExp(token, idx)) { // regexp?
						idx = regExp.idx;
						expression += regExp.regExp;
					} else {
						expression += character;
					}
				} else {
					expression += character;
				}
				break;

			// TODO: string_sep in regexp
			case "'":
			case '"':
				if (state == STATES.LITERAL) {
					state = STATES.STRING;
					string_sep = character;
				} else if (state == STATES.STRING) {
					if (string_sep == character) {
						var matched = expression.match(/\\+$/);
						if (!matched || matched[0].length % 2 == 0) {
							state = STATES.LITERAL;
							string_sep = '';
						}
					}
				}
				expression += character;
				break;

			default:
				expression += character;
				break;
		}

		if (error) {
			break;
		}

		// end of expression
		if (paren.length == 0) {
			break;
		}
	}

	var ret;
	if (error) {
		ret = {
			error: error
		}
	} else {
		ret = {
			idx: idx,
			expression: expression
		}
	}

	return ret;
};


/**
 * parse regexp in css expression
 *
 * @return {Object|false}
 *         - idx:
 *         - regExp:
 *         or 
 *         false
 */

/*

all legal RegExp
 
/a/
(/a/)
[/a/]
[12, /a/]

!/a/

+/a/
-/a/
* /a/
/ /a/
%/a/

===/a/
!==/a/
==/a/
!=/a/
>/a/
>=/a/
</a/
<=/a/

&/a/
|/a/
^/a/
~/a/
<</a/
>>/a/
>>>/a/

&&/a/
||/a/
?/a/
=/a/
,/a/

    delete /a/
        in /a/
instanceof /a/
       new /a/
    typeof /a/
      void /a/

*/
function parseJSRexExp(token, idx) {
  var before = token.substring(0, idx).trimRight(),
      legalRegx = [
        /^$/,
        /\($/,
        /\[$/,
        /\!$/,
        /\+$/,
        /\-$/,
        /\*$/,
        /\/\s+/,
        /\%$/,
        /\=$/,
        /\>$/,
        /\<$/,
        /\&$/,
        /\|$/,
        /\^$/,
        /\~$/,
        /\?$/,
        /\,$/,
        /delete$/,
        /in$/,
        /instanceof$/,
        /new$/,
        /typeof$/,
        /void$/,
      ];

  var isLegal = legalRegx.some(function(reg) {
    return reg.test(before);
  });

  if (!isLegal) {
    return false;
  } else {
    var startIdx = idx,
        regexp;

    while(true) {
      var regEndIdx = token.indexOf('/', startIdx + 1);

      if (regEndIdx === -1) {
        return false;
      } else {
        regexp = token.substring(idx + 1, regEndIdx);
        var matched = regexp.match(/\\+$/);
        if (!matched || matched[0] % 2 == 0) {
          regexp = '/' + regexp + '/';
          break;
        } else {
          startIdx = regEndIdx;
        }
      }
    }
  }

  // validate
  // RegExp boundary(/) must be in the same line
  var nextNewLineIdx = token.indexOf('\n', idx + 1);
  if (nextNewLineIdx < regEndIdx) {
    return false;
  }


  return {
    idx: regEndIdx,
    regExp: regexp
  };
}




//.CommonJS
exports.CSSValueExpression = CSSOM.CSSValueExpression;
///CommonJS
