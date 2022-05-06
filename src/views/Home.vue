<template>
  <div  id="home" >
    <div class="modal-dialog modal-diali">
        <div class="modal-body d-flex flex-column align-items-center content-body">
          <img alt="Vue logo" src="../assets/logo_11.png" height="60" width="80">

          <button type="button" class="btn btn-primary mt-3 mb-3" @click="showInscrire(true)">
            Nouvel utilisateur</button>
            <button type="button" class="btn btn-primary" @click="showConnexion(true)">
              Rendez-vous</button>
        </div>
      </div>
  </div>
  <!-- start modal inscrire  -->
  <div id="Inscrire" v-if="showInscrireModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img alt="Vue logo" src="../assets/logo_11.png" height="60" width="80">
          <button aria-hidden="true" @click="showInscrire(false)">
            <FAIHoussain :icon="['fas','times']"/>
          </button>
        </div>
        <div class="modal-body pr-4 pl-4 pt-2 pb-2" >
          <div class="form-group d-flex flex-column align-items-start mt-1 " :class="{'form-group-error':v$.newuser.Nom.$error}">
            <label  for="Nom">Nom *</label>
            <input type="text" id="Nom" v-model="newuser.Nom"
                   class="form-control" name="Nom"
                   placeholder="Nom" required>
            <span class="error-feedback" v-if="v$.newuser.Nom.$error">
                     {{v$.newuser.Nom.$errors[0].$message}}
                   </span>
          </div>
          <div class="form-group d-flex flex-column align-items-start mt-1"
               :class="{'form-group-error':v$.newuser.Prénom.$error}">
            <label  for="Prénom">Prénom *</label>
            <input type="text" id="Prénom" v-model="newuser.Prénom"
                   class="form-control" name="Prénom"
                   placeholder="Prénom" required>
            <span class="error-feedback" v-if="v$.newuser.Prénom.$error">
                     {{v$.newuser.Prénom.$errors[0].$message}}
                   </span>
          </div>
          <div class="form-group d-flex flex-column align-items-start mt-1"
               :class="{'form-group-error':v$.newuser.Date_de_naissance.$error}">
            <label >Date de naissance *</label>
            <input type="date" id="Date_de_naissance" v-model="newuser.Date_de_naissance"
                   class="form-control" name="Date_de_naissance"
                   placeholder="DD/MM/YYYY" required>
            <span class="error-feedback" v-if="v$.newuser.Date_de_naissance.$error">
                     {{v$.newuser.Date_de_naissance.$errors[0].$message}}
                   </span>
          </div>
          <div class="d-flex align-items-center flex-column">
            <button name="submit" @click="ajouter_user()"
                    type="submit" class="mt-2 btn btn-primary">
              S'inscrire</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal inscrire  -->
  <!-- start modal Connexion  -->
  <div id="Connexion" v-if="showConnexionModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img alt="Vue logo" src="../assets/logo_11.png" height="60" width="80">
          <button aria-hidden="true" @click="showConnexion(false)">
            <FAIHoussain :icon="['fas','times']"/>
          </button>
        </div>
        <div class="modal-body p-4">
          <form  name="inscription"  novalidate method="POST" @click.prevent>
            <div class="form-group d-flex flex-column align-items-center justify-content-center mt-1" :class="{'form-group-error':v$.R_U.$error}">
              <label  for="Reference">Reference *</label>
              <input type="text" id="Reference"  class="form-control"
                     name="Reference"  placeholder="Reference" v-model="R_U" required>
              <span class="error-feedback" v-if="v$.R_U.$error">
                     {{v$.R_U.$errors[0].$message}}
                   </span>
            </div>
            <div class="d-flex align-items-center flex-column">
              <button name="submit" type="submit" class="mt-2 btn btn-primary" @click="Login()">
                Connexion</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal Connexion  -->
  <!-- start modal delete  -->
  <div id="Reference_modal" v-if="showReferenceModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img alt="Vue logo" src="../assets/logo_11.png" height="60" width="80">
          <button aria-hidden="true" @click="showReference(false)">
            <FAIHoussain :icon="['fas','times']"/>
          </button>
        </div>
        <div class="modal-body p-3 d-flex align-items-center flex-column">
          <strong>{{successMsg}}</strong>
          <p class="Reference_user "><strong>Reference :</strong> <span> {{get_R_U}}</span></p>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal delete  -->
  <router-view></router-view>
