
export const result = (state) => {

    try {

        return state.dictionaryList

    } catch (e) {

        console.warn('getters', 'error', e)

    }

}

export const word = (state) => {

    try {

        return state.word

    } catch (e) {

        console.warn('getters', 'error', e)

    }

}

export const favorites = (state) => {

    try {

        console.log(state.favoritesListSort, state.favoritesList, state.favoritesSort != 'All' || state.favoritesSort != 'all', state.favoritesSort)

        return state.favoritesSort != 'All' && state.favoritesSort != 'all' ? state.favoritesListSort : state.favoritesList

    } catch (e) {

        console.warn('getters', 'error', e)

    }

}
