<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="list-group">
          <div class="list-group-item list-group-item-action flex-column align-items-start" v-for="message in messages" :key="message._id">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Nachricht </h5>
            </div>
            <p class="mb-1">{{ message.payload }}</p> <small class="text-muted">{{ message.timestamp }}</small>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      messages: [
        {
          "_id": 1,
          "user": "1",
          "timestamp": "time",
          "payload": "testtesttesttest"
        },
        {
          "_id": 2,
          "user": "1",
          "timestamp": "time",
          "payload": "testtesttesttest"
        },
        {
          "_id": 3,
          "user": "1",
          "timestamp": "time",
          "payload": "testtesttesttest"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>