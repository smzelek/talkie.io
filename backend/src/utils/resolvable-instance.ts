import { instance } from "ts-mockito";

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvableInstance = <T extends {}>(mock: T): T => new Proxy<T>(instance(mock), {
  get(target, name: PropertyKey) {
    if (["Symbol(Symbol.toPrimitive)", "then", "catch"].includes(name.toString())) {
      return undefined;
    }

    return (target as any)[name];
  },
});