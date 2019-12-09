import { Component, OnInit, Output } from "@angular/core";
import Machine from "../_machine/machine";
import { FfxivApiService } from "../_services/ffxiv-api.service";

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"]
})
export class CanvasComponent implements OnInit {
  mounts: any[] = [];
  machine: Machine;
  idle: any = { message: "Idle" };
  fetching: any;
  fetched: any;
  fetchError: any;

  constructor(private ffxiv: FfxivApiService) {}

  ngOnInit() {
    this.machine = new Machine(this.idle);

    const idle = this.machine.getCurrentState();
    this.fetching = this.machine.newState({ message: "Fetching..." });
    this.fetched = this.machine.newState({ message: "Success!" });
    this.fetchError = this.machine.newState({ message: "Error" });

    this.machine.newTransition(
      idle,
      this.fetching,
      "CLICK FETCH",
      this.ffxiv.allMounts()
    );

    this.machine.newTransition(this.fetching, this.fetched, "SUCCESS");
    this.machine.newTransition(this.fetching, this.fetchError, "ERROR");
    this.machine.newTransition(
      this.fetchError,
      this.fetching,
      "RETRY",
      this.ffxiv.allMounts()
    );
    this.machine.transitionAllTo(idle, "RESET");
  }

  handleEvent(eventName) {
    const transitionOutput = this.machine.sendEvent(eventName);

    transitionOutput.subscribe(
      allMountData => {
        console.log(allMountData);
        this.mounts = allMountData.Results.filter(mount => {return mount.Name});
      },
      err => {
        this.machine.sendEvent("ERROR");
      },
      () => {
        this.machine.sendEvent("SUCCESS");
      }
    );
  }

  resetData() {
    this.mounts = [];
    this.machine.sendEvent("RESET");
  }

  getStateColor(state) {
    return this.machine.getCurrentState() === state ? 'green' : 'rgb(87,87,87)'
  }
}
