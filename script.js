class Tracer {

    constructor(input) {
        this.indentLevel = 0;
        this.result = {};
        this.result.input = input;
        this.result.obj = [];
    }

    log(event) {
        event.indentLevel = this.indentLevel;
        this.result.obj.push(event);
    }

    trace(event) {
        switch (event.type) {
            case "rule.enter":
                this.log(event);
                this.indentLevel++;
                break;
            case "rule.match":
                this.indentLevel--;
                this.log(event);
                break;
            case "rule.fail":
                this.indentLevel--;
                this.log(event);
                break;
            default:
                throw new Error(`Invalid event type: $event.type`)
        }
    }

    getResult() {
        return this.result;
    }
}

module.exports = {
    Tracer
}