<template>
    <div>
      <form @submit.prevent="submitForm" class="data-form">
        <label for="image" class="form-label">Image:</label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" required>
  
        <label for="name" class="form-label">Name:</label>
        <input type="text" id="name" v-model="formData.name" required>
  
        <label for="phone" class="form-label">Cellphone Number:</label>
        <input type="tel" id="phone" v-model="formData.phone" required>
  
        <button type="submit" class="submit-button">Submit</button>
      </form>
  
      <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Form submitted successfully!</h3>
        <button @click="closeModal">Close</button>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          name: '',
          phone: 0,
          image: null
        },
        showModal: false,
      };
    },
    methods: {
      handleImageChange(event) {
        this.formData.image = event.target.files[0];
      },
      submitForm() {
              // Show the toast
              this.showModal = true;


        const formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('phone', this.formData.phone);
        formData.append('image', this.formData.image);
  
        axios
          .post('http://localhost:3000/api/products', formData)
          .then(() => {
            // Form submitted successfully
            console.log('Form submitted');
            // Optionally, you can reset the form after successful submission
            this.resetForm();
          })
          .catch(error => {
            // Handle form submission error
            console.error('Error submitting form:', error);
          });
      },
      resetForm() {
        this.formData.name = '';
        this.formData.phone = '';
        this.formData.image = null;
        // Reset the file input element
        const fileInput = this.$refs.fileInput;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      
    closeModal() {
      this.showModal = false;
    },
    }
  };
  </script>

  <style scoped>
  .data-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .form-label {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  input[type="file"],
  input[type="text"],
  input[type="tel"] {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
  }
  
  .submit-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
  
  </style>