<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Array que vai armazenar todas as HQs carregadas
const quadrinhos = ref([])

// Paginação
const nextPage = ref(1) // Página atual
const hasNext = ref(true) // Se existe próxima página

// Função para buscar HQs do backend
async function fetchQuadrinhos() {
  if (!hasNext.value) return

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/hqs/?page=${nextPage.value}`)
    const data = response.data

    // Adiciona as novas HQs ao array existente
    quadrinhos.value.push(...(data.results || data))

    // Atualiza paginação
    nextPage.value++
    hasNext.value = !!data.next
  } catch (error) {
    console.error('Erro ao buscar quadrinhos:', error)
  }
}

// Carrega a primeira página ao montar o componente
onMounted(() => {
  fetchQuadrinhos()
})
</script>

<template>
  <div class="container">
    <!-- Cabeçalho -->
    <div class="header">
      <div class="logo-titulo">
        <img
          src="../../public/Imagens/Modern_Minimalist_Black_N_and_A_Monogram_Logo_Design__1_-removebg-preview%20(2).png"
          alt="Nexus Logo"
          style="height: 120px; margin: 10px 0 0 0"
        />
        <h1>Nexus</h1>
      </div>
      <nav>
        <ul class="menu">
          <li class="menu-item"><router-link to="/pagInicial">Home</router-link></li>
          <li class="menu-item"><router-link to="/perfil">Perfil</router-link></li>
          <li class="menu-item"><router-link to="/sobreNos">Sobre Nós</router-link></li>
        </ul>
      </nav>
    </div>

    <!-- Conteúdo principal -->
    <div class="main">
      <div class="text-bemVindo">
        <h2>🎉 Bem-vindo ao Nexus, seu QG dos Quadrinhos!</h2>
        <p class="descricao-nexus">
          📚 Todos os seus quadrinhos favoritos em um só lugar. Acesse links confiáveis para mangás,
          manhwas e HQs rapidamente. Leia, descubra novas histórias e aproveite sua leitura sem
          complicações.
        </p>
      </div>

      <!-- Catálogo de HQs -->
      <div class="catalogo-inicial">
        <div class="card" v-for="hq in quadrinhos" :key="hq.id">
          <div class="card-image">
            <img
              :src="hq.capa ? 'http://127.0.0.1:8000' + hq.capa : '../../public/Imagens/image.jpeg'"
              :alt="hq.nome"
            />
          </div>
          <div class="card-content">
            <h3 class="nome">{{ hq.nome }}</h3>
            <p class="ano">
              <strong>Ano:</strong> {{ new Date(hq.data_lancamento).getFullYear() }}
            </p>
            <p class="autor"><strong>Autor:</strong> {{ hq.autor.nome }}</p>
            <p class="genero"><strong>Gênero:</strong> {{ hq.genero.nome }}</p>
            <router-link :to="`/hq/${hq.id}`" class="btn-leia"> Leia Agora </router-link>
          </div>
        </div>
      </div>

      <!-- Botão para carregar mais HQs -->
      <div class="btn-container" v-if="hasNext">
        <button class="btn-carregar" @click="fetchQuadrinhos">Carregar mais HQs</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 0;
  background-color: #222;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 90px;
  background-color: #000000;
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
  font-family: 'Times New Roman', Times, serif;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
  background-color: #9e0e2b;
  border-radius: 8px;
  margin-right: 40px;
}

.menu-item > a {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #ffffff;
}

.menu-item > a:hover {
  background-color: #38050f;
}

.main {
  flex: 1;
  padding: 20px;
  color: white;
  font-family: 'Times New Roman', Times, serif;
  display: flex;
  flex-direction: column;
}

.text-bemVindo {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.text-bemVindo h2 {
  font-size: 28px;
}

.text-bemVindo .descricao-nexus {
  font-size: 18px;
  max-width: 800px;
  text-align: center;
}

.catalogo-inicial {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  margin-top: 40px;
}

.card {
  width: 300px;
  height: 415px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  font-family: Arial, sans-serif;
  cursor: pointer;
  flex: 0 0 calc(20% - 16px); /* 5 cards por linha */
  box-sizing: border-box;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

h3 {
  margin: 0;
  font-size: 1.3rem;
  color: #000000;
}

.ano,
.autor,
.genero {
  margin: 5px 0;
  font-size: 0.95rem;
  color: #000000;
}

.btn-leia {
  display: inline-block;
  padding: 8px 15px;
  background-color: #9e0e2b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-leia:hover {
  background-color: #38050f;
}

.btn-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.btn-carregar {
  padding: 10px 20px;
  background-color: #9e0e2b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-carregar:hover {
  background-color: #38050f;
}
</style>
