/*
Story

A freak power outage at the zoo has caused all of the electric cage doors to malfunction and swing open...

All the animals are out and some of them are eating each other!

It's a Zoo Disaster!

Here is a list of zoo animals, and what they can eat

antelope eats grass
big-fish eats little-fish
bug eats leaves
bear eats big-fish
bear eats bug
bear eats chicken
bear eats cow
bear eats leaves
bear eats sheep
chicken eats bug
cow eats grass
fox eats chicken
fox eats sheep
giraffe eats leaves
lion eats antelope
lion eats cow
panda eats leaves
sheep eats grass


Kata Task

INPUT

A comma-separated string representing all the things at the zoo

TASK

Figure out who eats who until no more eating is possible.

OUTPUT

A list of strings (refer to the example below) where:

The first element is the initial zoo (same as INPUT)
The last element is a comma-separated string of what the zoo looks like when all the eating has finished
All other elements (2nd to last-1) are of the form X eats Y describing what happened
Notes

Animals can only eat things beside them
Animals always eat to their LEFT before eating to their RIGHT
Always the LEFTMOST animal capable of eating will eat before any others
Any other things you may find at the zoo (which are not listed above) do not eat anything and are not edible
*/

console.log(whoEatsWho('fox,bug,chicken,grass,sheep'));

function whoEatsWho(zoo) {

  var finalZoo = [zoo];

  var favoriteFood = {
    'antelope': ['grass'],
    'big-fish': ['little-fish'],
    'bug': ['leaves'],
    'bear': ['big-fish', 'bug', 'chicken', 'cow', 'leaves', 'sheep'],
    'chicken': ['bug'],
    'cow': ['grass'],
    'fox': ['chicken', 'sheep'],
    'giraffe': ['leaves'],
    'lion': ['antelope', 'cow'],
    'panda': ['leaves'],
    'sheep': ['grass']
  };

  var initialZoo = zoo.split(',');
  var ate = true;

  while (ate) {
    ate = false;

    for (var i = 0; i < initialZoo.length; i++) {

      //unknown entity
      if (i < 0 || !favoriteFood.hasOwnProperty(initialZoo[i])) {
        continue;
      }

      //try to eat left
      if (i !== 0 && favoriteFood[initialZoo[i]].indexOf(initialZoo[i - 1]) != -1) {
        finalZoo.push(initialZoo[i] + ' eats ' + initialZoo[i - 1]);

        initialZoo = initialZoo.filter(function (element, index) {
          if (index != i - 1) {
            return element;
          }
        });

        i -= 2;
        ate = true;
        continue; //stay
      }

      if (ate) {
        break; //back to start
      }

      //try to eat right
      if (i == initialZoo.length || favoriteFood[initialZoo[i]].indexOf(initialZoo[i + 1]) == -1) {
        continue;
      }

      //eat right
      finalZoo.push(initialZoo[i] + ' eats ' + initialZoo[i + 1]);

      initialZoo = initialZoo.filter(function (element, index) {
        if (index != i + 1) {
          return element;
        }
      });
      
      i--; //stay
      ate;
    }
  }

  return finalZoo.concat(initialZoo.join(','));
}