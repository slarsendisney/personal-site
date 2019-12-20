---
type: "Article"
path: "/articles/star-wars"
title: "Recreating 'The Imperial March' with JS"
desc: "An experiment with Tone.js in GatsbJS"
year: 2019

---



Did you know that *The Imperial March* is 104bpm? This is the kind of useless fact I now know as a result of trying to recreate the classic theme tune in the browser.

I have recently become interested in how to create music in the browser. While looking around for libraries I could make music with, I came across [tone.js](https://tonejs.github.io/). Using the library you can make your browser play music with code as simply as:

```js
//create a synth and connect it to the master output (your speakers)
var synth = new Tone.Synth().toMaster()

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease('C4', '8n')
```

This was awesome to me because I have been brought up able to read music, so being able to write 'C4' in order to get the synth to play a 'C' in the 4th octive was not hard for me to pick up.

To get started, I installed tone.js:

```
npm install --save tone
```

I then imported our new library and created a function called playSong that would be triggered by the call to action:

```jsx
import React from "react";
import Tone from "tone";

export default function Start() {
  const playSong = () => {
    console.log("Playing Imperial March!")
  };
  return (
 	<div >
    <button onClick={() => playSong()} >
       PLAY
     </button>
   </div> 
  );
}
```

In order to start creating sound, we're going to need to set the bpm and create a synth:

```js
const playSong = () => {
    Tone.Transport.bpm.value = Music.bpm;
    var synth = new Tone.Synth().toMaster();
  };
```

you see the *.toMaster()*? Thats connecting the synth to the master output. If you run the code now you still wont hear anything as we havent told the synth what to play. Lets fix that:

```js
const playSong = () => {
    Tone.Transport.bpm.value = 104;
    var synth = new Tone.Synth().toMaster();
    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, "10hz", time);
      },
      ["C4"],
      "4n"
    ).start();
    Tone.Transport.start();
  };
```

Thats going to play middle C for us on repeat but in the future we are going to pass it an array of notes that make up the imperial march. Check it out in your browser! 

Because the song will be quite a large array, I decided to throw it in a seperate JSON file. I set it up as follows: 

```json
{
  "notes": [
    "G2",
    "G2",
    "G2",
    ["Eb2", ["Eb2", "Bb2"]],
    "G2",
    ["Eb2", ["Eb2", "Bb2"]]
    // MANY MORE LINES HERE
   ],
  "bpm": 104
}
```

Notice the inner arrays? They split the note lengths in half. I then imported the file and used it as such: 

```js
import Music from "../music/imperialMarch.json";

const playSong = () => {
    Tone.Transport.bpm.value = Music.bpm;
    var synth = new Tone.Synth().toMaster();
    const synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, "10hz", time);
      },
      Music.notes,
      "4n"
    ).start();
    Tone.Transport.start();
  };
```

And hey presto! We have the imperial march in our browser. You can check it out [here](https://starwars.sld.codes/)

May the force be with you!

![done!](./done.gif)