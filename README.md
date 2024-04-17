# Set: A Card Matching Game coded in Vue

### Project Description

Set is a card game designed by Marsha Falco in 1974 and published by Set Enterprises in 1991. I take no credit for the conception of the game itself. However, I thought it would be a great challenge to create a coded version of it in multiple languages, so I made one in Vue and [another version](https://github.com/Anna-Okada/set) using pure Java. Check out my [front end version](https://jocular-praline-bd2d89.netlify.app) on Netlify! 

### Overview

I decided to create this version of Set using Vue because I had studied Vue in Tech Elevator’s bootcamp and wanted to brush up my front end skills. I chose Set in particular because I had loved playing it since I was a kid and because I knew it would present a challenge due to the complex logic involved in the game. I ended up not only brushing up on languages and concepts, but I also learned how to sit with challenges, look up relevant information, and develop creative solutions. 
Throughout the process of creating this game, I encountered many interesting challenges. For example, I was struggling to come up with a means to generate every unique combination of three cards from a table of cards (see GENERATE_ALL_CARD_POSITIONS in the Vuex store). I looked online to see if someone had encountered a similar challenge and worked out a solution. Fortunately, I found something [similar](https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/) and tweaked it to my specific needs. On another occasion, I was having difficulty with the ADD_THREE_CARDS mutation in the Vuex store. I went through my code very carefully and methodically and even made a way to display all the cards in the deck as the game went along so I could easily track them. With this visual aid, I was eventually able to identify and resolve the issue. Another challenge I encountered was creating the cards themselves. I wasn’t able to find stock images of Set cards, so I created all the images of cards myself in a drawing app on an iPad. I then exported these images and was able to use them in my game. Game mechanics presented another challenge. I could have created just one mode of game play but I decided it would be more interesting to make two player and bot modes, as well as solo mode. This required some creative thinking because normally one would call out “Set!” to start their turn. In lieu of a voice command, I decided to let users start their turn by clicking their name or hitting a particular key. I also learned new skills I hadn’t been taught in TE, such as how to use a timer and how to add sound effects. The game is simple but can be difficult to get the hang of at first. For this reason I created a tutorial with examples and tables to explain the rules. I thought that would be a clear and fun way for new players to learn the ropes!
Over the course of three months, I chipped away at this game, when I wasn’t busy performing violin, teaching, or being a mom! I was fortunate to receive guidance and insight from my wonderful mentor, Margaret, from Tech Elevator, and my dear friend, Alice, who is an alumna of TE. I hope that this version of Set is as fun to play as the original game, and I hope you enjoy the new features, as well. In this version, you can play a bot, adjust difficulty settings and sound effects, and reveal a Set if you are truly stumped! 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).