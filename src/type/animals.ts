"use strict";

// module Animals
// {
  abstract class Animal
  {
    constructor(public name: string, public voice: string) {}

    speak(): string
    {
      return this.name + " says " + this.voice;
    }
  }

  class Dog extends Animal
  {
    constructor(name: string, voice: string)
    {
      super(name, voice);
    }

    speak(): string
    {
      return "Dog " + super.speak();
    }
  }

  export { Dog };
// }
