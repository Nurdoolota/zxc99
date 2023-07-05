<template>
  <div class="courses">
    <h2 class="title">Личный кабинет</h2>
    <form-button class="courses__button" @click="logOut" label="Выход" />
    <form-button
      class="courses__button"
      @click="$router.push({ name: 'courses' })"
      label="Мои курсы"
    />
    <form-button
      class="courses__button"
      @click="$router.push({ name: 'createcourse' })"
      label="Создать курс"
    />
    <form-button
      class="courses__button"
      @click="$router.push({ name: 'editcourse' })"
      label="Изменить курс"
    />
  </div>
</template>

<script>
import FormButton from "@/components/FormButton.vue";

export default {
  components: {
    FormButton,
  },
};
</script>
<style scoped>
.courses {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.courses__title {
  margin: 0px 0px 10px 0px;
}
.courses__button {
  margin: 0px 0px 10px 0px;
}
</style>
