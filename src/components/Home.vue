<template>
  <div class="bg">
    <div id="bg"></div>
    <div class="wrap">
      <div
        class="photo"
        v-for="(img, idx) in imgList"
        :key="idx"
        :class="[
          { 'photo-center': img.center },
          [img.front ? 'photo-front' : 'photo-back'],
        ]"
        @click="turnPhoto(idx)"
        :style="
          img.center
            ? ''
            : {
                left: img.pos.x + '%',
                top: img.pos.y + '%',
                transform: 'rotate(' + img.rotate + 'deg)',
              }
        "
      >
        <div
          class="photo-wrap"
          :class="{ float: !img.center }"
          :style="{ 'animation-delay': `0.${idx}s` }"
        >
          <div class="cursor" v-if="showCursor">
            <img src="../../static/img/cursor.png" alt="not found" />
          </div>
          <div class="side side-front">
            <loader v-if="img.loading"></loader>
            <img
              @load="handleLoad(idx)"
              v-show="!img.loading"
              class="image"
              :src="img.url"
              alt=""
            />
          </div>
          <div class="side side-back" :id="img.center ? 'back-canvas' : ''">
            <img
              class="back-container"
              :id="img.center ? 'center-back' : ''"
              :src="rainImgs[currentImg]"
              alt=""
            />
            <!--<div class="filter">-->

            <!--</div>-->
            <!--<div class="sky">-->
            <!--<img class="one" src="../../static/img/cloud_one.png" alt="">-->
            <!--<img class="two" src="../../static/img/cloud_two.png" alt="">-->
            <!--<img class="three" src="../../static/img/cloud_three.png" alt="">-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="nav" v-for="(img, idx) in imgList" :key="idx">
      <span></span>
    </div>
  </div>
</template>

<script>
import RENDER from "../js/sakura";
import RainyDay from "../js/rainyday";

