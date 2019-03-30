<template>
  <div class="header-menu -text-center">
    <div class="menu-option">
      <p>T. units: </p>
      <div class="menu-option-units">
        <div class="menu-option-unit">
          <p>C</p>  
        </div>
        <div class="menu-option-unit menu-option-unit--inactive">
          <p>F</p>
        </div>
      </div>
    </div>
  </diV>
</template>

<script>
export default {
  name: "HeaderMenu"
}
</script>

<style lang="scss">
.header-menu {
  background: #fff;
  width: 42vw;
  position: absolute;
  top: 10vh;
  border-radius: 5px;
  box-shadow: 0 2px 7px .2px rgba(0, 0, 0, .2);
}

.menu-option {
  padding: 6px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.menu-option p {
  font-size: 14px;
}

.menu-option-units {
  display: flex;
  margin-left: 10px;
}

.menu-option-unit {
  cursor: pointer;
  padding: 2px 10px;
}

.menu-option-unit--inactive {
  color: #a1a1a1;
}
</style>
