<script>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.png'
import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue'
import axios from 'axios'

export default {
  components: {
    AuthProvider
  },
  setup() {
    const email = ref("")
    const username = ref("")
    const password = ref("")
    const pibError = ref(false)
    const emailError = ref(false)
    const passwordError = ref(false)

    const router = useRouter()

    const pibTest = computed(() => /^[A-Z][a-z]*\s[A-Z][a-z]*$/.test(username.value))
    const emailTest = computed(() => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})$/.test(email.value))
    const passwordTest = computed(() => /^(?=.*[0-9])(?=.*[!@#$%^&*\\-\\_])[a-zA-Z0-9!@#$%^&*\\-\\_]{6,16}$/.test(password.value))

    const regUser = async () => {

      if (!pibError.value && !emailError.value && !passwordError.value && username.value !== "" && email.value !== "" && password.value !== "") {

        console.log("hello")
        try{
          const result = await axios.post("/register", {
            email: email.value,
            username: username.value,
            password: password.value,
          })

          setTimeout(() => {
            alert("Користувач успішно зареєстрований, можете увійти")

            router.push({ path: 'login' })
          }, 10)
        }catch(e){
          console.dir(e)
          alert(e.response.data.message)
          email.value = ""
          username.value = ""
          password.value = ""
          pibError.value = false
          emailError.value = false
          passwordError.value = false
        }
      }
    }

    const handleUsernameChange = () => {
      if (!pibTest.value || username.value.length > 30) {
        pibError.value = true
      } else {
        pibError.value = false
      }
      if (username.value === "") {
        pibError.value = false
      }
    }

    const handleEmailChange = () => {
      if (!emailTest.value) {
        emailError.value = true
      } else {
        emailError.value = false
      }
      if (email.value === "") {
        emailError.value = false
      }
    }

    const handlePasswordChange = () => {
      if (!passwordTest.value) {
        passwordError.value = true
      } else {
        passwordError.value = false
      }
      if (password.value === "") {
        passwordError.value = false
      }
    }

    watch(username, handleUsernameChange)
    watch(email, handleEmailChange)
    watch(password, handlePasswordChange)

    return {
      email,
      username,
      password,
      pibError,
      emailError,
      passwordError,
      regUser,
    }
  },
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img
              src="./../assets/images/logo.png"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Smart Home Analytics
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Аналітична подорож починається тут 🚀
        </h5>
        <p class="mb-0">
          Спростіть і насолоджуйтеся керуванням додатком розумного дому!
        </p>
      </VCardText>

      <VCardText>
        <div class="v-registration__form">
          <form
            id="form"
            class="v-registration__form-body"
            @submit.prevent="formSubmit"
          >
            <div class="v-registration__form-body-item">
              <input
                id="formName"
                v-model="username"
                placeholder="Ім'я"
                type="text"
                class="v-registration__form-body-item-input"
                name="name"
                :class="{ pib: pibError }"
              >
            </div>
            <div class="v-registration__form-body-item">
              <input
                id="formEmail"
                v-model="email"
                placeholder="Email"
                type="text"
                class="v-registration__form-body-item-input"
                name="email"
                :class="{ email: emailError }"
              >
            </div>
            <div class="v-registration__form-body-item">
              <input
                id="formPassword"
                v-model="password"
                placeholder="Пароль"
                type="password"
                class="v-registration__form-body-item-input"
                name="password"
                :class="{ password: passwordError }"
              >
            </div>
            <VBtn
              block
              type="submit"
              @click="regUser"
            >
              Зареєструватися
            </VBtn>
          </form>
        </div>

        <!-- login instead -->
        <VCol
          cols="12"
          class="text-center text-base"
        >
          <span>Вже є аккаунт?</span>
          <RouterLink
            class="text-primary ms-2"
            to="/login"
          >
            Натомість увійти
          </RouterLink>
        </VCol>

        <VCol
          cols="12"
          class="d-flex align-center"
        >
          <VDivider />
          <span class="mx-4">або</span>
          <VDivider />
        </VCol>

        <!-- auth providers -->
        <VCol
          cols="12"
          class="text-center"
        >
          <AuthProvider />
        </VCol>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
.v-registration {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  height: 100vh;
  font-size: 20px;
  color: rgb(198, 148, 0);

  &__title {
    font-size: 32px;
    color: rgb(198, 148, 0);
    font-weight: 700;
    font-family: Snell Roundhand, cursive;
  }

  &__form {
    width: 350px;
    &-body {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;

      &-item {
        width: 100%;
        border: 1px solid grey;
        border-radius: 7px;
        &-input {
          width: 100%;
          font-size: 16px;
          height: 50px;
          padding: 0 20px;
          border-radius: 5px;
          transition: all 0.5s ease 0s;
        }
        &-input:focus {
          box-shadow: 0 0 15px rgb(198, 148, 0);
        }
      }

      &-button {
        width: 100%;
        margin: 0 auto;
        min-height: 60px;
        font-size: 18px;
        border-radius: 20px;
        letter-spacing: 2px;
        text-transform: uppercase;
        background-color: rgb(198, 148, 0);
        color: #000000;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 5px 0 #161b13;
        transition: background-color 0.5s ease 0s;
        position: relative;
        top: 0;
      }

      &-button:hover {
        background-color: rgb(198, 148, 0);
      }
      &-button:active {
        top: 3px;
        box-shadow: 0 2px #161b13;
      }
    }
  }

  &__login {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &-isAccount {
    }

    &-btn {
      background-color: rgb(198, 148, 0);
      border: none;
      padding: 5px 15px;
      border-radius: 10px;
      box-shadow: 0 5px 0 #161b13;
      transition: background-color 0.5s ease 0s;
      position: relative;
      top: 0;
    }
    &-btn:active {
      top: 3px;
      box-shadow: 0 2px #161b13;
    }
  }
}
.pib {
  border: 2px solid red;
}
.phone {
  border: 2px solid red;
}
.id {
  border: 2px solid red;
}
.faculty {
  border: 2px solid red;
}
.email {
  border: 2px solid red;
}
.birthday {
  border: 2px solid red;
}

.password {
  border: 2px solid red;
}

input::placeholder {
  color: rgb(143, 143, 143);
}
input[type="date"]::before {
  color: #999;
  content: attr(placeholder);
  margin-right: 122px;
}
input[type="date"]:focus::before {
  content: "" !important;
  display: none;
}
</style>
