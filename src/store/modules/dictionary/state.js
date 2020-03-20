
export default {

    dictionaryList: window.localStorage.dictionaryList !== undefined ? JSON.parse(window.localStorage.dictionaryList || '[]') : [],
    favoritesList: window.localStorage.favoritesList !== undefined ? JSON.parse(window.localStorage.favoritesList || '[]'): [],
    favoritesListSort: window.localStorage.favoritesList !== undefined ? JSON.parse(window.localStorage.favoritesList || '[]'): [],
    word: window.localStorage.word !== undefined ? JSON.parse(window.localStorage.word || '') : '',
    favoritesSort: window.localStorage.favoritesSort !== undefined ? JSON.parse(window.localStorage.word || 'all') : 'all',

}
