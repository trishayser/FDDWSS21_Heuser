<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="nav">
            <li class="nav-item">
              <a href="#" class="nav-link active">Nav item</a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link active">Nav item</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Drop</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>

</style>