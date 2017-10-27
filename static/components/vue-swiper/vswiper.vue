<style>

    .vue-component-vswiper{
        width:100%;
        height: 100%;
    }

</style>

<template>
    <div class="vue-component-vswiper" v-cloak>
        <div ref="contentBox" v-on:touchstart="touchstart" v-on:touchmove="touchmove" v-on:touchend="touchend">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Vue from 'static/common/vue/dist/vue';
    import _ from '../tools/dom';
    export default{
        name:"vswiper",
        components: {
            
        },
        props:{
            loop:{
                type: Boolean,
                default:true,
            },
            auto:{
                type: Boolean,
                default:false,
            },
            initIndex:{
                type:Number,
                default:0,
            }
        },
        data(){
            return {
                //轮播参数
                width:0,
                height:0,
                size:0,
                scroll_time: 300,//图片滚动时长
                auto_wait_time:3000,//轮播间隔
                maxleft: 0,//最大lfet值[不循环情况下的值
                now_left: 0, //初始位置信息[不循环情况下的值]
                now_top: 0,
                point_x: null, //记录一个x坐标
                point_y: null, //记录一个y坐标
                move_left: false, //记录向哪边滑动
                index: 0,
                busy: false,
                timer: null,
            }
        },

        created(){
            this.imgs = this.source;
        },
        mounted(){
            this.init();
            this.go_index(this.initIndex);
        },
        methods:{
            init(){
                this.width = _.width(document);
                this.height = _.height(document);
                this.size = this.$refs.contentBox.children.length;
                this.init_loop();
                this.auto_scroll();
            },
            scrollEnd(index){
                this.$emit('scrollEnd',index);
            },

            auto_scroll : function(){//自动滚动
                var self = this;
                if(!self.loop || !self.auto)return;
                clearTimeout(self.timer);
                self.timer = setTimeout(function(){
                    self.go_index(self.index+1);
                },self.auto_wait_time);
            },
            /*
             初始化循环滚动,当一次性需要滚动多个子元素时，暂不支持循环滚动效果,
             如果想实现一次性滚动多个子元素效果，可以通过页面结构实现
             循环滚动思路：复制首尾节点到尾首
             */
            setWidth(obj){
                if(obj){
                    for(let i=0; i<obj.length; i++){
                        if(obj[i].nodeType !=3){
                            _.css(obj[i],{
                                'height':this.height
                            });
                        }
                    }
                }
            },
            init_loop(){
                let self = this;
                if(this.$refs.contentBox.children.length == this.size && this.loop){//暂时只支持size和子节点数相等情况的循环
                    this.now_top = -this.height;//设置初始位置信息
                    this.mintop = -this.height * this.size;//最小left值
                    this.maxtop = -this.height;
                    this.$refs.contentBox.insertBefore(this.$refs.contentBox.lastElementChild.cloneNode(true),this.$refs.contentBox.childNodes[0]);
                    this.$refs.contentBox.appendChild(this.$refs.contentBox.childNodes[1].cloneNode(true));
                    _.css(this.$refs.contentBox,{
                            'width':this.width,
                            'height':this.height*(this.size+2),
                    });
                    this.setWidth(this.$refs.contentBox.childNodes);
                }else{
                    _.css(this.$refs.contentBox,{
                        'width': this.width,
                        'height':this.height * this.size,
                    });
                    this.setWidth(this.$refs.contentBox.childNodes);
                }
            },
            touchstart(e){
                let self = this;
                if(e.touches.length==1 && !self.busy){
                    self.point_x = e.touches[0].screenX;
                    self.point_y = e.touches[0].screenY;
                }
            },
            touchmove(e){
                let self = this;
                if(e.touches.length==1 && !self.busy){
                    return self.move(e.touches[0].screenX,e.touches[0].screenY);//这里根据返回值觉得是否阻止默认touch事件
                }
            },
            touchend(e){
                let self = this;
                !self.busy && self.move_end();
            },
            move(point_x,point_y){//滑动屏幕处理函数
                let self = this;
                let changeX = point_x - (this.point_x===null?point_x:this.point_x),
                    changeY = point_y - (this.point_y===null?point_y:this.point_y),
                    margintop = this.now_top, return_value = false,
                    sin =changeX/Math.sqrt(changeY * changeY + changeX * changeX);
                this.now_top = margintop+changeY;
                this.move_top = changeY<0;
                if(sin > Math.sin(Math.PI/3) || sin<-Math.sin(Math.PI/3)){//滑动屏幕角度范围：PI/3  -- 2PI/3
                    return_value = true;//不阻止默认行为
                }
                this.point_x = point_x;
                this.point_y = point_y;
                _.css(this.$refs.contentBox,this.get_style(2));
                return return_value;
            },
            move_end(){
                let self = this;
                let changeY = this.now_top % this.height,ind;
                if(this.now_top < this.mintop){//手指向左滑动
                    ind = this.index +1;
                }else if(this.now_top>this.maxtop){//手指向右滑动
                    ind = this.index-1;
                }else if(changeY!=0){
                    if(this.move_top){//手指向左滑动
                        ind = this.index+1;
                    }else{//手指向右滑动
                        ind = this.index-1;
                    }
                }else{
                    ind = this.index;
                }
                this.point_x = this.point_y = null;
                this.go_index(ind);
            },
            go_index(ind){//滚动到指定索引页面
                var self = this;
                if(self.busy)return;
                clearTimeout(self.timer);
                self.busy = true;
                if(self.loop){//如果循环
                    ind = ind<0?-1:ind;
                    ind = ind>self.size?self.size:ind;
                }else{
                    ind = ind<0?0:ind;
                    ind = ind>=self.size?(self.size-1):ind;
                }
                if(!self.loop && (self.now_top == -(self.height*ind))){
                    self.complete(ind);
                }else if(self.loop && (self.now_top == -self.height*(ind+1))){
                    self.complete(ind);
                }else{
                    if(ind == -1 || ind == self.size){//循环滚动边界
                        self.index = ind==-1?(self.size-1):0;
                        self.now_top = ind==-1?0:-self.height*(self.size+1);
                    }else{
                        self.index = ind;
                        self.now_top = -(self.height*(self.index+(self.loop?1:0)));
                    }
                    _.css(this.$refs.contentBox,this.get_style(1));
                    setTimeout(function(){
                        self.complete(ind);
                    },self.scroll_time);
                }
            },
            complete(ind){//动画完成回调
                var self = this;
                self.busy = false;
                self.scrollEnd(self.index);
                if(ind==-1){
                    self.now_top = self.mintop;
                }else if(ind==self.size){
                    self.now_top = self.maxtop;
                }
                _.css(this.$refs.contentBox,this.get_style(2));
                self.auto_scroll();
            },
            /*
             获取动画样式，要兼容更多浏览器，可以扩展该方法
             @int fig : 1 动画 2  没动画
             */
            get_style(fig){
                let self = this;
                let y = this.now_top,
                    time = fig==1?this.scroll_time:0;
                return {
                    '-webkit-transition':'-webkit-transform '+time+'ms',
                    '-webkit-transform':'translate3d(0,'+ y +'px,0)',
                    '-webkit-backface-visibility': 'hidden',
                    'transition':'transform '+time+'ms',
                    'transform':'translate3d(0,'+y+'px,0)'
                };
            },
        }
    }
</script>