<template>
    <div class="page-content-favorites layout">
        <div class="flex favorites">

            <div class="input flex">
                <icon name="favorites" style="padding: 10px 4px;"/>
                <div class="input-group">
                    <input type="text" required v-model="word" @input="changeFav()">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>Favorites</label>
                </div>
            </div>

            <div class="input flex" style="flex-direction: column; background-color: transparent">
                <div v-for="(r, index) in filters">
                    <input type="radio" name="filters" :value="index" @click="sendFilters(r)">
                    <label>{{r}}</label>
                </div>
            </div>
        </div>
        <div class="layout response" v-if="$store.getters['dictionary/favorites'].length>0">
            <transition-group name="flip-list" tag="div" style="display: flex; flex-direction: column; width: 100%; height: 100%">
                <div class="flex cell"
                    v-for="(word, index) in compareFavorites"
                    @dragover="(e) => onDragOver(word, index, e)"
                    @dragend="(e) => finishDrag(word, index, e)"
                    @dragstart="(e) => startDrag(word, index, e)"
                    :key="word.meta.uuid"
                    :class="{over: (word === over.word && word !== dragFrom), [over.dir]: (word === over.word && word !== dragFrom) }"
                    draggable="true"
                >
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

                    <div @click="deleteFavorites(word, word.meta.uuid)">
                        <icon
                            name="bstar"
                            style="padding-right: 8px; cursor: pointer"
                        />
                    </div>
                </div>
            </transition-group>
        </div>
        <div class="layout response" style="justify-content: center" v-else>
            No favorites =(
        </div>

    </div>
</template>

<script>

import icon from '@/components/icons/icon.vue'

export default {
    name: 'Favorites',

    components: {
        icon
    },

	data () {
        return {
			word: '',
            favorites: [],
            more: [],

            over: {},
            startLoc: 0,
            dragging: false,
            dragFrom: {},

            filters: [

                'Verb',
                'Noun',
                'Adjective',
                'Adverb',
                'Preposition',
                'Determiner',
                'Pronoun',
                'Conjunction',
                'All'

            ],
		}
	},

	created: function () {

        this.favorites = this.$store.getters['dictionary/favorites']

    },

    computed: {

        compareMore : function(){
            return this.more
        },

        compareFavorites : function(){
            return this.favorites
        }

    },

	methods: {

        startDrag: function(item, i, e) {
            this.startLoc = e.clientY;
            this.dragging = true;
            this.dragFrom = item;
            console.log(this.dragFrom);
        },

        finishDrag: function(item, pos) {
            this.favorites.splice(pos, 1)
            this.favorites.splice(this.over.pos, 0, item);
            this.over = {}
        },

        onDragOver: function(item, pos, e) {
            const dir = (this.startLoc < e.clientY) ? 'down': 'up';
            setTimeout(() => {
                this.over = { item, pos, dir };
            }, 50)
        },

        changeFav: function() {
            this.favorites = this.$store.getters['dictionary/favorites']
            if (this.word.length!==0) {
                this.favorites = this.$store.getters['dictionary/favorites']
                let mas = new Array()
                for (let i in this.favorites) {
                    if (this.favorites[i].meta.stems[0].indexOf(this.word) + 1 ) {
                        console.log(i, this.favorites[i].meta.stems[0], this.word)
                        mas.push(this.favorites[i])
                    }
                }

                this.favorites = mas
                console.log(this.favorites)
            }


        },


        deleteFavorites: function(word, index) {
            this.$store.dispatch('dictionary/delete_favorites', word);
            setTimeout(() => {
                this.favorites = this.$store.getters['dictionary/favorites']
            }, 500);

        },

        seeMore: function(index){
            if (this.more.find(x => x == index)){
                this.more.splice(this.more.indexOf(this.more.find(x => x == index)), 1)
            } else {
                this.more.push(index)
            }
        },

        sendFilters: function(filter){
            this.$store.dispatch('dictionary/filter_favorites', filter);
            // this.favorites = this.$store.getters['dictionary/favorites']
            setTimeout(() => {
                this.favorites = this.$store.getters['dictionary/favorites']
            }, 500);
        },


	}
}
</script>

<style lang="sass" scoped>

.page-content-favorites
    height: 100%
    width: 100%
    padding: 0
    flex-direction: row
    align-items: start

    .favorites
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



.flip-list-move
    transition: transform .2s


.over
    opacity: .6


.down
    transform: translateY(-20px)


.up
    transform: translateY(20px)




</style>
