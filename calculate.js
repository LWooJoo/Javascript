// 3. 문자열로 입력된 수식을 연산하고 결과값을 출력하는 코드를 작성하시오. (eval, Function 사용 금지)
// input: 1+7*(15-1)/2
// output: 50

function calculate(input) {

    var f = {
        add: '+'
        , sub: '-'
        , div: '/'
        , mlt: '*'
        , mod: '%'
        , exp: '^'
    };

    // Create array for Order of Operation and precedence
    f.ooo = [[[f.mlt], [f.div], [f.mod], [f.exp]],
    [[f.add], [f.sub]]];

    input = input.replace(/[^0-9%^*\/()\-+.]/g, '');           // clean up unnecessary characters

    var output;
    for (var i = 0, n = f.ooo.length; i < n; i++) {

        // Regular Expression to look for operators between floating numbers or integers
        var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
        re.lastIndex = 0;                                     // be cautious and reset re start pos

        // Loop while there is still calculation for level of precedence
        while (re.test(input)) {
            //document.write('<div>' + input + '</div>');
            output = calc_internal(RegExp.$1, RegExp.$2, RegExp.$3);
            if (isNaN(output) || !isFinite(output)) return output;   // exit early if not a number
            input = input.replace(re, output);
        }
    }

    return output;

    function calc_internal(a, op, b) {
        a = a * 1; b = b * 1;
        switch (op) {
            case f.add: return a + b; break;
            case f.sub: return a - b; break;
            case f.div: return a / b; break;
            case f.mlt: return a * b; break;
            case f.mod: return a % b; break;
            case f.exp: return Math.pow(a, b); break;
            default: null;
        }
    }
}

