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
                <option value="Ação">Ação</option>
                <option value="Aventura">Aventura</option>
                <option value="Animação">Animação</option>
                <option value="Comédia">Comédia</option>
                <option value="Comédia Romântica">Comédia Romântica</option>
                <option value="Crime">Crime</option>
                <option value="Documentário">Documentário</option>
                <option value="Drama">Drama</option>
                <option value="Espionagem">Espionagem</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Faroeste">Faroeste</option>
                <option value="Ficção Científica">Ficção Científica</option>
                <option value="Guerra">Guerra</option>
                <option value="Histórico">Histórico</option>
                <option value="Mistério">Mistério</option>
                <option value="Musical">Musical</option>
                <option value="Noir">Noir</option>
                <option value="Policial">Policial</option>
                <option value="Reality Show">Reality Show</option>
                <option value="Romance">Romance</option>
                <option value="Romance Histórico">Romance Histórico</option>
                <option value="Suspense">Suspense</option>
                <option value="Terror">Terror</option>
                <option value="Thriller Psicológico">Thriller Psicológico</option>
                <option value="Zumbi">Zumbi</option>
                <option value="Super-Herói">Super-Herói</option>
                <option value="Anime">Anime</option>
                <option value="Slice of Life">Slice of Life</option>
                <option value="Esportes">Esportes</option>
                <option value="Magia">Magia</option>

                <!-- Adicione mais opções conforme necessário -->
              </select>
            </div>

            <div class="form-group">
              <label for="idioma">Gênero(s):</label>
              <select v-model="form.idioma" id="idioma" required>
                <option value="">Selecione o idioma</option>
                <option value="pt">Português</option>
                <option value="en">Inglês</option>
                <option value="es">Espanhol</option>
                <option value="fr">Francês</option>
                <option value="de">Alemão</option>
                <option value="it">Italiano</option>
                <option value="ru">Russo</option>
                <option value="zh">Chinês (Mandarim)</option>
                <option value="ja">Japonês</option>
                <option value="ko">Coreano</option>
                <option value="ar">Árabe</option>
                <option value="hi">Hindi</option>
                <option value="tr">Turco</option>
                <option value="pl">Polonês</option>
                <option value="nl">Holandês</option>
                <option value="sv">Sueco</option>
                <option value="fi">Finlandês</option>
                <option value="da">Dinamarquês</option>
                <option value="no">Norueguês</option>
                <option value="el">Grego</option>
                <option value="he">Hebraico</option>
                <option value="vi">Vietnamita</option>
                <option value="th">Tailandês</option>
                <option value="cs">Tcheco</option>
                <option value="hu">Húngaro</option>
                <option value="ro">Romeno</option>
                <option value="id">Indonésio</option>
                <option value="ms">Malaio</option>
                <option value="uk">Ucraniano</option>
                <option value="bg">Búlgaro</option>
                <!-- Adicione mais opções conforme necessário -->
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
                  <option value="Livre">Livre</option>
                  <option value="10 anos">10 anos</option>
                  <option value="12 anos">12 anos</option>
                  <option value="14 anos">14 anos</option>
                  <option value="16 anos">16 anos</option>
                  <option value="18 anos">18 anos</option>
                  <!-- Adicione mais opções conforme necessário -->
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
                <option value="Diária">Diária</option>
                <option value="Semanal">Semanal</option>
                <option value="Quinzenal">Quinzenal</option>
                <option value="Mensal">Mensal</option>
                <option value="Bimestral">Bimestral</option>
                <option value="Trimestral">Trimestral</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
                <option value="Indefinida">Indefinida</option>
                <!-- Adicione mais opções conforme necessário -->
              </select>
            </div>
          </div>
        </div>
        <div class="grupo3"><button type="submit" @click="irParaDestino" class="submit-button">Cadastrar</button></div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

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
  min-height: 1080px;
  background-image: url('public/Imagens/Captura%20de%20tela%202025-06-10%20133854.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.form-background {
  min-width: 1200px;
  min-height: 600px;
  margin: 100px 162px;
  background-image: linear-gradient(to bottom right, #0e2a9ebf, #9e0e2bbf);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: column;
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
  margin: 21px 101px 55px;
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
input[type="file"]::file-selector-button{
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
