const operators = {
    '+': 1, '-': 2, '*': 3, '/': 4, '%': 5, '=': 6,
    '<': 7, '>': 8, '==': 9, '!=': 10, '<=': 11, '>=': 12, 
    '++': 13, '--': 14,
    '!': 15, '&&': 16, '||': 17,
    '~': 18, '&': 19, '|': 20, '^': 21, '>>': 22, '<<': 23,
    '+=': 24, '-=': 25, '*=': 26, '/=': 27, '%=': 28,
    '&=': 29, '|=': 30, '^=': 31, '<<=': 32, '>>=': 33,
    '->': 34, '.': 35, '[': 36, ']': 37,  
    '(': 38, ')': 39, ':': 40, '': 41, '': 42, ';': 43
};

const cycles = {
    'for': 51, 'while': 51, 'do': 51,
};

const vartypes = {
    'size_t': 61, 'int32_t': 61, 'int64_t': 61, 
    'int': 61, 'long': 61, 'bool': 62, 'char': 63, 
    'float': 64, 'double': 65, 'short': 66, 'string': 67,
    'map': 68, 'set': 69, 'vector': 70, 'queue': 71,
    'pair': 72, 'deque': 73, 'list': 74, 'stack': 75,
    'void': 76, 'let': 78, 'const': 79
};

const keywords = {
    'if': 81, 'else': 81, 'elif': 81, 'new': 82, 'auto': 83,
    'throw': 84, 'private': 85, 'continue': 86, 'break': 87,
    'try': 88, 'catch': 89, 'public': 90, 'reinterpret_cast': 91,
    'static_cast': 92, 'class': 93, 'return': 94, 'friend': 95,
    'virtual': 96, 'static': 97, 'inline': 98, 'delete': 99,
    'struct': 100, 'asm': 101
};

const stringType = 111;
const numberType = 112;
const varType = 113;


const getType = (content) => {
    if (operators[content]) {
        return operators[content];
    }
    if (cycles[content]) {
        return cycles[content];
    }
    if (vartypes[content]) {
        return vartypes[content];
    }
    if (keywords[content]) {
        return keywords[content];
    }
    if (content[0] == '\'' || content[0] == '\"') {
        return stringType;
    }
    if ('0' <= content[0] && content[0] <= '9') {
        return numberType;
    }
    return varType;
}

class Token {
    constructor(content) {
        this.content = content;
        this.tokenType = getType(content);
    }
}

module.exports = Token;