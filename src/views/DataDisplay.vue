<template>
    <div class="form-data-display">
      <h2>Form Data</h2>
      <table v-if="formData.length" class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cellphone Number</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in formData" :key="index">
            <td>{{ data.name }}</td>
            <td>{{ data.phone }}</td>
            <td>
              <img :src="`http://localhost:3000/${data.image}`" alt="Form Image" class="form-image">
            </td>
            <td>
              <button @click="editFormData(data)">Edit</button>
              <button @click="deleteFormData(data)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No form data available.</p>

          <!-- Edit Form Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <h3>Edit Form Data</h3>
        <form @submit.prevent="submitEditedForm">
          <label for="edit-name">Name:</label>
          <input type="text" id="edit-name" v-model="editingFormData.name" required>
  
          <label for="edit-phone">Cellphone Number:</label>
          <input type="tel" id="edit-phone" v-model="editingFormData.phone" required>
  
          <button type="submit">Save</button>
        </form>
        <button @click="showEditModal = false">Cancel</button>
      </div>
    </div>
    </div>
  </template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: [],
      showEditModal: false,
      editingFormData: {},
    };
  },
  mounted() {
    this.fetchFormData();
  },
  methods: {
    fetchFormData() {
      axios
        .get("http://localhost:3000/api/products")
        .then((response) => {
          this.formData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching form data:", error);
        });
    },
    editFormData(data) {
      // Assign the data to a reactive property
      this.editingFormData = { ...data };
      this.showEditModal = true;
    },

    // Method to handle form submission after editing
    submitEditedForm() {
      axios
        .put(`http://localhost:3000/api/products/${this.editingFormData.id}`, this.editingFormData)
        .then((response) => {
          // Handle successful edit
          console.log('Form data edited:', this.editingFormData);
          // Optionally, you can refresh the form data by calling a method to fetch the updated data
          this.fetchFormData();
          // Close the edit modal or navigate back to the data display page
          this.showEditModal = false;
        })
        .catch((error) => {
          // Handle edit error
          console.error('Error editing form data:', error);
        });
    },

    deleteFormData(data) {
      // Send a delete request to the server
      axios
        .delete(`http://localhost:3000/api/products/${data.id}`)
        .then((response) => {
          // Handle successful delete
          console.log("Form data deleted:", data);
          // Optionally, you can refresh the form data by calling a method to fetch the updated data
        })
        .catch((error) => {
          // Handle delete error
          console.error("Error deleting form data:", error);
        });
    },
  },
};
</script>

<style scoped>
.form-data-display {
  margin-top: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.data-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.data-table td img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.data-table td button {
  margin-right: 5px;
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
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content form {
  margin-bottom: 10px;
}

.modal-content form label {
  display: block;
  margin-bottom: 5px;
}

.modal-content form input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.modal-content form button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content form button[type="submit"] {
  background-color: #28a745;
}

.modal-content button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

