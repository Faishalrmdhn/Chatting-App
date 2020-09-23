<template>
  <div class="content-wrapper">
    <div class="outer-container">
      <div class="container">
        <div class="top"><h3>Telegram</h3></div>
        <div class="top">settings</div>
      </div>
      <div class="text-center"><b-avatar size="4rem"></b-avatar></div>
      <div class="text">
        <h5>Gloria Mckinney</h5>
        <p>@wdiam</p>
      </div>
      <div class="search">
        <input placeholder="Type your message" type="search" />
      </div>
      <div class="column">
        <div><h6>All</h6></div>
        <div><h6>Unread</h6></div>
        <div><h6>Read</h6></div>
      </div>
      <b-list-group style="max-width: 300px;">
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar class="mr-3"></b-avatar>
          <span class="mr-auto">J. Circlehead</span>
          <b-badge>5</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
          <span class="mr-auto">BootstrapVue</span>
          <b-badge>12</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar
            variant="info"
            src="https://placekitten.com/300/300"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto">Super Kitty</span>
          <b-badge>9</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar
            variant="success"
            icon="people-fill"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto">ACME group</span>
          <b-badge>7</b-badge>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content-wrapper {
  padding-right: 0px;
  height: 100vh;
  background-color: red;
}

.outer-container {
  padding: 5px;
}

.container {
  margin-bottom: 20px;
  padding: 10px;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.column {
  margin-top: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.text {
  text-align: center;
  margin-top: 20px;
}

input[type="search"] {
  padding: 1px; /* Overridden by padding: 1px; */
  font-family: Georgia; /* Overridden by font: -webkit-small-control; */
  border: 1px solid #fafafa; /* Overridden by border: 2px inset; */
  background: white; /* Overridden by background-color: white; */
  border-radius: 15px;
  line-height: 1;
}

.search {
  text-align: center;
  border-radius: 20px;
}
/* .top{

} */
</style>
