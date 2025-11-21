<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../plugins/axios' // <-- usa SOMENTE ESTE

const route = useRoute()
const router = useRouter()

const hq = ref(null)
const paginas = ref([])
const urls = ref([])

const jaCurtiu = ref(false)
const jaSalvou = ref(false)

const likeId = ref(null)
const saveId = ref(null)

const token = localStorage.getItem('accessToken') || localStorage.getItem('token')

// popup
const mensagem = ref('')
let mensagemTimeout = null
function mostrarMensagem(texto) {
  mensagem.value = texto
  clearTimeout(mensagemTimeout)
  mensagemTimeout = setTimeout(() => (mensagem.value = ''), 1800)
}

// ------------------ BUSCAR HQ COMPLETA ------------------
async function fetchHQ() {
  try {
    const response = await api.get(`hqs/${route.params.id}/`)
    hq.value = response.data

    paginas.value = hq.value.paginas || []
    urls.value = hq.value.urls || []

    await verificarCurtida()
    await verificarSalvo()
  } catch (error) {
    console.error('Erro ao carregar HQ:', error)
  }
}

// ------------------ VERIFICAR CURTIDA ------------------
async function verificarCurtida() {
  try {
    const res = await api.get('curtidas/')
    const lista = Array.isArray(res.data) ? res.data : res.data.results || []
    const encontrada = lista.find((item) => item.hq === hq.value.id)
    if (encontrada) {
      jaCurtiu.value = true
      likeId.value = encontrada.id
    } else {
      jaCurtiu.value = false
      likeId.value = null
    }
  } catch (error) {
    // se não autenticado, ignora (mantém false)
    console.error('Erro ao verificar curtida:', error)
  }
}

// ------------------ VERIFICAR SALVO ------------------
async function verificarSalvo() {
  try {
    const res = await api.get('salvos/')
    const lista = Array.isArray(res.data) ? res.data : res.data.results || []
    const encontrado = lista.find((item) => item.hq === hq.value.id)
    if (encontrado) {
      jaSalvou.value = true
      saveId.value = encontrado.id
    } else {
      jaSalvou.value = false
      saveId.value = null
    }
  } catch (error) {
    console.error('Erro ao verificar salvo:', error)
  }
}

// ------------------ TOGGLE CURTIR ------------------
async function toggleCurtida() {
  try {
    if (!token) {
      mostrarMensagem('Faça login para curtir.')
      return
    }

    if (!jaCurtiu.value) {
      const res = await api.post('curtidas/', { hq: hq.value.id })
      jaCurtiu.value = true
      likeId.value = res.data.id
      mostrarMensagem('Você curtiu esta HQ ❤️')
    } else {
      if (!likeId.value) return
      await api.delete(`curtidas/${likeId.value}/`)
      jaCurtiu.value = false
      likeId.value = null
      mostrarMensagem('Curtida removida')
    }
  } catch (error) {
    console.error('Erro no toggle de curtida:', error)
    mostrarMensagem('Erro ao curtir.')
  }
}

// ------------------ TOGGLE SALVO ------------------
async function toggleSalvo() {
  try {
    if (!token) {
      mostrarMensagem('Faça login para salvar.')
      return
    }

    if (!jaSalvou.value) {
      const res = await api.post('salvos/', { hq: hq.value.id })
      jaSalvou.value = true
      saveId.value = res.data.id
      mostrarMensagem('HQ salva com sucesso! ⭐')
    } else {
      if (!saveId.value) return
      await api.delete(`salvos/${saveId.value}/`)
      jaSalvou.value = false
      saveId.value = null
      mostrarMensagem('HQ removida dos salvos')
    }
  } catch (error) {
    console.error('Erro no toggle de salvo:', error)
    mostrarMensagem('Erro ao salvar.')
  }
}

function abrirLink(link) {
  window.open(link, '_blank')
}

onMounted(fetchHQ)
</script>

