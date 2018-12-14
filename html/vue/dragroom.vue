<template>
  <div class="content" @mousewheel="zoom($event)" :style="{left:offLeft+'px',top:offTop+'px'}">
    <vue-draggable-resizable
      :w="eleW"
      :h="eleH"
      @dragging="onDrag"
      @resizing="onResize"
      :parent="true"
      style="background:red;z-index:10"
      :x="left"
      :y="top"
      ref="dr"
      v-if="show"
    ></vue-draggable-resizable>
    <svg :width="width*zoomRate" :height="height*zoomRate">
      <!-- x轴 -->
      <line
        v-for="item in row"
        :key="item"
        :x1="0+'%'"
        :y1="item/row*100+'%'"
        x2="100%"
        :y2="item/row*100+'%'"
        style="stroke:rgb(99,99,99);stroke-width:0.5;"
      ></line>
      <!-- y轴 -->
      <line
        v-for="item in col"
        :key="item.id"
        :x1="item/col*100+'%'"
        :y1="0+'%'"
        :x2="item/col*100+'%'"
        y2="100%"
        style="stroke:rgb(99,99,99);stroke-width:0.5;"
      ></line>
    </svg>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
export default {
  name: "HelloWorld",
  components: { VueDraggableResizable },
  data() {
    return {
      height: 500,
      width: 800,
      zoomRate: 1,
      offLeft: 0,
      offTop: 0,
      row: 40,
      col: 40,
      isBig: false,
      mouseStartX: 0,
      mouseStartY: 0,
      offTopMouse: 0,
      offLeftMouse: 0,
      left: 100,
      top: 100,
      show: true,
      bigZoom: 2,
      eleW:200,
      eleH:150
    };
  },
  methods: {
    onResize(left, top, width, height) {
      console.log(left, top, width, height);
      this.left = left;
      this.top = top ;
      this.eleW = width;
      this.eleH = height;
    },
    onDrag(left, top) {
      console.log(left, top);
       this.left = left;
      this.top = top ;
    },
    mousesdown(e) {
      console.log(e.offsetX, e.offsetY);
      this.mouseStartX = e.offsetX;
      this.mouseStartY = e.offsetY;
    },
    move(e) {
      console.log(e.offsetX, e.offsetY);
    },
    getXY(height, width, row, col, offsetX, offsetY) {
      return {
        x: Math.ceil(offsetX / (width / col)),
        y: Math.ceil(offsetY / (height / row))
      };
    },
    zoom(e) {
      if (e.deltaY > 0) {
        if (this.isBig) {
          this.show = false;
          this.$nextTick(() => {
            this.left = this.left / this.bigZoom;
            this.top = this.top / this.bigZoom;
            this.show = true;
          });
        }

        console.log("缩小");
        console.log(
          this.getXY(
            this.height * this.bigZoom,
            this.width * this.bigZoom,
            this.row,
            this.col,
            e.offsetX,
            e.offsetY
          )
        );
        this.zoomRate = 1;
        this.offLeft = 0;
        this.offTop = 0;
        this.isBig = false;
      } else {
        if (!this.isBig) {
          console.log("放大");
          this.zoomRate = 2;
          let disx = e.offsetX * this.zoomRate - e.offsetX;
          let disy = e.offsetY * this.zoomRate - e.offsetY;
          this.offLeft = -disx;
          this.offTop = -disy;
          console.log(disx, disy);
          this.isBig = true;
          console.log(
            this.getXY(
              this.height * this.zoomRate,
              this.width * this.zoomRate,
              this.row,
              this.col,
              e.offsetX * this.zoomRate,
              e.offsetY * this.zoomRate
            )
          );

          this.show = false;
          this.$nextTick(() => {
            this.left = this.left * this.zoomRate;
            this.top = this.top * this.zoomRate;
            this.show = true;
          });
        }
      }

      console.log(this.$refs.dr);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  display: inline-block;
  font-size: 0;
}

.content {
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  display: inline-block;
  font-size: 0;
  transition: all 0.3s;
}

svg {
  transition: all 0.3s;
  position: relative;
  z-index: -1;
}
.screen {
  width: 100px;
  height: 100px;
  position: absolute;
  background: red;
  z-index: 1;
}
</style>
