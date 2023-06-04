<template>
    <nav class="navbar">
      <ul class="navbar-list">
        <li class="navbar-item"><a href="/DataDisplay" class="navbar-link">Data View</a></li>
        <li class="navbar-item"><a href="/View" class="navbar-link">data Json</a></li>
        <li class="navbar-item"><a href="/Form" class="navbar-link">Form</a></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    background-color: #E5F2FF;
    padding: 10px;
  }
  
  .navbar-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .navbar-item {
    margin-right: 10px;
  }
  
  .navbar-link {
    text-decoration: none;
    color: #007BFF;
    padding: 5px;
    border-radius: 5px;
  }
  
  .navbar-link:hover {
    background-color: #CCE5FF;
  }
  </style>
  
  