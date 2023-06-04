<template>
    <div>
      <table class="post-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: []
      };
    },
    mounted() {
      this.fetchPosts();
    },
    methods: {
      fetchPosts() {
        axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            this.posts = response.data;
          })
          .catch(error => {
            console.error('Error fetching posts:', error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .post-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .post-table th,
  .post-table td {
    padding: 10px;
    text-align: left;
  }
  
  .post-table th {
    background-color: #f1f1f1;
  }
  
  .post-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .post-table tbody tr:hover {
    background-color: #eaf4fd;
  }
  
  .post-table th,
  .post-table td {
    border-bottom: 1px solid #ccc;
  }
  
  </style>