<!-- eslint-disable vue/component-api-style -->
<script>
import axiosIns from '@/plugins/axios'

export default {
  data () {
    return {
      absolute: true,
      overlay: false,
      todos : [],
      todoName:"",
      selectedItem : -1,
    } 
  },
  
  async created (){
    try{
      const res = await axiosIns.get('todo/list')

      this.todos = res.data.content
    }catch(e){
      console.log(e)
    }
  },

  methods:{
    click(index){
      if(this.selectedItem == index){
        this.selectedItem = -1
      }else{
        this.selectedItem = index
      } 
    },
    addItem(){
      this.todos = [...this.todos, { title:this.todoName, props:{
        prependIcon:"tabler-check",
      } }]
      this.todoName = ''
      this.overlay = false
    },
  },
}
</script>

<template>
  <div>
    <VCard class="mb-6">
      <VCardItem>
        <VCardTitle>
          Vue3 - Task 🚀
        </VCardTitle>
      </VCardItem>
      <VCardText>
        Metod
        <VAlert>
          GET
        </VAlert>
        <div class="flex-grow-1 mt-2" />
        API Adresi
        <VAlert>
          https://test-api.elselab.io/api/todo/list
        </VAlert>
      </VCardText>
      <VCardText>Bu sayfa sizden talep ettiğimiz çalışan örneği içermektedir.</VCardText>
    </VCard>
    <VCard>
      <VCardItem>
        <VCardTitle> 
          Task List
        </VCardTitle>
      </VCardItem>
      <VCardText>
        <VList role="listbox">
          <VListItem
            v-for="(item,index) in todos"
            :key="index"
            tabindex="0"
            rounded="xl"
            :active="selectedItem == index ? absolute: !absolute"
            active-class="v-list-item--active text-primary"
            @click="() => {click(index)}"
          >
            <template #prepend>
              <VIcon
                size="24"
                :icon="item.props.prependIcon"
                class="me-6"
              />
            </template>
            <VListItemTitle>
              {{ item.title }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCardText>
      <VCardActions>
        <VBtn @click="overlay = true">
          Add New Task
        </VBtn>
      </VCardActions>
    </VCard>
    <VOverlay
      v-model="overlay"
      contained
      persistent
      aria-modal="true"
      aria-role="dialog"
      dialog="true"
      scroll-strategy="block"
      class="v-dialog"
      content-class="overlayContent"
      @click:outside="overlay = false"
    >
      <VBtn
        variant="elevated"
        icon="true"
        class="v-dialog-close-btn"
        @click="overlay = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          tag="i"
          class="v-icon notranslate v-theme--light v-icon--size-default iconify iconify--tabler"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18 6L6 18M6 6l12 12"
        /></svg>
      </VBtn>
      <VCard>
        <VCardItem>
          <VCardTitle>
            Add New  Task
          </VCardTitle>
        </VCardItem>
        <VCardText>
          <VTextField
            v-model="todoName"
            label="Task Title"
            variant="outlined"
          />
        </VCardText>
        <VCardText class="d-flex justify-end">
          <VBtn
            variant="elevated"
            :disabled="todoName.length === 0"
            @click="addItem"
          >
            Add Task
          </VBtn>
        </VCardText>
      </VCard>
    </VOverlay>
  </div>
</template>

<style>
.deneme{
  background: red !important;
}
.todoItem:hover{
  background-color: whitesmoke;
  border-radius: 30px;
}
.v-dialog {
    align-items: center;
    justify-content: center;
    margin: auto;
}

.overlayContent{
  width: 500px !important;
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
}
</style>