<template>
  <div id="home">

      <div class="container text-center mt-3" v-if="!is_db_connected">
        <di class="alert alert-danger alert-dismissible fade show">
          {{is_db_connectedMsg}}
          <button class="bt-close" data-bs-dismiss="alert" aria-label="close">
          </button>
        </di>
      </div>
      <div class="container content-body mt-3" v-else>
        <div class="d-flex justify-content-around align-items-center">
          <button type="button" class="btn btn-danger"
                  @click="sign_out();">
            <FAIHoussain :icon="['fas', 'sign-out']"/></button>
          <p><strong>Reference :</strong> <span> {{refff}}</span></p>
          <button type="button" class="btn btn-primary"
                  @click="showAddrv(true)">
            <FAIHoussain :icon="['fas', 'plus']"/>
            Rendez-vous</button>
        </div>
        <hr class="bg-info">
        <div class="table-responsive">
        <table class="table">
          <thead>
          <tr class="text-center">
            <th scope="col">Date</th>
            <th scope="col">Horaire</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody  >
          <tr class="text-center" v-for="(rd , id) in table_rd" :key="id" >
            <td>{{rd.Date}}</td>
            <td>{{rd.Horaire.substring(0,5)}}</td>
<!--            <td>{{table_rd["Date"]}}</td>-->
<!--            <td>{{table_rd["Horaire"]}}</td>-->
            <td>
              <button class="btn btn-primary" aria-label="edit" @click="showUpdaterv(true); selectRv(rd);"><FAIHoussain :icon="['fas', 'edit']"/></button> &nbsp;
              <button class="btn btn-danger" aria-label="trash" @click="showDeleterd(true); selectRv(rd);"><FAIHoussain :icon="['fas', 'trash']"/></button>
            </td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
      <!-- start modal ajouter  -->
      <div id="add" v-if="showAddrvModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img alt="Vue logo" src="../assets/logo_11.png" height="60" width="80">
              <button aria-hidden="true" @click="showAddrv(false)">
                <FAIHoussain :icon="['fas','times']"/>
              </button>
            </div>
            <div class="modal-body pr-4 pl-4 pt-2 pb-2">
              <form  name="inscription"  novalidate method="POST" @click.self.prevent>
                <div class="form-group d-flex flex-column align-items-start mt-1">
                  <label >Date*</label>
                  <input type="date" id="Date"
                         class="form-control" name="Date"
                         placeholder="Date"
                         v-model.trim="new_rv.Date" required >
                </div>
                <div class="form-group d-flex flex-column align-items-start mt-1 ">
                  <label  for="Nom">Horaire *</label>
                  <select class="form-select" aria-label="Default select example" v-model.trim="new_rv.Horaire" required>
                    <option selected disabled>choisir  votre temps disponible </option>
                    <option value="09:00:00">09:00</option>
                    <option value="09:30:00">09:30</option>
                    <option value="10:15:00">10:15</option>
                    <option value="10:45:00">10:45</option>
                    <option value="11:15:00">11:15</option>
                    <option value="14:00:00">14:00</option>
                    <option value="14:30:00">14:30</option>
                    <option value="15:00:00">15:00</option>
                    <option value="15:30:00">15:30</option>
                  </select>
                </div>
                <div class="d-flex align-items-center justify-content-evenly">
                  <button name="submit"
                          type="submit" class="mt-2 btn btn-primary" @click="Add_RV()">
                    Ajouter R_V</button>
                  <button name="submit" type="submit" class="mt-2 btn btn-primary" @click="showAddrv(false)">
                    Non</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal ajouter  -->
      <!-- start modal update  -->
      <div id="add" v-if="showUpdatervModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img alt="Vue logo" src="../assets/logo_11.png" height="60" width="80">
              <button aria-hidden="true" @click="showUpdaterv(false)">
                <FAIHoussain :icon="['fas','times']"/>
              </button>
            </div>
            <div class="modal-body pr-4 pl-4 pt-2 pb-2">
              <form name="inscription"  novalidate method="POST" @click.stop data-netlify="true" data-netlify-honeypot="bot-field">
                <div class="form-group d-flex flex-column align-items-start mt-1">
                  <label >Date*</label>
                  <input type="date" id="Date"
                         class="form-control" name="Date"
                         placeholder="Date"
                         required v-model.trim="current_rv.Date">
                </div>
                <div class="form-group d-flex flex-column align-items-start mt-1 ">
                  <label  for="Nom">Horaire *</label>
                  <select class="form-select" aria-label="Default select example" v-model.trim="current_rv.Horaire" required>
                    <option selected disabled>choisir  votre temps disponible </option>
                    <option value="09:00:00">09:00</option>
                    <option value="09:30:00">09:30</option>
                    <option value="10:15:00">10:15</option>
                    <option value="10:45:00">10:45</option>
                    <option value="11:15:00">11:15</option>
                    <option value="14:00:00">14:00</option>
                    <option value="14:30:00">14:30</option>
                    <option value="15:00:00">15:00</option>
                    <option value="15:30:00">15:30</option>
                  </select>
                </div>
                <div class="d-flex align-items-center flex-column">
                  <button name="submit"
                          type="submit" class="mt-2 btn btn-primary" @click="Update_RV()">
                    Modefier R_V</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal update  -->
      <!-- start modal delete  -->
      <div id="delete" v-if="showDeleterdModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <img alt="Vue logo" src="../assets/logo_11.png" height="60" width="80">
              <button aria-hidden="true" @click="showDeleterd(false)">
                <FAIHoussain :icon="['fas','times']"/>
              </button>
            </div>
            <div class="modal-body p-4">
              <form  name="inscription"  novalidate method="POST" @click.prevent>
                <div class="form-group d-flex flex-column align-items-center justify-content-center mt-1">
                  <p> Vous pouvez suupprimer </p>
                </div>
                <div class="d-flex align-items-center justify-content-evenly">
                  <button name="submit" type="submit" class="mt-2 btn btn-primary"
                          @click="Delete_rv()">
                    oui</button>
                  <button name="submit" type="submit" class="mt-2 btn btn-primary" @click="showDeleterd(false)">
                    Non</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal delete  -->
  </div>


