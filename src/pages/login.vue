<script>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  name: 'VLogin',
  components: {
    AuthProvider,
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const emailError = ref(false)
    const passwordError = ref(false)

    const router = useRouter()

    const logUser = async () => {
      try {
        emailError.value = false
        passwordError.value = false

        const result = await axios.post('/login', {
          email: email.value,
          password: password.value,
        })

        const id = result.data.id

        localStorage.setItem('token', result.data.token)
        email.value = ''
        password.value = ''

        setTimeout(() => {
          alert('Користувач успішно залогінився')
          router.push({ name: 'user', params: { id } })
        }, 100)
      } catch (err) {
        if (err.response.data.message.split(': ')[0] === 'Email') {
          emailError.value = true
        } else {
          passwordError.value = true
        }

        setTimeout(() => {
          alert(err.response.data.message)
          router.push({ path: 'dashboard' })
        }, 50)
      }
    }

    return {
      email,
      password,
      emailError,
      passwordError,
      logUser,
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
            <img src="./../assets/images/logo.png">
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Smart Home Analytics
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1 width">
          Welcome to Smart Home Analytics! 👋🏻
        </h5>
        <p class="mb-0 width">
          Please sign-in to your account and start enjoying managing your smart home app!
        </p>
      </VCardText>

      <VCardText>
              <div class="v-login__form">
                <form
                  id="form"
                  class="v-login__form-body"
                  @submit.prevent="formSubmit"
                >
                  <div class="v-login__form-body-item">
                    <input
                      id="formEmail"
                      v-model="email"
                      placeholder="Email"
                      type="text"
                      class="v-login__form-body-item-input"
                      name="email"
                      :class="{ email: emailError }"
                    >
                  </div>
                  <div class="v-login__form-body-item">
                    <input
                      id="formPassword"
                      v-model="password"
                      placeholder="Password"
                      type="password"
                      class="v-login__form-body-item-input"
                      name="password"
                      :class="{ password: passwordError }"
                    >
                  </div>
                </form>
              </div>
              <!-- password -->

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                  <VCheckbox
                    label="Remember me"
                  />
                </div>

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                  class="button"
                  @click="logUser"
                >
                  Login
                </VBtn>


              <!-- create account -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>New on our platform?</span>
                <RouterLink
                  class="text-primary ms-2"
                  to="/register"
                >
                  Create an account
                </RouterLink>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4">or</span>
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
.width {
  width: 350px;

}

.v-login {
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

  &__registration {
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

  .email {
    border: 2px solid red;
  }
  .password {
    border: 2px solid red;
  }
}
</style>