</template>
<script>
import useVuelidate from "@vuelidate/core"
import { required , minLength} from "@vuelidate/validators"
import axios from "axios";
export default {
name: `Home`,
data (){
  return {
    v$:useVuelidate(),
    errMsg: "",
    successMsg:"",
    connect_successMsg:"",
    is_db_connected:"",
    is_db_connectedMsg:"",
    showInscrireModal :false,
    showConnexionModal :false,
    showReferenceModal :false,
    newuser:{
      Nom:"",
      Prénom:"",
      Date_de_naissance:"",
    },
    R_U:"",
    get_R_U: "",
  }
},
  validations(){
    return{
      R_U:{required},
      newuser:{
        Nom: {required, minLength:minLength(5)},
        Prénom:{required, minLength:minLength(5)},
        Date_de_naissance:{required, minLength:minLength(8)},
      }
    }
  }
  ,
mounted(){
    let refff=localStorage.getItem("Reference");
    if(refff){
      this.$router.push({name:'Dashboard'});
    }
},
  methods: {
    showReference(val){
      this.showReferenceModal=val;
    },
    showInscrire(val){
      this.showInscrireModal=val;
    },
    showConnexion(val){
      this.showConnexionModal=val;
    },
    async ajouter_user(){
      this.v$.newuser.$validate();
      if(!this.v$.newuser.$error){
        let formData_rv=this.toFormData(this.newuser);
        this.showInscrire(false);
        let res=await axios.post(`http://localhost/backend_brief_6/Inscription-u`,formData_rv
        );
        const resData=res.data;
        if (res.status == 200){
          if (resData.error){
            this.errMsg=resData.message;
          }else {
            if(resData.user_daz){
              this.get_R_U=resData.RF_user;
              this.successMsg=resData.message_user;
              this.newuser={
                Nom:"",
                Prénom:"",
                Date_de_naissance:"",
              };
              this.showReference(true);
              this.v$.newuser.$reset();
              // localStorage.setItem("Reference", JSON.stringify(this.get_R_U));
              // console.log(this.get_R_U);
              // console.log(localStorage.getItem("Reference"));
              // console.log(resData.message_user);
              // this.$router.push({name:'Dashboard'});
              // this.$router.push({name:'Connexion',query:{ru:this.get_R_U}});
            }else{
              this.get_R_U=resData.RF_user;
              this.successMsg=resData.message_user;
              this.newuser={
                Nom:"",
                Prénom:"",
                Date_de_naissance:"",
              };
              this.showReference(true);
              this.v$.newuser.$reset();
              // localStorage.setItem("Reference", JSON.stringify(this.get_R_U));
              // console.log(this.get_R_U);
              // console.log(localStorage.getItem("Reference"));
              // console.log(resData.message_user);
              // this.$router.push({name:'Dashboard'});
              // this.$router.push({name:'Connexion',query:{ru:this.get_R_U}});
            }
          }
        }
      }else{
        console.log('add new user: not validate successfully');
        // this.showInscrire(true);
        }
    },
  toFormData(obj){
    var fd=new FormData();
    // delete obj["0"];
    // delete obj["1"];
    // delete obj["2"];
    // delete obj["3"];
    for (var i in obj) {
      fd.append(i, obj[i]);
    }
    return fd;
  }
    ,
    async Login(){
      this.v$.R_U.$validate();
      if(!this.v$.R_U.$error){
        let formData_rv=this.toFormData({R_U:this.R_U});
        this.showConnexion(false);
        let res=await axios.post(`http://localhost/backend_brief_6/Login-u`,formData_rv
        );
        const resData=res.data;
        if (res.status == 200)
        {
          if (resData.error)
          {
            this.errMsg=resData.message;
          }else
          {
            if (resData.user_connecter)
            {
              this.connect_successMsg=resData.message_user;
              localStorage.setItem("Reference", JSON.stringify(resData.RF_user));
              // console.log(this.R_U);
              console.log(localStorage.getItem("Reference"));
              console.log(resData.message_user);
              this.R_U="";
              this.v$.R_U.$reset();
              this.$router.push({name:'Dashboard'});
              console.log("kolxi shih");
            }else {
              console.log("kayn ghalat");
              console.log(resData.message_user);
              this.connect_successMsg=resData.message_user;
              this.R_U="";
              this.v$.R_U.$reset();
            }
          }
        }
      }else{
        console.log('login user: not validate successfully');
      }
    }
  },
};
</script>

<style scoped>
#Reference_modal{
  position: fixed;
  /*z-index:  !important;*/
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 /47%);
}
.Reference_user strong{
  font-family: cursive !important;
  font-size: larger !important;
}
.Reference_user span{
  font-size: x-large !important;
  font-family: cursive !important;
}
#Inscrire{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 /47%);
}
#Connexion{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 /47%);
}
#ff{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0 0 0 /50%);
}
#home{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(246, 235, 235, 0.5);
}
.modal-header {
  padding: 0rem 1rem !important;
}
.form-group-error{
  color: red;
}
.form-group-error input{
  border-color: red;
}
.content-body{
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow:1px 2px 2px 1px #323234;
}
.modal-dialog{
  pointer-events: auto !important;
}
.modal-diali{
  margin-top: 10%;
}
</style>