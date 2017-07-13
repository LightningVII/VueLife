<template>
  <div style="display: inline;">
    <div class="selection-component">
      <div class="selection-show" @click="isDrop = !isDrop">
        <span>{{ selections[nowIndex].name }}</span>
        <div class="arrow"></div>
      </div>
      <div class="selection-list" v-if="isDrop">
        <ul>
          <li v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.name }}</li>
        </ul>
      </div>
    </div>
    <div class="selection-component">
      <div class="selection-show" @click="isSubDrop = !isSubDrop">
        <span>{{ selections[nowIndex].sub[nowSubIndex].name }}</span>
        <div class="arrow"></div>
      </div>
      <div class="selection-list" v-if="isSubDrop">
        <ul>
          <li v-for="(item, index) in selections[nowIndex].sub" @click="chooseSelection(index, 'sub')">{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    },
    valueIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isDrop: false,
      isSubDrop: false,
      nowIndex: 0,
      nowSubIndex: 0
    }
  },
  created() {
    console.log(this.valueIndex)
    this.nowIndex = this.valueIndex
  },
  methods: {
    toggleDrop() {
      this.isDrop = !this.isDrop
    },
    chooseSelection(index, level) {
      if (level === 'sub') {
        this.nowSubIndex = index
        this.isSubDrop = false
      } else {
        this.nowIndex = index
        this.nowSubIndex = 0
        this.isDrop = false
      }
      this.$emit('on-change', this.selections[this.nowIndex])
    }
  }
}
</script>

<style scoped>
.selection-component {
  position: relative;
  display: inline-block;
}

.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}

.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}

.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}

.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.selection-list li:hover {
  background: #e3e3e3;
}
</style>
