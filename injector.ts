import "reflect-metadata";

class DependencyInjector {
  private readonly diBuffer: Map<string, any> = new Map();
  private readonly diTokenKey: string = "diInjectionTokenKey";
  get<T>(injectionToken: new (...args: any[]) => T) {
    if (Reflect.hasMetadata(this.diTokenKey, injectionToken.prototype)) {
      try {
        const entity = this.diBuffer.get(
          Reflect.getMetadata(this.diTokenKey, injectionToken.prototype)
        );
        if (!entity) {
          throw new Error(
            `NullInjector: '${injectionToken.name}' was not found.`
          );
        } else {
          return entity;
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    } else {
      /** Craete new token */
      const token = this.generateDiTokenValue();
      /** Set metadata on prototype */
      Reflect.defineMetadata(this.diTokenKey, token, injectionToken.prototype);
      /** Create entity */
      const entity = new injectionToken();
      /** Create instance of class and return it */
      this.diBuffer.set(token, entity);
      /** Return entity */
      return entity;
    }
  }
  private generateDiTokenValue(): string {
    const chars =
      "0123456789yxcvbnmlkjhgfdsaqwertzuiopYXCVBNMLKJHGFDSAQWERTZUIOP";
    return new Array(64)
      .fill(null)
      .map(() => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
      })
      .join("");
  }
}
export const Injector = new DependencyInjector();
export const Injectable = () => {
  return (target: new (...args: any[]) => any) => {
    return target;
  };
};
