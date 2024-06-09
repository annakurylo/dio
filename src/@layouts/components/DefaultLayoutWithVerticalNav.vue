<script setup>
import {useTheme} from 'vuetify'
import VerticalNavSectionTitle from '@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@layouts/components/NavbarThemeSwitcher.vue'


</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu"/>
        </IconBtn>

        <!-- 👉 Search -->
        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
        >
          <!-- 👉 Search Trigger button -->
          <IconBtn>
            <VIcon icon="bx-search"/>
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Search</span>
          </span>
        </div>

        <VSpacer/>

        <NavbarThemeSwitcher class="me-2"/>

      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Вологість',
          icon: 'mdi-waves-arrow-up',
          to: '/humidity',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Температура',
          icon: 'mdi-thermometer',
          to: '/temperature',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Іонізація',
          icon: 'mdi-air-filter',
          to: '/ionization',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Co2',
          icon: 'mdi-molecule-co2',
          to: '/co2',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Якість води',
          icon: 'mdi-water-circle',
          to: '/water',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Пил',
          icon: 'mdi-weather-dust',
          to: '/dust',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Налаштування',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />

      <!-- 👉 Pages -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Сторінки',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Логін',
          icon: 'bx-log-in',
          to: '/login',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Реєстрація',
          icon: 'bx-user-plus',
          to: '/register',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Помилка',
          icon: 'bx-info-circle',
          to: '/no-existence',
        }"
      />
    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 illustration -->
    </template>

    <!-- 👉 Pages -->
    <slot/>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer/>
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
