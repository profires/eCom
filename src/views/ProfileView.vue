<script setup>
import { ref, reactive, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'
import Toast from '@/components/Toast.vue'

import { useEventStore } from '@/stores/event'

const submitted = ref(false)
const eventStore = useEventStore()

const userForm = [
    {
        name: 'Email', field: 'email'
    },
    {
        name: 'Name', field: 'name'
    }]

const userData = reactive(
    userForm.reduce((acc, item) => {
        acc[item.field] = ''
        return acc
    }, { imgUrl: "https://www.svgrepo.com/show/530461/loss.svg" })
)

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            userData.imgUrl = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const submitForm = () => {
    // Handle form submission
    console.log('Form submitted:', userData)
    if (Object.values(userData).some(value => value === '')) {
        alert('Please fill in all fields')
        return
    }
    localStorage.setItem('userData', JSON.stringify(userData))
    
    eventStore.popUpMessage(
        "Profile updated successfully", "success"
    )
    //eventStore.clearAlert()
    
}

onMounted(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
        const parsedData = JSON.parse(storedData)
        Object.keys(parsedData).forEach(key => {
            userData[key] = parsedData[key]
        })
    }
})

</script>

<template>
    <UserLayout>
        
           
        <Toast v-if="eventStore.alert.show" :message="eventStore.alert.data.message" :status="eventStore.alert.data.status" />
        <fieldset class="mx-auto min-h-screen fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend class="fieldset-legend">Profile</legend>

            <div class="avatar mx-auto ">
                <div class="w-24 rounded-full">
                    <img :src="userData.imgUrl" />
                </div>
            </div>
            <input type="file" class="file-input " @change="handleFileUpload">
            <div v-for="form in userForm" :key="form.name">
                <label class="label">{{ form.name }}</label>
                <input v-model="userData[form.field]" type="text" class="input" placeholder="My awesome page" />
            </div>
            <div class="btn-group">
                <button :disabled="Object.values(userData).some(value => value === '')" class="btn btn-primary"
                    @click="submitForm">Save</button>
                <RouterLink to="/">
                    <button class="btn btn-secondary">Cancel</button>
                </RouterLink>
            </div>
        </fieldset>
    </UserLayout>
</template>