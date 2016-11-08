// This class represents a player.
// Saving information about the story,
// the player's stats and story-based stats

class Player {
  constructor(story) {
    this.story = story;
  }
  create() {
    this.hp = 1;
    this.ap = 1;
    this.mp = 1;
  }
}

export default Player;
