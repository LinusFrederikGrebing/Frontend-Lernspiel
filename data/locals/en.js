export default {
  levels: {
    level1: {
      description: '<h3>Hello and welcome to the first level of Draw IT!</h3> <br /> <p class=\"line-1 anim-typewriter1\">In the first level you will learn the basics of the game.</p> <p class=\"line-1 anim-typewriter2\"> You can find the template at the top right. Your task is to </p> <p class=\"line-1 anim-typewriter3\">trace the template into the left field using known JavaScript</p> <p class=\"line-1 anim-typewriter4\">operators. You can paint the box using the:</p><p class=\"line-1 anim-typewriter5\"> <b>paint(x, y)</b> method.</p><br /><p class=\"line-1 anim-typewriter6\">Now it is your turn! Have fun!</p>'
    },
    level2: {
      description: '<h3>Level 2</h3> <br /> <p class=\"line-1 anim-typewriter1\">In the second level we use a for loop. Have fun!'
    },
    level3: {
      description: "<h3>Level 3</h3> <br /> <p class=\"line-1 anim-typewriter1\">A bit of distance in between that loop is definitely not that difficult!</p> <p class=\"line-1 anim-typewriter2\">In this exercise, use the while loop instead!</p>",
    },
    level4: {
      description: "<h3>Level 4</h3> <br /> <p class=\"line-1 anim-typewriter1\">Now dare to do a diagonal!</p> <p class=\"line-1 anim-typewriter2\">Use the for loop again in this exercise!</p>",
    },
    level5: {
      description: "<h3>Level 5</h3> <br /> <p class=\"line-1 anim-typewriter1\">It's the same pattern!</p> <p class=\"line-1 anim-typewriter2\">But this time use the while loop!</p>"
    },
    level6: {
      description: "<h3>Level 6</h3> <br /> <p class=\"line-1 anim-typewriter1\">Do the same again!</p> <p class=\"line-1 anim-typewriter2\">Don't worry, just do it again with a do-while loop!</p> <p class=\"line-1 anim-typewriter3\">What do you notice?</p>"
    },
    level7: {
      description: "<h3>Level 7</h3> <br /><p class=\"line-1 anim-typewriter1\">It's not as hard as it looks!</p> <br />  <p class=\"line-1 anim-typewriter2\">Tip: You only need one for loop!</p>"
    },
    level8: {
      description: "<h3>Level 8</h3> <br /><p class=\"line-1 anim-typewriter1\">After the previous task, this one will be a piece of cake for you.</p> <br /> <p class=\"line-1 anim-typewriter2\">Please do this with a for loop!</p>"
    },
    level9: {
      description: "<h3>Level 9</h3> <br /> <p class=\"line-1 anim-typewriter1\"> You keep getting better and better!</p> <p class=\"line-1 anim-typewriter2\">You're taking big steps!</p> <p class=\"line-1 anim-typewriter3\">Use the for loop again!</p>"
    },
    level10: {
      description: "<h3>Level 10</h3> <br /> <p class=\"line-1 anim-typewriter1\">Color everything here!</p> <p class=\"line-1 anim-typewriter2\">Use the for loop for that!</p>"
    },
    level11: {
      description: "<h3>Level 11</h3> <br /><p class=\"line-1 anim-typewriter1\">The pattern looks nice!</p> <p class=\"line-1 anim-typewriter2\">It is important to be able to do your own research!</p> <p class=\"line-1 anim-typewriter3\">Find out for yourself now about if queries!</p> <p class=\"line-1 anim-typewriter4\">They will help you here!</p>  <p class=\"line-1 anim-typewriter5\">Again, use the for loop!</p>"
    },
    level12: {
      description: "<h3>Level 12</h3> <br /><p class=\"line-1 anim-typewriter1\">Please solve this level with a for loop!</p> <p class=\"line-1 anim-typewriter2\">Have fun!</p>"
    },
    level13: {
      description: "<h3>Level 13</h3> <br /><p class=\"line-1 anim-typewriter1\">Please solve this level with a do-while loop!</p> <p class=\"line-1 anim-typewriter2\">Have fun!</p>"
    },
    level14: {
      description: "<h3>Level 14</h3> <br /><p class=\"line-1 anim-typewriter1\">Draw a checkerboard pattern using for loops!</p> <p class=\"line-1 anim-typewriter2\">Tip: Modulo will help you!</p>"
    },
  }, 
  alerts: {
    continue: 'Continue!',
    succes: {
      successTitle: 'Excellent!',
      successText: 'You have mastered the level! Now you can try your best at the next level!',
      successConfirm: 'Next level!',
      successCancel: 'To the level selection!',
    },
    failure: {
      failureTitle: 'Next time...!',
      failureText: 'Unfortunately, you did not complete the task according to the requirements!',
      failureTextFalseSol: 'Solve the task with the following: <b>',
      failureConfirm: 'Repeat level!',
      failureCancel: 'To the level selection!',
    },
    missing: {
      missingTitle: 'Nothing entered!',
      missingText: 'Click in the black code editor box and use the paint(x, y) function to draw a box on the tile field!',
    },
    locked: {
      title: 'Not yet unlocked!',
      textV1: 'Complete level ',
      textV2: ' first to be able to play <b>level ',
      textV3: '</br>!'
    }
  },
  codeInput: {
    editor: 'editor',
    console: 'console',
    run: 'run',
    validate: 'validate',
    validateTip: 'Click Validate to see if your solution is correct!',
    runTip: 'Click Run to draw your code!',
    howToDraw: 'How to draw?',
    reset: 'Restart',
    color: 'Color selection',
    help: 'Support',
    codeToRun: '/*Type your own code!*/',
    errorMessages: {
      syntax: "There is something wrong with your syntax!",
      type: "One or more parameters were not passed or are of the wrong type:",
      reference: "The following expression is not defined:",
      tooManyParameters: "Too many parameters were given for the paint method.",
      missingPaint: "Call the paint(x,y) method to paint fields!",
      falseLoop: "No correct structure of a while or do..while loop!",
      infinityError: "This loop is too long or infinite!",
      correct: "No error message!",
      paramValue: "The specified parameters do not match the field size."
    },
  },
  gameView: {
    requirement: 'Requirement',
    requirementTipV1: 'You must use a ',
    requirementTipV2: ' to complete Level ',
    requirementTipV3: '',
  },
  gameViewFreeMode: {
    gridSize: 'Change the size of the field:',
    savepng: 'Save image!',
    title: 'Free mode',
    infotext: 'You are in free mode. Here you can pratice your own skills as you like, try loops, test functions or prepare for upcoming levels. Have fun!'
  },
   template: {
    coords: 'coordinates',
    coordsShow: 'show',
    coordsHide: 'hide'
  },
  navigation: {
    homepage: 'Homepage',
    lvlSelect: 'Level Selection',
    tutorial: 'Tutorial',
    helpHeader: 'Support',
    learningGoals: 'Learning Goals',
  },
  footer: {
    footerText: 'A project from the IEM media informatics department!'
  },
  lvlSelect: {
    freeMode: 'Free Mode',
    difficulty: 'Difficulty',
    start: 'Start',
    quickStart: 'Quick Start',
    minutes: 'Minutes',
    seconds: 'Seconds',
    bestTime: 'Best Time',
    lvlCompletedTitle: 'You have already mastered the level!',
    lvlCompletedText: 'Feel free to play it again to improve your skills!'
  },
  whyDrawIT: {
    whyDrawIT: 'Why DrawIT?',
    whyHeader1: 'PLAYFUL DEEPENING',
    whyHeader2: 'CLEAR',
    whyHeader3: 'FAST TO USE',
    whyText1: 'Draw IT gives you a fun introduction to the world of programming. You will be challenged, but not overwhelmed. Bright colors and puzzles keep you thinking!',
    whyText2: 'Programming can look pretty monotonous and complicated (not only) for newbies. In order to contain this, we show you your code entries on the spot and give you tips and assistance if necessary.',
    whyText3: 'Draw IT can be used on a variety of devices and no installation is required! All you should have is internet.',
  },
  goals: {
    programmingSkills: 'Programming skills',
    accuracy: 'Accuracy',
    analyticalThinking: 'Analytical thinking',
    problemSolving: 'Problem-solving skills',
    effectiveness: 'Eeffectiveness',
    programmingSkillsText: 'With DrawIT you can deepen your programming skills in the scripting language JavaScript and expand your programming knowledge!',
    accuracyText: 'Programming is not just about programming skills. As a programmer, you have to listen carefully and be able to implement requirements precisely and conscientiously. DrawIT gives you tasks that require precise processing!',
    analyticalThinkingText: 'With DrawIT you can improve your ability to recognize problems, to break them down into individual aspects and to find solutions independently!',
    problemSolvingText: 'DrawIT helps you to increase your abilities to perceive, understand and then solve complex problem situations or difficulties. The easiest way does not always have to be the required or the best!',
    effectivenessText: 'DrawIT deepens the ability to implement code solutions in a simple and efficient way and shows different approaches!',
  },
  help: {
    example: 'Example',
    variables: {
      var: 'variables',
      varTitle: 'What are variables?',
      varTextSec1: 'A variable is best compared to a container that can hold exactly one value. The container is a logical storage space with a (unchangeable) name and a value that can be changed.',
      varSubHeader: 'Different types of variables',
      varSubText: 'There are three different ways of declaring variables in JavaScript: const: symbolic constant; declares an immutable variable || let: declares a local variable in the Scope block || var: declares a variable independent of its scope (validity).',
      varExampleText: 'The constant PI is declared in the first declaration. This constant cannot be changed during runtime, but can be used anywhere. After declaring a variable with let or var, the variable can be changed during runtime and used anywhere.',  
    },
    function: {
      function: 'functions',
      functionTitle: 'What are functions?',
      functionTextSec1: 'Functions are a block of statements under a name. The function block is defined once, then the JavaScript commands of the function can be called several times in the program via the name. Grouping commands into a function improves the readability of the script and prevents errors.',
      functionSubHeader: 'Flow of functions and function calls',
      functionSubText: 'A JavaScript function is defined using the function keyword, followed by a custom name, followed by parentheses. Function names can contain letters, digits, underscores, and dollar signs (same rules as for variables). The brackets can contain parameter names separated by commas:( parameter1, parameter2, ... ). The code to be executed by the function is enclosed in curly brackets: {}. The Javascript interpreter only executes the instructions in the function block when the function is called.',
      functionExampleText: 'The element can be determined using the parameters passed to the function and the class "painted" can be assigned to the respective element. The function is called using the name of the function and appropriate parameter transfer.',  
    },
    for: {
      for: 'for-loop',
      forTitle: 'What are for loops?',
      forTextSec1: 'The for loop is used when a certain number of iterations is required. The loop header summarizes the preparation of the whole loop, the loop condition, and the calculations needed to continue the loop.',
      forSubHeader: 'Syntax of a for loop',
      forSubText: 'So first you write down the keyword for and open a parenthesis. Following are three pieces of code that control the loop, separated by a semicolon. Then you write a closing parenthesis and one or more statements follow, grouped by curly brackets. Initialization: It happens first, and only once. Here you can, for example, set a counter to its initial value. Loop condition: It is evaluated before each loop run and must return true for the loop body to be executed. You can check here whether the final value of your counter has not yet been reached. Continuation: It is evaluated after each loop iteration. Your counter could be increased by 1 here. Basically, the for loop is a form of syntactic sugar because you could just as easily write the for loop as a while loop, except for one small detail that we will get to later',
      forExampleText: 'A result variable is declared in the example. The for loop starts at 0 and runs until the initial value i is less than 5. i is increased by one point each time the loop is run through. In this example, the loop is executed 4 times. If the loop is also to carry out the 5th step, then the termination condition must have a <=.',
    },
    while: {
      while: 'while loops',
      whileTitle: 'What are while loops?',
      whileTextSec1: "The while loop first evaluates the loop condition. If the result is true (or a truthy value), the loop body is executed. Then the process starts again from the beginning. This type of loop is suitable when you don't know in advance how many times the loop will be executed.",
      whileSubHeader: "Syntax of a while loop",
      whileSubText: "A while loop begins with the keyword while (while = while). Behind it, in round brackets ( and ), is the loop condition. To formulate a condition, you need, for example, comparison operators or logical operators. Then follows the loop body, which can be a single JavaScript statement or a block of multiple statements, placed in curly braces { and }.",
      whileExampleText: "Unlike the for loop, the loop variable i must be declared outside the loop here and contribute to the termination condition within the loop. Within the loop block, the desired code is executed. Especially with a while loop, caution must be exercised, as the relationships for the termination conditions are less clear than with the for loop, making it easier to end up in an infinite loop.",
    },
    dowhile: {
      do: "Do-While Loops",
      doTitle: "What are Do-While Loops?",
      doTextSec1: "The do-while loop behaves similarly to the while loop, but evaluates the loop condition only after the loop body has been executed. This type of loop is suitable if you need to go through the loop body at least once to decide whether or not to repeat the body.",
      doSubHeader: "Syntax of a do-while loop",
      doSubText: "A do-while loop begins with the keyword do (do = do something). Behind the do follows a single statement or a statement block in curly braces { and }. Next comes the keyword while, followed by the loop condition in round brackets ( and ) behind it. The structure of the do-while loop is actually strange. On the one hand, the do is technically not necessary, it is more of a reading aid so that you don't suddenly find yourself in front of the beginning of a statement block. On the other hand, if you have it, you could also dispense with the curly braces. However, as with any other control structure, this is only possible if the loop body consists of a single statement. JavaScript simply follows its model, the programming language C.",
      doExampleText: 'In the case of the do-while loop, the counter variable is usually also declared outside the loop. Before the loop checks whether the loop pass has to be repeated, however, the code in the do area is executed beforehand in the do-while loop. So we count up the i and calculate this with our result. We then check whether i < 5. So as long as i is less than 5, the area in the do block will continue to be executed.',  
    },
  }
}