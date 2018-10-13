import Fuse from 'fuse.js';
import diacritics from 'diacritics';
import { delay } from './delay';

const searchFakeDelayDuration = 200;

const optionCreator = (keys) => ({
  id: 'index',
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys
});

const removeDiacritics = (list) => {
  if (Array.isArray(list)) {
    return list.map(removeDiacritics);
  } else if (typeof list === 'object') {
    const newObj = {};
    Object.keys(list).forEach((key) => {
      if (list.hasOwnProperty(key)) {
        newObj[key] = removeDiacritics(list[key]);
      }
    });
  } else if (typeof list === 'string') {
    return diacritics.remove(list);
  }
  return list;
};

class Searcher {
  constructor(keys = [], list = []) {
    this.keys = keys;
    this.updateList(list);
  }
  _initialize = () => {
    this.searcher = new Fuse(this.searchList, optionCreator(this.keys));
  };

  updateList = (list) => {
    this.originalList = list;
    this.searchList = removeDiacritics(list)
      .map((obj, index) => ({
        ...obj,
        index
      }));
    this._initialize();
  };

  search = async(param) => {
    const searchString = diacritics.remove(param);
    // add fake delay
    await delay(searchFakeDelayDuration);
    const results = this.searcher.search(searchString);
    return results.map((index) => this.originalList[index]);
  }
}

export default Searcher;
