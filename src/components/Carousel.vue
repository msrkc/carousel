<script>
export default {
  name: 'AppCarousel',
  props: {
    startFrom: {
      default: 0,
      required: false,
      type: Number
    },
    slides: {
      required: true,
      type: Array
    },
    autoSlideInterval: {
      type: Number,
      required: false
    },
    showProgressBar: {
      type: Boolean,
      required: false
    }
  },
  data: () => ({
    currentSlide: 0,
    autoSlideTimeout: null,
    stopSlider: false,
    timeLeft: 0,
    timerInterval: null,
    countdownInterval: 10,
    windowWidth: 0
  }),
  computed: {
    currentImage() {
      this.setTimeleft()
      return this.slides[this.currentSlide].img
    },
    componentIs() {
      return this.slides[this.currentSlide].comp
    },
    secondImage() {
      const index =
        this.currentSlide >= this.slides.length - 1
          ? this.slides.length - this.currentSlide - 1
          : this.currentSlide + 1
      return this.slides[index].img
    },
    progressBar() {
      return 100 - (this.timeLeft / this.autoSlideInterval) * 100
    }
  },
  methods: {
    setTimeleft() {
      this.timeLeft = this.autoSlideInterval
    },
    nextImage() {
      let nextImg = this.currentSlide + 1
      if (nextImg >= this.slides.length) {
        nextImg = 0
      }
      this.setCurrent(nextImg)
    },
    prevImage() {
      let prevImg = this.currentSlide - 1
      if (prevImg < 0) {
        prevImg = this.slides.length - 1
      }
      this.setCurrent(prevImg)
    },
    setCurrent(imageIndex) {
      this.currentSlide = imageIndex
    },
    startTimer(interval) {
      if (interval && interval > 0 && !this.stopSlider) {
        clearTimeout(this.autoSlideTimeout)
        this.autoSlideTimeout = setTimeout(() => {
          this.nextImage()
          this.startTimer(this.autoSlideInterval)
        }, interval)
      }
    },
    stopTimer() {
      clearTimeout(this.autoSlideTimeout)
      this.stopSlider = true
      clearInterval(this.timerInterval)
    },
    restartTimer() {
      this.stopSlider = false
      clearInterval(this.timerInterval)
      this.startCountdown()
      this.startTimer(this.timeLeft)
    },
    startCountdown() {
      if (!this.showProgressBar) return
      this.timerInterval = setInterval(() => {
        this.timeLeft -= this.countdownInterval
        if (this.timeLeft <= 0) {
          this.timeLeft = this.autoSlideInterval
        }
      }, this.countdownInterval)
    }
  },
  created() {
    if (
      this.startFrom &&
      this.startFrom >= 0 &&
      this.startFrom < this.slides.length
    ) {
      this.currentSlide = this.startFrom
    }
    if (
      this.autoSlideInterval &&
      this.autoSlideInterval > this.countdownInterval
    ) {
      this.startTimer(this.autoSlideInterval)
      this.timeLeft = this.autoSlideInterval
      this.startCountdown()
    }
  },
  mounted() {
    this._resizeListener = () => {
      this.windowWidth = Math.round(window.innerWidth)
    }
    this._resizeListener()
    window.addEventListener('resize', this._resizeListener)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._resizeListener)
  }
}
</script>

<template>
  <div
    class="carousel"
    @mouseover="stopTimer"
    @mouseleave="restartTimer"
    v-touch:swipe.left="prevImage"
    v-touch:swipe.right="nextImage"
  >
    <div
      class="carousel__progressbar"
      v-if="autoSlideInterval && showProgressBar"
    >
      <div :style="{ width: progressBar + '%' }"></div>
    </div>
    <div class="carousel__img">
      <img :src="currentImage" />
      <img :src="secondImage" v-if="windowWidth >= 600" />
      <div class="carousel__img-actions">
        <span @click="prevImage" class="prev">
          <!-- prettier-ignore -->
          <svg
            xmlns="http://www.w3.org/2000/svg"

            viewBox="0 0 24 24"
          >
            <path
              d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
            ></path>
          </svg>
          <!-- prettier-ignore -->
        </span>
        <span @click="nextImage" class="next">
          <!-- prettier-ignore -->
          <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style="transform: rotate(180deg)"
      >
        <path
          d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
        ></path>
      </svg>
          <!-- prettier-ignore -->
        </span>
      </div>
    </div>
    <div class="carousel__thumbs">
      <div
        v-for="(image, index) in slides"
        :key="image.id"
        class="carousel__thumbs-image"
        @click="setCurrent(index)"
      >
        <img
          :src="image.img"
          :style="{
            opacity: currentSlide === index ? '1' : null
          }"
        />
      </div>
    </div>
    <component class="carousel__cta" :is="componentIs"></component>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  position: relative;
  height: 100%;

  &__progressbar {
    display: block;
    width: 100%;
    height: 0.5rem;
    position: absolute;
    background-color: rgba(221, 221, 221, 0.25);
    z-index: 1;
    & > div {
      background-color: rgba(255, 255, 255, 0.52);
      height: 100%;
    }
  }
  &__img {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;

    img {
      display: block;
      width: 50%;
      margin: 0 auto;
      object-fit: cover;

      @media (max-width: 600px) {
        width: 100%;
      }
    }

    &-actions {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      margin-top: -2rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        cursor: pointer;
        fill: rgb(226, 223, 223);

        &:hover {
          fill: rgb(255, 255, 255);
        }

        svg {
          width: 6.5rem;
          height: 6.5rem;

          @media (max-width: 600px) {
            width: 3.5rem;
            height: 3.5rem;
          }
        }
      }
      .prev {
        margin-left: 1.5rem;
      }
      .next {
        margin-right: 1.5rem;
      }
    }
  }
  &__thumbs {
    display: flex;
    justify-content: center;
    flex-direction: row;
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;

    &-image {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.2rem;

      img {
        width: 100%;
        height: auto;
        transition: all 250ms;
        width: 5rem;
        height: 5rem;
        opacity: 0.3;
        box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.5);
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  &__cta {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    z-index: 99;
  }
}
</style>
