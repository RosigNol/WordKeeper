
export const search_result = ({ commit, state }, { mask, list }) => {
    let res = new Array()
    if (list.every( elem => typeof elem === 'string')) {

        /////////////////////////////////////////////////////////////
        for (let i in list) {
            console.log(i)
            if (list[i].toString().match(mask)) {
                console.log("arr[i]", list[i])
                res.push(list[i])
            }
        }
        res.sort(( a, b ) => ('' + a).localeCompare(b))
        res.length > 10 ? res = res.slice(0, 10) : res

        /////////////////////////////////////////////////////////////
        let arr = new Array()
        for (let i in res){
            let func = fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+ res[i] +"?key=b700de43-070e-4df0-9504-f84a40100dd3", {
                "method": "GET",
            })
            .then(response => response.json())
            .then(data => {
                return data[0]
            })
            .catch(err => {
                console.log(err);
            });
            arr.push(func)
        }

        let promiseDictionary = Promise.all(arr)

        promiseDictionary
            .then(result => {commit('SEARCH_RESULT', result)})
            .catch(err => {
                console.log(err);
            });


    } else {
        list.length > 10 ?  res = list.slice(0, 11) : res = list
        commit('SEARCH_RESULT', res.sort(( a, b ) => ('' + a).localeCompare(b)))
    }


}

export const search_word = ({ commit }, word) => {
    commit('SEARCH_WORD', word)
}

export const add_favorites = ({ commit }, word) => {
    console.log("ADD_FAVORTIES", word)
    commit('ADD_FAVORTIES', word)
}

export const delete_favorites = ({ commit }, word) => {
    console.log("DELETE_FAVORTIES", word)
    commit('DELETE_FAVORTIES', word)
}

export const filter_favorites = ({ commit }, filter) => {
    console.log("FILTER_FAVORTIES", filter)
    commit('FILTER_FAVORTIES', filter)
}
