import Vue from 'static/common/vue/dist/vue';
import Ajax from 'static/components/ajax/index';
import Vswiper from 'static/components/vue-swiper/vswiper.vue';
import Item from 'static/components/vue-swiper/item.vue';

new Vue({
    el: '#app',
    data: {

    },
    components: {
        Vswiper,
        Item
    },
    created(){

    },
    computed: {

    },
    mounted(){

    },
    methods:{
    login(){
        Ajax({
            
        })
    }
    }

})
