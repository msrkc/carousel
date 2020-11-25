<template>
  <div id="app">
    <carousel
      :start-from="0"
      :slides="slides"
      :auto-slide-interval="5000"
      show-progress-bar
    >
    </carousel>
  </div>
</template>

<script>
import Carousel from './components/Carousel.vue'
import Spring from '@/components/Dummy/Spring.vue'
import Summer from '@/components/Dummy/Summer.vue'

export default {
  name: 'App',
  components: {
    Carousel
  },
  data: () => ({
    slides: [
      {
        id: Math.random(),
        img: require('@/assets/1.jpg'),
        comp: Spring
      },
      {
        id: Math.random(),
        img: require('@/assets/2.jpg'),
        comp: Spring
      },
      {
        id: Math.random(),
        img: require('@/assets/3.jpg'),
        comp: Summer
      },
      {
        id: Math.random(),
        img: require('@/assets/4.jpg'),
        comp: Summer
      }
    ]
  })
}
</script>

<style lang="scss">
$mobile-breakpoint: 600px;

html {
  font-size: 62.5%; // 10px

  @media (max-width: 1200px) {
    font-size: 56.25%; // 9px
  }
  @media (max-width: 400px) {
    font-size: 50%; // 8px
  }
}
* {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  box-sizing: border-box;
}

h1 {
  font-size: 4rem;
  font-weight: bold;
}

p {
  font-size: 2rem;
  margin-top: 1rem;
}

.cta {
  @media (max-width: $mobile-breakpoint) {
    width: calc(100% - 10rem);
  }
}

.btns {
  display: flex;

  @media (max-width: $mobile-breakpoint) {
    flex-direction: column;
    margin-right: 0rem;
  }

  &__btn {
    padding: 1.5rem 6rem;
    border: 0.3rem solid #fff;
    color: #fff;
    background: transparent;
    font-size: 2.2rem;
    text-transform: uppercase;
    outline: none;
    margin-right: 3rem;
    margin-top: 2rem;

    @media (max-width: $mobile-breakpoint) {
      padding: 1rem 2rem;
      margin-right: 0;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
