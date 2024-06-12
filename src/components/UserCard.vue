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
          <form @submit.prevent="changePassword">
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
        <button @click="deleteUser" class="btn btn-danger custom-width-btn">Delete User</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

interface UserData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const userData = reactive<UserData>({
  email: localStorage.getItem('email') || '',  // Hier den Benutzer aus dem Local Storage laden
  newPassword: '',
  confirmPassword: ''
});

const showChangePassword = ref(false);

function toggleChangePassword() {
  showChangePassword.value = !showChangePassword.value;
}

function changePassword() {
  // Logik zum Ändern des Passworts
}

function deleteUser() {
  // Logik zum Löschen des Benutzers
}
</script>

<style>
.custom-width-btn {
  width: 100%;
}
</style>
