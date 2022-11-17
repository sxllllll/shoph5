<template>
	<view class="tabs-header" :id="pid">
		<view v-if="!hideTabLine" class="tabs-header-line" :style="{backgroundColor:lineColor}">
		</view>
		<scroll-view ref="tabs" :id="pid+'tab'" class="tab-scroll"
			:scroll-left="isScroll ? tempScrollLeft : 0"
			:style="{background:tabBgColor,paddingLeft:`${scrollStart}px`,whiteSpace:isScroll?'nowrap':'normal'}"
			:scroll-x="isScroll" :show-scrollbar="false">
			<view class="tabContainer" :style="{flex:isScroll?'':'1'}">
				<!-- 胶囊指示器 -->
				<view v-if="tipType=='pill'" :class="isAnimation?'animationPill':'pill'"
					:style="{ top:`${pillTop}px`,borderRadius:`${pillRatio}px`,left:'0rpx',transform:`translateX(${tipLeft}px)`,height:`${pillHeight}px`,width:`${tipWidth}px`,background:tipBgColor}">
				</view>
				<!-- TabItem主体 -->
				<view class="tabItemParent">
					<view class="tab_item" v-for="(item,index) in tabs" :key="index"
						:style="{flex:isScroll?0:1,paddingLeft:tabPaddingLeft,paddingBottom:tabPaddingBottom,paddingRight:tabPaddingRight,paddingTop:tabPaddingTop,margin:tabMargin,backgroundColor:tabIndex==index?'rgba(0,0,0,0)':tabBackgroundColor,borderRadius:`${pillRatio}px`}">
						<view @click="handSelectTab(index)" class="tab_item_controll"
							:id="pid+'tabItem'+index" :ref="'tabItem'+index">
							<!--图形-->
							<image v-if="tabImages.length>index"
								:style="{width:`${tabImageSize}px`,height:`${tabImageSize}px`}"
								:src="tabImages.length>i?tabImages[index]:''"></image>
							<!--文字-->
							<text class="text"
								:style="{fontSize:`${tabFontSize}px`,color:tabIndex==index?(tabActColors[index]?tabActColors[index]:actFontColor):(tabColors[index]?tabColors[index]:normFontColor),fontWeight:(tabIndex==index&&actFontBolder)?'bold':'normal'}">
								{{item}}
							</text>
						</view>
					</view>
				</view>
				<!-- 底部指示器 -->
				<view v-if="tipType=='norm'" :class="isAnimation?'animationTabTip':'tabTip'"
					:style="{width:tipWidth+'px',background:(tabTipBgColors[tabIndex]?tabTipBgColors[tabIndex]:tipBgColor),transform:`translateX(${tipLeft}px)` }">
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	/**
	 * Tab 
	 * @property	{String}		tipType				模式[norm(底部滑线)|pill(药丸胶囊)]（默认 norm）
	 * @property	{Boolean}		hideTabLine		隐藏下划分割线（默认 false）
	 * @property	{Array}			tabs					数据源（默认 []）
	 * @event			{Function}	change				tab改变时触发
	 * @example	<g-tabs ref="tab" :tabs="tabs" v-model="tabIndex" @change="tabChanged"></g-tabs>
	 */
	export default {
		props: {
			tipType: {
				type: String,
				default: 'norm'
			},
			hideTabLine: {
				type: Boolean,
				default: false
			},
			tabs: {
				type: Array,
				default: function() {
					return []
				}
			},
			tabColors: {
				type: Object,
				default: function() {
					return {}
				}
			},
			tabActColors: {
				type: Object,
				default: function() {
					return {}
				}
			},
			tabTipBgColors: {
				type: Object,
				default: function() {
					return {}
				}
			},
			tabImages: {
				type: Array,
				default () {
					return []
				}
			},
			scrollStart: {
				type: Number,
				default: 0
			},
			value: {
				type: Number,
				default () {
					return 0
				}
			},
			tabPaddingLeft: {
				type: String,
				default: '12px'
			},
			tabPaddingRight: {
				type: String,
				default: '12px'
			},
			tabPaddingTop: {
				type: String,
				default: '12px'
			},
			tabPaddingBottom: {
				type: String,
				default: '9px'
			},
			tabBackgroundColor: {
				type: String,
				default: 'rgba(0,0,0,0)'
			},
			tabMargin: {
				type: String,
				default: '0'
			},
			tabFontSize: {
				type: Number,
				default: 15
			},
			tabImageSize: {
				type: Number,
				default: 20
			},
			//选中时文字颜色
			actFontColor: {
				type: String,
				default: '#2C2C2C'
			},
			//选中时文字是否加粗
			actFontBolder: {
				type: Boolean,
				default: true,
			},
			//普通文字颜色 
			normFontColor: {
				type: String,
				default: '#666666'
			},
			tabBgColor: {
				type: String,
				default: 'rgba(0,0,0,0)'
			},
			tipBgColor: {
				type: String,
				default: '#22C398'
			},
			pillRatio: {
				type: Number,
				default: 30
			},
			pillTop: {
				type: Number,
				default: 0
			},
			pillHeight: {
				type: Number,
				default: 30
			},
			pillPaddingLeft: {
				type: Number,
				default: 4
			},
			pillPaddingRight: {
				type: Number,
				default: 4
			},
			isScroll: {
				type: Boolean,
				default: false
			},
			lineScale: {
				type: Number,
				default: 0.8
			},
			gid: {
				type: String,
				default () {
					return ''
				}
			},
			autoInit: {
				type: Boolean,
				default: true
			},
			lineColor: {
				type: String,
				default: '#F4F4F4'
			}
		},
		data() {
			return {
				tabIndex: 0,
				//是否需要动画,Swiper联动不需要动画
				isAnimation: true,
				scrollLeft: 0,
				// 滑动距离左边的位置
				tempScrollLeft: 0,
				tabWidth: null,
				tabTop: 0,
				tabLeft: 0,
				tabHeight: 0,
				tabFlags: [],
				tipWidth: 0,
				tipLeft: 0,
				tempTipLeft: 0,
				tempTipWidth: 0,
				pid: '',
			}
		},
		watch: {
			value(val) {
				this.tabIndex = val;
				if (this.tabFlags.length > 0) {
					this.selectTab(val);
				} else {
					this.init()
				}
				this.$emit('input', val)
			}
		},
		mounted() {
			this.tabIndex = this.value;
			let vm = this;
			if (!vm.pid) {
				vm.pid = 'per_' + vm.randomString();
			}
			if (vm.autoInit) {
				vm.init();
			} else {
				uni.$on("perTabFlags" + vm.gid, data => {
					if (data && (!vm.tabFlags || vm.tabFlags.length < 1)) {
						vm.tabFlags = data.tabFlags;
						vm.tabTop = data.tabTop;
						vm.tabWidth = data.tabWidth;
						vm.tabHeight = data.tabHeight;
						vm.tabLeft = data.tabLeft;
						vm.selectTab(vm.tabIndex);
					}
				})
			}
		},
		beforeDestroy() {
			uni.$off("perTabFlags" + this.gid);
		},
		methods: {
			//获取整个Tab信息
			init(force) {
				let vm = this;
				setTimeout(() => {
					try {
						// #ifdef MP-ALIPAY
						let query = uni.createSelectorQuery().select(`#${vm.pid}tab`)
						// #endif
						// #ifndef MP-ALIPAY 
						let query = uni.createSelectorQuery().in(vm).select(`#${vm.pid}tab`)
						// #endif 
						if (!vm.tabWidth || force) {
							query.boundingClientRect((data) => {
								// console.log(`#${vm.pid}tab`, data);
								if (data) {
									vm.tabWidth = data.width;
									vm.tabTop = data.top;
									vm.tabHeight = data.height;
									vm.tabLeft = data.left;
									//计算每个Item得关键位置
									vm.getTabFlags();
								}
							}).exec()
						}
					} catch (e) {}
				}, 50)
			},
			//计算每个Item的标记
			getTabFlags() {
				let vm = this;
				vm.tabFlags = [];
				let pxStart = vm.scrollStart;
				let pillStart = vm.pillPaddingLeft;
				let pillEnd = vm.pillPaddingRight;
				for (let i = 0; i < vm.tabs.length; i++) {
					// #ifdef MP-ALIPAY
					let query = uni.createSelectorQuery().select(`#${vm.pid}tabItem${i}`)
					// #endif
					// #ifndef MP-ALIPAY 
					let query = uni.createSelectorQuery().in(vm).select(`#${vm.pid}tabItem${i}`)
					// #endif  
					query.boundingClientRect((data) => {
							if (data) {
								//获取之前Tab的总宽度
								let item = {
									//右边距离左边的长度
									left: data.right,
									//内容中心点
									center: data.left + data.width / 2 - pxStart - vm.tabLeft,
									//内容宽度
									width: data.width,
									//内容高度
									height: data.height,
									//内容上外边距
									top: data.top
								};
								//底部指示器宽度
								if (vm.tipType == 'norm') {
									item.tipWidth = item.width * vm.lineScale * 1;
								} else if (vm.tipType == 'pill') {
									item.tipWidth = item.width + pillStart + pillEnd;
								}
								item.tipLeft = item.center - item.tipWidth / 2;
								vm.tabFlags.push(item);
								if (vm.tabFlags.length == vm.tabIndex + 1) {
									vm.selectTab(vm.tabIndex);
								}
								if (vm.tabFlags.length == vm.tabs.length) {
									setTimeout(() => {
										//发送全局事件,通知其他tab
										uni.$emit("perTabFlags" + vm.gid, {
											tabWidth: vm.tabWidth,
											tabTop: vm.tabTop,
											tabHeight: vm.tabHeight,
											tabFlags: vm.tabFlags,
											tabLeft: vm.tabLeft
										});
									}, 500)
								}
							}
						})
						.exec();
				}
			},
			//手动选择
			handSelectTab(index) {
				if (this.tabIndex == index) {
					return;
				}
				this.tabIndex = index;
				this.isAnimation = true;
				this.selectTab(index);
				this.$emit('change', index);
				this.$emit('input', index);
			},
			//非手动模式选中item
			selectTab(index) {
				let vm = this;
				vm.tipWidth = vm.tabFlags[index].tipWidth;
				vm.tempTipLeft = vm.tabFlags[index].tipLeft;
				vm.tempTipWidth = vm.tabFlags[index].tipWidth;
				vm.tipLeft = vm.tempTipLeft;
				vm.tipWidth = vm.tempTipWidth;
				vm.scrollAutoLeft();
			},
			//滚动条根据选择项自动滚动
			scrollAutoLeft() {
				//需增加参数，是否自动滚动
				return;
				let vm = this;
				let itemLeft = vm.tabFlags[vm.tabIndex].left;
				let tabCenter = vm.tabWidth / 2;
				if (itemLeft > tabCenter && vm.tabIndex != 0) {
					vm.tempScrollLeft = itemLeft - tabCenter + vm.scrollLeft;
				} else {
					vm.tempScrollLeft = vm.scrollLeft;
				}
			},
			//Swiper滚动适配器
			swiperApter(dx, swiperWidth, swiperIndex) {
				if (swiperIndex != this.tabIndex) {
					return;
				}
				let vm = this;
				vm.$set(vm, 'isAnimation', false);
				let distance = 0;
				let andWidth = 0;
				if (dx < 0) {
					if (vm.tabIndex > 0) {
						//左边
						distance = vm.tabFlags[vm.tabIndex].tipLeft - vm.tabFlags[vm.tabIndex - 1]
							.tipLeft + vm.tabLeft / 2;
						andWidth = vm.tabFlags[vm.tabIndex].tipWidth - vm.tabFlags[vm.tabIndex - 1]
							.tipWidth;
					}
				} else {
					//右边
					if (vm.tabIndex < vm.tabFlags.length - 1) {
						distance = vm.tabFlags[vm.tabIndex + 1].tipLeft - vm.tabFlags[vm.tabIndex]
							.tipLeft + vm.tabLeft / 2;
						andWidth = vm.tabFlags[vm.tabIndex + 1].tipWidth - vm.tabFlags[vm.tabIndex]
							.tipWidth;
					}
				}
				if (distance == 0) {
					return;
				}
				let pr = dx / swiperWidth;
				let moveX = pr * distance;
				let addW = pr * andWidth;
				vm.$set(vm, 'tipLeft', vm.tempTipLeft + moveX);
				vm.$set(vm, 'tipWidth', vm.tempTipWidth + addW);
			},
			// 产生随机字符串
			randomString(len) {
				len = len || 32
				let $chars =
					'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
				let maxPos = $chars.length
				let pwd = ''
				for (let i = 0; i < len; i++) {
					pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
				}
				return pwd
			},
		},
	}
