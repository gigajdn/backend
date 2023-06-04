<!-- app.vue -->

<template>
  <div id="app">
    <nav>
      <!-- Navbar content -->
      <Navbar />
    </nav>

    <main>
      <!-- Main content -->
      <router-view></router-view>
    </main>

    <footer>
   
    </footer>
  </div>
</template>

<script>
import Navbar from './views/Navbar.vue';

export default {
  data() {
    return {
      formData: {
        image: null,
        name: '',
        phone: ''
      }
    };
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      // You can perform any additional logic here, such as validating the file type or size
      this.formData.image = file;
    },
    submitForm() {
      // Handle form submission here
      // You can access the form data using this.formData
      // For example, you can send it to an API or perform any other actions
      console.log(this.formData);
    }
  },
  components: {
    Navbar,
}
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: #f5f5f5;
}
</style>
