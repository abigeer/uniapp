<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">来顶圣诞帽</block>
		</cu-custom>
		
		<canvas canvas-id="myCanvas" class="mycanvas shadow shadow-lg bg-grey margin-top" :style="{'width':canvasWidth+'px','height':canvasWidth+'px'}"></canvas>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-gradual-red lg" @click="save2Album">保存到相册</button>
			<button class="cu-btn bg-grey margin-tb-sm lg" open-type="share">邀请好友</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				canvasWidth: uni.getSystemInfoSync().windowWidth*0.9,
				canvasImagePath:'',
				templateImagePath:''
			}
		},
		onLoad() {
			var ctx = uni.createCanvasContext("myCanvas")
			// ctx.setFillStyle("#DD524D")
			// ctx.strokeRect(30,30,50,50)
			// ctx.translate(55,55)
			// ctx.rotate(45* Math.PI / 180)
			// ctx.translate(-25,-25)
			// ctx.strokeRect(0,0,50,50)
			// ctx.draw()
			// ctx.setFillStyle("#007AFF")
			// ctx.setFontSize(20)
			// ctx.fillText("LXT",20,20)
			// console.log(this.canvasWidth)
			// console.log(getApp().globalData.items)
			//异步方法
			uni.getImageInfo({
				src:getApp().globalData.userInfo.avatarUrl,
				success: (res) => {
					console.log("绘图："+res.path)
					ctx.drawImage(res.path,0,0,this.canvasWidth,this.canvasWidth)
					// uni.setStorage({
					// 	key:'avatorUrl',
					// 	data:res.path
					// })
					getApp().globalData.items.forEach((item,index)=>{
						ctx.save()
						ctx.beginPath()
						ctx.translate(item.width/2+item.left,item.height/2+item.top)	//圆心
						//小程序的旋转是图片的左上角依照坐标原点进行旋转
						ctx.rotate(item.rotate * Math.PI / 180)
						ctx.translate(-item.width*item.scale/2, -item.height*item.scale/2)
						ctx.scale(item.scale,item.scale)
						ctx.drawImage(item.url,0,0,150,150)
						ctx.restore()
					})
					ctx.draw(false,()=>{
						uni.canvasToTempFilePath({
							canvasId:'myCanvas',
							success: (res) => {
								//获取图片临时路径
								console.log(res.tempFilePath)
								this.canvasImagePath = res.tempFilePath
							}
						})
					})
					
				}
			})
			// // ctx.drawImage("../../static/1.png",0,0,this.canvasWidth,this.canvasWidth)
			// var item = getApp().globalData.items[0]
			// ctx.translate(item.width/2+item.left,item.height/2+item.top)	//圆心
			// //小程序的旋转是图片的左上角依照坐标原点进行旋转
			// ctx.rotate(item.rotate * Math.PI / 180)
			// ctx.translate(-item.width*item.scale/2, -item.height*item.scale/2)
			// ctx.scale(item.scale,item.scale)
			// ctx.drawImage("../../static/1.png",0,0,150,150)
			// ctx.restore()
			// ctx.draw(true)
			this.saveTemplatePath2Storage(getApp().globalData.userInfo.avatarUrl)
			// var imagePath = uni.getStorageSync('templateImagePath')
			// console.log("临时网络图片："+imagePath)
			// ctx.drawImage(imagePath,0,0,this.canvasWidth,this.canvasWidth)
			
		},
		onShareAppMessage:function(res){
			if(res.from === 'button'){
				console.log(res.target,res)
			}
			return {
				title:'获取你的圣诞帽',
				path: 'pages/index/resultpage'
			}
			
		},
		methods: {
			save2Album: function(){
				//调用接口，查看权限
				uni.getSetting({
					success: (res) => {
						//未授权
						if(!res.authSetting['scope.writePhotosAlbum']){
							//发起授权请求
							uni.authorize({
								scope:'scope.writePhotosAlbum',
								//授权成功回调
								success: (res) => {
									//保存图片
									this.saveImage()
								}
							})
						}else{
							this.saveImage()
						}
					}
				})
			},
			saveImage: function(){
				uni.saveImageToPhotosAlbum({
					filePath:this.canvasImagePath,
					success: (res) => {
						console.log("图片保存到相册成功！")
					}
				})
			},
			saveTemplatePath2Storage:function(src){
				uni.getImageInfo({
					src:src,
					success: (res) => {
						uni.setStorage({
							key:'templateImagePath',
							data:res.path
						})
					}
				})
			}
		}
	}
</script>

<style>
	
	.mycanvas{
		border-radius: 30rpx;
		height: 300px;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
		overflow: hidden;
	}

</style>
