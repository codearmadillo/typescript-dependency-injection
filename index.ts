import { Injector } from "./injector";
import { Classes } from "./classes";

const aTest = Injector.get<Classes.A>(Classes.A);
aTest.foo = "bar";
const FirstClassB = Injector.get<Classes.B>(Classes.B);
console.log(FirstClassB.a.foo);
