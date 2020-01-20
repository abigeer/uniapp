<template>
	<!-- 启动页 -->
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">来顶圣诞帽</block>
		</cu-custom>
		<view class="content">
			<view class="bg-white flex-sub radius shadow-lg logo">
				<image src="https://image.weilanwl.com/gif/loading-white.gif" mode="aspectFit" class="gif-white response" style="height:240upx"></image>
			</view>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				title:"请稍等..."
			}
		},
		onShow() {
			//启动页判断跳转页面
			//检查是否登录
			// var token = uni.getStorageSync('token')
			// console.log("缓存中的："+token)
			uni.getSetting({
				success: (res) => {
					if(!res.authSetting['scope.userInfo']){
						console.log("未登录过！")
						//将全局登录变量设置为false
						getApp().globalData.isLogin = false
						// 跳转到首页
						uni.navigateTo({
							url:'index'
						})
					}else{
						//登录过，检查是否过期
						uni.checkSession({
							success: () => {
								console.log("授权未过期！")
								//获取用户信息到全局变量
								uni.getUserInfo({
									provider:'weixin',
									success: (res) => {
										getApp().globalData.isLogin = true
										getApp().globalData.userInfo = res.userInfo
										getApp().globalData.userInfo.avatarUrl = res.userInfo.avatarUrl.substring(0,res.userInfo.avatarUrl.length-3)+"0"
										uni.navigateTo({
											url:'index'
										})
									}
								})
							},
							fail: ()=>{
								//授权过期，到登录页面
								console.log("授权已过期！")
								getApp().globalData.isLogin = false
								uni.navigateTo({
									url:'index'
								})
							}
						})
					}
				}
			})
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
