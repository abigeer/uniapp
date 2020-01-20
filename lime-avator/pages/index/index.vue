<template>
	<view>
		<view class="bg-gradual-green shadow-blur">
		<view class="Ucenter-bg" style="height: 300upx;">
			<view class="chrs">
				<!-- <image src="../../static/indextop3.gif" style="width: 100%;height:300upx;"></image> -->
				<!-- <image src="../../static/crs3.png" style="width: 200upx;height: 200upx;"></image>
				<image src="../../static/crs2.png" style="width: 200upx;height: 200upx;"></image> -->
			</view>
			<image src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100upx"></image>
		</view>
		</view>
	<view class="content">
		
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="avator-hat bg-white shadow shadow-lg" :style="{'width':systemWidth+'px',height:systemWidth+'px','background-image':isLogin?'url('+userInfo.avatarUrl+')':'',
		 'background-size':systemWidth+'px '+systemWidth+'px'}" >
			<block v-for="item in itemList" :key="item.id">
				<view class="touchwrap" :style="{'top': item.top+'px', 'left':item.left+'px','transform':'scale('+item.scale+')'}">
					<view :class="['imgwrap', item.active?'touchactive':'', 'clearfix']" :style="{'transform':'rotate('+item.rotate+'deg)'
					,'border':item.active?4*item.oscale+'rpx #fff dashed':'0rpx #fff dashed'}">
						<image :src="item.url" :data-id="item.id" :style="{'width':item.width+'px','height':item.height+'px'}"
						 @touchstart='WraptouchStart' @touchmove="WraptouchMove"></image>
						<image class="x" src="../../static/x.png" :style="{'transform':'scale('+item.oscale+')','transform-origin':'center'}" :data-id="item.id" @tap="deleteItem"></image>
						<image class="o" src="../../static/o.png" :style="{'transform':'scale('+item.oscale+')','transform-origin':'center'}" :data-id="item.id" @touchstart='oTouchStart'
						 @touchmove='oTouchMove'></image>
					</view>
				</view>
			</block>
		</view>
		<!-- 头像饰品列表 -->
		<view class="cu-bar" style="width: 100%;height: 20upx;">
			<view class="action">
				<text class="cuIcon-title text-red"></text> 选择圣诞帽
			</view>
		</view>
		<view class="hat-list">
			<scroll-view scroll-x class="scroll-x" style="width: 90%;overflow: hidden; margin: 0 auto;">
				<block v-for="(hat,index) in hatList" :key="index">
					<view class="hat-item">
						<image :src=hat.url style="width: 100upx;height: 100upx;" @click="setItem({'url':hat.url})"></image>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="flex flex-direction getbutton" style="margin-top: 15upx;width: 80%;">
			<block v-if='isLogin'>
				<button class="cu-btn bg-gradual-red lg" @click="gopage">完成</button>
			</block>
			<block v-else>
				<button class="cu-btn bg-gradual-green lg" @click="tologin">制作自己的头像</button>
			</block>
			
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin : getApp().globalData.isLogin,
				systemWidth: uni.getSystemInfoSync().windowWidth * 0.9,
				itemList : getApp().globalData.items,
				itemId : 1,		//元素起始id
				flag : true,
				index : 0,		//被操作元素的index
				title: '跳转',
				userInfo: getApp().globalData.userInfo,
				avatarUrl: '',
				hatList: [
					{url:'/static/crs1.gif'},
					{url:'/static/crs2.gif'},
					{url:'/static/crs3.gif'},
					{url:'/static/crs4.gif'},
					{url:'/static/crs5.gif'},
					{url:'/static/crs6.gif'},
					{url:'/static/crs7.gif'},
					{url:'/static/crs9.gif'},
					{url:'/static/crs10.gif'},
					{url:'/static/crs11.gif'},
					{url:'/static/crs13.gif'},
					{url:'/static/crs14.gif'},
					{url:'/static/crs15.gif'}
				]
				// backgroundWdith: uni.getSystemInfoSync().windowWidth *0.9
			}
		},
		onLoad() {
			console.log("page onLoad")
			//发起请求服务端下载图片
			// uni.request({
			// 	url:'http://localhost:38080/lime/avator/wechat/dowloadavatar',
			// 	data:{
			// 		imagePath:this.userInfo.avatarUrl
			// 	},
			// 	success: (res) => {
			// 		if(res.data.success == true){
			// 			this.avatarUrl = res.data.model.imageUrl
			// 			console.log(this.avatarUrl)
			// 		}else{
			// 			console.log(res.data.model.msgInfo)
			// 			uni.showToast({
			// 				title:res.data.model.msgInfo,
			// 				icon:'none',
			// 				duration:1500
			// 			})
			// 		}
					
			// 	}
			// })
			// uni.getImageInfo({
			// 	src:this.userInfo.avatarUrl,
			// 	success: (res) => {
			// 		//发起请求将
			// 		this.avatarUrl = res.path
			// 	}
			// })
			// this.setItem({
			// 	url: '/static/1.png'
			// })
			// this.setItem({
			// 	url: '/static/crs2.png'
			// })
		},
		methods: {
			tologin: function(){
				uni.navigateTo({
					url:'login'
				})
			},
			gopage: function(){
				uni.navigateTo({
					url:"resultpage"
				})
			},
			setItem: function(imgData){
				if(this.itemList.length>0){
					this.itemList.pop()
				}
				let data = {}
				//初始化数据
				data.otouched = false;
				// data.width = res.width
				// data.height = res.height
				data.width = 150
				data.height = 150
				data.url = imgData.url
				data.id = this.itemId++
				data.top = 50
				data.left = 50
				//圆心坐标
				data.x = data.left + data.width/2
				data.y = data.top + data.height/2
				data.scale = 1	//scale缩放比例
				data.oscale = 1	//方向缩放
				data.rotate = 0	//旋转角度
				data.active = false		//元素是否被点击状态
				console.log(data)
				// this.itemList[this.itemList.length] = data
				this.itemList.push(data)
			},
			//点击开始事件回调函数
			WraptouchStart:function(e){
				for (let i = 0; i < this.itemList.length; i++) {
					this.itemList[i].active = false
					if(e.currentTarget.dataset.id == this.itemList[i].id){
						this.index = i
						this.itemList[this.index].active = true
					}
				}
				this.itemList[this.index].lx = e.touches[0].clientX
				this.itemList[this.index].ly = e.touches[0].clientY
				
				// console.log(this.itemList[this.index])
				console.log(this.itemList)
			},
			//移动元素事件
			WraptouchMove:function(e){
				if(this.flag){
					this.flag = false
					setTimeout(()=>{
						this.flag = true
					}, 100)
				}
				this.itemList[this.index]._lx = e.touches[0].clientX
				this.itemList[this.index]._ly = e.touches[0].clientY
				//调整元素位置
				this.itemList[this.index].left += this.itemList[this.index]._lx - this.itemList[this.index].lx
				this.itemList[this.index].top += this.itemList[this.index]._ly -this.itemList[this.index].ly
				this.itemList[this.index].x += this.itemList[this.index]._lx - this.itemList[this.index].lx
				this.itemList[this.index].y += this.itemList[this.index]._ly -this.itemList[this.index].ly
				//更新数据
				this.itemList[this.index].lx = e.touches[0].clientX
				this.itemList[this.index].ly = e.touches[0].clientY
				console.log(this.itemList)
			},
			//开始点击旋转事件
			oTouchStart:function(e){
				//定位点击图片，并记录
				for (let i = 0; i < this.itemList.length; i++) {
					this.itemList[i].active = false
					if(e.currentTarget.dataset.id == this.itemList[i].id){
						console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)
						this.index = i
						this.itemList[this.index].active = true
					}
				}
				if(!this.itemList[this.index].otouched){
					this.itemList[this.index].x = e.touches[0].clientX - this.itemList[this.index].width/2
					this.itemList[this.index].y = e.touches[0].clientY - this.itemList[this.index].height/2
					//获取图片半径
					this.itemList[this.index].r = this.getDistancs(this.itemList[this.index].x, this.itemList[this.index].y, e.touches[0].clientX, e.touches[0].clientY)
					this.itemList[this.index].otouched = true;
				}
				//获取作为移动前角度的坐标
				this.itemList[this.index].tx = e.touches[0].clientX
				this.itemList[this.index].ty = e.touches[0].clientY
				//获取移动前的角度
				this.itemList[this.index].anglePre = this.countDeg(this.itemList[this.index].x, this.itemList[this.index].y, this.itemList[this.index].tx, this.itemList[this.index].ty)
				
				console.log(this.itemList[this.index])
			},
			//旋转图片事件回调函数
			oTouchMove:function(e){
				if(this.flag){
					this.flag = false
					setTimeout(()=>{
						this.flag = true
					}, 100)
				}
				//记录移动后的位置
				this.itemList[this.index]._tx = e.touches[0].clientX
				this.itemList[this.index]._ty = e.touches[0].clientY
				//获取移动的点到圆心的距离
				this.itemList[this.index].disptoO = this.getDistancs(this.itemList[this.index].x,this.itemList[this.index].y,this.itemList[this.index]._tx,this.itemList[this.index]._ty)
				
				//计算缩放比例
				this.itemList[this.index].scale = this.itemList[this.index].disptoO / this.itemList[this.index].r
				this.itemList[this.index].oscale = 1 / this.itemList[this.index].scale
				
				//计算移动后位置的角度
				this.itemList[this.index].angleNext = this.countDeg(this.itemList[this.index].x,this.itemList[this.index].y,this.itemList[this.index]._tx,this.itemList[this.index]._ty)
				//角度差
				this.itemList[this.index].new_rotate = this.itemList[this.index].angleNext - this.itemList[this.index].anglePre
				
				//叠加的角度差
				this.itemList[this.index].rotate += this.itemList[this.index].new_rotate
				this.itemList[this.index].angle = this.itemList[this.index].rotate
				
				//用移动后的坐标赋值为移动前坐标
				this.itemList[this.index].tx = e.touches[0].clientX
				this.itemList[this.index].ty = e.touches[0].clientY
				this.itemList[this.index].anglePre = this.countDeg(this.itemList[this.index].x,this.itemList[this.index].y,this.itemList[this.index].tx,this.itemList[this.index].ty)
			},
			//计算角度
			/**
			 * 参数1和参数2为图片圆心坐标
			 * 参数3和参数4为手点击坐标
			 * 返回值为手点击的坐标到圆心的角度
			 */
			countDeg:function(cx, cy, pointer_x, pointer_y){
				var ox = pointer_x - cx;
				var oy = pointer_y - cy;
				var to = Math.abs(ox / oy);
				var angle = Math.atan(to) / (2 * Math.PI) * 360;
				// console.log("ox.oy:", ox, oy)
				if (ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
				{
				  angle = -angle;
				} else if (ox <= 0 && oy >= 0)//左下角,3象限  
				{
				  angle = -(180 - angle)
				} else if (ox > 0 && oy < 0)//右上角，1象限  
				{
				  angle = angle;
				} else if (ox > 0 && oy > 0)//右下角，2象限  
				{
				  angle = 180 - angle;
				}
				return angle;
			},
			//计算距离
			getDistancs:function(cx, cy, pointer_x, pointer_y){
				var ox = pointer_x - cx
				var oy = pointer_y - cy
				return Math.sqrt(ox * ox + oy * oy)
			},
			//删除元素
			deleteItem:function(e){
				for (let i = 0; i < this.itemList.length; i++) {
					if(e.currentTarget.dataset.id == this.itemList[i].id){
						this.itemList.splice(i,1)
					}
				}
			}
		}
	}
