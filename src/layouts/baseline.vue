<template>

    <div id="page">
        <div class="layout space-between panel page-header">
            <div class="flex">
                Word Keeper
            </div>
            <div class="flex">
                <div id="nav-panel">
                    <router-link to="/"> <icon name="search" />Search</router-link>
                    <router-link to="/favorites"> <icon name="star" />Favorites</router-link>
                </div>
            </div>
        </div>
        <div class="layout page-content">
            <router-view/>
        </div>
        <div class="layout panel page-footer">
            Vyacheslav Zakharov, 2020
        </div>
    </div>

</template>

<script>

import icon from '@/components/icons/icon.vue'

export default {
    components: {
        icon
    }
}

</script>

<style lang="sass" scoped>

#page
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: black
    height: 100%
    margin: 0px
    display: flex
    flex-direction: column

    ::-webkit-scrollbar-track
        border-radius: 4px
    ::-webkit-scrollbar
        width: 6px
    ::-webkit-scrollbar-thumb
        border-radius: 4px
        background: #f0f2f5
    ::hover::-webkit-scrollbar-thumb
        background: aliceblue

    .page-header
        flex: 0 0 auto
        font-weight: bold

        #nav-panel
            padding: 16px 24px

            a
                display: inline-flex
                align-items: center

                &.router-link-exact-active
                    color: blue

                &:last-child
                    padding-left: 8px

    .page-content
        height: 100%
        flex: 1 1 auto
        overflow: auto
        margin: 24px 16px

    .page-footer
        flex: 0 0 auto
        justify-content: center
        padding: 16px 8px

.panel
    background-color: aliceblue


</style>
