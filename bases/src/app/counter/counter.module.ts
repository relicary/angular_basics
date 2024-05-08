import { NgModule } from "@angular/core";
import { CounterComponent } from "./components/counter/counter.components";

@NgModule({
  declarations: [
    CounterComponent
  ],
  exports: [
    CounterComponent
  ]
})

export class CounterModule { }
