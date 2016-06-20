const parentMixin = {
  ready () {
    this.updateIndex()
  },
  methods: {
    updateIndex () {
      if (!this.$children) return
      this.number = this.$children.length
      let children = this.$children
      for (let i = 0; i < children.length; i++) {
        children[i].index = i
        if (children[i].selected) {
          this.index = i
        }
      }
    }
  },
  data () {
    return {
      number: this.$children.length,
      index: 0
    }
  }
}

const childMixin = {
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  ready () {
    this.$parent.updateIndex()
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.updateIndex()
    })
  },
  methods: {

    onItemClick () {
      let children = this.$parent.$children
      let parentIncome = this.$parent.$parent.$parent

      for (let i = 0; i < children.length; i++) {
        children[i].selected = false
      }

      this.selected = true
      parentIncome.currentType = parentIncome.itemType[this.index]
      this.$parent.index = this.index
    }
  },
  watch: {
    selected (val) {
      if (val) {
        this.$parent.index = this.index
      }
    }
  },
  data () {
    return {
      index: -1
    }
  }
}

export {
  parentMixin,
  childMixin
}

