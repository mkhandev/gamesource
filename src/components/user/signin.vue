<script setup>
import { Field, Form } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";

import { useToast } from "vue-toast-notification";
const $toast = useToast();
//$toast.success("Weloce !!!");

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const type = ref(false);
const formSchema = yup.object({
  email: yup
    .string()
    .required("The email is required")
    .email("Not a valid email"),
  password: yup.string().required("The password is required"),
});

function onSubmit(values, { resetForm }) {
  if (type.value) {
    userStore.register(values);
  } else {
    userStore.signIn(values);
  }
}

//subscribe to error
//userStore.$onAction((name, after, onError) => {
userStore.$onAction(({ name, after, onError }) => {
  if (name === "register" || name === "signIn") {
    after(() => {
      $toast.success("Weloce !!!");
    });

    onError((error) => {
      $toast.error(error.message);
    });
  }
});
</script>

<template>
  <div class="signin_container">
    <div class="text-center" v-show="userStore.loading">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <Form
      @submit="onSubmit"
      :validation-schema="formSchema"
      v-show="!userStore.loading"
    >
      <h1 v-text="!type ? 'Sign in' : 'Register'"></h1>
      <div class="form-group">
        <Field
          name="email"
          :value="'mahmudkhan.sumon@gmail.com'"
          v-slot="{ field, errors, errorMessage }"
        >
          <input
            type="text"
            class="form-control"
            placeholder="Enter your email"
            v-bind="field"
            :class="{ 'is-invalid': errors.length != 0 }"
          />

          <div class="input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="form-group">
        <Field
          name="password"
          :value="'testing123'"
          v-slot="{ field, errors, errorMessage }"
        >
          <input
            type="password"
            class="form-control"
            placeholder="Enter your password"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input_alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <button
        type="submit"
        class="btn mb-3 btn-block"
        v-text="!type ? 'Sign in' : 'Register'"
      ></button>

      <hr />
      <div class="form_swap" @click="type = !type">
        <span v-if="type"> I want to <b>Sign in</b> </span>
        <span v-else> I want to <b>Register</b> </span>
      </div>
    </Form>
  </div>
</template>

<style></style>
