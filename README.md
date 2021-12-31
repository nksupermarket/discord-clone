# discord-clone

live: https://lookingcoolonavespa.github.io/discord-clone

## app in action
![screenshot of login screen](https://i.postimg.cc/ncqtpq6x/Screenshot-from-2021-12-30-19-25-17.png)

![screenshot of channel view](https://i.postimg.cc/KjgJ7rn8/Screenshot-from-2021-12-30-19-16-50.png)

![screenshot of create channel process](https://i.postimg.cc/jqwb3pcL/Screenshot-from-2021-12-30-19-17-02.png)

![screenshot of explore public channels view](https://i.postimg.cc/1RkZkv7M/Screenshot-from-2021-12-30-19-17-09.png)

![screenshot of user settings](https://i.postimg.cc/w38FwyVc/Screenshot-from-2021-12-30-19-17-13.png)

## features
- fully responsive
- customize your avatar and profile color
- receive and send mentions in chat
- reply to messages
- messages mentioning you are highlighted so you don't miss them
- upload up to 5 files at a time for chat to download
- create a channel for the public or just you and your friends
- create rooms and room categories for your new channel
- explore all public channels

## tech stack 
- javascript
- html/css
- react/react-router 

## libraries used
- draft-js: for mentions functionality
- date-fns: to create timestamps
- firebase (realtime database): for backend functionality
- unique-names-generator

## resources used
- remix icon
- flaticon

## project goals
- to build something cool with react

## challenges i faced
- **Scope** - vision was grandiose for my abilities. In the end I had to cut a lot of features I had planned to implement, and code was sort of rushed at the end. A part of me feels like the problem wasn't so much the scope as it was my planning. Had I planned better, I wouldn't have had to waste so much time doubling back and redoing my mistakes - and who knows, maybe I would've accomplished what I set out to do.
- **Mobile** - I'm not completely satisfied with my approach. I used a combination of code-splitting and a screensize check to conditionally render components to fit for mobile. This was something I definitely should have planned for in advance. Wrestling with my code to make it fit mobile destroyed a lot of its elegance imo. 
- **Reusing Components and Logic** - I struggled a lot with this early on in my project, and although my solutions aren't perfect, I'm proud of what I managed to squeeze out after lots of refactoring. Next time, I will plan better and make use of more higher order components to make my life easier. 
