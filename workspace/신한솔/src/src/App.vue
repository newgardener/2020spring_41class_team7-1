<template>
  <v-app>
    <v-content v-bind:style="{ background: '#8C9EFF'}">
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    
  },
  methods: {
    
  },
  data: () => ({
  })
}
</script>