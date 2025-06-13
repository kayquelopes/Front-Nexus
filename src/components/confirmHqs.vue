<template>
  <div class="container">
    <div class="message">
      <h1>Sua Hqs já foi Cadastrada com Sucesso! 👍</h1>
      <p>Apos nossa equipe analisar, você receberá um retorno.</p>
      <p>Você pode visualizar suas Hqs na página principal quando for aprovada.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-image: url('/public/Imagens/deadpool-has-biggest-opening-day-ever-for-an-r-rat_bekt.jpg');
  background-size: cover;
  background-position: center;
  color: white;
}
.container > .message {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
}
.container > .message > h1 {
  margin: 0;
  font-size: 2em;
  font-weight: bold;
}
.container > .message > p {
  margin: 10px 0;
  font-size: 1.2em;
}

</style>
<script setup>
</script>
