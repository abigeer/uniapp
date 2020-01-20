<template>
	
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">登录</block>
		</cu-custom>
		<view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" open-type="getUserInfo" @getuserinfo="login">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '需要使用你的微信昵称和头像',
				loginFlag: false
			}
		},
		onLoad() {

		},
		methods: {
			login: function(){
				//获取用户授权
				uni.getSetting({
					success: (res) => {
						console.log("调用授权接口！")
						console.log(res.authSetting['scope.userInfo'])
						if(!res.authSetting['scope.userInfo']){
							console.log("未授权！")
							uni.authorize({
								scope:'scope.userInfo',
								success: () => {
									console.log("获取用户授权成功！")
									//调用wx.login
									uni.login({
										provider:'weixin',
										success: (res) => {
											console.log("调用uni.login()成功！")
											if(res.code){
												// uni.request({
												// 	url:'http://localhost:38080/lime/avator/wechat/login',
												// 	data:{
												// 		code:res.code
												// 	},
												// 	//请求成功
												// 	success: (rep) => {
												// 		console.log("发起后台登录请求成功！")
												// 		if(rep.data.model.success){
												// 			console.log("后台登录成功！")
												// 			//将token存入本地
												// 			uni.setStorage({
												// 				key:'token',
												// 				data:rep.data.model.token
												// 			})
												// 			//发起获取用户信息请求
												// 			uni.getUserInfo({
												// 				provider:'weixin',
												// 				success: (info) => {
												// 					console.log("获取用户信息成功！")
												// 					//将用户信息存入全局变量
												// 					getApp().globalData.userInfo = info.userInfo
												// 					getApp().globalData.userInfo.avatarUrl = info.userInfo.avatarUrl.substring(0,info.userInfo.avatarUrl.length-3)+"0"
												// 					this.loginFlag = true
												// 					uni.navigateTo({
												// 						url:'index'
												// 					})
												// 				},
												// 				fail: () => {
												// 					console.log("获取用户信息失败！")
												// 				}
												// 			})
												// 		}
												// 	},
												// 	fail: () => {
												// 		console.log("发起登录请求失败！")
												// 	}
												// })
												//发起获取用户信息请求
												uni.getUserInfo({
													provider:'weixin',
													success: (info) => {
														console.log("获取用户信息成功！")
														//将用户信息存入全局变量
														getApp().globalData.isLogin = true
														getApp().globalData.userInfo = info.userInfo
														getApp().globalData.userInfo.avatarUrl = info.userInfo.avatarUrl.substring(0,info.userInfo.avatarUrl.length-3)+"0"
														this.loginFlag = true
														uni.navigateTo({
															url:'index'
														})
													},
													fail: () => {
														console.log("获取用户信息失败！")
													}
												})
											}
										},
										fail: () => {
											console.log("调用登录uni.login()失败！")
										}
									})
								},
								fail: () => {
									console.log("获取用户授权失败！")
								}
							})
						}else{
							//已经授权
							//调用wx.login
							uni.login({
								provider:'weixin',
								success: (res) => {
									console.log("调用uni.login()成功！")
									if(res.code){
										uni.showToast({
											title:"登录中...",
											icon:"loading",
											duration:1500
										})
										// uni.request({
										// 	url:'http://localhost:38080/lime/avator/wechat/login',
										// 	data:{
										// 		code:res.code
										// 	},
										// 	//请求成功
										// 	success: (rep) => {
										// 		console.log("发起后台登录请求成功！"+rep.data.success)
										// 		if(rep.data.success == true){
										// 			console.log("后台登录成功！")
										// 			//将token存入本地
										// 			uni.setStorage({
										// 				key:'token',
										// 				data:rep.data.model.token
										// 			})
										// 			//发起获取用户信息请求
										// 			uni.getUserInfo({
										// 				provider:'weixin',
										// 				success: (info) => {
										// 					console.log("获取用户信息成功！")
										// 					//将用户信息存入全局变量
										// 					getApp().globalData.userInfo = info.userInfo
										// 					getApp().globalData.userInfo.avatarUrl = info.userInfo.avatarUrl.substring(0,info.userInfo.avatarUrl.length-3)+"0"
										// 					this.loginFlag = true
										// 					uni.navigateTo({
										// 						url:'index'
										// 					})
										// 				},
										// 				fail: () => {
										// 					console.log("获取用户信息失败！")
										// 				}
										// 			})
										// 		}
										// 	},
										// 	fail: () => {
										// 		console.log("发起登录请求失败！")
										// 	}
										// })
										//发起获取用户信息请求
										uni.getUserInfo({
											provider:'weixin',
											success: (info) => {
												console.log("获取用户信息成功！")
												//将用户信息存入全局变量
												getApp().globalData.isLogin = true
												getApp().globalData.userInfo = info.userInfo
												getApp().globalData.userInfo.avatarUrl = info.userInfo.avatarUrl.substring(0,info.userInfo.avatarUrl.length-3)+"0"
												this.loginFlag = true
												uni.navigateTo({
													url:'index'
												})
											},
											fail: () => {
												console.log("获取用户信息失败！")
											}
										})
									}
								},
								fail: () => {
									console.log("调用登录uni.login()失败！")
								}
							})
						}
					},
					fail: () => {
						console.log("授权失败！")
					}
				})
				// console.log("跳转判断flag："+this.loginFlag)
				// if(this.loginFlag){
				// 	console.log("开始跳转页面！")
				// 	uni.navigateTo({
				// 		url:'pages/index/index'
				// 	})
				// }
				
			}

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
