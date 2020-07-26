// Parse code to tokens and comments
const Token = require('./token').Token;
const operators = require('./token').operators;

const parse = (content) => {
    const forComments = [];
    const forTokens = [];
    const size = content.length;
    for (let i = 0; i < size; ++i) {
        if (content[i] == '/' && i < size - 1 && content[i + 1] == '/') {             // one line comments
            i += 2;
            let comment = '';
            while (i < size && content[i] != '\n') {
                comment += content[i++];
            }
            forComments.push(comment);
        } else if (content[i] == '/' && i < size - 1 && content[i + 1] == '*') {      // multiple line comments
            i += 2;
            let comment = '';
            while (i < size - 1 && (content[i] != '*' || content[i + 1] != '/')) {
                comment += content[i++];
            }
            i++;
            forComments.push(comment);
        } else if (content[i] == '"' || content[i] == "'") {                        // content types
            let stopChar = content[i++];
            let str = '';
            while (i < size && content[i] != stopChar) {
                str += content[i++];
            }
            forTokens.push(new Token(str));
        } else if (content[i] == ' ' || content[i] == '\t' ||                         // spaces
                   content[i] == '\n' || content[i] == '\r') {      
            // skip
        } else if ('a' <= content[i] && content[i] <= 'z' ||                          // numbers or words
                   'A' <= content[i] && content[i] <= 'Z' || 
                   '0' <= content[i] && content[i] <= '9') {
            
            let token = '';

            while (i < size && 
                  ('a' <= content[i] && content[i] <= 'z' ||
                   'A' <= content[i] && content[i] <= 'Z' || 
                   '0' <= content[i] && content[i] <= '9' )) {
                       token += content[i++];
            }
            i--;
            forTokens.push(new Token(token));
        } else {                                                                // operators
            let oper = '';
            for (let j = i; j < size && j < i + 3; ++j) {
                oper += content[j];
            }
            while (!operators[oper] && oper.length > 1) {
                oper = oper.substr(0, oper.length - 1);
            }
            forTokens.push(new Token(oper));
            i += oper.length - 1;
        }
    }
    return {comments: forComments, tokens: forTokens};
}

module.exports = parse;