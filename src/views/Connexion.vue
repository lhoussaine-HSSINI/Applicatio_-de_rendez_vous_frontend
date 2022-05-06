<template>
  <form method="post" action="#" @click.stop>
    <div class="form-group d-flex flex-column align-items-start mt-1">
      <label >Date de naissance *</label>
      <input type="date" name="hhh" id="hh">
    </div>
  </form>
  {{$route.query.ru}}
  <router-view/>
</template>
<script>
export default {
  name: `connexion`

}
</script>
<style scoped>
</style>