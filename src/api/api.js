import { ref, onMounted } from 'vue'
import { createStore } from 'vuex'

const message = ref('')

const store = createStore()
const wsUrl = 'ws://localhost:5001'
let socket

const connectWebSocket = store => {
  socket = new WebSocket(wsUrl)

  socket.onopen = () => {
    console.log('Connected to WebSocket server')
  }
  socket.onmessage = event => {
    const newData = JSON.parse(event.data)

    // Оновення даних у Vuex через мутацію
    store.commit('updateData', newData)
  }
  socket.onclose = () => {
    console.log('Disconnected from WebSocket server')
  }
  socket.onerror = error => {
    console.error('WebSocket error:', error)
  }
}

onMounted(() => {
  connectWebSocket(store)
})

export { message }
