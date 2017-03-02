class Animal
  constructor: (@name, @voice) ->

  speak: ->
    "#{@name} says #{@voice}"

class Cat extends Animal
  speak: ->
    "Cat " + super

module.exports =
  Cat: Cat
