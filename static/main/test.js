import Vue from '../common/vue';
import Ajax from '../components/ajax/index';

new Vue({
    delimiters: ['{%', '%}'],
    el: '#app',
    data:{
        token:pageConfig.token,
        url:"",
        file:"",
        a:1,
    },
    created:function(){
        
    },
    methods:{
        show(i){
            alert(i);
            this.a = i;
        }
    },
    components:{

    },

})

