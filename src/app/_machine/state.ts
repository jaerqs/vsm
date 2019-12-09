interface Transition {
    event: any;
    nextState: State;
    output: any;
}

class State {
    data: any;
    transitions: Transition[] = [];

    constructor(data: any) {
        this.data = data;
    }

    setTransition(transition: Transition) {
        this.transitions.push(transition);
    }
}

export {Transition, State};