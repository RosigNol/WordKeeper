export const SEARCH_RESULT = (state, res) => {

    state.dictionaryList = res
    window.localStorage.dictionaryList = JSON.stringify(state.dictionaryList)

}

export const SEARCH_WORD = (state, res) => {

    state.word = res
    window.localStorage.word = JSON.stringify(state.word)

}

export const ADD_FAVORTIES = (state, res) => {

    state.favoritesList.push(res)
    window.localStorage.favoritesList = JSON.stringify(state.favoritesList)

}

export const DELETE_FAVORTIES = (state, res) => {

    state.favoritesList.splice(state.favoritesList.indexOf(state.favoritesList.find(x => x == res)), 1)
    window.localStorage.favoritesList = JSON.stringify(state.favoritesList)

}

export const FILTER_FAVORTIES = (state, res) => {
    state.favoritesSort = res
    if (res){
        state.favoritesListSort = new Array()
        for (let i in state.favoritesList) {
            // console.log("state.favoritesList[i]", state.favoritesList[i].fl, res)
            if (state.favoritesList[i].fl.toLowerCase() == res.toLowerCase()) {
                state.favoritesListSort.push(state.favoritesList[i])
            }
        }
    } else {
        state.favoritesListSort = new Array()
    }
    console.log("state.favoritesListSort", state.favoritesListSort, state.favoritesSort)
    window.localStorage.favoritesListSort = JSON.stringify(state.favoritesListSort)
    window.localStorage.favoritesSort = JSON.stringify(state.favoritesSort)

}

export const FAVORITES = (state, res) => {

    state.favoritesList = res
    window.localStorage.favoritesList = JSON.stringify(state.favoritesList)

}
