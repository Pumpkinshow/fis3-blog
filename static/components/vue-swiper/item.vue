<template>
    <div class="vue-swiper-item">
        <slot></slot>
    </div>
</template>

<style>
    .vue-swiper-item{
        overflow: hidden;
        display: block;
    }
</style>

<script>
    import Event from 'static/components/tools/event';
    import Dom from 'static/components/tools/dom';

    export default {
        components: {
        },

        mounted(){
            this.$nextTick(() => {
                Event.on(window, 'resize', () => this.resize());
                this.resize();
            });
        },

        methods: {
            resize(){
                this.$el.style.width = Dom.width(document) + 'px';
                this.$el.style.height = Dom.height(document) + 'px';
            }
        }
    }
</script>