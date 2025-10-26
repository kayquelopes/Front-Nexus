<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const hq = ref(null)
const paginas = ref([]) // se futuramente tiver imagens das páginas

// Busca todas as informações da HQ
async function fetchHQ() {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/hqs/${route.params.id}/`)
    hq.value = response.data

    // Exemplo: caso sua API tenha páginas da HQ
    if (hq.value.paginas) {
      paginas.value = hq.value.paginas
    }
  } catch (error) {
    console.error('Erro ao carregar HQ:', error)
  }
}

onMounted(fetchHQ)
</script>

<template>
  <div class="hq-leitura">
    <div v-if="hq" class="container">
      <!-- Cabeçalho -->
      <header class="header">
        <button class="btn-voltar" @click="router.push(`/pagInicial`)">⬅ Voltar</button>
        <h1>{{ hq.nome }}</h1>
      </header>

      <!-- Capa e informações -->
      <div class="hq-detalhes">
        <img
          :src="hq.capa ? 'http://127.0.0.1:8000' + hq.capa : '/Imagens/image.jpeg'"
          :alt="hq.nome"
          class="hq-capa"
        />
        <div class="info">
          <p><strong>Autor:</strong> {{ hq.autor?.nome || 'Desconhecido' }}</p>
          <p><strong>Gênero:</strong> {{ hq.genero?.nome || 'Indefinido' }}</p>
          <p><strong>Idioma:</strong> {{ hq.idioma?.nome || 'Indefinido' }}</p>
          <p><strong>Editora:</strong> {{ hq.editora?.nome || 'Indefinida' }}</p>
          <p><strong>Status:</strong> {{ hq.status?.nome || 'Indefinido' }}</p>
          <p><strong>Frequência:</strong> {{ hq.frequencia?.nome || 'Não informada' }}</p>
          <p><strong>Ano de Lançamento:</strong> {{ new Date(hq.data_lancamento).getFullYear() }}</p>
        </div>
      </div>

      <!-- Sinopse -->
      <div class="sinopse">
        <h2>📜 Sinopse</h2>
        <p>{{ hq.sinopse || 'Sinopse não disponível.' }}</p>
      </div>

      <!-- Leitura -->
      <div class="conteudo">
        <h2>📖 Leitura</h2>
        <div v-if="paginas.length > 0" class="paginas">
          <div v-for="(pagina, index) in paginas" :key="index" class="pagina">
            <img :src="'http://127.0.0.1:8000' + pagina.imagem" alt="Página da HQ" />
          </div>
        </div>
        <div v-else>
          <p>O conteúdo da HQ ainda não foi adicionado.</p>
        </div>
      </div>
    </div>

    <div v-else class="carregando">
      <p>Carregando HQ...</p>
    </div>
  </div>
</template>

<style scoped>
.hq-leitura {
  background-color: #181818;
  color: white;
  min-height: 100vh;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.container {
  width: 100%;
  max-width: 1000px;
}

.header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2rem;
  color: #9e0e2b;
}

.btn-voltar {
  background-color: #444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.btn-voltar:hover {
  background-color: #666;
}

.hq-detalhes {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  background: #111;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.hq-capa {
  width: 250px;
  height: 350px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #9e0e2b;
}

.info {
  font-size: 1.1rem;
}

.info p {
  margin-bottom: 8px;
}

.sinopse {
  background: #111;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.sinopse h2 {
  color: #9e0e2b;
  margin-bottom: 10px;
}

.conteudo {
  background: #111;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.conteudo h2 {
  color: #9e0e2b;
  margin-bottom: 15px;
}

.paginas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.pagina img {
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
  border: 2px solid #9e0e2b;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
}
</style>
