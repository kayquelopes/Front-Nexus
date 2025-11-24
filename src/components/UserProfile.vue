<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../plugins/axios'

const router = useRouter()
const user = ref(null)
const curtidas = ref([])
const salvos = ref([])
const loading = ref(true)

// Carregar dados do usuário
onMounted(async () => {
  try {
    const userRes = await api.get('usuarios/me/')
    user.value = userRes.data

    const likesRes = await api.get('likes/')
    curtidas.value = Array.isArray(likesRes.data) ? likesRes.data : likesRes.data.results

    const savesRes = await api.get('saves/')
    salvos.value = Array.isArray(savesRes.data) ? savesRes.data : savesRes.data.results

  } catch (err) {
    console.error('Erro ao carregar usuário ou stats:', err)
  } finally {
    loading.value = false
  }
})

// Navegar para HQ
function abrirHQ(hqId) {
  router.push(`/hq/${hqId}`)
}

// URL da capa
function capaUrl(capa) {
  if (!capa) return '/Imagens/image.jpeg'
  return capa.startsWith('http') ? capa : 'http://127.0.0.1:8000' + capa
}

// Logout
function logout() {
  localStorage.removeItem('token') // Ajuste conforme seu storage
  router.push('/')
}
</script>

<template>
  <div class="perfil-page">
    <!-- Header -->
    <div class="header">
      <div class="logo-titulo">
        <img
          src="/Imagens/Modern_Minimalist_Black_N_and_A_Monogram_Logo_Design__1_-removebg-preview (2).png"
          alt="Nexus Logo"
          style="height: 120px; margin: 10px 0 0 0"
        />
        <h1>Nexus</h1>
      </div>

      <nav>
        <ul class="menu">
          <li class="menu-item"><router-link to="/pagInicial">Home</router-link></li>
          <li class="menu-item"><router-link to="/me">Perfil</router-link></li>
          <li class="menu-item"><router-link to="/sobreNos">Sobre Nós</router-link></li>
          <li class="menu-item logout" @click="logout">
            <span class="logout-icon">🔓</span> Logout
          </li>
        </ul>
      </nav>
    </div>

    <!-- Conteúdo -->
    <div class="perfil-container">
      <h1 style="margin-bottom: 30px;">👤 Meu Perfil</h1>

      <div v-if="loading" class="loading">Carregando...</div>

      <div v-else-if="user" class="perfil-card">
        <div class="perfil-info">
          <p><strong>Nome:</strong> {{ user.name || 'Sem nome' }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>

        <div class="user-stats">
          <!-- Curtidas -->
          <h3>❤️ HQs Curtidas ({{ curtidas.length }})</h3>
          <div v-if="curtidas.length" class="hq-list">
            <div v-for="like in curtidas" :key="like.id" class="hq-card" @click="abrirHQ(like.hq.id)">
              <img class="hq-capa" :src="capaUrl(like.hq.capa)" :alt="like.hq.nome" />
              <p>{{ like.hq.nome }}</p>
            </div>
          </div>
          <p v-else>Você ainda não curtiu nenhuma HQ.</p>

          <!-- Salvos -->
          <h3>⭐ HQs Salvas ({{ salvos.length }})</h3>
          <div v-if="salvos.length" class="hq-list">
            <div v-for="save in salvos" :key="save.id" class="hq-card" @click="abrirHQ(save.hq.id)">
              <img class="hq-capa" :src="capaUrl(save.hq.capa)" :alt="save.hq.nome" />
              <p>{{ save.hq.nome }}</p>
            </div>
          </div>
          <p v-else>Você ainda não salvou nenhuma HQ.</p>
        </div>
      </div>

      <div v-else class="erro">
        Erro ao carregar usuário.
      </div>
    </div>
  </div>
</template>

<style scoped>
.perfil-page {
  width: 100%;
  min-height: 100vh;
  background-color: #222;
  display: flex;
  flex-direction: column;
}

.header {
  width: 1450px;
  height: 90px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo-titulo {
  display: flex;
  align-items: center;
}

h1 {
  color: white;
  font-family: 'Times New Roman', serif;
  margin-left: 10px;
}

.menu {
  display: flex;
  gap: 20px;
  background: #9e0e2b;
  padding: 10px 15px;
  border-radius: 8px;
}

.menu-item {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.menu-item a {
  color: white;
  text-decoration: none;
}

.menu-item:hover {
  background-color: #38050f;
  transform: translateY(-2px);
}

.menu-item.logout {
  cursor: pointer;
  background-color: #9e0e2b;
}

.menu-item.logout:hover {
  background-color: #38050f;
}

.logout-icon {
  font-size: 16px;
}

.perfil-container {
  padding: 40px 20px;
  text-align: center;
  color: white;
  font-family: 'Times New Roman', serif;
}

.loading {
  font-size: 20px;
  margin-top: 40px;
}

.perfil-card {
  width: 420px;
  background: #111;
  margin: 0 auto;
  padding: 25px;
  border-radius: 12px;
  border: 2px solid #9e0e2b;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.perfil-info p {
  font-size: 18px;
  margin: 10px 0;
}

.erro {
  margin-top: 20px;
  color: #ff6b6b;
}

.user-stats {
  margin-top: 20px;
  text-align: center;
}

.hq-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 10px;
}

.hq-card {
  background: #111;
  border: 2px solid #9e0e2b;
  border-radius: 10px;
  padding: 8px;
  width: 120px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hq-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(158, 14, 43, 0.6);
}

.hq-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 4px;
}

.hq-card p {
  font-size: 0.9rem;
  color: #fff;
  margin: 0;
}
</style>
