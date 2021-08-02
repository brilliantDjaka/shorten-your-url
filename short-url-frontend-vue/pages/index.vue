<template>
  <div>
    <p>By brian rofiq</p>
    <b-form @submit="onSubmit">
      <div class="center">
        <h3>Shorten Your Url !</h3>
        <div style="display: flex; align-items: center">
          <p style="padding-right: 10px">Input url</p>
          <input
            v-model="form.url"
            type="text"
            required
            placeholder="http://google.com"
          />
        </div>
        <div id="main-content">
          <p style="padding-right: 10px">Shorten to https://lkics0.deta.dev/</p>
          <input v-model="form.key" required type="text" placeholder="keys" />
          <b-button style="margin-left: 10px" @click="generateRandomId"
            >random</b-button
          >
        </div>
        <b-button variant="success" type="submit">Shorten !</b-button>
        <b-alert v-if="status == 'shortening'" show style="margin-top: 10px;"
        >shortening ...</b-alert>
        <b-alert v-if="status == 'shortened'" show variant="success" style="margin-top: 10px;"
        >success shortened to  <a :href="successUrl">{{successUrl}}</a> </b-alert>
        <b-alert v-if="status == 'error'" show variant="danger" style="margin-top: 10px;"
        >error  {{error}} </b-alert>
      </div>
    </b-form> 
  </div>
</template>


<script>
export default {
  data() {
    return {
      status:'',
      form: {
        url: '',
        key: '',
      },
      successUrl:'',
      error:''
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if(!this.isValidUrl(this.form.url))
        alert(`${this.form.url} seems not valid URL`)
      
      if(!this.isSafeUrl(this.form.key))
        alert(`${this.form.key} contain unsafe character, please only use word,num and -`)
      
      this.status = 'shortening'
      this.shorten();
    },
    generateRandomId() {
      this.form.key = Math.random().toString(36).substring(7)
    },
    isValidUrl(url) {
      try {
        url = new URL(url)
      } catch (_) {
        return false
      }

      return url.protocol === 'http:' || url.protocol === 'https:'
    },
    isSafeUrl(url) {
      return url.match(/^[a-zA-Z0-9_-]*$/)
    },
    async shorten() {
      const successUrl = await this.$axios.$post('https://sfj4ya.deta.dev/url',{
        id:this.form.key,
        source:this.form.url
      }).catch((err)=>{
        this.status = 'error';
        this.error = err;
      });
      if(successUrl){
        this.successUrl = successUrl;
        this.status = 'shortened'
      }
    }
  },
}
</script>

<style>
.center {
  display: grid;
  place-items: center;
  padding-top: 50px;
}

#main-content {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

@media screen and (max-width: 800px) {
  #main-content {
    flex-direction: column;
  }
  #random-button {
    margin-top: 10px;
  }
}
</style>