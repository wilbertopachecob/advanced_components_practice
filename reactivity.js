class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  depend() {
    if (target) {
      this.subscribers.add(target);
    }
  }
  notify() {
    this.subscribers.forEach((sub) => sub());
  }
}

function observer(obj) {
    Object.keys(obj).forEach(key => {
        let internalValue = obj[key]
        const dep = new Dep
        Object.defineProperty(obj, key, {
            get(){
                dep.depend()
                return internalValue
            },
            set(newValue) {
                internalValue = newValue 
                dep.notify()
            }
        })
    })
}

let target

function watcher(func) {
    target = func
    target()
    target = null
}

let data = {price: 10, quantity: 2}
observer(data)

watcher(() => {
    total = data.price * data.quantity
})

watcher(() => {
    salesPrice = data.price * 0.9
})


