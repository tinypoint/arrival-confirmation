<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%
}

html {
  min-width: 1366px;
  im-height: 677px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

#app > .el-container {
    height: 100%;
}

.el-header, .el-footer {
    line-height: 60px;
    background-color: #E9EEF3;
}
/* css global util */
.flex-1 {
    flex: 1;
}

.flex-cloumn {
    display: flex;
    flex-direction: column;
}

.ml-20 {
    margin-left: 20px;
}

.mr-20 {
    margin-right: 20px;
}

.mt-20 {
    margin-top: 20px;
}

.mb-20 {
    margin-bottom: 20px;
}

.line {
    color: #606266;
    text-align: center;
}

.form-control-sm-w {
    width: 100px;
}

.form-control-md-w {
    width: 150px;
}

</style>
