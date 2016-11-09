
// A class for loading a story from a folder.
// The class keeps the current state of the story,
// not the envierment (like the character)
//
// storyName - The name of the story folder
/*
this.event
this.chapter
this.storyName
this.currChapterNumber
this.storyInfo
*/

class Story {

  // Can be or storyName, homePage
  // Or a static story, homePage
  constructor(storyName, homePage) {
    this.homePage = homePage;
    this.loaded = false;
    this.whenLoaded = () => {
      homePage.setState({
        currChoices: homePage.state.currChoices.cloneWithRows(
          this.chapter.events[this.event].choices),
        loaded: true
      });
      this.loaded = true;
    };
    if (storyName.event != undefined) {
      this.load(storyName);
      this.whenLoaded();
    } else {
      this.loadStory(storyName);
      this.currChapterNumber = -1;
      this.storyName = storyName;
      this.chapter = {choices: []};
      this.event = 0;
    }
  }

  fetch(jsonUrl,func) {
    fetch('http://192.168.43.105:8080/'+jsonUrl).then((resault) => resault.json())
    .then((data) => {
      func(data[0])
    }).catch((error) => {
      alert(error.message);
      //alert("Could not connet to the server");
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

  load(story) {
    this.event = story.event;
    this.chapter = story.chapter;
    this.storyName = story.storyName;
    this.currChapterNumber = story.currChapterNumber;
    this.storyInfo = story.storyInfo;
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

  reloadStory() {
    link = '';
    this.fetch(link+this.storyName+'/info.json',(data) => {
      this.storyInfo = data;
      this.loadChapter(this.currChapterNumber);
    })
  }
}

export default Story;
