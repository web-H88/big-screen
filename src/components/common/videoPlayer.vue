<template>
  <div :style="{width:'100%',position:'relative',height:height}">
    <div data-vjs-player style="width:100%">
      <video ref="videoNode" class="video-js vjs-default-skin vjs-big-play-centered">抱歉，您的浏览器不支持</video>
    </div>
    <div
      v-if="loading"
      :style="{width:'100%',height:height,position:'absolute',left:'0px',top:'0px'}"
    >
      <img
        :style="{width:'100%',height:height}"
        src="https://img.zcool.cn/community/0113b1576a43e90000018c1b87042d.gif"
      />
    </div>
  </div>
</template>

<script>
  import videojs from "video.js"
  // 播放器中文，不能使用.js文件
  import videozhCN from "video.js/dist/lang/zh-CN.json"
  // 样式文件注意要加上
  import "video.js/dist/video-js.css"
  // 如果要播放RTMP要使用flash 需要先npm i videojs-flash
  import "videojs-flash"

  export default {
    props: {
      controls: {
        type: Boolean,
        default: false,
        required: true
      },
      height: {
        type: String,
        default: ""
      },
      src: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        player: null,
        loading: false
      }
    },
    mounted () {
      let options = {
      // 自动播放
      // autoplay: true, 
      language: "zh-CN",
      // 控制条
      controls: this.controls,
      // 自动加载
      preload: "auto",
      // 错误展示
      errorDisplay: true,
      // 跟随外层容器变化大小，跟随的是外层宽度
      fluid: true,
      width: "100%",
      height: this.height,
      // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
      // controlBar: false,
      // 不渲染字幕相关DOM
      // textTrackDisplay: false, 
      userActions: {
        // 是否支持热键
        hotkeys: true
      },
      notSupportedMessage: "此视频暂无法播放，请稍后再试",
      techOrder: ["html5", "flash"],
      sources: [
        {
          src: this.src,
          type: this.type
        }
      ]
    }
    let _this = this
    this.player = videojs(
      this.$refs.videoNode,
      options,
      function onPlayerReady() {
        videojs.log(`Your player${self.index} is ready!`)
      //   _this.loading = true
        _this.player.play()
        _this.player.one("playing", function () {
          // 监听播放
          // console.log("播放器开始播放");
          // _this.loading = false
        })
      }
    )
    videojs.addLanguage("zh-CN", videozhCN)
    if (this.markers) {
      this.player.markers({
        markerStyle: {
          // 标记样式
          width: "0.7em",
          height: "0.7em",
          bottom: "-0.20em",
          "border-radius": "50%",
          "background-color": "orange",
          position: "absolute"
        },
        markerTip: {
          display: true,
          /*
            用于动态构建标记提示文本的回调函数。
            只需返回一个字符串，参数标记是传递给插件的标记对象
            */
          text: function(marker) {
            return marker.text
          }
        },
        markers: this.markers
      })
    }
  },
    watch: {
      src () {
        if (this.player) {
          let _this = this
          // 重新显示加载状态
          this.loading = true
          let myPlayer = this.player
          // 清空时间
          myPlayer.off("timeupdate")
          // 重置播放器
          myPlayer.reset()
          // 暂停播放
          myPlayer.pause()
          // 重新设置播放源
          myPlayer.src([
            {
              src: this.src,
              type: "rtmp/flv"
            }
          ])
          // 重新加载视频
          myPlayer.load(this.src)
          // 播放视频
          myPlayer.play()
          myPlayer.one("playing", function() {
            // 加载完成，开始播放
            // 隐藏加载状态
            _this.loading = false
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>