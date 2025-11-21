<script setup>
import { ref, onMounted } from 'vue'
import api from '../plugins/axios'

const user = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get('usuarios/me/')
    user.value = response.data
  } catch (err) {
    console.error('Erro ao carregar usuário:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo-titulo">
        <img
          src="/Imagens/Modern_Minimalist_Black_N_and_A_Monogram_Logo_Design__1_-removebg-preview (2).png"
          alt="Nexus Logo"
          style="height: 120px; margin-top: 10px"
        />
        <h1>Nexus</h1>
      </div>

      <nav>
        <ul class="menu">
          <li class="menu-item"><router-link to="/pagInicial">Home</router-link></li>
          <li class="menu-item"><router-link to="/me">Perfil</router-link></li>
          <li class="menu-item"><router-link to="/sobreNos">Sobre Nós</router-link></li>
        </ul>
      </nav>
    </div>

    <!-- Conteúdo -->
    <div class="perfil-container">
      <h2>👤 Meu Perfil</h2>

      <div v-if="loading" class="loading">Carregando...</div>

      <div v-else-if="user" class="perfil-card">
        <div class="perfil-info">
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Nome:</strong> {{ user.nome }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Data de criação:</strong> {{ user.date_joined }}</p>
        </div>
      </div>

      <div v-else class="erro">
        Erro ao carregar usuário.
      </div>
    </div>

    <footer class="footer">
      <p>© 2025 Nexus. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Mantém seu padrão */
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #222;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 90px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-titulo {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

h1 {
  color: white;
  font-family: 'Times New Roman', serif;
}

.menu {
  display: flex;
  gap: 20px;
  margin-right: 40px;
  background: #9e0e2b;
  padding: 10px 15px;
  border-radius: 8px;
}

.menu-item a {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
}

.menu-item a:hover {
  background-color: #38050f;
}

/* Perfil */
.perfil-container {
  padding: 40px 20px;
  text-align: center;
  color: white;
  font-family: 'Times New Roman', serif;
}

.perfil-container h2 {
  font-size: 28px;
  margin-bottom: 20px;
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

.footer {
  background-color: #111;
  color: #fff;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>
