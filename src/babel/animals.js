class Animal
{
  constructor(name, voice)
  {
    this.name = name;
    this.voice = voice;
  }

  speak()
  {
    return `${this.name} says ${this.voice}`;
  }
}

class Fox extends Animal
{
  constructor(name, voice)
  {
    super(name, voice);
  }

  speak()
  {
    return "Fox " + super.speak();
  }
}

module.exports = {
  Fox: Fox
};
