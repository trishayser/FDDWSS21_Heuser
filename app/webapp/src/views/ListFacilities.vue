<template>
  <div>
    <div class="py-1">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <a class="btn btn-primary" @click="saveSubs(facilities)">Save</a>
          </div>
        </div>
      </div>
    </div>
    <saved v-if="saved"></saved>
    <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item" v-for="facility in facilities" :class="{'active': facility.isSubscribed}" @click="facility.isSubscribed = !facility.isSubscribed" :key="facility._id">{{facility.facility_id}} // {{facility.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getFacilities, getFacilitiesWithSubs} from '../services/facility-service';
import {updateSubs} from "../services/user-service";
import Saved from "../components/Saved";

export default {
  name: "ListFacilities",
  components: {Saved},
  data() {
    return {
      facilities: [],
      subscribed: [],
      saved: false
    }
  },
  mounted() {
    const self = this;
    if (this.$root.mockAccount.username) {
      getFacilitiesWithSubs(this.$root.mockAccount.username).then(function (facilities) {
        self.facilities = facilities;
      });
    } else {
      getFacilities().then(function (facilities) {
        self.facilities = facilities;
      });
    }


  },
  methods: {
    saveSubs(facilities) {
      var subscriped = [];

      var subscriped_facs = facilities.filter(function (facility) {
        return facility.isSubscribed
      })

      for (let j=0; j<subscriped_facs.length; j++) {
          subscriped.push(subscriped_facs[j].facility_id);
          console.log(subscriped_facs[j].facility_id);
      }
      console.log(subscriped);

      this.saved = true;


      updateSubs(this.$root.mockAccount.username, subscriped);
    }
  }




}
</script>

<style scoped>

</style>