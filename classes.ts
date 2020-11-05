import { Injectable } from "./injector";

export namespace Classes {
  @Injectable()
  export class A {
    foo: string;
    constructor() {
      this.foo = "bar";
    }
  }
  @Injectable()
  export class B {
    constructor(private readonly a: A) {}
  }
}
