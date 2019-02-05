var input = document.getElementById("input");

function doStuff() {
    let output = document.getElementById("output");
    output.textContent = fixCssValue(input.textContent.trim());
}

doStuff();

input.focus();

input.oninput = function() {
    doStuff();
};

function fixCssValue(value) {
    let length = value.length;
    let parenthesisUnclosedCount = 0;

    const State = {
        Data: 0,
        SingleQuoteString: 2,
        DoubleQuoteString: 3,
        Comment: 4
    };

    let state = State.Data;

    for (let i = 0; i < length; i++) {
        let char = value[i];
        switch (char) {
        case "'":
            if (state === State.Data)
                state = State.SingleQuoteString;
            else if (state === State.SingleQuoteString)
                state = State.Data;
            break;

        case "\"":
            if (state === State.Data)
                state = State.DoubleQuoteString;
            else if (state === State.DoubleQuoteString)
                state = State.Data;
            break;

        case "(":
            if (state === State.Data)
                ++parenthesisUnclosedCount;
            break;

        case ")":
            if (state === State.Data && parenthesisUnclosedCount)
                --parenthesisUnclosedCount;
            break;

        case "/":
            if (state === State.Data) {
                if (i + 1 < length && value[i + 1] === "*")
                    state = State.Comment;
            }
            break;

        case "*":
            if (state === State.Comment) {
                if (i + 1 < length && value[i + 1] === "/")
                    state = State.Data;
            }
            break;

        }
    }

    let suffix = "";
    switch (state) {
    case State.SingleQuoteString:
        suffix = "'";
        break;
    case State.DoubleQuoteString:
        suffix = "\"";
        break;
    case State.Comment:
        suffix = "*/";
        break;
    }

    if (parenthesisUnclosedCount)
        suffix += ")".repeat(parenthesisUnclosedCount);

    return suffix;
}
