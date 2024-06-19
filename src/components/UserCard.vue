<script setup lang="ts">
import { reactive, ref } from 'vue';
import api from "@/services/api";

interface UserData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const userData = reactive<UserData>({
  email: localStorage.getItem('email') || '',
  newPassword: '',
  confirmPassword: ''
});

const showChangePassword = ref(false);

function toggleChangePassword() {
  showChangePassword.value = !showChangePassword.value;
}

const submitNewPassword = async () => {
  const uuid = localStorage.getItem('UUID');
  if (uuid) {
    if (userData.newPassword !== userData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const payload = { newPassword: userData.newPassword };
      const response = await api.changePassword(uuid, payload);
      //console.log('Password changed successfully:', response.data);
      alert('Password changed successfully, please log in again!');
      location.href = '/login';
    } catch (error) {
      console.error('Error changing password:');
    }
  } else {
    console.error('UUID not found in localStorage');
  }
}

function confirmDeleteUser() {
  if (confirm("Are you sure you want to delete your account? " +
      "This action cannot be undone.")) {
    deleteUser();
  }
}

const deleteUser = async () => {
  const uuid = localStorage.getItem('UUID');
  if (uuid) {
    try {
      const response = await api.deleteUser(uuid);
      //console.log('User deleted successfully:', response.data);
      alert('User deleted successfully');
      localStorage.clear();
      location.href = '/login';
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  } else {
    console.error('UUID not found in localStorage');
  }
}
</script>


<template>
  <div class="card shadow m-3 p-3">
    <div class="card-body">
      <!-- User Email Display -->
      <div class="mb-3">
        <label for="userEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="userEmail" v-model="userData.email" disabled>
      </div>

      <!-- Change Password Toggle -->
      <div>
        <button class="btn btn-secondary mb-3 custom-width-btn" @click="toggleChangePassword">
          {{ showChangePassword ? 'Hide' : 'Change Password' }}
        </button>
        <div v-if="showChangePassword">
          <form @submit.prevent="submitNewPassword">
            <div class="mb-3">
              <label for="newPassword" class="form-label">New Password</label>
              <input type="password" class="form-control" id="newPassword" v-model="userData.newPassword" required>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPassword" v-model="userData.confirmPassword" required>
            </div>
            <div class="text-center mb-3">
              <button type="submit" class="btn btn-primary custom-width-btn">Change Password</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Danger Zone -->
      <hr>
      <div class="text-center text-danger">
        <h5>Danger Zone</h5>
        <p>Deleting your account is permanent and cannot be undone.</p>
      </div>
      <div class="text-center mb-3">
        <button @click="confirmDeleteUser" class="btn btn-danger custom-width-btn">Delete User</button>
      </div>
    </div>
  </div>
</template>


<style>
.custom-width-btn {
  width: 100%;
}
</style>
