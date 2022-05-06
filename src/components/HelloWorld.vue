<template>
  <h1>hssini</h1>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-6 col-md-5 mb-2">
      <form class="form-container">
        <div class="form-group mt-1">
          <label class="mb-2" >Email address</label>
          <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group mt-1">
          <label class="mb-2" >Password</label>
          <input type="password" class="form-control" name="password" placeholder="Password">
        </div>
        <button name="submit"  type="submit" class="mt-2 btn btn-primary">Connecter</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