</template>
<script>
import axios from "axios";
export default {
  name: `Dashboard`
  ,
  data() {
    return {
      errMsg: "",
      successMsg:"",
      is_db_connected:"",
      is_db_connectedMsg:"",
      showDeleterdModal :false,
      showAddrvModal :false,
      showUpdatervModal :false,
      refff:'',
      table_rd:[],
      new_rv:{
        Date: "",
        Horaire: "",
        Reference:"",
      },
      current_rv:{},//current_rv ==>currentstudent howa nit
      MAX_TIMEOUT :60,
      idleSecondsTimer:0,
      idleSecondsCounter :0

    }
  }

  ,
  mounted () {
    document.onclick = ()=> {
      this.idleSecondsCounter = 0;
    };
    document.onmousemove = ()=> {
      this.idleSecondsCounter = 0;
    };
    document.onkeypress = ()=> {
      this.idleSecondsCounter = 0;
    };
    document.onmousedown = ()=> {
      this.idleSecondsCounter = 0;
    };
    document.onload = ()=> {
      this.idleSecondsCounter = 0;
    };
    document.ontouchstart = ()=> {
      this.idleSecondsCounter = 0;
    };
    this.idleSecondsTimer = window.setInterval(this.CheckIdleTime, 1000);
    //
    this.getRvData();
    this.dbconnect();
    this.refff=JSON.parse(localStorage.getItem('Reference'));
    if(!this.refff){
      this.$router.push({name:'Home'});
    }


  }
  ,
  methods: {
    CheckIdleTime() {
      this.idleSecondsCounter++;
      // var timeout = this.MAX_TIMEOUT - this.idleSecondsCounter;
      // // console.log(timeout);
      if (this.idleSecondsCounter >= this.MAX_TIMEOUT) {
        window.clearInterval(this.idleSecondsTimer);
        localStorage.removeItem("Reference");
        this.$router.push({name:'Home'});
        // alert("nta matatdir walo daba 3ad  tsajil dokhol ");
      }
    },
    //
    async Delete_rv(){
      let formData_rv=this.toFormData(this.current_rv);
      this.showDeleterd(false);
      let res=await axios.post(`http://localhost/backend_brief_6/Delete-rv`,formData_rv
      );
      const resData=res.data;
      if (res.status == 200){
        if (resData.error){
          console.log(resData.message);
        }else {
          let newtable_rd_Data = this.table_rd.filter((ele)=> ele.id !=this.current_rv.id);
          this.current_rv={};
          this.table_rd=newtable_rd_Data;
          // this.getRvData();
        }
      }
    },
    async Update_RV(){
      let formData_rv=this.toFormData(this.current_rv);
      this.showUpdaterv(false);
      let res=await axios.post(`http://localhost/backend_brief_6/Update-rv`,formData_rv
      );
      const resData=res.data;
      if (res.status == 200){
        if (resData.error){
          console.log(resData.message);
        }else {
          this.current_rv={};
          this.getRvData();
          // this.current_rv.$reset();
        }
      }
    },
    async Add_RV(){
      this.new_rv.Reference=this.refff;
      let formData_rv=this.toFormData(this.new_rv);
      this.showAddrv(false);
      let res=await axios.post(`http://localhost/backend_brief_6/Add-rv`,formData_rv
      );
      const resData=res.data;
      if (res.status == 200){
        if (resData.error){
          console.log(resData.message);
        }else {
          this.new_rv={
                Date: "",
                Horaire: "",
                Reference:"",
          };
          this.getRvData();
        }
      }
    },
    toFormData(obj){
      var fd=new FormData();
      delete obj["0"];
      delete obj["1"];
      delete obj["2"];
      delete obj["3"];
      for (var i in obj) {
        fd.append(i, obj[i]);
      }
      return fd;
    }
    ,
    async sign_out(){
      let res=await axios.get(`http://localhost/backend_brief_6/Logout-u`);
      const resData=res.data;
      if (res.status ==200){
        if (resData.error){
          console.log(resData.connction_msg);
        }else {
          localStorage.removeItem("Reference");
          this.$router.push({name:'Home'});
        }
      }
    }
    ,
    async getRvData(){
  let res=await axios.get(`http://localhost/backend_brief_6/Read-rv`);
  const resData=res.data;
  if (res.status ==200){
    if (resData.error){
      console.log(resData.connction_msg);
    }else {
      this.table_rd = resData.r_v.filter((ele)=> ele.Reference == this.refff);
      // this.table_rd=resData.r_v;
    }
  }
  },
    async dbconnect(){
      let res=await axios.get(`http://localhost/backend_brief_6/`);
      const resData=res.data;
      this.is_db_connected=resData.is_db_connected;
      this.is_db_connectedMsg=resData.connction_msg;
    },
    showDeleterd(val){
      this.showDeleterdModal=val;
    },
    showAddrv(val){
      this.showAddrvModal=val;
    },
    showUpdaterv(val){
      this.showUpdatervModal=val;
    },
    selectRv(r_v){
    this.current_rv=r_v;
    }
  },
}
</script>
<style scoped>
#home{
  position: fixed;
  z-index: 2 !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 235, 235, 0.5);
}
#add{
  position: fixed;
  z-index: 2 !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 /47%);
}
#delete{
  position: fixed;
  z-index: 2 !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 /47%);
}
#update{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 /47%);
}
.content-body{
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow:1px 2px 2px 1px #323234;
}
.modal-dialog{
  pointer-events: auto !important;
}
p{
  /*margin: revert !important;*/
  margin: 18px !important;}
.btn{
  font-size: small !important;
}
tr td .btn{
  font-size: 8px !important;
}
p > strong , p>span{
  font-family: cursive !important;
  font-size: small!important;}
/*==================================page reservation de admin======================================*/

.table-responsive {
  overflow: auto !important;
  height: 400px !important;
}
.table-responsive thead th {
  position: sticky !important;
  top: -1px !important;
  z-index: 1 !important;
  background: #f8f9fa !important;
}
tbody, td, tfoot, th, thead, tr  {height: 54px !important;}
.table>tbody {
  vertical-align: middle !important;
}
</style>