
// A class for loading a story from a folder.
// The class keeps the current state of the story,
// not the envierment (like the character)
//
// storyName - The name of the story folder

class Story {
  constructor(storyName, whenLoaded) {
    this.whenLoaded = whenLoaded;
    this.loadStory(storyName);
    this.currChapterNumber = -1;
    this.storyName = storyName;
    this.chapter = {choices: []};
    this.event = 0;
  }

  fetch(jsonUrl,func) {
    fetch('http://192.168.43.105:8080/'+jsonUrl).then((resault) => resault.json())
    .then((data) => {
      func(data[0])
    }).catch((error) => {
        alert("Could not connet to the server");
    });
  }

  loadChapter(chapterNum) {
    if (this.storyInfo.chapters <= chapterNum) {
      this.fetch(this.storyName+'/chapter'+chapterNum+'.json',(data) => {
        this.chapter = data;
        this.currChapterNumber = data.number;
        this.whenLoaded();
      })
    }
  }

  loadStory(storyName) {
    link = '';
    this.fetch(link+storyName+'/info.json',(data) => {
      this.storyInfo = data;
      if (this.storyInfo.prolog) {
        this.loadChapter(0);
      } else {
        this.loadChapter(1);
      }
    })
  }

  choose(choice, player) {
    choice.actions.forEach((action) => {
      actionName = Object.keys(action)[0];
      switch (actionName) {
        case 'test':
          alert('test resault: ' + action[actionName]);
          break;
        default:
          player[actionName] = action[actionName];
          break;
      }
    });
    this.event = choice.next;
    this.whenLoaded();
  }
}

export default Story;
