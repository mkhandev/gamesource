import { ref } from "vue";
import * as yup from "yup";

import { useUserStore } from "@/stores/user";

export const updateProfile = () => {
  const userStore = useUserStore();
  const firstname = ref(userStore.user.firstname);
  const lastname = ref(userStore.user.lastname);

  console.log(userStore.firstname);

  const loading = ref(false);
  const formSchema = yup.object({
    firstname: yup
      .string()
      .required("firstname is required")
      .max(100, "firstname is too long"),
    lastname: yup
      .string()
      .required("firstname is required")
      .max(100, "firstname is too long"),
  });

  function onSubmit(values, { resetForm }) {
    loading.value = true;
    userStore.updateProfile(values).finally(() => {
      loading.value = false;
    });
  }

  return { loading, formSchema, onSubmit, firstname, lastname };
};
