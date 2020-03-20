<template>
    <div class="page-content-search layout">
        <div class="flex search">

            <div class="input flex">
                <icon name="search" style="padding: 10px 4px;"/>
                <div class="input-group">
                    <input type="text" required v-model="word" @input="changeResponse()">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Search</label>
                </div>
            </div>
        </div>
        <div class="layout response" v-if="$store.getters['dictionary/result'].length>0">
            <div class="flex cell" v-for="(word, index) in $store.getters['dictionary/result']">
                <div>
                    <span class="pr"
                        style="font-weight: bold; color:blue; cursor: pointer"
                        @click="seeMore(word.meta.uuid)">{{word.meta.stems[0]}}
                    </span>
                    <div v-show="compareMore.find(x => x == word.meta.uuid)!==undefined" class="descr pr">
                        More:
                        <div v-for="(def, index) in word.shortdef">
                            <span class="pr" style="font-style: italic ">{{def}};</span>
                        </div>
                    </div>
                    <div v-show="compareMore.find(x => x == word.meta.uuid)!==undefined" class="descr pr">
                        Transcription: {{ !!word.hwi.prs ? word.hwi.prs[0].mw : null,}}
                    </div>
                    <span class="pr" style="font-style: italic ">{{word.fl}}</span>
                    <span class="pr descr">{{word.shortdef[0]}}</span>
                </div>

                <!-- {{favorites.find(x => x == word)}} -->
                <div @click="changeFavorites(word, word.meta.uuid)">
                    <icon
                        name="bstar"
                        style="padding-right: 8px; cursor: pointer"
                        v-show="compareFavorites.find(x => x == word.meta.uuid)!==undefined"
                    />
                    <icon
                        name="star"
                        style="padding-right: 8px; cursor: pointer"
                        v-show="compareFavorites.find(x => x == word.meta.uuid)==undefined"
                    />
                </div>
            </div>
        </div>
        <div class="layout response" style="justify-content: center" v-else>
            No results =(
        </div>

    </div>
</template>

<script>

import icon from '@/components/icons/icon.vue'

export default {
    name: 'Home',

    components: {
        icon
    },

	data () {
        return {
			word: '',
			list: [],
			reList: [],
            favorites: [],
            more: [],
		}
	},

	created: function () {
        this.word =  this.$store.getters['dictionary/word']
        this.favorites = this.$store.getters['dictionary/favorites'].map(item => item.meta.uuid)
    },

    computed: {
        compareFavorites : function(){
            return this.favorites
        },
        compareMore : function(){
            return this.more
        }
    },

	methods: {

        changeResponse: function() {
                setTimeout(() => {
                    fetch("https://www.dictionaryapi.com/api/v3/references/collegiate/json/"+ this.word +"?key=b700de43-070e-4df0-9504-f84a40100dd3", {
    					"method": "GET",
    				})
    				.then(response => response.json())
    				.then(data => {
                        this.$store.dispatch('dictionary/search_word', this.word);
    				    this.$store.dispatch('dictionary/search_result', { mask: this.word, list: data });
    				})
    				.catch(err => {
    					console.log(err);
    				});
                }, 1000);

        },

        changeFavorites: function(word, index) {

            this.$store.getters['dictionary/favorites'].find(x => x.meta.uuid == word.meta.uuid) ? this.$store.dispatch('dictionary/delete_favorites', word) : this.$store.dispatch('dictionary/add_favorites', word)
            console.log("this.favorites.find(x => x == index)", this.favorites.find(x => x == index), index, this.favorites)
            if (this.favorites.find(x => x == index)){
                this.favorites.splice(this.favorites.indexOf(this.favorites.find(x => x == index)), 1)
            } else {
                this.favorites.push(index)
            }
        },

        seeMore: function(index){
            if (this.more.find(x => x == index)){
                this.more.splice(this.more.indexOf(this.more.find(x => x == index)), 1)
            } else {
                this.more.push(index)
            }
        },

	}
}
</script>

<style lang="sass" scoped>

.page-content-search
    height: 100%
    width: 100%
    padding: 0
    flex-direction: row
    align-items: start

    .search
        flex: 0 0 auto
        background-color: ghostwhite
        flex-direction: column
        height: 100%

        .input
            background: white
            margin: 16px

        .input-group
            position: relative

            input
                font-size: 16px
                padding-top: 16px
                padding-bottom: 4px
                display: block
                width: 100%
                border: none
                border-bottom: 1px solid black

            input:focus
                outline: none

            label
                color: #black
                font-size: 18px
                position: absolute
                pointer-events: none
                top: 15px
                transition: 0.2s ease all
                -moz-transition: 0.2s ease all
                -webkit-transition: 0.2s ease all

            input:focus ~ label, input:valid ~ label
                top: -2px
                font-size: 12px
                color: black

            .bar
                position: relative
                display: block
                width: 320px

            .bar:before, .bar:after
                content: ""
                height: 2px
                width: 0
                bottom: 0
                position: absolute
                background: black
                transition: 0.2s ease all
                -moz-transition: 0.2s ease all
                -webkit-transition: 0.2s ease all

            .bar:before
                left: 50%

            .bar:after
                right: 50%

            input:focus ~ .bar:before,
            input:focus ~ .bar:after
                width: 50%

    .response
        height: 100%
        flex: 1 1 auto
        overflow: auto
        flex-direction: column
        align-items: center

        .cell
            padding: 12px 0px
            border: 3px solid grey
            border-radius: 10px
            margin: 12px 0px
            width: 100%
            justify-content: space-between
            align-items: center

            &:first-child
                margin-top: 0px

            &:last-child
                margin-bottom: 0px

            .descr
                overflow: hidden
                text-overflow: ellipsis
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 3
                line-height: 25px
                max-height: 25px
                align-items: flex-start
                display: flex


        .pr
            padding-right: 8px
            padding-left: 8px
            align-items: center
            display: flex



</style>
