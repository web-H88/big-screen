<template>
    <videoPlayer :controls="true" height="600px" :src="url" type="video/mp4" :markers="markers"/>
</template>
<script>
import videoPlayer from "@/components/common/videoPlayer"
export default {
  components: { 
    videoPlayer
  },
  data() {
    return {
      url: "https://v.itheima.net/bigdata/hE7P@WM2.mp4",
      markers: [
        {
          time: 20,
          text:'点位一'
        },
        {
          time: 40,
          text:'点位二点位二点位二点位二点位二点位二点位二点位二'
        },
        {
          time: 130,
          text:'点位三点位三点位三点位三点位三点位三'
        },
        {
          time: 200,
          text:'点位四点位四点位四点位四点位四点位四'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
</style> 