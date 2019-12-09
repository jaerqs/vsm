import { Injectable } from "@angular/core";
import { State, Transition } from "./state";

export default class Machine {
  private currentState: State = new State({});
  private states: State[] = [];

  constructor(payload: any) {
    this.newState(payload);
    this.currentState = this.states[0];
  }

  newState(payload: any): State {
    this.states.push(new State({ ...this.currentState.data, ...payload }));
    return this.states[this.states.length - 1];
  }

  transitionAllTo(nextState: State, event: any, output: any = () => {}) {
    this.states.forEach(state => {
      this.newTransition(state, nextState, event, output);
    });
  }

  newTransition(
    currentState: State,
    nextState: State,
    event: any,
    output: any = () => {}
  ): void {
    const transition: Transition = {
      event: event,
      nextState: nextState,
      output: output
    };

    this.states.forEach(state => {
      if (state == currentState) {
        state.setTransition(transition);
      }
    });
  }

  getCurrentState(): State {
    return this.currentState;
  }

  getAllStates(): State[] {
    return this.states;
  }
  
  sendEvent(event): any {
    for (const transition of this.currentState.transitions) {
      if (event === transition.event) {
        this.currentState = transition.nextState;

        return transition.output;
      }
    }
    throw "A transition has not been created for this event";
  }


}