</script>

<style scoped>
	.text {
		font-family: "PingFangSC-Regular";
	}

	.tabs-header {
		/* #ifndef APP-PLUS-NVUE */
		/* display: flex; */
		/* position: -webkit-sticky; */
		/* #endif */
		/* position: sticky; */
		/* top: var(--window-top); */
		/* z-index: 99; */
		position: relative;
	}

	.tabs-header-line {
		position: absolute;
		height: 1px;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.tab-scroll {
		/* #ifndef APP-NVUE
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.tabContainer {
		/* #ifndef APP-NVUE */
		flex: 1;
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.tabItemParent {
		/* #ifndef APP-NVUE */
		flex: 1;
		display: flex;
		z-index: 9;
		/* #endif */
		flex-direction: row;
	}

	.tab_item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
	}

	.tab_item_controll {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}


	.tabTip {
		border-radius: 0;
		height: 3px;
		/* nvue若使用动画，则无法修改颜色 */
		/* #ifndef APP-NVUE */
		transition-property: width, transform;
		transition-duration: 0s;
		/* #endif */
	}

	.animationTabTip {
		border-radius: 3px;
		height: 3px;
		/* #ifndef APP-NVUE */
		transition-property: width, transform;
		transition-duration: 0.15s;
		/* #endif */
	}

	.pill {
		position: absolute;
		/* #ifndef APP-NVUE */
		transition-property: width, transform;
		transition-duration: 0s;
		/* #endif */
	}

	.animationPill {
		position: absolute;
		/* #ifndef APP-NVUE */
		transition-property: width, transform;
		transition-duration: 0.15s;
		/* #endif */
	}
</style>
