<template>
  <div class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-group">
            <li class="list-group-item" v-for="facility in facilities" :key="facility._id" >{{facility.facility_id}} // {{facility.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFacilities} from '../services/facility-service';

export default {
  name: "ListFacilities",

  data() {
    return {
      facilities: []
    }
  },
  mounted() {
    const self = this;
    getFacilities().then(function (facilities) {
      self.facilities = facilities;
      console.log(facilities);
    });

  }

}
</script>

<style scoped>

</style>