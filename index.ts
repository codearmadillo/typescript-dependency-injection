import { Injector } from "./injector";
import { Classes } from "./classes";

const evaluate = (expected: any, result: any) => {
  if (expected === result) {
    console.log(`Success: '${expected}' equals '${result}'`);
  } else {
    console.error(`Failed: '${expected}' does not equal '${result}'`);
  }
};

console.groupCollapsed(new Date());
/** Create class */
const FirstClassA = Injector.get<Classes.A>(Classes.A);
evaluate("bar", FirstClassA.foo);
/** Change FOO on A */
FirstClassA.foo = "zed";
evaluate("zed", FirstClassA.foo);
/** Create second A and check value */
const SecondClassA = Injector.get<Classes.A>(Classes.A);
evaluate("zed", SecondClassA.foo);
console.groupEnd();
