class KeywordIndex {
  constructor() {
    this.map = new Map();
  }

  idsFor = keywords => {
    const foundIds = new Set();
    keywords.forEach(keyword => {
      if (this.map.has(keyword)) {
        foundIds.add(...this.map.get(keyword));
      }
    });
    return [...foundIds];
  };

  add = (keyword, id) => {
    if (this.map.has(keyword)) {
      this.map.get(keyword).push(keyword);
    } else {
      this.map.set(keyword, [id]);
    }
  };
}

export default KeywordIndex;
