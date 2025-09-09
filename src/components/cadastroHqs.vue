<template>
  <div class="container">
    <div class="form-background">
      <div class="grupo1">
        <h1 class="form-title">Cadastro de HQs</h1>
      </div>
      <form @submit.prevent="submitForm" class="hqs-form">
        <div class="grupo2">
          <div class="grupo2-1">
            <div class="form-group">
              <label for="nome">Nome:</label>
              <input type="text" v-model="form.nome" id="nome" required />
            </div>
            <div class="form-group">
              <label for="autor">Autor:</label>
              <input type="text" v-model="form.autor" id="autor" required />
            </div>
            <div class="form-group">
              <label for="genero">Gênero(s):</label>
              <select v-model="form.genero" id="genero" required>
                <option value="">Selecione o gênero</option>
                <option v-for="genero in generos" :key="genero.id" :value="genero.id">
                  {{ genero.nome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="idioma">Idioma:</label>
              <select v-model="form.idioma" id="idioma" required>
                <option value="">Selecione o idioma</option>
                <option v-for="idioma in idiomas" :key="idioma.id" :value="idioma.id">
                  {{ idioma.nome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="status-label">Status:</label>
              <div>
                <label>
                  <input type="radio" v-model="form.status" value="Em andamento" required />
                  Em andamento
                </label>
                <label>
                  <input type="radio" v-model="form.status" value="Finalizado" required />
                  Finalizado
                </label>
              </div>
              <div class="form-group">
                <label for="dataLancamento">Data de lançamento (inicial):</label>
                <input type="date" v-model="form.dataLancamento" id="dataLancamento" required />
              </div>

              <div class="form-group">
                <label for="classificacao">Classificação indicativa:</label>
                <select v-model="form.classificacao" id="classificacao" required>
                  <option value="">Selecione a classificação</option>
                  <option v-for="classificacao in classificacoes" :key="classificacao.id" :value="classificacao.id">
                    {{ classificacao.nome }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="editora">Editora/Estúdio:</label>
                <input type="text" v-model="form.editora" id="editora" required />
              </div>
            </div>
          </div>
          <div class="grupo2-2">
            <div class="form-group">
              <label for="sinopse">Sinopse/Descrição:</label>
              <textarea v-model="form.sinopse" id="sinopse" rows="4" required></textarea>
            </div>

            <div class="form-group">
              <label for="capa">Capa oficial:</label>
              <input type="file" @change="handleFileUpload" id="capa" required />
            </div>

            <div class="form-group">
              <label for="quantidadeCapitulos">Quantidade de capítulos (ou volumes):</label>
              <input
                type="number"
                v-model="form.quantidadeCapitulos"
                id="quantidadeCapitulos"
                required
              />
            </div>

            <div class="form-group">
              <label for="frequencia">Frequência de publicação:</label>
              <select v-model="form.frequencia" id="frequencia" required>
                <option value="">Selecione a frequência</option>
                <option v-for="frequencia in frequencias" :key="frequencia.id" :value="frequencia.id">
                  {{ frequencia.nome }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="grupo3">
          <button type="submit" class="submit-button">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../plugins/axios'

const router = useRouter()
const generos = ref([])
const idiomas = ref([])
const classificacoes = ref([])
const frequencias = ref([])

onMounted(async () => {
  let gnrs  = await api.get('generos')
  generos.value = gnrs.data
  let idms  = await api.get('idiomas')
  idiomas.value = idms.data
  let clsf  = await api.get('classificacoes')
  classificacoes.value = clsf.data.results
  let frqn  = await api.get('frequencias')
  frequencias.value = frqn.data.results
})
const form = ref({
  nome: '',
  autor: '',
  genero: '',
  idioma: '',
  status: '',
  dataLancamento: '',
  classificacao: '',
  editora: '',
  sinopse: '',
  capa: null,
  quantidadeCapitulos: null,
  frequencia: '',
})

const handleFileUpload = (event) => {
  form.value.capa = event.target.files[0]
}

const submitForm = () => {
  // Simular envio, validações ou API call aqui
  const formValido = validarFormulario()
  if (formValido) {
    console.log('Formulário enviado:', form.value)
    alert('Cadastro realizado com sucesso!')
    resetForm()
    router.push('/confirm') // Só redireciona após tudo estar certo
  } else {
    alert('Por favor, preencha todos os campos corretamente.')
  }
}
const validarFormulario = () => {
  const f = form.value
  return (
    f.nome &&
    f.autor &&
    f.genero &&
    f.idioma &&
    f.status &&
    f.dataLancamento &&
    f.classificacao &&
    f.editora &&
    f.sinopse &&
    f.capa &&
    f.quantidadeCapitulos &&
    f.frequencia
  )
}

// Reset form
const resetForm = () => {
  form.value = {
    nome: '',
    autor: '',
    genero: '',
    idioma: '',
    status: '',
    dataLancamento: '',
    classificacao: '',
    editora: '',
    sinopse: '',
    capa: null,
    quantidadeCapitulos: null,
    frequencia: '',
  }
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(28, 28, 28);
}

.form-background {
  min-width: 1200px;
  min-height: 600px;
  margin: 25px 162px;
  background-image: linear-gradient(to bottom right, #0e2a9ebf, #9e0e2bbf);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: white;
}

.grupo1 {
  max-width: 1200px;
  margin-top: 32px;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  color: white;
}

.hqs-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grupo2 {
  display: flex;
  flex-direction: row;
  margin: 21px 101px 15px;
}

.grupo2-1 {
  margin-right: 106px;
}

.grupo2-2 {
  margin-left: 106px;
}

.grupo3 {
  width: 1200px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

/*input*/
input[type='text'],
input[type='number'] {
  width: 390px;
  height: 36px;
  border: 3px solid #555;
  border-radius: 20px;
  padding-left: 10px;
}

select {
  width: 400px;
  height: 36px;
  border: 1px solid #555;
  border-radius: 20px;
  padding-left: 10px;
}

input[type='radio'] {
  margin-bottom: 15px;
  font-size: 22px;
}

input[type='date'] {
  width: 380px;
  height: 36px;
  border: 1px solid #555;
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
textarea {
  width: 400px;
  height: 283px;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 20px;
}
input[type='file']::file-selector-button {
  border-radius: 20px;
}
/*Button*/
.submit-button {
  width: 223px;
  height: 56px;
  padding: 10px;
  background-color: #0e2a9e;
  color: white;
  border: none;
  margin: 25.5px 491px 36px;
  border-radius: 20px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
