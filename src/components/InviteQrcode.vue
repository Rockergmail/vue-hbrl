<style scoped>
    html,body,#wrapper{background: #0f1c25;height:100%;min-height:590px;}
    #tips{color:white;margin-top:6%;}
    .footer img,#header img{vertical-align: top;}
    #main{margin-top:2%;z-index:9;text-align: center;}
    #qrcode{padding:14px;background:white;clear:both;margin:8px auto;width:36%;}
    #qrcode img,#qrcode canvas{width:100%;}
    .info{font-size: 12px;color:#cacccd;}
    #save{background: #ffc452;width:40%;margin:0 auto;margin-top:18px;color:white;padding:6px 0;border-radius: 6px;}
    #main2{left:0;right:0;}
    .footer{bottom:0px;}
</style>

<template>
   
<div id="inviteQrcode">
    <x-header
        :left-options="{showBack:true, preventGoBack: true}"
        :right-options="{showMore:false,showRefresh:true,refreshLink: '/mock/invite/link'}"
    >扫码收徒</x-header>

    <header id="header">
        <img src="./header-rili.jpg" width="100%" alt="header">
    </header>

    <section id="main">
        <p class="info">昵称： {{ data['nickname'] }}</p>
        <p class="info">ID： {{ data['tid'] }}</p>
        <qrcode id="qrcode" class="tac" value="data.url"></qrcode>
        <div id="tips" class="fs-14 fw-b">扫描下载，无需填邀请码</div>
        <div id="save" class="fw-b" @click="screenShot">保存图片</div>
    </section>

    <footer class="footer" id="footer" class="absolute">
        <img width="100%" src="footer.png">
    </footer>
</div>
</template>

<script>
import xHeader from "vux/src/components/x-header/index.vue"
import qrcode from "vux/src/components/qrcode/index.vue"

module.exports = {
    name: 'inviteQrcode',
    components: {
        "x-header": xHeader,
        "qrcode": qrcode
    },
    data:function () {
        return {
            data: {},
        }
    },
    methods: {
        screenShot: function() {
            // alert("screenShoting...");
            // var fuckme = document.querySelector("#inviteQrcode");
            // var fuckmeHeight = document.querySelector("#inviteQrcode").offsetHeight;
            // var fuckmeWidth = document.querySelector("#inviteQrcode").offsetWidth;
            // html2canvas(document.body ,{
            //     "allowTaint": true, 
            //     width: fuckmeWidth / 2,
            //     height: fuckmeHeight / 2,
            //     onrendered: function(canvas) {
            //         // canvas.toBlob(function (blob) {
            //         //     saveAs(blob, "yourock.png");
            //         // })
            //         var data = canvas.toDataURL("image/jpg"),
            //             image = new Image();
            //             image.src = data;
            //             document.body.appendChild(image);

            //     },
                
            }
    },
    ready: function () { 
        this.$http.get('/mock/invite/link').then(function (response) {
            this.data = response.data;
        }, function (response) {
            alert("Opsss");
        });
    }
};
</script>