<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const accountData = {
  avatarImg: avatar1,
  name: 'Anna Kurylo',
  email: 'anna.k.2003.g@gmail.com',
}

const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Деталі облікового запису">

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.name"
                  placeholder="Anna Kurylo"
                  label="Ім'я"
                />
              </VCol>


              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.email"
                  label="E-mail"
                  placeholder="anna.k.2003.g@gmail.com"
                  type="email"
                />
              </VCol>


              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn>Зберегти зміни</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Скинути
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Account -->
      <VCard title="Деактивувати обліковий запис">
        <VCardText>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              label="Я підтверджую деактивацію облікового запису"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
          >
            Деактивувати обліковий запис
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