export default {
  mounted() {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    this.imgWidth = document.getElementsByClassName("photo")[0].clientWidth;
    this.imgHeight = document.getElementsByClassName("photo")[0].clientHeight;
    this.sort(this.random([0, this.imgList.length - 1]));
    RENDER.init();
    this.$nextTick(function () {
      let img = document.getElementById("center-back");
      let engine = new RainyDay({
        image: img,
        parentElement: document.getElementById("back-canvas"),
      });
      engine.rain([[3, 2, 2]], 100);
    });
    // this.$nextTick(function(){
    //   let _this = this;
    //   let list = document.getElementsByClassName('image');
    //   let index;
    //   for(let item of list){
    //     item.onload = function(){
    //       _this.imgList.forEach((i,idx)=>{
    //         console.log(item.src);
    //         console.log(i.url)
    //           if(item.src.indexOf(i.url) !== -1){
    //             index = idx
    //           }
    //       });
    //       console.log(index);
    //       console.log(_this.imgList[index].loading)
    //       _this.$set(_this.imgList[index],'loading',false)
    //     }
    //   }
    // })
  },
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      imgWidth: 0,
      imgHeight: 0,
      rotate: 0,
      showCursor: true,
      imgList: [
        {
          url: "./static/img/dolores/mmexport1646954639190.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
        {
          url: "./static/img/dolores/mmexport1646954992126.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
        {
          url: "./static/img/dolores/mmexport1647008144240.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
        {
          url: "./static/img/dolores/mmexport1647008148950.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
        {
          url: "./static/img/dolores/mmexport1647008233830.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
        {
          url: "./static/img/dolores/mmexport1650984335083.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
        {
          url: "./static/img/dolores/mmexport1651551717778.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
        {
          url: "./static/img/dolores/mmexport1652628550753.jpeg",
          front: true,
          center: false,
          pos: { x: null, y: null },
          loading: true,
        },
      ],
      currentImg: 0,
      rainImgs: [
        "./static/img/rainy/1.jpg",
        "./static/img/rainy/2.jpg",
        "./static/img/rainy/3.jpg",
        "./static/img/rainy/4.jpg",
        "./static/img/rainy/5.jpg",
      ],
    };
  },
  methods: {
    sort(idx) {
      this.imgList[idx].center = true;
      let half = this.imgList.length / 2;
      let axis;
      let unique_arr = [];
      for (let i = 0; i < this.imgList.length; i++) {
        let rand = Math.floor(Math.random() * this.imgList.length);
        while (unique_arr.indexOf(rand) !== -1) {
          rand = Math.floor(Math.random() * this.imgList.length);
        }
        unique_arr.push(rand);
        axis = this.generatePos(
          this.screenWidth,
          this.screenHeight,
          this.imgWidth,
          this.imgHeight,
          unique_arr.length < half ? "left" : "right"
        );
        this.imgList[rand].pos = axis;
        this.imgList[rand].front = true;
        this.imgList[rand].rotate = this.random([-150, 150]);
      }
    },
    random(range) {
      let max = Math.max(range[0], range[1]),
        min = Math.min(range[0], range[1]),
        diff = max - min;
      return Math.ceil(Math.random() * diff + min);
    },
    handleLoad(idx) {
      this.imgList[idx].loading = false;
    },
    turnPhoto(idx) {
      let currentImg = this.imgList[idx];
      if (!currentImg.front || !currentImg.center) {
        this.currentImg > this.rainImgs.length - 1
          ? (this.currentImg = 0)
          : this.currentImg++;
      }
      if (currentImg.center) {
        currentImg.front = !currentImg.front;
        this.showCursor = false;
        let img = document.getElementById("center-back");
        let engine = new RainyDay({
          image: img,
          parentElement: document.getElementById("back-canvas"),
        });
        engine.rain([[3, 2, 2]], 100);
      } else {
        for (let item of this.imgList) {
          item.center ? (item.center = false) : "";
        }
        currentImg.center = true;
        this.sort(idx);
      }
    },
    generatePos(width, height, imgWidth, imgHeight, pos, vertical) {
      let x,
        y = height / 2,
        xP,
        yP;
      if (pos === "left") {
        x = this.random([0, width / 2 - imgWidth]);
      } else {
        x = this.random([width / 2 + imgWidth / 2, width - imgWidth]);
      }
      //避免y轴重叠
      while (y > (height - imgHeight) / 2 && y < (height + imgHeight) / 2) {
        y = this.random([0, height - imgHeight]);
      }

      xP = (x / width) * 100;
      yP = (y / height) * 100;
      return { x: xP, y: yP };
    },
  },
};
</script>

<style lang="scss" scoped>
#bg {
  position: absolute;
  width: 100%;
  height: 100vh;
}

.bg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #000000;
  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    perspective: 800px;
  }
}

.photo {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 200px;
  width: 200px;
  transform: translate(-50%, -50%);
  z-index: 1;
  cursor: pointer;
  transition: all 1s;
  filter: drop-shadow(10px 5px 10px #b98aa4);
  &.photo-center {
    transform: translate(-50%, -50%) scale(1.3);
    z-index: 999;
    filter: none;
    -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent
          50%, rgba(255, 255, 255, 0.6));
  }
  &.photo-back {
    .photo-wrap {
      transform: translate(100%, 0) rotateY(180deg);
    }
  }
  .photo-wrap {
    &.float {
      animation: float 10s infinite;
    }
    position: relative;
    transform-origin: 0 50%;
    transform-style: preserve-3d;
    transition: all 1s;
    height: 100%;
    width: 100%;
    .cursor {
      position: absolute;
      width: 40%;
      height: 40%;
      bottom: -18%;
      right: -18%;
      z-index: 9999;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        animation: shade 1.5s linear infinite;
      }
    }
    .side {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      background: #fff;
      align-items: center;
      justify-content: center;
      border-radius: 25px;
      backface-visibility: hidden;
      &.side-front {
        transform: rotateY(0deg);
      }
      &.side-back {
        .back-container {
          width: 100%;
          height: 100%;
        }
        transform: rotateY(180deg);
      }
      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
}

.filter {
  position: relative;
  width: 100%;
  height: 100%;
}

.filter:before,
.filter:after {
  content: "";
  height: 50%;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.5s;
  z-index: 1;
}

.sky {
  width: 100%;
  height: 100%;
  background: #007fd5;
  position: relative;
  overflow: hidden;
  animation: sky_background 30s ease-out infinite;
  transform: translate3d(0, 0, 0);
  img {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 300%;
    transform: translate3d(0, 0, 0);
  }
  .one {
    animation: cloud_move 5s linear infinite;
  }
  .two {
    animation: cloud_move 7.5s linear infinite;
  }
  .three {
    animation: cloud_move 10s linear infinite;
  }
}

@media (max-width: 1024px) {
  .photo {
    width: 100px;
    height: 100px;
  }
}

@keyframes shade {
  0% {
    opacity: 0.5;
    transform: translate(20%, 20%);
  }
  50% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0.5;
    transform: translate(20%, 20%);
  }
}

@keyframes sky_background {
  0% {
    background: #007fd5;
    color: #007fd5;
  }
  50% {
    background: #000;
    color: #a3d9ff;
  }
  100% {
    background: #007fd5;
    color: #007fd5;
  }
}

@keyframes cloud_move {
  0% {
    left: 0;
  }
  100% {
    left: -200%;
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(0, 10px);
  }
  66% {
    transform: translate(0, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