</script>

<style>
	.Ucenter-bg{
		background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
		/* background-image: url(http://localhost:38080/static/indextop.png); */
		/* background-position: 0upx -100upx; */
		background-size: 100% 330upx;
		background-repeat: no-repeat;
		overflow: hidden;
	}
	@import "../../colorui/animation.css";
	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
		/* z-index: 99; */
		mix-blend-mode: screen;
	}
	.response{
		position: relative;
		left: 0upx;
		top: 200upx;
		/* bottom: 0upx; */
	}
	.chrs{
		display: flex;
		justify-content: space-between;
		position: relative;
		/* top: 130upx; */
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.avator-hat {
		/* position: relative; */
		/* height:700rpx;
		width: 700rpx; */
		/* background-color: #007AFF; */
		/* background-image:url(https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgtqEhLtzEvmHfCzkKk2Il656KUpIbRzCRfbFHb4hUnN8c2BibKaSUMLhBw2hc8sJYpc94LaCicPMg/132); */
		/* background-size: 700rpx 700rpx; */
		background-repeat: no-repeat;
		margin-top: 15upx;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.touchwrap{
	    transform-origin: center;
	    position: relative;
	    z-index: 100;
	}
	.imgwrap {
	    box-sizing: border-box;
	    width: auto;
	    transform-origin: center;
	    /* float: left; */
	    border: 5rpx transparent dashed;
		display: inline-block;
	}
	/* 解决imagewrap的高度塌陷问题 */
	.clearfix:after{
		content: "";
		display: block;
		clear: both;
	}
	.imgwrap image {
	    float: left;
	}
	.touchactive .x{
		display: block;
	}
	.touchactive .o{
		display: block;
	}
	.x{
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: -20rpx;
		left: -20rpx;
		z-index: 500;
		font-weight: bold;
		overflow: hidden;
		display: none;
		color: #D1E3F1;
	}
	.o{
		position: absolute;
		bottom: -20rpx;
		right: -20rpx;
		width: 40rpx;
		height: 40rpx;
		overflow: hidden;
		display: none;
		text-align: center;
		font-weight: bold;
		color: #D1E3F1;
	}
	.getbutton{
		width: 90%;
	}
	.hat-text{
	}
	.hat-list{
		display: flex;
		flex-direction: row;
		white-space: nowrap;
		height: 100upx;
		width: 100%;
	}
	.hat-item{
		display: inline-block;
		width: 150upx;
		height: 150upx;
		/* background-color: #007AFF; */
	}

</style>
