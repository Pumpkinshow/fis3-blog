import Vue from '../common/vue';
import Ajax from '../components/ajax/index';

new Vue({
    delimiters: ['{%', '%}'],
    el: '#app',
    data:{
        token:pageConfig.token,
        url:"",
        file:"",
    },
    created:function(){
        
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
            var form = new FormData();
            form.append('file', file);
            form.append("_token",self.token);
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