<template>
  <div class="hq-leitura">
    <div v-if="hq" class="page-wrap">
      <!-- popup -->
      <div v-if="mensagem" class="mensagem-popup">{{ mensagem }}</div>

      <!-- título + botão voltar -->
      <div class="top-row">
        <button class="btn-voltar" @click="router.push('/pagInicial')">⬅ Voltar</button>
        <h2 class="hq-title">{{ hq.nome }}</h2>
      </div>

      <!-- ações -->
      <div class="acoes">
        <button :class="['btn-action', jaCurtiu ? 'active-like' : '']" @click="toggleCurtida">
          <span class="icon">❤️</span>
          <span class="txt">{{ jaCurtiu ? 'Curtido' : 'Curtir' }}</span>
        </button>

        <button :class="['btn-action', jaSalvou ? 'active-save' : '']" @click="toggleSalvo">
          <span class="icon">⭐</span>
          <span class="txt">{{ jaSalvou ? 'Salvo' : 'Salvar' }}</span>
        </button>
      </div>

      <!-- capa + info -->
      <div class="hq-detalhes">
        <img class="hq-capa" :src="hq.capa || '/Imagens/image.jpeg'" :alt="hq.nome" />
        <div class="info">
          <p><strong>Autor:</strong> {{ hq.autor?.nome || 'Desconhecido' }}</p>
          <p><strong>Gênero:</strong> {{ hq.genero?.nome || 'Indefinido' }}</p>
          <p><strong>Idioma:</strong> {{ hq.idioma?.nome || 'Indefinido' }}</p>
          <p><strong>Editora:</strong> {{ hq.editora?.nome || 'Indefinida' }}</p>
          <p><strong>Status:</strong> {{ hq.status?.nome || 'Indefinido' }}</p>
          <p><strong>Frequência:</strong> {{ hq.frequencia?.nome || 'Não informada' }}</p>
          <p><strong>Ano:</strong> {{ new Date(hq.data_lancamento).getFullYear() }}</p>
        </div>
      </div>

      <!-- sinopse -->
      <div class="sinopse">
        <h3>📜 Sinopse</h3>
        <p>{{ hq.sinopse || 'Sinopse não disponível.' }}</p>
      </div>

      <!-- urls -->
      <div class="urls" v-if="urls.length">
        <h3>🔗 Links Relacionados</h3>
        <div class="url-list">
          <div v-for="(url, i) in urls" :key="i" class="url-item">
            <span>{{ url.descricao || 'Link' }}</span>
            <button class="btn-abrir" @click="abrirLink(url.link)">Abrir</button>
          </div>
        </div>
      </div>

      <!-- paginas -->
      <div class="conteudo">
        <h3>📖 Leitura</h3>
        <div v-if="paginas.length" class="paginas">
          <div v-for="(p, i) in paginas" :key="i" class="pagina">
            <img
              :src="
                p.imagem && p.imagem.startsWith('http')
                  ? p.imagem
                  : 'http://127.0.0.1:8000' + p.imagem
              "
              alt="Página"
            />
          </div>
        </div>
        <div v-else><p>O conteúdo da HQ ainda não foi adicionado.</p></div>
      </div>

    </div>

    <div v-else class="carregando">
      <p>Carregando HQ...</p>
    </div>
  </div>
</template>

<style scoped>
/* ---------- Layout global (restaurado) ---------- */
.hq-leitura {
  background-color: #222;
  color: white;
  min-height: 100vh;
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
}

/* page wrap */
.page-wrap {
  width: 100%;
  max-width: 1100px;
  padding: 28px;
}

/* Header */
.header {
  width: 100%;
  height: 90px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.logo-titulo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-img {
  height: 64px;
}

.brand-title {
  color: white;
  font-family: 'Times New Roman', Times, serif;
  margin: 0;
}

/* Menu */
.menu {
  list-style: none;
  display: flex;
  gap: 16px;
  padding: 8px;
  background-color: #9e0e2b;
  border-radius: 10px;
  margin: 0;
}

.menu-item a {
  color: white;
  text-decoration: none;
  padding: 8px 10px;
  display: inline-block;
}

.menu-item a:hover {
  background-color: #38050f;
  border-radius: 6px;
}

/* top row */
.top-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 8px 0 18px 0;
}

.btn-voltar {
  background-color: #444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
}

/* titulo da hq */
.hq-title {
  color: #9e0e2b;
  margin: 0;
  font-size: 1.6rem;
}

/* ações (like/save) */
.acoes {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.btn-action {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 16px;
  border-radius: 10px;
  background: #222;
  color: #fff;
  border: 2px solid #3b3b3b;
  cursor: pointer;
  transition: all 0.15s;
  font-weight: 600;
}

.btn-action .icon {
  font-size: 1.05rem;
}
.btn-action.active-like {
  background: linear-gradient(90deg, #9e0e2b, #ff4d6d);
  border-color: #9e0e2b;
}
.btn-action.active-save {
  background: linear-gradient(90deg, #444, #666);
  border-color: #9e0e2b;
}

/* detalhes */
.hq-detalhes {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  background: #111;
  padding: 18px;
  border-radius: 12px;
  margin-bottom: 22px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.hq-capa {
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #9e0e2b;
}

/* info texto */
.info p {
  margin: 6px 0;
  font-size: 1rem;
  color: #ddd;
}

/* sinopse & urls & conteudo */
.sinopse,
.urls,
.conteudo {
  background: #111;
  padding: 18px;
  border-radius: 10px;
  margin-bottom: 18px;
}

.sinopse h3,
.urls h3,
.conteudo h3 {
  color: #9e0e2b;
  margin-top: 0;
}

/* url item */
.url-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.url-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(158, 14, 43, 0.15);
}
.btn-abrir {
  background: #9e0e2b;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

/* paginas */
.paginas {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
.pagina img {
  width: 100%;
  max-width: 900px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #9e0e2b;
}

/* popup mensagem */
.mensagem-popup {
  position: fixed;
  top: 92px; /* abaixo do header */
  left: 50%;
  transform: translateX(-50%);
  background: #9e0e2b;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  z-index: 9999;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

/* footer */
.footer {
  background-color: #111;
  color: #fff;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  bottom: 0;
  left: 0;
  width: 1445px;
}

/* carregando */
.carregando {
  color: white;
  text-align: center;
  padding: 40px 0;
}
</style>
