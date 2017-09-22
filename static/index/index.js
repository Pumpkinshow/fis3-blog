import Vue from '../common/vue';
import Ajax from '../components/ajax/index';

console.log(Ajax,9090909);
new Vue({
    delimiters: ['{%', '%}'],
    el: '#app',
    data:{
        token:pageConfig.token,
        url:"",
        file:"",
    },
    created:function(){
        alert(222);
    },
    methods:{
        imgChange(event){
            // console.log(event);
            // postfile{event.target.files[0]}
            this.file = event.target.files[0];
            console.log(this.file);
        },
        postfile(){
            let file = this.file;
            let self = this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                self.url = e.target.result;
            };
            console.log(file);
            var form = new FormData();
            form.append('file', file);
            form.append("_token",self.token);
            console.log(form.get(file));
            var oReq = new XMLHttpRequest();  
            oReq.open( "POST", "/imageupload" , true );  
            oReq.onload = function(oEvent) {  
                  if (oReq.status == 200) {  
                      // oOutput.innerHTML = "Uploaded!" ;  
                 } else {  
                      // oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";  
                 }  
            };  
            oReq.send(form);  

        }
    },
    components:{

    },

})

